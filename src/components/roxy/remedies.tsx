import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type {
  GetVedicAstrologyNakshatrasByIdResponse,
  GetCrystalsZodiacBySignResponse,
  GetCrystalsResponse,
} from '@roxyapi/sdk';
import type { Lang } from '@/lib/lang';
import { t, translatePlanetName, translateSignName } from '@/lib/roxy/i18n';

/** The fields both `GET /crystals/zodiac/:sign` and `GET /crystals` summaries share (the latter also has `chakras`, unused here). */
interface CrystalSummary {
  id: string;
  name: string;
  imageUrl: string;
  colors: string[];
}

function CrystalGrid({ crystals, lang }: { crystals: CrystalSummary[]; lang: Lang }) {
  if (crystals.length === 0) {
    return <p className="text-sm text-muted-foreground">{t(lang, 'remedies.noCrystals')}</p>;
  }
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {crystals.map((c) => (
        <div key={c.id} className="overflow-hidden rounded-lg border border-border bg-muted/30">
          {/* eslint-disable-next-line @next/next/no-img-element -- external, un-configured crystal image CDN; a plain <img> avoids a next.config domain allowlist for one section */}
          <img src={c.imageUrl} alt={c.name} className="h-24 w-full object-cover" />
          <div className="p-2">
            <p className="text-sm font-medium text-foreground">{c.name}</p>
            {c.colors && c.colors.length > 0 && (
              <div className="mt-1 flex flex-wrap gap-1">
                {c.colors.slice(0, 3).map((color) => (
                  <Badge key={color} variant="secondary" className="text-xs">
                    {color}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Vedic remedies view, combining three RoxyAPI lookups keyed off the already-generated kundali: the birth
 * nakshatra's traditional remedies (`GET /vedic-astrology/nakshatras/:id`), healing crystals for the Moon
 * sign (`GET /crystals/zodiac/:sign`), and healing crystals for the weakest Shadbala planet
 * (`GET /crystals` filtered by `planet`). Unlike AstrologyAPI, these endpoints accept `lang`, so the
 * nakshatra remedies and crystal names localize with the rest of the RoxyAPI pages.
 */
export function RoxyRemediesView({
  nakshatra,
  moonSignCrystals,
  planetCrystals,
  weakPlanet,
  lang,
}: {
  nakshatra: GetVedicAstrologyNakshatrasByIdResponse;
  moonSignCrystals: GetCrystalsZodiacBySignResponse;
  planetCrystals: GetCrystalsResponse;
  weakPlanet: string;
  lang: Lang;
}) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t(lang, 'remedies.birthNakshatra', { name: nakshatra.name })}</CardTitle>
          <CardDescription>
            {t(lang, 'remedies.ruledBy', {
              lord: translatePlanetName(lang, nakshatra.lord),
              deity: nakshatra.deity,
              symbol: nakshatra.symbol,
            })}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">{nakshatra.characteristics}</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-lg bg-muted px-3 py-2">
              <p className="text-xs text-muted-foreground">{t(lang, 'remedies.mantras')}</p>
              <p className="text-sm text-foreground">{nakshatra.remedies.mantras}</p>
            </div>
            <div className="rounded-lg bg-muted px-3 py-2">
              <p className="text-xs text-muted-foreground">{t(lang, 'remedies.gemstones')}</p>
              <p className="text-sm text-foreground">{nakshatra.remedies.gemstones}</p>
            </div>
            <div className="rounded-lg bg-muted px-3 py-2">
              <p className="text-xs text-muted-foreground">{t(lang, 'remedies.rituals')}</p>
              <p className="text-sm text-foreground">{nakshatra.remedies.rituals}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            {t(lang, 'remedies.crystalsForMoon', {
              sign: translateSignName(
                lang,
                moonSignCrystals.sign.charAt(0).toUpperCase() + moonSignCrystals.sign.slice(1),
              ),
            })}
          </CardTitle>
          <CardDescription>{t(lang, 'remedies.crystalsForMoonDesc')}</CardDescription>
        </CardHeader>
        <CardContent>
          <CrystalGrid crystals={moonSignCrystals.crystals} lang={lang} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t(lang, 'remedies.crystalsForPlanet', { planet: translatePlanetName(lang, weakPlanet) })}</CardTitle>
          <CardDescription>
            {t(lang, 'remedies.weakestPlanetDesc', { planet: translatePlanetName(lang, weakPlanet) })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CrystalGrid crystals={planetCrystals.crystals} lang={lang} />
        </CardContent>
      </Card>
    </div>
  );
}
