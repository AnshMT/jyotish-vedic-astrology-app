'use server';

import { astrologyApiRequest } from '@/lib/astrologyapi/client';
import { unwrap } from '@/lib/astrologyapi/guard';
import { toDateParams, type BirthInput } from '@/lib/astrologyapi/params';
import type {
  AstrologyApiPlanet,
  AstrologyApiChartHouse,
  AstrologyApiChartImage,
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
} from '@/lib/astrologyapi/types';

/**
 * Fans out one birth input to AstrologyAPI's kundli-equivalent endpoints in parallel: planets, the D1
 * birth chart (both the JSON house data and a rendered SVG diagram via `horo_chart_image`, matching the
 * visual chart RoxyAPI's `RoxyVedicKundli` renders), the D9 navamsa (so the Varga tab has something to show
 * before a division is picked, mirroring `@/app/kundali/actions`'s eager navamsa fetch), Vimshottari major
 * dashas, kalsarpa and sadhesati dosha, sarvashtakavarga, shadbala, the Lagna/nakshatra/pitra-dosha prose
 * readings, the gemstone/puja/rudraksha/sadhesati remedy suggestions, and the Lal Kitab chart and debts.
 */
export async function generateAstrologyApiKundli(input: BirthInput) {
  const params = toDateParams(input);

  const [
    planets,
    chart,
    chartImage,
    navamsa,
    dashas,
    kalsarpa,
    sadhesati,
    ashtakavarga,
    shadbala,
    ascendantReport,
    nakshatraReport,
    pitraDosha,
    gemSuggestion,
    pujaSuggestion,
    rudrakshaSuggestion,
    sadhesatiRemedies,
    lalkitabChart,
    lalkitabDebts,
  ] = await Promise.all([
    unwrap(() => astrologyApiRequest<AstrologyApiPlanet[]>('planets', params)),
    unwrap(() => astrologyApiRequest<AstrologyApiChartHouse[]>('horo_chart/D1', params)),
    unwrap(() => astrologyApiRequest<AstrologyApiChartImage>('horo_chart_image/D1', { ...params, chartType: 'north' })),
    fetchAstrologyApiDivisionalChart({ ...input, division: 9 }),
    unwrap(() => astrologyApiRequest<AstrologyApiDashaPeriod[]>('major_vdasha', params)),
    unwrap(() => astrologyApiRequest<AstrologyApiKalsarpaDosha>('kalsarpa_details', params)),
    unwrap(() => astrologyApiRequest<AstrologyApiSadhesati>('sadhesati_current_status', params)),
    unwrap(() => astrologyApiRequest<AstrologyApiSarvashtak>('sarvashtak', params)),
    unwrap(() => astrologyApiRequest<AstrologyApiShadbala[]>('shadbala', params)),
    unwrap(() => astrologyApiRequest<AstrologyApiAscendantReport>('general_ascendant_report', params)),
    unwrap(() => astrologyApiRequest<AstrologyApiNakshatraReport>('general_nakshatra_report', params)),
    unwrap(() => astrologyApiRequest<AstrologyApiPitraDosha>('pitra_dosha_report', params)),
    unwrap(() => astrologyApiRequest<AstrologyApiGemSuggestion>('basic_gem_suggestion', params)),
    unwrap(() => astrologyApiRequest<AstrologyApiPujaSuggestion>('puja_suggestion', params)),
    unwrap(() => astrologyApiRequest<AstrologyApiRudrakshaSuggestion>('rudraksha_suggestion', params)),
    unwrap(() => astrologyApiRequest<AstrologyApiSadhesatiRemedies>('sadhesati_remedies', params)),
    unwrap(() => astrologyApiRequest<AstrologyApiChartHouse[]>('lalkitab_horoscope', params)),
    unwrap(() => astrologyApiRequest<AstrologyApiLalkitabDebt[]>('lalkitab_debts', params)),
  ]);

  return {
    planets,
    chart,
    chartImage,
    navamsa,
    dashas,
    kalsarpa,
    sadhesati,
    ashtakavarga,
    shadbala,
    ascendantReport,
    nakshatraReport,
    pitraDosha,
    gemSuggestion,
    pujaSuggestion,
    rudrakshaSuggestion,
    sadhesatiRemedies,
    lalkitabChart,
    lalkitabDebts,
  };
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
 * Loads a single divisional (varga) chart on demand, both the JSON house data and the rendered SVG diagram
 * — the same `horo_chart`/`horo_chart_image` endpoints as the D1 chart, just with a different `chartId`
 * (e.g. `D9` for navamsa). Mirrors `@/app/kundali/actions`'s `fetchDivisionalChart`.
 */
export async function fetchAstrologyApiDivisionalChart(input: BirthInput & { division: number }) {
  const { division, ...birth } = input;
  const params = toDateParams(birth);
  const chartId = `D${division}`;

  const [chart, chartImage] = await Promise.all([
    unwrap(() => astrologyApiRequest<AstrologyApiChartHouse[]>(`horo_chart/${chartId}`, params)),
    unwrap(() => astrologyApiRequest<AstrologyApiChartImage>(`horo_chart_image/${chartId}`, { ...params, chartType: 'north' })),
  ]);

  return { chart, chartImage };
}
