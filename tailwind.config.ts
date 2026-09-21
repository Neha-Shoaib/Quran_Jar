import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    // This wildcard tells Tailwind to scan EVERY file inside the src folder
    "./src/**/*.{js,ts,jsx,tsx,mdx}", 
    
    // Fallbacks just in case
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        jarHappiness: "#FCD34D",
        jarGrief: "#312E81",
        jarSorrow: "#64748B",
        jarPain: "#9F1239",
        jarDisappointment: "#94A3B8",
        jarSadness: "#0F766E",
        jarAnxious: "#86EFAC",
        jarAnger: "#EA580C",
        jarHope: "#10B981",
        jarGratitude: "#C084FC",
      },
      fontFamily: {
        arabic: ['"Amiri"', "serif"],
        urdu: ['"Noto Nastaliq Urdu"', "serif"],
        sans: ['"Inter"', "sans-serif"],
      }
    },
  },
  plugins: [],
};
export default config;
