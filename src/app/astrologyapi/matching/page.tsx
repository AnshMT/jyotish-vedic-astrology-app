import type { Metadata } from 'next';
import { hasAstrologyApiKey } from '@/lib/astrologyapi/client';
import { getLang } from '@/lib/lang.server';
import { AstrologyApiKeyMissing } from '@/components/astrologyapi/api-key-missing';
import { AstrologyApiMatchingClient } from './matching-client';

export const metadata: Metadata = {
  title: 'Kundli Matching (AstrologyAPI)',
  description:
    'Ashtakoot Gun Milan: 36-point Vedic compatibility for two birth charts, with the koota breakdown and manglik analysis, sourced from AstrologyAPI.',
};

/** AstrologyAPI-backed matching route. Same Server Component boundary as `@/app/matching/page`. */
export default async function AstrologyApiMatchingPage() {
  if (!hasAstrologyApiKey) return <AstrologyApiKeyMissing />;
  const lang = await getLang();
  return <AstrologyApiMatchingClient lang={lang} />;
}
