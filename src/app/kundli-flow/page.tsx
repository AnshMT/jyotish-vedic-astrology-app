import type { Metadata } from 'next';
import { hasApiKey } from '@/lib/roxy/client';
import { getLang } from '@/lib/lang.server';
import { ApiKeyMissing } from '@/components/api-key-missing';
import { KundliFlowClient } from './kundli-flow-client';

export const metadata: Metadata = {
  title: 'Kundli Flow',
  description:
    'The MVP Kundli integration flow: resolve a birth place, then generate the birth chart, current dasha, doshas, and birth panchang in one report.',
};

/**
 * Kundli Flow route. Same Server Component boundary as `@/app/kundali/page`: checks the key and reads the
 * active language, then hands off to the client form.
 */
export default async function KundliFlowPage() {
  const lang = await getLang();
  if (!hasApiKey) return <ApiKeyMissing lang={lang} />;
  return <KundliFlowClient lang={lang} />;
}
