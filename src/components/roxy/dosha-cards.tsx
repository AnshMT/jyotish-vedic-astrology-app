import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { ManglikResponse, KalsarpaResponse, SadhesatiResponse } from '@roxyapi/sdk';
import type { Lang } from '@/lib/lang';
import { t, translateSeverity, translateEffectLabel, translateSadhesatiPhase } from '@/lib/roxy/i18n';

/**
 * Bespoke replacements for the vendor `<RoxyDoshaCard>` (`@roxyapi/ui-react`). That component's own chrome —
 * title, Present/Absent badge, effect field labels, "Remedies"/"Exceptions" headers — is hardcoded English
 * with no i18n hook (its `lang` prop isn't even a reactive property on the underlying custom element,
 * confirmed by inspecting the compiled bundle), and RoxyAPI's dosha endpoints themselves accept no `lang`
 * query either. So these three components render the same raw response shapes ourselves: our own labels
 * translate via `t()`, while vendor prose (`description`, `remedies`, `exceptions`, effect text) stays in
 * English exactly as the API returns it, same as every other vendor-prose field in this app.
 */

function EffectsGrid({ effects, lang }: { effects: Record<string, string>; lang: Lang }) {
  const entries = Object.entries(effects).filter(([, v]) => v);
  if (entries.length === 0) return null;
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {entries.map(([key, value]) => (
        <div key={key}>
          <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {translateEffectLabel(lang, key)}
          </h3>
          <p className="text-sm text-muted-foreground">{value}</p>
        </div>
      ))}
    </div>
  );
}

function RemediesList({ remedies, lang }: { remedies: string[] | undefined; lang: Lang }) {
  if (!remedies || remedies.length === 0) return null;
  return (
    <div>
      <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {t(lang, 'doshas.remedies')}
      </h3>
      <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
        {remedies.map((r, i) => (
          <li key={i}>{r}</li>
        ))}
      </ul>
    </div>
  );
}

export function RoxyManglikCard({ data, lang }: { data: ManglikResponse; lang: Lang }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{t(lang, 'doshas.manglik.title')}</CardTitle>
          <Badge variant={data.present ? 'destructive' : 'secondary'}>
            {data.present ? t(lang, 'doshas.present') : t(lang, 'doshas.absent')}
            {data.present && data.severity ? ` (${translateSeverity(lang, data.severity)})` : ''}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{data.description}</p>
        {data.effects && <EffectsGrid effects={data.effects} lang={lang} />}
        <RemediesList remedies={data.remedies} lang={lang} />
        {data.exceptions && data.exceptions.length > 0 && (
          <div>
            <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {t(lang, 'doshas.exceptions')}
            </h3>
            <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
              {data.exceptions.map((e, i) => (
                <li key={i}>{e}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function RoxyKalsarpaCard({ data, lang }: { data: KalsarpaResponse; lang: Lang }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{t(lang, 'doshas.kalsarpa.title')}</CardTitle>
          <Badge variant={data.present ? 'destructive' : 'secondary'}>
            {data.present ? t(lang, 'doshas.present') : t(lang, 'doshas.absent')}
            {data.present && data.severity ? ` (${translateSeverity(lang, data.severity)})` : ''}
          </Badge>
        </div>
        {data.present && data.type && (
          <p className="text-sm text-muted-foreground">
            {t(lang, 'doshas.type')}: {data.type}
          </p>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{data.description}</p>
        {data.effects && <EffectsGrid effects={data.effects} lang={lang} />}
        <RemediesList remedies={data.remedies} lang={lang} />
      </CardContent>
    </Card>
  );
}

export function RoxySadhesatiCard({ data, lang }: { data: SadhesatiResponse; lang: Lang }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{t(lang, 'doshas.sadhesati.title')}</CardTitle>
          <Badge variant={data.present ? 'destructive' : 'secondary'}>
            {data.present ? t(lang, 'doshas.present') : t(lang, 'doshas.absent')}
            {data.present && data.severity ? ` (${translateSeverity(lang, data.severity)})` : ''}
          </Badge>
        </div>
        {data.present && data.type && (
          <p className="text-sm text-muted-foreground">
            {t(lang, 'doshas.currentPhase')}: {translateSadhesatiPhase(lang, data.type)}
          </p>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{data.description}</p>
        {data.effects?.general && (
          <p className="text-sm text-muted-foreground">{data.effects.general}</p>
        )}
        {data.effects?.phases && (
          <EffectsGrid
            effects={Object.fromEntries(
              Object.entries(data.effects.phases).map(([k, v]) => [translateSadhesatiPhase(lang, k), v]),
            )}
            lang={lang}
          />
        )}
        <RemediesList remedies={data.remedies} lang={lang} />
      </CardContent>
    </Card>
  );
}
