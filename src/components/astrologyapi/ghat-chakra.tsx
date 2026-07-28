import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { t } from '@/lib/astrologyapi/i18n';
import type { Lang } from '@/lib/lang';
import type { AstrologyApiGhatChakra } from '@/lib/astrologyapi/types';

const FIELDS = [
  ['month', 'ghatChakra.month'],
  ['tithi', 'ghatChakra.tithi'],
  ['day', 'ghatChakra.day'],
  ['nakshatra', 'ghatChakra.nakshatra'],
  ['yog', 'ghatChakra.yog'],
  ['karan', 'ghatChakra.karan'],
  ['pahar', 'ghatChakra.pahar'],
  ['moon', 'ghatChakra.moon'],
] as const;

/**
 * Birth-moment anga snapshot from `POST /ghat_chakra`. Rendered as raw vendor strings — the endpoint's own
 * field values (month/tithi/day names) aren't a closed enough vocabulary to safely hand-translate.
 */
export function AstrologyApiGhatChakraCard({ data, lang }: { data: AstrologyApiGhatChakra; lang: Lang }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t(lang, 'ghatChakra.title')}</CardTitle>
        <CardDescription>{t(lang, 'ghatChakra.subtitle')}</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {FIELDS.map(([key, labelKey]) => (
          <div key={key} className="rounded-lg border border-border bg-muted/30 p-3 text-center">
            <p className="text-xs text-muted-foreground">{t(lang, labelKey)}</p>
            <p className="font-medium text-foreground">{data[key]}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
