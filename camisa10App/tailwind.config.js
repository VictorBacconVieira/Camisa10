/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("nativewind/preset")],
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      colors: {
        verde: {
          DEFAULT: "#00C853",
          claro: "#39FF14",
          escuro: "#007A35",
        },

        texto: {
          DEFAULT: "var(--color-texto)",
          sec: "var(--color-texto-sec)",
          ter: "var(--color-texto-ter)",
        },

        cartao: {
          DEFAULT: "var(--color-cartao)",
          escuro: "var(--color-cartao-escuro)",
          borda: "var(--color-cartao-borda)",
        },

        fundo: "var(--color-fundo)",
        vermelho: "#E53935",
        amarelo: "#FFC107",
      },
    },
  },

  plugins: [],
};