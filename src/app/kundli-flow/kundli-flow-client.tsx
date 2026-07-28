'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { RoxyChartDiagram } from '@/components/roxy/chart-diagram';
import { RoxyPlanetsTable } from '@/components/roxy/planets-table';
import { RoxyCurrentDashaCard } from '@/components/roxy/current-dasha';
import { RoxyManglikCard, RoxyKalsarpaCard, RoxySadhesatiCard } from '@/components/roxy/dosha-cards';
import { RoxyBirthPanchangCard } from '@/components/roxy/birth-panchang';
import { todayString } from '@/lib/location';
import type { Lang } from '@/lib/lang';
import { t } from '@/lib/roxy/i18n';
import { generateKundliFlow } from './actions';

type KundliFlow = Awaited<ReturnType<typeof generateKundliFlow>>;

/**
 * The MVP Kundli integration flow from the doc: Name/DOB/TOB/Place-of-birth in, a single free-text place
 * resolved via `/location/search`, then the birth chart, current dasha, three doshas, and birth panchang
 * fanned out in parallel and rendered as one continuous report — deliberately simpler than the tabbed
 * `/kundali` page (no varga, strength, remedies, or interpretation sections).
 */
export function KundliFlowClient({ lang }: { lang: Lang }) {
  const [name, setName] = useState('');
  const [date, setDate] = useState(todayString());
  const [time, setTime] = useState('10:00');
  const [place, setPlace] = useState('');
  const [result, setResult] = useState<KundliFlow | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      try {
        setResult(await generateKundliFlow({ name, date, time: `${time}:00`, place, lang }));
      } catch (err) {
        setError(err instanceof Error ? err.message : t(lang, 'kundali.errorFallback'));
        setResult(null);
      }
    });
  }

  return (
    <div className="space-y-10">
      <div className="text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">{t(lang, 'kundliFlow.title')}</h1>
        <p className="mt-2 text-muted-foreground">{t(lang, 'kundliFlow.subtitle')}</p>
      </div>

      <Card className="overflow-visible">
        <CardHeader>
          <CardTitle>{t(lang, 'kundali.birthDetailsTitle')}</CardTitle>
          <CardDescription>{t(lang, 'kundali.birthDetailsDesc')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit}>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <Label htmlFor="kf-name">{t(lang, 'kundliFlow.name')}</Label>
                <Input
                  id="kf-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t(lang, 'kundliFlow.namePlaceholder')}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="kf-date">{t(lang, 'kundali.dateOfBirth')}</Label>
                <Input id="kf-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="kf-time">{t(lang, 'kundali.timeOfBirth')}</Label>
                <Input id="kf-time" type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="kf-place">{t(lang, 'kundliFlow.placeOfBirth')}</Label>
                <Input
                  id="kf-place"
                  type="text"
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                  placeholder={t(lang, 'kundliFlow.placePlaceholder')}
                  required
                />
              </div>
            </div>
            <div className="mt-6">
              <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
                {pending ? t(lang, 'kundali.generating') : t(lang, 'kundali.generate')}
              </Button>
            </div>
            {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
          </form>
        </CardContent>
      </Card>

      {result && (
        <div className="space-y-8">
          <div className="flex flex-wrap items-center justify-center gap-2 text-center">
            {result.name && <h2 className="text-xl font-semibold text-foreground">{result.name}</h2>}
            <Badge variant="secondary">
              {t(lang, 'kundliFlow.resolvedLocation', {
                city: result.city.city,
                country: result.city.country,
                lat: result.city.latitude.toFixed(4),
                lon: result.city.longitude.toFixed(4),
                offset: result.city.utcOffset >= 0 ? `+${result.city.utcOffset}` : String(result.city.utcOffset),
              })}
            </Badge>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">{t(lang, 'kundliFlow.chartTitle')}</h3>
            <RoxyChartDiagram meta={result.chart.meta} lang={lang} />
            <RoxyPlanetsTable meta={result.chart.meta} lang={lang} />
          </div>

          <RoxyCurrentDashaCard data={result.dasha} lang={lang} />

          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">{t(lang, 'kundliFlow.doshasTitle')}</h3>
            <RoxyManglikCard data={result.manglik} lang={lang} />
            <RoxyKalsarpaCard data={result.kalsarpa} lang={lang} />
            <RoxySadhesatiCard data={result.sadhesati} lang={lang} />
          </div>

          <RoxyBirthPanchangCard data={result.panchang} lang={lang} />
        </div>
      )}
    </div>
  );
}
