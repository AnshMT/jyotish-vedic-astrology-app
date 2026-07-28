'use client';

import { useState, useTransition } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlanetSelect } from '@/components/astrologyapi/planet-select';
import { t, translatePlanetName, translateOrdinalHouse } from '@/lib/astrologyapi/i18n';
import type { Lang } from '@/lib/lang';
import type { BirthInput } from '@/lib/astrologyapi/params';
import type { AstrologyApiLalkitabDebt, AstrologyApiLalkitabHouse, AstrologyApiLalkitabPlanet } from '@/lib/astrologyapi/types';
import { fetchAstrologyApiLalkitabRemedy } from '@/app/astrologyapi/kundli/actions';

function listOrDash(lang: Lang, value: string[] | '-'): string {
  if (value === '-') return t(lang, 'lalkitab.none');
  return value.map((p) => translatePlanetName(lang, p)).join(', ');
}

/** Per-house Lal Kitab ruler/pakka-ghar/kismat and exaltation/debilitation, from `POST /lalkitab_houses`. */
export function AstrologyApiLalkitabHousesTable({ data, lang }: { data: AstrologyApiLalkitabHouse[]; lang: Lang }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t(lang, 'lalkitab.housesTitle')}</CardTitle>
        <CardDescription>{t(lang, 'lalkitab.housesSubtitle')}</CardDescription>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full min-w-[560px] text-sm">
          <thead>
            <tr className="border-b border-border text-left text-muted-foreground">
              <th className="pb-2 font-medium">{t(lang, 'bhavabala.house')}</th>
              <th className="pb-2 font-medium">{t(lang, 'lalkitab.maalik')}</th>
              <th className="pb-2 font-medium">{t(lang, 'lalkitab.pakkaGhar')}</th>
              <th className="pb-2 font-medium">{t(lang, 'lalkitab.kismat')}</th>
              <th className="pb-2 font-medium">{t(lang, 'lalkitab.exalted')}</th>
              <th className="pb-2 font-medium">{t(lang, 'lalkitab.debilitated')}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((h) => (
              <tr key={h.khana_number} className="border-b border-border/50 last:border-0">
                <td className="py-2 font-medium text-foreground">{h.khana_number}</td>
                <td className="py-2 text-muted-foreground">{translatePlanetName(lang, h.maalik)}</td>
                <td className="py-2 text-muted-foreground">{translatePlanetName(lang, h.pakka_ghar)}</td>
                <td className="py-2 text-muted-foreground">{translatePlanetName(lang, h.kismat)}</td>
                <td className="py-2 text-muted-foreground">{listOrDash(lang, h.exalt)}</td>
                <td className="py-2 text-muted-foreground">{listOrDash(lang, h.debilitated)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}

/** Per-graha Lal Kitab sign placement, sleeping state, and benefic/malefic nature, from `POST /lalkitab_planets`. */
export function AstrologyApiLalkitabPlanetsTable({ data, lang }: { data: AstrologyApiLalkitabPlanet[]; lang: Lang }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t(lang, 'lalkitab.planetsTitle')}</CardTitle>
        <CardDescription>{t(lang, 'lalkitab.planetsSubtitle')}</CardDescription>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full min-w-[480px] text-sm">
          <thead>
            <tr className="border-b border-border text-left text-muted-foreground">
              <th className="pb-2 font-medium">{t(lang, 'planetsTable.planet')}</th>
              <th className="pb-2 font-medium">{t(lang, 'lalkitab.rashi')}</th>
              <th className="pb-2 font-medium">{t(lang, 'lalkitab.state')}</th>
              <th className="pb-2 font-medium">{t(lang, 'lalkitab.position')}</th>
              <th className="pb-2 font-medium">{t(lang, 'lalkitab.nature')}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((p) => (
              <tr key={p.planet} className="border-b border-border/50 last:border-0">
                <td className="py-2 font-medium text-foreground">{translatePlanetName(lang, p.planet)}</td>
                <td className="py-2 text-muted-foreground">{p.rashi}</td>
                <td className="py-2 text-muted-foreground">{p.soya ? t(lang, 'lalkitab.sleeping') : t(lang, 'lalkitab.awake')}</td>
                <td className="py-2 text-muted-foreground">{p.position}</td>
                <td className="py-2">
                  <Badge variant={p.nature === 'Malefic' ? 'destructive' : 'secondary'}>
                    {p.nature === 'Malefic' ? t(lang, 'lalkitab.natureMalefic') : t(lang, 'lalkitab.natureBenefic')}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}

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
