import { Card, CardContent } from '@/components/ui/card';

/**
 * North Indian Vedic chart geometry (outer square + inner diamond + two corner-to-corner diagonals), shared
 * by both vendor pages since the layout itself is a Vedic-astrology convention, not vendor-specific.
 *
 * @remarks The coordinates and house/label layout are ported from RoxyAPI's own `@roxyapi/ui-react` chart
 * component (`<RoxyVedicKundli chartStyle="north">`), decompiled from its published CDN bundle to get the
 * geometry right — that vendor component draws the correct chart but bakes every label (rashi/house
 * numbering aside) in hardcoded English with no working `lang` prop in the mode this app uses it (verified
 * by finding zero references to `this.lang` anywhere in its rendering code). This component reimplements
 * the same proven geometry but takes already-localized label strings from the caller, so both the RoxyAPI
 * and AstrologyAPI adapters (`@/components/roxy/chart-diagram`, `@/components/astrologyapi/chart-diagram`)
 * can share one correct, tested drawing routine while fully controlling their own text.
 */

const SIZE = 400;
const MARGIN = 20;
const CENTER = SIZE / 2;
const QUARTER = (SIZE - 2 * MARGIN) / 4;

const TL = { x: MARGIN, y: MARGIN };
const TR = { x: SIZE - MARGIN, y: MARGIN };
const BR = { x: SIZE - MARGIN, y: SIZE - MARGIN };
const BL = { x: MARGIN, y: SIZE - MARGIN };
const TOP = { x: CENTER, y: MARGIN };
const RIGHT = { x: SIZE - MARGIN, y: CENTER };
const BOTTOM = { x: CENTER, y: SIZE - MARGIN };
const LEFT = { x: MARGIN, y: CENTER };
const TL_MID = { x: CENTER - QUARTER, y: CENTER - QUARTER };
const TR_MID = { x: CENTER + QUARTER, y: CENTER - QUARTER };
const BR_MID = { x: CENTER + QUARTER, y: CENTER + QUARTER };
const BL_MID = { x: CENTER - QUARTER, y: CENTER + QUARTER };

function centroid(points: { x: number; y: number }[]) {
  return {
    x: points.reduce((sum, p) => sum + p.x, 0) / points.length,
    y: points.reduce((sum, p) => sum + p.y, 0) / points.length,
  };
}

/** House 1 is always the top kite; houses proceed counter-clockwise from there (matches the vendor's proven layout). */
const HOUSE_LABEL_POS: Record<number, { x: number; y: number }> = {
  1: { x: CENTER, y: TL_MID.y },
  2: centroid([TL, TOP, TL_MID]),
  3: centroid([TL, LEFT, TL_MID]),
  4: { x: TL_MID.x, y: CENTER },
  5: centroid([BL, LEFT, BL_MID]),
  6: centroid([BL, BOTTOM, BL_MID]),
  7: { x: CENTER, y: BL_MID.y },
  8: centroid([BR, BOTTOM, BR_MID]),
  9: centroid([BR, RIGHT, BR_MID]),
  10: { x: BR_MID.x, y: CENTER },
  11: centroid([TR, RIGHT, TR_MID]),
  12: centroid([TR, TOP, TR_MID]),
};

export interface ChartDiagramHouse {
  houseNum: number;
  /** 1-12, Aries=1 .. Pisces=12. Digits only, so no translation is needed. */
  rashiNumber: number;
  isAscendant: boolean;
  /** Already-localized short planet labels for this house (e.g. translated 2-letter abbreviations). */
  planets: string[];
}

export function ChartDiagram({ houses, ascendantLabel }: { houses: ChartDiagramHouse[]; ascendantLabel: string }) {
  return (
    <Card>
      <CardContent className="flex justify-center pt-6">
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          role="img"
          aria-label="Vedic birth chart with twelve sign houses"
          className="w-full max-w-sm"
        >
          <rect
            x={MARGIN}
            y={MARGIN}
            width={SIZE - 2 * MARGIN}
            height={SIZE - 2 * MARGIN}
            fill="none"
            stroke="currentColor"
            strokeOpacity={0.3}
            strokeWidth={1.5}
          />
          <polygon
            points={`${TOP.x},${TOP.y} ${RIGHT.x},${RIGHT.y} ${BOTTOM.x},${BOTTOM.y} ${LEFT.x},${LEFT.y}`}
            fill="none"
            stroke="currentColor"
            strokeOpacity={0.3}
          />
          <line x1={TL.x} y1={TL.y} x2={BR.x} y2={BR.y} stroke="currentColor" strokeOpacity={0.3} />
          <line x1={TR.x} y1={TR.y} x2={BL.x} y2={BL.y} stroke="currentColor" strokeOpacity={0.3} />

          {houses.map((house) => {
            const pos = HOUSE_LABEL_POS[house.houseNum];
            if (!pos) return null;
            return (
              <g key={house.houseNum}>
                <text
                  x={pos.x}
                  y={pos.y - 20}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize={11}
                  fill="currentColor"
                  fillOpacity={0.55}
                >
                  {house.rashiNumber}
                </text>
                {house.isAscendant && (
                  <text
                    x={pos.x}
                    y={pos.y - 34}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize={9}
                    fontWeight={700}
                    letterSpacing={0.5}
                    fill="currentColor"
                  >
                    {ascendantLabel}
                  </text>
                )}
                {house.planets.map((label, i) => (
                  <text
                    key={label + i}
                    x={pos.x}
                    y={pos.y + 4 + i * 14}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize={13}
                    fontWeight={600}
                    fill="currentColor"
                  >
                    {label}
                  </text>
                ))}
              </g>
            );
          })}
        </svg>
      </CardContent>
    </Card>
  );
}
