import type { Metadata } from 'next';
import { hasAstrologyApiKey, astrologyApiRequest } from '@/lib/astrologyapi/client';
import { tryUnwrap } from '@/lib/astrologyapi/guard';
import { t } from '@/lib/astrologyapi/i18n';
import { getLang } from '@/lib/lang.server';
import { DEFAULT_CITY } from '@/lib/location';
import { AstrologyApiKeyMissing } from '@/components/astrologyapi/api-key-missing';
import { AstrologyApiDataError } from '@/components/astrologyapi/data-error';
import { PageHeader } from '@/components/page-header';
import { MonthYearControls } from '@/components/month-year-controls';
import { AstrologyApiTransitsView } from '@/components/astrologyapi/transits-view';
import type { AstrologyApiTropicalTransitsMonthly } from '@/lib/astrologyapi/types';

export const metadata: Metadata = {
  title: 'Transits (AstrologyAPI)',
  description:
    'Monthly tropical transit-to-natal aspects for all planets, sourced from AstrologyAPI (Western/tropical, unlike the sidereal Vedic transits on the main Transits page).',
};

function intParam(raw: string | string[] | undefined, fallback: number): number {
  const value = Array.isArray(raw) ? raw[0] : raw;
  const parsed = value === undefined ? Number.NaN : Number(value);
  return Number.isInteger(parsed) ? parsed : fallback;
}

/**
 * AstrologyAPI-backed transits route. `tropical_transits/monthly` computes transit-to-natal aspects, so it
 * needs a reference chart, not just a month: this page uses noon on the 1st of the selected month at the
 * default city as that reference point, since (unlike the sidereal Vedic transits page) there is no
 * birth-independent Vedic transit endpoint in AstrologyAPI.
 */
export default async function AstrologyApiTransitsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  if (!hasAstrologyApiKey) return <AstrologyApiKeyMissing />;

  const lang = await getLang();
  const now = new Date();
  const params = await searchParams;
  const month = intParam(params.month, now.getMonth() + 1);
  const year = intParam(params.year, now.getFullYear());

  const transits = await tryUnwrap(() =>
    astrologyApiRequest<AstrologyApiTropicalTransitsMonthly>('tropical_transits/monthly', {
      day: 1,
      month,
      year,
      hour: 12,
      min: 0,
      lat: DEFAULT_CITY.latitude,
      lon: DEFAULT_CITY.longitude,
      tzone: DEFAULT_CITY.timezone,
    }),
  );

  return (
    <div className="space-y-8">
      <PageHeader title={t(lang, 'transits.title')} subtitle={t(lang, 'transits.subtitle')} />
      <MonthYearControls month={month} year={year} />
      {'error' in transits ? (
        <AstrologyApiDataError message={transits.error} />
      ) : (
        <AstrologyApiTransitsView data={transits.data} lang={lang} />
      )}
    </div>
  );
}
