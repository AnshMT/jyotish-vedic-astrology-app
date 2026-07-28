import 'server-only';
import { hasAstrologyApiKey } from './client';

/** Single message shown when `ASTROLOGYAPI_KEY` is unset. Mirrors `@/lib/roxy/guard`'s `NO_KEY`. */
export const NO_KEY =
  'ASTROLOGYAPI_KEY is not set. Add it to .env.local and restart the dev server. Get a key at astrologyapi.com.';

/**
 * Awaits one `astrologyApiRequest` call, throwing {@link NO_KEY} up front when no key is configured. The
 * request itself already throws a clear `Error` (built from the endpoint's `msg`) on any API failure, so
 * this only adds the missing-key guard every Server Component and Server Action would otherwise repeat.
 */
export async function unwrap<T>(call: () => Promise<T>): Promise<T> {
  if (!hasAstrologyApiKey) throw new Error(NO_KEY);
  return call();
}

/** Non-throwing variant of {@link unwrap} for Server Components, mirroring `@/lib/roxy/guard`'s `tryUnwrap`. */
export async function tryUnwrap<T>(call: () => Promise<T>): Promise<{ data: T } | { error: string }> {
  try {
    return { data: await unwrap(call) };
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'The request to AstrologyAPI failed.' };
  }
}
