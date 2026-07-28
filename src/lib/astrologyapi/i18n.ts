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
