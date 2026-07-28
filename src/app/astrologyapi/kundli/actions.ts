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
} from '@/lib/astrologyapi/types';

/**
 * Fans out one birth input to AstrologyAPI's kundli-equivalent endpoints in parallel: planets, the D1
 * birth chart, Vimshottari major dashas, kalsarpa and sadhesati dosha, sarvashtakavarga, and shadbala.
 * Mirrors `@/app/kundali/actions`'s `generateKundali`, sourced from AstrologyAPI instead of RoxyAPI.
 */
export async function generateAstrologyApiKundli(input: BirthInput) {
  const params = toDateParams(input);

  const [planets, chart, dashas, kalsarpa, sadhesati, ashtakavarga, shadbala] = await Promise.all([
    unwrap(() => astrologyApiRequest<AstrologyApiPlanet[]>('planets', params)),
    unwrap(() => astrologyApiRequest<AstrologyApiChartHouse[]>('horo_chart/D1', params)),
    unwrap(() => astrologyApiRequest<AstrologyApiDashaPeriod[]>('major_vdasha', params)),
    unwrap(() => astrologyApiRequest<AstrologyApiKalsarpaDosha>('kalsarpa_details', params)),
    unwrap(() => astrologyApiRequest<AstrologyApiSadhesati>('sadhesati_current_status', params)),
    unwrap(() => astrologyApiRequest<AstrologyApiSarvashtak>('sarvashtak', params)),
    unwrap(() => astrologyApiRequest<AstrologyApiShadbala[]>('shadbala', params)),
  ]);

  return { planets, chart, dashas, kalsarpa, sadhesati, ashtakavarga, shadbala };
}
