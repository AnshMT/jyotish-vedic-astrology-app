'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { translatePlanetName } from '@/lib/astrologyapi/i18n';
import type { Lang } from '@/lib/lang';

/** The nine grahas AstrologyAPI's `:planet_name`-keyed endpoints accept. Rahu/Ketu return placeholder text for some reports (they have no owned sign), which callers should render as-is rather than treat as an error. */
export const PLANETS = [
  { value: 'sun', label: 'Sun' },
  { value: 'moon', label: 'Moon' },
  { value: 'mars', label: 'Mars' },
  { value: 'mercury', label: 'Mercury' },
  { value: 'jupiter', label: 'Jupiter' },
  { value: 'venus', label: 'Venus' },
  { value: 'saturn', label: 'Saturn' },
  { value: 'rahu', label: 'Rahu' },
  { value: 'ketu', label: 'Ketu' },
] as const;

export function PlanetSelect({
  value,
  onChange,
  disabled,
  lang,
}: {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  lang: Lang;
}) {
  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger className="w-40">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {PLANETS.map((p) => (
          <SelectItem key={p.value} value={p.value}>
            {translatePlanetName(lang, p.label)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
