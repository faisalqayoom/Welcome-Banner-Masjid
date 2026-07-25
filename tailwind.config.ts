import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0a1a2f",
          deep: "#050f1e",
          mid: "#122b4a",
          soft: "#1b3a5c",
        },
        emerald: {
          deep: "#0c4a3e",
          DEFAULT: "#12715c",
          soft: "#1c8f74",
        },
        gold: {
          DEFAULT: "#c9a24b",
          bright: "#e6c877",
          deep: "#a67c2e",
          antique: "#b8912f",
        },
        ivory: "#f7f1e1",
        beige: "#e9dcc2",
      },
      fontFamily: {
        arabic: ["var(--font-amiri)", "serif"],
        cinzel: ["var(--font-cinzel)", "serif"],
        poppins: ["var(--font-poppins)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
