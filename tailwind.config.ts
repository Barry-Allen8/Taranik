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
          DEFAULT: "#39ff14",
          dark: "#21d103",
        },
        secondary: "#bc13fe",
        accent: "#0ef0ff",
        background: "#000000",
        foreground: "#ffffff",
        muted: "#707070",
        card: "#050505",
        border: "#173120",
      },
      fontFamily: {
        heading: ["Orbitron", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      boxShadow: {
        sm: "0 1px 2px rgba(0,0,0,0.05)",
        md: "0 4px 6px rgba(0,0,0,0.1)",
        lg: "0 10px 15px rgba(0,0,0,0.1)",
        xl: "0 20px 25px rgba(0,0,0,0.15)",
      },
    },
  },
  plugins: [],
};

export default config;
