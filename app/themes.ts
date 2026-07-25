export type Theme = {
  /** value written to <html data-theme="…"> and to localStorage */
  id: string;
  /** shown in the picker tooltip */
  label: string;
  /** dot colour in the picker — a representative sample of the background */
  swatch: string;
};

/** Order here defines the number-key shortcuts (1 = first) and cycle order. */
export const THEMES: Theme[] = [
  { id: "navy", label: "Royal Navy", swatch: "#0a1a2f" },
  { id: "emerald", label: "Emerald", swatch: "#06251d" },
  { id: "maroon", label: "Maroon", swatch: "#3a0f18" },
  { id: "royal", label: "Royal Purple", swatch: "#23103f" },
  { id: "azure", label: "Azure Blue", swatch: "#0d2b6b" },
  { id: "black", label: "Onyx Black", swatch: "#0a0a0a" },
  { id: "ivory", label: "Warm Ivory", swatch: "#f3ead6" },
  { id: "white", label: "Pure White", swatch: "#ffffff" },
];

export const DEFAULT_THEME = "navy";
export const STORAGE_KEY = "wd-theme";

export const THEME_IDS = THEMES.map((t) => t.id);
