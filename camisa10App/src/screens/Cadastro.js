import { useState } from "react";

import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import {
  ArrowLeftIcon,
  CalendarBlankIcon,
  CameraIcon,
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  LockIcon,
  UserIcon,
} from "phosphor-react-native";

import { useNavigation } from "@react-navigation/native";

import Input from "../components/input";
import Checkbox from "../components/checkbox";
import PasswordRequirement from "../components/passwordRequirement";

export function Cadastro() {
  const navigation = useNavigation();

  // =========================================================
  // ESTADOS DO FORMULÁRIO
  // =========================================================

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmacao, setConfirmacao] = useState("");

  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmacao, setMostrarConfirmacao] =
    useState(false);

  const [termos, setTermos] = useState(false);

  // =========================================================
  // VALIDAÇÕES DA SENHA - FRONTEND
  // =========================================================

  const senhaTem8Caracteres = senha.length >= 8;

  const senhaTemMaiuscula = /[A-Z]/.test(senha);

  const senhaTemNumero = /\d/.test(senha);

  const senhasIguais =
    senha.length > 0 &&
    confirmacao.length > 0 &&
    senha === confirmacao;

  // =========================================================
  // FUNÇÃO DE CADASTRO
  // =========================================================

  function cadastrar() {
    // =======================================================
    // VALIDAÇÕES FRONTEND
    // =======================================================

    if (
      !nome ||
      !email ||
      !dataNascimento ||
      !senha ||
      !confirmacao
    ) {
      console.log("Preencha todos os campos.");
      return;
    }

    if (!senhaTem8Caracteres) {
      console.log(
        "A senha precisa ter pelo menos 8 caracteres."
      );
      return;
    }

    if (!senhaTemMaiuscula) {
      console.log(
        "A senha precisa ter pelo menos uma letra maiúscula."
      );
      return;
    }

    if (!senhaTemNumero) {
      console.log(
        "A senha precisa ter pelo menos um número."
      );
      return;
    }

    if (!senhasIguais) {
      console.log("As senhas não são iguais.");
      return;
    }

    if (!termos) {
      console.log(
        "É necessário aceitar os Termos de Uso."
      );
      return;
    }

    // =======================================================
    // BACKEND - IMPLEMENTAÇÃO FUTURA
    // =======================================================
    //
    // Aqui futuramente vamos enviar os dados para a API.
    //
    // Exemplo:
    //
    // await api.post("/usuarios", {
    //   nome,
    //   email,
    //   dataNascimento,
    //   senha,
    // });
    //
    // O backend será responsável por:
    // - cadastrar o usuário;
    // - verificar se o e-mail já existe;
    // - proteger/criptografar a senha;
    // - salvar os dados no banco;
    // - retornar o resultado do cadastro.
    //
    // =======================================================

    console.log("Cadastro válido:", {
      nome,
      email,
      dataNascimento,
      termos,
    });
  }

  return (
    <View className="flex-1 bg-fundo">

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
            paddingHorizontal: 20,
            paddingTop: 20,
            paddingBottom: 40,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >

          {/* ================================================= */}
          {/* CABEÇALHO */}
          {/* ================================================= */}

          <View className="mb-6 flex-row items-center">

            <Pressable
              onPress={() => navigation.goBack()}
              className="mr-3 p-1"
            >
              <ArrowLeftIcon
                size={24}
                color="#F5F7F8"
                weight="regular"
              />
            </Pressable>

            <Text
              className="text-base text-texto"
              style={{
                fontFamily: "Anuphan",
              }}
            >
              Cadastro
            </Text>

          </View>

          {/* ================================================= */}
          {/* TÍTULO */}
          {/* ================================================= */}

          <Text
            className="text-3xl font-bold text-texto"
            style={{
              fontFamily: "Anuphan",
            }}
          >
            Criar{" "}
            <Text className="text-verde">
              Conta
            </Text>
          </Text>

          <Text
            className="mt-2 text-sm leading-5 text-texto-sec"
            style={{
              fontFamily: "Anuphan",
            }}
          >
            Preencha os campos com os dados
            correspondentes para criar sua conta.
          </Text>

          {/* ================================================= */}
          {/* FOTO DE PERFIL */}
          {/* ================================================= */}

          <View className="my-7 items-center">

            <Pressable
              onPress={() => {
                // =================================================
                // BACKEND / UPLOAD DE IMAGEM - FUTURO
                // =================================================
                //
                // Futuramente podemos abrir a câmera/galeria
                // e enviar a foto para a API.
                //
                // =================================================
              }}
            >

              <View className="relative h-24 w-24 items-center justify-center rounded-full border-2 border-verde bg-cartao">

                <UserIcon
                  size={42}
                  color="#00C853"
                  weight="regular"
                />

                <View className="absolute bottom-0 right-0 h-8 w-8 items-center justify-center rounded-full bg-verde">

                  <CameraIcon
                    size={17}
                    color="#FFFFFF"
                    weight="bold"
                  />

                </View>

              </View>

            </Pressable>

            <Text
              className="mt-2 text-xs text-texto-sec"
              style={{
                fontFamily: "Anuphan",
              }}
            >
              Adicionar foto
            </Text>

          </View>

          {/* ================================================= */}
          {/* NOME COMPLETO */}
          {/* ================================================= */}

          <View className="mb-4">

            <Text
              className="mb-2 text-base text-texto"
              style={{
                fontFamily: "Anuphan",
              }}
            >
              Nome completo
            </Text>

            <Input
              icon={UserIcon}
              placeholder="Digite seu nome completo"
              value={nome}
              onChangeText={setNome}
              autoCapitalize="words"
            />

          </View>

          {/* ================================================= */}
          {/* E-MAIL */}
          {/* ================================================= */}

          <View className="mb-4">

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
              placeholder="Digite seu e-mail"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

          </View>

          {/* ================================================= */}
          {/* DATA DE NASCIMENTO */}
          {/* ================================================= */}

          <View className="mb-4">

            <Text
              className="mb-2 text-base text-texto"
              style={{
                fontFamily: "Anuphan",
              }}
            >
              Data de nascimento
            </Text>

            <Input
              icon={CalendarBlankIcon}
              placeholder="DD/MM/AAAA"
              value={dataNascimento}
              onChangeText={setDataNascimento}
              keyboardType="numeric"
              autoCapitalize="none"
            />

          </View>

          {/* ================================================= */}
          {/* SENHA */}
          {/* ================================================= */}

          <View className="mb-4">

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
                setMostrarSenha(
                  !mostrarSenha
                )
              }
            />

            {/* REQUISITOS DA SENHA */}

            <View className="mt-2">

              <PasswordRequirement
                valid={senhaTem8Caracteres}
              >
                Mínimo de 8 caracteres
              </PasswordRequirement>

              <PasswordRequirement
                valid={senhaTemMaiuscula}
              >
                Pelo menos uma letra maiúscula
              </PasswordRequirement>

              <PasswordRequirement
                valid={senhaTemNumero}
              >
                Pelo menos um número
              </PasswordRequirement>

            </View>

          </View>

          {/* ================================================= */}
          {/* CONFIRMAR SENHA */}
          {/* ================================================= */}

          <View className="mb-5">

            <Text
              className="mb-2 text-base text-texto"
              style={{
                fontFamily: "Anuphan",
              }}
            >
              Confirmar senha
            </Text>

            <Input
              icon={LockIcon}
              placeholder="Confirme sua senha"
              value={confirmacao}
              onChangeText={setConfirmacao}
              secureTextEntry={!mostrarConfirmacao}
              rightIcon={
                mostrarConfirmacao
                  ? EyeSlashIcon
                  : EyeIcon
              }
              onRightIconPress={() =>
                setMostrarConfirmacao(
                  !mostrarConfirmacao
                )
              }
            />

            <View className="mt-2">

              <PasswordRequirement
                valid={senhasIguais}
              >
                As senhas devem ser iguais
              </PasswordRequirement>

            </View>

          </View>

          {/* ================================================= */}
          {/* TERMOS DE USO */}
          {/* ================================================= */}

          <View className="mb-6">

            <Checkbox
              checked={termos}
              onPress={() =>
                setTermos(!termos)
              }
            >
              Li e concordo com os Termos de Uso
              e Política de Privacidade.
            </Checkbox>

          </View>

          {/* ================================================= */}
          {/* BOTÃO CADASTRAR */}
          {/* ================================================= */}

          <Pressable
            onPress={cadastrar}
            className="h-12 flex-row items-center justify-center rounded-xl bg-verde"
          >

            <Text
              className="text-base font-bold text-texto"
              style={{
                fontFamily: "Inter",
              }}
            >
              Cadastrar
            </Text>

          </Pressable>

          {/* ================================================= */}
          {/* VOLTAR PARA LOGIN */}
          {/* ================================================= */}

          <View className="mt-6 flex-row justify-center">

            <Text
              className="text-sm text-texto-sec"
              style={{
                fontFamily: "Anuphan",
              }}
            >
              Já tem uma conta?{" "}
            </Text>

            <Pressable
              onPress={() =>
                navigation.navigate("Login")
              }
            >
              <Text
                className="text-sm font-bold text-verde"
                style={{
                  fontFamily: "Anuphan",
                }}
              >
                Faça Login
              </Text>
            </Pressable>

          </View>

        </ScrollView>

      </KeyboardAvoidingView>

    </View>
  );
}