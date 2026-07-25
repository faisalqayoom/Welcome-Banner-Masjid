import React from "react";

/* Precise geometry, generated rather than eyeballed:
   8-point khatam (seal-of-Solomon star) for the dome window, 4-point sparkles
   flanking the rule, and a 56-bead ring at r=85. */
const KHATAM =
  "M100.00,89.00 101.30,93.86 105.66,91.34 103.14,95.70 108.00,97.00 103.14,98.30 105.66,102.66 101.30,100.14 100.00,105.00 98.70,100.14 94.34,102.66 96.86,98.30 92.00,97.00 96.86,95.70 94.34,91.34 98.70,93.86Z";
const SPARK_LEFT =
  "M64.00,137.40 65.06,140.94 68.60,142.00 65.06,143.06 64.00,146.60 62.94,143.06 59.40,142.00 62.94,140.94Z";
const SPARK_RIGHT =
  "M136.00,137.40 137.06,140.94 140.60,142.00 137.06,143.06 136.00,146.60 134.94,143.06 131.40,142.00 134.94,140.94Z";

const BEAD_COUNT = 56;
const BEADS = Array.from({ length: BEAD_COUNT }, (_, i) => {
  const a = (i * 2 * Math.PI) / BEAD_COUNT;
  return {
    cx: +(100 + 85 * Math.cos(a)).toFixed(2),
    cy: +(100 + 85 * Math.sin(a)).toFixed(2),
  };
});

/** One minaret; mirrored for the opposite side. */
function Minaret({ cx }: { cx: number }) {
  return (
    <g>
      {/* cap dome */}
      <path
        d={`M${cx - 4.4},86 C${cx - 4.4},78 ${cx},72.5 ${cx},72.5 C${cx},72.5 ${cx + 4.4},78 ${cx + 4.4},86 Z`}
      />
      {/* finial */}
      <path d={`M${cx - 0.55},72.5 H${cx + 0.55} V66.5 H${cx - 0.55} Z`} />
      <circle cx={cx} cy={64.8} r="1.7" />
      {/* shaft */}
      <path d={`M${cx - 3.6},86 H${cx + 3.6} V131 H${cx - 3.6} Z`} />
      {/* balcony */}
      <path d={`M${cx - 6.4},96.5 H${cx + 6.4} V100.5 H${cx - 6.4} Z`} />
    </g>
  );
}

/**
 * Emblem for Masjid Khadijah Tul Kubra (رضي الله عنها).
 *
 * A circular seal: beaded outer ring, a central ogee dome flanked by two
 * minarets over an arched mihrab door, an 8-point khatam as the dome window,
 * and the masjid's name in Arabic along the base. No figurative imagery —
 * architecture, geometry and calligraphy only.
 *
 * Every colour resolves through the theme tokens, so the emblem re-tints with
 * the banner: bright gold on the dark themes, antique bronze on the light ones.
 */
export default function Logo() {
  return (
    <svg viewBox="0 0 200 200" role="img" aria-label="Masjid Khadijah Tul Kubra emblem">
      <defs>
        <radialGradient id="lg-face" cx="50%" cy="34%" r="76%">
          <stop offset="0%" stopColor="var(--logo-face-a)" />
          <stop offset="66%" stopColor="var(--logo-face-b)" />
          <stop offset="100%" stopColor="var(--logo-face-c)" />
        </radialGradient>
        <linearGradient id="lg-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent-bright)" />
          <stop offset="52%" stopColor="var(--accent)" />
          <stop offset="100%" stopColor="var(--accent-deep)" />
        </linearGradient>
      </defs>

      {/* ---- rings ---- */}
      <circle cx="100" cy="100" r="96" fill="url(#lg-face)" stroke="url(#lg-gold)" strokeWidth="2.6" />
      <g fill="url(#lg-gold)" opacity="0.85">
        {BEADS.map((b, i) => (
          <circle key={i} cx={b.cx} cy={b.cy} r="1.05" />
        ))}
      </g>
      <circle cx="100" cy="100" r="79" fill="none" stroke="url(#lg-gold)" strokeWidth="1.1" />
      <circle cx="100" cy="100" r="76.4" fill="none" stroke="url(#lg-gold)" strokeWidth="0.55" opacity="0.5" />

      {/* ---- architecture ---- */}
      <g fill="url(#lg-gold)" stroke="none">
        <Minaret cx={57} />
        <Minaret cx={143} />

        {/* ogee dome */}
        <path d="M76,112 C76,90 86,72 100,63 C114,72 124,90 124,112 Z" />
        {/* finial + crescent */}
        <path d="M99.3,63 H100.7 V52 H99.3 Z" />
        <circle cx="100" cy="49.6" r="2.6" />
        <path d="M100,36.6 a6,6 0 1 0 4.6,9.9 A4.7,4.7 0 1 1 100,36.6 Z" />

        {/* drum + plinth */}
        <path d="M73,112 H127 V131 H73 Z" />
        <path d="M44,131 H156 V135.6 H44 Z" />
      </g>

      {/* dome window and mihrab door, knocked out so they read as openings */}
      <path d={KHATAM} fill="url(#lg-face)" stroke="url(#lg-gold)" strokeWidth="0.9" />
      <path
        d="M92,131 V123 a8,8 0 0 1 16,0 V131 Z"
        fill="url(#lg-face)"
        stroke="url(#lg-gold)"
        strokeWidth="0.9"
      />

      {/* ---- rule + sparkles ---- */}
      <g fill="url(#lg-gold)">
        <path d="M70,141.4 H130 V142.6 H70 Z" opacity="0.75" />
        <path d={SPARK_LEFT} />
        <path d={SPARK_RIGHT} />
      </g>

      {/* ---- name ---- */}
      <text
        x="100"
        y="162"
        textAnchor="middle"
        direction="rtl"
        fill="url(#lg-gold)"
        style={{ fontFamily: "var(--font-amiri), serif", fontSize: 12, fontWeight: 700 }}
      >
        مسجد خديجة الكبرى
      </text>
    </svg>
  );
}
