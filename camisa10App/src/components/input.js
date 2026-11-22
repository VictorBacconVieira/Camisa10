import { forwardRef } from "react";
import { Pressable, TextInput, View } from "react-native";
import { useTheme } from "../context/ThemeContext";

const Input = forwardRef(function Input(
  {
    icon: Icon,
    placeholder,
    value,
    onChangeText,
    keyboardType,
    autoCapitalize = "none",
    secureTextEntry = false,
    rightIcon: RightIcon,
    onRightIconPress,
    maxLength,
    returnKeyType,
    onSubmitEditing,
    onFocus,
    onBlur,
  },
  ref
) {
  const { cores } = useTheme();

  return (
    <View className="h-12 flex-row items-center rounded-xl border border-cartao-borda bg-cartao px-3">
      {Icon && (
        <Icon
          size={21}
          color={cores.textSecondary}
          weight="regular"
        />
      )}

      <TextInput
        ref={ref}
        className="ml-3 flex-1 text-sm text-texto"
        placeholder={placeholder}
        placeholderTextColor={cores.textTertiary}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        secureTextEntry={secureTextEntry}
        maxLength={maxLength}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
        onFocus={onFocus}
        onBlur={onBlur}
      />

      {RightIcon && (
        <Pressable
          onPress={onRightIconPress}
          className="ml-2 p-1"
        >
          <RightIcon
            size={21}
            color={cores.textSecondary}
            weight="regular"
          />
        </Pressable>
      )}
    </View>
  );
});

export default Input;