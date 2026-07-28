import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { t, translatePlanetName, translateSignName } from '@/lib/astrologyapi/i18n';
import type { Lang } from '@/lib/lang';
import type { AstrologyApiKpPlanet, AstrologyApiKpHouseCusp } from '@/lib/astrologyapi/types';

/** KP (Krishnamurti Paddhati) planet positions from `POST /kp_planets`: the usual placement plus sub-lord and sub-sub-lord. */
export function AstrologyApiKpPlanetsTable({ data, lang }: { data: AstrologyApiKpPlanet[]; lang: Lang }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t(lang, 'kp.planetsTitle')}</CardTitle>
        <CardDescription>{t(lang, 'kp.subtitle')}</CardDescription>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full min-w-[560px] text-sm">
          <thead>
            <tr className="border-b border-border text-left text-muted-foreground">
              <th className="pb-2 font-medium">{t(lang, 'kp.planet')}</th>
              <th className="pb-2 font-medium">{t(lang, 'kp.sign')}</th>
              <th className="pb-2 font-medium">{t(lang, 'kp.house')}</th>
              <th className="pb-2 font-medium">{t(lang, 'kp.nakshatra')}</th>
              <th className="pb-2 font-medium">{t(lang, 'kp.subLord')}</th>
              <th className="pb-2 font-medium">{t(lang, 'kp.subSubLord')}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((p) => (
              <tr key={p.planet_id} className="border-b border-border/50 last:border-0">
                <td className="py-2 font-medium text-foreground">{translatePlanetName(lang, p.planet_name)}</td>
                <td className="py-2 text-muted-foreground">{translateSignName(lang, p.sign)}</td>
                <td className="py-2 tabular-nums text-muted-foreground">{p.house}</td>
                <td className="py-2 text-muted-foreground">{p.nakshatra}</td>
                <td className="py-2 text-muted-foreground">{translatePlanetName(lang, p.sub_lord)}</td>
                <td className="py-2 text-muted-foreground">{translatePlanetName(lang, p.sub_sub_lord)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}

/** KP house cusps from `POST /kp_house_cusps`: each cusp's own sub-lord chain, finer-grained than the D1 house signs. */
export function AstrologyApiKpCuspsTable({ data, lang }: { data: AstrologyApiKpHouseCusp[]; lang: Lang }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t(lang, 'kp.cuspsTitle')}</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full min-w-[560px] text-sm">
          <thead>
            <tr className="border-b border-border text-left text-muted-foreground">
              <th className="pb-2 font-medium">{t(lang, 'kp.house')}</th>
              <th className="pb-2 font-medium">{t(lang, 'kp.cuspDegree')}</th>
              <th className="pb-2 font-medium">{t(lang, 'kp.sign')}</th>
              <th className="pb-2 font-medium">{t(lang, 'kp.nakshatra')}</th>
              <th className="pb-2 font-medium">{t(lang, 'kp.subLord')}</th>
              <th className="pb-2 font-medium">{t(lang, 'kp.subSubLord')}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((c) => (
              <tr key={c.house_id} className="border-b border-border/50 last:border-0">
                <td className="py-2 font-medium text-foreground">{c.house_id}</td>
                <td className="py-2 tabular-nums text-muted-foreground">{c.formatted_degree}</td>
                <td className="py-2 text-muted-foreground">{translateSignName(lang, c.sign)}</td>
                <td className="py-2 text-muted-foreground">{c.nakshatra}</td>
                <td className="py-2 text-muted-foreground">{translatePlanetName(lang, c.sub_lord)}</td>
                <td className="py-2 text-muted-foreground">{translatePlanetName(lang, c.sub_sub_lord)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
