import { Text, View } from "react-native";

import {
  CheckCircleIcon,
  XCircleIcon,
} from "phosphor-react-native";

export default function PasswordRequirement({
  valid,
  children,
}) {
  const Icon = valid
    ? CheckCircleIcon
    : XCircleIcon;

  return (
    <View className="mt-1 flex-row items-center">
      <Icon
        size={16}
        color={valid ? "#00C853" : "#E53935"}
        weight="fill"
      />

      <Text
        className="ml-2 text-xs text-texto-sec"
        style={{
          fontFamily: "Anuphan",
        }}
      >
        {children}
      </Text>
    </View>
  );
}