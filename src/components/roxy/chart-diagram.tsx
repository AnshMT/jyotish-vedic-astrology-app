import { ChartDiagram } from '@/components/chart-diagram';
import type { Lang } from '@/lib/lang';
import { t, translatePlanetAbbr } from '@/lib/roxy/i18n';

const ZODIAC = [
  'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
  'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces',
];

interface ChartMetaEntry {
  rashi: string;
  house?: number;
}

/**
 * North Indian chart diagram for a RoxyAPI birth/divisional chart's `meta` lookup. Replaces the vendor
 * `<RoxyVedicKundli>`/`<RoxyDivisionalChart>` (hardcoded English chrome, no working `lang` prop in
 * controlled mode) and the house-list `RoxyChartGrid` this app used before, with an actual hand-drawn chart
 * whose labels are fully localized.
 */
export function RoxyChartDiagram({ meta, lang }: { meta: Record<string, ChartMetaEntry>; lang: Lang }) {
  const lagna = meta.Lagna;
  if (!lagna) return null;

  const lagnaIndex = ZODIAC.indexOf(lagna.rashi.toLowerCase());
  if (lagnaIndex === -1) return null;

  const houses = Array.from({ length: 12 }, (_, i) => {
    const houseNum = i + 1;
    const rashiNumber = ((lagnaIndex + i) % 12) + 1;
    const planets = Object.entries(meta)
      .filter(([name, p]) => name !== 'Lagna' && p.house === houseNum)
      .map(([name]) => translatePlanetAbbr(lang, name));
    return { houseNum, rashiNumber, isAscendant: houseNum === 1, planets };
  });

  return <ChartDiagram houses={houses} ascendantLabel={t(lang, 'common.ascendant')} />;
}
