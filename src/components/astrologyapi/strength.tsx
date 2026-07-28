import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { t, translateSignName, translatePlanetName, translateFriendshipLevel } from '@/lib/astrologyapi/i18n';
import type { Lang } from '@/lib/lang';
import type { AstrologyApiSarvashtak, AstrologyApiShadbala, AstrologyApiBhavabala, AstrologyApiPanchadhaMaitri } from '@/lib/astrologyapi/types';

const SIGN_ORDER = [
  ['aries', 'Aries'], ['taurus', 'Taurus'], ['gemini', 'Gemini'], ['cancer', 'Cancer'],
  ['leo', 'Leo'], ['virgo', 'Virgo'], ['libra', 'Libra'], ['scorpio', 'Scorpio'],
  ['sagittarius', 'Sagittarius'], ['capricorn', 'Capricorn'], ['aquarius', 'Aquarius'], ['pisces', 'Pisces'],
] as const;

/** Sarvashtakavarga grid from `POST /sarvashtak`: total bindu points per sign, summed across all 8 grahas. */
export function AstrologyApiAshtakavargaGrid({ data, lang }: { data: AstrologyApiSarvashtak; lang: Lang }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t(lang, 'ashtakavarga.title')}</CardTitle>
        <CardDescription>{t(lang, 'ashtakavarga.subtitle')}</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {SIGN_ORDER.map(([key, signName]) => {
          const points = data.ashtak_points[key];
          return (
            <div key={key} className="rounded-lg border border-border bg-muted/30 p-3 text-center">
              <p className="text-xs text-muted-foreground">{translateSignName(lang, signName)}</p>
              <p className="text-2xl font-semibold tabular-nums text-foreground">{points?.total ?? '--'}</p>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

/** Shadbala strength table from `POST /shadbala`: total virupa strength vs. the minimum required, per graha. */
export function AstrologyApiShadbalaTable({ data, lang }: { data: AstrologyApiShadbala[]; lang: Lang }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t(lang, 'shadbala.title')}</CardTitle>
        <CardDescription>{t(lang, 'shadbala.subtitle')}</CardDescription>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full min-w-[480px] text-sm">
          <thead>
            <tr className="border-b border-border text-left text-muted-foreground">
              <th className="pb-2 font-medium">{t(lang, 'shadbala.planet')}</th>
              <th className="pb-2 font-medium">{t(lang, 'shadbala.strength')}</th>
              <th className="pb-2 font-medium">{t(lang, 'shadbala.minimum')}</th>
              <th className="pb-2 font-medium">{t(lang, 'shadbala.percentOfMinimum')}</th>
              <th className="pb-2 font-medium">{t(lang, 'shadbala.verdict')}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((p) => (
              <tr key={p.id} className="border-b border-border/50 last:border-0">
                <td className="py-2 font-medium text-foreground">{translatePlanetName(lang, p.name)}</td>
                <td className="py-2 tabular-nums text-muted-foreground">{p.total_shadbala_virupa.toFixed(1)}</td>
                <td className="py-2 tabular-nums text-muted-foreground">{p.required_minimum_virupa}</td>
                <td className="py-2 tabular-nums text-muted-foreground">{p.strength_percent_of_minimum.toFixed(1)}%</td>
                <td className="py-2">
                  <Badge variant={p.is_strong ? 'secondary' : 'destructive'}>
                    {p.is_strong ? t(lang, 'common.strong') : t(lang, 'common.weak')}
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

/** Per-house strength table from `POST /bhavabala`, the Bhava-focused counterpart to Shadbala's per-graha table. */
export function AstrologyApiBhavabalaTable({ data, lang }: { data: AstrologyApiBhavabala; lang: Lang }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t(lang, 'bhavabala.title')}</CardTitle>
        <CardDescription>{t(lang, 'bhavabala.subtitle')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{t(lang, 'bhavabala.strongest', { n: data.summary.strongest_house_id })}</Badge>
          <Badge variant="destructive">{t(lang, 'bhavabala.weakest', { n: data.summary.weakest_house_id })}</Badge>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[420px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="pb-2 font-medium">{t(lang, 'bhavabala.house')}</th>
                <th className="pb-2 font-medium">{t(lang, 'bhavabala.sign')}</th>
                <th className="pb-2 font-medium">{t(lang, 'bhavabala.strength')}</th>
                <th className="pb-2 font-medium">{t(lang, 'bhavabala.percentOfBaseline')}</th>
              </tr>
            </thead>
            <tbody>
              {data.houses.map((h) => (
                <tr key={h.id} className="border-b border-border/50 last:border-0">
                  <td className="py-2 font-medium text-foreground">{t(lang, 'common.house', { n: h.id })}</td>
                  <td className="py-2 text-muted-foreground">{translateSignName(lang, h.bhava_sign)}</td>
                  <td className="py-2 tabular-nums text-muted-foreground">{h.total_bhavabala_virupa.toFixed(1)}</td>
                  <td className="py-2 tabular-nums text-muted-foreground">{h.strength_percent_of_baseline.toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

const MAITRI_PLANETS = [
  ['SUN', 'Sun'], ['MOON', 'Moon'], ['MARS', 'Mars'], ['MERCURY', 'Mercury'],
  ['JUPITER', 'Jupiter'], ['VENUS', 'Venus'], ['SATURN', 'Saturn'],
] as const;

function MaitriTable({ rows, lang }: { rows: Record<string, readonly string[]>; lang: Lang }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[560px] text-sm">
        <thead>
          <tr className="border-b border-border text-left text-muted-foreground">
            <th className="pb-2 font-medium">{t(lang, 'maitri.towards')}</th>
            {MAITRI_PLANETS.map(([key, name]) => (
              <th key={key} className="pb-2 text-center font-medium">{translatePlanetName(lang, name)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {MAITRI_PLANETS.map(([rowKey, rowName]) => (
            <tr key={rowKey} className="border-b border-border/50 last:border-0">
              <td className="py-2 font-medium text-foreground">{translatePlanetName(lang, rowName)}</td>
              {MAITRI_PLANETS.map(([colKey], colIndex) => (
                <td key={colKey} className="py-2 text-center text-muted-foreground">
                  {translateFriendshipLevel(lang, rows[rowKey]?.[colIndex] ?? '-')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Five-fold planetary friendship table from `POST /panchadha_maitri`: natural, temporary, and the combined verdict. */
export function AstrologyApiPanchadhaMaitriCard({ data, lang }: { data: AstrologyApiPanchadhaMaitri; lang: Lang }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t(lang, 'maitri.title')}</CardTitle>
        <CardDescription>{t(lang, 'maitri.subtitle')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">{t(lang, 'maitri.combined')}</p>
          <MaitriTable rows={data.panchandhaChakra} lang={lang} />
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">{t(lang, 'maitri.natural')}</p>
          <MaitriTable rows={data.naturalFriendship} lang={lang} />
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">{t(lang, 'maitri.temporary')}</p>
          <MaitriTable rows={data.temporaryFriendship} lang={lang} />
        </div>
      </CardContent>
    </Card>
  );
}
