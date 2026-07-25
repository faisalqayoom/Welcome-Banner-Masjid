"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { LANGS, DEFAULT_LANG, LANG_STORAGE_KEY, type Lang } from "./lang";

const IDLE_HIDE_MS = 6000;

function TranslateIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3.4 5.6h9.2M8 3.6v2M9.8 5.6c-.5 4-3 6.6-6.4 7.8M6.2 8.8c.9 2.3 2.7 3.7 5 4.4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m12.6 20.4 4-9.6 4 9.6M14.2 17h4.8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Language control for the glass display.
 *
 * It works exactly like the theme picker next to it: a quiet corner button
 * that opens two options, the choice saved to localStorage so it survives a
 * reboot, and ?lang=en in the URL for a kiosk you configure once.
 *
 * Switching is a single attribute on <html>. Both languages are already in
 * the DOM and CSS shows one of them, so the swap is instant, needs no
 * re-render, and cannot flash the wrong language on boot — the inline script
 * in layout.tsx sets the attribute before the first paint.
 */
export default function LanguagePicker() {
  const [lang, setLang] = useState<Lang>(DEFAULT_LANG);
  const [open, setOpen] = useState(false);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const current = document.documentElement.dataset.lang as Lang | undefined;
    setLang(current === "en" || current === "ar" ? current : DEFAULT_LANG);
  }, []);

  const apply = useCallback((id: Lang) => {
    document.documentElement.dataset.lang = id;
    setLang(id);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, id);
    } catch {
      /* private mode / storage disabled — the choice still holds this session */
    }
  }, []);

  const keepAwake = useCallback(() => {
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => setOpen(false), IDLE_HIDE_MS);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      /* L cycles the language — the theme picker already owns 1-8, T and the
         arrow keys, so this is the one free, memorable key left. */
      if (e.key !== "l" && e.key !== "L") return;

      const current = (document.documentElement.dataset.lang as Lang) || DEFAULT_LANG;
      apply(current === "en" ? "ar" : "en");
      setOpen(true);
      keepAwake();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [apply, keepAwake]);

  useEffect(() => {
    if (open) keepAwake();
  }, [open, keepAwake]);

  return (
    <div className={`lang-ui${open ? " is-open" : ""}`} onMouseMove={keepAwake}>
      <div className="lang-opts" aria-hidden={!open}>
        <span className="theme-ui-label">Language</span>
        {LANGS.map((l) => (
          <button
            key={l.id}
            type="button"
            className={`lang-opt${lang === l.id ? " is-active" : ""}`}
            onClick={() => {
              apply(l.id);
              keepAwake();
            }}
            title={`Show the display in ${l.id === "en" ? "English" : "Arabic"}  (press L)`}
            aria-pressed={lang === l.id}
            tabIndex={open ? 0 : -1}
            lang={l.id}
          >
            {l.label}
          </button>
        ))}
        <span className="theme-ui-hint">L</span>
      </div>

      <button
        type="button"
        className="ui-btn"
        onClick={() => setOpen((v) => !v)}
        title={open ? "Hide language options" : "Show language options"}
        aria-label={open ? "Hide language options" : "Show language options"}
        aria-expanded={open}
      >
        <TranslateIcon />
      </button>
    </div>
  );
}
