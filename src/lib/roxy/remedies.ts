import type { BirthChartResponse, ShadbalaResponse } from '@roxyapi/sdk';

/**
 * Pure helpers for deriving the inputs to {@link fetchRoxyRemedies} (`@/app/kundali/actions`) from an
 * already-generated kundali. Kept out of `actions.ts` because a `'use server'` file may only export async
 * functions — a Client Component importing a plain sync helper from one fails the build.
 */

/** The Moon's zodiac sign (lowercase, for the crystals endpoints) and 1-27 nakshatra index (for the birth-nakshatra lookup), read from the birth chart's `meta` lookup rather than scanning all 12 sign groups. */
export function findMoonPlacement(chart: BirthChartResponse): { moonSign: string; nakshatraKey: number } {
  const moon = chart.meta['Moon'];
  if (!moon) throw new Error('Moon not found in birth chart');
  return { moonSign: moon.rashi, nakshatraKey: moon.nakshatra.key };
}

/** The weakest of the 7 classical Shadbala planets (`relativeRank` 7 = weakest), a common remedy target. */
export function findWeakestPlanet(shadbala: ShadbalaResponse): string {
  return shadbala.planets.find((p) => p.relativeRank === 7)?.planet ?? shadbala.planets[0].planet;
}
