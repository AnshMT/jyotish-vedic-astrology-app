import type { Lang } from '@/lib/lang';

/**
 * Static-string localization for the RoxyAPI pages' own chrome (headings, tab labels, buttons, table
 * headers), English and Hindi only — mirrors `@/lib/astrologyapi/i18n`.
 *
 * @remarks Most RoxyAPI Vedic endpoints (birth chart, dashas, nakshatra remedies, crystals, panchang) accept
 * a `lang` query and return vendor prose already translated, so this dictionary only needs to cover text
 * this app itself renders. A few endpoints have no `lang` support at all (choghadiya, hora, monthly transits
 * and aspects — confirmed by their SDK types having `query?: never`), so their vendor-returned planet/sign
 * names are translated by hand via the closed-vocabulary helpers below, the same approach
 * `@/lib/astrologyapi/i18n` uses for AstrologyAPI's non-i18n endpoints.
 */

type Dict = Record<string, string>;

const EN: Dict = {
  'panchang.title': 'Panchang',

  'choghadiya.pageTitle': 'Choghadiya and Hora',
  'choghadiya.heading': 'Choghadiya',
  'choghadiya.subtitle': '8 muhurta periods each for day and night, marking auspicious and inauspicious windows',

  'hora.heading': 'Hora',
  'hora.subtitle': '24 planetary hours, each ruled by a planet in the Chaldean sequence',
  'hora.dayTitle': 'Day Horas',
  'hora.daySubtitle': 'Sunrise to sunset',
  'hora.nightTitle': 'Night Horas',
  'hora.nightSubtitle': 'Sunset to next sunrise',

  'transits.pageTitle': 'Planetary Transits',
  'transits.pageSubtitle': 'Monthly sign changes and aspects for all nine planets',
  'transitsView.startingPositions': 'Starting Positions',
  'transitsView.signChanges': 'Sign Changes',
  'transitsView.noSignChanges': 'No sign changes this month.',
  'transitsView.planetaryAspects': 'Planetary Aspects',
  'transitsView.to': 'to',
  'transitsView.retrograde': 'Rx',
  'transitsView.orb': 'orb',

  'kundali.title': 'Kundali',
  'kundali.subtitle': 'Vedic birth chart with planetary positions, dashas, doshas, and strengths',
  'kundali.birthDetailsTitle': 'Birth Details',
  'kundali.birthDetailsDesc': 'Enter your date, time, and place of birth',
  'kundali.dateOfBirth': 'Date of Birth',
  'kundali.timeOfBirth': 'Time of Birth',
  'kundali.generate': 'Generate Kundali',
  'kundali.generating': 'Generating...',
  'kundali.errorFallback': 'Failed to generate kundali',
  'kundali.tab.chart': 'Rashi (D1)',
  'kundali.tab.planets': 'Planets',
  'kundali.tab.varga': 'Varga',
  'kundali.tab.dasha': 'Dasha',
  'kundali.tab.doshas': 'Doshas',
  'kundali.tab.strength': 'Strength',
  'kundali.tab.remedies': 'Remedies',

  'varga.title': 'Divisional Charts',
  'varga.subtitle': 'Select a varga chart to analyze a specific life area',
  'varga.select': 'Divisional chart',
  'varga.loading': 'Loading chart...',

  'varga.d9.name': 'D9 Navamsa',
  'varga.d9.desc': 'Marriage and dharma',
  'varga.d2.name': 'D2 Hora',
  'varga.d2.desc': 'Wealth',
  'varga.d3.name': 'D3 Drekkana',
  'varga.d3.desc': 'Siblings',
  'varga.d4.name': 'D4 Chaturthamsa',
  'varga.d4.desc': 'Property',
  'varga.d7.name': 'D7 Saptamsa',
  'varga.d7.desc': 'Children',
  'varga.d10.name': 'D10 Dasamsa',
  'varga.d10.desc': 'Career',
  'varga.d12.name': 'D12 Dwadasamsa',
  'varga.d12.desc': 'Parents',
  'varga.d16.name': 'D16 Shodasamsa',
  'varga.d16.desc': 'Vehicles',
  'varga.d20.name': 'D20 Vimsamsa',
  'varga.d20.desc': 'Spirituality',
  'varga.d24.name': 'D24 Chaturvimsamsa',
  'varga.d24.desc': 'Education',
  'varga.d27.name': 'D27 Bhamsa',
  'varga.d27.desc': 'Strengths',
  'varga.d30.name': 'D30 Trimsamsa',
  'varga.d30.desc': 'Misfortunes',
  'varga.d40.name': 'D40 Khavedamsa',
  'varga.d40.desc': 'Maternal legacy',
  'varga.d45.name': 'D45 Akshavedamsa',
  'varga.d45.desc': 'Character',
  'varga.d60.name': 'D60 Shashtiamsa',
  'varga.d60.desc': 'Past karma',

  'remedies.loading': 'Loading remedies...',
  'remedies.errorFallback': 'Failed to load remedies',
  'remedies.birthNakshatra': 'Birth Nakshatra: {name}',
  'remedies.ruledBy': 'Ruled by {lord} · deity {deity} · symbol {symbol}',
  'remedies.mantras': 'Mantras',
  'remedies.gemstones': 'Gemstones',
  'remedies.rituals': 'Rituals',
  'remedies.crystalsForMoon': 'Crystals for {sign} Moon',
  'remedies.crystalsForMoonDesc': 'Healing crystals associated with your natal Moon sign',
  'remedies.crystalsForPlanet': 'Crystals for {planet}',
  'remedies.weakestPlanetDesc': '{planet} is your weakest planet by Shadbala — these crystals are traditionally associated with it',
  'remedies.noCrystals': 'No matching crystals found.',

  'matching.title': 'Kundali Matching',
  'matching.subtitle': 'Ashtakoot Gun Milan compatibility analysis',
  'matching.person1': 'Person 1',
  'matching.person2': 'Person 2',
  'matching.enterBirthDetails': 'Enter birth details',
  'matching.birthDate': 'Birth Date',
  'matching.birthTime': 'Birth Time',
  'matching.check': 'Check Compatibility',
  'matching.calculating': 'Calculating...',
  'matching.errorFallback': 'Failed to calculate compatibility',
  'matching.defaultCity1': 'Mumbai, India',
  'matching.defaultCity2': 'Delhi, India',

  'dataError.title': 'Could not load data',
  'dataError.docsLink': 'Check the API docs',

  'apiKeyMissing.badge': 'Setup required',
  'apiKeyMissing.title': 'API key not configured',
  'apiKeyMissing.desc': 'This app needs a RoxyAPI key to fetch Vedic astrology data. Get one in under a minute.',
  'apiKeyMissing.step1': 'Get your API key at',
  'apiKeyMissing.step2a': 'Create a',
  'apiKeyMissing.step2b': 'file in your project root',
  'apiKeyMissing.step3a': 'Add',
  'apiKeyMissing.step4': 'Restart the dev server',
  'apiKeyMissing.getKey': 'Get API Key',
  'apiKeyMissing.readDocs': 'Read docs',
  'apiKeyMissing.footnote': 'One key unlocks 40+ Vedic astrology endpoints. Panchang, kundli, dasha, doshas, matching, transits, and more.',
};

const HI: Dict = {
  'panchang.title': 'पंचांग',

  'choghadiya.pageTitle': 'चौघड़िया और होरा',
  'choghadiya.heading': 'चौघड़िया',
  'choghadiya.subtitle': 'दिन और रात के लिए 8-8 मुहूर्त अवधि, शुभ और अशुभ समय को दर्शाते हुए',

  'hora.heading': 'होरा',
  'hora.subtitle': 'कैल्डियन क्रम में प्रत्येक ग्रह द्वारा शासित 24 ग्रह होरा',
  'hora.dayTitle': 'दिन के होरा',
  'hora.daySubtitle': 'सूर्योदय से सूर्यास्त तक',
  'hora.nightTitle': 'रात्रि के होरा',
  'hora.nightSubtitle': 'सूर्यास्त से अगले सूर्योदय तक',

  'transits.pageTitle': 'ग्रह गोचर',
  'transits.pageSubtitle': 'सभी नौ ग्रहों के लिए मासिक राशि परिवर्तन और दृष्टि संबंध',
  'transitsView.startingPositions': 'प्रारंभिक स्थितियां',
  'transitsView.signChanges': 'राशि परिवर्तन',
  'transitsView.noSignChanges': 'इस महीने कोई राशि परिवर्तन नहीं है।',
  'transitsView.planetaryAspects': 'ग्रह दृष्टि संबंध',
  'transitsView.to': 'से',
  'transitsView.retrograde': 'वक्री',
  'transitsView.orb': 'ऑर्ब',

  'kundali.title': 'कुंडली',
  'kundali.subtitle': 'ग्रह स्थिति, दशा, दोष और बल के साथ वैदिक जन्म कुंडली',
  'kundali.birthDetailsTitle': 'जन्म विवरण',
  'kundali.birthDetailsDesc': 'अपनी जन्म तिथि, समय और स्थान दर्ज करें',
  'kundali.dateOfBirth': 'जन्म तिथि',
  'kundali.timeOfBirth': 'जन्म समय',
  'kundali.generate': 'कुंडली बनाएं',
  'kundali.generating': 'बन रही है...',
  'kundali.errorFallback': 'कुंडली बनाने में विफल',
  'kundali.tab.chart': 'राशि (D1)',
  'kundali.tab.planets': 'ग्रह',
  'kundali.tab.varga': 'वर्ग',
  'kundali.tab.dasha': 'दशा',
  'kundali.tab.doshas': 'दोष',
  'kundali.tab.strength': 'बल',
  'kundali.tab.remedies': 'उपाय',

  'varga.title': 'विभाजित चार्ट',
  'varga.subtitle': 'किसी विशेष जीवन क्षेत्र का विश्लेषण करने के लिए एक वर्ग चार्ट चुनें',
  'varga.select': 'विभाजित चार्ट',
  'varga.loading': 'चार्ट लोड हो रहा है...',

  'varga.d9.name': 'D9 नवमांश',
  'varga.d9.desc': 'विवाह और धर्म',
  'varga.d2.name': 'D2 होरा',
  'varga.d2.desc': 'धन',
  'varga.d3.name': 'D3 द्रेष्काण',
  'varga.d3.desc': 'भाई-बहन',
  'varga.d4.name': 'D4 चतुर्थांश',
  'varga.d4.desc': 'संपत्ति',
  'varga.d7.name': 'D7 सप्तमांश',
  'varga.d7.desc': 'संतान',
  'varga.d10.name': 'D10 दशमांश',
  'varga.d10.desc': 'करियर',
  'varga.d12.name': 'D12 द्वादशांश',
  'varga.d12.desc': 'माता-पिता',
  'varga.d16.name': 'D16 षोडशांश',
  'varga.d16.desc': 'वाहन',
  'varga.d20.name': 'D20 विंशांश',
  'varga.d20.desc': 'आध्यात्मिकता',
  'varga.d24.name': 'D24 चतुर्विंशांश',
  'varga.d24.desc': 'शिक्षा',
  'varga.d27.name': 'D27 भांश',
  'varga.d27.desc': 'शक्तियां',
  'varga.d30.name': 'D30 त्रिंशांश',
  'varga.d30.desc': 'दुर्भाग्य',
  'varga.d40.name': 'D40 खवेदांश',
  'varga.d40.desc': 'ननिहाल की विरासत',
  'varga.d45.name': 'D45 अक्षवेदांश',
  'varga.d45.desc': 'चरित्र',
  'varga.d60.name': 'D60 षष्ट्यंश',
  'varga.d60.desc': 'पूर्व कर्म',

  'remedies.loading': 'उपाय लोड हो रहे हैं...',
  'remedies.errorFallback': 'उपाय लोड करने में विफल',
  'remedies.birthNakshatra': 'जन्म नक्षत्र: {name}',
  'remedies.ruledBy': 'स्वामी {lord} · देवता {deity} · प्रतीक {symbol}',
  'remedies.mantras': 'मंत्र',
  'remedies.gemstones': 'रत्न',
  'remedies.rituals': 'अनुष्ठान',
  'remedies.crystalsForMoon': '{sign} चंद्रमा के लिए क्रिस्टल',
  'remedies.crystalsForMoonDesc': 'आपकी जन्म चंद्र राशि से संबंधित उपचारक क्रिस्टल',
  'remedies.crystalsForPlanet': '{planet} के लिए क्रिस्टल',
  'remedies.weakestPlanetDesc': 'षड्बल के अनुसार {planet} आपका सबसे कमज़ोर ग्रह है — पारंपरिक रूप से ये क्रिस्टल इससे संबंधित हैं',
  'remedies.noCrystals': 'कोई मेल खाने वाला क्रिस्टल नहीं मिला।',

  'matching.title': 'कुंडली मिलान',
  'matching.subtitle': 'अष्टकूट गुण मिलान अनुकूलता विश्लेषण',
  'matching.person1': 'व्यक्ति 1',
  'matching.person2': 'व्यक्ति 2',
  'matching.enterBirthDetails': 'जन्म विवरण दर्ज करें',
  'matching.birthDate': 'जन्म तिथि',
  'matching.birthTime': 'जन्म समय',
  'matching.check': 'अनुकूलता जांचें',
  'matching.calculating': 'गणना हो रही है...',
  'matching.errorFallback': 'अनुकूलता की गणना करने में विफल',
  'matching.defaultCity1': 'मुंबई, भारत',
  'matching.defaultCity2': 'दिल्ली, भारत',

  'dataError.title': 'डेटा लोड नहीं हो सका',
  'dataError.docsLink': 'एपीआई दस्तावेज़ देखें',

  'apiKeyMissing.badge': 'सेटअप आवश्यक',
  'apiKeyMissing.title': 'एपीआई कुंजी कॉन्फ़िगर नहीं है',
  'apiKeyMissing.desc': 'इस ऐप को वैदिक ज्योतिष डेटा प्राप्त करने के लिए एक RoxyAPI कुंजी चाहिए। एक मिनट से भी कम समय में प्राप्त करें।',
  'apiKeyMissing.step1': 'अपनी एपीआई कुंजी यहां प्राप्त करें:',
  'apiKeyMissing.step2a': 'अपनी प्रोजेक्ट रूट में एक',
  'apiKeyMissing.step2b': 'फ़ाइल बनाएं',
  'apiKeyMissing.step3a': 'जोड़ें',
  'apiKeyMissing.step4': 'डेव सर्वर को पुनरारंभ करें',
  'apiKeyMissing.getKey': 'एपीआई कुंजी प्राप्त करें',
  'apiKeyMissing.readDocs': 'दस्तावेज़ पढ़ें',
  'apiKeyMissing.footnote': 'एक कुंजी 40+ वैदिक ज्योतिष एंडपॉइंट अनलॉक करती है। पंचांग, कुंडली, दशा, दोष, मिलान, गोचर और भी बहुत कुछ।',
};

const DICTS: Record<'en' | 'hi', Dict> = { en: EN, hi: HI };

function dictLang(lang: Lang): 'en' | 'hi' {
  return lang === 'hi' ? 'hi' : 'en';
}

/**
 * Looks up a static UI string, optionally interpolating `{token}` placeholders. Falls back to the English
 * string (and then to the raw key) if a translation is missing, so a typo never renders blank.
 */
export function t(lang: Lang, key: keyof typeof EN, vars?: Record<string, string | number>): string {
  let template = DICTS[dictLang(lang)][key] ?? EN[key] ?? key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      template = template.replaceAll(`{${k}}`, String(v));
    }
  }
  return template;
}

/**
 * The nine grahas RoxyAPI's non-i18n-aware endpoints (choghadiya, hora, monthly transits/aspects) return.
 * Mirrors `@/lib/astrologyapi/i18n`'s `PLANET_NAMES_HI`.
 */
const PLANET_NAMES_HI: Dict = {
  Sun: 'सूर्य',
  Moon: 'चंद्र',
  Mars: 'मंगल',
  Mercury: 'बुध',
  Jupiter: 'बृहस्पति',
  Venus: 'शुक्र',
  Saturn: 'शनि',
  Rahu: 'राहु',
  Ketu: 'केतु',
};

/** Translates a vendor planet name (e.g. `"Saturn"`) for display. */
export function translatePlanetName(lang: Lang, name: string): string {
  if (dictLang(lang) !== 'hi') return name;
  return PLANET_NAMES_HI[name] ?? name;
}

const SIGN_NAMES_HI: Dict = {
  Aries: 'मेष',
  Taurus: 'वृषभ',
  Gemini: 'मिथुन',
  Cancer: 'कर्क',
  Leo: 'सिंह',
  Virgo: 'कन्या',
  Libra: 'तुला',
  Scorpio: 'वृश्चिक',
  Sagittarius: 'धनु',
  Capricorn: 'मकर',
  Aquarius: 'कुंभ',
  Pisces: 'मीन',
};

/** Translates a vendor zodiac sign name (title-case, e.g. `"Scorpio"`), case-insensitively. */
export function translateSignName(lang: Lang, name: string): string {
  if (dictLang(lang) !== 'hi') return name;
  const key = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  return SIGN_NAMES_HI[key] ?? name;
}

/**
 * The planetary-aspect names `POST /vedic-astrology/aspects/monthly` can return (major aspects plus the
 * commonly-occurring minor ones). Anything outside this closed set (the rarer minor aspects) falls back to
 * the vendor's English name, same as every other `translateX` helper in this app.
 */
const ASPECT_NAMES_HI: Dict = {
  conjunction: 'युति',
  opposition: 'प्रतियुति',
  trine: 'त्रिकोण',
  square: 'केंद्र',
  sextile: 'षष्ठकोण',
  quincunx: 'विषम',
  'semi-sextile': 'अर्ध-षष्ठकोण',
  'semi-square': 'अर्ध-केंद्र',
  'sesqui-square': 'सेस्क्वी-केंद्र',
  quintile: 'पंचम कोण',
  'bi-quintile': 'द्वि-पंचम कोण',
  septile: 'सप्तम कोण',
};

/** Translates a `vedic-astrology/aspects/monthly` aspect name (e.g. `"trine"`), case-insensitively. */
export function translateAspect(lang: Lang, name: string): string {
  if (dictLang(lang) !== 'hi') return name;
  return ASPECT_NAMES_HI[name.toLowerCase()] ?? name;
}
