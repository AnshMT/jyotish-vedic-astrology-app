import { ChartDiagram } from '@/components/chart-diagram';
import type { Lang } from '@/lib/lang';
import { t, translatePlanetAbbr } from '@/lib/astrologyapi/i18n';
import type { AstrologyApiChartHouse } from '@/lib/astrologyapi/types';

/**
 * North Indian chart diagram for an AstrologyAPI `horo_chart`/`horo_chart_image` response. Replaces both the
 * vendor's rendered SVG (`AstrologyApiChartImage`, an opaque image from `POST /horo_chart_image/:chartId`
 * with English planet abbreviations baked in — that endpoint has no `lang` parameter at all) and the
 * house-list `AstrologyApiChart` grid this app used before, with a hand-drawn diagram whose labels are fully
 * localized. AstrologyAPI already returns `houses` pre-rotated from the ascendant (index 0 = house 1), so no
 * Lagna-offset computation is needed here, unlike the RoxyAPI adapter.
 */
export function AstrologyApiChartDiagram({ houses, lang }: { houses: AstrologyApiChartHouse[]; lang: Lang }) {
  const diagramHouses = houses.map((house, i) => ({
    houseNum: i + 1,
    rashiNumber: house.sign,
    isAscendant: i === 0,
    planets: house.planet.map((p) => translatePlanetAbbr(lang, p.charAt(0) + p.slice(1).toLowerCase())),
  }));

  return <ChartDiagram houses={diagramHouses} ascendantLabel={t(lang, 'common.ascendant')} />;
}
