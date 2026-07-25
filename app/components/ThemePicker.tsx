"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { THEMES, DEFAULT_THEME, STORAGE_KEY } from "../themes";

const HIDE_AFTER_MS = 4000;

/**
 * Theme control for the signage display.
 *
 * Deliberately invisible while the display is just running — it only fades in
 * when someone moves a mouse or presses a key, then hides itself again. That
 * keeps the "this is a printed banner, not a website" feel intact.
 *
 * Three ways to set the theme, in priority order:
 *   1. ?theme=emerald in the URL   — best for a kiosk you configure once
 *   2. number keys 1-8, or T/→ ←   — best for a TV remote or keyboard on site
 *   3. clicking a swatch
 * The choice is saved to localStorage, so it survives a reboot.
 */
export default function ThemePicker() {
  const [theme, setTheme] = useState<string>(DEFAULT_THEME);
  const [visible, setVisible] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  const reveal = useCallback(() => {
    setVisible(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setVisible(false), HIDE_AFTER_MS);
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
        if (hideTimer.current) clearTimeout(hideTimer.current);
        setVisible(false);
        return;
      }
      const n = Number(e.key);
      if (Number.isInteger(n) && n >= 1 && n <= THEMES.length) {
        apply(THEMES[n - 1].id);
      } else if (e.key === "t" || e.key === "T" || e.key === "ArrowRight") {
        step(1);
      } else if (e.key === "ArrowLeft") {
        step(-1);
      }
      reveal();
    };

    window.addEventListener("mousemove", reveal, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousemove", reveal);
      window.removeEventListener("keydown", onKey);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [apply, reveal, step]);

  // Restore the cursor only while the control is on screen.
  useEffect(() => {
    document.documentElement.classList.toggle("ui-on", visible);
  }, [visible]);

  return (
    <div className={`theme-ui${visible ? " is-visible" : ""}`}>
      <span className="theme-ui-label">Theme</span>
      {THEMES.map((t, i) => (
        <button
          key={t.id}
          type="button"
          className={`theme-dot${theme === t.id ? " is-active" : ""}`}
          style={{ background: t.swatch }}
          onClick={() => apply(t.id)}
          title={`${t.label}  (press ${i + 1})`}
          aria-label={t.label}
          aria-pressed={theme === t.id}
          tabIndex={visible ? 0 : -1}
        />
      ))}
      <span className="theme-ui-hint">1–8 · T to cycle</span>
    </div>
  );
}
