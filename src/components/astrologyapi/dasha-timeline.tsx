import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { t, translatePlanetName } from '@/lib/astrologyapi/i18n';
import type { Lang } from '@/lib/lang';
import type { AstrologyApiCurrentVdashaAll, AstrologyApiDashaPeriod } from '@/lib/astrologyapi/types';

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

function CurrentLevelRow({ labelKey, period, lang }: { labelKey: 'currentDasha.level.maha' | 'currentDasha.level.antar' | 'currentDasha.level.pratyantar' | 'currentDasha.level.sookshma' | 'currentDasha.level.prana'; period: AstrologyApiDashaPeriod; lang: Lang }) {
  return (
    <div className="flex items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-muted/50">
      <span className="text-muted-foreground">{t(lang, labelKey)}</span>
      <span className="font-medium text-foreground">{translatePlanetName(lang, period.planet)}</span>
      <span className="tabular-nums text-muted-foreground">
        {period.start.trim()} &rarr; {period.end.trim()}
      </span>
    </div>
  );
}

/** Picks the period covering "now" from a `dasha_period` list, falling back to the last one if none matches (an in-progress final period with no bounding future entry). */
function activePeriod(periods: AstrologyApiDashaPeriod[]): AstrologyApiDashaPeriod | undefined {
  const now = Date.now();
  return periods.find((p) => {
    const start = Date.parse(p.start.trim().replace(/(\d+)-(\d+)-(\d+)/, '$3-$2-$1'));
    const end = Date.parse(p.end.trim().replace(/(\d+)-(\d+)-(\d+)/, '$3-$2-$1'));
    return !Number.isNaN(start) && !Number.isNaN(end) && now >= start && now <= end;
  }) ?? periods[0];
}

/**
 * The active Vimshottari period at every depth, from `POST /current_vdasha_all` — a drill-down to Prana
 * Dasha for "right now" in one call, complementing {@link AstrologyApiDashaTimeline}'s full lifetime list.
 */
export function AstrologyApiCurrentDashaAllCard({ data, lang }: { data: AstrologyApiCurrentVdashaAll; lang: Lang }) {
  const rows: Array<{ labelKey: Parameters<typeof CurrentLevelRow>[0]['labelKey']; period?: AstrologyApiDashaPeriod }> = [
    { labelKey: 'currentDasha.level.maha', period: activePeriod(data.major.dasha_period) },
    { labelKey: 'currentDasha.level.antar', period: activePeriod(data.minor.dasha_period) },
    { labelKey: 'currentDasha.level.pratyantar', period: activePeriod(data.sub_minor.dasha_period) },
    { labelKey: 'currentDasha.level.sookshma', period: activePeriod(data.sub_sub_minor.dasha_period) },
    { labelKey: 'currentDasha.level.prana', period: activePeriod(data.sub_sub_sub_minor.dasha_period) },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t(lang, 'currentDasha.title')}</CardTitle>
        <CardDescription>{t(lang, 'currentDasha.subtitle')}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {rows.map(
            ({ labelKey, period }) => period && <CurrentLevelRow key={labelKey} labelKey={labelKey} period={period} lang={lang} />,
          )}
        </div>
      </CardContent>
    </Card>
  );
}
