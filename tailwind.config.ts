import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./styles/**/*.css"
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#FFFFFF",
        sage: "#A8B5A2",
        moss: "#6F7F69",
        pearl: "#F7F8F4",
        mist: "#EEF2EA",
        ink: "#31372F",
        champagne: "#D8C7A3"
      },
      fontFamily: {
        heading: ["var(--font-playfair)", "serif"],
        body: ["var(--font-poppins)", "sans-serif"],
        script: ["var(--font-great-vibes)", "cursive"]
      },
      boxShadow: {
        luxury: "0 30px 90px rgba(80, 94, 73, 0.18)",
        glow: "0 0 60px rgba(168, 181, 162, 0.55)"
      }
    }
  },
  plugins: []
};

export default config;
