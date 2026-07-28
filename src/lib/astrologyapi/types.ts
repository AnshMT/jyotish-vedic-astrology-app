/**
 * Response shapes for the AstrologyAPI endpoints this app calls, captured from live responses
 * (there are no schemas or example responses in the vendor's Postman collections). Fields the UI
 * doesn't use are omitted rather than guessed.
 */

/** One entry from `POST /planets`. Includes the nine grahas plus a synthetic `Ascendant` row. */
export interface AstrologyApiPlanet {
  id: number;
  name: string;
  fullDegree: number;
  normDegree: number;
  speed: number;
  /** The vendor returns this as the string `"true"`/`"false"` for real planets but a boolean for `Ascendant`. */
  isRetro: string | boolean;
  sign: string;
  signLord: string;
  nakshatra: string;
  nakshatraLord: string;
  nakshatra_pad: number;
  house: number;
  is_planet_set: boolean;
  planet_awastha: string;
}

/** One house from `POST /horo_chart/:chartId`. Array index 0 is house 1 (the ascendant's sign). */
export interface AstrologyApiChartHouse {
  sign: number;
  sign_name: string;
  planet: string[];
  planet_small: string[];
}

/** One period from `POST /major_vdasha`. `start`/`end` are `"D-M-YYYY  H:MM"` strings. */
export interface AstrologyApiDashaPeriod {
  planet: string;
  planet_id: number;
  start: string;
  end: string;
}

export interface AstrologyApiKalsarpaDosha {
  present: boolean;
  type: string;
  one_line: string;
  name: string;
  report: { house_id: number; report: string };
}

export interface AstrologyApiSadhesati {
  consideration_date: string;
  is_saturn_retrograde: boolean;
  moon_sign: string;
  saturn_sign: string;
  is_undergoing_sadhesati: string;
  sadhesati_status: boolean;
  what_is_sadhesati: string;
}

/** `POST /sarvashtak`: Sarvashtakavarga points, 8 grahas + ascendant, for all 12 signs. */
export interface AstrologyApiSarvashtak {
  ashtak_varga: { type: string; sign: string; sign_id: number };
  ashtak_points: Record<
    string,
    {
      sun: number;
      moon: number;
      mars: number;
      mercury: number;
      jupiter: number;
      venus: number;
      saturn: number;
      ascendant: number;
      total: number;
    }
  >;
}

/** One graha from `POST /shadbala`. Nested `components` breakdown is fetched but not rendered. */
export interface AstrologyApiShadbala {
  id: string;
  name: string;
  is_strong: boolean;
  required_minimum_virupa: number;
  strength_percent_of_minimum: number;
  total_shadbala_rupa: number;
  total_shadbala_virupa: number;
}

/** `POST /basic_panchang`. Plain-string tithi/nakshatra/yog/karan, no end times. */
export interface AstrologyApiBasicPanchang {
  day: string;
  tithi: string;
  nakshatra: string;
  yog: string;
  karan: string;
  sunrise: string;
  sunset: string;
  vedic_sunrise: string;
  vedic_sunset: string;
}

interface PanchangAngaEndTime {
  hour: number;
  minute: number;
  second: number;
}

/** `POST /advanced_panchang`. Each anga (tithi/nakshatra/yog/karan) carries details plus the time it ends. */
export interface AstrologyApiAdvancedPanchang {
  day: string;
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  tithi: { details: { tithi_name: string; special: string; summary: string; deity: string }; end_time: PanchangAngaEndTime };
  nakshatra: { details: { nak_name: string; ruler: string; deity: string; special: string; summary: string }; end_time: PanchangAngaEndTime };
  yog: { details: { yog_name: string; special: string; meaning: string }; end_time: PanchangAngaEndTime };
  karan: { details: { karan_name: string; special: string; deity: string }; end_time: PanchangAngaEndTime };
  paksha: string;
  ritu: string;
  sun_sign: string;
  moon_sign: string;
  ayana: string;
  vikram_samvat: number;
  shaka_samvat: number;
  disha_shool: string;
  abhijit_muhurta: { start: string; end: string };
  rahukaal: { start: string; end: string };
  guliKaal: { start: string; end: string };
  yamghant_kaal: { start: string; end: string };
}

interface ChaughadiyaPeriod {
  time: string;
  muhurta: string;
}

/** `POST /chaughadiya_muhurta`: 8 day periods (sunrise-to-sunset) and 8 night periods (sunset-to-next-sunrise). */
export interface AstrologyApiChaughadiya {
  chaughadiya: { day: ChaughadiyaPeriod[]; night: ChaughadiyaPeriod[] };
}

export interface AstrologyApiMatchMakingReport {
  ashtakoota: { status: boolean; received_points: number };
  manglik: { status: boolean; male_percentage: number; female_percentage: number };
  rajju_dosha: { status: boolean };
  vedha_dosha: { status: boolean };
  conclusion: { match_report: string };
}

interface AshtakootKoot {
  description: string;
  male_koot_attribute: string;
  female_koot_attribute: string;
  total_points: number;
  received_points: number;
}

/** `POST /match_ashtakoot_points`: the 8-koota Gun Milan breakdown (36 points total). */
export interface AstrologyApiMatchAshtakoot {
  varna: AshtakootKoot;
  vashya: AshtakootKoot;
  tara: AshtakootKoot;
  yoni: AshtakootKoot;
  maitri: AshtakootKoot;
  gan: AshtakootKoot;
  bhakut: AshtakootKoot;
  nadi: AshtakootKoot;
  total: { total_points: number; received_points: number; minimum_required: number };
  conclusion: { status: boolean; report: string };
}

interface ManglikSide {
  manglik_status: string;
  percentage_manglik_present: number;
  percentage_manglik_after_cancellation: number;
  manglik_report: string;
  is_present: boolean;
}

export interface AstrologyApiMatchManglik {
  male: ManglikSide;
  female: ManglikSide;
  conclusion: { report: string };
}

interface TransitRelation {
  transit_planet: string;
  natal_planet: string;
  type: string;
  orb: number;
  date: string;
}

/** `POST /tropical_transits/monthly`. Western tropical transits-to-natal aspects for the whole month. */
export interface AstrologyApiTropicalTransitsMonthly {
  month_start_date: string;
  month_end_date: string;
  ascendant: string;
  transit_relation: TransitRelation[];
  retrogrades: Array<{ planet: string; start: string; end: string }>;
  moon_phase: Array<{ date: string; phase: string }>;
}

/** `POST /general_ascendant_report`: a prose reading of the Lagna. */
export interface AstrologyApiAscendantReport {
  asc_report: { ascendant: string; report: string };
}

/** `POST /general_nakshatra_report`: prose readings of the birth star, grouped by life area. Each value is one or more paragraphs. */
export interface AstrologyApiNakshatraReport {
  physical: string[];
  character: string[];
  education: string[];
  family: string[];
  health: string[];
}

/** `POST /general_rashi_report/:planet_name`: a prose reading of that planet's sign placement. Absent for Rahu/Ketu, which have no owned sign. */
export interface AstrologyApiRashiReport {
  planet: string;
  rashi_report?: string;
}

/** `POST /general_house_report/:planet_name`: a prose reading of that planet's house placement. */
export interface AstrologyApiHouseReport {
  planet: string;
  house_report: string;
}

export interface AstrologyApiPitraDosha {
  what_is_pitri_dosha: string;
  is_pitri_dosha_present: boolean;
  rules_matched: string[];
  conclusion: string;
  remedies: string[];
}

interface GemRecommendation {
  name: string;
  gem_key: string;
  semi_gem: string;
  wear_finger: string;
  weight_caret: string;
  wear_metal: string;
  wear_day: string;
  gem_deity: string;
}

/** `POST /basic_gem_suggestion`: recommended gemstones for life strength, benefic support, and general luck. */
export interface AstrologyApiGemSuggestion {
  LIFE: GemRecommendation;
  BENEFIC: GemRecommendation;
  LUCKY: GemRecommendation;
}

interface PujaSuggestionItem {
  status: boolean;
  priority: number;
  title: string;
  puja_id: string;
  summary: string;
  one_line: string;
}

/** `POST /puja_suggestion`: recommended pujas based on doshas and planetary combinations present in the chart. */
export interface AstrologyApiPujaSuggestion {
  summary: string;
  suggestions: PujaSuggestionItem[];
}

/** `POST /rudraksha_suggestion`: the one recommended rudraksha mukhi for the chart. */
export interface AstrologyApiRudrakshaSuggestion {
  img_url: string;
  rudraksha_key: string;
  name: string;
  recommend: string;
  detail: string;
}

/** `POST /sadhesati_remedies`: general remedies for Sadhe Sati, independent of whether it's currently active. */
export interface AstrologyApiSadhesatiRemedies {
  what_is_sadhesati: string;
  remedies: string[];
}

/** `POST /lalkitab_debts`: the Lal Kitab "Rin" (karmic debt) readings that apply to the chart. */
export interface AstrologyApiLalkitabDebt {
  debt_name: string;
  indications: string;
  events: string;
}

/** `POST /lalkitab_remedies/:planet_name`: that planet's Lal Kitab house placement and remedies. */
export interface AstrologyApiLalkitabRemedy {
  planet: string;
  house: string;
  lal_kitab_desc: string;
  lal_kitab_remedies: string[];
}
