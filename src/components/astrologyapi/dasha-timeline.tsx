import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { AstrologyApiDashaPeriod } from '@/lib/astrologyapi/types';

/** Vimshottari Mahadasha timeline from `POST /major_vdasha`. `start`/`end` are the vendor's `"D-M-YYYY  H:MM"` strings, shown as-is. */
export function AstrologyApiDashaTimeline({ periods }: { periods: AstrologyApiDashaPeriod[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vimshottari Mahadasha</CardTitle>
        <CardDescription>Major planetary periods across the lifetime</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {periods.map((p) => (
            <div
              key={`${p.planet_id}-${p.start}`}
              className="flex items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-muted/50"
            >
              <span className="font-medium text-foreground">{p.planet}</span>
              <span className="tabular-nums text-muted-foreground">
                {p.start.trim()} &rarr; {p.end.trim()}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
