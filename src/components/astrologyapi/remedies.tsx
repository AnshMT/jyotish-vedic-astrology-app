import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { t, translateGemName, translateMetal, translateFinger, translateWeekday } from '@/lib/astrologyapi/i18n';
import type { Lang } from '@/lib/lang';
import type {
  AstrologyApiGemSuggestion,
  AstrologyApiPujaSuggestion,
  AstrologyApiRudrakshaSuggestion,
  AstrologyApiSadhesatiRemedies,
} from '@/lib/astrologyapi/types';

const GEM_CATEGORIES = [
  ['LIFE', 'gem.life', 'gem.lifeDesc'],
  ['BENEFIC', 'gem.benefic', 'gem.beneficDesc'],
  ['LUCKY', 'gem.lucky', 'gem.luckyDesc'],
] as const;

export function AstrologyApiGemSuggestionGrid({ data, lang }: { data: AstrologyApiGemSuggestion; lang: Lang }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t(lang, 'gem.title')}</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {GEM_CATEGORIES.map(([key, labelKey, descKey]) => {
          const gem = data[key];
          return (
            <div key={key} className="rounded-lg border border-border bg-muted/30 p-3">
              <p className="text-xs text-muted-foreground">{t(lang, labelKey)}</p>
              <p className="mt-1 font-medium text-foreground">{translateGemName(lang, gem.name)}</p>
              <p className="mt-1 text-xs text-muted-foreground">{t(lang, descKey)}</p>
              <dl className="mt-3 space-y-1 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <dt>{t(lang, 'gem.metal')}</dt>
                  <dd className="text-foreground">{translateMetal(lang, gem.wear_metal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>{t(lang, 'gem.finger')}</dt>
                  <dd className="text-foreground">{translateFinger(lang, gem.wear_finger)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>{t(lang, 'gem.weight')}</dt>
                  <dd className="text-foreground">{gem.weight_caret} ct</dd>
                </div>
                <div className="flex justify-between">
                  <dt>{t(lang, 'gem.day')}</dt>
                  <dd className="text-foreground">{translateWeekday(lang, gem.wear_day)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>{t(lang, 'gem.alternative')}</dt>
                  <dd className="text-foreground">{translateGemName(lang, gem.semi_gem)}</dd>
                </div>
              </dl>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

export function AstrologyApiPujaSuggestionList({ data, lang }: { data: AstrologyApiPujaSuggestion; lang: Lang }) {
  const active = data.suggestions.filter((s) => s.status).sort((a, b) => b.priority - a.priority);
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t(lang, 'puja.title')}</CardTitle>
        <CardDescription>{data.summary}</CardDescription>
      </CardHeader>
      <CardContent>
        {active.length === 0 ? (
          <p className="text-sm text-muted-foreground">{t(lang, 'puja.none')}</p>
        ) : (
          <div className="space-y-4">
            {active.map((s) => (
              <div key={s.puja_id} className="rounded-lg border border-border p-3">
                <div className="mb-1 flex items-center justify-between gap-2">
                  <span className="font-medium text-foreground">{s.title}</span>
                  <Badge variant="outline">{t(lang, 'puja.priority', { n: s.priority })}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{s.one_line}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function AstrologyApiRudrakshaCard({ data, lang }: { data: AstrologyApiRudrakshaSuggestion; lang: Lang }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t(lang, 'rudraksha.title')}</CardTitle>
        <CardDescription>{data.name}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm font-medium text-foreground">{data.recommend}</p>
        <p className="text-sm text-muted-foreground">{data.detail}</p>
      </CardContent>
    </Card>
  );
}

export function AstrologyApiSadhesatiRemediesCard({ data, lang }: { data: AstrologyApiSadhesatiRemedies; lang: Lang }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t(lang, 'sadhesatiRemedies.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
          {data.remedies.slice(1).map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
