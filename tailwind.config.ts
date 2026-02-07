import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#bef264",
          dark: "#a3e635",
        },
        secondary: "#34d399",
        accent: "#22d3ee",
        background: "#020617",
        foreground: "#e5edf8",
        muted: "#90a2c0",
        card: "#081228",
        border: "rgba(148, 163, 184, 0.24)",
      },
      fontFamily: {
        heading: ["Sora", "ui-sans-serif", "Segoe UI", "sans-serif"],
        body: ["Manrope", "ui-sans-serif", "Segoe UI", "sans-serif"],
      },
      boxShadow: {
        sm: "0 1px 2px rgba(2, 6, 23, 0.35)",
        md: "0 6px 18px rgba(2, 6, 23, 0.3)",
        lg: "0 20px 40px rgba(2, 6, 23, 0.38)",
        xl: "0 30px 70px rgba(2, 6, 23, 0.45)",
      },
    },
  },
  plugins: [],
};

export default config;
