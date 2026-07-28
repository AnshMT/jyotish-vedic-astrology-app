'use client';

import { useState, useTransition } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlanetSelect } from '@/components/astrologyapi/planet-select';
import { t, translateSignName } from '@/lib/astrologyapi/i18n';
import type { Lang } from '@/lib/lang';
import type { BirthInput } from '@/lib/astrologyapi/params';
import type {
  AstrologyApiAscendantReport,
  AstrologyApiNakshatraReport,
  AstrologyApiPitraDosha,
} from '@/lib/astrologyapi/types';
import { fetchAstrologyApiPlanetReport } from '@/app/astrologyapi/kundli/actions';

export function AstrologyApiAscendantCard({ data, lang }: { data: AstrologyApiAscendantReport; lang: Lang }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t(lang, 'ascendant.title')}</CardTitle>
        <CardDescription>{t(lang, 'ascendant.lagna', { sign: translateSignName(lang, data.asc_report.ascendant) })}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{data.asc_report.report}</p>
      </CardContent>
    </Card>
  );
}

const NAKSHATRA_SECTIONS = [
  ['physical', 'nakshatraReport.physical'],
  ['character', 'nakshatraReport.character'],
  ['education', 'nakshatraReport.education'],
  ['family', 'nakshatraReport.family'],
  ['health', 'nakshatraReport.health'],
] as const;

export function AstrologyApiNakshatraCard({ data, lang }: { data: AstrologyApiNakshatraReport; lang: Lang }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t(lang, 'nakshatraReport.title')}</CardTitle>
        <CardDescription>{t(lang, 'nakshatraReport.subtitle')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {NAKSHATRA_SECTIONS.map(([key, labelKey]) => {
          const paragraphs = data[key];
          if (!paragraphs || paragraphs.length === 0) return null;
          return (
            <div key={key}>
              <h3 className="mb-1 text-sm font-semibold text-foreground">{t(lang, labelKey)}</h3>
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

export function AstrologyApiPitraDoshaCard({ data, lang }: { data: AstrologyApiPitraDosha; lang: Lang }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{t(lang, 'pitraDosha.title')}</CardTitle>
          <Badge variant={data.is_pitri_dosha_present ? 'destructive' : 'secondary'}>
            {data.is_pitri_dosha_present ? t(lang, 'common.present') : t(lang, 'common.notPresent')}
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
export function AstrologyApiPlanetReportSection({ birth, lang }: { birth: BirthInput; lang: Lang }) {
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
        setError(err instanceof Error ? err.message : t(lang, 'planetReport.errorFallback'));
      }
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t(lang, 'planetReport.title')}</CardTitle>
        <CardDescription>{t(lang, 'planetReport.subtitle')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <PlanetSelect value={planet} onChange={load} disabled={pending} lang={lang} />
        {pending && <p className="text-sm text-muted-foreground">{t(lang, 'common.loading')}</p>}
        {error && <p className="text-sm text-destructive">{error}</p>}
        {!pending && !error && (
          <>
            {!result ? (
              <p className="text-sm text-muted-foreground">{t(lang, 'planetReport.pick')}</p>
            ) : (
              <div className="space-y-3">
                <div>
                  <h3 className="mb-1 text-sm font-semibold text-foreground">{t(lang, 'planetReport.signPlacement')}</h3>
                  <p className="text-sm text-muted-foreground">
                    {result.rashi.rashi_report ?? t(lang, 'planetReport.noReading')}
                  </p>
                </div>
                <div>
                  <h3 className="mb-1 text-sm font-semibold text-foreground">{t(lang, 'planetReport.housePlacement')}</h3>
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
