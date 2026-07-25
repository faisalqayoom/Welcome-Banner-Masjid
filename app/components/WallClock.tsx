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
 * Clock plate for the welcome banner at "/".
 *
 * It sits in the upper-right block of the stage — right of the organisation
 * title, below the two hanging lanterns, above the quote panels. That pocket
 * is empty in every theme and at every resolution (the decorations are all
 * placed in --u/--v too), so the plate never has to fight the artwork.
 * Every colour comes from the active theme, so it re-tints with the banner.
 */
export default function WallClock() {
  const now = useWallTime();

  return (
    <div className="wall-clock" suppressHydrationWarning>
      <div className="wc-row">
        <span className="wc-hm">{now ? now.clock : "--:--"}</span>
        <span className="wc-sec">{now?.seconds ?? "--"}</span>
        <span className="wc-mer">{now?.meridiem ?? ""}</span>
      </div>

      <div className="wc-date">
        <span>{now?.dateShort ?? ""}</span>
        {now?.hijri ? (
          <>
            <span className="wc-dot" aria-hidden="true" />
            <span className="wc-hijri">{now.hijri}</span>
          </>
        ) : null}
      </div>

      {now?.maghrib ? (
        <div className="wc-maghrib">
          <span className="wc-maghrib-icon">
            <SunsetMark />
          </span>
          <span className="wc-maghrib-label">MAGHRIB</span>
          <span className="wc-maghrib-time">
            {now.maghrib}
            <em>{now.maghribMeridiem}</em>
          </span>
        </div>
      ) : null}
    </div>
  );
}
