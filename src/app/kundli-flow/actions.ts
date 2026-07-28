'use server';

import { roxy } from '@/lib/roxy/client';
import { unwrap } from '@/lib/roxy/guard';
import type { Lang } from '@/lib/lang';

export interface KundliFlowInput {
  name: string;
  date: string;
  time: string;
  place: string;
  lang?: Lang;
}

/**
 * The MVP Kundli integration flow: resolve a free-text birth place to coordinates (the one hard-blocking
 * call), then fan the resulting birth input out to five independent endpoints in parallel — the birth
 * chart, the currently-running dasha stack, the three doshas, and the birth panchang. Mirrors the flow
 * documented for this page; unlike `@/app/kundali/actions`'s `generateKundali` (which uses
 * `dasha/major` for the full 120-year timeline), this uses `dasha/current` for just the active
 * Mahadasha/Antardasha/Pratyantardasha, matching what this page's "what dasha am I in right now" framing
 * calls for.
 */
export async function generateKundliFlow({ name, date, time, place, lang }: KundliFlowInput) {
  const locationResult = await unwrap(roxy.location.searchCities({ query: { q: place, limit: 1 } }));
  const city = locationResult.cities[0];
  if (!city) {
    throw new Error('Could not find that place. Try being more specific, e.g. "City, Country".');
  }

  const body = {
    date,
    time,
    latitude: city.latitude,
    longitude: city.longitude,
    timezone: city.utcOffset,
  };

  const [chart, dasha, manglik, kalsarpa, sadhesati, panchang] = await Promise.all([
    unwrap(roxy.vedicAstrology.generateBirthChart({ query: { lang }, body })),
    unwrap(roxy.vedicAstrology.getCurrentDasha({ query: { lang }, body })),
    unwrap(roxy.vedicAstrology.checkManglikDosha({ body })),
    unwrap(roxy.vedicAstrology.checkKalsarpaDosha({ body })),
    unwrap(roxy.vedicAstrology.checkSadhesati({ body })),
    unwrap(roxy.vedicAstrology.getBasicPanchang({ query: { lang }, body })),
  ]);

  return { name, city, chart, dasha, manglik, kalsarpa, sadhesati, panchang };
}
