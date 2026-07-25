"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* Vendor-prefixed shapes — Samsung Internet / Tizen signage builds still ship
   the webkit- names, and older Edge the ms- ones. */
type FsElement = HTMLElement & {
  webkitRequestFullscreen?: () => Promise<void> | void;
  msRequestFullscreen?: () => Promise<void> | void;
};
type FsDocument = Document & {
  webkitFullscreenElement?: Element | null;
  msFullscreenElement?: Element | null;
  webkitExitFullscreen?: () => Promise<void> | void;
  msExitFullscreen?: () => Promise<void> | void;
};
type WakeLockSentinel = { release: () => Promise<void> };
type WakeNavigator = Navigator & {
  wakeLock?: { request: (type: "screen") => Promise<WakeLockSentinel> };
};

function fsElement(): Element | null {
  const d = document as FsDocument;
  return (
    document.fullscreenElement ??
    d.webkitFullscreenElement ??
    d.msFullscreenElement ??
    null
  );
}

function EnterIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 4H5.6A1.6 1.6 0 0 0 4 5.6V9M15 4h3.4A1.6 1.6 0 0 1 20 5.6V9M9 20H5.6A1.6 1.6 0 0 1 4 18.4V15M15 20h3.4a1.6 1.6 0 0 0 1.6-1.6V15"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ExitIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4.5 9H8a1 1 0 0 0 1-1V4.5M19.5 9H16a1 1 0 0 1-1-1V4.5M4.5 15H8a1 1 0 0 1 1 1v3.5M19.5 15H16a1 1 0 0 0-1 1v3.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Puts the display into kiosk mode: true fullscreen (no browser chrome) plus a
 * screen wake lock so the panel never blanks or shows a screensaver mid-Ijtima,
 * and no right-click menu to stumble into.
 *
 * Fullscreen must be triggered by a real user gesture, so this cannot be done
 * automatically on load — hence the button. Press F as a shortcut.
 */
export default function FullscreenButton() {
  const [isFull, setIsFull] = useState(false);
  const wakeLock = useRef<WakeLockSentinel | null>(null);

  const acquireWakeLock = useCallback(async () => {
    const nav = navigator as WakeNavigator;
    if (!nav.wakeLock?.request || wakeLock.current) return;
    try {
      wakeLock.current = await nav.wakeLock.request("screen");
    } catch {
      /* unsupported or blocked — fullscreen still works */
    }
  }, []);

  const releaseWakeLock = useCallback(async () => {
    try {
      await wakeLock.current?.release();
    } catch {
      /* already gone */
    }
    wakeLock.current = null;
  }, []);

  const toggle = useCallback(async () => {
    const el = document.documentElement as FsElement;
    const d = document as FsDocument;
    try {
      if (!fsElement()) {
        if (el.requestFullscreen) await el.requestFullscreen({ navigationUI: "hide" });
        else if (el.webkitRequestFullscreen) await el.webkitRequestFullscreen();
        else if (el.msRequestFullscreen) await el.msRequestFullscreen();
        await acquireWakeLock();
      } else {
        if (d.exitFullscreen) await d.exitFullscreen();
        else if (d.webkitExitFullscreen) await d.webkitExitFullscreen();
        else if (d.msExitFullscreen) await d.msExitFullscreen();
        await releaseWakeLock();
      }
    } catch {
      /* user or policy declined — leave the page as it is */
    }
  }, [acquireWakeLock, releaseWakeLock]);

  // Track fullscreen state from the browser, not from our own click, so that
  // exiting with Escape or the TV remote keeps the icon honest.
  useEffect(() => {
    const sync = () => {
      const on = !!fsElement();
      setIsFull(on);
      document.documentElement.classList.toggle("is-kiosk", on);
      if (!on) void releaseWakeLock();
    };
    const events = ["fullscreenchange", "webkitfullscreenchange", "msfullscreenchange"];
    events.forEach((e) => document.addEventListener(e, sync));
    sync();
    return () => events.forEach((e) => document.removeEventListener(e, sync));
  }, [releaseWakeLock]);

  // A wake lock is dropped whenever the page is hidden; take it again on return.
  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === "visible" && fsElement()) void acquireWakeLock();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, [acquireWakeLock]);

  // F toggles; suppress the context menu only while actually in kiosk mode.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "f" || e.key === "F") void toggle();
    };
    const onMenu = (e: MouseEvent) => {
      if (fsElement()) e.preventDefault();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("contextmenu", onMenu);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("contextmenu", onMenu);
    };
  }, [toggle]);

  useEffect(() => () => void releaseWakeLock(), [releaseWakeLock]);

  return (
    <button
      type="button"
      className="ui-btn"
      onClick={() => void toggle()}
      title={isFull ? "Exit full screen  (F)" : "Full screen · kiosk mode  (F)"}
      aria-label={isFull ? "Exit full screen" : "Enter full screen kiosk mode"}
      aria-pressed={isFull}
    >
      {isFull ? <ExitIcon /> : <EnterIcon />}
    </button>
  );
}
