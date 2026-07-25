/**
 * Sunset (Maghrib) for a fixed location, computed on the device.
 *
 * The panel has no network guarantee and no prayer-time API key, so the time
 * is derived astronomically instead of fetched: the standard NOAA / "sunrise
 * equation" solution, accurate to well under a minute at this latitude. It
 * needs nothing but the device clock and the coordinates below.
 *
 * Maghrib begins at sunset. MAGHRIB_OFFSET_MIN is there because many masjids
 * call the adhan a few minutes after — set it to 3 or 5 and every display
 * picks the change up.
 */

/** Masjid Khadijah Tul Kubra — Shar Shali, Tehsil Pampore, District Pulwama. */
export const MASJID = { lat: 34.0167, lon: 74.9333 };

/** Minutes added to true sunset before the time is shown as Maghrib. */
export const MAGHRIB_OFFSET_MIN = 0;

const DEG = Math.PI / 180;
const UNIX_EPOCH_JULIAN = 2440587.5;

const sin = (deg: number) => Math.sin(deg * DEG);
const cos = (deg: number) => Math.cos(deg * DEG);

function toJulian(d: Date): number {
  return d.getTime() / 86400000 + UNIX_EPOCH_JULIAN;
}

function fromJulian(j: number): Date {
  return new Date((j - UNIX_EPOCH_JULIAN) * 86400000);
}

/**
 * Sunset for the calendar day `date` falls on, at the given coordinates.
 * Returns null above the polar circles on days with no sunset — never thrown,
 * so a caller can simply hide the line.
 */
export function sunset(
  date: Date,
  lat: number,
  lon: number,
): Date | null {
  // Anchor on local noon: the day's own solar transit, never a boundary hour.
  const noon = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    12,
    0,
    0,
    0,
  );

  // The equation is written for west-positive longitude. Solar noon runs
  // LATER the further west you are, hence + west/360 — east of Greenwich
  // (as here) that term is negative and the sun transits before UT noon.
  const west = -lon;

  const n = Math.round(toJulian(noon) - 2451545.0 + 0.0008);
  // 0.0009 is the standard fractional-day correction; dropping it costs a
  // constant ~1.3 minutes, which is visible on a wall clock.
  const meanSolarNoon = n + 0.0009 + west / 360;

  // solar mean anomaly, equation of the centre, ecliptic longitude
  const M = (357.5291 + 0.98560028 * meanSolarNoon) % 360;
  const C = 1.9148 * sin(M) + 0.02 * sin(2 * M) + 0.0003 * sin(3 * M);
  const lambda = (M + C + 180 + 102.9372) % 360;

  const transit =
    2451545.0 + meanSolarNoon + 0.0053 * sin(M) - 0.0069 * sin(2 * lambda);

  // declination of the sun, then the hour angle at which its upper limb,
  // refracted, touches the horizon (-0.833°)
  const sinDec = sin(lambda) * sin(23.4397);
  const cosDec = Math.cos(Math.asin(sinDec));
  const cosHourAngle =
    (sin(-0.833) - sin(lat) * sinDec) / (cos(lat) * cosDec);

  if (cosHourAngle < -1 || cosHourAngle > 1) return null;

  const hourAngle = Math.acos(cosHourAngle) / DEG;
  return fromJulian(transit + hourAngle / 360);
}

/** Maghrib for the masjid, for the day `now` falls on. */
export function maghribAt(now: Date): Date | null {
  const s = sunset(now, MASJID.lat, MASJID.lon);
  if (!s) return null;
  return new Date(s.getTime() + MAGHRIB_OFFSET_MIN * 60_000);
}

/**
 * The Maghrib the display should be showing: today's while it is still ahead,
 * tomorrow's once it has passed. A panel that keeps showing a time three
 * hours gone is worse than useless.
 */
export function nextMaghrib(now: Date): Date | null {
  const today = maghribAt(now);
  if (today && today.getTime() > now.getTime()) return today;

  const tomorrow = new Date(now.getTime() + 86_400_000);
  return maghribAt(tomorrow) ?? today;
}
