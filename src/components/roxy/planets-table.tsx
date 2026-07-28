import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Lang } from '@/lib/lang';
import { t, translatePlanetName, translateSignName } from '@/lib/roxy/i18n';

interface ChartMetaEntry {
  rashi: string;
  house?: number;
  isRetrograde: boolean;
  longitude: number;
  nakshatra: { name: string; pada: number };
}

const PLANET_ORDER = ['Lagna', 'Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu'];

/**
 * Planetary positions table for a RoxyAPI birth chart's `meta` lookup, replacing the vendor
 * `<RoxyVedicPlanetsTable>` (hardcoded English column headers with no i18n hook in controlled mode).
 * Mirrors `AstrologyApiPlanetsTable`'s simpler 5-column layout (nakshatra lord and avastha, which the
 * vendor table also shows, are left out here for the same reason AstrologyAPI's version omits them).
 */
export function RoxyPlanetsTable({ meta, lang }: { meta: Record<string, ChartMetaEntry>; lang: Lang }) {
  const rows = Object.entries(meta).sort(
    ([a], [b]) => PLANET_ORDER.indexOf(a) - PLANET_ORDER.indexOf(b),
  );

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
            {rows.map(([name, p]) => (
              <tr key={name} className="border-b border-border/50 last:border-0">
                <td className="py-2 font-medium text-foreground">
                  <span className="flex items-center gap-2">
                    {translatePlanetName(lang, name)}
                    {p.isRetrograde && (
                      <Badge variant="outline" className="text-xs">
                        {t(lang, 'common.retrograde')}
                      </Badge>
                    )}
                  </span>
                </td>
                <td className="py-2 text-foreground">{translateSignName(lang, p.rashi)}</td>
                <td className="py-2 text-muted-foreground">{p.house ?? '—'}</td>
                <td className="py-2 text-muted-foreground">
                  {p.nakshatra.name} {t(lang, 'common.pada', { n: p.nakshatra.pada })}
                </td>
                <td className="py-2 tabular-nums text-muted-foreground">{(p.longitude % 30).toFixed(2)}&deg;</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
