import type { Lang } from '@/lib/lang';
import { t } from '@/lib/i18n/common';

export function Footer({ lang }: { lang: Lang }) {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:justify-between">
        <p>
          {t(lang, 'footer.poweredBy')}{' '}
          <a
            href="https://roxyapi.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground underline-offset-4 transition-colors hover:underline"
          >
            RoxyAPI
          </a>
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
          <a
            href="https://roxyapi.com/products/vedic-astrology-api"
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            API
          </a>
          <a
            href="https://roxyapi.com/api-reference"
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            {t(lang, 'footer.docs')}
          </a>
          <a
            href="https://roxyapi.com/pricing"
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            {t(lang, 'footer.getApiKey')}
          </a>
          <a
            href="https://github.com/RoxyAPI/jyotish-vedic-astrology-app"
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
