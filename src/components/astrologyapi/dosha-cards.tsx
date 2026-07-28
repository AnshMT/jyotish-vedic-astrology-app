import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { AstrologyApiKalsarpaDosha, AstrologyApiSadhesati } from '@/lib/astrologyapi/types';

export function AstrologyApiKalsarpaCard({ data }: { data: AstrologyApiKalsarpaDosha }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Kalsarpa Dosha</CardTitle>
          <Badge variant={data.present ? 'destructive' : 'secondary'}>
            {data.present ? data.type : 'Not present'}
          </Badge>
        </div>
        {data.present && <CardDescription>{data.name} Kaal Sarp Yog</CardDescription>}
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{data.one_line}</p>
      </CardContent>
    </Card>
  );
}

export function AstrologyApiSadhesatiCard({ data }: { data: AstrologyApiSadhesati }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Sadhesati</CardTitle>
          <Badge variant={data.sadhesati_status ? 'destructive' : 'secondary'}>
            {data.sadhesati_status ? 'In progress' : 'Not in progress'}
          </Badge>
        </div>
        <CardDescription>
          Moon in {data.moon_sign}, Saturn in {data.saturn_sign}
          {data.is_saturn_retrograde ? ' (retrograde)' : ''}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{data.is_undergoing_sadhesati}</p>
      </CardContent>
    </Card>
  );
}
