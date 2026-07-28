import type { Metadata } from 'next';
import { hasAstrologyApiKey, astrologyApiRequest } from '@/lib/astrologyapi/client';
import { tryUnwrap } from '@/lib/astrologyapi/guard';
import { toDateParams } from '@/lib/astrologyapi/params';
import { t } from '@/lib/astrologyapi/i18n';
import { getLang } from '@/lib/lang.server';
import { resolveDateAndLocation } from '@/lib/location';
import { formatDate } from '@/lib/format';
import { AstrologyApiKeyMissing } from '@/components/astrologyapi/api-key-missing';
import { AstrologyApiDataError } from '@/components/astrologyapi/data-error';
import { DateLocationControls } from '@/components/date-location-controls';
import { PageHeader } from '@/components/page-header';
import { AstrologyApiPanchangView } from '@/components/astrologyapi/panchang-view';
import type { AstrologyApiAdvancedPanchang } from '@/lib/astrologyapi/types';

export const metadata: Metadata = {
  title: 'Panchang (AstrologyAPI)',
  description:
    'Daily Panchang from AstrologyAPI: tithi, nakshatra, yoga, karana, sun/moon data, and the muhurta windows for any city and date.',
};

/** AstrologyAPI-backed Panchang route. Same URL-state pattern as `@/app/page`: date and city live in the query string. */
export default async function AstrologyApiPanchangPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const lang = await getLang();
  if (!hasAstrologyApiKey) return <AstrologyApiKeyMissing lang={lang} />;

  const { date, label, coords } = resolveDateAndLocation(await searchParams);
  const params = toDateParams({ date, time: '06:00', ...coords });

  const panchang = await tryUnwrap(() =>
    astrologyApiRequest<AstrologyApiAdvancedPanchang>('advanced_panchang', params),
  );

  return (
    <div className="space-y-8">
      <DateLocationControls date={date} label={label} lang={lang} />
      <PageHeader title={t(lang, 'panchang.title')} subtitle={formatDate(date)} badge={label} />
      {'error' in panchang ? (
        <AstrologyApiDataError message={panchang.error} lang={lang} />
      ) : (
        <AstrologyApiPanchangView data={panchang.data} lang={lang} />
      )}
    </div>
  );
}
