import React from "react";
import fs from "node:fs";
import path from "node:path";
import "./ijtima.css";

/**
 * Finds the banner artwork in public/backgrounds at build time, whatever it is
 * called. Any .jpg/.png/.webp/.avif dropped in that folder is picked up, so the
 * page never breaks over a filename or extension mismatch. A file named
 * ijtima-bg.* wins if several are present.
 */
function findBackgroundUrl(): string | null {
  try {
    const dir = path.join(process.cwd(), "public", "backgrounds");
    const images = fs
      .readdirSync(dir)
      .filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f))
      .sort();
    const pick = images.find((f) => /^ijtima-bg\./i.test(f)) ?? images[0];
    return pick ? `/backgrounds/${encodeURIComponent(pick)}` : null;
  } catch {
    return null;
  }
}

/* ---------- inline line icons for the venue / date / time strip ---------- */

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3.2" y="5" width="17.6" height="16" rx="2.4" />
      <path d="M3.2 10h17.6M8 3v4M16 3v4" />
      <path d="M7.4 14h2.2M11 14h2.2M14.6 14h2.2M7.4 17.4h2.2M11 17.4h2.2" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 6.8V12l3.4 2.2" />
    </svg>
  );
}

/** Small gold flourish used either side of the sub-title. */
function Flourish({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      className="ij-flourish"
      viewBox="0 0 120 20"
      aria-hidden="true"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <path d="M0 10h64" />
      <path d="M78 10c0-4 3.4-7 7.4-7s7.4 3 7.4 7-3.4 7-7.4 7-7.4-3-7.4-7z" />
      <path d="M85.4 4.4 90 10l-4.6 5.6L80.8 10z" />
      <path d="M100 10h20" />
      <circle cx="70" cy="10" r="2.4" />
    </svg>
  );
}

/** Corner ornament for the green welcome lozenge. */
function PanelOrnament({ className }: { className: string }) {
  return (
    <svg className={`ij-orn ${className}`} viewBox="0 0 64 64" aria-hidden="true">
      <path d="M32 6c3 9 9 15 18 18-9 3-15 9-18 18-3-9-9-15-18-18 9-3 15-9 18-18z" />
      <circle cx="32" cy="32" r="4.6" />
      <path d="M32 2v6M32 56v6M2 32h6M56 32h6" />
    </svg>
  );
}

export default function IjtimaPage() {
  const bg = findBackgroundUrl();

  return (
    <main className="ij-frame">
      <div
        className="ij-stage"
        style={
          bg
            ? ({ "--ij-bg": `url("${bg}")` } as React.CSSProperties)
            : undefined
        }
      >
        <div className="ij-content">
          {/* ---------- Bismillah ---------- */}
          <div className="ij-bismillah">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ</div>

          {/* ---------- Main title ---------- */}
          <h1 className="ij-title">دینی اجتماع</h1>

          {/* ---------- Sub-title with flourishes ---------- */}
          <div className="ij-subtitle">
            <Flourish />
            <span>علم، عمل اور دعوت کی ایک مبارک نشست</span>
            <Flourish flip />
          </div>

          {/* ---------- Green welcome lozenge ---------- */}
          <section className="ij-welcome">
            <PanelOrnament className="is-right" />
            <PanelOrnament className="is-left" />
            <div className="ij-welcome-title">خوش آمدید</div>
            <p className="ij-welcome-body">
              تمام معزز علماء کرام، معزز مہمانانِ گرامی اور حاضرینِ مجلس کو
              جمعیت اہل حدیث شار شالی کی جانب سے دلی خوش آمدید۔
            </p>
          </section>

          {/* ---------- Two quote cards ----------
              The container is RTL, so the FIRST child lands on the right.
              Reference artwork puts the hadith on the right and the Qur'anic
              ayah on the left, hence this order. */}
          <section className="ij-quotes">
            {/* Hadith — right */}
            <article className="ij-quote">
              <div className="ij-quote-ar">
                «مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ»
              </div>
              <p className="ij-quote-ur">
                جو شخص علم حاصل کرنے کے لیے کسی راستے پر چلتا ہے، اللہ تعالیٰ اس
                کے لیے جنت کا راستہ آسان فرما دیتا ہے۔
              </p>
              <div className="ij-quote-ref">(صحیح مسلم)</div>
            </article>

            <span className="ij-quote-divider" aria-hidden="true">
              <PanelOrnament className="is-mid" />
            </span>

            {/* Qur'an — left */}
            <article className="ij-quote">
              <div className="ij-quote-ar">﴿وَقُل رَّبِّ زِدْنِي عِلْمًا﴾</div>
              <p className="ij-quote-ur">
                اور کہیے: اے میرے رب! میرے علم میں اضافہ فرما۔
              </p>
              <div className="ij-quote-ref">(سورۃ طٰہٰ: 114)</div>
            </article>
          </section>

          {/* ---------- Venue / date / time ----------
              RTL container, so first child sits on the right. Reference order
              left-to-right is venue · date · time, i.e. reversed here. */}
          <section className="ij-info">
            <div className="ij-info-item">
              <span className="ij-info-icon">
                <ClockIcon />
              </span>
              <span className="ij-info-text">
                <span className="ij-info-main">بعد نماز عصر</span>
                <span className="ij-info-sub">تا نماز مغرب</span>
              </span>
            </div>

            <span className="ij-info-sep" aria-hidden="true" />

            <div className="ij-info-item">
              <span className="ij-info-icon">
                <CalendarIcon />
              </span>
              <span className="ij-info-text">
                <span className="ij-info-date">27</span>
                <span className="ij-info-sub">جولائی 2026</span>
              </span>
            </div>

            <span className="ij-info-sep" aria-hidden="true" />

            <div className="ij-info-item">
              <span className="ij-info-icon">
                <PinIcon />
              </span>
              <span className="ij-info-text">
                <span className="ij-info-main">مسجد خدیجۃ الکبریٰ</span>
                <span className="ij-info-sub">(رضی اللہ عنہا)</span>
              </span>
            </div>
          </section>

          {/* ---------- General invitation ---------- */}
          <div className="ij-invite">
            <b>دعوتِ عام</b>
            <span className="ij-dot" aria-hidden="true" />
            <span>تمام مسلمان بھائیوں سے شرکت کی گزارش ہے</span>
          </div>

          {/* ---------- Organisation footer band ---------- */}
          <footer className="ij-org">
            <div className="ij-org-row">
              <PanelOrnament className="is-small" />
              <h2 className="ij-org-name">جمعیت اہل حدیث شار شالی</h2>
              <PanelOrnament className="is-small" />
            </div>
            <div className="ij-org-sub">
              <span>تحصیل پانپور</span>
              <span className="ij-dot" aria-hidden="true" />
              <span>ضلع پلوامہ</span>
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}
