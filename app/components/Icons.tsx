import React from "react";

const common = {
  viewBox: "0 0 48 48",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function QuranIcon() {
  return (
    <svg {...common}>
      <path d="M24 12c-4-2.5-9-3-13-2v25c4-1 9-.6 13 2 4-2.6 9-3 13-2V10c-4-1-9-.5-13 2z" />
      <path d="M24 12v27" />
      <path d="M13 18h6M13 23h6M29 18h6M29 23h6" />
    </svg>
  );
}

export function SunnahIcon() {
  return (
    <svg {...common}>
      <path d="M30 8a13 13 0 1 0 8 23A11 11 0 0 1 30 8z" />
      <path d="M33 20l1.6 3.3 3.6.5-2.6 2.5.6 3.6-3.2-1.7-3.2 1.7.6-3.6-2.6-2.5 3.6-.5z" />
    </svg>
  );
}

export function KnowledgeIcon() {
  return (
    <svg {...common}>
      <path d="M6 18 24 10l18 8-18 8z" />
      <path d="M13 21v9c0 2.5 5 5 11 5s11-2.5 11-5v-9" />
      <path d="M42 18v9" />
    </svg>
  );
}

export function CharacterIcon() {
  return (
    <svg {...common}>
      <path d="M24 39s-13-7.5-16-16.5C6 16 10 11 16 11c3.5 0 6 2 8 4.5C26 13 28.5 11 32 11c6 0 10 5 8 11.5C37 31.5 24 39 24 39z" />
    </svg>
  );
}

export function BenefitIcon() {
  return (
    <svg {...common}>
      <path d="M24 6l3.6 7.3 8 1.2-5.8 5.7 1.4 8-7.2-3.8-7.2 3.8 1.4-8-5.8-5.7 8-1.2z" />
      <path d="M17 30l3.5 3.5L28 26" />
      <path d="M14 40h20" />
    </svg>
  );
}

export const ICONS = [
  { Comp: QuranIcon, label: "Quran" },
  { Comp: SunnahIcon, label: "Sunnah" },
  { Comp: KnowledgeIcon, label: "Knowledge" },
  { Comp: CharacterIcon, label: "Good Character" },
  { Comp: BenefitIcon, label: "Practical Benefit" },
];
