'use server';

import { roxy } from '@/lib/roxy/client';
import { unwrap } from '@/lib/roxy/guard';
import type { Lang } from '@/lib/lang';
import type { Coords } from '@/lib/location';
import type { GetCrystalsZodiacBySignData } from '@roxyapi/sdk';

export interface BirthInput extends Coords {
  date: string;
  time: string;
  lang?: Lang;
}

/**
 * Fans out one birth input to every kundali endpoint in parallel: D1 birth chart, D9 navamsa (via the generic divisional chart), Vimshottari major dashas, the three doshas, and the two strength analyses. One round trip per endpoint, all concurrent. `lang` is forwarded to the i18n-aware endpoints (birth chart, dashas); the dosha and strength endpoints return only numbers and planet names, so they take no `lang` query.
 */
export async function generateKundali({ date, time, latitude, longitude, timezone, lang }: BirthInput) {
  const body = { date, time, latitude, longitude, timezone };

  const [chart, navamsa, dashas, manglik, kalsarpa, sadhesati, ashtakavarga, shadbala] =
    await Promise.all([
      unwrap(roxy.vedicAstrology.generateBirthChart({ query: { lang }, body })),
      unwrap(roxy.vedicAstrology.generateDivisionalChart({ body: { ...body, division: 9 } })),
      unwrap(roxy.vedicAstrology.getMajorDashas({ query: { lang }, body })),
      unwrap(roxy.vedicAstrology.checkManglikDosha({ body })),
      unwrap(roxy.vedicAstrology.checkKalsarpaDosha({ body })),
      unwrap(roxy.vedicAstrology.checkSadhesati({ body })),
      unwrap(roxy.vedicAstrology.calculateAshtakavarga({ body })),
      unwrap(roxy.vedicAstrology.calculateShadbala({ body })),
    ]);

  return { chart, navamsa, dashas, manglik, kalsarpa, sadhesati, ashtakavarga, shadbala };
}

/** Loads a single divisional (varga) chart on demand. `division` is the integer (9 for navamsa, 10 for dasamsa, up to 60). */
export async function fetchDivisionalChart(input: Omit<BirthInput, 'lang'> & { division: number }) {
  const { date, time, latitude, longitude, timezone, division } = input;
  return unwrap(
    roxy.vedicAstrology.generateDivisionalChart({
      body: { date, time, latitude, longitude, timezone, division },
    }),
  );
}

const NAKSHATRA_SLUGS = [
  'ashwini', 'bharani', 'krittika', 'rohini', 'mrigashira', 'ardra', 'punarvasu', 'pushya', 'ashlesha',
  'magha', 'purva-phalguni', 'uttara-phalguni', 'hasta', 'chitra', 'swati', 'vishakha', 'anuradha',
  'jyeshtha', 'moola', 'purva-ashadha', 'uttara-ashadha', 'shravana', 'dhanishta', 'shatabhisha',
  'purva-bhadrapada', 'uttara-bhadrapada', 'revati',
] as const;

const RASHI_SLUGS = [
  'mesha', 'vrishabha', 'mithun', 'karka', 'simha', 'kanya',
  'tula', 'vrischika', 'dhanu', 'makar', 'kumbha', 'meen',
] as const;

const ZODIAC_TITLE_CASE = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
];

/**
 * Vedic remedies for an already-generated kundali: the birth nakshatra's traditional remedies (mantras,
 * gemstones, rituals), healing crystals for the Moon sign, and healing crystals for the weakest Shadbala
 * planet. Takes already-derived scalars (via `findMoonPlacement`/`findWeakestPlanet` in `@/lib/roxy/remedies`) instead of
 * re-deriving them server-side, since the chart and shadbala are already in the browser from `generateKundali`.
 */
export async function fetchRoxyRemedies({
  nakshatraKey,
  moonSign,
  weakPlanet,
  lang,
}: {
  nakshatraKey: number;
  moonSign: string;
  weakPlanet: string;
  lang?: Lang;
}) {
  const nakshatraId = NAKSHATRA_SLUGS[nakshatraKey - 1];

  const [nakshatra, moonSignCrystals, planetCrystals] = await Promise.all([
    unwrap(roxy.vedicAstrology.getNakshatra({ path: { id: nakshatraId }, query: { lang } })),
    unwrap(
      roxy.crystals.getCrystalsByZodiac({
        path: { sign: moonSign as GetCrystalsZodiacBySignData['path']['sign'] },
        query: { lang, limit: 6 },
      }),
    ),
    unwrap(roxy.crystals.listCrystals({ query: { planet: weakPlanet, lang, limit: 6 } })),
  ]);

  return { nakshatra, moonSignCrystals, planetCrystals };
}

/**
 * RoxyAPI has no equivalents to AstrologyAPI's ascendant/nakshatra/pitra-dosha prose reports, so this
 * assembles the closest available substitute for an already-generated kundali: the Lagna sign's reference
 * characteristics (`GET /vedic-astrology/rashis/:id`) standing in for an ascendant reading, the birth
 * nakshatra's characteristics (same lookup the Remedies tab uses), and the 12 classical yogas
 * (`POST /vedic-astrology/yoga/detect`) — the one genuinely chart-driven interpretive endpoint RoxyAPI does
 * offer, which this app doesn't otherwise surface. Takes already-derived scalars (via
 * `findLagnaRashi`/`findMoonPlacement` in `@/lib/roxy/interpretation` and `@/lib/roxy/remedies`) since the
 * chart is already in the browser from `generateKundali`.
 */
export async function fetchRoxyInterpretation({
  date,
  time,
  latitude,
  longitude,
  timezone,
  lagnaRashi,
  nakshatraKey,
  lang,
}: BirthInput & { lagnaRashi: string; nakshatraKey: number }) {
  const body = { date, time, latitude, longitude, timezone };
  const rashiIndex = ZODIAC_TITLE_CASE.findIndex((z) => z.toLowerCase() === lagnaRashi.toLowerCase());
  const rashiId = RASHI_SLUGS[rashiIndex] ?? RASHI_SLUGS[0];
  const nakshatraId = NAKSHATRA_SLUGS[nakshatraKey - 1];

  const [rashi, nakshatra, yogas] = await Promise.all([
    unwrap(roxy.vedicAstrology.getRashi({ path: { id: rashiId }, query: { lang } })),
    unwrap(roxy.vedicAstrology.getNakshatra({ path: { id: nakshatraId }, query: { lang } })),
    unwrap(roxy.vedicAstrology.detectYogas({ query: { lang }, body })),
  ]);

  return { rashi, nakshatra, yogas };
}
