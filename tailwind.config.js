/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        myGreen: "#1A8917",
        black1: "#09090B",
        black2: "#191919",
        blackNF: "#0F0F11",
        whiteGray: "#8F9094",
        blackGray: "#424242",
        darkHeading: "#FAFAFA",
      },
    },
  },
  plugins: [require("daisyui")],
};
