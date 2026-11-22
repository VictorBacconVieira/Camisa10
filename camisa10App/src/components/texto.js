
import { Text } from "react-native";
import { useAccessibility } from "../context/AccessibilityContext";

export function Texto({
  tamanho,
  style,
  className,
  children,
  ...props
}) {
  const { fontScale, configuracoes } = useAccessibility();

  const estiloAcessibilidade = {
    fontFamily: configuracoes.textoNegrito
      ? "AnuphanBold"
      : "Anuphan",
  };

  // TAMANHO E ALTURA DO TEXTO
  if (typeof tamanho === "number") {
    const fontSize = tamanho * fontScale;

    estiloAcessibilidade.fontSize = fontSize;
    estiloAcessibilidade.lineHeight = Math.ceil(fontSize * 1.25);
  }

  return (
    <Text
      {...props}
      className={className}
      style={[
        estiloAcessibilidade,
        style,
      ]}
    >
      {children}
    </Text>
  );
}