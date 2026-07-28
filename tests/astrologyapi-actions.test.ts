import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

/**
 * Tests for the AstrologyAPI-backed Server Actions (`src/app/astrologyapi/*`). Unlike the RoxyAPI tests,
 * there is no SDK to mock: `astrologyApiRequest` calls `fetch` directly, so `global.fetch` is mocked instead.
 * These prove the kundli action fans out to all seven endpoints with the right params, the matching action
 * calls all three match endpoints with `m_`/`f_`-prefixed params, and both surface the vendor's `msg` and
 * the missing-key error correctly.
 */

const birth = { date: '1990-01-15', time: '14:30', latitude: 28.6139, longitude: 77.209, timezone: 5.5 };

function jsonResponse(body: unknown, ok = true) {
  return { ok, json: async () => body };
}

let fetchMock: ReturnType<typeof vi.fn>;

beforeEach(() => {
  vi.resetModules();
  process.env.ASTROLOGYAPI_KEY = 'test-token';
  fetchMock = vi.fn().mockResolvedValue(jsonResponse({}));
  vi.stubGlobal('fetch', fetchMock);
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe('generateAstrologyApiKundli', () => {
  it('fans out to all seven endpoints with split day/month/year params', async () => {
    const { generateAstrologyApiKundli } = await import('@/app/astrologyapi/kundli/actions');

    await generateAstrologyApiKundli(birth);

    const calledPaths = fetchMock.mock.calls.map((call: unknown[]) => call[0]);
    expect(calledPaths).toEqual(
      expect.arrayContaining([
        'https://json.astrologyapi.com/v1/planets',
        'https://json.astrologyapi.com/v1/horo_chart/D1',
        'https://json.astrologyapi.com/v1/major_vdasha',
        'https://json.astrologyapi.com/v1/kalsarpa_details',
        'https://json.astrologyapi.com/v1/sadhesati_current_status',
        'https://json.astrologyapi.com/v1/sarvashtak',
        'https://json.astrologyapi.com/v1/shadbala',
      ]),
    );

    const [, options] = fetchMock.mock.calls[0];
    expect(options.headers['x-astrologyapi-key']).toBe('test-token');
    const body = options.body as URLSearchParams;
    expect(body.get('day')).toBe('15');
    expect(body.get('month')).toBe('1');
    expect(body.get('year')).toBe('1990');
    expect(body.get('lat')).toBe('28.6139');
  });

  it('throws the NO_KEY message when the key is missing', async () => {
    process.env.ASTROLOGYAPI_KEY = '';
    const { generateAstrologyApiKundli } = await import('@/app/astrologyapi/kundli/actions');
    await expect(generateAstrologyApiKundli(birth)).rejects.toThrow(/ASTROLOGYAPI_KEY is not set/);
  });

  it('throws the vendor msg when an endpoint returns status: false', async () => {
    fetchMock.mockResolvedValue(jsonResponse({ status: false, msg: 'boom' }, false));
    const { generateAstrologyApiKundli } = await import('@/app/astrologyapi/kundli/actions');
    await expect(generateAstrologyApiKundli(birth)).rejects.toThrow('boom');
  });
});

describe('calculateAstrologyApiMatch', () => {
  it('calls all three match endpoints with m_/f_ prefixed params', async () => {
    const { calculateAstrologyApiMatch } = await import('@/app/astrologyapi/matching/actions');

    const person1 = { ...birth };
    const person2 = { ...birth, date: '1992-03-15' };
    await calculateAstrologyApiMatch({ person1, person2 });

    const calledPaths = fetchMock.mock.calls.map((call: unknown[]) => call[0]);
    expect(calledPaths).toEqual(
      expect.arrayContaining([
        'https://json.astrologyapi.com/v1/match_making_report',
        'https://json.astrologyapi.com/v1/match_ashtakoot_points',
        'https://json.astrologyapi.com/v1/match_manglik_report',
      ]),
    );

    const [, options] = fetchMock.mock.calls[0];
    const body = options.body as URLSearchParams;
    expect(body.get('m_day')).toBe('15');
    expect(body.get('m_year')).toBe('1990');
    expect(body.get('f_day')).toBe('15');
    expect(body.get('f_month')).toBe('3');
    expect(body.get('f_year')).toBe('1992');
  });
});
