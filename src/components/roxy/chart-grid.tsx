import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Lang } from '@/lib/lang';
import { t, translatePlanetName, translateSignName } from '@/lib/roxy/i18n';

const ZODIAC = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
] as const;

interface ChartMetaEntry {
  rashi: string;
  house?: number;
}

/**
 * 12-house chart grid for a RoxyAPI birth/divisional chart, replacing the vendor `<RoxyVedicKundli>`/
 * `<RoxyDivisionalChart>` (which render an SVG chart whose title and layout chrome is hardcoded English —
 * confirmed by inspecting the compiled bundle, same limitation as the vendor dosha card). Derives each
 * house's sign from the Lagna's rashi (whole-sign houses run consecutively from the ascendant) rather than
 * relying on per-sign chart buckets, so the same component works for both the D1 birth chart and any
 * divisional chart, both of which expose an identically-shaped `meta` lookup.
 */
export function RoxyChartGrid({ meta, lang }: { meta: Record<string, ChartMetaEntry>; lang: Lang }) {
  const lagna = meta.Lagna;
  if (!lagna) return null;

  const lagnaIndex = ZODIAC.findIndex((z) => z.toLowerCase() === lagna.rashi.toLowerCase());
  if (lagnaIndex === -1) return null;

  const houses = Array.from({ length: 12 }, (_, i) => {
    const houseNum = i + 1;
    const signName = ZODIAC[(lagnaIndex + i) % 12];
    const planets = Object.entries(meta).filter(([name, p]) => name !== 'Lagna' && p.house === houseNum);
    return { houseNum, signName, planets };
  });

  return (
    <Card>
      <CardContent className="grid grid-cols-2 gap-3 pt-6 sm:grid-cols-3 lg:grid-cols-4">
        {houses.map((house) => (
          <div key={house.houseNum} className="rounded-lg border border-border bg-muted/30 p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">
                {t(lang, 'common.house', { n: house.houseNum })}
              </span>
              <span className="text-xs text-muted-foreground">{translateSignName(lang, house.signName)}</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {house.houseNum === 1 && (
                <Badge variant="outline" className="text-xs">
                  {t(lang, 'common.ascendant')}
                </Badge>
              )}
              {house.planets.length === 0 && house.houseNum !== 1 ? (
                <span className="text-xs text-muted-foreground">&mdash;</span>
              ) : (
                house.planets.map(([name]) => (
                  <Badge key={name} variant="secondary" className="text-xs">
                    {translatePlanetName(lang, name)}
                  </Badge>
                ))
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
