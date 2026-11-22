import React, { createContext, useContext, useMemo, useState } from "react";
import { View } from "react-native";
import { vars } from "nativewind";

const ThemeContext = createContext(null);

// ======================================================
// TEMA ESCURO PADRÃO
// ======================================================

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

// ======================================================
// TEMA CLARO PADRÃO
// ======================================================

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

// ======================================================
// TEMA ESCURO - ALTO CONTRASTE
// ======================================================

const temaEscuroAltoContraste = {
  background: "#000000",
  surface: "#080808",
  surfaceSecondary: "#121212",
  border: "#FFFFFF",
  text: "#FFFFFF",
  textSecondary: "#FFFFFF",
  textTertiary: "#E0E0E0",
  primary: "#00FF66",
  primaryHighlight: "#66FF99",
  danger: "#FF5252",
  warning: "#FFD740",
  icon: "#FFFFFF",
  overlay: "rgba(0,0,0,0.90)",
};

// ======================================================
// TEMA CLARO - ALTO CONTRASTE
// ======================================================

const temaClaroAltoContraste = {
  background: "#FFFFFF",
  surface: "#FFFFFF",
  surfaceSecondary: "#F2F2F2",
  border: "#000000",
  text: "#000000",
  textSecondary: "#000000",
  textTertiary: "#333333",
  primary: "#007A2E",
  primaryHighlight: "#005C22",
  danger: "#C00000",
  warning: "#805A00",
  icon: "#000000",
  overlay: "rgba(0,0,0,0.75)",
};

// ======================================================
// PROVIDER
// ======================================================

export function ThemeProvider({ children }) {
  const [temaEscolhido, setTemaEscolhido] = useState("dark");
  const [altoContraste, setAltoContraste] = useState(false);

  // ====================================================
  // ALTERAR TEMA
  // ====================================================

  function alterarTema(novoTema) {
    if (novoTema !== "light" && novoTema !== "dark") return;

    setTemaEscolhido(novoTema);

    // FUTURO:
    // Atualizar preferência de tema na API.
  }

  // ====================================================
  // ALTO CONTRASTE
  // ====================================================

  function alterarAltoContraste(valor) {
    if (typeof valor !== "boolean") return;

    setAltoContraste(valor);

    // FUTURO:
    // Atualizar preferência de alto contraste na API.
  }

  function alternarAltoContraste() {
    setAltoContraste((estadoAtual) => !estadoAtual);
  }

  // ====================================================
  // SELECIONAR PALETA ATIVA
  // ====================================================

  const temaAtivo = temaEscolhido;

  const cores = useMemo(() => {
    if (temaAtivo === "light") {
      return altoContraste ? temaClaroAltoContraste : temaClaro;
    }

    return altoContraste ? temaEscuroAltoContraste : temaEscuro;
  }, [temaAtivo, altoContraste]);

  // ====================================================
  // VARIÁVEIS NATIVWIND / NATIVEWIND
  // ====================================================

  const variaveisTema = useMemo(
    () =>
      vars({
        "--color-texto": cores.text,
        "--color-texto-sec": cores.textSecondary,
        "--color-texto-ter": cores.textTertiary,

        "--color-cartao": cores.surfaceSecondary,
        "--color-cartao-escuro": cores.surface,
        "--color-cartao-borda": cores.border,

        "--color-fundo": cores.background,
      }),
    [cores]
  );

  // ====================================================
  // CONTEXTO
  // ====================================================

  const valorContexto = useMemo(
    () => ({
      temaEscolhido,
      temaAtivo,
      cores,

      altoContraste,

      alterarTema,
      alterarAltoContraste,
      alternarAltoContraste,
    }),
    [
      temaEscolhido,
      temaAtivo,
      cores,
      altoContraste,
    ]
  );

  return (
    <ThemeContext.Provider value={valorContexto}>
      <View style={variaveisTema} className="flex-1">
        {children}
      </View>
    </ThemeContext.Provider>
  );
}

// ======================================================
// HOOK DO TEMA
// ======================================================

export function useTheme() {
  const contexto = useContext(ThemeContext);

  if (!contexto) {
    throw new Error(
      "useTheme precisa ser utilizado dentro de ThemeProvider."
    );
  }

  return contexto;
}