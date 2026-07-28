# RoxyAPI endpoints used by the Kundali page

Source: `src/app/kundali/actions.ts`, `src/lib/roxy/remedies.ts`, `src/lib/roxy/client.ts`.

A ready-to-import Postman collection with the same 11 requests lives at [`roxyapi-kundli.postman_collection.json`](./roxyapi-kundli.postman_collection.json) — set the collection's `roxyApiKey` variable to a real key after importing.

- **Base URL:** `https://roxyapi.com/api/v2`
- **Auth header:** `X-API-Key: <ROXYAPI_KEY>`
- **Content type:** `application/json` for every `POST` body
- **Language:** most endpoints below accept `?lang=` (`en`, `hi`, `tr`, `de`, `es`, `pt`, `fr`, `ru`). The app forwards it for the birth chart, dashas, nakshatra lookup, and both crystal lookups; the three dosha checks and the two strength endpoints return only numbers and planet names, so the app doesn't bother; the divisional-chart endpoint also accepts `lang`, but the app currently doesn't forward it there (only the site's own varga labels are translated, not the vendor data) — see the note on endpoint #2
- All curl examples use the same sample birth data: **10 May 1990, 19:55, Mumbai (19.20, 72.88, UTC+5:30)**. Replace `$ROXYAPI_KEY` with a real key. Every example below was run against the live API while writing this doc.

| # | Endpoint | SDK method | Used for |
|---|----------|-----------|----------|
| 1 | `POST /vedic-astrology/birth-chart` | `roxy.vedicAstrology.generateBirthChart` | Rashi (D1) tab, Planets tab |
| 2 | `POST /vedic-astrology/divisional-chart` | `roxy.vedicAstrology.generateDivisionalChart` | Varga tab (D9 eagerly, any division on demand) |
| 3 | `POST /vedic-astrology/dasha/major` | `roxy.vedicAstrology.getMajorDashas` | Dasha tab |
| 4 | `POST /vedic-astrology/dosha/manglik` | `roxy.vedicAstrology.checkManglikDosha` | Doshas tab |
| 5 | `POST /vedic-astrology/dosha/kalsarpa` | `roxy.vedicAstrology.checkKalsarpaDosha` | Doshas tab |
| 6 | `POST /vedic-astrology/dosha/sadhesati` | `roxy.vedicAstrology.checkSadhesati` | Doshas tab |
| 7 | `POST /vedic-astrology/ashtakavarga` | `roxy.vedicAstrology.calculateAshtakavarga` | Strength tab |
| 8 | `POST /vedic-astrology/shadbala` | `roxy.vedicAstrology.calculateShadbala` | Strength tab |
| 9 | `GET /vedic-astrology/nakshatras/{id}` | `roxy.vedicAstrology.getNakshatra` | Remedies tab — birth-nakshatra remedies |
| 10 | `GET /crystals/zodiac/{sign}` | `roxy.crystals.getCrystalsByZodiac` | Remedies tab — crystals for the Moon sign |
| 11 | `GET /crystals` | `roxy.crystals.listCrystals` | Remedies tab — crystals for the weakest Shadbala planet |

---

## 1. Birth chart (D1 Rashi)

Powers the `RoxyVedicKundli` and `RoxyVedicPlanetsTable` components. Returns all 12 signs with their planets, each planet's nakshatra/pada/lord, retrograde flag, house, and avastha, plus a flat `meta` lookup keyed by planet name, combustion analysis, and planetary war detection.

```bash
curl -s -X POST "https://roxyapi.com/api/v2/vedic-astrology/birth-chart?lang=en" \
  -H "X-API-Key: $ROXYAPI_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "date": "1990-05-10",
    "time": "19:55:00",
    "latitude": 19.20,
    "longitude": 72.88,
    "timezone": 5.5
  }'
```

## 2. Divisional (varga) chart

Same request shape as the birth chart, plus `division`. `generateKundali` calls this once eagerly with `division: 9` (Navamsa) so the Varga tab isn't empty on first load; `fetchDivisionalChart` calls it again whenever the user picks a different division from the dropdown (2, 3, 4, 7, 9, 10, 12, 16, 20, 24, 27, 30, 40, 45, or 60).

```bash
curl -s -X POST "https://roxyapi.com/api/v2/vedic-astrology/divisional-chart" \
  -H "X-API-Key: $ROXYAPI_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "date": "1990-05-10",
    "time": "19:55:00",
    "latitude": 19.20,
    "longitude": 72.88,
    "timezone": 5.5,
    "division": 9
  }'
```

## 3. Vimshottari major dashas

Powers `RoxyDashaTimeline`. Returns the Moon's nakshatra/lord, birth dasha balance, and the sequence of mahadasha periods with start/end dates.

```bash
curl -s -X POST "https://roxyapi.com/api/v2/vedic-astrology/dasha/major?lang=en" \
  -H "X-API-Key: $ROXYAPI_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "date": "1990-05-10",
    "time": "19:55:00",
    "latitude": 19.20,
    "longitude": 72.88,
    "timezone": 5.5
  }'
```

## 4. Manglik dosha

Powers `RoxyDoshaCard type="manglik"`. No `lang` query — the response is presence/severity plus a fixed set of remedy strings.

```bash
curl -s -X POST "https://roxyapi.com/api/v2/vedic-astrology/dosha/manglik" \
  -H "X-API-Key: $ROXYAPI_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "date": "1990-05-10",
    "time": "19:55:00",
    "latitude": 19.20,
    "longitude": 72.88,
    "timezone": 5.5
  }'
```

## 5. Kalsarpa dosha

Powers `RoxyDoshaCard type="kalsarpa"`.

```bash
curl -s -X POST "https://roxyapi.com/api/v2/vedic-astrology/dosha/kalsarpa" \
  -H "X-API-Key: $ROXYAPI_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "date": "1990-05-10",
    "time": "19:55:00",
    "latitude": 19.20,
    "longitude": 72.88,
    "timezone": 5.5
  }'
```

## 6. Sadhesati (Sade Sati)

Powers `RoxyDoshaCard type="sadhesati"`.

```bash
curl -s -X POST "https://roxyapi.com/api/v2/vedic-astrology/dosha/sadhesati" \
  -H "X-API-Key: $ROXYAPI_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "date": "1990-05-10",
    "time": "19:55:00",
    "latitude": 19.20,
    "longitude": 72.88,
    "timezone": 5.5
  }'
```

## 7. Ashtakavarga

Powers `RoxyAshtakavargaGrid`. Returns Bhinnashtakavarga (per-planet bindu points across all 12 signs), Sarvashtakavarga (total, max 337), and Shodhya Pinda.

```bash
curl -s -X POST "https://roxyapi.com/api/v2/vedic-astrology/ashtakavarga" \
  -H "X-API-Key: $ROXYAPI_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "date": "1990-05-10",
    "time": "19:55:00",
    "latitude": 19.20,
    "longitude": 72.88,
    "timezone": 5.5
  }'
```

## 8. Shadbala

Powers `RoxyShadbalaTable`. Also used by the app itself (`findWeakestPlanet`) to pick the `relativeRank: 7` planet for the Remedies tab's crystal recommendation.

```bash
curl -s -X POST "https://roxyapi.com/api/v2/vedic-astrology/shadbala" \
  -H "X-API-Key: $ROXYAPI_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "date": "1990-05-10",
    "time": "19:55:00",
    "latitude": 19.20,
    "longitude": 72.88,
    "timezone": 5.5
  }'
```

## 9. Nakshatra reference (birth-star remedies)

Powers the Remedies tab's "Birth Nakshatra" card. `id` is one of the 27 lowercase-hyphenated nakshatra slugs (`ashwini`, `bharani`, ... `revati`); the app finds the Moon's `nakshatra.key` (1–27) from the already-fetched birth chart's `meta.Moon` entry and maps it to a slug. This is reference data — no birth params needed, just the slug.

```bash
curl -s "https://roxyapi.com/api/v2/vedic-astrology/nakshatras/anuradha?lang=en" \
  -H "X-API-Key: $ROXYAPI_KEY"
```

## 10. Crystals by zodiac sign

Powers the Remedies tab's "Crystals for your Moon sign" grid. `sign` is the Moon's rashi from the birth chart (lowercase: `aries` ... `pisces`).

```bash
curl -s "https://roxyapi.com/api/v2/crystals/zodiac/scorpio?lang=en&limit=6" \
  -H "X-API-Key: $ROXYAPI_KEY"
```

## 11. Crystals by planet

Powers the Remedies tab's "Crystals for your weakest planet" grid. `planet` is a partial, case-insensitive match (`Saturn`, `Moon`, `Jupiter`, ...) — the app passes the planet with `relativeRank: 7` from the Shadbala response.

```bash
curl -s "https://roxyapi.com/api/v2/crystals?planet=Saturn&lang=en&limit=6" \
  -H "X-API-Key: $ROXYAPI_KEY"
```
