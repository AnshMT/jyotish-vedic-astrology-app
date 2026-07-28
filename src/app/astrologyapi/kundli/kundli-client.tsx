'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CitySearch } from '@/components/city-search';
import { AstrologyApiChart } from '@/components/astrologyapi/chart';
import { AstrologyApiChartImage } from '@/components/astrologyapi/chart-image';
import { AstrologyApiPlanetsTable } from '@/components/astrologyapi/planets-table';
import { AstrologyApiDashaTimeline } from '@/components/astrologyapi/dasha-timeline';
import { AstrologyApiKalsarpaCard, AstrologyApiSadhesatiCard } from '@/components/astrologyapi/dosha-cards';
import { AstrologyApiAshtakavargaGrid, AstrologyApiShadbalaTable } from '@/components/astrologyapi/strength';
import {
  AstrologyApiAscendantCard,
  AstrologyApiNakshatraCard,
  AstrologyApiPitraDoshaCard,
  AstrologyApiPlanetReportSection,
} from '@/components/astrologyapi/interpretation';
import {
  AstrologyApiGemSuggestionGrid,
  AstrologyApiPujaSuggestionList,
  AstrologyApiRudrakshaCard,
  AstrologyApiSadhesatiRemediesCard,
} from '@/components/astrologyapi/remedies';
import {
  AstrologyApiLalkitabDebtsList,
  AstrologyApiLalkitabRemedySection,
} from '@/components/astrologyapi/lalkitab';
import { DEFAULT_CITY, todayString, type City, type Coords } from '@/lib/location';
import { t } from '@/lib/astrologyapi/i18n';
import type { Lang } from '@/lib/lang';
import { generateAstrologyApiKundli, fetchAstrologyApiDivisionalChart } from './actions';

type Kundli = Awaited<ReturnType<typeof generateAstrologyApiKundli>>;
type DivisionalChart = Awaited<ReturnType<typeof fetchAstrologyApiDivisionalChart>>;

const VARGA_CHARTS = [
  { division: 9, nameKey: 'varga.d9.name', descKey: 'varga.d9.desc' },
  { division: 2, nameKey: 'varga.d2.name', descKey: 'varga.d2.desc' },
  { division: 3, nameKey: 'varga.d3.name', descKey: 'varga.d3.desc' },
  { division: 4, nameKey: 'varga.d4.name', descKey: 'varga.d4.desc' },
  { division: 7, nameKey: 'varga.d7.name', descKey: 'varga.d7.desc' },
  { division: 10, nameKey: 'varga.d10.name', descKey: 'varga.d10.desc' },
  { division: 12, nameKey: 'varga.d12.name', descKey: 'varga.d12.desc' },
  { division: 16, nameKey: 'varga.d16.name', descKey: 'varga.d16.desc' },
  { division: 20, nameKey: 'varga.d20.name', descKey: 'varga.d20.desc' },
  { division: 24, nameKey: 'varga.d24.name', descKey: 'varga.d24.desc' },
  { division: 27, nameKey: 'varga.d27.name', descKey: 'varga.d27.desc' },
  { division: 30, nameKey: 'varga.d30.name', descKey: 'varga.d30.desc' },
  { division: 40, nameKey: 'varga.d40.name', descKey: 'varga.d40.desc' },
  { division: 45, nameKey: 'varga.d45.name', descKey: 'varga.d45.desc' },
  { division: 60, nameKey: 'varga.d60.name', descKey: 'varga.d60.desc' },
] as const;

/**
 * AstrologyAPI-backed Kundli generator. Same shape as `@/app/kundali/kundali-client`: a Server Action fans
 * one birth input out to every endpoint, this client renders each typed response with a bespoke component
 * (AstrologyAPI's response schema has no matching pre-built UI kit). `lang` only drives this app's own
 * labels — AstrologyAPI's endpoints have no `lang` parameter, so the vendor data itself stays in English.
 */
export function AstrologyApiKundliClient({ lang }: { lang: Lang }) {
  const [date, setDate] = useState(todayString());
  const [time, setTime] = useState('10:00');
  const [coords, setCoords] = useState<Coords>(DEFAULT_CITY);
  const [result, setResult] = useState<Kundli | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const [division, setDivision] = useState(9);
  const [varga, setVarga] = useState<DivisionalChart | null>(null);
  const [vargaPending, startVarga] = useTransition();

  const birth = { date, time, ...coords };

  function onCity(city: City) {
    setCoords({ latitude: city.latitude, longitude: city.longitude, timezone: city.utcOffset });
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      try {
        const data = await generateAstrologyApiKundli({ date, time, ...coords });
        setResult(data);
        setVarga(data.navamsa);
        setDivision(9);
      } catch (err) {
        setError(err instanceof Error ? err.message : t(lang, 'kundli.errorFallback'));
        setResult(null);
      }
    });
  }

  function loadVarga(next: number) {
    setDivision(next);
    startVarga(async () => {
      try {
        setVarga(await fetchAstrologyApiDivisionalChart({ ...birth, division: next }));
      } catch {
        setVarga(null);
      }
    });
  }

  return (
    <div className="space-y-10">
      <div className="text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">{t(lang, 'kundli.title')}</h1>
        <p className="mt-2 text-muted-foreground">{t(lang, 'kundli.subtitle')}</p>
      </div>

      <Card className="overflow-visible">
        <CardHeader>
          <CardTitle>{t(lang, 'kundli.birthDetailsTitle')}</CardTitle>
          <CardDescription>{t(lang, 'kundli.birthDetailsDesc')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit}>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="aa-date">{t(lang, 'common.dateOfBirth')}</Label>
                <Input id="aa-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="aa-time">{t(lang, 'common.timeOfBirth')}</Label>
                <Input id="aa-time" type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label>{t(lang, 'common.city')}</Label>
                <CitySearch onSelect={onCity} defaultValue={DEFAULT_CITY.label} lang={lang} />
              </div>
            </div>
            <div className="mt-6">
              <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
                {pending ? t(lang, 'kundli.generating') : t(lang, 'kundli.generate')}
              </Button>
            </div>
            {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
          </form>
        </CardContent>
      </Card>

      {result && (
        <Tabs defaultValue="chart">
          <div className="overflow-x-auto">
            <TabsList className="w-full min-w-max">
              <TabsTrigger value="chart">{t(lang, 'kundli.tab.chart')}</TabsTrigger>
              <TabsTrigger value="planets">{t(lang, 'kundli.tab.planets')}</TabsTrigger>
              <TabsTrigger value="varga">{t(lang, 'kundli.tab.varga')}</TabsTrigger>
              <TabsTrigger value="dasha">{t(lang, 'kundli.tab.dasha')}</TabsTrigger>
              <TabsTrigger value="doshas">{t(lang, 'kundli.tab.doshas')}</TabsTrigger>
              <TabsTrigger value="strength">{t(lang, 'kundli.tab.strength')}</TabsTrigger>
              <TabsTrigger value="interpretation">{t(lang, 'kundli.tab.interpretation')}</TabsTrigger>
              <TabsTrigger value="remedies">{t(lang, 'kundli.tab.remedies')}</TabsTrigger>
              <TabsTrigger value="lalkitab">{t(lang, 'kundli.tab.lalkitab')}</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="chart" className="mt-6 space-y-6">
            <AstrologyApiChartImage data={result.chartImage} />
            <AstrologyApiChart houses={result.chart} lang={lang} />
          </TabsContent>

          <TabsContent value="planets" className="mt-6">
            <AstrologyApiPlanetsTable planets={result.planets} lang={lang} />
          </TabsContent>

          <TabsContent value="varga" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t(lang, 'varga.title')}</CardTitle>
                <CardDescription>{t(lang, 'varga.subtitle')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full max-w-xs space-y-2">
                  <Label>{t(lang, 'varga.select')}</Label>
                  <Select value={String(division)} onValueChange={(v) => loadVarga(Number(v))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {VARGA_CHARTS.map((v) => (
                        <SelectItem key={v.division} value={String(v.division)}>
                          {t(lang, v.nameKey)} - {t(lang, v.descKey)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
            {vargaPending ? (
              <p className="py-8 text-center text-muted-foreground">{t(lang, 'varga.loading')}</p>
            ) : (
              varga && (
                <>
                  <AstrologyApiChartImage data={varga.chartImage} />
                  <AstrologyApiChart houses={varga.chart} lang={lang} />
                </>
              )
            )}
          </TabsContent>

          <TabsContent value="dasha" className="mt-6">
            <AstrologyApiDashaTimeline periods={result.dashas} lang={lang} />
          </TabsContent>

          <TabsContent value="doshas" className="mt-6 space-y-6">
            <AstrologyApiKalsarpaCard data={result.kalsarpa} lang={lang} />
            <AstrologyApiSadhesatiCard data={result.sadhesati} lang={lang} />
          </TabsContent>

          <TabsContent value="strength" className="mt-6 space-y-6">
            <AstrologyApiAshtakavargaGrid data={result.ashtakavarga} lang={lang} />
            <AstrologyApiShadbalaTable data={result.shadbala} lang={lang} />
          </TabsContent>

          <TabsContent value="interpretation" className="mt-6 space-y-6">
            <AstrologyApiAscendantCard data={result.ascendantReport} lang={lang} />
            <AstrologyApiNakshatraCard data={result.nakshatraReport} lang={lang} />
            <AstrologyApiPlanetReportSection birth={birth} lang={lang} />
            <AstrologyApiPitraDoshaCard data={result.pitraDosha} lang={lang} />
          </TabsContent>

          <TabsContent value="remedies" className="mt-6 space-y-6">
            <AstrologyApiGemSuggestionGrid data={result.gemSuggestion} lang={lang} />
            <AstrologyApiPujaSuggestionList data={result.pujaSuggestion} lang={lang} />
            <AstrologyApiRudrakshaCard data={result.rudrakshaSuggestion} lang={lang} />
            <AstrologyApiSadhesatiRemediesCard data={result.sadhesatiRemedies} lang={lang} />
          </TabsContent>

          <TabsContent value="lalkitab" className="mt-6 space-y-6">
            <AstrologyApiChart houses={result.lalkitabChart} lang={lang} />
            <AstrologyApiLalkitabDebtsList data={result.lalkitabDebts} lang={lang} />
            <AstrologyApiLalkitabRemedySection birth={birth} lang={lang} />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
