'use server';

import { astrologyApiRequest } from '@/lib/astrologyapi/client';
import { unwrap } from '@/lib/astrologyapi/guard';
import { toDateParams, type BirthInput } from '@/lib/astrologyapi/params';
import type {
  AstrologyApiMatchMakingReport,
  AstrologyApiMatchAshtakoot,
  AstrologyApiMatchManglik,
} from '@/lib/astrologyapi/types';

/** Prefixes both birth inputs' AstrologyAPI date params with `m_`/`f_`, as `match_*` endpoints expect. */
function toMatchParams(person1: BirthInput, person2: BirthInput) {
  const m = toDateParams(person1);
  const f = toDateParams(person2);
  return {
    m_day: m.day, m_month: m.month, m_year: m.year, m_hour: m.hour, m_min: m.min,
    m_lat: m.lat, m_lon: m.lon, m_tzone: m.tzone,
    f_day: f.day, f_month: f.month, f_year: f.year, f_hour: f.hour, f_min: f.min,
    f_lat: f.lat, f_lon: f.lon, f_tzone: f.tzone,
  };
}

/**
 * Fans out two birth inputs to AstrologyAPI's three Gun Milan endpoints in parallel: the overall
 * match-making report, the 8-koota Ashtakoot breakdown, and the per-person Manglik report. Mirrors
 * `@/app/matching/actions`'s `calculateMatch`, sourced from AstrologyAPI instead of RoxyAPI.
 */
export async function calculateAstrologyApiMatch({
  person1,
  person2,
}: {
  person1: BirthInput;
  person2: BirthInput;
}) {
  const params = toMatchParams(person1, person2);

  const [makingReport, ashtakoot, manglik] = await Promise.all([
    unwrap(() => astrologyApiRequest<AstrologyApiMatchMakingReport>('match_making_report', params)),
    unwrap(() => astrologyApiRequest<AstrologyApiMatchAshtakoot>('match_ashtakoot_points', params)),
    unwrap(() => astrologyApiRequest<AstrologyApiMatchManglik>('match_manglik_report', params)),
  ]);

  return { makingReport, ashtakoot, manglik };
}
