'use server';

import { astrologyApiRequest } from '@/lib/astrologyapi/client';
import { unwrap } from '@/lib/astrologyapi/guard';
import { toDateParams, type BirthInput } from '@/lib/astrologyapi/params';
import type {
  AstrologyApiPlanet,
  AstrologyApiChartHouse,
  AstrologyApiDashaPeriod,
  AstrologyApiKalsarpaDosha,
  AstrologyApiSadhesati,
  AstrologyApiSarvashtak,
  AstrologyApiShadbala,
  AstrologyApiAscendantReport,
  AstrologyApiNakshatraReport,
  AstrologyApiPitraDosha,
  AstrologyApiGemSuggestion,
  AstrologyApiPujaSuggestion,
  AstrologyApiRudrakshaSuggestion,
  AstrologyApiSadhesatiRemedies,
  AstrologyApiLalkitabDebt,
  AstrologyApiRashiReport,
  AstrologyApiHouseReport,
  AstrologyApiLalkitabRemedy,
  AstrologyApiGhatChakra,
  AstrologyApiCurrentVdashaAll,
  AstrologyApiBhavabala,
  AstrologyApiPanchadhaMaitri,
  AstrologyApiLalkitabHouse,
  AstrologyApiLalkitabPlanet,
  AstrologyApiCharDashaCurrent,
  AstrologyApiCharDashaPeriod,
  AstrologyApiYoginiDashaCurrent,
  AstrologyApiYoginiDashaPeriod,
  AstrologyApiKpPlanet,
  AstrologyApiKpHouseCusp,
  AstrologyApiVarshaphalYearChart,
  AstrologyApiVarshaphalMuddaDasha,
  AstrologyApiVarshaphalYoga,
} from '@/lib/astrologyapi/types';

/**
 * Fans out one birth input to AstrologyAPI's kundli-equivalent endpoints in parallel: planets, the D1
 * birth chart, the D9 navamsa (so the Varga tab has something to show before a division is picked, mirroring
 * `@/app/kundali/actions`'s eager navamsa fetch), Vimshottari major dashas plus the current period at every
 * depth in one call, kalsarpa and sadhesati dosha, sarvashtakavarga, shadbala and bhavabala, the panchadha
 * maitri friendship table, the Lagna/nakshatra/pitra-dosha prose readings, the birth-moment anga snapshot
 * (`ghat_chakra`), the gemstone/puja/rudraksha/sadhesati remedy suggestions, the Lal Kitab chart, debts,
 * houses, and planets, and — for the Advanced tab — Char Dasha, Yogini Dasha, and the KP system. The house
 * data drives a hand-drawn, localized chart diagram (`@/components/astrologyapi/chart-diagram`) rather than
 * fetching `horo_chart_image`'s rendered SVG, which has no `lang` parameter and bakes English planet
 * abbreviations into the image itself.
 */
export async function generateAstrologyApiKundli(input: BirthInput) {
  const params = toDateParams(input);

  const [
    planets,
    chart,
    navamsa,
    dashas,
    currentDashaAll,
    kalsarpa,
    sadhesati,
    ashtakavarga,
    shadbala,
    bhavabala,
    panchadhaMaitri,
    ascendantReport,
    nakshatraReport,
    pitraDosha,
    ghatChakra,
    gemSuggestion,
    pujaSuggestion,
    rudrakshaSuggestion,
    sadhesatiRemedies,
    lalkitabChart,
    lalkitabDebts,
    lalkitabHouses,
    lalkitabPlanets,
    charDasha,
    yoginiDasha,
    kp,
  ] = await Promise.all([
    unwrap(() => astrologyApiRequest<AstrologyApiPlanet[]>('planets', params)),
    unwrap(() => astrologyApiRequest<AstrologyApiChartHouse[]>('horo_chart/D1', params)),
    fetchAstrologyApiDivisionalChart({ ...input, division: 9 }),
    unwrap(() => astrologyApiRequest<AstrologyApiDashaPeriod[]>('major_vdasha', params)),
    unwrap(() => astrologyApiRequest<AstrologyApiCurrentVdashaAll>('current_vdasha_all', params)),
    unwrap(() => astrologyApiRequest<AstrologyApiKalsarpaDosha>('kalsarpa_details', params)),
    unwrap(() => astrologyApiRequest<AstrologyApiSadhesati>('sadhesati_current_status', params)),
    unwrap(() => astrologyApiRequest<AstrologyApiSarvashtak>('sarvashtak', params)),
    unwrap(() => astrologyApiRequest<AstrologyApiShadbala[]>('shadbala', params)),
    unwrap(() => astrologyApiRequest<AstrologyApiBhavabala>('bhavabala', params)),
    unwrap(() => astrologyApiRequest<AstrologyApiPanchadhaMaitri>('panchadha_maitri', params)),
    unwrap(() => astrologyApiRequest<AstrologyApiAscendantReport>('general_ascendant_report', params)),
    unwrap(() => astrologyApiRequest<AstrologyApiNakshatraReport>('general_nakshatra_report', params)),
    unwrap(() => astrologyApiRequest<AstrologyApiPitraDosha>('pitra_dosha_report', params)),
    unwrap(() => astrologyApiRequest<AstrologyApiGhatChakra>('ghat_chakra', params)),
    unwrap(() => astrologyApiRequest<AstrologyApiGemSuggestion>('basic_gem_suggestion', params)),
    unwrap(() => astrologyApiRequest<AstrologyApiPujaSuggestion>('puja_suggestion', params)),
    unwrap(() => astrologyApiRequest<AstrologyApiRudrakshaSuggestion>('rudraksha_suggestion', params)),
    unwrap(() => astrologyApiRequest<AstrologyApiSadhesatiRemedies>('sadhesati_remedies', params)),
    unwrap(() => astrologyApiRequest<AstrologyApiChartHouse[]>('lalkitab_horoscope', params)),
    unwrap(() => astrologyApiRequest<AstrologyApiLalkitabDebt[]>('lalkitab_debts', params)),
    unwrap(() => astrologyApiRequest<AstrologyApiLalkitabHouse[]>('lalkitab_houses', params)),
    unwrap(() => astrologyApiRequest<AstrologyApiLalkitabPlanet[]>('lalkitab_planets', params)),
    fetchAstrologyApiCharDasha(input),
    fetchAstrologyApiYoginiDasha(input),
    fetchAstrologyApiKpSystem(input),
  ]);

  return {
    planets,
    chart,
    navamsa,
    dashas,
    currentDashaAll,
    kalsarpa,
    sadhesati,
    ashtakavarga,
    shadbala,
    bhavabala,
    panchadhaMaitri,
    ascendantReport,
    nakshatraReport,
    pitraDosha,
    ghatChakra,
    gemSuggestion,
    pujaSuggestion,
    rudrakshaSuggestion,
    sadhesatiRemedies,
    lalkitabChart,
    lalkitabDebts,
    lalkitabHouses,
    lalkitabPlanets,
    charDasha,
    yoginiDasha,
    kp,
  };
}

/**
 * Loads Char Dasha (Jaimini) on demand: the active period at all three depths plus the full lifetime sign
 * sequence. Kept separate from the eager fetch since it's a distinct dasha system most visitors checking the
 * Dasha tab won't need immediately.
 */
export async function fetchAstrologyApiCharDasha(input: BirthInput) {
  const params = toDateParams(input);
  const [current, major] = await Promise.all([
    unwrap(() => astrologyApiRequest<AstrologyApiCharDashaCurrent>('current_chardasha', params)),
    unwrap(() => astrologyApiRequest<AstrologyApiCharDashaPeriod[]>('major_chardasha', params)),
  ]);
  return { current, major };
}

/** Loads Yogini Dasha on demand: the active period at all three depths plus the full 36-year lifetime cycle. */
export async function fetchAstrologyApiYoginiDasha(input: BirthInput) {
  const params = toDateParams(input);
  const [current, major] = await Promise.all([
    unwrap(() => astrologyApiRequest<AstrologyApiYoginiDashaCurrent>('current_yogini_dasha', params)),
    unwrap(() => astrologyApiRequest<AstrologyApiYoginiDashaPeriod[]>('major_yogini_dasha', params)),
  ]);
  return { current, major };
}

/** Loads the KP (Krishnamurti Paddhati) system on demand: sub-lorded planet placements and house cusps. */
export async function fetchAstrologyApiKpSystem(input: BirthInput) {
  const params = toDateParams(input);
  const [planets, cusps] = await Promise.all([
    unwrap(() => astrologyApiRequest<AstrologyApiKpPlanet[]>('kp_planets', params)),
    unwrap(() => astrologyApiRequest<AstrologyApiKpHouseCusp[]>('kp_house_cusps', params)),
  ]);
  return { planets, cusps };
}

/**
 * Loads the Varshaphal (annual solar-return chart) for a given year on demand: the year chart itself, its
 * Muntha sign, its Mudda Dasha sequence, its planet placements, and any yogas active for that year.
 * `varshaphal_year` is the vendor's own param name for the target year, distinct from the birth year.
 */
export async function fetchAstrologyApiVarshaphal(input: BirthInput & { varshaphalYear: number }) {
  const { varshaphalYear, ...birth } = input;
  const params = { ...toDateParams(birth), varshaphal_year: varshaphalYear };
  const [yearChart, muntha, muddaDasha, planets, yogas] = await Promise.all([
    unwrap(() => astrologyApiRequest<AstrologyApiVarshaphalYearChart>('varshaphal_year_chart', params)),
    unwrap(() => astrologyApiRequest<string>('varshaphal_muntha', params)),
    unwrap(() => astrologyApiRequest<AstrologyApiVarshaphalMuddaDasha[]>('varshaphal_mudda_dasha', params)),
    unwrap(() => astrologyApiRequest<AstrologyApiPlanet[]>('varshaphal_planets', params)),
    unwrap(() => astrologyApiRequest<AstrologyApiVarshaphalYoga[]>('varshaphal_yoga', params)),
  ]);
  return { yearChart, muntha, muddaDasha, planets, yogas: yogas.filter((y) => y.is_yog_happening) };
}

/**
 * Loads one planet's Rashi and House prose readings on demand (`general_rashi_report`/`general_house_report`
 * both take a `:planet_name` path segment, so fetching all nine eagerly would be nine extra round trips
 * per generation for readings most visitors will only check for one or two planets).
 */
export async function fetchAstrologyApiPlanetReport(input: BirthInput & { planet: string }) {
  const { planet, ...birth } = input;
  const params = toDateParams(birth);

  const [rashi, house] = await Promise.all([
    unwrap(() => astrologyApiRequest<AstrologyApiRashiReport>(`general_rashi_report/${planet}`, params)),
    unwrap(() => astrologyApiRequest<AstrologyApiHouseReport>(`general_house_report/${planet}`, params)),
  ]);

  return { rashi, house };
}

/** Loads one planet's Lal Kitab house placement and remedies on demand (also a `:planet_name`-keyed endpoint). */
export async function fetchAstrologyApiLalkitabRemedy(input: BirthInput & { planet: string }) {
  const { planet, ...birth } = input;
  const params = toDateParams(birth);
  return unwrap(() => astrologyApiRequest<AstrologyApiLalkitabRemedy>(`lalkitab_remedies/${planet}`, params));
}

/**
 * Loads a single divisional (varga) chart's house data on demand — the same `horo_chart` endpoint as the D1
 * chart, just with a different `chartId` (e.g. `D9` for navamsa). Mirrors `@/app/kundali/actions`'s
 * `fetchDivisionalChart`.
 */
export async function fetchAstrologyApiDivisionalChart(input: BirthInput & { division: number }) {
  const { division, ...birth } = input;
  const params = toDateParams(birth);
  const chartId = `D${division}`;
  const chart = await unwrap(() => astrologyApiRequest<AstrologyApiChartHouse[]>(`horo_chart/${chartId}`, params));
  return { chart };
}
