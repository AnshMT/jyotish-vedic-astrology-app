'use client';

import { useState, useTransition } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlanetSelect } from '@/components/astrologyapi/planet-select';
import type { BirthInput } from '@/lib/astrologyapi/params';
import type { AstrologyApiLalkitabDebt } from '@/lib/astrologyapi/types';
import { fetchAstrologyApiLalkitabRemedy } from '@/app/astrologyapi/kundli/actions';

export function AstrologyApiLalkitabDebtsList({ data }: { data: AstrologyApiLalkitabDebt[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Lal Kitab Debts (Rin)</CardTitle>
        <CardDescription>Karmic debts indicated by the chart&apos;s planetary combinations</CardDescription>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <p className="text-sm text-muted-foreground">No Rin (karmic debt) combinations found.</p>
        ) : (
          <div className="space-y-4">
            {data.map((debt) => (
              <div key={debt.debt_name} className="rounded-lg border border-border p-3">
                <p className="mb-1 font-medium text-foreground">{debt.debt_name}</p>
                <p className="text-sm text-muted-foreground">{debt.indications}</p>
                <p className="mt-2 text-sm text-muted-foreground">{debt.events}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/** One planet's Lal Kitab house placement and remedies, fetched on demand (`lalkitab_remedies/:planet_name`). */
export function AstrologyApiLalkitabRemedySection({ birth }: { birth: BirthInput }) {
  const [planet, setPlanet] = useState('saturn');
  const [result, setResult] = useState<Awaited<ReturnType<typeof fetchAstrologyApiLalkitabRemedy>> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function load(nextPlanet: string) {
    setPlanet(nextPlanet);
    setError(null);
    startTransition(async () => {
      try {
        setResult(await fetchAstrologyApiLalkitabRemedy({ ...birth, planet: nextPlanet }));
      } catch (err) {
        setResult(null);
        setError(err instanceof Error ? err.message : 'Failed to load Lal Kitab remedy');
      }
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lal Kitab Remedies</CardTitle>
        <CardDescription>House placement and remedies, by planet</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <PlanetSelect value={planet} onChange={load} disabled={pending} />
        {pending && <p className="text-sm text-muted-foreground">Loading...</p>}
        {error && <p className="text-sm text-destructive">{error}</p>}
        {!pending && !error && (
          <>
            {!result ? (
              <p className="text-sm text-muted-foreground">Pick a planet to see its Lal Kitab remedies.</p>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  {result.planet} in the {result.house} house: {result.lal_kitab_desc}
                </p>
                {result.lal_kitab_remedies.length > 0 && (
                  <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                    {result.lal_kitab_remedies.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
