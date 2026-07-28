import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatClockTime } from '@/lib/format';
import type { AstrologyApiAdvancedPanchang } from '@/lib/astrologyapi/types';

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-muted px-3 py-2">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-medium text-foreground">{value}</p>
    </div>
  );
}

/** Advanced Panchang view from `POST /advanced_panchang`: the five angas, sun/moon data, and the day's muhurta windows. */
export function AstrologyApiPanchangView({ data }: { data: AstrologyApiAdvancedPanchang }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Panchang</CardTitle>
          <CardDescription>{data.day}</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <Fact label="Tithi" value={data.tithi.details.tithi_name} />
          <Fact label="Nakshatra" value={data.nakshatra.details.nak_name} />
          <Fact label="Yog" value={data.yog.details.yog_name} />
          <Fact label="Karan" value={data.karan.details.karan_name} />
          <Fact label="Paksha" value={data.paksha} />
          <Fact label="Ritu" value={data.ritu} />
          <Fact label="Sun sign" value={data.sun_sign} />
          <Fact label="Moon sign" value={data.moon_sign} />
          <Fact label="Ayana" value={data.ayana} />
          <Fact label="Sunrise" value={formatClockTime(data.sunrise)} />
          <Fact label="Sunset" value={formatClockTime(data.sunset)} />
          <Fact label="Moonrise" value={formatClockTime(data.moonrise)} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Muhurta Windows</CardTitle>
          <CardDescription>Auspicious and inauspicious periods for the day</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Fact label="Abhijit" value={`${data.abhijit_muhurta.start} - ${data.abhijit_muhurta.end}`} />
          <Fact label="Rahukaal" value={`${data.rahukaal.start} - ${data.rahukaal.end}`} />
          <Fact label="Gulikaal" value={`${data.guliKaal.start} - ${data.guliKaal.end}`} />
          <Fact label="Yamghant Kaal" value={`${data.yamghant_kaal.start} - ${data.yamghant_kaal.end}`} />
        </CardContent>
      </Card>
    </div>
  );
}
