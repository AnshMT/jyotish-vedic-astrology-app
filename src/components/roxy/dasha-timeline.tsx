import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { PostVedicAstrologyDashaMajorResponse } from '@roxyapi/sdk';
import type { Lang } from '@/lib/lang';
import { t, translatePlanetName } from '@/lib/roxy/i18n';

/**
 * Vimshottari Mahadasha timeline from `POST /vedic-astrology/dasha/major`, replacing the vendor
 * `<RoxyDashaTimeline>` (hardcoded English chrome — "Vimshottari Mahadasha", "Moon nakshatra", "Birth dasha
 * balance", etc. — with no i18n hook in controlled mode). `interpretation` is genuine vendor prose that
 * already arrives translated (this endpoint accepts `lang`, verified against a live Hindi response); only
 * the app's own labels below need `t()`. `nakshatraName`/`nakshatraLord` are proper nouns the vendor never
 * translates, same treatment as everywhere else in this app.
 */
export function RoxyDashaTimeline({ data, lang }: { data: PostVedicAstrologyDashaMajorResponse; lang: Lang }) {
  const balance = data.birthDashaBalance;
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t(lang, 'dasha.title')}</CardTitle>
        <CardDescription>{t(lang, 'dasha.subtitle')}</CardDescription>
        <p className="text-sm text-muted-foreground">
          {t(lang, 'dasha.moonNakshatra', { name: data.nakshatraName, lord: translatePlanetName(lang, data.nakshatraLord) })}
        </p>
        {balance && (
          <p className="text-sm text-muted-foreground">
            {t(lang, 'dasha.birthBalance', {
              years: balance.years,
              months: balance.months,
              days: balance.days,
              lord: translatePlanetName(lang, data.nakshatraLord),
            })}
          </p>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {data.mahadashas.map((p) => (
            <div key={`${p.planet}-${p.startDate}`} className="rounded-md px-3 py-2 text-sm hover:bg-muted/50">
              <div className="flex items-center justify-between">
                <span className="font-medium text-foreground">{translatePlanetName(lang, p.planet)}</span>
                <span className="tabular-nums text-muted-foreground">
                  {p.startDate} &rarr; {p.endDate}
                </span>
              </div>
              {p.interpretation && <p className="mt-1 text-sm text-muted-foreground">{p.interpretation}</p>}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
