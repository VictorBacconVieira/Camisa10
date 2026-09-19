import { useState } from "react";

import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import {
  ArrowRightIcon,
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  LockIcon,
} from "phosphor-react-native";

import { useNavigation } from "@react-navigation/native";

import Input from "../components/input";

export function Login() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);

  function entrar() {
    // Temporariamente, o login vai direto para a Home.
    // O backend será integrado posteriormente.
    navigation.navigate("Home");
  }

  return (
    <View className="flex-1 bg-fundo">

      <View className="absolute left-0 right-0 top-0 h-[302px] overflow-hidden">
        <Image
          source={require("../../assets/ImagemFundoLogin.png")}
          resizeMode="cover"
          className="absolute left-0 top-0 h-[302px] w-full"
        />
      </View>

      <KeyboardAvoidingView
        className="flex-1"
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : undefined
        }
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 25,
            paddingTop: 30,
            paddingBottom: 25,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >

          <View className="flex-1">

            <View className="h-[190px] items-center justify-center">

              <Image
                source={require("../../assets/Logo.png")}
                resizeMode="contain"
                className="h-[191px] w-[180px]"
              />

            </View>

            {/* ================================================== */}
            {/* TÍTULO                                               */}
            {/* ================================================== */}

            <View className="items-center">

              <Text
                className="text-center text-[40px] text-texto"
                style={{
                  fontFamily: "Anuphan",
                }}
              >
                Camisa
                <Text className="text-[#39FF14]">
                  10
                </Text>
              </Text>

            </View>

            {/* ================================================== */}
            {/* MENSAGEM DE BOAS-VINDAS                              */}
            {/* ================================================== */}

            <View className="mt-7 items-center">

              <Text
                className="text-center text-2xl text-texto"
                style={{
                  fontFamily: "Anuphan",
                }}
              >
                Bem Vindo,{" "}
                <Text className="text-[#39FF14]">
                  Jogador!
                </Text>
              </Text>

              <Text
                className="mt-1 text-center text-base text-texto-sec"
                style={{
                  fontFamily: "Anuphan",
                }}
              >
                Faça login para continuar
              </Text>

            </View>

            {/* ================================================== */}
            {/* E-MAIL                                               */}
            {/* ================================================== */}

            <View className="mt-4">

              <Text
                className="mb-2 text-base text-texto"
                style={{
                  fontFamily: "Anuphan",
                }}
              >
                E-mail
              </Text>

              <Input
                icon={EnvelopeIcon}
                placeholder="seu@email.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

            </View>

            {/* ================================================== */}
            {/* SENHA                                                */}
            {/* ================================================== */}

            <View className="mt-4">

              <Text
                className="mb-2 text-base text-texto"
                style={{
                  fontFamily: "Anuphan",
                }}
              >
                Senha
              </Text>

              <Input
                icon={LockIcon}
                placeholder="Digite sua senha"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry={!mostrarSenha}
                rightIcon={
                  mostrarSenha
                    ? EyeSlashIcon
                    : EyeIcon
                }
                onRightIconPress={() =>
                  setMostrarSenha(!mostrarSenha)
                }
              />

            </View>

            {/* ================================================== */}
            {/* ESQUECEU A SENHA?                                    */}
            {/* ================================================== */}

            <Pressable
              className="mt-3 self-end"
              onPress={() => {
                // Implementaremos posteriormente.
              }}
            >
              <Text
                className="text-base text-[#39FF14]"
                style={{
                  fontFamily: "Anuphan",
                }}
              >
                Esqueceu sua senha?
              </Text>
            </Pressable>

            {/* ================================================== */}
            {/* BOTÃO ENTRAR                                         */}
            {/* ================================================== */}

            <Pressable
              onPress={entrar}
              className="mt-8 h-[50px] flex-row items-center justify-center rounded-[10px] bg-verde"
            >

              <Text
                className="text-xl font-bold text-texto"
                style={{
                  fontFamily: "Inter",
                }}
              >
                Entrar
              </Text>

              <ArrowRightIcon
                size={24}
                color="#F5F7F8"
                weight="bold"
                style={{
                  position: "absolute",
                  right: 15,
                }}
              />

            </Pressable>

            {/* ================================================== */}
            {/* DIVISOR                                              */}
            {/* ================================================== */}

            <View className="mt-11 flex-row items-center">

              <View className="h-px flex-1 bg-cartao-borda" />

              <Text
                className="mx-3 text-sm text-texto"
                style={{
                  fontFamily: "Anuphan",
                }}
              >
                ou continue com
              </Text>

              <View className="h-px flex-1 bg-cartao-borda" />

            </View>

            {/* ================================================== */}
            {/* GOOGLE                                               */}
            {/* ================================================== */}

            <Pressable
              className="mt-5 h-[55px] flex-row items-center justify-center rounded-[15px] border border-cartao-borda bg-cartao"
              onPress={() => {
                // Implementaremos posteriormente.
              }}
            >

              <Text
                className="text-base text-texto"
                style={{
                  fontFamily: "Anuphan",
                }}
              >
                Entrar com sua conta Google
              </Text>

            </Pressable>

            {/* ================================================== */}
            {/* CADASTRO                                             */}
            {/* ================================================== */}

            <View className="mt-7 flex-row justify-center">

              <Text
                className="text-sm text-texto"
                style={{
                  fontFamily: "Anuphan",
                }}
              >
                Ainda não tem uma conta?{" "}
              </Text>

              <Pressable
                onPress={() =>
                  navigation.navigate("Cadastro")
                }
              >
                <Text
                  className="text-sm text-[#39FF14]"
                  style={{
                    fontFamily: "Anuphan",
                  }}
                >
                  Cadastra-se
                </Text>
              </Pressable>

            </View>

          </View>

        </ScrollView>
      </KeyboardAvoidingView>

    </View>
  );
}