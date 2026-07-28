import type { Metadata } from 'next';
import { hasAstrologyApiKey } from '@/lib/astrologyapi/client';
import { getLang } from '@/lib/lang.server';
import { AstrologyApiKeyMissing } from '@/components/astrologyapi/api-key-missing';
import { AstrologyApiKundliClient } from './kundli-client';

export const metadata: Metadata = {
  title: 'Kundli (AstrologyAPI)',
  description:
    'Generate a Vedic birth chart with planetary positions, Vimshottari dasha, kalsarpa and sadhesati dosha, and sarvashtakavarga/shadbala strength, sourced from AstrologyAPI.',
};

/**
 * AstrologyAPI-backed Kundli route. Same Server Component boundary as `@/app/kundali/page`: checks the key
 * and reads the active language, then hands off to the client form. AstrologyAPI itself has no `lang`
 * parameter on these endpoints, so `lang` only drives this app's own labels (see `@/lib/astrologyapi/i18n`).
 */
export default async function AstrologyApiKundliPage() {
  if (!hasAstrologyApiKey) return <AstrologyApiKeyMissing />;
  const lang = await getLang();
  return <AstrologyApiKundliClient lang={lang} />;
}
