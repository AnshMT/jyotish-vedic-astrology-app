import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { AshtakavargaResponse, ShadbalaResponse } from '@roxyapi/sdk';
import type { Lang } from '@/lib/lang';
import { t, translatePlanetName, translateSignName } from '@/lib/roxy/i18n';

const ZODIAC = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
] as const;

/**
 * Sarvashtakavarga grid from `POST /vedic-astrology/ashtakavarga`, replacing the vendor
 * `<RoxyAshtakavargaGrid>` (hardcoded English chrome, no i18n hook in controlled mode).
 */
export function RoxyAshtakavargaGrid({ data, lang }: { data: AshtakavargaResponse; lang: Lang }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t(lang, 'ashtakavarga.title')}</CardTitle>
        <CardDescription>{t(lang, 'ashtakavarga.subtitle')}</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {ZODIAC.map((sign, i) => (
          <div key={sign} className="rounded-lg border border-border bg-muted/30 p-3 text-center">
            <p className="text-xs text-muted-foreground">{translateSignName(lang, sign)}</p>
            <p className="text-2xl font-semibold tabular-nums text-foreground">
              {data.sarvashtakavarga.bindus[i] ?? '--'}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

/**
 * Shadbala strength table from `POST /vedic-astrology/shadbala`, replacing the vendor
 * `<RoxyShadbalaTable>` (hardcoded English chrome, no i18n hook in controlled mode). Strength is shown in
 * Rupas (not virupas) since `minRequired`/`strengthRatio` are already in Rupas, avoiding a unit mismatch.
 */
export function RoxyShadbalaTable({ data, lang }: { data: ShadbalaResponse; lang: Lang }) {
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
            {data.planets.map((p) => {
              const isStrong = p.strengthRatio >= 1;
              return (
                <tr key={p.planet} className="border-b border-border/50 last:border-0">
                  <td className="py-2 font-medium text-foreground">{translatePlanetName(lang, p.planet)}</td>
                  <td className="py-2 tabular-nums text-muted-foreground">{p.totalRupas.toFixed(2)}</td>
                  <td className="py-2 tabular-nums text-muted-foreground">{p.minRequired.toFixed(2)}</td>
                  <td className="py-2 tabular-nums text-muted-foreground">{(p.strengthRatio * 100).toFixed(1)}%</td>
                  <td className="py-2">
                    <Badge variant={isStrong ? 'secondary' : 'destructive'}>
                      {isStrong ? t(lang, 'common.strong') : t(lang, 'common.weak')}
                    </Badge>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
