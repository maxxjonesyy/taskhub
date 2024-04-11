/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "accent-red": "var(--accent-red)",
        "accent-grey": "var(--accent-grey)",
        "text-grey": "var(--text-grey)",
        "background-light": "var(--background-light)",
        "background-dark": "var(--background-dark)",
      },
      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
