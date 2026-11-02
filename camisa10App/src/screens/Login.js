import { useEffect, useRef, useState } from "react";

import {
  ActivityIndicator,
  Animated,
  Easing,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import {
  ArrowRightIcon,
  CheckCircleIcon,
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  InfoIcon,
  LockIcon,
  WarningCircleIcon,
  XIcon,
} from "phosphor-react-native";

import { useNavigation } from "@react-navigation/native";

import Input from "../components/input";

import { fazerLogin } from "../services/authService"; 

// ==================================================
// USUÁRIO TEMPORÁRIO DE DESENVOLVIMENTO
// REMOVER QUANDO O BACKEND ESTIVER INTEGRADO
// ==================================================

const USUARIO_TESTE = {
  email: "admin@gmail.com",
  senha: "Admin@1234",
};

// ==================================================
// POP-UP PERSONALIZADO
// ==================================================

function ModalAlerta({
  visible,
  titulo,
  mensagem,
  tipo = "erro",
  onClose,
}) {
  const opacidade = useRef(new Animated.Value(0)).current;
  const escala = useRef(new Animated.Value(0.85)).current;
  const deslocamento = useRef(new Animated.Value(20)).current;

  const fechando = useRef(false);

  useEffect(() => {
    if (visible) {
      fechando.current = false;

      opacidade.setValue(0);
      escala.setValue(0.85);
      deslocamento.setValue(20);

      Animated.parallel([
        Animated.timing(opacidade, {
          toValue: 1,
          duration: 220,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),

        Animated.spring(escala, {
          toValue: 1,
          friction: 8,
          tension: 65,
          useNativeDriver: true,
        }),

        Animated.timing(deslocamento, {
          toValue: 0,
          duration: 250,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  function fechar() {
    if (fechando.current) return;

    fechando.current = true;

    Animated.parallel([
      Animated.timing(opacidade, {
        toValue: 0,
        duration: 160,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),

      Animated.timing(escala, {
        toValue: 0.9,
        duration: 160,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),

      Animated.timing(deslocamento, {
        toValue: 15,
        duration: 160,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  }

  const configuracao = {
    erro: {
      cor: "#E53935",
      Icone: WarningCircleIcon,
      tituloBotao: "Entendi",
    },

    sucesso: {
      cor: "#00C853",
      Icone: CheckCircleIcon,
      tituloBotao: "Continuar",
    },

    aviso: {
      cor: "#FFC107",
      Icone: InfoIcon,
      tituloBotao: "Entendi",
    },
  };

  const atual = configuracao[tipo] || configuracao.erro;
  const Icone = atual.Icone;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      statusBarTranslucent
      onRequestClose={fechar}
    >
      <View className="flex-1 items-center justify-center px-7">

        {/* FUNDO ESCURECIDO */}

        <Animated.View
          pointerEvents="none"
          className="absolute inset-0 bg-black"
          style={{
            opacity: opacidade.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.72],
            }),
          }}
        />

        {/* JANELA DO ALERTA */}

        <Animated.View
          className="w-full overflow-hidden rounded-[22px] border border-cartao-borda bg-cartao"
          style={{
            opacity: opacidade,
            transform: [
              { scale: escala },
              { translateY: deslocamento },
            ],
          }}
        >

          {/* DETALHE SUPERIOR */}

          <View
            style={{
              height: 4,
              backgroundColor: atual.cor,
            }}
          />

          <View className="px-5 pb-5 pt-6">

            {/* ÍCONE E BOTÃO FECHAR */}

            <View className="flex-row items-center justify-between">

              <View
                className="h-[52px] w-[52px] items-center justify-center rounded-full"
                style={{
                  backgroundColor: `${atual.cor}20`,
                }}
              >
                <Icone
                  size={30}
                  color={atual.cor}
                  weight="fill"
                />
              </View>

              <Pressable
                onPress={fechar}
                className="h-9 w-9 items-center justify-center rounded-full bg-[#26343E]"
                hitSlop={8}
              >
                <XIcon
                  size={18}
                  color="#A8B2B9"
                  weight="bold"
                />
              </Pressable>

            </View>

            {/* TÍTULO */}

            <Text
              className="mt-5 text-xl text-texto"
              style={{
                fontFamily: "Anuphan",
              }}
            >
              {titulo}
            </Text>

            {/* MENSAGEM */}

            <Text
              className="mt-2 text-sm leading-6 text-texto-sec"
              style={{
                fontFamily: "Inter",
              }}
            >
              {mensagem}
            </Text>

            {/* BOTÃO */}

            <Pressable
              onPress={fechar}
              className="mt-6 h-[48px] flex-row items-center justify-center rounded-xl"
              style={{
                backgroundColor: atual.cor,
              }}
            >
              <Text
                className="text-base font-bold text-white"
                style={{
                  fontFamily: "Inter",
                }}
              >
                {atual.tituloBotao}
              </Text>
            </Pressable>

          </View>
        </Animated.View>

      </View>
    </Modal>
  );
}

// ==================================================
// TELA DE LOGIN
// ==================================================

export function Login() {
  const navigation = useNavigation();

  // ==================================================
  // ESTADOS
  // ==================================================

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const [alerta, setAlerta] = useState({
    visible: false,
    titulo: "",
    mensagem: "",
    tipo: "erro",
  });

  const emailRef = useRef(null);
  const senhaRef = useRef(null);

  const acaoAlertaRef = useRef(null);

  // ==================================================
  // EXIBIR POP-UP
  // ==================================================

  function mostrarAlerta(
    titulo,
    mensagem,
    tipo = "erro",
    acao = null
  ) {
    acaoAlertaRef.current = acao;

    setAlerta({
      visible: true,
      titulo,
      mensagem,
      tipo,
    });
  }

  function fecharAlerta() {
    setAlerta((anterior) => ({
      ...anterior,
      visible: false,
    }));

    const acao = acaoAlertaRef.current;
    acaoAlertaRef.current = null;

    if (acao) {
      setTimeout(() => {
        acao();
      }, 100);
    }
  }

  // ==================================================
  // VALIDAÇÃO DO E-MAIL
  // ==================================================

  function emailValido(valor) {
    const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    return formatoEmail.test(valor.trim());
  }

  // ==================================================
  // AUTENTICAÇÃO TEMPORÁRIA
  // ==================================================

  async function autenticarUsuario(emailUsuario, senhaUsuario) {
    return await fazerLogin(emailUsuario, senhaUsuario);
}

  // ==================================================
  // FUNÇÃO ENTRAR
  // ==================================================

  async function entrar() {
    if (carregando) return;

    Keyboard.dismiss();

    const emailDigitado = email.trim();

    // CAMPOS VAZIOS

    if (!emailDigitado && !senha.trim()) {
      mostrarAlerta(
        "Campos obrigatórios",
        "Preencha todos os campos para continuar.",
        "aviso",
        () => emailRef.current?.focus()
      );

      return;
    }

    if (!emailDigitado) {
      mostrarAlerta(
        "E-mail obrigatório",
        "Preencha todos os campos para continuar.",
        "aviso",
        () => emailRef.current?.focus()
      );

      return;
    }

    if (!senha.trim()) {
      mostrarAlerta(
        "Senha obrigatória",
        "Preencha todos os campos para continuar.",
        "aviso",
        () => senhaRef.current?.focus()
      );

      return;
    }

    // FORMATO DO E-MAIL

    if (!emailValido(emailDigitado)) {
      mostrarAlerta(
        "E-mail inválido",
        "Digite um endereço de e-mail válido, por exemplo: usuario@gmail.com.",
        "erro",
        () => emailRef.current?.focus()
      );

      return;
    }

    // AUTENTICAÇÃO

    try {
      setCarregando(true);

      const autenticado = await autenticarUsuario(
        emailDigitado,
        senha
      );

      if (autenticado?.access_token) {
        mostrarAlerta(
          "Login realizado!",
          "Bem-vindo ao Camisa10! Prepare-se para entrar em campo.",
          "sucesso",
          () => navigation.navigate("Home")
        );

        return;
      }

      mostrarAlerta(
        "Não foi possível entrar",
        "O e-mail ou a senha estão incorretos. Verifique seus dados e tente novamente.",
        "erro"
      );

    } catch (erro) {
      mostrarAlerta(
        "Erro ao entrar",
        "Não foi possível realizar o login. Tente novamente mais tarde.",
        "erro"
      );

    } finally {
      setCarregando(false);
    }
  }

  // ==================================================
  // TELA
  // ==================================================

  return (
    <View className="flex-1 bg-fundo">

      {/* FUNDO */}

      <View className="absolute left-0 right-0 top-0 h-[302px] overflow-hidden">
        <Image
          source={require("../../assets/ImagemFundoLogin.png")}
          resizeMode="cover"
          className="absolute left-0 top-0 h-[302px] w-full"
        />
      </View>

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "android" ? "padding" : "height"}
        keyboardVerticalOffset={0}
        style={{ flex: 1 }}
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

            {/* LOGO */}

            <View className="h-[190px] items-center justify-center">

              <Image
                source={require("../../assets/Logo.png")}
                resizeMode="contain"
                className="h-[191px] w-[180px]"
              />

            </View>

            {/* TÍTULO */}

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

            {/* BOAS-VINDAS */}

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

            {/* E-MAIL */}

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
                ref={emailRef}
                icon={EnvelopeIcon}
                placeholder="seu@email.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() => senhaRef.current?.focus()}
              />

            </View>

            {/* SENHA */}

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
                ref={senhaRef}
                icon={LockIcon}
                placeholder="Digite sua senha"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry={!mostrarSenha}
                returnKeyType="done"
                onSubmitEditing={entrar}
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

            {/* ESQUECEU A SENHA */}

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

            {/* BOTÃO ENTRAR */}

            <Pressable
              onPress={entrar}
              disabled={carregando}
              className="mt-8 h-[50px] flex-row items-center justify-center rounded-[10px] bg-verde"
              style={({ pressed }) => ({
                opacity: carregando ? 0.7 : pressed ? 0.8 : 1,
              })}
            >

              {carregando ? (
                <ActivityIndicator
                  size="small"
                  color="#F5F7F8"
                />
              ) : (
                <>
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
                </>
              )}

            </Pressable>

            {/* DIVISOR */}

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

            {/* GOOGLE */}

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

            {/* CADASTRO */}

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

      {/* POP-UP PERSONALIZADO */}

      <ModalAlerta
        visible={alerta.visible}
        titulo={alerta.titulo}
        mensagem={alerta.mensagem}
        tipo={alerta.tipo}
        onClose={fecharAlerta}
      />

    </View>
  );
}