import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        inter: "Inter",
        lexend: "Lexend",
      },
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        "primary-button-bg": "var(--primary-button-bg)",
        "primary-button-text": "var(--primary-button-text)",
        "secondary-button-bg": "var(--secondary-button-bg)",
        "secondary-button-text": "var(--secondary-button-text)",
        "primary-text": "var(--primary-text)",
      },
    },
  },
  plugins: [],
};
export default config;
