import type { Metadata } from 'next';
import { hasAstrologyApiKey } from '@/lib/astrologyapi/client';
import { getLang } from '@/lib/lang.server';
import { AstrologyApiKeyMissing } from '@/components/astrologyapi/api-key-missing';
import { KundliFlowAstroApiClient } from './kundliflow-astroapi-client';

export const metadata: Metadata = {
  title: 'Kundli Flow (AstrologyAPI)',
  description:
    'A single continuous Vedic report from AstrologyAPI: birth chart, every varga chart, dasha, doshas, strength, interpretation, remedies, and Lal Kitab.',
};

/**
 * Kundli Flow (AstrologyAPI) route. Same Server Component boundary as `@/app/astrologyapi/kundli/page`.
 * Reuses that page's exact server action and bespoke components — this page differs only in presentation
 * (one continuous report instead of tabs) and the addition of a Name field, not in what data is fetched.
 */
export default async function KundliFlowAstroApiPage() {
  const lang = await getLang();
  if (!hasAstrologyApiKey) return <AstrologyApiKeyMissing lang={lang} />;
  return <KundliFlowAstroApiClient lang={lang} />;
}
