import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { t, translatePlanetName, translateSignName } from '@/lib/astrologyapi/i18n';
import type { Lang } from '@/lib/lang';
import type { AstrologyApiTropicalTransitsMonthly } from '@/lib/astrologyapi/types';

function groupByDate(events: AstrologyApiTropicalTransitsMonthly['transit_relation']) {
  const groups = new Map<string, typeof events>();
  for (const e of events) {
    const list = groups.get(e.date) ?? [];
    list.push(e);
    groups.set(e.date, list);
  }
  return [...groups.entries()].sort(
    ([a], [b]) => new Date(a.split('-').reverse().join('-')).getTime() - new Date(b.split('-').reverse().join('-')).getTime(),
  );
}

/** Monthly tropical transit-to-natal aspects from `POST /tropical_transits/monthly`. Aspect type names (e.g. "Trine", "Opposition") are left in English — the vendor has no localization for them. */
export function AstrologyApiTransitsView({ data, lang }: { data: AstrologyApiTropicalTransitsMonthly; lang: Lang }) {
  const byDate = groupByDate(data.transit_relation);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{data.month_start_date} &ndash; {data.month_end_date}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-3">
          <Badge variant="secondary">
            {t(lang, 'transitsView.ascendant', { sign: translateSignName(lang, data.ascendant) })}
          </Badge>
          {data.retrogrades.length > 0 &&
            data.retrogrades.map((r) => (
              <Badge key={r.planet} variant="outline">
                {translatePlanetName(lang, r.planet)} {t(lang, 'common.retrograde')}
              </Badge>
            ))}
        </CardContent>
      </Card>

      {byDate.length === 0 ? (
        <p className="py-8 text-center text-muted-foreground">{t(lang, 'transitsView.none')}</p>
      ) : (
        byDate.map(([date, events]) => (
          <Card key={date}>
            <CardHeader className="pb-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">{date}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {events.map((e, i) => (
                <div key={`${e.transit_planet}-${e.natal_planet}-${i}`} className="flex items-center gap-3">
                  <Badge>{translatePlanetName(lang, e.transit_planet)}</Badge>
                  <Badge variant="outline">{e.type}</Badge>
                  <Badge>{translatePlanetName(lang, e.natal_planet)}</Badge>
                  <span className="ml-auto text-xs tabular-nums text-muted-foreground">
                    {e.orb.toFixed(2)} {t(lang, 'common.orb')}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
