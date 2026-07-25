import React from "react";

function Lantern({ className, scale = 1 }: { className: string; scale?: number }) {
  return (
    <div
      className={`lantern ${className}`}
      style={{ width: `calc(var(--u) * ${(3.2 * scale).toFixed(2)})` }}
    >
      <svg viewBox="0 0 60 150" style={{ width: "100%", height: "auto" }}>
        <defs>
          <linearGradient id="lanGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent-bright)" />
            <stop offset="60%" stopColor="var(--accent)" />
            <stop offset="100%" stopColor="var(--accent-deep)" />
          </linearGradient>
        </defs>
        <line x1="30" y1="0" x2="30" y2="34" stroke="var(--accent)" strokeWidth="1.4" />
        <circle cx="30" cy="36" r="3" fill="var(--accent-bright)" />
        <path d="M20 40h20l4 8H16z" fill="none" stroke="var(--accent)" strokeWidth="1.6" />
        {/* body */}
        <path
          d="M18 48c-6 10-6 40 0 52 4 8 20 8 24 0 6-12 6-42 0-52z"
          fill="var(--border-glow)"
          stroke="var(--accent)"
          strokeWidth="1.6"
        />
        <ellipse cx="30" cy="76" rx="9" ry="14" fill="url(#lanGlow)" opacity="0.85" />
        <path d="M18 60h24M18 92h24" stroke="var(--accent)" strokeWidth="1.2" opacity="0.6" />
        <path d="M22 100h16l-3 10H25z" fill="none" stroke="var(--accent)" strokeWidth="1.6" />
        <circle cx="30" cy="116" r="3" fill="var(--accent-bright)" />
      </svg>
    </div>
  );
}

export default function Decorations() {
  const particles = Array.from({ length: 16 });
  return (
    <div className="deco" aria-hidden="true">
      {/* geometric pattern wash — viewBox-driven so the tile scales with the
          display instead of staying a fixed 90px at every resolution */}
      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.5 }}
      >
        <defs>
          <pattern id="stars" width="90" height="90" patternUnits="userSpaceOnUse">
            <g className="pattern-tile" fill="none" strokeWidth="1">
              <path d="M45 12 52 33 74 33 56 46 63 68 45 55 27 68 34 46 16 33 38 33z" />
              <circle cx="45" cy="45" r="6" />
            </g>
          </pattern>
        </defs>
        <rect width="1600" height="900" fill="url(#stars)" />
      </svg>

      {/* soft light rays from above + central glow */}
      <div className="rays" />
      <div className="glow" />

      {/* side arches */}
      <svg style={{ position: "absolute", top: 0, left: 0, height: "100%", width: "calc(var(--u) * 18)" }}
        viewBox="0 0 180 500" preserveAspectRatio="none">
        <path className="arch-line" fill="none" strokeWidth="2"
          d="M-40 500V120C-40 40 40 0 90 60 140 0 220 40 220 120V500" />
        <path className="arch-line" fill="none" strokeWidth="1" opacity="0.6"
          d="M-20 500V140C-20 70 40 40 80 90 120 40 200 70 200 140V500" />
      </svg>
      <svg style={{ position: "absolute", top: 0, right: 0, height: "100%", width: "calc(var(--u) * 18)", transform: "scaleX(-1)" }}
        viewBox="0 0 180 500" preserveAspectRatio="none">
        <path className="arch-line" fill="none" strokeWidth="2"
          d="M-40 500V120C-40 40 40 0 90 60 140 0 220 40 220 120V500" />
        <path className="arch-line" fill="none" strokeWidth="1" opacity="0.6"
          d="M-20 500V140C-20 70 40 40 80 90 120 40 200 70 200 140V500" />
      </svg>

      {/* mosque silhouette skyline along the bottom */}
      <svg style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "calc(var(--v) * 22)" }}
        viewBox="0 0 1600 220" preserveAspectRatio="none">
        <g className="mosque-sil">
          <path d="M0 220V150c40 0 60-20 60-50 0 30 20 50 60 50v70z" />
          <path d="M150 220V120c60-4 90-40 100-80 10 40 40 76 100 80v100z" />
          <rect x="196" y="60" width="8" height="60" />
          <rect x="336" y="60" width="8" height="60" />
          <path d="M420 220V150c50 0 70-24 70-56 0 32 20 56 70 56v70z" />
          <path d="M620 220V110c70-4 100-46 112-92 12 46 42 88 112 92v110z" />
          <rect x="676" y="46" width="9" height="64" />
          <rect x="856" y="46" width="9" height="64" />
          <path d="M980 220V150c50 0 70-24 70-56 0 32 20 56 70 56v70z" />
          <path d="M1180 220V125c60-4 92-42 102-82 10 40 42 78 102 82v95z" />
          <rect x="1226" y="58" width="8" height="67" />
          <rect x="1396" y="58" width="8" height="67" />
          <path d="M1500 220V150c40 0 60-20 60-50 0 30 24 50 60 50v70z" />
        </g>
      </svg>

      {/* hanging lanterns */}
      <Lantern className="l1" scale={1.05} />
      <Lantern className="l2" scale={0.85} />
      <Lantern className="l3" scale={1.05} />
      <Lantern className="l4" scale={0.85} />

      {/* rising particles */}
      <div className="particles">
        {particles.map((_, i) => {
          const left = (i * 6.1 + 4) % 96;
          const dur = 16 + (i % 6) * 4;
          const delay = -(i * 1.7);
          const size = 0.18 + (i % 4) * 0.08;
          return (
            <span
              key={i}
              style={{
                left: `${left}%`,
                width: `calc(var(--u) * ${size.toFixed(2)})`,
                height: `calc(var(--u) * ${size.toFixed(2)})`,
                animationDuration: `${dur}s`,
                animationDelay: `${delay}s`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
