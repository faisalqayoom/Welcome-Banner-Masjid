"use client";

import { useEffect, useState } from "react";
import { nextMaghrib } from "./sun";

export type WallTime = {
  /** 12-hour clock, hours and minutes only — e.g. "06:04" */
  clock: string;
  /** seconds, zero-padded — shown smaller, next to the clock */
  seconds: string;
  /** "AM" / "PM" */
  meridiem: string;
  /** "Saturday 25 July" */
  date: string;
  /** "Sat 25 July" — for the tighter placement on the welcome banner */
  dateShort: string;
  /** "11 Safar 1448 AH", or "" where the calendar is unavailable */
  hijri: string;
  /** next Maghrib, e.g. "07:38" — "" above the polar circles */
  maghrib: string;
  maghribMeridiem: string;
};

/**
 * 12-hour clock split into its parts. formatToParts rather than string
 * surgery: locales place the meridiem differently, and some insert a
 * narrow no-break space that a naive split on " " gets wrong.
 */
function split12(d: Date, withSeconds = false): [string, string, string] {
  const parts = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    ...(withSeconds ? { second: "2-digit" } : null),
    hour12: true,
  }).formatToParts(d);

  const get = (type: string) =>
    parts.find((p) => p.type === type)?.value ?? "";

  return [
    `${get("hour")}:${get("minute")}`,
    get("second"),
    get("dayPeriod").toUpperCase(),
  ];
}

function read(): WallTime {
  const now = new Date();
  const [clock, seconds, meridiem] = split12(now, true);

  const date = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(now);

  const dateShort = new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "long",
  }).format(now);

  /* The Umm al-Qura calendar is present in every modern Chromium, but an old
     kiosk WebView can throw on it — the Hijri line is simply dropped there. */
  let hijri = "";
  try {
    hijri = new Intl.DateTimeFormat("en-GB-u-ca-islamic-umalqura", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(now);
  } catch {
    hijri = "";
  }

  const m = nextMaghrib(now);
  const [maghrib, , maghribMeridiem] = m ? split12(m) : ["", "", ""];

  return {
    clock,
    seconds,
    meridiem,
    date,
    dateShort,
    hijri,
    maghrib,
    maghribMeridiem,
  };
}

/**
 * Wall time for the signage displays: clock, both calendars, and the next
 * Maghrib for the masjid.
 *
 * Returns null until after mount, so the server HTML and the first client
 * paint can never disagree.
 *
 * It re-arms on each second BOUNDARY instead of running a 1000 ms interval:
 * an interval drifts, and a drifting clock eventually skips or repeats a
 * second in plain view. The work per tick is a few Intl formats and the
 * sunset trig — nothing that troubles a kiosk box.
 */
export function useWallTime(): WallTime | null {
  const [now, setNow] = useState<WallTime | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      setNow(read());
      const ms = 1000 - (Date.now() % 1000);
      timer = setTimeout(tick, ms + 20);
    };
    tick();

    return () => clearTimeout(timer);
  }, []);

  return now;
}
