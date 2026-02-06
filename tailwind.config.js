/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#000000",
        secondary: "#FFAD1F",
        accent: "#E50914",
        light: {
          100: "#F8F9FA",
          200: "#B1B1B3",
          300: "#9CA4AB",
        },
        dark: {
          100: "#1A1A1D",
          200: "#252529",
        },
      },
    },
  },
  plugins: [],
};