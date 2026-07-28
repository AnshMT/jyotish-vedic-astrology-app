import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { t, translatePlanetName } from '@/lib/astrologyapi/i18n';
import type { Lang } from '@/lib/lang';
import type { AstrologyApiDashaPeriod } from '@/lib/astrologyapi/types';

/** Vimshottari Mahadasha timeline from `POST /major_vdasha`. `start`/`end` are the vendor's `"D-M-YYYY  H:MM"` strings, shown as-is. */
export function AstrologyApiDashaTimeline({ periods, lang }: { periods: AstrologyApiDashaPeriod[]; lang: Lang }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t(lang, 'dasha.title')}</CardTitle>
        <CardDescription>{t(lang, 'dasha.subtitle')}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {periods.map((p) => (
            <div
              key={`${p.planet_id}-${p.start}`}
              className="flex items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-muted/50"
            >
              <span className="font-medium text-foreground">{translatePlanetName(lang, p.planet)}</span>
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
