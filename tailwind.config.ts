import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#16a34a",
          600: "#15803d",
          700: "#166534",
          800: "#14532d",
          900: "#052e16",
          950: "#022c22",
        },
        surface: {
          0: "#ffffff",
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          700: "#1a1a1a",
          800: "#141414",
          850: "#111111",
          900: "#0c0c0c",
          950: "#0a0a0a",
        },
      },
      fontFamily: {
        sans: ["var(--font-montserrat)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "Consolas", "monospace"],
      },
      animation: {
        "float-1": "float1 8s ease-in-out infinite",
        "float-2": "float2 10s ease-in-out 1s infinite",
        "float-3": "float3 12s ease-in-out 2s infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4,0,0.6,1) infinite",
        "shimmer": "shimmer 2.5s linear infinite",
        "blink": "blink 1s step-end infinite",
        "marquee": "marquee 30s linear infinite",
      },
      keyframes: {
        float1: {
          "0%,100%": { transform: "translate(0,0) rotate(0deg)" },
          "33%": { transform: "translate(25px,-15px) rotate(2deg)" },
          "66%": { transform: "translate(-15px,10px) rotate(-1deg)" },
        },
        float2: {
          "0%,100%": { transform: "translate(0,0)" },
          "50%": { transform: "translate(-30px,-20px)" },
        },
        float3: {
          "0%,100%": { transform: "translate(0,0)" },
          "25%": { transform: "translate(20px,15px)" },
          "75%": { transform: "translate(-10px,-25px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        blink: {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
