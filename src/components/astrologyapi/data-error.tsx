import { Card, CardContent } from '@/components/ui/card';
import type { Lang } from '@/lib/lang';
import { t } from '@/lib/astrologyapi/i18n';

/** Inline error card for a failed AstrologyAPI request. Mirrors `@/components/data-error`. */
export function AstrologyApiDataError({ message, lang }: { message: string; lang: Lang }) {
  return (
    <Card>
      <CardContent className="py-8 text-center">
        <p className="mb-1 text-sm font-medium text-destructive">{t(lang, 'dataError.title')}</p>
        <p className="mb-4 text-sm text-muted-foreground">{message}</p>
        <a
          href="https://astrologyapi.com/docs"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-primary underline underline-offset-4"
        >
          {t(lang, 'dataError.docsLink')}
        </a>
      </CardContent>
    </Card>
  );
}
