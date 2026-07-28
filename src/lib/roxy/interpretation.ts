import type { BirthChartResponse } from '@roxyapi/sdk';

/** The Ascendant's zodiac sign (title-case, e.g. `"Scorpio"`), read from the birth chart's `meta.Lagna`. */
export function findLagnaRashi(chart: BirthChartResponse): string {
  const lagna = chart.meta['Lagna'];
  if (!lagna) throw new Error('Lagna not found in birth chart');
  return lagna.rashi;
}
