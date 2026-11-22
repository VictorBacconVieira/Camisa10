import { Pressable, Text, View } from "react-native";
import { CheckIcon } from "phosphor-react-native";
import { useTheme } from "../context/ThemeContext";

export default function Checkbox({
  checked,
  onPress,
  children,
}) {
  const { cores } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-start"
    >
      {/* Caixa do checkbox */}
      <View
        className={`mt-0.5 h-5 w-5 items-center justify-center rounded-md border ${
          checked
            ? "border-verde bg-verde"
            : "border-cartao-borda bg-cartao"
        }`}
      >
        {checked && (
          <CheckIcon
            size={14}
            color={cores.background}
            weight="bold"
          />
        )}
      </View>

      {/* Texto dos termos */}
      <Text
        className="ml-2 flex-1 text-xs leading-5 text-texto-sec"
        style={{
          fontFamily: "Anuphan",
        }}
      >
        {children}
      </Text>
    </Pressable>
  );
}