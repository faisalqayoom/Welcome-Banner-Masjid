/**
 * Contrast audit for the theme palettes.
 *
 * Parses app/themes.css, resolves every theme's tokens (inheriting from the
 * :root/navy block), alpha-composites each text colour over the surface it
 * actually sits on, and reports the WCAG contrast ratio.
 *
 *   node scripts/check-contrast.mjs
 *
 * Targets: this is signage read from across a hall, so every pair must clear
 * 4.5:1 (WCAG AA for normal text) even though the type is far larger than the
 * 3:1 "large text" threshold. Exits non-zero if anything falls short.
 */
import { readFileSync } from "node:fs";

const AA = 4.5;
const css = readFileSync(new URL("../app/themes.css", import.meta.url), "utf8");

/* ---------- parse the token blocks ---------- */
const themes = {};
const blockRe = /(:root,\s*\[data-theme="([\w-]+)"\]|\[data-theme="([\w-]+)"\])\s*\{([^}]*)\}/g;
for (const m of css.matchAll(blockRe)) {
  const name = m[2] || m[3];
  const vars = {};
  for (const d of m[4].matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) vars[d[1]] = d[2].trim();
  themes[name] = vars;
}
const base = themes.navy;
for (const [name, vars] of Object.entries(themes)) {
  if (name !== "navy") themes[name] = { ...base, ...vars };
}

/* ---------- colour helpers ---------- */
const hex = (h) => {
  const v = h.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(v.slice(i, i + 2), 16)).concat(1);
};
function parse(c) {
  c = c.trim();
  if (c.startsWith("#")) return hex(c);
  const m = c.match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const p = m[1].split(",").map((x) => parseFloat(x));
  return [p[0], p[1], p[2], p[3] === undefined ? 1 : p[3]];
}
/** Pull every colour stop out of a gradient (or a plain colour). */
function stops(v) {
  const out = [];
  for (const m of v.matchAll(/#[0-9a-fA-F]{6}|rgba?\([^)]*\)/g)) {
    const c = parse(m[0]);
    if (c) out.push(c);
  }
  return out;
}
const over = (fg, bg) => {
  const a = fg[3];
  return [0, 1, 2].map((i) => fg[i] * a + bg[i] * (1 - a)).concat(1);
};
const lum = (c) => {
  const f = (x) => {
    x /= 255;
    return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]);
};
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

/** Worst-case ratio: every foreground stop against every background stop. */
function worst(fgVal, bgVal, vars) {
  const bgStops = stops(vars[bgVal] ?? bgVal);
  const fgStops = stops(vars[fgVal] ?? fgVal);
  let lo = Infinity;
  let at = null;
  for (const bgRaw of bgStops) {
    // surfaces are themselves translucent — composite them over the stage first
    const stage = stops(vars["--stage-base"]);
    const bg = bgRaw[3] < 1 ? over(bgRaw, stage[stage.length - 1]) : bgRaw;
    for (const fg of fgStops) {
      const r = ratio(over(fg, bg), bg);
      if (r < lo) {
        lo = r;
        at = { fg, bg };
      }
    }
  }
  return { ratio: lo, at };
}

/* ---------- the pairs that actually appear on screen ---------- */
const PAIRS = [
  ["Bismillah Arabic", "--grad-gold", "--stage-base"],
  ["Bismillah English", "--ink-faint", "--stage-base"],
  ["Org name", "--grad-gold", "--stage-base"],
  ["Shar Shali", "--ink-soft", "--stage-base"],
  ["Welcome title", "--grad-hero", "--stage-base"],
  ["Ribbon text", "--ribbon-ink", "--grad-ribbon"],
  ["Ayah / Hadith", "--ink", "--panel"],
  ["Translation", "--ink-soft", "--panel"],
  ["Reference", "--accent-bright", "--panel"],
  ["Strip Arabic", "--grad-gold", "--strip"],
  ["Strip English", "--ink-soft", "--strip"],
  ["Strip sub-line", "--ink-dim", "--strip"],
  ["VENUE label", "--accent-bright", "--stage-base"],
  ["Venue name", "--grad-gold", "--stage-base"],
  ["Venue Arabic", "--ink", "--stage-base"],
  ["Venue org line", "--ink-dim", "--stage-base"],
  ["Icon glyphs", "--accent-bright", "--stage-base"],
  ["Icon labels", "--ink-soft", "--stage-base"],
];

let failures = 0;
for (const name of Object.keys(themes)) {
  const vars = themes[name];
  const rows = PAIRS.map(([label, fg, bg]) => {
    const { ratio: r } = worst(fg, bg, vars);
    return { label, r };
  });
  const bad = rows.filter((x) => x.r < AA);
  failures += bad.length;
  const min = Math.min(...rows.map((r) => r.r));
  console.log(
    `\n${name.toUpperCase().padEnd(9)} worst ${min.toFixed(2)}:1  ${bad.length ? `❌ ${bad.length} below ${AA}` : "✅ all pass"}`,
  );
  for (const row of rows) {
    const flag = row.r < AA ? "  ❌" : "";
    if (row.r < AA || process.env.VERBOSE)
      console.log(`   ${row.label.padEnd(20)} ${row.r.toFixed(2)}:1${flag}`);
  }
}

console.log(
  failures === 0
    ? `\nAll ${Object.keys(themes).length} themes pass WCAG AA (${AA}:1) on all ${PAIRS.length} text pairs.\n`
    : `\n${failures} pair(s) below ${AA}:1.\n`,
);
process.exit(failures === 0 ? 0 : 1);
