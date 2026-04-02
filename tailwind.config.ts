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
          50: "#eef6ff",
          100: "#d9eaff",
          200: "#bcdbff",
          300: "#8ec5ff",
          400: "#59a4ff",
          500: "#3381fc",
          600: "#1d62f1",
          700: "#154dde",
          800: "#1740b4",
          900: "#19398e",
          950: "#0f1d3d",
        },
        surface: {
          0: "#ffffff",
          50: "#f7f8fa",
          100: "#eef0f4",
          200: "#dce0e8",
          700: "#1a1d2b",
          800: "#13151f",
          850: "#0f1119",
          900: "#0b0c13",
          950: "#070810",
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
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
