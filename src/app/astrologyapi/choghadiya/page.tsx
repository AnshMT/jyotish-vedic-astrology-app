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
import { AstrologyApiChoghadiyaView } from '@/components/astrologyapi/choghadiya-view';
import type { AstrologyApiChaughadiya } from '@/lib/astrologyapi/types';

export const metadata: Metadata = {
  title: 'Choghadiya (AstrologyAPI)',
  description: 'Day and night Choghadiya muhurta periods for any date and city, sourced from AstrologyAPI.',
};

/** AstrologyAPI-backed Choghadiya route. Same URL-state pattern as `@/app/choghadiya/page`. */
export default async function AstrologyApiChoghadiyaPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const lang = await getLang();
  if (!hasAstrologyApiKey) return <AstrologyApiKeyMissing lang={lang} />;

  const { date, label, coords } = resolveDateAndLocation(await searchParams);
  const params = toDateParams({ date, time: '06:00', ...coords });

  const choghadiya = await tryUnwrap(() =>
    astrologyApiRequest<AstrologyApiChaughadiya>('chaughadiya_muhurta', params),
  );

  return (
    <div className="space-y-8">
      <DateLocationControls date={date} label={label} lang={lang} />
      <PageHeader title={t(lang, 'choghadiya.title')} subtitle={formatDate(date)} badge={label} />
      {'error' in choghadiya ? (
        <AstrologyApiDataError message={choghadiya.error} lang={lang} />
      ) : (
        <AstrologyApiChoghadiyaView data={choghadiya.data} lang={lang} />
      )}
    </div>
  );
}
