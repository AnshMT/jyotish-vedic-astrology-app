import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { t, translateSignName, translatePlanetName } from '@/lib/astrologyapi/i18n';
import type { Lang } from '@/lib/lang';
import type { AstrologyApiChartHouse } from '@/lib/astrologyapi/types';

/**
 * Birth chart grid from `POST /horo_chart/:chartId`. AstrologyAPI returns houses ordered from the
 * ascendant (index 0 = house 1), not by fixed zodiac position, so a North-Indian diamond layout would need
 * per-sign geometry; a 12-cell house grid renders the same house/sign/planet data without that complexity.
 */
export function AstrologyApiChart({ houses, lang }: { houses: AstrologyApiChartHouse[]; lang: Lang }) {
  return (
    <Card>
      <CardContent className="grid grid-cols-2 gap-3 pt-6 sm:grid-cols-3 lg:grid-cols-4">
        {houses.map((house, i) => (
          <div key={house.sign} className="rounded-lg border border-border bg-muted/30 p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">{t(lang, 'common.house', { n: i + 1 })}</span>
              <span className="text-xs text-muted-foreground">{translateSignName(lang, house.sign_name)}</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {house.planet.length === 0 ? (
                <span className="text-xs text-muted-foreground">&mdash;</span>
              ) : (
                house.planet.map((p) => {
                  const name = p.charAt(0) + p.slice(1).toLowerCase();
                  return (
                    <Badge key={p} variant="secondary" className="text-xs">
                      {translatePlanetName(lang, name)}
                    </Badge>
                  );
                })
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
