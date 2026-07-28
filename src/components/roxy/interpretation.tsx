import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { RashiResponse, GetVedicAstrologyNakshatrasByIdResponse, YogaDetectResponse } from '@roxyapi/sdk';
import type { Lang } from '@/lib/lang';
import { t, translateSignName, translateYogaQuality } from '@/lib/roxy/i18n';

/**
 * Ascendant reading substitute: RoxyAPI has no birth-chart-specific "ascendant reading" endpoint like
 * AstrologyAPI's `general_ascendant_report`, so this uses the Lagna sign's reference characteristics
 * (`GET /vedic-astrology/rashis/:id`) instead — the closest available equivalent.
 */
export function RoxyAscendantCard({ data, lang }: { data: RashiResponse; lang: Lang }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t(lang, 'interpretation.ascendantTitle')}</CardTitle>
        <CardDescription>
          {t(lang, 'interpretation.lagna', { sign: translateSignName(lang, data.name) })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{data.characteristics}</p>
      </CardContent>
    </Card>
  );
}

/** Birth-nakshatra characteristics — the same reference lookup the Remedies tab uses, shown here as a reading. */
export function RoxyNakshatraReadingCard({
  data,
  lang,
}: {
  data: GetVedicAstrologyNakshatrasByIdResponse;
  lang: Lang;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t(lang, 'interpretation.nakshatraTitle')}</CardTitle>
        <CardDescription>{t(lang, 'interpretation.nakshatraSubtitle', { name: data.name })}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{data.characteristics}</p>
      </CardContent>
    </Card>
  );
}

/**
 * The 12 classical Vedic yogas detected in the chart (`POST /vedic-astrology/yoga/detect`) — the one
 * genuinely chart-driven interpretive endpoint RoxyAPI offers. Only yogas present in this specific chart are
 * shown; the other absent ones would just be noise in a reading.
 */
export function RoxyYogasCard({ data, lang }: { data: YogaDetectResponse; lang: Lang }) {
  const present = data.yogas.filter((y) => y.present);
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t(lang, 'interpretation.yogasTitle')}</CardTitle>
        <CardDescription>{t(lang, 'interpretation.yogasSubtitle')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {present.length === 0 ? (
          <p className="text-sm text-muted-foreground">{t(lang, 'interpretation.yogasNone')}</p>
        ) : (
          present.map((y) => (
            <div key={y.id} className="rounded-lg border border-border p-3">
              <div className="mb-2 flex items-center justify-between gap-2">
                <p className="font-medium text-foreground">{y.name}</p>
                <Badge variant={y.quality === 'Negative' ? 'destructive' : 'secondary'}>
                  {translateYogaQuality(lang, y.quality)}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{y.description}</p>
              <p className="mt-1 text-sm text-muted-foreground">{y.result}</p>
              {y.evidence && <p className="mt-2 text-xs italic text-muted-foreground">{y.evidence}</p>}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
