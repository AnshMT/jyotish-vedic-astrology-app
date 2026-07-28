import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type {
  AstrologyApiGemSuggestion,
  AstrologyApiPujaSuggestion,
  AstrologyApiRudrakshaSuggestion,
  AstrologyApiSadhesatiRemedies,
} from '@/lib/astrologyapi/types';

const GEM_CATEGORIES = [
  ['LIFE', 'Life stone', 'Strengthens the chart’s primary ruling planet'],
  ['BENEFIC', 'Benefic stone', 'Supports the most benefic planet in the chart'],
  ['LUCKY', 'Lucky stone', 'General luck and well-being'],
] as const;

export function AstrologyApiGemSuggestionGrid({ data }: { data: AstrologyApiGemSuggestion }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gemstone Suggestions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {GEM_CATEGORIES.map(([key, label, desc]) => {
          const gem = data[key];
          return (
            <div key={key} className="rounded-lg border border-border bg-muted/30 p-3">
              <p className="text-xs text-muted-foreground">{label}</p>
              <p className="mt-1 font-medium text-foreground">{gem.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
              <dl className="mt-3 space-y-1 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <dt>Metal</dt>
                  <dd className="text-foreground">{gem.wear_metal}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Finger</dt>
                  <dd className="text-foreground">{gem.wear_finger}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Weight</dt>
                  <dd className="text-foreground">{gem.weight_caret} ct</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Day</dt>
                  <dd className="text-foreground">{gem.wear_day}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Alternative</dt>
                  <dd className="text-foreground">{gem.semi_gem}</dd>
                </div>
              </dl>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

export function AstrologyApiPujaSuggestionList({ data }: { data: AstrologyApiPujaSuggestion }) {
  const active = data.suggestions.filter((s) => s.status).sort((a, b) => b.priority - a.priority);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Puja Suggestions</CardTitle>
        <CardDescription>{data.summary}</CardDescription>
      </CardHeader>
      <CardContent>
        {active.length === 0 ? (
          <p className="text-sm text-muted-foreground">No puja recommendations for this chart.</p>
        ) : (
          <div className="space-y-4">
            {active.map((s) => (
              <div key={s.puja_id} className="rounded-lg border border-border p-3">
                <div className="mb-1 flex items-center justify-between gap-2">
                  <span className="font-medium text-foreground">{s.title}</span>
                  <Badge variant="outline">Priority {s.priority}</Badge>
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

export function AstrologyApiRudrakshaCard({ data }: { data: AstrologyApiRudrakshaSuggestion }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Rudraksha Suggestion</CardTitle>
        <CardDescription>{data.name}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm font-medium text-foreground">{data.recommend}</p>
        <p className="text-sm text-muted-foreground">{data.detail}</p>
      </CardContent>
    </Card>
  );
}

export function AstrologyApiSadhesatiRemediesCard({ data }: { data: AstrologyApiSadhesatiRemedies }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sadhesati Remedies</CardTitle>
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
