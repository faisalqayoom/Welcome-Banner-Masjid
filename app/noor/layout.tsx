import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { DEFAULT_LANG, LANG_STORAGE_KEY } from "./lang";

/* Runs before this route's markup is parsed, so the saved language is already
   on <html> and the kiosk never shows a frame of the wrong one. Same trick the
   root layout uses for the theme; kept here so "/" and "/ijtima" are unaffected. */
const langBootScript = `
(function(){try{
var q=new URLSearchParams(location.search).get('lang');
var l=q||localStorage.getItem(${JSON.stringify(LANG_STORAGE_KEY)})||${JSON.stringify(DEFAULT_LANG)};
if(l!=='en'&&l!=='ar')l=${JSON.stringify(DEFAULT_LANG)};
document.documentElement.setAttribute('data-lang',l);
if(q)localStorage.setItem(${JSON.stringify(LANG_STORAGE_KEY)},l);
}catch(e){document.documentElement.setAttribute('data-lang',${JSON.stringify(DEFAULT_LANG)});}})();
`.trim();

/* Loaded on this route only, so "/" and "/ijtima" never pay for the download.
   A different type pairing from the other two displays on purpose: a high-
   contrast Didone-ish serif for display copy and a geometric grotesque for
   the UI chrome. Arabic keeps Amiri, which the root layout already provides. */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "block",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "block",
});

export const metadata: Metadata = {
  title: "Welcome — Masjid Khadijah Tul Kubra",
  description: "Glass welcome display",
};

export default function NoorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${cormorant.variable} ${manrope.variable}`}>
      <script dangerouslySetInnerHTML={{ __html: langBootScript }} />
      {children}
    </div>
  );
}
