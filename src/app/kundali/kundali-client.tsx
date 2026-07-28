'use client';

import { useState, useTransition } from 'react';
import {
  RoxyVedicKundli,
  RoxyVedicPlanetsTable,
  RoxyDivisionalChart,
  RoxyDashaTimeline,
  RoxyAshtakavargaGrid,
  RoxyShadbalaTable,
  type RoxyDivisionalChartProps,
} from '@roxyapi/ui-react';
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
import { RoxyRemediesView } from '@/components/roxy/remedies';
import { RoxyManglikCard, RoxyKalsarpaCard, RoxySadhesatiCard } from '@/components/roxy/dosha-cards';
import { DEFAULT_CITY, todayString, type City, type Coords } from '@/lib/location';
import { findMoonPlacement, findWeakestPlanet } from '@/lib/roxy/remedies';
import type { Lang } from '@/lib/lang';
import { t } from '@/lib/roxy/i18n';
import { t as tCommon } from '@/lib/i18n/common';
import { generateKundali, fetchDivisionalChart, fetchRoxyRemedies } from './actions';

type Kundali = Awaited<ReturnType<typeof generateKundali>>;

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
 * Kundali generator. A Server Action fans out one birth input to every Vedic endpoint; this client renders each typed response with its matching Roxy UI component. The active language comes from the server so dosha and chart interpretations localize without a client provider.
 */
export function KundaliClient({ lang }: { lang: Lang }) {
  const [date, setDate] = useState(todayString());
  const [time, setTime] = useState('10:00');
  const [coords, setCoords] = useState<Coords>(DEFAULT_CITY);
  const [result, setResult] = useState<Kundali | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const [division, setDivision] = useState(9);
  const [varga, setVarga] = useState<RoxyDivisionalChartProps['data']>(undefined);
  const [vargaPending, startVarga] = useTransition();

  const [remedies, setRemedies] = useState<Awaited<ReturnType<typeof fetchRoxyRemedies>> | null>(null);
  const [remediesError, setRemediesError] = useState<string | null>(null);
  const [remediesPending, startRemedies] = useTransition();

  function onCity(city: City) {
    setCoords({ latitude: city.latitude, longitude: city.longitude, timezone: city.utcOffset });
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      try {
        const data = await generateKundali({ date, time: `${time}:00`, ...coords, lang });
        setResult(data);
        setVarga(data.navamsa);
        setDivision(9);
        setRemedies(null);
        setRemediesError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : t(lang, 'kundali.errorFallback'));
        setResult(null);
      }
    });
  }

  function loadVarga(next: number) {
    setDivision(next);
    startVarga(async () => {
      try {
        setVarga(await fetchDivisionalChart({ date, time: `${time}:00`, ...coords, division: next }));
      } catch {
        setVarga(undefined);
      }
    });
  }

  /** Loads Vedic remedies the first time the Remedies tab is opened, deriving the Moon sign/nakshatra/weakest planet from the already-generated chart and shadbala rather than re-fetching them. */
  function onTabChange(value: string) {
    if (value !== 'remedies' || remedies || remediesPending || !result) return;
    startRemedies(async () => {
      try {
        const { moonSign, nakshatraKey } = findMoonPlacement(result.chart);
        const weakPlanet = findWeakestPlanet(result.shadbala);
        setRemedies(await fetchRoxyRemedies({ nakshatraKey, moonSign, weakPlanet, lang }));
      } catch (err) {
        setRemediesError(err instanceof Error ? err.message : t(lang, 'remedies.errorFallback'));
      }
    });
  }

  return (
    <div className="space-y-10">
      <div className="text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">{t(lang, 'kundali.title')}</h1>
        <p className="mt-2 text-muted-foreground">{t(lang, 'kundali.subtitle')}</p>
      </div>

      <Card className="overflow-visible">
        <CardHeader>
          <CardTitle>{t(lang, 'kundali.birthDetailsTitle')}</CardTitle>
          <CardDescription>{t(lang, 'kundali.birthDetailsDesc')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit}>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="date">{t(lang, 'kundali.dateOfBirth')}</Label>
                <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">{t(lang, 'kundali.timeOfBirth')}</Label>
                <Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label>{tCommon(lang, 'city')}</Label>
                <CitySearch onSelect={onCity} defaultValue={DEFAULT_CITY.label} lang={lang} />
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
        <Tabs defaultValue="chart" onValueChange={onTabChange}>
          <div className="overflow-x-auto">
            <TabsList className="w-full min-w-max">
              <TabsTrigger value="chart">{t(lang, 'kundali.tab.chart')}</TabsTrigger>
              <TabsTrigger value="planets">{t(lang, 'kundali.tab.planets')}</TabsTrigger>
              <TabsTrigger value="varga">{t(lang, 'kundali.tab.varga')}</TabsTrigger>
              <TabsTrigger value="dasha">{t(lang, 'kundali.tab.dasha')}</TabsTrigger>
              <TabsTrigger value="doshas">{t(lang, 'kundali.tab.doshas')}</TabsTrigger>
              <TabsTrigger value="strength">{t(lang, 'kundali.tab.strength')}</TabsTrigger>
              <TabsTrigger value="remedies">{t(lang, 'kundali.tab.remedies')}</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="chart" className="mt-6">
            <RoxyVedicKundli data={result.chart} />
          </TabsContent>

          <TabsContent value="planets" className="mt-6">
            <RoxyVedicPlanetsTable data={result.chart} />
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
              varga && <RoxyDivisionalChart data={varga} />
            )}
          </TabsContent>

          <TabsContent value="dasha" className="mt-6">
            <RoxyDashaTimeline data={result.dashas} />
          </TabsContent>

          <TabsContent value="doshas" className="mt-6 space-y-6">
            <RoxyManglikCard data={result.manglik} lang={lang} />
            <RoxyKalsarpaCard data={result.kalsarpa} lang={lang} />
            <RoxySadhesatiCard data={result.sadhesati} lang={lang} />
          </TabsContent>

          <TabsContent value="strength" className="mt-6 space-y-6">
            <RoxyAshtakavargaGrid data={result.ashtakavarga} />
            <RoxyShadbalaTable data={result.shadbala} />
          </TabsContent>

          <TabsContent value="remedies" className="mt-6 space-y-6">
            {remediesPending && <p className="py-8 text-center text-muted-foreground">{t(lang, 'remedies.loading')}</p>}
            {remediesError && <p className="text-center text-sm text-destructive">{remediesError}</p>}
            {remedies && (
              <RoxyRemediesView
                nakshatra={remedies.nakshatra}
                moonSignCrystals={remedies.moonSignCrystals}
                planetCrystals={remedies.planetCrystals}
                weakPlanet={findWeakestPlanet(result.shadbala)}
                lang={lang}
              />
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
