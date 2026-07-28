'use client';

import { useState, useTransition } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlanetSelect } from '@/components/astrologyapi/planet-select';
import type { BirthInput } from '@/lib/astrologyapi/params';
import type {
  AstrologyApiAscendantReport,
  AstrologyApiNakshatraReport,
  AstrologyApiPitraDosha,
} from '@/lib/astrologyapi/types';
import { fetchAstrologyApiPlanetReport } from '@/app/astrologyapi/kundli/actions';

export function AstrologyApiAscendantCard({ data }: { data: AstrologyApiAscendantReport }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ascendant Reading</CardTitle>
        <CardDescription>Lagna: {data.asc_report.ascendant}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{data.asc_report.report}</p>
      </CardContent>
    </Card>
  );
}

const NAKSHATRA_SECTIONS = [
  ['physical', 'Physical'],
  ['character', 'Character'],
  ['education', 'Education & Career'],
  ['family', 'Family'],
  ['health', 'Health'],
] as const;

export function AstrologyApiNakshatraCard({ data }: { data: AstrologyApiNakshatraReport }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Nakshatra Reading</CardTitle>
        <CardDescription>Birth-star interpretation by life area</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {NAKSHATRA_SECTIONS.map(([key, label]) => {
          const paragraphs = data[key];
          if (!paragraphs || paragraphs.length === 0) return null;
          return (
            <div key={key}>
              <h3 className="mb-1 text-sm font-semibold text-foreground">{label}</h3>
              {paragraphs.map((p, i) => (
                <p key={i} className="text-sm text-muted-foreground">
                  {p}
                </p>
              ))}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

export function AstrologyApiPitraDoshaCard({ data }: { data: AstrologyApiPitraDosha }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Pitra Dosha</CardTitle>
          <Badge variant={data.is_pitri_dosha_present ? 'destructive' : 'secondary'}>
            {data.is_pitri_dosha_present ? 'Present' : 'Not present'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">{data.conclusion}</p>
        {data.is_pitri_dosha_present && data.remedies.length > 1 && (
          <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
            {data.remedies.slice(1).map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

/**
 * Rashi (sign) and House prose readings for one planet, fetched on demand: `general_rashi_report` and
 * `general_house_report` both key on `:planet_name`, so all nine would mean nine extra round trips per
 * generation for readings most visitors only check one or two of. Rahu/Ketu return no `rashi_report` field
 * (they have no owned sign in classical Vedic astrology) and `"Not available"` for the house reading;
 * both are rendered as-is rather than treated as errors.
 */
export function AstrologyApiPlanetReportSection({ birth }: { birth: BirthInput }) {
  const [planet, setPlanet] = useState('moon');
  const [result, setResult] = useState<Awaited<ReturnType<typeof fetchAstrologyApiPlanetReport>> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function load(nextPlanet: string) {
    setPlanet(nextPlanet);
    setError(null);
    startTransition(async () => {
      try {
        setResult(await fetchAstrologyApiPlanetReport({ ...birth, planet: nextPlanet }));
      } catch (err) {
        setResult(null);
        setError(err instanceof Error ? err.message : 'Failed to load planet reading');
      }
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rashi &amp; House Reading</CardTitle>
        <CardDescription>Sign and house placement interpretation, by planet</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <PlanetSelect value={planet} onChange={load} disabled={pending} />
        {pending && <p className="text-sm text-muted-foreground">Loading...</p>}
        {error && <p className="text-sm text-destructive">{error}</p>}
        {!pending && !error && (
          <>
            {!result ? (
              <p className="text-sm text-muted-foreground">Pick a planet to see its reading.</p>
            ) : (
              <div className="space-y-3">
                <div>
                  <h3 className="mb-1 text-sm font-semibold text-foreground">Sign placement</h3>
                  <p className="text-sm text-muted-foreground">
                    {result.rashi.rashi_report ?? 'No reading available for this placement.'}
                  </p>
                </div>
                <div>
                  <h3 className="mb-1 text-sm font-semibold text-foreground">House placement</h3>
                  <p className="text-sm text-muted-foreground">{result.house.house_report}</p>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
