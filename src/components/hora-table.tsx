import type { PostVedicAstrologyPanchangHoraResponse } from '@roxyapi/sdk';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatTimeRange } from '@/lib/format';
import type { Lang } from '@/lib/lang';
import { t, translatePlanetName } from '@/lib/roxy/i18n';

type HoraData = PostVedicAstrologyPanchangHoraResponse;
type Hora = HoraData['dayHoras'][number];

function HoraColumn({
  title,
  subtitle,
  horas,
  lang,
}: {
  title: string;
  subtitle: string;
  horas: Hora[];
  lang: Lang;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {horas.map((h) => (
            <div
              key={h.number}
              className="flex items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-muted/50"
            >
              <div className="flex items-center gap-3">
                <span className="w-6 text-center text-xs text-muted-foreground">{h.number}</span>
                <span className="font-medium text-foreground">{translatePlanetName(lang, h.planet)}</span>
              </div>
              <span className="tabular-nums text-muted-foreground">
                {formatTimeRange(h.start, h.end)}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Hora (planetary hours) table. RoxyAPI has no dedicated Hora component, so this small bespoke table sits beside `RoxyChoghadiyaGrid`. The 24 horas (12 day, 12 night) follow the Chaldean planetary order.
 */
export function HoraTable({ data, lang }: { data: HoraData; lang: Lang }) {
  return (
    <div>
      <h2 className="mb-2 text-xl font-semibold text-foreground">{t(lang, 'hora.heading')}</h2>
      <p className="mb-4 text-sm text-muted-foreground">{t(lang, 'hora.subtitle')}</p>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <HoraColumn title={t(lang, 'hora.dayTitle')} subtitle={t(lang, 'hora.daySubtitle')} horas={data.dayHoras} lang={lang} />
        <HoraColumn title={t(lang, 'hora.nightTitle')} subtitle={t(lang, 'hora.nightSubtitle')} horas={data.nightHoras} lang={lang} />
      </div>
    </div>
  );
}
