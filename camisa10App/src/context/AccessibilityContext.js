import {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

const AccessibilityContext = createContext(null);

// ======================================================
// CONFIGURAÇÕES PADRÃO DE ACESSIBILIDADE
// ======================================================

const CONFIGURACOES_PADRAO = {
  tamanhoTexto: "normal",
  textoNegrito: false,
  reduzirAnimacoes: false,
  desativarEfeitos: false,
  botoesMaiores: false,
  interfaceSimplificada: false,
};

// ======================================================
// ESCALAS DE TEXTO
// ======================================================

const ESCALAS_TEXTO = {
  normal: 1,
  grande: 1.2,
  muitoGrande: 1.4,
};

// ======================================================
// CONFIGURAÇÕES BOOLEANAS PERMITIDAS
// ======================================================

const CONFIGURACOES_BOOLEANAS = [
  "textoNegrito",
  "reduzirAnimacoes",
  "desativarEfeitos",
  "botoesMaiores",
  "interfaceSimplificada",
];

// ======================================================
// PROVIDER
// ======================================================

export function AccessibilityProvider({ children }) {
  const [configuracoes, setConfiguracoes] = useState({
    ...CONFIGURACOES_PADRAO,
  });

  // ====================================================
  // ALTERAR UMA CONFIGURAÇÃO
  // ====================================================

  function alterarAcessibilidade(chave, valor) {
    // Alteração do tamanho de texto
    if (chave === "tamanhoTexto") {
      if (ESCALAS_TEXTO[valor] === undefined) return;

      setConfiguracoes((estadoAtual) => ({
        ...estadoAtual,
        tamanhoTexto: valor,
      }));

      return;
    }

    // Alteração das configurações booleanas
    if (!CONFIGURACOES_BOOLEANAS.includes(chave)) {
      return;
    }

    if (typeof valor !== "boolean") {
      return;
    }

    setConfiguracoes((estadoAtual) => ({
      ...estadoAtual,
      [chave]: valor,
    }));
  }

  // ====================================================
  // ALTERAR TAMANHO DO TEXTO
  // ====================================================

  function alterarTamanhoTexto(tamanho) {
    alterarAcessibilidade("tamanhoTexto", tamanho);
  }

  // ====================================================
  // ALTERNAR UMA CONFIGURAÇÃO
  // ====================================================

  function alternarAcessibilidade(chave) {
    if (!CONFIGURACOES_BOOLEANAS.includes(chave)) {
      return;
    }

    setConfiguracoes((estadoAtual) => ({
      ...estadoAtual,
      [chave]: !estadoAtual[chave],
    }));
  }

  // ====================================================
  // RESTAURAR CONFIGURAÇÕES PADRÃO
  // ====================================================

  function restaurarAcessibilidade() {
    setConfiguracoes({
      ...CONFIGURACOES_PADRAO,
    });
  }

  // ====================================================
  // VALORES CALCULADOS
  // ====================================================

  const fontScale =
    ESCALAS_TEXTO[configuracoes.tamanhoTexto] ?? 1;

  const duracaoAnimacao = configuracoes.reduzirAnimacoes
    ? 0
    : 300;

  const escalaBotao = configuracoes.botoesMaiores
    ? 1.2
    : 1;

  const fontWeightExtra = configuracoes.textoNegrito
    ? "600"
    : undefined;

  // ====================================================
  // CONTEXTO
  // ====================================================

  const valorContexto = useMemo(
    () => ({
      configuracoes,

      // Configurações individuais
      tamanhoTexto: configuracoes.tamanhoTexto,
      textoNegrito: configuracoes.textoNegrito,
      reduzirAnimacoes: configuracoes.reduzirAnimacoes,
      desativarEfeitos: configuracoes.desativarEfeitos,
      botoesMaiores: configuracoes.botoesMaiores,
      interfaceSimplificada:
        configuracoes.interfaceSimplificada,

      // Valores calculados
      fontScale,
      duracaoAnimacao,
      escalaBotao,
      fontWeightExtra,

      // Escalas disponíveis
      escalasTexto: ESCALAS_TEXTO,

      // Funções
      alterarAcessibilidade,
      alterarTamanhoTexto,
      alternarAcessibilidade,
      restaurarAcessibilidade,
    }),
    [
      configuracoes,
      fontScale,
      duracaoAnimacao,
      escalaBotao,
      fontWeightExtra,
    ]
  );

  return (
    <AccessibilityContext.Provider value={valorContexto}>
      {children}
    </AccessibilityContext.Provider>
  );
}

// ======================================================
// HOOK DE ACESSIBILIDADE
// ======================================================

export function useAccessibility() {
  const contexto = useContext(AccessibilityContext);

  if (!contexto) {
    throw new Error(
      "useAccessibility deve ser utilizado dentro de AccessibilityProvider."
    );
  }

  return contexto;
}