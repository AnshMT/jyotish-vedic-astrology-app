import type { Lang } from '@/lib/lang';

/**
 * Static-string localization for the handful of components genuinely shared by both the RoxyAPI (`@/app/*`)
 * and AstrologyAPI (`@/app/astrologyapi/*`) page families — there is only one implementation of each of
 * these, imported from both sides, unlike the per-vendor "mirrored" components (data-error, api-key-missing)
 * which each vendor keeps its own copy of. English and Hindi only, same fallback rules as
 * `@/lib/astrologyapi/i18n`.
 */

type Dict = Record<string, string>;

const EN: Dict = {
  'date': 'Date',
  'city': 'City',
  'loading': 'Loading...',
  'update': 'Update',
  'month': 'Month',
  'year': 'Year',
  'viewTransits': 'View Transits',
  'searchCity': 'Search city...',

  'nav.panchang': 'Panchang',
  'nav.choghadiya': 'Choghadiya',
  'nav.kundali': 'Kundali',
  'nav.kundli': 'Kundli',
  'nav.matching': 'Matching',
  'nav.transits': 'Transits',
  'nav.toggleMenu': 'Toggle menu',
  'nav.changeLanguage': 'Change language',

  'footer.poweredBy': 'Powered by',
  'footer.docs': 'Docs',
  'footer.getApiKey': 'Get API Key',
};

const HI: Dict = {
  'date': 'तिथि',
  'city': 'शहर',
  'loading': 'लोड हो रहा है...',
  'update': 'अपडेट करें',
  'month': 'महीना',
  'year': 'वर्ष',
  'viewTransits': 'गोचर देखें',
  'searchCity': 'शहर खोजें...',

  'nav.panchang': 'पंचांग',
  'nav.choghadiya': 'चौघड़िया',
  'nav.kundali': 'कुंडली',
  'nav.kundli': 'कुंडली',
  'nav.matching': 'मिलान',
  'nav.transits': 'गोचर',
  'nav.toggleMenu': 'मेनू खोलें/बंद करें',
  'nav.changeLanguage': 'भाषा बदलें',

  'footer.poweredBy': 'संचालित',
  'footer.docs': 'दस्तावेज़',
  'footer.getApiKey': 'एपीआई कुंजी प्राप्त करें',
};

const DICTS: Record<'en' | 'hi', Dict> = { en: EN, hi: HI };

function dictLang(lang: Lang): 'en' | 'hi' {
  return lang === 'hi' ? 'hi' : 'en';
}

/** Looks up a static UI string shared across vendor page families. Falls back to English, then the raw key. */
export function t(lang: Lang, key: keyof typeof EN): string {
  return DICTS[dictLang(lang)][key] ?? EN[key] ?? key;
}

const MONTHS_HI: Dict = {
  January: 'जनवरी',
  February: 'फ़रवरी',
  March: 'मार्च',
  April: 'अप्रैल',
  May: 'मई',
  June: 'जून',
  July: 'जुलाई',
  August: 'अगस्त',
  September: 'सितंबर',
  October: 'अक्टूबर',
  November: 'नवंबर',
  December: 'दिसंबर',
};

export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
] as const;

/** Translates an English month name (as used internally by `MonthYearControls`) for display. */
export function translateMonth(lang: Lang, name: string): string {
  if (dictLang(lang) !== 'hi') return name;
  return MONTHS_HI[name] ?? name;
}
