'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { CitySearch } from '@/components/city-search';
import { AstrologyApiMatchReport } from '@/components/astrologyapi/match-report';
import { DEFAULT_CITY, type City, type Coords } from '@/lib/location';
import { t } from '@/lib/astrologyapi/i18n';
import type { Lang } from '@/lib/lang';
import { calculateAstrologyApiMatch } from './actions';

interface PersonState extends Coords {
  date: string;
  time: string;
}

const PERSON1_DEFAULT: PersonState = { date: '1990-07-04', time: '10:00', ...DEFAULT_CITY };
const PERSON2_DEFAULT: PersonState = {
  date: '1992-03-15',
  time: '14:30',
  latitude: 28.6139,
  longitude: 77.209,
  timezone: 5.5,
};

function PersonForm({
  label,
  defaultCity,
  value,
  onChange,
  lang,
}: {
  label: string;
  defaultCity: string;
  value: PersonState;
  onChange: (next: PersonState) => void;
  lang: Lang;
}) {
  function onCity(city: City) {
    onChange({ ...value, latitude: city.latitude, longitude: city.longitude, timezone: city.utcOffset });
  }
  return (
    <Card className="overflow-visible">
      <CardHeader>
        <CardTitle>{label}</CardTitle>
        <CardDescription>{t(lang, 'matching.enterBirthDetails')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>{t(lang, 'common.birthDate')}</Label>
          <Input type="date" value={value.date} onChange={(e) => onChange({ ...value, date: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label>{t(lang, 'common.birthTime')}</Label>
          <Input type="time" value={value.time} onChange={(e) => onChange({ ...value, time: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label>{t(lang, 'common.city')}</Label>
          <CitySearch onSelect={onCity} defaultValue={defaultCity} />
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * AstrologyAPI-backed Kundli matching. Same shape as `@/app/matching/matching-client`: a Server Action runs
 * Ashtakoot Gun Milan for both charts; the typed result flows into a bespoke report component.
 */
export function AstrologyApiMatchingClient({ lang }: { lang: Lang }) {
  const [person1, setPerson1] = useState(PERSON1_DEFAULT);
  const [person2, setPerson2] = useState(PERSON2_DEFAULT);
  const [result, setResult] = useState<Awaited<ReturnType<typeof calculateAstrologyApiMatch>> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function submit() {
    setError(null);
    startTransition(async () => {
      try {
        setResult(await calculateAstrologyApiMatch({ person1, person2 }));
      } catch (err) {
        setError(err instanceof Error ? err.message : t(lang, 'matching.errorFallback'));
        setResult(null);
      }
    });
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">{t(lang, 'matching.title')}</h1>
        <p className="mt-2 text-muted-foreground">{t(lang, 'matching.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <PersonForm
          label={t(lang, 'matching.person1')}
          defaultCity="Mumbai, India"
          value={person1}
          onChange={setPerson1}
          lang={lang}
        />
        <PersonForm
          label={t(lang, 'matching.person2')}
          defaultCity="Delhi, India"
          value={person2}
          onChange={setPerson2}
          lang={lang}
        />
      </div>

      <div className="flex justify-center">
        <Button size="lg" onClick={submit} disabled={pending}>
          {pending ? t(lang, 'matching.calculating') : t(lang, 'matching.check')}
        </Button>
      </div>

      {error && <p className="text-center text-sm text-destructive">{error}</p>}

      {result && (
        <div className="space-y-6">
          <Separator />
          <AstrologyApiMatchReport
            makingReport={result.makingReport}
            ashtakoot={result.ashtakoot}
            manglik={result.manglik}
            lang={lang}
          />
        </div>
      )}
    </div>
  );
}
