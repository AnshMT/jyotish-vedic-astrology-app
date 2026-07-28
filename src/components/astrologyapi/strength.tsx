import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { AstrologyApiSarvashtak, AstrologyApiShadbala } from '@/lib/astrologyapi/types';

const SIGN_ORDER = [
  'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
  'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces',
] as const;

/** Sarvashtakavarga grid from `POST /sarvashtak`: total bindu points per sign, summed across all 8 grahas. */
export function AstrologyApiAshtakavargaGrid({ data }: { data: AstrologyApiSarvashtak }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sarvashtakavarga</CardTitle>
        <CardDescription>Total bindu strength points by sign (max 337 across the zodiac)</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {SIGN_ORDER.map((sign) => {
          const points = data.ashtak_points[sign];
          return (
            <div key={sign} className="rounded-lg border border-border bg-muted/30 p-3 text-center">
              <p className="text-xs capitalize text-muted-foreground">{sign}</p>
              <p className="text-2xl font-semibold tabular-nums text-foreground">{points?.total ?? '--'}</p>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

/** Shadbala strength table from `POST /shadbala`: total virupa strength vs. the minimum required, per graha. */
export function AstrologyApiShadbalaTable({ data }: { data: AstrologyApiShadbala[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Shadbala</CardTitle>
        <CardDescription>Six-fold planetary strength vs. the minimum required</CardDescription>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full min-w-[480px] text-sm">
          <thead>
            <tr className="border-b border-border text-left text-muted-foreground">
              <th className="pb-2 font-medium">Planet</th>
              <th className="pb-2 font-medium">Strength (virupa)</th>
              <th className="pb-2 font-medium">Minimum required</th>
              <th className="pb-2 font-medium">% of minimum</th>
              <th className="pb-2 font-medium">Verdict</th>
            </tr>
          </thead>
          <tbody>
            {data.map((p) => (
              <tr key={p.id} className="border-b border-border/50 last:border-0">
                <td className="py-2 font-medium text-foreground">{p.name}</td>
                <td className="py-2 tabular-nums text-muted-foreground">{p.total_shadbala_virupa.toFixed(1)}</td>
                <td className="py-2 tabular-nums text-muted-foreground">{p.required_minimum_virupa}</td>
                <td className="py-2 tabular-nums text-muted-foreground">{p.strength_percent_of_minimum.toFixed(1)}%</td>
                <td className="py-2">
                  <Badge variant={p.is_strong ? 'secondary' : 'destructive'}>
                    {p.is_strong ? 'Strong' : 'Weak'}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
