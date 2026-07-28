import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { PostVedicAstrologyDashaCurrentResponse } from '@roxyapi/sdk';
import type { Lang } from '@/lib/lang';
import { t, translatePlanetName } from '@/lib/roxy/i18n';

interface DashaPeriod {
  planet: string;
  startDate: string;
  endDate: string;
  interpretation?: string;
}

interface Remaining {
  years: number;
  months: number;
  days: number;
}

function DashaLevel({
  label,
  period,
  remaining,
  lang,
}: {
  label: string;
  period: DashaPeriod;
  remaining: Remaining;
  lang: Lang;
}) {
  return (
    <div className="rounded-lg border border-border p-3">
      <div className="mb-1 flex items-center justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</p>
        <span className="text-xs tabular-nums text-muted-foreground">
          {t(lang, 'kundliFlow.dasha.remaining', { years: remaining.years, months: remaining.months, days: remaining.days })}
        </span>
      </div>
      <p className="font-medium text-foreground">{translatePlanetName(lang, period.planet)}</p>
      <p className="text-xs tabular-nums text-muted-foreground">
        {period.startDate} &rarr; {period.endDate}
      </p>
      {period.interpretation && <p className="mt-2 text-sm text-muted-foreground">{period.interpretation}</p>}
    </div>
  );
}

/**
 * The currently-running Mahadasha/Antardasha/Pratyantardasha from `POST /vedic-astrology/dasha/current`,
 * powering the "you are currently in X Mahadasha / Y Antardasha" line this flow's doc calls for. Distinct
 * from `RoxyDashaTimeline` (`@/components/roxy/dasha-timeline`), which renders the full 120-year
 * `dasha/major` timeline instead of just the active stack.
 */
export function RoxyCurrentDashaCard({ data, lang }: { data: PostVedicAstrologyDashaCurrentResponse; lang: Lang }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t(lang, 'kundliFlow.dashaTitle')}</CardTitle>
        <CardDescription>
          {t(lang, 'dasha.moonNakshatra', { name: data.nakshatraName, lord: translatePlanetName(lang, data.nakshatraLord) })}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <DashaLevel
          label={t(lang, 'kundliFlow.dasha.mahadasha')}
          period={data.mahadasha}
          remaining={data.remainingInMahadasha}
          lang={lang}
        />
        <DashaLevel
          label={t(lang, 'kundliFlow.dasha.antardasha')}
          period={data.antardasha}
          remaining={data.remainingInAntardasha}
          lang={lang}
        />
        <DashaLevel
          label={t(lang, 'kundliFlow.dasha.pratyantardasha')}
          period={data.pratyantardasha}
          remaining={data.remainingInPratyantardasha}
          lang={lang}
        />
      </CardContent>
    </Card>
  );
}
