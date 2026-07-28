'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CitySearch } from '@/components/city-search';
import { AstrologyApiChart } from '@/components/astrologyapi/chart';
import { AstrologyApiPlanetsTable } from '@/components/astrologyapi/planets-table';
import { AstrologyApiDashaTimeline } from '@/components/astrologyapi/dasha-timeline';
import { AstrologyApiKalsarpaCard, AstrologyApiSadhesatiCard } from '@/components/astrologyapi/dosha-cards';
import { AstrologyApiAshtakavargaGrid, AstrologyApiShadbalaTable } from '@/components/astrologyapi/strength';
import { DEFAULT_CITY, todayString, type City, type Coords } from '@/lib/location';
import { generateAstrologyApiKundli } from './actions';

type Kundli = Awaited<ReturnType<typeof generateAstrologyApiKundli>>;

/**
 * AstrologyAPI-backed Kundli generator. Same shape as `@/app/kundali/kundali-client`: a Server Action fans
 * one birth input out to every endpoint, this client renders each typed response with a bespoke component
 * (AstrologyAPI's response schema has no matching pre-built UI kit).
 */
export function AstrologyApiKundliClient() {
  const [date, setDate] = useState(todayString());
  const [time, setTime] = useState('10:00');
  const [coords, setCoords] = useState<Coords>(DEFAULT_CITY);
  const [result, setResult] = useState<Kundli | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function onCity(city: City) {
    setCoords({ latitude: city.latitude, longitude: city.longitude, timezone: city.utcOffset });
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      try {
        setResult(await generateAstrologyApiKundli({ date, time, ...coords }));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to generate kundli');
        setResult(null);
      }
    });
  }

  return (
    <div className="space-y-10">
      <div className="text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">Kundli</h1>
        <p className="mt-2 text-muted-foreground">
          Vedic birth chart with planetary positions, dasha, doshas, and strength &mdash; via AstrologyAPI
        </p>
      </div>

      <Card className="overflow-visible">
        <CardHeader>
          <CardTitle>Birth Details</CardTitle>
          <CardDescription>Enter your date, time, and place of birth</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit}>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="aa-date">Date of Birth</Label>
                <Input id="aa-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="aa-time">Time of Birth</Label>
                <Input id="aa-time" type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label>City</Label>
                <CitySearch onSelect={onCity} defaultValue={DEFAULT_CITY.label} />
              </div>
            </div>
            <div className="mt-6">
              <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
                {pending ? 'Generating...' : 'Generate Kundli'}
              </Button>
            </div>
            {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
          </form>
        </CardContent>
      </Card>

      {result && (
        <Tabs defaultValue="chart">
          <TabsList className="w-full">
            <TabsTrigger value="chart">Rashi (D1)</TabsTrigger>
            <TabsTrigger value="planets">Planets</TabsTrigger>
            <TabsTrigger value="dasha">Dasha</TabsTrigger>
            <TabsTrigger value="doshas">Doshas</TabsTrigger>
            <TabsTrigger value="strength">Strength</TabsTrigger>
          </TabsList>

          <TabsContent value="chart" className="mt-6">
            <AstrologyApiChart houses={result.chart} />
          </TabsContent>

          <TabsContent value="planets" className="mt-6">
            <AstrologyApiPlanetsTable planets={result.planets} />
          </TabsContent>

          <TabsContent value="dasha" className="mt-6">
            <AstrologyApiDashaTimeline periods={result.dashas} />
          </TabsContent>

          <TabsContent value="doshas" className="mt-6 space-y-6">
            <AstrologyApiKalsarpaCard data={result.kalsarpa} />
            <AstrologyApiSadhesatiCard data={result.sadhesati} />
          </TabsContent>

          <TabsContent value="strength" className="mt-6 space-y-6">
            <AstrologyApiAshtakavargaGrid data={result.ashtakavarga} />
            <AstrologyApiShadbalaTable data={result.shadbala} />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
