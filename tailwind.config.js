/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      title: ["Playfair Display", "serif"],
      main: ["Jost", "sans-serif"],
    },
  },
  plugins: [],
};
