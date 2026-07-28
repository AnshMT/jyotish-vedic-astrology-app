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

/** `POST /lalkitab_houses`: one khana's ruling planets and exaltation/debilitation, all 12 houses. */
export interface AstrologyApiLalkitabHouse {
  khana_number: number;
  maalik: string;
  pakka_ghar: string;
  kismat: string;
  soya: boolean;
  exalt: string[] | '-';
  debilitated: string[] | '-';
}

/** `POST /lalkitab_planets`: each graha's Lal Kitab sign placement, "sleeping" state, and benefic/malefic nature. */
export interface AstrologyApiLalkitabPlanet {
  planet: string;
  rashi: string;
  soya: boolean;
  position: string;
  nature: string;
}

/**
 * `POST /ghat_chakra`: despite its name this is a birth-moment anga snapshot (lunar month, tithi(s), weekday,
 * nakshatra, yog, karan, which of the day's 8 pahars, and the Moon's sign id) used for Muhurta-style
 * auspicious-timing checks — it is NOT the classical Avkahada Chakra table (Varna/Vashya/Yoni/Gana/Nadi/Paya),
 * which AstrologyAPI has no dedicated endpoint for.
 */
export interface AstrologyApiGhatChakra {
  month: string;
  tithi: string;
  day: string;
  nakshatra: string;
  yog: string;
  karan: string;
  pahar: string;
  moon: string;
}

/**
 * `POST /current_vdasha_all`: the active Vimshottari period at every depth in one call. `major` is the full
 * lifetime Mahadasha list (same as `major_vdasha`); each deeper level's `dasha_period` is the sub-period
 * breakdown of whichever parent period is active right now, and `planet` names that active parent chain.
 */
export interface AstrologyApiCurrentVdashaAll {
  major: { dasha_period: AstrologyApiDashaPeriod[] };
  minor: { planet: { major: string }; dasha_period: AstrologyApiDashaPeriod[] };
  sub_minor: { planet: { major: string; minor: string }; dasha_period: AstrologyApiDashaPeriod[] };
  sub_sub_minor: { planet: { major: string; minor: string; sub_minor: string }; dasha_period: AstrologyApiDashaPeriod[] };
  sub_sub_sub_minor: {
    planet: { major: string; minor: string; sub_minor: string; sub_sub_minor: string };
    dasha_period: AstrologyApiDashaPeriod[];
  };
}

interface BhavabalaComponents {
  bhava_dikbala: number;
  bhava_drigbala: number;
  bhava_kalabala: number;
  bhava_yuti_bala: number;
  bhavanatha_bala: number;
}

/** `POST /bhavabala`: per-house strength, the Bhava-focused counterpart to `/shadbala`'s per-graha strength. */
export interface AstrologyApiBhavabala {
  summary: { strongest_house_id: number; weakest_house_id: number; ranked_house_ids_desc: number[] };
  houses: Array<{
    id: number;
    name: string;
    bhava_sign: string;
    bhavamadhya_longitude: number;
    strength_percent_of_baseline: number;
    total_bhavabala_rupa: number;
    total_bhavabala_virupa: number;
    components: BhavabalaComponents;
  }>;
}

/** One planet's friendship rating toward the other six grahas (index order: Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn). */
type MaitriRow = [string, string, string, string, string, string, string];

/**
 * `POST /panchadha_maitri`: the five-fold friendship table — natural, temporary, and the combined
 * (panchadha) verdict each derive from the other two.
 */
export interface AstrologyApiPanchadhaMaitri {
  naturalFriendship: Record<string, MaitriRow>;
  temporaryFriendship: Record<string, MaitriRow>;
  panchandhaChakra: Record<string, MaitriRow>;
}

/** `POST /current_chardasha`: the active Jaimini Char Dasha period at all three depths, as of today. */
export interface AstrologyApiCharDashaCurrent {
  dasha_date: string;
  major_dasha: { sign_id: number; sign_name: string; duration: string; start_date: string; end_date: string };
  sub_dasha: { sign_id: number; sign_name: string; duration: string; start_date: string; end_date: string };
  sub_sub_dasha: { sign_id: number; sign_name: string; start_date: string; end_date: string };
}

/** One period from `POST /major_chardasha`: the lifetime Jaimini Char Dasha sign sequence. */
export interface AstrologyApiCharDashaPeriod {
  sign_id: number;
  sign_name: string;
  duration: string;
  start_date: string;
  end_date: string;
}

/** `POST /current_yogini_dasha`: the active Yogini Dasha period at all three depths, as of today. */
export interface AstrologyApiYoginiDashaCurrent {
  major_dasha: { dasha_id: number; dasha_name: string; duration: string; start_date: string; end_date: string };
  sub_dasha: { dasha_id: number; dasha_name: string; start_date: string; end_date: string };
  sub_sub_dasha: { dasha_id: number; dasha_name: string; start_date: string; end_date: string };
}

/** One period from `POST /major_yogini_dasha`: the full birth-to-death 36-year Yogini Dasha cycle. */
export interface AstrologyApiYoginiDashaPeriod {
  dasha_id: number;
  dasha_name: string;
  start_date: string;
  end_date: string;
  start_ms: number;
  end_ms: number;
  duration: number;
}

/** One graha from `POST /kp_planets`: the KP system's sub-lord and sub-sub-lord layered onto the usual placement. */
export interface AstrologyApiKpPlanet {
  planet_id: number;
  planet_name: string;
  degree: number;
  formatted_degree: string;
  is_retro: boolean;
  norm_degree: number;
  formatted_norm_degree: string;
  house: number;
  sign: string;
  sign_lord: string;
  nakshatra: string;
  nakshatra_lord: string;
  charan: number;
  sub_lord: string;
  sub_sub_lord: string;
}

/** One house cusp from `POST /kp_house_cusps`: KP's finer-grained cusp degrees, each with its own sub-lord chain. */
export interface AstrologyApiKpHouseCusp {
  house_id: number;
  cusp_full_degree: number;
  formatted_degree: string;
  sign_id: number;
  sign: string;
  sign_lord: string;
  nakshatra: string;
  nakshatra_lord: string;
  sub_lord: string;
  sub_sub_lord: string;
}

/** `POST /varshaphal_year_chart`: the solar-return (Varshaphal) chart for the requested `varshaphal_year`. */
export interface AstrologyApiVarshaphalYearChart {
  year_lord: string;
  varshaphal_date: string;
  chart: AstrologyApiChartHouse[];
}

/** One period from `POST /varshaphal_mudda_dasha`: the annual chart's own proportional dasha sequence. */
export interface AstrologyApiVarshaphalMuddaDasha {
  planet: string;
  duration: number;
  dasha_start: string;
  dasha_end: string;
}

/** One entry from `POST /varshaphal_yoga`: a Varshaphal-specific yoga, present only if `is_yog_happening`. */
export interface AstrologyApiVarshaphalYoga {
  yog_name: string;
  yog_description: string;
  is_yog_happening: boolean;
  powerfullness_percentage: string;
  yog_prediction: string;
  planets?: string[][];
}

interface DashakootKoot {
  description: string;
  male_koot_attribute: string;
  female_koot_attribute: string;
  total_points: number;
  received_points: number;
}

/** `POST /match_dashakoot_points`: the 10-koota Dashakoot Milan breakdown, the North Indian counterpart to Ashtakoot. */
export interface AstrologyApiMatchDashakoot {
  dina: DashakootKoot;
  gana: DashakootKoot;
  yoni: DashakootKoot;
  rashi: DashakootKoot;
  rasyadhipati: DashakootKoot;
  rajju: DashakootKoot;
  vedha: DashakootKoot;
  vashya: DashakootKoot;
  mahendra: DashakootKoot;
  streeDeergha: DashakootKoot;
  total: { total_points: number; received_points: number; minimum_required: number };
}

/** `POST /match_percentage`: a single compatibility-percentage summary across all four checked dimensions. */
export interface AstrologyApiMatchPercentage {
  ashtakoota_percentage: number;
  manglik_match_percentage: number;
  rajju_match_percentage: number;
  vedha_match_percentage: number;
  match_percentage: number;
  is_match_good: boolean;
}
