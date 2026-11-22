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

  // TAMANHO DO TEXTO
  if (typeof tamanho === "number") {
    estiloAcessibilidade.fontSize = tamanho * fontScale;
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