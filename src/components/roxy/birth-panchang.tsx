import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { PostVedicAstrologyPanchangBasicResponse } from '@roxyapi/sdk';
import type { Lang } from '@/lib/lang';
import { t, translatePaksha, translatePlanetName } from '@/lib/roxy/i18n';

function PanchangLimb({
  title,
  name,
  meta,
  characteristics,
}: {
  title: string;
  name: string;
  meta: string[];
  characteristics?: string;
}) {
  return (
    <div className="rounded-lg border border-border p-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{title}</p>
      <p className="font-medium text-foreground">{name}</p>
      {meta.length > 0 && <p className="text-xs text-muted-foreground">{meta.join(' · ')}</p>}
      {characteristics && <p className="mt-2 text-sm text-muted-foreground">{characteristics}</p>}
    </div>
  );
}

/**
 * The five-limb panchang at the moment of birth (`POST /vedic-astrology/panchang/basic`) — the "Panchang
 * details at birth" section this flow's doc calls for. Distinct from the home page's detailed daily
 * Panchang (`@/components/roxy/panchang`), which is for a given date/city rather than a specific birth
 * moment, and doesn't report tithi/nakshatra/yoga/karana characteristics or padas.
 */
export function RoxyBirthPanchangCard({ data, lang }: { data: PostVedicAstrologyPanchangBasicResponse; lang: Lang }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t(lang, 'kundliFlow.panchangTitle')}</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <PanchangLimb
          title={t(lang, 'kundliFlow.panchang.tithi')}
          name={data.tithi.name}
          meta={[
            translatePaksha(lang, data.tithi.paksha),
            ...(data.tithi.rulingPlanet ? [`${t(lang, 'kundliFlow.panchang.rulingPlanet')}: ${data.tithi.rulingPlanet}`] : []),
            ...(data.tithi.deity ? [`${t(lang, 'kundliFlow.panchang.deity')}: ${data.tithi.deity}`] : []),
          ]}
        />
        <PanchangLimb
          title={t(lang, 'kundliFlow.panchang.nakshatra')}
          name={data.nakshatra.name}
          meta={[
            t(lang, 'kundliFlow.panchang.pada', { n: data.nakshatra.pada }),
            `${t(lang, 'kundliFlow.panchang.lord')}: ${translatePlanetName(lang, data.nakshatra.lord)}`,
          ]}
          characteristics={data.nakshatra.characteristics}
        />
        <PanchangLimb
          title={t(lang, 'kundliFlow.panchang.yoga')}
          name={data.yoga.name}
          meta={[]}
          characteristics={data.yoga.characteristics}
        />
        <PanchangLimb
          title={t(lang, 'kundliFlow.panchang.karana')}
          name={data.karana.name}
          meta={data.karana.type ? [data.karana.type] : []}
          characteristics={data.karana.characteristics}
        />
      </CardContent>
    </Card>
  );
}
