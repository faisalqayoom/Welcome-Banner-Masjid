import type { Metadata, Viewport } from "next";
import { Amiri, Cinzel, Poppins } from "next/font/google";
import "./globals.css";
import { THEME_IDS, DEFAULT_THEME, STORAGE_KEY } from "./themes";

/* Runs before first paint so the saved theme is already on <html> — otherwise
   the kiosk would flash the default navy for a frame on every boot. */
const themeBootScript = `
(function(){try{
var ok=${JSON.stringify(THEME_IDS)};
var q=new URLSearchParams(location.search).get('theme');
var t=q||localStorage.getItem(${JSON.stringify(STORAGE_KEY)})||${JSON.stringify(DEFAULT_THEME)};
if(ok.indexOf(t)<0)t=${JSON.stringify(DEFAULT_THEME)};
document.documentElement.setAttribute('data-theme',t);
if(q)localStorage.setItem(${JSON.stringify(STORAGE_KEY)},t);
}catch(e){document.documentElement.setAttribute('data-theme',${JSON.stringify(DEFAULT_THEME)});}})();
`.trim();

/* display: "block" — on signage the fonts are served locally next to the page,
   so a brief block beats a visible unstyled flash on every kiosk boot. */
const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "block",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-cinzel",
  display: "block",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-poppins",
  display: "block",
});

export const metadata: Metadata = {
  title: "Deeni Ijtima — Masjid Khadijah Tul Kubra",
  description: "Digital welcome display",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#050f1e",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme={DEFAULT_THEME}
      suppressHydrationWarning
      className={`${amiri.variable} ${cinzel.variable} ${poppins.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
