import React from "react";

/* Premium Islamic emblem placeholder — a gold medallion with a mosque dome,
   minarets and an open Qur'an. Swap this file for the real organisation logo. */
export default function Logo() {
  return (
    <svg viewBox="0 0 200 200" role="img" aria-label="Organisation emblem">
      <defs>
        <radialGradient id="medal" cx="50%" cy="38%" r="70%">
          <stop offset="0%" stopColor="var(--logo-face-a)" />
          <stop offset="70%" stopColor="var(--logo-face-b)" />
          <stop offset="100%" stopColor="var(--logo-face-c)" />
        </radialGradient>
        <linearGradient id="goldStroke" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent-bright)" />
          <stop offset="50%" stopColor="var(--accent)" />
          <stop offset="100%" stopColor="var(--accent-deep)" />
        </linearGradient>
      </defs>

      <circle cx="100" cy="100" r="94" fill="url(#medal)" stroke="url(#goldStroke)" strokeWidth="3" />
      <circle cx="100" cy="100" r="84" fill="none" stroke="url(#goldStroke)" strokeWidth="1.2" opacity="0.7" />

      {/* decorative dotted ring */}
      <circle cx="100" cy="100" r="78" fill="none" stroke="url(#goldStroke)" strokeWidth="1.4"
        strokeDasharray="1.5 6" opacity="0.8" />

      <g stroke="url(#goldStroke)" strokeWidth="2.6" fill="none"
        strokeLinecap="round" strokeLinejoin="round">
        {/* minarets */}
        <path d="M56 128V74a6 6 0 0 1 12 0v54" />
        <circle cx="62" cy="66" r="4" fill="url(#goldStroke)" stroke="none" />
        <path d="M132 128V74a6 6 0 0 1 12 0v54" />
        <circle cx="138" cy="66" r="4" fill="url(#goldStroke)" stroke="none" />

        {/* central dome */}
        <path d="M78 128V96a22 22 0 0 1 44 0v32" />
        <path d="M100 60c6 4 9 9 9 15" />
        <circle cx="100" cy="55" r="3.4" fill="url(#goldStroke)" stroke="none" />
        {/* arch door */}
        <path d="M92 128v-16a8 8 0 0 1 16 0v16" />

        {/* open book */}
        <path d="M62 150c10-5 26-5 38 0 12-5 28-5 38 0" />
        <path d="M100 150v-9" />
      </g>
    </svg>
  );
}
