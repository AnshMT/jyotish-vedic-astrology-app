import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { t, translatePlanetName, translateSignName } from '@/lib/astrologyapi/i18n';
import type { Lang } from '@/lib/lang';
import type { AstrologyApiPlanet } from '@/lib/astrologyapi/types';

function isRetrograde(planet: AstrologyApiPlanet): boolean {
  return planet.isRetro === true || planet.isRetro === 'true';
}

/**
 * Planetary positions table from `POST /planets`: sign, house, nakshatra, and retrograde status per graha.
 * Planet and sign names are translated (a small closed vocabulary); nakshatra names are left in the
 * vendor's English/Romanized form since AstrologyAPI returns 27 of them with no localization to draw from.
 */
export function AstrologyApiPlanetsTable({ planets, lang }: { planets: AstrologyApiPlanet[]; lang: Lang }) {
  return (
    <Card>
      <CardContent className="overflow-x-auto pt-6">
        <table className="w-full min-w-[560px] text-sm">
          <thead>
            <tr className="border-b border-border text-left text-muted-foreground">
              <th className="pb-2 font-medium">{t(lang, 'planetsTable.planet')}</th>
              <th className="pb-2 font-medium">{t(lang, 'planetsTable.sign')}</th>
              <th className="pb-2 font-medium">{t(lang, 'planetsTable.house')}</th>
              <th className="pb-2 font-medium">{t(lang, 'planetsTable.nakshatra')}</th>
              <th className="pb-2 font-medium">{t(lang, 'planetsTable.degree')}</th>
            </tr>
          </thead>
          <tbody>
            {planets.map((p) => (
              <tr key={p.id} className="border-b border-border/50 last:border-0">
                <td className="py-2 font-medium text-foreground">
                  <span className="flex items-center gap-2">
                    {translatePlanetName(lang, p.name)}
                    {isRetrograde(p) && (
                      <Badge variant="outline" className="text-xs">
                        {t(lang, 'common.retrograde')}
                      </Badge>
                    )}
                  </span>
                </td>
                <td className="py-2 text-foreground">{translateSignName(lang, p.sign)}</td>
                <td className="py-2 text-muted-foreground">{p.house}</td>
                <td className="py-2 text-muted-foreground">
                  {p.nakshatra} {p.nakshatra_pad ? t(lang, 'common.pada', { n: p.nakshatra_pad }) : ''}
                </td>
                <td className="py-2 tabular-nums text-muted-foreground">
                  {p.normDegree.toFixed(2)}&deg;
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
