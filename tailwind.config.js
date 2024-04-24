/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: "var(--accent)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        "background-accent": "var(--background-accent)",
        "background-primary": "var(--background-primary)",
        "background-secondary": "var(--background-secondary)",
      },
      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
