import { beforeEach, describe, expect, it, vi } from 'vitest';

/**
 * Tests for the form-submit Server Actions. The Roxy SDK is mocked, so these run with no network and no real key. They prove the kundali action fans out to every endpoint with the right shape (forwarding `lang` only to the i18n-aware ones) and that the matching action calls Gun Milan.
 */

const vedic = {
  generateBirthChart: vi.fn(),
  generateDivisionalChart: vi.fn(),
  getMajorDashas: vi.fn(),
  checkManglikDosha: vi.fn(),
  checkKalsarpaDosha: vi.fn(),
  checkSadhesati: vi.fn(),
  calculateAshtakavarga: vi.fn(),
  calculateShadbala: vi.fn(),
  calculateGunMilan: vi.fn(),
  getNakshatra: vi.fn(),
};

const crystals = {
  getCrystalsByZodiac: vi.fn(),
  listCrystals: vi.fn(),
};

vi.mock('@roxyapi/sdk', () => ({ createRoxy: () => ({ vedicAstrology: vedic, crystals }) }));

const birth = { date: '1990-01-15', time: '14:30:00', latitude: 28.6139, longitude: 77.209, timezone: 5.5 };

beforeEach(() => {
  vi.clearAllMocks();
  // The Roxy client freezes `hasApiKey` at import, so reset the registry every test
  // and let each test set the env before its dynamic import.
  vi.resetModules();
  process.env.ROXYAPI_KEY = 'test-key';
  for (const fn of [...Object.values(vedic), ...Object.values(crystals)]) {
    fn.mockResolvedValue({ data: {}, error: undefined });
  }
});

describe('generateKundali', () => {
  it('fans out to all eight endpoints, forwarding lang only to the i18n-aware ones', async () => {
    vedic.generateBirthChart.mockResolvedValue({ data: { meta: {} }, error: undefined });
    const { generateKundali } = await import('@/app/kundali/actions');

    const result = await generateKundali({ ...birth, lang: 'hi' });

    // i18n-aware endpoints receive the lang query.
    expect(vedic.generateBirthChart).toHaveBeenCalledWith({ query: { lang: 'hi' }, body: birth });
    expect(vedic.getMajorDashas).toHaveBeenCalledWith({ query: { lang: 'hi' }, body: birth });

    // D9 navamsa via the generic divisional chart.
    expect(vedic.generateDivisionalChart).toHaveBeenCalledWith({ body: { ...birth, division: 9 } });

    // Numeric-only endpoints take no lang query.
    expect(vedic.checkManglikDosha).toHaveBeenCalledWith({ body: birth });
    expect(vedic.checkKalsarpaDosha).toHaveBeenCalledWith({ body: birth });
    expect(vedic.checkSadhesati).toHaveBeenCalledWith({ body: birth });
    expect(vedic.calculateAshtakavarga).toHaveBeenCalledWith({ body: birth });
    expect(vedic.calculateShadbala).toHaveBeenCalledWith({ body: birth });

    expect(result.chart).toEqual({ meta: {} });
  });

  it('throws a setup error when the API key is missing', async () => {
    vi.resetModules();
    process.env.ROXYAPI_KEY = '';
    const { generateKundali } = await import('@/app/kundali/actions');
    await expect(generateKundali({ ...birth, lang: 'en' })).rejects.toThrow(/ROXYAPI_KEY is not set/);
  });

  it('throws a code-mapped message when an endpoint returns an error', async () => {
    vedic.calculateShadbala.mockResolvedValue({
      data: undefined,
      error: { error: 'boom', code: 'internal_error' },
    });
    const { generateKundali } = await import('@/app/kundali/actions');
    await expect(generateKundali({ ...birth })).rejects.toThrow('boom');
  });
});

describe('calculateMatch', () => {
  it('calls Gun Milan with both people and forwards lang', async () => {
    vedic.calculateGunMilan.mockResolvedValue({ data: { total: 28 }, error: undefined });
    const { calculateMatch } = await import('@/app/matching/actions');

    const person1 = { ...birth };
    const person2 = { ...birth, date: '1992-03-15' };
    const result = await calculateMatch({ person1, person2, lang: 'es' });

    expect(vedic.calculateGunMilan).toHaveBeenCalledWith({ query: { lang: 'es' }, body: { person1, person2 } });
    expect(result).toEqual({ total: 28 });
  });
});

describe('findMoonPlacement', () => {
  it('reads the Moon sign and nakshatra index from the chart meta lookup', async () => {
    const { findMoonPlacement } = await import('@/lib/roxy/remedies');
    const chart = { meta: { Moon: { rashi: 'scorpio', nakshatra: { key: 17, name: 'Anuradha', pada: 1, lord: 'Saturn' } } } };

    expect(findMoonPlacement(chart as never)).toEqual({ moonSign: 'scorpio', nakshatraKey: 17 });
  });

  it('throws when the chart has no Moon entry', async () => {
    const { findMoonPlacement } = await import('@/lib/roxy/remedies');
    expect(() => findMoonPlacement({ meta: {} } as never)).toThrow(/Moon not found/);
  });
});

describe('findWeakestPlanet', () => {
  it('picks the planet with relativeRank 7', async () => {
    const { findWeakestPlanet } = await import('@/lib/roxy/remedies');
    const shadbala = {
      planets: [
        { planet: 'Sun', relativeRank: 3 },
        { planet: 'Saturn', relativeRank: 7 },
        { planet: 'Moon', relativeRank: 1 },
      ],
    };
    expect(findWeakestPlanet(shadbala as never)).toBe('Saturn');
  });
});

describe('fetchRoxyRemedies', () => {
  it('fetches the birth-nakshatra remedies, moon-sign crystals, and weak-planet crystals in parallel', async () => {
    vedic.getNakshatra.mockResolvedValue({ data: { name: 'Anuradha' }, error: undefined });
    crystals.getCrystalsByZodiac.mockResolvedValue({ data: { sign: 'scorpio', crystals: [] }, error: undefined });
    crystals.listCrystals.mockResolvedValue({ data: { crystals: [] }, error: undefined });

    const { fetchRoxyRemedies } = await import('@/app/kundali/actions');
    const result = await fetchRoxyRemedies({ nakshatraKey: 20, moonSign: 'scorpio', weakPlanet: 'Saturn', lang: 'hi' });

    // Nakshatra 20 (1-indexed) is purva-ashadha.
    expect(vedic.getNakshatra).toHaveBeenCalledWith({ path: { id: 'purva-ashadha' }, query: { lang: 'hi' } });
    expect(crystals.getCrystalsByZodiac).toHaveBeenCalledWith({
      path: { sign: 'scorpio' },
      query: { lang: 'hi', limit: 6 },
    });
    expect(crystals.listCrystals).toHaveBeenCalledWith({ query: { planet: 'Saturn', lang: 'hi', limit: 6 } });
    expect(result.nakshatra).toEqual({ name: 'Anuradha' });
  });
});
