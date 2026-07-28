'use client';

import { useState, useTransition } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlanetSelect } from '@/components/astrologyapi/planet-select';
import { t, translatePlanetName, translateOrdinalHouse } from '@/lib/astrologyapi/i18n';
import type { Lang } from '@/lib/lang';
import type { BirthInput } from '@/lib/astrologyapi/params';
import type { AstrologyApiLalkitabDebt } from '@/lib/astrologyapi/types';
import { fetchAstrologyApiLalkitabRemedy } from '@/app/astrologyapi/kundli/actions';

export function AstrologyApiLalkitabDebtsList({ data, lang }: { data: AstrologyApiLalkitabDebt[]; lang: Lang }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t(lang, 'lalkitab.debtsTitle')}</CardTitle>
        <CardDescription>{t(lang, 'lalkitab.debtsSubtitle')}</CardDescription>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <p className="text-sm text-muted-foreground">{t(lang, 'lalkitab.noDebts')}</p>
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
export function AstrologyApiLalkitabRemedySection({ birth, lang }: { birth: BirthInput; lang: Lang }) {
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
        setError(err instanceof Error ? err.message : t(lang, 'lalkitab.errorFallback'));
      }
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t(lang, 'lalkitab.remediesTitle')}</CardTitle>
        <CardDescription>{t(lang, 'lalkitab.remediesSubtitle')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <PlanetSelect value={planet} onChange={load} disabled={pending} lang={lang} />
        {pending && <p className="text-sm text-muted-foreground">{t(lang, 'common.loading')}</p>}
        {error && <p className="text-sm text-destructive">{error}</p>}
        {!pending && !error && (
          <>
            {!result ? (
              <p className="text-sm text-muted-foreground">{t(lang, 'lalkitab.pick')}</p>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  {t(lang, 'lalkitab.placement', {
                    planet: translatePlanetName(lang, result.planet),
                    house: translateOrdinalHouse(lang, result.house),
                    desc: result.lal_kitab_desc,
                  })}
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
