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
        sage: "#FFBBA3",
        moss: "#B86B50",
        pearl: "#FFF8F4",
        mist: "#FFF0E8",
        ink: "#3D2B1F",
        champagne: "#F2D0BA"
      },
      fontFamily: {
        heading: ["var(--font-playfair)", "serif"],
        body: ["var(--font-poppins)", "sans-serif"],
        script: ["var(--font-great-vibes)", "cursive"]
      },
      boxShadow: {
        luxury: "0 30px 90px rgba(184, 107, 80, 0.15)",
        glow: "0 0 60px rgba(255, 187, 163, 0.55)"
      }
    }
  },
  plugins: []
};

export default config;
