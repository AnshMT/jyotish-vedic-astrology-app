import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatClockTime } from '@/lib/format';
import { t, translateSignName, translateWeekday } from '@/lib/astrologyapi/i18n';
import type { Lang } from '@/lib/lang';
import type { AstrologyApiAdvancedPanchang } from '@/lib/astrologyapi/types';

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-muted px-3 py-2">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-medium text-foreground">{value}</p>
    </div>
  );
}

/**
 * Advanced Panchang view from `POST /advanced_panchang`: the five angas, sun/moon data, and the day's
 * muhurta windows. Tithi/Nakshatra/Yog/Karan names are proper nouns the vendor returns only in English (27+
 * nakshatra and multiple tithi/yog/karan names each), so only the day-of-week and sun/moon sign are
 * translated (small closed vocabularies) alongside this app's own field labels.
 */
export function AstrologyApiPanchangView({ data, lang }: { data: AstrologyApiAdvancedPanchang; lang: Lang }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t(lang, 'panchang.title')}</CardTitle>
          <CardDescription>{translateWeekday(lang, data.day)}</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <Fact label={t(lang, 'panchangView.tithi')} value={data.tithi.details.tithi_name} />
          <Fact label={t(lang, 'panchangView.nakshatra')} value={data.nakshatra.details.nak_name} />
          <Fact label={t(lang, 'panchangView.yog')} value={data.yog.details.yog_name} />
          <Fact label={t(lang, 'panchangView.karan')} value={data.karan.details.karan_name} />
          <Fact label={t(lang, 'panchangView.paksha')} value={data.paksha} />
          <Fact label={t(lang, 'panchangView.ritu')} value={data.ritu} />
          <Fact label={t(lang, 'panchangView.sunSign')} value={translateSignName(lang, data.sun_sign)} />
          <Fact label={t(lang, 'panchangView.moonSign')} value={translateSignName(lang, data.moon_sign)} />
          <Fact label={t(lang, 'panchangView.ayana')} value={data.ayana} />
          <Fact label={t(lang, 'panchangView.sunrise')} value={formatClockTime(data.sunrise)} />
          <Fact label={t(lang, 'panchangView.sunset')} value={formatClockTime(data.sunset)} />
          <Fact label={t(lang, 'panchangView.moonrise')} value={formatClockTime(data.moonrise)} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t(lang, 'panchangView.muhurtaWindows')}</CardTitle>
          <CardDescription>{t(lang, 'panchangView.muhurtaSubtitle')}</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Fact label={t(lang, 'panchangView.abhijit')} value={`${data.abhijit_muhurta.start} - ${data.abhijit_muhurta.end}`} />
          <Fact label={t(lang, 'panchangView.rahukaal')} value={`${data.rahukaal.start} - ${data.rahukaal.end}`} />
          <Fact label={t(lang, 'panchangView.gulikaal')} value={`${data.guliKaal.start} - ${data.guliKaal.end}`} />
          <Fact label={t(lang, 'panchangView.yamghantKaal')} value={`${data.yamghant_kaal.start} - ${data.yamghant_kaal.end}`} />
        </CardContent>
      </Card>
    </div>
  );
}
