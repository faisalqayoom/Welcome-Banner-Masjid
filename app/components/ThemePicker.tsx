"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { THEMES, DEFAULT_THEME, STORAGE_KEY } from "../themes";
import { useExclusivePanel } from "./useExclusivePanel";

const IDLE_HIDE_MS = 6000;

function PaletteIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3a9 9 0 0 0 0 18c.9 0 1.6-.7 1.6-1.6 0-.4-.2-.8-.5-1.1-.3-.3-.4-.6-.4-1 0-.9.7-1.6 1.6-1.6h1.9A4.8 4.8 0 0 0 21 11C21 6.6 17 3 12 3z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="7.5" cy="11.5" r="1.3" fill="currentColor" />
      <circle cx="10.5" cy="7.5" r="1.3" fill="currentColor" />
      <circle cx="15.5" cy="7.8" r="1.3" fill="currentColor" />
      <circle cx="18" cy="11.2" r="1.3" fill="currentColor" />
    </svg>
  );
}

/**
 * Theme control for the signage display.
 *
 * A small palette icon sits quietly in the corner at low opacity. Clicking it
 * shows or hides the swatch row, so the colours are reachable on site without
 * ever putting permanent chrome on the banner.
 *
 * Three ways to set the theme, in priority order:
 *   1. ?theme=emerald in the URL   — best for a kiosk you configure once
 *   2. number keys 1-8, or T/→ ←   — best for a TV remote or keyboard on site
 *   3. the palette icon + swatches
 * The choice is saved to localStorage, so it survives a reboot.
 */
export default function ThemePicker() {
  const [theme, setTheme] = useState<string>(DEFAULT_THEME);
  const [open, setOpen] = useState(false);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // The inline script in layout.tsx has already applied the theme before paint;
  // mirror it into React state so the active swatch is correct.
  useEffect(() => {
    setTheme(document.documentElement.dataset.theme || DEFAULT_THEME);
  }, []);

  const apply = useCallback((id: string) => {
    document.documentElement.dataset.theme = id;
    setTheme(id);
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch {
      /* private mode / storage disabled — theme still applies for this session */
    }
  }, []);

  /** Any interaction restarts the idle countdown that closes the row again. */
  const keepAwake = useCallback(() => {
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => setOpen(false), IDLE_HIDE_MS);
  }, []);

  const step = useCallback(
    (delta: number) => {
      const current = document.documentElement.dataset.theme || DEFAULT_THEME;
      const i = THEMES.findIndex((t) => t.id === current);
      const next = THEMES[(i + delta + THEMES.length) % THEMES.length];
      apply(next.id);
    },
    [apply],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      const n = Number(e.key);
      if (Number.isInteger(n) && n >= 1 && n <= THEMES.length) {
        apply(THEMES[n - 1].id);
      } else if (e.key === "t" || e.key === "T" || e.key === "ArrowRight") {
        step(1);
      } else if (e.key === "ArrowLeft") {
        step(-1);
      } else {
        return;
      }
      setOpen(true);
      keepAwake();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [apply, keepAwake, step]);

  useEffect(() => {
    if (open) keepAwake();
  }, [open, keepAwake]);

  const closePanel = useCallback(() => setOpen(false), []);
  useExclusivePanel("theme", open, closePanel);

  return (
    <div className={`theme-ui${open ? " is-open" : ""}`} onMouseMove={keepAwake}>
      <div className="theme-swatches" aria-hidden={!open}>
        <span className="theme-ui-label">Theme</span>
        {THEMES.map((t, i) => (
          <button
            key={t.id}
            type="button"
            className={`theme-dot${theme === t.id ? " is-active" : ""}`}
            style={{ background: t.swatch }}
            onClick={() => {
              apply(t.id);
              keepAwake();
            }}
            title={`${t.label}  (press ${i + 1})`}
            aria-label={t.label}
            aria-pressed={theme === t.id}
            tabIndex={open ? 0 : -1}
          />
        ))}
        <span className="theme-ui-hint">1–8 · T</span>
      </div>

      <button
        type="button"
        className="ui-btn theme-toggle"
        onClick={() => setOpen((v) => !v)}
        title={open ? "Hide colour palette" : "Show colour palette"}
        aria-label={open ? "Hide colour palette" : "Show colour palette"}
        aria-expanded={open}
      >
        <PaletteIcon />
      </button>
    </div>
  );
}
