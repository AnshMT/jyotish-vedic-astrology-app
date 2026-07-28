'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AstrologyApiChartDiagram } from '@/components/astrologyapi/chart-diagram';
import { AstrologyApiPlanetsTable } from '@/components/astrologyapi/planets-table';
import { t, translateSignName, translatePlanetName } from '@/lib/astrologyapi/i18n';
import type { Lang } from '@/lib/lang';
import type { BirthInput } from '@/lib/astrologyapi/params';
import { fetchAstrologyApiVarshaphal } from '@/app/astrologyapi/kundli/actions';

/**
 * Varshaphal (annual solar-return chart, Tajik system) for a chosen year, fetched on demand since it needs a
 * year input separate from the birth date. Reuses the D1 chart diagram and planets table components — both
 * `varshaphal_year_chart` and `varshaphal_planets` return the same house/planet shapes as their birth-chart
 * counterparts.
 */
export function AstrologyApiVarshaphalSection({ birth, lang }: { birth: BirthInput; lang: Lang }) {
  const currentYear = new Date(birth.date).getFullYear() || new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const [result, setResult] = useState<Awaited<ReturnType<typeof fetchAstrologyApiVarshaphal>> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function generate() {
    setError(null);
    startTransition(async () => {
      try {
        setResult(await fetchAstrologyApiVarshaphal({ ...birth, varshaphalYear: year }));
      } catch (err) {
        setResult(null);
        setError(err instanceof Error ? err.message : t(lang, 'varshaphal.errorFallback'));
      }
    });
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t(lang, 'varshaphal.title')}</CardTitle>
          <CardDescription>{t(lang, 'varshaphal.subtitle')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-end gap-4">
            <div className="space-y-2">
              <Label htmlFor="varshaphal-year">{t(lang, 'varshaphal.yearLabel')}</Label>
              <Input
                id="varshaphal-year"
                type="number"
                className="w-32"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
              />
            </div>
            <Button onClick={generate} disabled={pending}>
              {pending ? t(lang, 'varshaphal.generating') : t(lang, 'varshaphal.generate')}
            </Button>
          </div>
          {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
        </CardContent>
      </Card>

      {result && (
        <div className="space-y-6">
          <Card>
            <CardContent className="flex flex-wrap gap-6 pt-6 text-sm">
              <p>
                <span className="text-muted-foreground">{t(lang, 'varshaphal.yearLord', { planet: result.yearChart.year_lord })}</span>
              </p>
              <p className="text-muted-foreground">{t(lang, 'varshaphal.date', { date: result.yearChart.varshaphal_date })}</p>
              <p className="text-muted-foreground">{t(lang, 'varshaphal.munthaDesc', { sign: translateSignName(lang, result.muntha) })}</p>
            </CardContent>
          </Card>

          <AstrologyApiChartDiagram houses={result.yearChart.chart} lang={lang} />
          <AstrologyApiPlanetsTable planets={result.planets} lang={lang} />

          <Card>
            <CardHeader>
              <CardTitle>{t(lang, 'varshaphal.muddaDashaTitle')}</CardTitle>
              <CardDescription>{t(lang, 'varshaphal.muddaDashaSubtitle')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="max-h-72 space-y-1 overflow-y-auto">
                {result.muddaDasha.map((p, i) => (
                  <div key={`${p.planet}-${p.dasha_start}-${i}`} className="flex items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-muted/50">
                    <span className="font-medium text-foreground">{translatePlanetName(lang, p.planet)}</span>
                    <span className="tabular-nums text-muted-foreground">
                      {p.dasha_start} &rarr; {p.dasha_end}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t(lang, 'varshaphal.yogaTitle')}</CardTitle>
              <CardDescription>{t(lang, 'varshaphal.yogaSubtitle')}</CardDescription>
            </CardHeader>
            <CardContent>
              {result.yogas.length === 0 ? (
                <p className="text-sm text-muted-foreground">{t(lang, 'varshaphal.yogaNone')}</p>
              ) : (
                <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                  {result.yogas.map((y) => (
                    <li key={y.yog_name}>
                      <span className="font-medium text-foreground">{y.yog_name}</span>
                      {y.planets && y.planets.length > 0 && ` — ${y.planets.map((pair) => pair.join(' + ')).join(', ')}`}
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
