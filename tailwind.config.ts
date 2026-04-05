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
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#2563eb",
          600: "#1d4ed8",
          700: "#1e40af",
          800: "#1e3a8a",
          900: "#172554",
          950: "#0f172a",
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
