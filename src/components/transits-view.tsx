import type {
  PostVedicAstrologyTransitMonthlyResponse,
  PostVedicAstrologyAspectsMonthlyResponse,
} from '@roxyapi/sdk';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatDateShort } from '@/lib/format';
import type { Lang } from '@/lib/lang';
import { t, translatePlanetName, translateSignName, translateAspect } from '@/lib/roxy/i18n';

type Transits = PostVedicAstrologyTransitMonthlyResponse;
type Aspects = PostVedicAstrologyAspectsMonthlyResponse;

function groupByDate<T extends { date: string }>(events: T[]): [string, T[]][] {
  const groups = new Map<string, T[]>();
  for (const e of events) {
    const list = groups.get(e.date) ?? [];
    list.push(e);
    groups.set(e.date, list);
  }
  return [...groups.entries()].sort(([a], [b]) => a.localeCompare(b));
}

function titleCase(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, ' ');
}

/** Title-cased English fallback for aspect names outside the closed Hindi vocabulary `translateAspect` covers. */
function aspectLabel(lang: Lang, aspect: string): string {
  const translated = translateAspect(lang, aspect);
  return translated === aspect ? titleCase(aspect) : translated;
}

/**
 * Monthly Vedic transit and aspect renderer. There is no dedicated Roxy UI component for Vedic monthly transits (`RoxyTransitsTable` is Western), so this small table renders the typed response directly. Server component, no client cost.
 */
export function TransitsView({ transits, aspects, lang }: { transits: Transits; aspects: Aspects; lang: Lang }) {
  const signChanges = groupByDate(transits.transitEvents);
  const aspectDays = groupByDate(aspects.events);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t(lang, 'transitsView.startingPositions')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {transits.startingPositions.map((pos) => (
              <div
                key={pos.planet}
                className="flex items-center justify-between rounded-lg bg-muted px-3 py-2"
              >
                <span className="text-sm font-medium text-foreground">{translatePlanetName(lang, pos.planet)}</span>
                <span className="text-xs text-muted-foreground">{translateSignName(lang, pos.sign)}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">{t(lang, 'transitsView.signChanges')}</h2>
        {signChanges.length === 0 ? (
          <p className="py-8 text-center text-muted-foreground">{t(lang, 'transitsView.noSignChanges')}</p>
        ) : (
          signChanges.map(([date, events]) => (
            <Card key={date}>
              <CardHeader className="pb-0">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {formatDateShort(date)}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {events.map((e, i) => (
                  <div key={`${e.planet}-${e.toSign}-${i}`} className="flex items-center gap-3">
                    <Badge>{translatePlanetName(lang, e.planet)}</Badge>
                    <p className="flex-1 text-sm text-foreground">
                      {translateSignName(lang, e.fromSign)}{' '}
                      <span className="text-muted-foreground">{t(lang, 'transitsView.to')}</span>{' '}
                      {translateSignName(lang, e.toSign)}
                    </p>
                    {e.isRetrograde && (
                      <Badge variant="outline" className="text-xs">
                        {t(lang, 'transitsView.retrograde')}
                      </Badge>
                    )}
                    <span className="text-xs tabular-nums text-muted-foreground">{e.time}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))
        )}
      </section>

      {aspectDays.length > 0 && (
        <>
          <Separator />
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">{t(lang, 'transitsView.planetaryAspects')}</h2>
            {aspectDays.map(([date, events]) => (
              <Card key={date}>
                <CardHeader className="pb-0">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {formatDateShort(date)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {events.map((e, i) => (
                    <div
                      key={`${e.planet1}-${e.planet2}-${e.aspect}-${i}`}
                      className="flex items-center gap-3"
                    >
                      <Badge>{translatePlanetName(lang, e.planet1)}</Badge>
                      <Badge variant="outline">{aspectLabel(lang, e.aspect)}</Badge>
                      <Badge>{translatePlanetName(lang, e.planet2)}</Badge>
                      <span className="ml-auto text-xs text-muted-foreground">
                        {e.orb.toFixed(2)} {t(lang, 'transitsView.orb')}
                      </span>
                      <span className="text-xs tabular-nums text-muted-foreground">{e.time}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </section>
        </>
      )}
    </div>
  );
}
