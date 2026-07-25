import React from "react";
import Decorations from "./components/Decorations";
import Logo from "./components/Logo";
import { ICONS } from "./components/Icons";

export default function Page() {
  return (
    <main className="frame">
      <div className="stage">
        <Decorations />
        <div className="stage-border" />

        <div className="content">
          {/* ---------- Bismillah ---------- */}
          <section className="bismillah">
            <div className="arabic ar gold-text">
              بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيمِ
            </div>
            <div className="en poppins">
              In the Name of Allah, the Most Compassionate, the Most Merciful
            </div>
          </section>

          {/* ---------- Organization ---------- */}
          <section style={{ width: "100%" }}>
            <div className="org">
              <div className="org-logo">
                <Logo />
              </div>
              <div className="org-titles">
                <div className="main cinzel gold-text">JAMAIT AHLE HADEES</div>
                <div className="sub cinzel ivory-text">SHAR SHALI</div>
              </div>
            </div>
            <div className="org-rule" />
          </section>

          {/* ---------- Main welcome ---------- */}
          <section className="welcome">
            <div className="arabic ar">أَهْلًا وَسَهْلًا مَرْحَبًا</div>
          </section>

          {/* ---------- Two panels ----------
              Ordered for right-to-left reading: the Qur'an panel sits on the
              RIGHT (read first), the Hadith panel on the LEFT (read second). */}
          <section className="panels">
            {/* Hadith — left */}
            <div className="panel">
              <span className="corner tl" />
              <span className="corner tr" />
              <span className="corner bl" />
              <span className="corner br" />
              <span className="ribbon arabic">قال رسول الله ﷺ</span>
              <div className="arabic ayah">
                مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ
              </div>
              <div className="trans">
                Whoever treads a path in search of knowledge, Allah will make easy
                for him a path to Paradise.
              </div>
              <div className="ref">Sahih Muslim</div>
            </div>

            {/* Qur'an — right */}
            <div className="panel">
              <span className="corner tl" />
              <span className="corner tr" />
              <span className="corner bl" />
              <span className="corner br" />
              <span className="ribbon arabic">قال الله تعالى</span>
              <div className="arabic ayah">
                يَرْفَعِ اللَّهُ الَّذِينَ آمَنُوا مِنكُمْ وَالَّذِينَ أُوتُوا الْعِلْمَ دَرَجَاتٍ
              </div>
              <div className="trans">
                Allah will raise those who have believed among you and those who
                have been given knowledge by degrees.
              </div>
              <div className="ref">Surah Al-Mujadilah · 58:11</div>
            </div>
          </section>

          {/* ---------- Center strip ---------- */}
          <section className="strip">
            <div className="ar gold-text">العِلْمُ قَبْلَ القَوْلِ وَالعَمَلِ</div>
            <div className="en">Knowledge is acquired before speech and action</div>
          </section>

          {/* ---------- Venue ---------- */}
          <section className="venue">
            <div className="label">VENUE</div>
            <div className="name gold-text">MASJID KHADIJAH TUL KUBRA</div>
            <div className="arabic ar">(رضي الله عنها)</div>
            <div className="org-line">Jamiat Ahle Hadees · Shar Shali</div>
          </section>

          {/* ---------- Dawah strip ---------- */}
          <section className="strip">
            <div className="ar gold-text">الدعوة إلى الله تعالى علم وعمل</div>
            <div className="en">Dawah to Allah is Knowledge and Action</div>
            <div className="en small">
              Let us seek beneficial knowledge and act upon it
            </div>
          </section>

          {/* ---------- Bottom icons ---------- */}
          <section className="icons">
            {ICONS.map(({ Comp, label }, i) => (
              <React.Fragment key={label}>
                {i > 0 && <span className="icon-sep" />}
                <div className="icon-item">
                  <Comp />
                  <span className="lbl">{label}</span>
                </div>
              </React.Fragment>
            ))}
          </section>
        </div>
      </div>
    </main>
  );
}
