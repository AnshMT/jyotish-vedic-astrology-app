import 'server-only';

/**
 * Server-only AstrologyAPI client. Every endpoint takes a `x-astrologyapi-key` header and a form-urlencoded
 * body (day, month, year, hour, min, lat, lon, tzone, plus endpoint-specific fields). There is no generated
 * SDK for this API, so `astrologyApiRequest` is the one place that owns the base URL, auth header, and
 * body encoding.
 *
 * @remarks The `server-only` import makes an accidental client-side import a build error, so the key can
 * never reach the browser. Read {@link hasAstrologyApiKey} before calling, or call through `unwrap`/`tryUnwrap`
 * from `./guard`.
 */
const key = process.env.ASTROLOGYAPI_KEY;

const BASE_URL = 'https://json.astrologyapi.com/v1';

/** True when `ASTROLOGYAPI_KEY` is set. Render `AstrologyApiKeyMissing` at the page boundary when this is false. */
export const hasAstrologyApiKey = Boolean(key);

/** The error envelope every AstrologyAPI endpoint returns on failure (`status: false` always accompanies it). */
export interface AstrologyApiError {
  status: false;
  msg: string;
  error?: Array<{ message: string; path: string[] }>;
}

/**
 * POSTs form-urlencoded params to an AstrologyAPI endpoint and returns the parsed JSON.
 *
 * @param path - The path after `/v1`, e.g. `'planets'` or `'horo_chart/D1'`.
 * @param params - Request fields; values are stringified and form-encoded. `undefined`/`null` values are omitted.
 * @throws {Error} {@link NO_KEY} equivalent when no key is configured (checked by callers via `hasAstrologyApiKey`),
 * or the endpoint's own `msg` when the response body carries `status: false`.
 */
export async function astrologyApiRequest<T>(
  path: string,
  params: object,
): Promise<T> {
  const body = new URLSearchParams();
  for (const [k, v] of Object.entries(params as Record<string, string | number | boolean | undefined | null>)) {
    if (v !== undefined && v !== null) body.set(k, String(v));
  }

  const res = await fetch(`${BASE_URL}/${path}`, {
    method: 'POST',
    headers: {
      'x-astrologyapi-key': key ?? '',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
    cache: 'no-store',
  });

  const json = (await res.json()) as T | AstrologyApiError;
  if (!res.ok || (json as AstrologyApiError).status === false) {
    const err = json as AstrologyApiError;
    throw new Error(err.msg ?? `AstrologyAPI request to ${path} failed with status ${res.status}`);
  }
  return json as T;
}
