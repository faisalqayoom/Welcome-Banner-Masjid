import type { Metadata, Viewport } from "next";
import { Amiri, Cinzel, Poppins } from "next/font/google";
import "./globals.css";

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
      className={`${amiri.variable} ${cinzel.variable} ${poppins.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
