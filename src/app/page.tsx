import type { Metadata } from 'next';
import { roxy, hasApiKey } from '@/lib/roxy/client';
import { tryUnwrap } from '@/lib/roxy/guard';
import { getLang } from '@/lib/lang.server';
import { resolveDateAndLocation } from '@/lib/location';
import { formatDate } from '@/lib/format';
import { ApiKeyMissing } from '@/components/api-key-missing';
import { DateLocationControls } from '@/components/date-location-controls';
import { PageHeader } from '@/components/page-header';
import { DataError } from '@/components/data-error';
import { PanchangView } from '@/components/roxy/panchang';
import { t } from '@/lib/roxy/i18n';

export const metadata: Metadata = {
  title: 'Panchang',
  description:
    'Daily Panchang: tithi, nakshatra, yoga, karana, vara, and the auspicious and inauspicious muhurta windows for any city and date.',
};

/**
 * Daily Panchang. Server Component: it geocodes via the URL (set by the date and city picker), fetches the detailed panchang in the active language, and hands the unwrapped response to the Roxy UI table. No client data fetching, no loading spinner state to manage.
 */
export default async function PanchangPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const lang = await getLang();
  if (!hasApiKey) return <ApiKeyMissing lang={lang} />;

  const { date, label, coords } = resolveDateAndLocation(await searchParams);

  const panchang = await tryUnwrap(
    roxy.vedicAstrology.getDetailedPanchang({ query: { lang }, body: { date, ...coords } }),
  );

  return (
    <div className="space-y-8">
      <DateLocationControls date={date} label={label} lang={lang} />
      <PageHeader title={t(lang, 'panchang.title')} subtitle={formatDate(date)} badge={label} />
      {'error' in panchang ? (
        <DataError message={panchang.error} lang={lang} />
      ) : (
        <PanchangView data={panchang.data} />
      )}
    </div>
  );
}
