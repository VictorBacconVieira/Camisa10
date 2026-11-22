import React, { createContext, useContext, useState } from "react";
import { View } from "react-native";
import { vars } from "nativewind";

const ThemeContext = createContext(null);

const temaEscuro = {
  background: "#071018",
  surface: "#111D27",
  surfaceSecondary: "#16232D",
  border: "#26343E",
  text: "#F5F7F8",
  textSecondary: "#A8B2B9",
  textTertiary: "#6F7B83",
  primary: "#00C853",
  primaryHighlight: "#39FF14",
  danger: "#E53935",
  warning: "#FFC107",
  icon: "#F5F7F8",
  overlay: "rgba(0,0,0,0.70)",
};

const temaClaro = {
  background: "#F3F6F4",
  surface: "#FFFFFF",
  surfaceSecondary: "#E8EFEB",
  border: "#D5DFD9",
  text: "#17231C",
  textSecondary: "#5E6B63",
  textTertiary: "#849087",
  primary: "#00A844",
  primaryHighlight: "#008F3B",
  danger: "#E53935",
  warning: "#B88600",
  icon: "#26352C",
  overlay: "rgba(0,0,0,0.55)",
};

export function ThemeProvider({ children }) {
  const [temaEscolhido, setTemaEscolhido] = useState("dark");

  const alterarTema = (novoTema) => {
    if (novoTema !== "light" && novoTema !== "dark") return;

    setTemaEscolhido(novoTema);

    // FUTURO: Atualizar preferência de tema na API e no banco de dados.
  };

  const temaAtivo = temaEscolhido;
  const cores = temaAtivo === "light" ? temaClaro : temaEscuro;

  const variaveisTema = vars({
    "--color-texto": cores.text,
    "--color-texto-sec": cores.textSecondary,
    "--color-texto-ter": cores.textTertiary,

    "--color-cartao": cores.surfaceSecondary,
    "--color-cartao-escuro": cores.surface,
    "--color-cartao-borda": cores.border,

    "--color-fundo": cores.background,
  });

  return (
    <ThemeContext.Provider
      value={{
        temaEscolhido,
        temaAtivo,
        cores,
        alterarTema,
      }}
    >
      <View style={variaveisTema} className="flex-1">
        {children}
      </View>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const contexto = useContext(ThemeContext);

  if (!contexto) {
    throw new Error("useTheme precisa ser utilizado dentro de ThemeProvider.");
  }

  return contexto;
}