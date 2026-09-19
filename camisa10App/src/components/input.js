import { Pressable, TextInput, View } from "react-native";

export default function Input({
  icon: Icon,
  placeholder,
  value,
  onChangeText,
  keyboardType,
  autoCapitalize = "none",
  secureTextEntry = false,
  rightIcon: RightIcon,
  onRightIconPress,
}) {
  return (
    <View className="h-12 flex-row items-center rounded-xl border border-cartao-borda bg-cartao px-3">

      {Icon && (
        <Icon
          size={21}
          color="#A8B2B9"
          weight="regular"
        />
      )}

      <TextInput
        className="ml-3 flex-1 text-sm text-texto"
        placeholder={placeholder}
        placeholderTextColor="#6F7B83"
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        secureTextEntry={secureTextEntry}
      />

      {RightIcon && (
        <Pressable
          onPress={onRightIconPress}
          className="ml-2 p-1"
        >
          <RightIcon
            size={21}
            color="#A8B2B9"
            weight="regular"
          />
        </Pressable>
      )}

    </View>
  );
}