import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatClockRange } from '@/lib/format';
import { t, translateMuhurta } from '@/lib/astrologyapi/i18n';
import type { Lang } from '@/lib/lang';
import type { AstrologyApiChaughadiya } from '@/lib/astrologyapi/types';

const AUSPICIOUS = new Set(['Amrit', 'Shubh', 'Labh', 'Char']);

function ChoghadiyaColumn({
  title,
  subtitle,
  periods,
  lang,
}: {
  title: string;
  subtitle: string;
  periods: { time: string; muhurta: string }[];
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
          {periods.map((p, i) => (
            <div
              key={`${p.muhurta}-${i}`}
              className="flex items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-muted/50"
            >
              <span className="flex items-center gap-2">
                <span className="font-medium text-foreground">{translateMuhurta(lang, p.muhurta)}</span>
                <Badge variant={AUSPICIOUS.has(p.muhurta) ? 'secondary' : 'outline'} className="text-xs">
                  {AUSPICIOUS.has(p.muhurta) ? t(lang, 'choghadiya.auspicious') : t(lang, 'choghadiya.avoid')}
                </Badge>
              </span>
              <span className="tabular-nums text-muted-foreground">{formatClockRange(p.time)}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

/** Choghadiya grid from `POST /chaughadiya_muhurta`: 8 day + 8 night muhurta periods. */
export function AstrologyApiChoghadiyaView({ data, lang }: { data: AstrologyApiChaughadiya; lang: Lang }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <ChoghadiyaColumn
        title={t(lang, 'choghadiya.dayTitle')}
        subtitle={t(lang, 'choghadiya.daySubtitle')}
        periods={data.chaughadiya.day}
        lang={lang}
      />
      <ChoghadiyaColumn
        title={t(lang, 'choghadiya.nightTitle')}
        subtitle={t(lang, 'choghadiya.nightSubtitle')}
        periods={data.chaughadiya.night}
        lang={lang}
      />
    </div>
  );
}
