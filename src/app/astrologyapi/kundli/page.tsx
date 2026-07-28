import type { Metadata } from 'next';
import { hasAstrologyApiKey } from '@/lib/astrologyapi/client';
import { AstrologyApiKeyMissing } from '@/components/astrologyapi/api-key-missing';
import { AstrologyApiKundliClient } from './kundli-client';

export const metadata: Metadata = {
  title: 'Kundli (AstrologyAPI)',
  description:
    'Generate a Vedic birth chart with planetary positions, Vimshottari dasha, kalsarpa and sadhesati dosha, and sarvashtakavarga/shadbala strength, sourced from AstrologyAPI.',
};

/**
 * AstrologyAPI-backed Kundli route. Same Server Component boundary as `@/app/kundali/page`: checks the key,
 * then hands off to the client form. The form submit runs a Server Action that fans out to AstrologyAPI.
 */
export default async function AstrologyApiKundliPage() {
  if (!hasAstrologyApiKey) return <AstrologyApiKeyMissing />;
  return <AstrologyApiKundliClient />;
}
