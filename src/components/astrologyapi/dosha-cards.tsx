import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { t, translateSignName } from '@/lib/astrologyapi/i18n';
import type { Lang } from '@/lib/lang';
import type { AstrologyApiKalsarpaDosha, AstrologyApiSadhesati } from '@/lib/astrologyapi/types';

export function AstrologyApiKalsarpaCard({ data, lang }: { data: AstrologyApiKalsarpaDosha; lang: Lang }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{t(lang, 'kalsarpa.title')}</CardTitle>
          <Badge variant={data.present ? 'destructive' : 'secondary'}>
            {data.present ? data.type : t(lang, 'common.notPresent')}
          </Badge>
        </div>
        {data.present && <CardDescription>{t(lang, 'kalsarpa.yog', { name: data.name })}</CardDescription>}
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{data.one_line}</p>
      </CardContent>
    </Card>
  );
}

export function AstrologyApiSadhesatiCard({ data, lang }: { data: AstrologyApiSadhesati; lang: Lang }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{t(lang, 'sadhesati.title')}</CardTitle>
          <Badge variant={data.sadhesati_status ? 'destructive' : 'secondary'}>
            {data.sadhesati_status ? t(lang, 'sadhesati.inProgress') : t(lang, 'sadhesati.notInProgress')}
          </Badge>
        </div>
        <CardDescription>
          {t(lang, 'sadhesati.moonSaturn', {
            moon: translateSignName(lang, data.moon_sign),
            saturn: translateSignName(lang, data.saturn_sign),
          })}
          {data.is_saturn_retrograde ? t(lang, 'sadhesati.retrogradeSuffix') : ''}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{data.is_undergoing_sadhesati}</p>
      </CardContent>
    </Card>
  );
}
