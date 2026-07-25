import type { Metadata } from "next";
import { Noto_Nastaliq_Urdu, Amiri } from "next/font/google";

/* Loaded here rather than in the root layout so the welcome page at "/" is
   completely unaffected — it never pays for the Nastaliq download. */
const nastaliq = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-nastaliq",
  display: "block",
});

const amiriIjtima = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri-ij",
  display: "block",
});

export const metadata: Metadata = {
  title: "دینی اجتماع — جمعیت اہل حدیث شار شالی",
  description: "Deeni Ijtima announcement display",
};

export default function IjtimaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${nastaliq.variable} ${amiriIjtima.variable}`}>
      {children}
    </div>
  );
}
