"use client";

import { useWallTime } from "../lib/useWallTime";

/** Sun dipping below the horizon — marks the Maghrib row. */
function SunsetMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4.5 17.5h15" />
      <path d="M7.5 17.5a4.5 4.5 0 0 1 9 0" />
      <path d="M12 4.4v2.3M5.6 7.1l1.6 1.6M18.4 7.1l-1.6 1.6M2.8 13h2.2M19 13h2.2" />
      <path d="M9 20.6h6" />
    </svg>
  );
}

/**
 * Venue clock for the glass display: time, both calendars, and the next
 * Maghrib for this masjid — computed on the device, see lib/sun.ts.
 */
export default function LiveClock() {
  const now = useWallTime();

  return (
    <div className="gl-clock" suppressHydrationWarning>
      <div className="gl-clock-time">
        <span className="gl-clock-hm">{now ? now.clock : "--:--"}</span>
        <span className="gl-clock-sec">{now?.seconds ?? "--"}</span>
        <span className="gl-clock-mer">{now?.meridiem ?? ""}</span>
      </div>

      <div className="gl-clock-dates">
        <span>{now?.date ?? ""}</span>
        {now?.hijri ? (
          <>
            <span className="gl-dot" aria-hidden="true" />
            <span className="gl-clock-hijri">{now.hijri}</span>
          </>
        ) : null}
      </div>

      {now?.maghrib ? (
        <div className="gl-maghrib">
          <span className="gl-maghrib-icon">
            <SunsetMark />
          </span>
          <span className="gl-maghrib-label">MAGHRIB</span>
          <span className="gl-maghrib-time">
            {now.maghrib}
            <em>{now.maghribMeridiem}</em>
          </span>
        </div>
      ) : null}
    </div>
  );
}
