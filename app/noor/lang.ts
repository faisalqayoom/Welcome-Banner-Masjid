/** Language of the glass display: Arabic (with English translations under
    each quote) or fully English. */
export type Lang = "ar" | "en";

export const LANGS: { id: Lang; label: string; short: string }[] = [
  { id: "ar", label: "العربية", short: "AR" },
  { id: "en", label: "English", short: "EN" },
];

export const DEFAULT_LANG: Lang = "ar";
export const LANG_STORAGE_KEY = "wd-lang";
