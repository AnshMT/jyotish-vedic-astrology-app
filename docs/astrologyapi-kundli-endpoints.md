# AstrologyAPI endpoints used by the Kundli page

Source: `src/app/astrologyapi/kundli/actions.ts`.

A ready-to-import Postman collection with the same requests (plus a `D9` example alongside `D1` for the Varga/divisional-chart endpoints) lives at [`astrologyapi-kundli.postman_collection.json`](./astrologyapi-kundli.postman_collection.json) — set the collection's `astrologyApiKey` variable to a real access token after importing.

- **Base URL:** `https://json.astrologyapi.com/v1`
- **Auth header:** `x-astrologyapi-key: <ASTROLOGYAPI_KEY>`
- **Content type:** `application/x-www-form-urlencoded` for every request — all requests are `POST`, even the reference-style ones
- **Language:** none of these endpoints accept a `lang` parameter (only AstrologyAPI's separate, unused PDF-report endpoints do), so every response below is English-only regardless of the site's language switcher
- **Ayanamsha:** none of the requests below set one — the app never sends `ayanamsha`, so every response uses AstrologyAPI's default (Lahiri). Pass `ayanamsha=RAMAN`, `KP_NEW`, etc. yourself if you need a different one.
- All curl examples use the same sample birth data: **10 May 1990, 19:55, Mumbai (lat 19.20, lon 72.88, UTC+5:30)**. Replace `$ASTROLOGYAPI_KEY` with a real key. Every example below was run against the live API while writing this doc.

| # | Endpoint | Used for |
|---|----------|----------|
| 1 | `POST /planets` | Planets tab |
| 2 | `POST /horo_chart/:chartId` | Rashi (D1) tab, Varga tab (D9 eagerly, any division on demand), Lal Kitab tab (`lalkitab_horoscope` instead) — house data drives a hand-drawn North Indian chart diagram (`@/components/astrologyapi/chart-diagram`), not the vendor's rendered SVG (`horo_chart_image`, dropped since it has no `lang` parameter and bakes English planet abbreviations into the image) |
| 3 | `POST /major_vdasha` | Dasha tab |
| 4 | `POST /kalsarpa_details` | Doshas tab |
| 5 | `POST /sadhesati_current_status` | Doshas tab |
| 6 | `POST /sarvashtak` | Strength tab |
| 7 | `POST /shadbala` | Strength tab |
| 8 | `POST /general_ascendant_report` | Interpretation tab |
| 9 | `POST /general_nakshatra_report` | Interpretation tab |
| 10 | `POST /general_rashi_report/:planet_name` | Interpretation tab, on demand per planet |
| 11 | `POST /general_house_report/:planet_name` | Interpretation tab, on demand per planet |
| 12 | `POST /pitra_dosha_report` | Interpretation tab |
| 13 | `POST /basic_gem_suggestion` | Remedies tab |
| 14 | `POST /puja_suggestion` | Remedies tab |
| 15 | `POST /rudraksha_suggestion` | Remedies tab |
| 16 | `POST /sadhesati_remedies` | Remedies tab |
| 17 | `POST /lalkitab_horoscope` | Lal Kitab tab |
| 18 | `POST /lalkitab_debts` | Lal Kitab tab |
| 19 | `POST /lalkitab_remedies/:planet_name` | Lal Kitab tab, on demand per planet |

---

## 1. Planets

Powers `AstrologyApiPlanetsTable`. Returns the 9 grahas plus a synthetic `Ascendant` row, each with sign, house, nakshatra/pada, degree, retrograde flag, and avastha.

```bash
curl -s -X POST "https://json.astrologyapi.com/v1/planets" \
  -H "x-astrologyapi-key: $ASTROLOGYAPI_KEY" \
  -d "day=10&month=5&year=1990&hour=19&min=55&lat=19.20&lon=72.88&tzone=5.5"
```

## 2. Birth chart (D1 Rashi / any varga)

Powers `AstrologyApiChartDiagram`, a hand-drawn North Indian chart diagram. `chartId` is `D1` for the main chart or any of `D2, D3, D4, D7, D9, D10, D12, D16, D20, D24, D27, D30, D40, D45, D60` for the Varga tab (verified live — each division returns genuinely distinct data, not a silent fallback to D1). Returns 12 houses ordered from the ascendant, each with the occupied sign and the planets in it.

```bash
curl -s -X POST "https://json.astrologyapi.com/v1/horo_chart/D1" \
  -H "x-astrologyapi-key: $ASTROLOGYAPI_KEY" \
  -d "day=10&month=5&year=1990&hour=19&min=55&lat=19.20&lon=72.88&tzone=5.5"

# Any other division, e.g. D9 navamsa:
curl -s -X POST "https://json.astrologyapi.com/v1/horo_chart/D9" \
  -H "x-astrologyapi-key: $ASTROLOGYAPI_KEY" \
  -d "day=10&month=5&year=1990&hour=19&min=55&lat=19.20&lon=72.88&tzone=5.5"
```

## 3. Vimshottari major dashas

Powers `AstrologyApiDashaTimeline`. Returns each mahadasha planet with `start`/`end` as `"D-M-YYYY  H:MM"` strings.

```bash
curl -s -X POST "https://json.astrologyapi.com/v1/major_vdasha" \
  -H "x-astrologyapi-key: $ASTROLOGYAPI_KEY" \
  -d "day=10&month=5&year=1990&hour=19&min=55&lat=19.20&lon=72.88&tzone=5.5"
```

## 4. Kalsarpa dosha

Powers `AstrologyApiKalsarpaCard`.

```bash
curl -s -X POST "https://json.astrologyapi.com/v1/kalsarpa_details" \
  -H "x-astrologyapi-key: $ASTROLOGYAPI_KEY" \
  -d "day=10&month=5&year=1990&hour=19&min=55&lat=19.20&lon=72.88&tzone=5.5"
```

## 5. Sadhesati current status

Powers `AstrologyApiSadhesatiCard`.

```bash
curl -s -X POST "https://json.astrologyapi.com/v1/sadhesati_current_status" \
  -H "x-astrologyapi-key: $ASTROLOGYAPI_KEY" \
  -d "day=10&month=5&year=1990&hour=19&min=55&lat=19.20&lon=72.88&tzone=5.5"
```

## 6. Sarvashtakavarga

Powers `AstrologyApiAshtakavargaGrid`. Returns total bindu points (max 337) for all 12 signs.

```bash
curl -s -X POST "https://json.astrologyapi.com/v1/sarvashtak" \
  -H "x-astrologyapi-key: $ASTROLOGYAPI_KEY" \
  -d "day=10&month=5&year=1990&hour=19&min=55&lat=19.20&lon=72.88&tzone=5.5"
```

## 7. Shadbala

Powers `AstrologyApiShadbalaTable`.

```bash
curl -s -X POST "https://json.astrologyapi.com/v1/shadbala" \
  -H "x-astrologyapi-key: $ASTROLOGYAPI_KEY" \
  -d "day=10&month=5&year=1990&hour=19&min=55&lat=19.20&lon=72.88&tzone=5.5"
```

## 8. Ascendant reading

Powers `AstrologyApiAscendantCard` (Interpretation tab). A full prose paragraph on the Lagna sign.

```bash
curl -s -X POST "https://json.astrologyapi.com/v1/general_ascendant_report" \
  -H "x-astrologyapi-key: $ASTROLOGYAPI_KEY" \
  -d "day=10&month=5&year=1990&hour=19&min=55&lat=19.20&lon=72.88&tzone=5.5"
```

## 9. Nakshatra reading

Powers `AstrologyApiNakshatraCard`. Returns prose grouped by life area: `physical`, `character`, `education`, `family`, `health`.

```bash
curl -s -X POST "https://json.astrologyapi.com/v1/general_nakshatra_report" \
  -H "x-astrologyapi-key: $ASTROLOGYAPI_KEY" \
  -d "day=10&month=5&year=1990&hour=19&min=55&lat=19.20&lon=72.88&tzone=5.5"
```

## 10. Rashi (sign placement) reading, by planet

Powers `AstrologyApiPlanetReportSection` — fetched on demand when a planet is picked from the selector, not eagerly (nine planets eagerly would mean nine extra round trips per generation). `planet_name` is lowercase (`sun`, `moon`, `mars`, `mercury`, `jupiter`, `venus`, `saturn`, `rahu`, `ketu`). Rahu/Ketu return no `rashi_report` field — they have no owned sign in classical Vedic astrology.

```bash
curl -s -X POST "https://json.astrologyapi.com/v1/general_rashi_report/moon" \
  -H "x-astrologyapi-key: $ASTROLOGYAPI_KEY" \
  -d "day=10&month=5&year=1990&hour=19&min=55&lat=19.20&lon=72.88&tzone=5.5"
```

## 11. House placement reading, by planet

Powers `AstrologyApiPlanetReportSection`, same on-demand fetch as #10. Rahu/Ketu return `"house_report": "Not available"` rather than an error.

```bash
curl -s -X POST "https://json.astrologyapi.com/v1/general_house_report/moon" \
  -H "x-astrologyapi-key: $ASTROLOGYAPI_KEY" \
  -d "day=10&month=5&year=1990&hour=19&min=55&lat=19.20&lon=72.88&tzone=5.5"
```

## 12. Pitra dosha

Powers `AstrologyApiPitraDoshaCard`.

```bash
curl -s -X POST "https://json.astrologyapi.com/v1/pitra_dosha_report" \
  -H "x-astrologyapi-key: $ASTROLOGYAPI_KEY" \
  -d "day=10&month=5&year=1990&hour=19&min=55&lat=19.20&lon=72.88&tzone=5.5"
```

## 13. Gemstone suggestion

Powers `AstrologyApiGemSuggestionGrid`. Returns three fixed categories: `LIFE`, `BENEFIC`, `LUCKY`.

```bash
curl -s -X POST "https://json.astrologyapi.com/v1/basic_gem_suggestion" \
  -H "x-astrologyapi-key: $ASTROLOGYAPI_KEY" \
  -d "day=10&month=5&year=1990&hour=19&min=55&lat=19.20&lon=72.88&tzone=5.5"
```

## 14. Puja suggestion

Powers `AstrologyApiPujaSuggestionList`.

```bash
curl -s -X POST "https://json.astrologyapi.com/v1/puja_suggestion" \
  -H "x-astrologyapi-key: $ASTROLOGYAPI_KEY" \
  -d "day=10&month=5&year=1990&hour=19&min=55&lat=19.20&lon=72.88&tzone=5.5"
```

## 15. Rudraksha suggestion

Powers `AstrologyApiRudrakshaCard`.

```bash
curl -s -X POST "https://json.astrologyapi.com/v1/rudraksha_suggestion" \
  -H "x-astrologyapi-key: $ASTROLOGYAPI_KEY" \
  -d "day=10&month=5&year=1990&hour=19&min=55&lat=19.20&lon=72.88&tzone=5.5"
```

## 16. Sadhesati remedies

Powers `AstrologyApiSadhesatiRemediesCard`. General remedies, independent of whether Sadhesati is currently active (unlike #5).

```bash
curl -s -X POST "https://json.astrologyapi.com/v1/sadhesati_remedies" \
  -H "x-astrologyapi-key: $ASTROLOGYAPI_KEY" \
  -d "day=10&month=5&year=1990&hour=19&min=55&lat=19.20&lon=72.88&tzone=5.5"
```

## 17. Lal Kitab chart

Powers the Lal Kitab tab's chart diagram (reuses `AstrologyApiChartDiagram`). Same house-array shape as `horo_chart`, but Lal Kitab always shows Aries as house 1 regardless of ascendant — a defining characteristic of the Lal Kitab system, not a bug in how the diagram labels houses.

```bash
curl -s -X POST "https://json.astrologyapi.com/v1/lalkitab_horoscope" \
  -H "x-astrologyapi-key: $ASTROLOGYAPI_KEY" \
  -d "day=10&month=5&year=1990&hour=19&min=55&lat=19.20&lon=72.88&tzone=5.5"
```

## 18. Lal Kitab debts (Rin)

Powers `AstrologyApiLalkitabDebtsList`.

```bash
curl -s -X POST "https://json.astrologyapi.com/v1/lalkitab_debts" \
  -H "x-astrologyapi-key: $ASTROLOGYAPI_KEY" \
  -d "day=10&month=5&year=1990&hour=19&min=55&lat=19.20&lon=72.88&tzone=5.5"
```

## 19. Lal Kitab remedies, by planet

Powers `AstrologyApiLalkitabRemedySection` — fetched on demand per planet, same reasoning as #10/#11. Returns the planet's Lal Kitab house placement (as an ordinal, e.g. `"Third"`) plus a description and a remedies list.

```bash
curl -s -X POST "https://json.astrologyapi.com/v1/lalkitab_remedies/saturn" \
  -H "x-astrologyapi-key: $ASTROLOGYAPI_KEY" \
  -d "day=10&month=5&year=1990&hour=19&min=55&lat=19.20&lon=72.88&tzone=5.5"
```
