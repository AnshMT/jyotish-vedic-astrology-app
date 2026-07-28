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
import { CitySearch } from '@/components/city-search';
import { AstrologyApiChartDiagram } from '@/components/astrologyapi/chart-diagram';
import { AstrologyApiPlanetsTable } from '@/components/astrologyapi/planets-table';
import { AstrologyApiDashaTimeline, AstrologyApiCurrentDashaAllCard } from '@/components/astrologyapi/dasha-timeline';
import { AstrologyApiKalsarpaCard, AstrologyApiSadhesatiCard } from '@/components/astrologyapi/dosha-cards';
import {
  AstrologyApiAshtakavargaGrid,
  AstrologyApiShadbalaTable,
  AstrologyApiBhavabalaTable,
  AstrologyApiPanchadhaMaitriCard,
} from '@/components/astrologyapi/strength';
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
  AstrologyApiLalkitabHousesTable,
  AstrologyApiLalkitabPlanetsTable,
} from '@/components/astrologyapi/lalkitab';
import { AstrologyApiGhatChakraCard } from '@/components/astrologyapi/ghat-chakra';
import { AstrologyApiCharDashaCard, AstrologyApiYoginiDashaCard } from '@/components/astrologyapi/char-yogini-dasha';
import { AstrologyApiKpPlanetsTable, AstrologyApiKpCuspsTable } from '@/components/astrologyapi/kp-system';
import { AstrologyApiVarshaphalSection } from '@/components/astrologyapi/varshaphal';
import { DEFAULT_CITY, todayString, type City, type Coords } from '@/lib/location';
import { t } from '@/lib/astrologyapi/i18n';
import type { Lang } from '@/lib/lang';
import { generateAstrologyApiKundli, fetchAstrologyApiDivisionalChart } from '@/app/astrologyapi/kundli/actions';

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
 * AstrologyAPI Kundli Flow: the same server action and bespoke components as the tabbed
 * `/astrologyapi/kundli` page (`generateAstrologyApiKundli` already fans out to all seventeen endpoints —
 * chart, planets, dasha, both doshas, both strength analyses, the interpretation reports, all four remedy
 * suggestions, and the Lal Kitab chart/debts), rendered as one continuous report instead of tabs, with a
 * Name field added to match the RoxyAPI `/kundli-flow` page's input shape. AstrologyAPI has no single-person
 * Manglik dosha endpoint (only `match_manglik_report`, which needs two people's birth data for compatibility
 * matching), so unlike the source report this is modeled on, there is no Manglik section here.
 */
export function KundliFlowAstroApiClient({ lang }: { lang: Lang }) {
  const [name, setName] = useState('');
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
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">{t(lang, 'kundliFlow.title')}</h1>
        <p className="mt-2 text-muted-foreground">{t(lang, 'kundliFlow.subtitle')}</p>
      </div>

      <Card className="overflow-visible">
        <CardHeader>
          <CardTitle>{t(lang, 'kundli.birthDetailsTitle')}</CardTitle>
          <CardDescription>{t(lang, 'kundli.birthDetailsDesc')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit}>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <Label htmlFor="kfa-name">{t(lang, 'kundliFlow.name')}</Label>
                <Input
                  id="kfa-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t(lang, 'kundliFlow.namePlaceholder')}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="kfa-date">{t(lang, 'common.dateOfBirth')}</Label>
                <Input id="kfa-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="kfa-time">{t(lang, 'common.timeOfBirth')}</Label>
                <Input id="kfa-time" type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
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
        <div className="space-y-10">
          {name && (
            <h2 className="text-center text-xl font-semibold text-foreground">{name}</h2>
          )}

          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">{t(lang, 'kundli.tab.chart')}</h3>
            <AstrologyApiChartDiagram houses={result.chart} lang={lang} />
            <AstrologyApiPlanetsTable planets={result.planets} lang={lang} />
            <AstrologyApiGhatChakraCard data={result.ghatChakra} lang={lang} />
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">{t(lang, 'varga.title')}</h3>
            <Card>
              <CardHeader>
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
              varga && <AstrologyApiChartDiagram houses={varga.chart} lang={lang} />
            )}
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">{t(lang, 'kundli.tab.dasha')}</h3>
            <AstrologyApiCurrentDashaAllCard data={result.currentDashaAll} lang={lang} />
            <AstrologyApiDashaTimeline periods={result.dashas} lang={lang} />
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">{t(lang, 'kundli.tab.doshas')}</h3>
            <AstrologyApiKalsarpaCard data={result.kalsarpa} lang={lang} />
            <AstrologyApiSadhesatiCard data={result.sadhesati} lang={lang} />
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">{t(lang, 'kundli.tab.strength')}</h3>
            <AstrologyApiAshtakavargaGrid data={result.ashtakavarga} lang={lang} />
            <AstrologyApiShadbalaTable data={result.shadbala} lang={lang} />
            <AstrologyApiBhavabalaTable data={result.bhavabala} lang={lang} />
            <AstrologyApiPanchadhaMaitriCard data={result.panchadhaMaitri} lang={lang} />
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">{t(lang, 'kundli.tab.interpretation')}</h3>
            <AstrologyApiAscendantCard data={result.ascendantReport} lang={lang} />
            <AstrologyApiNakshatraCard data={result.nakshatraReport} lang={lang} />
            <AstrologyApiPlanetReportSection birth={birth} lang={lang} />
            <AstrologyApiPitraDoshaCard data={result.pitraDosha} lang={lang} />
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">{t(lang, 'kundli.tab.remedies')}</h3>
            <AstrologyApiGemSuggestionGrid data={result.gemSuggestion} lang={lang} />
            <AstrologyApiPujaSuggestionList data={result.pujaSuggestion} lang={lang} />
            <AstrologyApiRudrakshaCard data={result.rudrakshaSuggestion} lang={lang} />
            <AstrologyApiSadhesatiRemediesCard data={result.sadhesatiRemedies} lang={lang} />
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">{t(lang, 'kundli.tab.lalkitab')}</h3>
            <AstrologyApiChartDiagram houses={result.lalkitabChart} lang={lang} />
            <AstrologyApiLalkitabDebtsList data={result.lalkitabDebts} lang={lang} />
            <AstrologyApiLalkitabHousesTable data={result.lalkitabHouses} lang={lang} />
            <AstrologyApiLalkitabPlanetsTable data={result.lalkitabPlanets} lang={lang} />
            <AstrologyApiLalkitabRemedySection birth={birth} lang={lang} />
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">{t(lang, 'kundli.tab.advanced')}</h3>
            <AstrologyApiCharDashaCard current={result.charDasha.current} major={result.charDasha.major} lang={lang} />
            <AstrologyApiYoginiDashaCard current={result.yoginiDasha.current} major={result.yoginiDasha.major} lang={lang} />
            <AstrologyApiKpPlanetsTable data={result.kp.planets} lang={lang} />
            <AstrologyApiKpCuspsTable data={result.kp.cusps} lang={lang} />
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">{t(lang, 'kundli.tab.varshaphal')}</h3>
            <AstrologyApiVarshaphalSection birth={birth} lang={lang} />
          </div>
        </div>
      )}
    </div>
  );
}
