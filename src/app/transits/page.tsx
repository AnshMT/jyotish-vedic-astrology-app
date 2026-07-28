import type { Metadata } from 'next';
import { roxy, hasApiKey } from '@/lib/roxy/client';
import { tryUnwrap } from '@/lib/roxy/guard';
import { getLang } from '@/lib/lang.server';
import { DEFAULT_CITY } from '@/lib/location';
import { ApiKeyMissing } from '@/components/api-key-missing';
import { PageHeader } from '@/components/page-header';
import { DataError } from '@/components/data-error';
import { MonthYearControls } from '@/components/month-year-controls';
import { TransitsView } from '@/components/transits-view';
import { t } from '@/lib/roxy/i18n';

export const metadata: Metadata = {
  title: 'Planetary Transits',
  description:
    'Monthly Gochar: sign-change events for all nine planets with retrograde tracking, plus planetary aspects for the month.',
};

function intParam(raw: string | string[] | undefined, fallback: number): number {
  const value = Array.isArray(raw) ? raw[0] : raw;
  const parsed = value === undefined ? Number.NaN : Number(value);
  return Number.isInteger(parsed) ? parsed : fallback;
}

/**
 * Monthly planetary transits and aspects. Server Component: reads month and year from the URL, fetches both monthly endpoints in parallel, and renders the typed response. Vedic transits use IST (5.5) by default.
 */
export default async function TransitsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const lang = await getLang();
  if (!hasApiKey) return <ApiKeyMissing lang={lang} />;

  const now = new Date();
  const params = await searchParams;
  const month = intParam(params.month, now.getMonth() + 1);
  const year = intParam(params.year, now.getFullYear());
  const body = { year, month, timezone: DEFAULT_CITY.timezone };

  const [transits, aspects] = await Promise.all([
    tryUnwrap(roxy.vedicAstrology.getMonthlyTransits({ body })),
    tryUnwrap(roxy.vedicAstrology.getMonthlyAspects({ body })),
  ]);

  return (
    <div className="space-y-8">
      <PageHeader title={t(lang, 'transits.pageTitle')} subtitle={t(lang, 'transits.pageSubtitle')} />
      <MonthYearControls month={month} year={year} lang={lang} />
      {'error' in transits ? (
        <DataError message={transits.error} lang={lang} />
      ) : 'error' in aspects ? (
        <DataError message={aspects.error} lang={lang} />
      ) : (
        <TransitsView transits={transits.data} aspects={aspects.data} lang={lang} />
      )}
    </div>
  );
}
