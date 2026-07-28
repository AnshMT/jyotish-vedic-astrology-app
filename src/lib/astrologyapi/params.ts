import type { Coords } from '@/lib/location';

/** A birth (or event) input as the app's forms collect it: an ISO date, a 24h `HH:MM` time, and coordinates. */
export interface BirthInput extends Coords {
  date: string;
  time: string;
}

/** AstrologyAPI's split date/time param shape, shared by every endpoint in this client. */
export interface AstrologyApiDateParams {
  day: number;
  month: number;
  year: number;
  hour: number;
  min: number;
  lat: number;
  lon: number;
  tzone: number;
}

/** Splits an ISO `date` (`YYYY-MM-DD`) and 24h `time` (`HH:MM` or `HH:MM:SS`) into AstrologyAPI's params. */
export function toDateParams({ date, time, latitude, longitude, timezone }: BirthInput): AstrologyApiDateParams {
  const [year, month, day] = date.split('-').map(Number);
  const [hour, min] = time.split(':').map(Number);
  return { day, month, year, hour, min, lat: latitude, lon: longitude, tzone: timezone };
}
