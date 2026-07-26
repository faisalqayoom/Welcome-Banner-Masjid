import Decorations from "./components/Decorations";
import Logo from "./components/Logo";
import ThemePicker from "./components/ThemePicker";
import DisplayControls from "./components/DisplayControls";
import FullscreenButton from "./components/FullscreenButton";
import WallClock from "./components/WallClock";

export default function Page() {
  return (
    <main className="frame">
      <DisplayControls>
        <ThemePicker />
        <FullscreenButton />
      </DisplayControls>
      <div className="stage">
        <Decorations />
        <div className="stage-border" />
        <WallClock />

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

          {/* ---------- The ayah ----------
              One panel, set large. A banner read from the back of a hall can
              carry one verse properly or three quotes badly; this is the
              former. */}
          <section className="panels">
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

          {/* ---------- Centre strip ---------- */}
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

        </div>
      </div>
    </main>
  );
}
