import React from "react";
import Logo from "../components/Logo";
import DisplayControls from "../components/DisplayControls";
import ThemePicker from "../components/ThemePicker";
import FullscreenButton from "../components/FullscreenButton";
import LanguagePicker from "./LanguagePicker";
import { ICONS } from "../components/Icons";
import LiveClock from "./LiveClock";
import "./noor.css";

/* ------------------------------------------------------------------
   Small inline marks. Kept here rather than in components/Icons so the
   other two displays are completely unaffected by this route.
   ------------------------------------------------------------------ */

/** Open book — marks the Qur'an card. */
function BookMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 6.4C9.8 5 7 4.6 4 5v13c3-.4 5.8 0 8 1.4 2.2-1.4 5-1.8 8-1.4V5c-3-.4-5.8 0-8 1.4z" />
      <path d="M12 6.4v13" />
    </svg>
  );
}

/** Crescent + star — marks the hadith card. */
function CrescentMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M15.6 4.2a8 8 0 1 0 4.2 12.4 6.6 6.6 0 0 1-4.2-12.4z" />
      <path d="M18.6 7.2l.7 1.5 1.6.2-1.2 1.1.3 1.6-1.4-.8-1.4.8.3-1.6-1.2-1.1 1.6-.2z" />
    </svg>
  );
}

/** Location pin for the venue block. */
function PinMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 21s6.6-5.8 6.6-10.4a6.6 6.6 0 1 0-13.2 0C5.4 15.2 12 21 12 21z" />
      <circle cx="12" cy="10.4" r="2.4" />
    </svg>
  );
}

/** Hairline + diamond, used either side of a heading. */
function Rule({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      className="gl-rule"
      viewBox="0 0 100 8"
      aria-hidden="true"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <path d="M0 4h74" />
      <path d="M84 4 88 0.6 92 4 88 7.4z" />
      <path d="M96 4h4" />
    </svg>
  );
}

export default function NoorPage() {
  return (
    <main className="gl-frame">
      <DisplayControls>
        <LanguagePicker />
        <ThemePicker />
        <FullscreenButton />
      </DisplayControls>

      <div className="gl-stage">
        {/* ---------- ambient light behind the glass ---------- */}
        <div className="gl-bg" aria-hidden="true">
          <span className="gl-orb gl-orb-a" />
          <span className="gl-orb gl-orb-b" />
          <span className="gl-orb gl-orb-c" />
          <span className="gl-beam" />
          <span className="gl-mesh" />
          <span className="gl-arc" />
        </div>
        <div className="gl-grain" aria-hidden="true" />
        <div className="gl-vignette" aria-hidden="true" />
        <div className="gl-edge" aria-hidden="true" />

        {/* ---------- bento layout ---------- */}
        <div className="gl-bento">
          {/* ============ HERO ============ */}
          <section className="gl-card gl-hero">
            <span className="gl-sheen" aria-hidden="true" />

            <div className="gl-pill">
              <span className="gl-bismillah arabic-x gl-ar-only">
                بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيمِ
              </span>
              <span className="gl-bismillah-en gl-en-only">
                In the Name of Allah, the Most Compassionate, the Most Merciful
              </span>
            </div>

            <h1 className="gl-hero-display gl-hero-ar arabic-x gl-ar-only">
              مَرْحَبًا بِكُمْ فِي بَيْتِ اللَّهِ
            </h1>
            <h1 className="gl-hero-display gl-hero-en-title gl-en-only">
              Welcome to the House of Allah
            </h1>

            <div className="gl-hero-strap">
              <Rule />
              <span className="gl-ar-only">WELCOME TO THE HOUSE OF ALLAH</span>
              <span className="gl-en-only">
                PEACE, MERCY AND BLESSINGS OF ALLAH BE UPON YOU
              </span>
              <Rule flip />
            </div>

            <div className="gl-hero-salam gl-ar-only">
              <span className="arabic-x">السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ</span>
              <span className="gl-dot" aria-hidden="true" />
              <span className="gl-hero-salam-en">
                Peace, mercy and blessings of Allah be upon you
              </span>
            </div>
          </section>

          {/* ============ IDENTITY + VENUE RAIL ============ */}
          <aside className="gl-card gl-rail">
            <span className="gl-sheen" aria-hidden="true" />

            <div className="gl-crest">
              <span className="gl-crest-halo" aria-hidden="true" />
              <div className="gl-crest-disc">
                <Logo />
              </div>
            </div>

            <div className="gl-org">
              <div className="gl-org-main">JAMIAT AHLE HADEES</div>
              <div className="gl-org-sub">SHAR SHALI</div>
            </div>

            <div className="gl-hairline" />

            <div className="gl-venue">
              <div className="gl-venue-label">
                <span className="gl-venue-icon">
                  <PinMark />
                </span>
                VENUE
              </div>
              <div className="gl-venue-name">
                MASJID KHADIJAH
                <br />
                TUL KUBRA
              </div>
              <div className="gl-venue-ar arabic-x gl-ar-only">(رضي الله عنها)</div>
              <div className="gl-venue-ar gl-en-only">
                (may Allah be pleased with her)
              </div>
              <div className="gl-venue-addr">Tehsil Pampore · District Pulwama</div>
            </div>

            <LiveClock />
          </aside>

          {/* ============ QUR'AN ============ */}
          <article className="gl-card gl-quote gl-quote-quran">
            <span className="gl-sheen" aria-hidden="true" />

            <header className="gl-quote-head">
              <span className="gl-badge">
                <BookMark />
              </span>
              <span className="gl-quote-kicker">
                THE QUR&rsquo;AN
                <em>Surah At-Tawbah · 9:18</em>
              </span>
            </header>

            <div className="gl-quote-body">
              <blockquote className="gl-quote-ar arabic-x gl-ar-only">
                إِنَّمَا يَعْمُرُ مَسَاجِدَ اللَّهِ مَنْ آمَنَ بِاللَّهِ وَالْيَوْمِ الْآخِرِ وَأَقَامَ الصَّلَاةَ وَآتَى الزَّكَاةَ
              </blockquote>

              <p className="gl-quote-en">
                The mosques of Allah are only to be maintained by those who
                believe in Allah and the Last Day, establish prayer and give
                zakah.
              </p>
            </div>

            <footer className="gl-quote-foot">
              <span className="gl-quote-foot-rule" />
              <span className="arabic-x gl-ar-only">سورة التوبة</span>
              <span className="gl-en-only">Surah At-Tawbah</span>
            </footer>
          </article>

          {/* ============ HADITH ============ */}
          <article className="gl-card gl-quote gl-quote-hadith">
            <span className="gl-sheen" aria-hidden="true" />

            <header className="gl-quote-head">
              <span className="gl-badge">
                <CrescentMark />
              </span>
              <span className="gl-quote-kicker">
                THE SUNNAH
                <em>Sahih al-Bukhari · 662</em>
              </span>
            </header>

            <div className="gl-quote-body">
              <blockquote className="gl-quote-ar arabic-x gl-ar-only">
                مَنْ غَدَا إِلَى الْمَسْجِدِ أَوْ رَاحَ أَعَدَّ اللَّهُ لَهُ فِي الْجَنَّةِ نُزُلًا كُلَّمَا غَدَا أَوْ رَاحَ
              </blockquote>

              <p className="gl-quote-en">
                Whoever goes to the mosque in the morning or in the evening,
                Allah prepares for him an honourable place in Paradise each
                time he goes.
              </p>
            </div>

            <footer className="gl-quote-foot">
              <span className="gl-quote-foot-rule" />
              <span className="arabic-x gl-ar-only">قال رسول الله ﷺ</span>
              <span className="gl-en-only">The Messenger of Allah ﷺ said</span>
            </footer>
          </article>

          {/* ============ FOOTER BAR ============ */}
          <footer className="gl-card gl-bar">
            <span className="gl-sheen" aria-hidden="true" />

            <div className="gl-bar-quote">
              <div className="gl-bar-ar arabic-x gl-ar-only">
                أَحَبُّ الْبِلَادِ إِلَى اللَّهِ مَسَاجِدُهَا
              </div>
              <div className="gl-bar-en">
                The most beloved of places to Allah are its mosques
                <em>Sahih Muslim · 671</em>
              </div>
            </div>

            <span className="gl-bar-sep" aria-hidden="true" />

            <div className="gl-chips">
              {ICONS.map(({ Comp, label }) => (
                <div className="gl-chip" key={label}>
                  <Comp />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}
