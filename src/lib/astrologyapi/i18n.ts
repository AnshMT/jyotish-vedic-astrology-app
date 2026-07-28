import type { Lang } from '@/lib/lang';

/**
 * Static-string localization for the AstrologyAPI pages, English and Hindi only.
 *
 * @remarks AstrologyAPI's JSON endpoints have no `lang` parameter at all (only its PDF report endpoints
 * accept one, for a feature this app doesn't use), unlike RoxyAPI's i18n-aware endpoints. So this only
 * translates strings this app itself renders — labels, headings, buttons, table headers — plus a handful
 * of closed, enumerable vendor vocabularies (planet names, zodiac signs, weekdays, choghadiya muhurta
 * names) that are safe to map by hand. Free-form vendor prose (interpretation reports, remedies,
 * conclusions, koota attribute names, planetary "avastha" states) is returned only in English by the
 * vendor and is rendered as-is in every language.
 */

type Dict = Record<string, string>;

const EN: Dict = {
  'common.city': 'City',
  'common.dateOfBirth': 'Date of Birth',
  'common.timeOfBirth': 'Time of Birth',
  'common.birthDate': 'Birth Date',
  'common.birthTime': 'Birth Time',
  'common.loading': 'Loading...',
  'common.present': 'Present',
  'common.notPresent': 'Not present',
  'common.strong': 'Strong',
  'common.weak': 'Weak',
  'common.house': 'House {n}',
  'common.pada': 'pada {n}',
  'common.retrograde': 'Rx',
  'common.orb': 'orb',
  'common.ascendant': 'Asc',

  'kundli.title': 'Kundli',
  'kundli.subtitle': 'Vedic birth chart with planetary positions, dasha, doshas, and strength — via AstrologyAPI',

  'kundliFlow.title': 'Kundli Flow (AstrologyAPI)',
  'kundliFlow.subtitle': 'One continuous report — chart, all varga charts, dasha, doshas, strength, interpretation, remedies, and Lal Kitab',
  'kundliFlow.name': 'Name',
  'kundliFlow.namePlaceholder': 'Your name',
  'kundli.birthDetailsTitle': 'Birth Details',
  'kundli.birthDetailsDesc': 'Enter your date, time, and place of birth',
  'kundli.generate': 'Generate Kundli',
  'kundli.generating': 'Generating...',
  'kundli.errorFallback': 'Failed to generate kundli',
  'kundli.tab.chart': 'Rashi (D1)',
  'kundli.tab.planets': 'Planets',
  'kundli.tab.varga': 'Varga',
  'kundli.tab.dasha': 'Dasha',
  'kundli.tab.doshas': 'Doshas',
  'kundli.tab.strength': 'Strength',
  'kundli.tab.interpretation': 'Interpretation',
  'kundli.tab.remedies': 'Remedies',
  'kundli.tab.lalkitab': 'Lal Kitab',

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

  'matching.title': 'Kundli Matching',
  'matching.subtitle': 'Ashtakoot Gun Milan compatibility — via AstrologyAPI',
  'matching.person1': 'Person 1',
  'matching.person2': 'Person 2',
  'matching.enterBirthDetails': 'Enter birth details',
  'matching.check': 'Check Compatibility',
  'matching.calculating': 'Calculating...',
  'matching.errorFallback': 'Failed to calculate compatibility',
  'matching.defaultCity1': 'Mumbai, India',
  'matching.defaultCity2': 'Delhi, India',

  'dataError.title': 'Could not load data',
  'dataError.docsLink': 'Check the API docs',

  'apiKeyMissing.badge': 'Setup required',
  'apiKeyMissing.title': 'AstrologyAPI key not configured',
  'apiKeyMissing.desc': 'This page needs an AstrologyAPI access token to fetch data.',
  'apiKeyMissing.step1': 'Get your access token at',
  'apiKeyMissing.step2a': 'Add',
  'apiKeyMissing.step2b': 'to',
  'apiKeyMissing.step3': 'Restart the dev server',
  'apiKeyMissing.getToken': 'Get access token',

  'panchang.title': 'Panchang',
  'choghadiya.title': 'Choghadiya',
  'transits.title': 'Transits',
  'transits.subtitle': 'Monthly tropical transit-to-natal aspects, relative to noon on the 1st at the default city',

  'planetsTable.planet': 'Planet',
  'planetsTable.sign': 'Sign',
  'planetsTable.house': 'House',
  'planetsTable.nakshatra': 'Nakshatra',
  'planetsTable.degree': 'Degree',

  'dasha.title': 'Vimshottari Mahadasha',
  'dasha.subtitle': 'Major planetary periods across the lifetime',

  'kalsarpa.title': 'Kalsarpa Dosha',
  'kalsarpa.yog': '{name} Kaal Sarp Yog',
  'sadhesati.title': 'Sadhesati',
  'sadhesati.inProgress': 'In progress',
  'sadhesati.notInProgress': 'Not in progress',
  'sadhesati.moonSaturn': 'Moon in {moon}, Saturn in {saturn}',
  'sadhesati.retrogradeSuffix': ' (retrograde)',

  'ashtakavarga.title': 'Sarvashtakavarga',
  'ashtakavarga.subtitle': 'Total bindu strength points by sign (max 337 across the zodiac)',
  'shadbala.title': 'Shadbala',
  'shadbala.subtitle': 'Six-fold planetary strength vs. the minimum required',
  'shadbala.planet': 'Planet',
  'shadbala.strength': 'Strength (virupa)',
  'shadbala.minimum': 'Minimum required',
  'shadbala.percentOfMinimum': '% of minimum',
  'shadbala.verdict': 'Verdict',

  'ascendant.title': 'Ascendant Reading',
  'ascendant.lagna': 'Lagna: {sign}',
  'nakshatraReport.title': 'Nakshatra Reading',
  'nakshatraReport.subtitle': 'Birth-star interpretation by life area',
  'nakshatraReport.physical': 'Physical',
  'nakshatraReport.character': 'Character',
  'nakshatraReport.education': 'Education & Career',
  'nakshatraReport.family': 'Family',
  'nakshatraReport.health': 'Health',
  'pitraDosha.title': 'Pitra Dosha',
  'planetReport.title': 'Rashi & House Reading',
  'planetReport.subtitle': 'Sign and house placement interpretation, by planet',
  'planetReport.pick': 'Pick a planet to see its reading.',
  'planetReport.signPlacement': 'Sign placement',
  'planetReport.housePlacement': 'House placement',
  'planetReport.noReading': 'No reading available for this placement.',
  'planetReport.errorFallback': 'Failed to load planet reading',

  'lalkitab.debtsTitle': 'Lal Kitab Debts (Rin)',
  'lalkitab.debtsSubtitle': "Karmic debts indicated by the chart's planetary combinations",
  'lalkitab.noDebts': 'No Rin (karmic debt) combinations found.',
  'lalkitab.remediesTitle': 'Lal Kitab Remedies',
  'lalkitab.remediesSubtitle': 'House placement and remedies, by planet',
  'lalkitab.pick': 'Pick a planet to see its Lal Kitab remedies.',
  'lalkitab.placement': '{planet} in the {house} house: {desc}',
  'lalkitab.errorFallback': 'Failed to load Lal Kitab remedy',

  'gem.title': 'Gemstone Suggestions',
  'gem.life': 'Life stone',
  'gem.lifeDesc': 'Strengthens the chart’s primary ruling planet',
  'gem.benefic': 'Benefic stone',
  'gem.beneficDesc': 'Supports the most benefic planet in the chart',
  'gem.lucky': 'Lucky stone',
  'gem.luckyDesc': 'General luck and well-being',
  'gem.metal': 'Metal',
  'gem.finger': 'Finger',
  'gem.weight': 'Weight',
  'gem.day': 'Day',
  'gem.alternative': 'Alternative',
  'puja.title': 'Puja Suggestions',
  'puja.none': 'No puja recommendations for this chart.',
  'puja.priority': 'Priority {n}',
  'rudraksha.title': 'Rudraksha Suggestion',
  'sadhesatiRemedies.title': 'Sadhesati Remedies',

  'match.ashtakootScore': 'Ashtakoot Score',
  'match.goodMatch': 'Good match',
  'match.belowMinimum': 'Below recommended minimum',
  'match.kootaBreakdown': 'Koota Breakdown',
  'match.koota': 'Koota',
  'match.groom': 'Groom',
  'match.bride': 'Bride',
  'match.points': 'Points',
  'match.manglikGroom': 'Manglik – Groom',
  'match.manglikBride': 'Manglik – Bride',
  'match.overallConclusion': 'Overall Conclusion',
  'match.rajjuDosha': 'Rajju Dosha {status}',
  'match.vedhaDosha': 'Vedha Dosha {status}',
  'match.present': 'present',
  'match.absent': 'absent',
  'match.koot.varna': 'Varna',
  'match.koot.vashya': 'Vashya',
  'match.koot.tara': 'Tara',
  'match.koot.yoni': 'Yoni',
  'match.koot.maitri': 'Maitri',
  'match.koot.gan': 'Gan',
  'match.koot.bhakut': 'Bhakut',
  'match.koot.nadi': 'Nadi',

  'panchangView.tithi': 'Tithi',
  'panchangView.nakshatra': 'Nakshatra',
  'panchangView.yog': 'Yog',
  'panchangView.karan': 'Karan',
  'panchangView.paksha': 'Paksha',
  'panchangView.ritu': 'Ritu',
  'panchangView.sunSign': 'Sun sign',
  'panchangView.moonSign': 'Moon sign',
  'panchangView.ayana': 'Ayana',
  'panchangView.sunrise': 'Sunrise',
  'panchangView.sunset': 'Sunset',
  'panchangView.moonrise': 'Moonrise',
  'panchangView.muhurtaWindows': 'Muhurta Windows',
  'panchangView.muhurtaSubtitle': 'Auspicious and inauspicious periods for the day',
  'panchangView.abhijit': 'Abhijit',
  'panchangView.rahukaal': 'Rahukaal',
  'panchangView.gulikaal': 'Gulikaal',
  'panchangView.yamghantKaal': 'Yamghant Kaal',

  'choghadiya.dayTitle': 'Day Choghadiya',
  'choghadiya.daySubtitle': 'Sunrise to sunset',
  'choghadiya.nightTitle': 'Night Choghadiya',
  'choghadiya.nightSubtitle': 'Sunset to next sunrise',
  'choghadiya.auspicious': 'Auspicious',
  'choghadiya.avoid': 'Avoid',

  'transitsView.ascendant': 'Ascendant: {sign}',
  'transitsView.none': 'No transit aspects this month.',

  'kundli.tab.advanced': 'Advanced',

  'ghatChakra.title': 'Ghat Chakra',
  'ghatChakra.subtitle': 'Birth-moment anga snapshot: lunar month, tithi, weekday, nakshatra, yog, karan, pahar, and Moon sign',
  'ghatChakra.month': 'Month',
  'ghatChakra.tithi': 'Tithi',
  'ghatChakra.day': 'Day',
  'ghatChakra.nakshatra': 'Nakshatra',
  'ghatChakra.yog': 'Yog',
  'ghatChakra.karan': 'Karan',
  'ghatChakra.pahar': 'Pahar',
  'ghatChakra.moon': 'Moon sign',

  'currentDasha.title': 'Current Period (All Levels)',
  'currentDasha.subtitle': 'The active Vimshottari period at every depth, as of today',
  'currentDasha.level.maha': 'Mahadasha',
  'currentDasha.level.antar': 'Antardasha',
  'currentDasha.level.pratyantar': 'Pratyantardasha',
  'currentDasha.level.sookshma': 'Sookshma Dasha',
  'currentDasha.level.prana': 'Prana Dasha',

  'bhavabala.title': 'Bhavabala',
  'bhavabala.subtitle': 'Per-house strength, the Bhava counterpart to Shadbala',
  'bhavabala.house': 'House',
  'bhavabala.sign': 'Sign',
  'bhavabala.strength': 'Strength (virupa)',
  'bhavabala.percentOfBaseline': '% of baseline',
  'bhavabala.strongest': 'Strongest: House {n}',
  'bhavabala.weakest': 'Weakest: House {n}',

  'maitri.title': 'Panchadha Maitri',
  'maitri.subtitle': 'Five-fold planetary friendship: natural, temporary, and the combined verdict',
  'maitri.natural': 'Natural Friendship',
  'maitri.temporary': 'Temporary Friendship',
  'maitri.combined': 'Combined (Panchadha) Verdict',
  'maitri.towards': 'Toward →',

  'lalkitab.housesTitle': 'Lal Kitab Houses',
  'lalkitab.housesSubtitle': "Each khana's ruler, pakka ghar, kismat, and exaltation/debilitation",
  'lalkitab.maalik': 'Ruler (Maalik)',
  'lalkitab.pakkaGhar': 'Pakka Ghar',
  'lalkitab.kismat': 'Kismat',
  'lalkitab.exalted': 'Exalted',
  'lalkitab.debilitated': 'Debilitated',
  'lalkitab.none': 'None',
  'lalkitab.planetsTitle': 'Lal Kitab Planets',
  'lalkitab.planetsSubtitle': "Each graha's Lal Kitab sign placement, state, and nature",
  'lalkitab.rashi': 'Rashi',
  'lalkitab.position': 'Position',
  'lalkitab.nature': 'Nature',
  'lalkitab.state': 'State',
  'lalkitab.awake': 'Awake',
  'lalkitab.sleeping': 'Sleeping (Soya)',
  'lalkitab.natureMalefic': 'Malefic',
  'lalkitab.natureBenefic': 'Benefic',

  'charDasha.title': 'Char Dasha (Jaimini)',
  'charDasha.subtitle': 'Sign-based dasha system, an alternative to Vimshottari',
  'charDasha.currentTitle': 'Current Period',
  'charDasha.level.maha': 'Mahadasha',
  'charDasha.level.antar': 'Antardasha',
  'charDasha.level.pratyantar': 'Pratyantardasha',
  'charDasha.lifetimeTitle': 'Lifetime Sequence',

  'yoginiDasha.title': 'Yogini Dasha',
  'yoginiDasha.subtitle': 'An 8-planet, 36-year repeating dasha cycle keyed to the birth nakshatra',
  'yoginiDasha.currentTitle': 'Current Period',
  'yoginiDasha.level.maha': 'Mahadasha',
  'yoginiDasha.level.antar': 'Antardasha',
  'yoginiDasha.level.pratyantar': 'Pratyantardasha',
  'yoginiDasha.lifetimeTitle': 'Lifetime Cycle',

  'kp.title': 'KP System',
  'kp.subtitle': 'Krishnamurti Paddhati: sub-lorded planet positions and house cusps',
  'kp.planetsTitle': 'KP Planets',
  'kp.planet': 'Planet',
  'kp.sign': 'Sign',
  'kp.house': 'House',
  'kp.nakshatra': 'Nakshatra',
  'kp.subLord': 'Sub Lord',
  'kp.subSubLord': 'Sub-Sub Lord',
  'kp.cuspsTitle': 'House Cusps',
  'kp.cuspDegree': 'Cusp Degree',

  'kundli.tab.varshaphal': 'Varshaphal',
  'varshaphal.title': 'Varshaphal',
  'varshaphal.subtitle': 'The annual solar-return chart (Tajik system) for a chosen year',
  'varshaphal.yearLabel': 'Year',
  'varshaphal.generate': 'Generate',
  'varshaphal.generating': 'Generating...',
  'varshaphal.errorFallback': 'Failed to generate Varshaphal',
  'varshaphal.yearLord': 'Year Lord: {planet}',
  'varshaphal.date': 'Varshaphal moment: {date}',
  'varshaphal.munthaTitle': 'Muntha',
  'varshaphal.munthaDesc': 'Muntha sign for this year: {sign}',
  'varshaphal.muddaDashaTitle': 'Mudda Dasha',
  'varshaphal.muddaDashaSubtitle': "The annual chart's own proportional dasha sequence",
  'varshaphal.yogaTitle': 'Active Yogas',
  'varshaphal.yogaSubtitle': 'Yogas active for this Varshaphal year',
  'varshaphal.yogaNone': 'No Varshaphal yogas active this year.',
  'varshaphal.planetsTitle': 'Varshaphal Planets',

  'match.dashakootScore': 'Dashakoot Score',
  'match.dashakootBreakdown': 'Dashakoot Breakdown',
  'match.koot.dina': 'Dina',
  'match.koot.rashi': 'Rashi',
  'match.koot.rasyadhipati': 'Rasyadhipati',
  'match.koot.rajju': 'Rajju',
  'match.koot.vedha': 'Vedha',
  'match.koot.mahendra': 'Mahendra',
  'match.koot.streeDeergha': 'Stree Deergha',
  'match.percentageTitle': 'Compatibility Percentage',
  'match.percentage.ashtakoota': 'Ashtakoota',
  'match.percentage.manglik': 'Manglik',
  'match.percentage.rajju': 'Rajju',
  'match.percentage.vedha': 'Vedha',
  'match.percentage.overall': 'Overall',
  'match.goodOverall': 'Good overall match',
  'match.notGoodOverall': 'Not a recommended match',
};

const HI: Dict = {
  'common.city': 'शहर',
  'common.dateOfBirth': 'जन्म तिथि',
  'common.timeOfBirth': 'जन्म समय',
  'common.birthDate': 'जन्म तिथि',
  'common.birthTime': 'जन्म समय',
  'common.loading': 'लोड हो रहा है...',
  'common.present': 'मौजूद',
  'common.notPresent': 'अनुपस्थित',
  'common.strong': 'मज़बूत',
  'common.weak': 'कमज़ोर',
  'common.house': 'भवन {n}',
  'common.pada': 'पद {n}',
  'common.retrograde': 'वक्री',
  'common.orb': 'ऑर्ब',
  'common.ascendant': 'लग्न',

  'kundli.title': 'कुंडली',
  'kundli.subtitle': 'ग्रह स्थिति, दशा, दोष और बल के साथ वैदिक जन्म कुंडली — AstrologyAPI द्वारा',

  'kundliFlow.title': 'कुंडली फ़्लो (AstrologyAPI)',
  'kundliFlow.subtitle': 'एक सतत रिपोर्ट — कुंडली, सभी वर्ग चार्ट, दशा, दोष, बल, व्याख्या, उपाय और लाल किताब',
  'kundliFlow.name': 'नाम',
  'kundliFlow.namePlaceholder': 'आपका नाम',
  'kundli.birthDetailsTitle': 'जन्म विवरण',
  'kundli.birthDetailsDesc': 'अपनी जन्म तिथि, समय और स्थान दर्ज करें',
  'kundli.generate': 'कुंडली बनाएं',
  'kundli.generating': 'बन रही है...',
  'kundli.errorFallback': 'कुंडली बनाने में विफल',
  'kundli.tab.chart': 'राशि (D1)',
  'kundli.tab.planets': 'ग्रह',
  'kundli.tab.varga': 'वर्ग',
  'kundli.tab.dasha': 'दशा',
  'kundli.tab.doshas': 'दोष',
  'kundli.tab.strength': 'बल',
  'kundli.tab.interpretation': 'व्याख्या',
  'kundli.tab.remedies': 'उपाय',
  'kundli.tab.lalkitab': 'लाल किताब',

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

  'matching.title': 'कुंडली मिलान',
  'matching.subtitle': 'अष्टकूट गुण मिलान अनुकूलता — AstrologyAPI द्वारा',
  'matching.person1': 'व्यक्ति 1',
  'matching.person2': 'व्यक्ति 2',
  'matching.enterBirthDetails': 'जन्म विवरण दर्ज करें',
  'matching.check': 'अनुकूलता जांचें',
  'matching.calculating': 'गणना हो रही है...',
  'matching.errorFallback': 'अनुकूलता की गणना करने में विफल',
  'matching.defaultCity1': 'मुंबई, भारत',
  'matching.defaultCity2': 'दिल्ली, भारत',

  'dataError.title': 'डेटा लोड नहीं हो सका',
  'dataError.docsLink': 'एपीआई दस्तावेज़ देखें',

  'apiKeyMissing.badge': 'सेटअप आवश्यक',
  'apiKeyMissing.title': 'AstrologyAPI कुंजी कॉन्फ़िगर नहीं है',
  'apiKeyMissing.desc': 'इस पेज को डेटा प्राप्त करने के लिए एक AstrologyAPI एक्सेस टोकन चाहिए।',
  'apiKeyMissing.step1': 'अपना एक्सेस टोकन यहां प्राप्त करें:',
  'apiKeyMissing.step2a': 'जोड़ें',
  'apiKeyMissing.step2b': 'में',
  'apiKeyMissing.step3': 'डेव सर्वर को पुनरारंभ करें',
  'apiKeyMissing.getToken': 'एक्सेस टोकन प्राप्त करें',

  'panchang.title': 'पंचांग',
  'choghadiya.title': 'चौघड़िया',
  'transits.title': 'गोचर',
  'transits.subtitle': 'मासिक ट्रॉपिकल गोचर-से-नैटल पहलू, डिफ़ॉल्ट शहर में महीने की 1 तारीख के दोपहर के सापेक्ष',

  'planetsTable.planet': 'ग्रह',
  'planetsTable.sign': 'राशि',
  'planetsTable.house': 'भवन',
  'planetsTable.nakshatra': 'नक्षत्र',
  'planetsTable.degree': 'अंश',

  'dasha.title': 'विंशोत्तरी महादशा',
  'dasha.subtitle': 'जीवनभर के प्रमुख ग्रह काल',

  'kalsarpa.title': 'कालसर्प दोष',
  'kalsarpa.yog': '{name} काल सर्प योग',
  'sadhesati.title': 'साढ़ेसाती',
  'sadhesati.inProgress': 'चल रही है',
  'sadhesati.notInProgress': 'नहीं चल रही है',
  'sadhesati.moonSaturn': 'चंद्रमा {moon} में, शनि {saturn} में',
  'sadhesati.retrogradeSuffix': ' (वक्री)',

  'ashtakavarga.title': 'सर्वाष्टकवर्ग',
  'ashtakavarga.subtitle': 'राशि अनुसार कुल बिंदु शक्ति अंक (राशिचक्र में अधिकतम 337)',
  'shadbala.title': 'षड्बल',
  'shadbala.subtitle': 'न्यूनतम आवश्यकता की तुलना में छह-गुना ग्रह शक्ति',
  'shadbala.planet': 'ग्रह',
  'shadbala.strength': 'शक्ति (विरुपा)',
  'shadbala.minimum': 'न्यूनतम आवश्यक',
  'shadbala.percentOfMinimum': 'न्यूनतम का %',
  'shadbala.verdict': 'निर्णय',

  'ascendant.title': 'लग्न व्याख्या',
  'ascendant.lagna': 'लग्न: {sign}',
  'nakshatraReport.title': 'नक्षत्र व्याख्या',
  'nakshatraReport.subtitle': 'जीवन क्षेत्र अनुसार जन्म-नक्षत्र व्याख्या',
  'nakshatraReport.physical': 'शारीरिक',
  'nakshatraReport.character': 'चरित्र',
  'nakshatraReport.education': 'शिक्षा और करियर',
  'nakshatraReport.family': 'पारिवारिक',
  'nakshatraReport.health': 'स्वास्थ्य',
  'pitraDosha.title': 'पितृ दोष',
  'planetReport.title': 'राशि और भाव व्याख्या',
  'planetReport.subtitle': 'ग्रह अनुसार राशि और भाव स्थिति की व्याख्या',
  'planetReport.pick': 'व्याख्या देखने के लिए एक ग्रह चुनें।',
  'planetReport.signPlacement': 'राशि स्थिति',
  'planetReport.housePlacement': 'भाव स्थिति',
  'planetReport.noReading': 'इस स्थिति के लिए कोई व्याख्या उपलब्ध नहीं है।',
  'planetReport.errorFallback': 'ग्रह व्याख्या लोड करने में विफल',

  'lalkitab.debtsTitle': 'लाल किताब ऋण (रिण)',
  'lalkitab.debtsSubtitle': 'चार्ट के ग्रह संयोजनों से संकेतित कर्म ऋण',
  'lalkitab.noDebts': 'कोई ऋण (कर्म ऋण) संयोजन नहीं मिला।',
  'lalkitab.remediesTitle': 'लाल किताब उपाय',
  'lalkitab.remediesSubtitle': 'ग्रह अनुसार भाव स्थिति और उपाय',
  'lalkitab.pick': 'लाल किताब उपाय देखने के लिए एक ग्रह चुनें।',
  'lalkitab.placement': '{house} भाव में {planet}: {desc}',
  'lalkitab.errorFallback': 'लाल किताब उपाय लोड करने में विफल',

  'gem.title': 'रत्न सुझाव',
  'gem.life': 'जीवन रत्न',
  'gem.lifeDesc': 'चार्ट के प्रमुख शासक ग्रह को मज़बूत करता है',
  'gem.benefic': 'शुभ रत्न',
  'gem.beneficDesc': 'चार्ट के सबसे शुभ ग्रह का समर्थन करता है',
  'gem.lucky': 'भाग्य रत्न',
  'gem.luckyDesc': 'सामान्य भाग्य और कल्याण',
  'gem.metal': 'धातु',
  'gem.finger': 'उंगली',
  'gem.weight': 'वज़न',
  'gem.day': 'दिन',
  'gem.alternative': 'विकल्प',
  'puja.title': 'पूजा सुझाव',
  'puja.none': 'इस चार्ट के लिए कोई पूजा सिफारिश नहीं है।',
  'puja.priority': 'प्राथमिकता {n}',
  'rudraksha.title': 'रुद्राक्ष सुझाव',
  'sadhesatiRemedies.title': 'साढ़ेसाती उपाय',

  'match.ashtakootScore': 'अष्टकूट अंक',
  'match.goodMatch': 'अच्छा मिलान',
  'match.belowMinimum': 'अनुशंसित न्यूनतम से कम',
  'match.kootaBreakdown': 'कूट विवरण',
  'match.koota': 'कूट',
  'match.groom': 'वर',
  'match.bride': 'वधू',
  'match.points': 'अंक',
  'match.manglikGroom': 'मांगलिक – वर',
  'match.manglikBride': 'मांगलिक – वधू',
  'match.overallConclusion': 'समग्र निष्कर्ष',
  'match.rajjuDosha': 'रज्जु दोष {status}',
  'match.vedhaDosha': 'वेध दोष {status}',
  'match.present': 'मौजूद',
  'match.absent': 'अनुपस्थित',
  'match.koot.varna': 'वर्ण',
  'match.koot.vashya': 'वश्य',
  'match.koot.tara': 'तारा',
  'match.koot.yoni': 'योनि',
  'match.koot.maitri': 'मैत्री',
  'match.koot.gan': 'गण',
  'match.koot.bhakut': 'भकूट',
  'match.koot.nadi': 'नाड़ी',

  'panchangView.tithi': 'तिथि',
  'panchangView.nakshatra': 'नक्षत्र',
  'panchangView.yog': 'योग',
  'panchangView.karan': 'करण',
  'panchangView.paksha': 'पक्ष',
  'panchangView.ritu': 'ऋतु',
  'panchangView.sunSign': 'सूर्य राशि',
  'panchangView.moonSign': 'चंद्र राशि',
  'panchangView.ayana': 'अयन',
  'panchangView.sunrise': 'सूर्योदय',
  'panchangView.sunset': 'सूर्यास्त',
  'panchangView.moonrise': 'चंद्रोदय',
  'panchangView.muhurtaWindows': 'मुहूर्त काल',
  'panchangView.muhurtaSubtitle': 'दिन के शुभ और अशुभ काल',
  'panchangView.abhijit': 'अभिजित',
  'panchangView.rahukaal': 'राहुकाल',
  'panchangView.gulikaal': 'गुलिककाल',
  'panchangView.yamghantKaal': 'यमघंट काल',

  'choghadiya.dayTitle': 'दिन चौघड़िया',
  'choghadiya.daySubtitle': 'सूर्योदय से सूर्यास्त तक',
  'choghadiya.nightTitle': 'रात्रि चौघड़िया',
  'choghadiya.nightSubtitle': 'सूर्यास्त से अगले सूर्योदय तक',
  'choghadiya.auspicious': 'शुभ',
  'choghadiya.avoid': 'अशुभ',

  'transitsView.ascendant': 'लग्न: {sign}',
  'transitsView.none': 'इस महीने कोई गोचर पहलू नहीं है।',

  'kundli.tab.advanced': 'उन्नत',

  'ghatChakra.title': 'घट चक्र',
  'ghatChakra.subtitle': 'जन्म-क्षण की झलक: चंद्र मास, तिथि, वार, नक्षत्र, योग, करण, पहर और चंद्र राशि',
  'ghatChakra.month': 'मास',
  'ghatChakra.tithi': 'तिथि',
  'ghatChakra.day': 'दिन',
  'ghatChakra.nakshatra': 'नक्षत्र',
  'ghatChakra.yog': 'योग',
  'ghatChakra.karan': 'करण',
  'ghatChakra.pahar': 'पहर',
  'ghatChakra.moon': 'चंद्र राशि',

  'currentDasha.title': 'वर्तमान काल (सभी स्तर)',
  'currentDasha.subtitle': 'आज तक हर स्तर पर सक्रिय विंशोत्तरी काल',
  'currentDasha.level.maha': 'महादशा',
  'currentDasha.level.antar': 'अंतर्दशा',
  'currentDasha.level.pratyantar': 'प्रत्यंतर्दशा',
  'currentDasha.level.sookshma': 'सूक्ष्म दशा',
  'currentDasha.level.prana': 'प्राण दशा',

  'bhavabala.title': 'भावबल',
  'bhavabala.subtitle': 'भाव अनुसार शक्ति — षड्बल का भाव-केंद्रित समकक्ष',
  'bhavabala.house': 'भवन',
  'bhavabala.sign': 'राशि',
  'bhavabala.strength': 'शक्ति (विरुपा)',
  'bhavabala.percentOfBaseline': '% आधार रेखा का',
  'bhavabala.strongest': 'सबसे मज़बूत: भवन {n}',
  'bhavabala.weakest': 'सबसे कमज़ोर: भवन {n}',

  'maitri.title': 'पंचधा मैत्री',
  'maitri.subtitle': 'पंचगुणित ग्रह मैत्री: नैसर्गिक, तात्कालिक, और संयुक्त निर्णय',
  'maitri.natural': 'नैसर्गिक मैत्री',
  'maitri.temporary': 'तात्कालिक मैत्री',
  'maitri.combined': 'संयुक्त (पंचधा) निर्णय',
  'maitri.towards': 'की ओर →',

  'lalkitab.housesTitle': 'लाल किताब भवन',
  'lalkitab.housesSubtitle': 'प्रत्येक खाने का मालिक, पक्का घर, किस्मत और उच्च/नीच स्थिति',
  'lalkitab.maalik': 'मालिक',
  'lalkitab.pakkaGhar': 'पक्का घर',
  'lalkitab.kismat': 'किस्मत',
  'lalkitab.exalted': 'उच्च',
  'lalkitab.debilitated': 'नीच',
  'lalkitab.none': 'कोई नहीं',
  'lalkitab.planetsTitle': 'लाल किताब ग्रह',
  'lalkitab.planetsSubtitle': 'प्रत्येक ग्रह की लाल किताब राशि स्थिति, अवस्था और प्रकृति',
  'lalkitab.rashi': 'राशि',
  'lalkitab.position': 'स्थिति',
  'lalkitab.nature': 'प्रकृति',
  'lalkitab.state': 'अवस्था',
  'lalkitab.awake': 'जागृत',
  'lalkitab.sleeping': 'सोया हुआ',
  'lalkitab.natureMalefic': 'पाप ग्रह',
  'lalkitab.natureBenefic': 'शुभ ग्रह',

  'charDasha.title': 'चर दशा (जैमिनी)',
  'charDasha.subtitle': 'राशि-आधारित दशा प्रणाली, विंशोत्तरी का एक विकल्प',
  'charDasha.currentTitle': 'वर्तमान काल',
  'charDasha.level.maha': 'महादशा',
  'charDasha.level.antar': 'अंतर्दशा',
  'charDasha.level.pratyantar': 'प्रत्यंतर्दशा',
  'charDasha.lifetimeTitle': 'जीवनभर का क्रम',

  'yoginiDasha.title': 'योगिनी दशा',
  'yoginiDasha.subtitle': 'जन्म नक्षत्र पर आधारित 8-ग्रह, 36-वर्षीय पुनरावर्ती दशा चक्र',
  'yoginiDasha.currentTitle': 'वर्तमान काल',
  'yoginiDasha.level.maha': 'महादशा',
  'yoginiDasha.level.antar': 'अंतर्दशा',
  'yoginiDasha.level.pratyantar': 'प्रत्यंतर्दशा',
  'yoginiDasha.lifetimeTitle': 'जीवनभर का चक्र',

  'kp.title': 'केपी प्रणाली',
  'kp.subtitle': 'कृष्णमूर्ति पद्धति: उप-स्वामी सहित ग्रह स्थिति और भाव कस्प',
  'kp.planetsTitle': 'केपी ग्रह',
  'kp.planet': 'ग्रह',
  'kp.sign': 'राशि',
  'kp.house': 'भवन',
  'kp.nakshatra': 'नक्षत्र',
  'kp.subLord': 'उप-स्वामी',
  'kp.subSubLord': 'उप-उप-स्वामी',
  'kp.cuspsTitle': 'भाव कस्प',
  'kp.cuspDegree': 'कस्प अंश',

  'kundli.tab.varshaphal': 'वर्षफल',
  'varshaphal.title': 'वर्षफल',
  'varshaphal.subtitle': 'चुने गए वर्ष के लिए वार्षिक सौर-प्रत्यागमन चार्ट (ताजिक प्रणाली)',
  'varshaphal.yearLabel': 'वर्ष',
  'varshaphal.generate': 'बनाएं',
  'varshaphal.generating': 'बन रहा है...',
  'varshaphal.errorFallback': 'वर्षफल बनाने में विफल',
  'varshaphal.yearLord': 'वर्षेश: {planet}',
  'varshaphal.date': 'वर्षफल क्षण: {date}',
  'varshaphal.munthaTitle': 'मुंथा',
  'varshaphal.munthaDesc': 'इस वर्ष की मुंथा राशि: {sign}',
  'varshaphal.muddaDashaTitle': 'मुद्दा दशा',
  'varshaphal.muddaDashaSubtitle': 'वार्षिक चार्ट का अपना आनुपातिक दशा क्रम',
  'varshaphal.yogaTitle': 'सक्रिय योग',
  'varshaphal.yogaSubtitle': 'इस वर्षफल वर्ष के लिए सक्रिय योग',
  'varshaphal.yogaNone': 'इस वर्ष कोई वर्षफल योग सक्रिय नहीं है।',
  'varshaphal.planetsTitle': 'वर्षफल ग्रह',

  'match.dashakootScore': 'दशकूट अंक',
  'match.dashakootBreakdown': 'दशकूट विवरण',
  'match.koot.dina': 'दिन',
  'match.koot.rashi': 'राशि',
  'match.koot.rasyadhipati': 'राश्यधिपति',
  'match.koot.rajju': 'रज्जु',
  'match.koot.vedha': 'वेध',
  'match.koot.mahendra': 'महेंद्र',
  'match.koot.streeDeergha': 'स्त्री दीर्घ',
  'match.percentageTitle': 'अनुकूलता प्रतिशत',
  'match.percentage.ashtakoota': 'अष्टकूट',
  'match.percentage.manglik': 'मांगलिक',
  'match.percentage.rajju': 'रज्जु',
  'match.percentage.vedha': 'वेध',
  'match.percentage.overall': 'समग्र',
  'match.goodOverall': 'समग्र रूप से अच्छा मिलान',
  'match.notGoodOverall': 'अनुशंसित मिलान नहीं',
};

const DICTS: Record<'en' | 'hi', Dict> = { en: EN, hi: HI };

/** Narrows the site's 8-language cookie value to what this dictionary actually has: English or Hindi, defaulting to English. */
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

/** The nine grahas plus Ascendant and the three outer Western planets AstrologyAPI's tropical endpoints return. */
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
  Ascendant: 'लग्न',
  Uranus: 'यूरेनस',
  Neptune: 'नेप्च्यून',
  Pluto: 'प्लूटो',
};

/** Translates a vendor planet name (as returned verbatim by AstrologyAPI, e.g. `"Saturn"`) for display. */
export function translatePlanetName(lang: Lang, name: string): string {
  if (dictLang(lang) !== 'hi') return name;
  return PLANET_NAMES_HI[name] ?? name;
}

const PLANET_ABBR_EN: Dict = {
  Sun: 'Su', Moon: 'Mo', Mars: 'Ma', Mercury: 'Me', Jupiter: 'Ju',
  Venus: 'Ve', Saturn: 'Sa', Rahu: 'Ra', Ketu: 'Ke', Ascendant: 'As',
};

const PLANET_ABBR_HI: Dict = {
  Sun: 'सू', Moon: 'चं', Mars: 'मं', Mercury: 'बु', Jupiter: 'गु',
  Venus: 'शु', Saturn: 'श', Rahu: 'रा', Ketu: 'के', Ascendant: 'ला',
};

/** Short (1-2 character) planet label for tight chart-diagram cells, e.g. `"Su"` / `"सू"`. */
export function translatePlanetAbbr(lang: Lang, name: string): string {
  const dict = dictLang(lang) === 'hi' ? PLANET_ABBR_HI : PLANET_ABBR_EN;
  const titleCase = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  return dict[titleCase] ?? titleCase.slice(0, 2);
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

const WEEKDAY_NAMES_HI: Dict = {
  Sunday: 'रविवार',
  Monday: 'सोमवार',
  Tuesday: 'मंगलवार',
  Wednesday: 'बुधवार',
  Thursday: 'गुरुवार',
  Friday: 'शुक्रवार',
  Saturday: 'शनिवार',
};

/** Translates a vendor weekday name (e.g. `advanced_panchang`'s `day` field, `"Tuesday"`). */
export function translateWeekday(lang: Lang, name: string): string {
  if (dictLang(lang) !== 'hi') return name;
  return WEEKDAY_NAMES_HI[name] ?? name;
}

const ORDINAL_HOUSE_NAMES_HI: Dict = {
  First: 'पहले',
  Second: 'दूसरे',
  Third: 'तीसरे',
  Fourth: 'चौथे',
  Fifth: 'पांचवें',
  Sixth: 'छठे',
  Seventh: 'सातवें',
  Eighth: 'आठवें',
  Ninth: 'नौवें',
  Tenth: 'दसवें',
  Eleventh: 'ग्यारहवें',
  Twelfth: 'बारहवें',
};

/** Translates `lalkitab_remedies`' ordinal house name (e.g. `"Third"`). */
export function translateOrdinalHouse(lang: Lang, name: string): string {
  if (dictLang(lang) !== 'hi') return name;
  return ORDINAL_HOUSE_NAMES_HI[name] ?? name;
}

const MUHURTA_NAMES_HI: Dict = {
  Rog: 'रोग',
  Udveg: 'उद्वेग',
  Char: 'चर',
  Labh: 'लाभ',
  Amrit: 'अमृत',
  Kaal: 'काल',
  Shubh: 'शुभ',
};

/** Translates a `chaughadiya_muhurta` period name (e.g. `"Amrit"`). */
export function translateMuhurta(lang: Lang, name: string): string {
  if (dictLang(lang) !== 'hi') return name;
  return MUHURTA_NAMES_HI[name] ?? name;
}

const FRIENDSHIP_LEVEL_HI: Dict = {
  '--': '--',
  Friend: 'मित्र',
  Enemy: 'शत्रु',
  Neutral: 'सम',
  Intimate: 'घनिष्ठ',
  Bitter: 'शत्रुवत्',
};

/** Translates a `panchadha_maitri` cell value (e.g. `"Friend"`, `"Intimate"`, or the self-pair `"--"`). */
export function translateFriendshipLevel(lang: Lang, level: string): string {
  if (dictLang(lang) !== 'hi') return level;
  return FRIENDSHIP_LEVEL_HI[level] ?? level;
}

const YOGINI_DASHA_NAMES_HI: Dict = {
  Mangla: 'मंगला',
  Pingla: 'पिंगला',
  Dhanya: 'धन्या',
  Bhramari: 'भ्रामरी',
  Bhadrika: 'भद्रिका',
  Ulka: 'उल्का',
  Siddha: 'सिद्धा',
  Sankata: 'संकटा',
};

/** Translates a `yogini_dasha` period name (e.g. `"Siddha"`), one of the fixed 8-name cycle. */
export function translateYoginiDashaName(lang: Lang, name: string): string {
  if (dictLang(lang) !== 'hi') return name;
  return YOGINI_DASHA_NAMES_HI[name] ?? name;
}

const DURATION_UNIT_HI: Array<[RegExp, string]> = [
  [/\bYears?\b/g, 'वर्ष'],
  [/\bMonths?\b/g, 'महीने'],
  [/\bDays?\b/g, 'दिन'],
];

/** Translates the unit words in a vendor duration string (e.g. `"8 Years"`, `"9 Months"`), digits unchanged. */
export function translateDuration(lang: Lang, duration: string): string {
  if (dictLang(lang) !== 'hi') return duration;
  return DURATION_UNIT_HI.reduce((s, [re, hi]) => s.replace(re, hi), duration);
}

/**
 * The 27 nakshatras, keyed by a normalized (lowercased, space-stripped) form of every spelling variant seen
 * across AstrologyAPI endpoints — the vendor is inconsistent even within its own responses (e.g. `"Purva
 * Shadha"` vs. `"Uttra Shadha"` for the two halves of Ashadha, `"Hast"` vs. `"Hasta"`, `"Shatbhisha"` vs. the
 * canonical `"Shatabhisha"`).
 */
const NAKSHATRA_NAMES_HI: Dict = {
  ashwini: 'अश्विनी',
  bharani: 'भरणी',
  krittika: 'कृत्तिका',
  kritika: 'कृत्तिका',
  rohini: 'रोहिणी',
  mrigasira: 'मृगशिरा',
  mrigashira: 'मृगशिरा',
  mrigshira: 'मृगशिरा',
  mriga: 'मृगशिरा',
  ardra: 'आर्द्रा',
  ardhra: 'आर्द्रा',
  punarvasu: 'पुनर्वसु',
  pushya: 'पुष्य',
  pushyami: 'पुष्य',
  ashlesha: 'आश्लेषा',
  aslesha: 'आश्लेषा',
  magha: 'मघा',
  purvaphalguni: 'पूर्वा फाल्गुनी',
  pphalguni: 'पूर्वा फाल्गुनी',
  uttaraphalguni: 'उत्तरा फाल्गुनी',
  uttraphalguni: 'उत्तरा फाल्गुनी',
  uphalguni: 'उत्तरा फाल्गुनी',
  hasta: 'हस्त',
  hast: 'हस्त',
  chitra: 'चित्रा',
  chitta: 'चित्रा',
  swati: 'स्वाति',
  swathi: 'स्वाति',
  vishakha: 'विशाखा',
  visakha: 'विशाखा',
  anuradha: 'अनुराधा',
  jyeshtha: 'ज्येष्ठा',
  jyeshta: 'ज्येष्ठा',
  mula: 'मूल',
  moola: 'मूल',
  mool: 'मूल',
  purvaashadha: 'पूर्वाषाढ़ा',
  purvashadha: 'पूर्वाषाढ़ा',
  pashadha: 'पूर्वाषाढ़ा',
  uttaraashadha: 'उत्तराषाढ़ा',
  uttrashadha: 'उत्तराषाढ़ा',
  uashadha: 'उत्तराषाढ़ा',
  shravana: 'श्रवण',
  shravan: 'श्रवण',
  dhanishta: 'धनिष्ठा',
  dhanishtha: 'धनिष्ठा',
  shatabhisha: 'शतभिषा',
  shatbhisha: 'शतभिषा',
  satabhisha: 'शतभिषा',
  purvabhadrapada: 'पूर्वा भाद्रपद',
  purvabhadrapad: 'पूर्वा भाद्रपद',
  uttarabhadrapada: 'उत्तरा भाद्रपद',
  uttarabhadrapad: 'उत्तरा भाद्रपद',
  uttrabhadrapad: 'उत्तरा भाद्रपद',
  revati: 'रेवती',
};

/** Normalizes a nakshatra name for lookup: lowercase, strip spaces (`"Purva Phalguni"` → `"purvaphalguni"`). */
function normalizeNakshatraKey(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '');
}

/** Translates a vendor nakshatra name, tolerant of the vendor's inconsistent spelling across endpoints. */
export function translateNakshatra(lang: Lang, name: string): string {
  if (dictLang(lang) !== 'hi') return name;
  return NAKSHATRA_NAMES_HI[normalizeNakshatraKey(name)] ?? name;
}

const LALKITAB_POSITION_HI: Dict = {
  'Own Sign': 'स्व राशि',
  'Friend Sign': 'मित्र राशि',
  'Neutral Sign': 'सम राशि',
  'Enemy Sign': 'शत्रु राशि',
  Exalted: 'उच्च',
  Debilitated: 'नीच',
  '-': '-',
};

/** Translates a `lalkitab_planets` `position` value (e.g. `"Own Sign"`, `"Exalted"`). */
export function translateLalkitabPosition(lang: Lang, position: string): string {
  if (dictLang(lang) !== 'hi') return position;
  return LALKITAB_POSITION_HI[position] ?? position;
}

/** The nine gemstones AstrologyAPI's `basic_gem_suggestion` recommends, as both primary `name` and `semi_gem` alternative. */
const GEM_NAMES_HI: Dict = {
  Ruby: 'माणिक्य',
  Pearl: 'मोती',
  'Red Coral': 'मूंगा',
  Coral: 'मूंगा',
  Emerald: 'पन्ना',
  'Yellow Sapphire': 'पुखराज',
  Diamond: 'हीरा',
  'Blue Sapphire': 'नीलम',
  Hessonite: 'गोमेद',
  "Cat's Eye": 'लहसुनिया',
  Onyx: 'ओनिक्स',
  Amethyst: 'एमेथिस्ट',
  'White Sapphire': 'सफेद पुखराज',
  'Opal': 'ओपल',
};

/** Translates a gemstone name from `basic_gem_suggestion` (`name` or `semi_gem`). */
export function translateGemName(lang: Lang, name: string): string {
  if (dictLang(lang) !== 'hi') return name;
  return GEM_NAMES_HI[name] ?? name;
}

const METAL_NAMES_HI: Dict = {
  Gold: 'सोना',
  Silver: 'चांदी',
  Copper: 'तांबा',
  Panchdhatu: 'पंचधातु',
  Platinum: 'प्लेटिनम',
};

/** Translates a `basic_gem_suggestion` `wear_metal` value (e.g. `"Gold"`, `"Silver"`). */
export function translateMetal(lang: Lang, metal: string): string {
  if (dictLang(lang) !== 'hi') return metal;
  return METAL_NAMES_HI[metal] ?? metal;
}

const FINGER_NAMES_HI: Dict = {
  Thumb: 'अंगूठा',
  Index: 'तर्जनी',
  Middle: 'मध्यमा',
  Ring: 'अनामिका',
  Little: 'कनिष्ठा',
  'Little Finger': 'कनिष्ठा',
};

/** Translates a `basic_gem_suggestion` `wear_finger` value (e.g. `"Little"`, `"Ring"`). */
export function translateFinger(lang: Lang, finger: string): string {
  if (dictLang(lang) !== 'hi') return finger;
  return FINGER_NAMES_HI[finger] ?? finger;
}

/** The 12 Kaal Sarp Yog names, one per house Rahu occupies from Lagna, from `kalsarpa_details`' `name` field. */
const KALSARPA_NAMES_HI: Dict = {
  'Anant Kaal Sarp Yog': 'अनंत काल सर्प योग',
  'Kulik Kaal Sarp Yog': 'कुलिक काल सर्प योग',
  'Vasuki Kaal Sarp Yog': 'वासुकी काल सर्प योग',
  'Shankhpal Kaal Sarp Yog': 'शंखपाल काल सर्प योग',
  'Padma Kaal Sarp Yog': 'पद्म काल सर्प योग',
  'Mahapadma Kaal Sarp Yog': 'महापद्म काल सर्प योग',
  'Takshak Kaal Sarp Yog': 'तक्षक काल सर्प योग',
  'Karkotak Kaal Sarp Yog': 'कर्कोटक काल सर्प योग',
  'Shankhchur Kaal Sarp Yog': 'शंखचूड़ काल सर्प योग',
  'Ghatak Kaal Sarp Yog': 'घातक काल सर्प योग',
  'Vishdhar Kaal Sarp Yog': 'विषधर काल सर्प योग',
  'Sheshnag Kaal Sarp Yog': 'शेषनाग काल सर्प योग',
};

/** Translates a `kalsarpa_details` `name` value (e.g. `"Mahapadma Kaal Sarp Yog"`), one of the fixed 12. */
export function translateKalsarpaName(lang: Lang, name: string): string {
  if (dictLang(lang) !== 'hi') return name;
  return KALSARPA_NAMES_HI[name] ?? name;
}

const KALSARPA_TYPE_WORDS_HI: Array<[RegExp, string]> = [
  [/\bFull\b/gi, 'पूर्ण'],
  [/\bPartial\b/gi, 'आंशिक'],
  [/\bAscending\b/gi, 'आरोही'],
  [/\bDescending\b/gi, 'अवरोही'],
];

/** Translates a `kalsarpa_details` `type` value (e.g. `"Partial Descending"`) word-by-word. */
export function translateKalsarpaType(lang: Lang, type: string): string {
  if (dictLang(lang) !== 'hi') return type;
  return KALSARPA_TYPE_WORDS_HI.reduce((s, [re, hi]) => s.replace(re, hi), type);
}
