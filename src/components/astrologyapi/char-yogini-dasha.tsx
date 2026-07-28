import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { t, translateSignName, translateDuration, translateYoginiDashaName } from '@/lib/astrologyapi/i18n';
import type { Lang } from '@/lib/lang';
import type {
  AstrologyApiCharDashaCurrent,
  AstrologyApiCharDashaPeriod,
  AstrologyApiYoginiDashaCurrent,
  AstrologyApiYoginiDashaPeriod,
} from '@/lib/astrologyapi/types';

/** Char Dasha (Jaimini): the active sign at all three depths, plus the full lifetime sign sequence. */
export function AstrologyApiCharDashaCard({
  current,
  major,
  lang,
}: {
  current: AstrologyApiCharDashaCurrent;
  major: AstrologyApiCharDashaPeriod[];
  lang: Lang;
}) {
  const levels = [
    ['charDasha.level.maha', current.major_dasha],
    ['charDasha.level.antar', current.sub_dasha],
    ['charDasha.level.pratyantar', current.sub_sub_dasha],
  ] as const;
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t(lang, 'charDasha.title')}</CardTitle>
        <CardDescription>{t(lang, 'charDasha.subtitle')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">{t(lang, 'charDasha.currentTitle')}</p>
          <div className="space-y-1">
            {levels.map(([labelKey, period]) => (
              <div key={labelKey} className="flex items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-muted/50">
                <span className="text-muted-foreground">{t(lang, labelKey)}</span>
                <span className="font-medium text-foreground">{translateSignName(lang, period.sign_name)}</span>
                <span className="tabular-nums text-muted-foreground">
                  {period.start_date} &rarr; {period.end_date}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">{t(lang, 'charDasha.lifetimeTitle')}</p>
          <div className="max-h-72 overflow-y-auto">
            {major.map((p, i) => (
              <div
                key={`${p.sign_id}-${p.start_date}-${i}`}
                className="flex items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-muted/50"
              >
                <span className="font-medium text-foreground">{translateSignName(lang, p.sign_name)}</span>
                <span className="text-muted-foreground">{translateDuration(lang, p.duration)}</span>
                <span className="tabular-nums text-muted-foreground">
                  {p.start_date} &rarr; {p.end_date}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/** Yogini Dasha: the active period at all three depths, plus the full 36-year lifetime cycle. */
export function AstrologyApiYoginiDashaCard({
  current,
  major,
  lang,
}: {
  current: AstrologyApiYoginiDashaCurrent;
  major: AstrologyApiYoginiDashaPeriod[];
  lang: Lang;
}) {
  const levels = [
    ['yoginiDasha.level.maha', current.major_dasha],
    ['yoginiDasha.level.antar', current.sub_dasha],
    ['yoginiDasha.level.pratyantar', current.sub_sub_dasha],
  ] as const;
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t(lang, 'yoginiDasha.title')}</CardTitle>
        <CardDescription>{t(lang, 'yoginiDasha.subtitle')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">{t(lang, 'yoginiDasha.currentTitle')}</p>
          <div className="space-y-1">
            {levels.map(([labelKey, period]) => (
              <div key={labelKey} className="flex items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-muted/50">
                <span className="text-muted-foreground">{t(lang, labelKey)}</span>
                <span className="font-medium text-foreground">{translateYoginiDashaName(lang, period.dasha_name)}</span>
                <span className="tabular-nums text-muted-foreground">
                  {period.start_date} &rarr; {period.end_date}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">{t(lang, 'yoginiDasha.lifetimeTitle')}</p>
          <div className="max-h-72 overflow-y-auto">
            {major.map((p, i) => (
              <div
                key={`${p.dasha_id}-${p.start_ms}-${i}`}
                className="flex items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-muted/50"
              >
                <span className="font-medium text-foreground">{translateYoginiDashaName(lang, p.dasha_name)}</span>
                <span className="tabular-nums text-muted-foreground">
                  {p.start_date} &rarr; {p.end_date}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
