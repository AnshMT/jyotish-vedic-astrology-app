'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Sparkles } from 'lucide-react';
import { LanguageSwitcher } from '@/components/language-switcher';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import type { Lang } from '@/lib/lang';
import { t } from '@/lib/i18n/common';

function isActive(pathname: string, href: string): boolean {
  return href === '/' ? pathname === '/' : pathname.startsWith(href);
}

export function Navbar({ lang }: { lang: Lang }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const NAV_LINKS = [
    { href: '/', label: t(lang, 'nav.panchang') },
    { href: '/choghadiya', label: t(lang, 'nav.choghadiya') },
    { href: '/kundali', label: t(lang, 'nav.kundali') },
    { href: '/kundli-flow', label: t(lang, 'nav.kundliFlow') },
    { href: '/matching', label: t(lang, 'nav.matching') },
    { href: '/transits', label: t(lang, 'nav.transits') },
  ];

  /** Same five pages, sourced from AstrologyAPI instead of RoxyAPI (see `src/app/astrologyapi/`). */
  const ASTROLOGYAPI_NAV_LINKS = [
    { href: '/astrologyapi/panchang', label: t(lang, 'nav.panchang') },
    { href: '/astrologyapi/choghadiya', label: t(lang, 'nav.choghadiya') },
    { href: '/astrologyapi/kundli', label: t(lang, 'nav.kundli') },
    { href: '/astrologyapi/matching', label: t(lang, 'nav.matching') },
    { href: '/astrologyapi/transits', label: t(lang, 'nav.transits') },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-lg">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-foreground transition-colors hover:text-foreground/80"
        >
          <Sparkles className="size-5 text-primary" />
          <span className="text-lg font-semibold tracking-tight">Jyotish</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground ${
                  isActive(pathname, link.href)
                    ? 'bg-muted text-foreground'
                    : 'text-muted-foreground'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <details className="group relative">
              <summary
                className={`flex cursor-pointer list-none items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground [&::-webkit-details-marker]:hidden ${
                  ASTROLOGYAPI_NAV_LINKS.some((l) => isActive(pathname, l.href))
                    ? 'bg-muted text-foreground'
                    : 'text-muted-foreground'
                }`}
              >
                AstrologyAPI
              </summary>
              <ul className="absolute right-0 z-10 mt-1 w-44 rounded-lg border border-border bg-popover p-1 shadow-md">
                {ASTROLOGYAPI_NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground ${
                        isActive(pathname, link.href)
                          ? 'bg-muted text-foreground'
                          : 'text-muted-foreground'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          </li>
        </ul>

        <div className="flex items-center gap-1">
          <LanguageSwitcher current={lang} />
          <ThemeToggle />

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={t(lang, 'nav.toggleMenu')}
          >
            {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </Button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="border-t border-border/40 bg-background px-4 pb-4 md:hidden">
          <ul className="flex flex-col gap-1 pt-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground ${
                    isActive(pathname, link.href)
                      ? 'bg-muted text-foreground'
                      : 'text-muted-foreground'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-3 px-3 pt-3 text-xs font-medium uppercase tracking-wide text-muted-foreground border-t border-border/40">
            AstrologyAPI
          </p>
          <ul className="flex flex-col gap-1 pt-1">
            {ASTROLOGYAPI_NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground ${
                    isActive(pathname, link.href)
                      ? 'bg-muted text-foreground'
                      : 'text-muted-foreground'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
