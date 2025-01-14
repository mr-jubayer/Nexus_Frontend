/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        myGreen: "#1A8917",
        black1: "#242424",
        black2: "#191919",
      },
    },
  },
  plugins: [require("daisyui")],
};
