import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { AstrologyApiPlanet } from '@/lib/astrologyapi/types';

function isRetrograde(planet: AstrologyApiPlanet): boolean {
  return planet.isRetro === true || planet.isRetro === 'true';
}

/** Planetary positions table from `POST /planets`: sign, house, nakshatra, and retrograde status per graha. */
export function AstrologyApiPlanetsTable({ planets }: { planets: AstrologyApiPlanet[] }) {
  return (
    <Card>
      <CardContent className="overflow-x-auto pt-6">
        <table className="w-full min-w-[560px] text-sm">
          <thead>
            <tr className="border-b border-border text-left text-muted-foreground">
              <th className="pb-2 font-medium">Planet</th>
              <th className="pb-2 font-medium">Sign</th>
              <th className="pb-2 font-medium">House</th>
              <th className="pb-2 font-medium">Nakshatra</th>
              <th className="pb-2 font-medium">Degree</th>
            </tr>
          </thead>
          <tbody>
            {planets.map((p) => (
              <tr key={p.id} className="border-b border-border/50 last:border-0">
                <td className="py-2 font-medium text-foreground">
                  <span className="flex items-center gap-2">
                    {p.name}
                    {isRetrograde(p) && (
                      <Badge variant="outline" className="text-xs">
                        Rx
                      </Badge>
                    )}
                  </span>
                </td>
                <td className="py-2 text-foreground">{p.sign}</td>
                <td className="py-2 text-muted-foreground">{p.house}</td>
                <td className="py-2 text-muted-foreground">
                  {p.nakshatra} {p.nakshatra_pad ? `(pada ${p.nakshatra_pad})` : ''}
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
