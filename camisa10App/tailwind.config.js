/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("nativewind/preset")],

  content: [
    "./App.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],

  theme: {
    extend: {},
  },

  plugins: [],
};