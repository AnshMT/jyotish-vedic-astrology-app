import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Lang } from '@/lib/lang';
import { t } from '@/lib/astrologyapi/i18n';

export function AstrologyApiKeyMissing({ lang }: { lang: Lang }) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Card className="max-w-lg w-full">
        <CardHeader className="text-center">
          <Badge variant="destructive" className="mx-auto mb-3 w-fit">{t(lang, 'apiKeyMissing.badge')}</Badge>
          <CardTitle className="text-2xl">{t(lang, 'apiKeyMissing.title')}</CardTitle>
          <CardDescription className="mt-2">{t(lang, 'apiKeyMissing.desc')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <ol className="space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-medium">1</span>
              <span>{t(lang, 'apiKeyMissing.step1')} <a href="https://astrologyapi.com" target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline underline-offset-4">astrologyapi.com</a></span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-medium">2</span>
              <span>{t(lang, 'apiKeyMissing.step2a')} <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">ASTROLOGYAPI_KEY=your-token-here</code> {t(lang, 'apiKeyMissing.step2b')} <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">.env.local</code></span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-medium">3</span>
              <span>{t(lang, 'apiKeyMissing.step3')}</span>
            </li>
          </ol>

          <Button variant="outline" asChild className="w-full">
            <a href="https://astrologyapi.com" target="_blank" rel="noopener noreferrer">
              {t(lang, 'apiKeyMissing.getToken')}
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
