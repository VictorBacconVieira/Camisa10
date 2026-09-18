/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("nativewind/preset")],

  content: [
    "./App.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],

  theme: {
    extend: {
      colors: {
        'verde': {
          DEFAULT: '#00C853',
          claro: '#39FF14',
          escuro: '#007A35'
        },

        'texto': {
          DEFAULT: '#F5F7F8',
          sec: '#A8B2B9',
          ter: '#6F7B83'
        },

        'cartao': {
          DEFAULT: '#16232D',
          escuro: '#111D27',
          borda: '#26343E'
        },

        'fundo': '#071018',
        'vermelho': '#E53935',
        'amarelo': '#FFC107'
      },

    },
  },

  plugins: [],
};