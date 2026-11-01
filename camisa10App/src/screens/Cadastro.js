
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

import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";

import {
  ArrowLeftIcon,
  CalendarBlankIcon,
  CameraIcon,
  CheckCircleIcon,
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  ImageIcon,
  InfoIcon,
  LockIcon,
  UserIcon,
  WarningCircleIcon,
  XIcon,
} from "phosphor-react-native";

import { useNavigation } from "@react-navigation/native";

import Input from "../components/input";
import Checkbox from "../components/checkbox";
import PasswordRequirement from "../components/passwordRequirement";

// =============================================================
// MODAL PERSONALIZADO
// =============================================================

function ModalAlerta({ visible, tipo, titulo, mensagem, onClose }) {
  const opacidade = useRef(new Animated.Value(0)).current;
  const escala = useRef(new Animated.Value(0.85)).current;
  const deslocamento = useRef(new Animated.Value(20)).current;

  const configuracoes = {
    erro: {
      cor: "#E53935",
      Icone: WarningCircleIcon,
      botao: "Entendi",
    },
    sucesso: {
      cor: "#00C853",
      Icone: CheckCircleIcon,
      botao: "Continuar",
    },
    aviso: {
      cor: "#FFC107",
      Icone: InfoIcon,
      botao: "Entendi",
    },
  };

  const atual = configuracoes[tipo] || configuracoes.aviso;
  const Icone = atual.Icone;

  useEffect(() => {
    if (visible) {
      opacidade.setValue(0);
      escala.setValue(0.85);
      deslocamento.setValue(20);

      Animated.parallel([
        Animated.timing(opacidade, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.spring(escala, {
          toValue: 1,
          friction: 7,
          tension: 80,
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

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <Animated.View
        className="flex-1 items-center justify-center px-7"
        style={{
          backgroundColor: "rgba(0,0,0,0.72)",
          opacity: opacidade,
        }}
      >
        <Animated.View
          className="w-full rounded-2xl border border-cartao-borda bg-cartao p-6"
          style={{
            opacity: opacidade,
            transform: [
              { scale: escala },
              { translateY: deslocamento },
            ],
          }}
        >
          <Pressable
            onPress={onClose}
            className="absolute right-4 top-4 z-10 p-1"
          >
            <XIcon size={21} color="#A8B2B9" />
          </Pressable>

          <View
            className="mb-4 h-14 w-14 items-center justify-center rounded-full"
            style={{ backgroundColor: `${atual.cor}20` }}
          >
            <Icone size={30} color={atual.cor} weight="bold" />
          </View>

          <Text
            className="mb-2 text-xl font-bold text-texto"
            style={{ fontFamily: "Anuphan" }}
          >
            {titulo}
          </Text>

          <Text
            className="text-sm leading-6 text-texto-sec"
            style={{ fontFamily: "Anuphan" }}
          >
            {mensagem}
          </Text>

          <Pressable
            onPress={onClose}
            className="mt-6 h-12 items-center justify-center rounded-xl"
            style={{ backgroundColor: atual.cor }}
          >
            <Text
              className="text-base font-bold text-white"
              style={{ fontFamily: "Inter" }}
            >
              {atual.botao}
            </Text>
          </Pressable>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

// =============================================================
// MODAL DE ESCOLHA DA FOTO
// =============================================================

function ModalFoto({ visible, onClose, onCamera, onGaleria }) {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <Pressable
        className="flex-1 items-center justify-center px-7"
        style={{ backgroundColor: "rgba(0,0,0,0.75)" }}
        onPress={onClose}
      >
        <Pressable
          className="w-full rounded-2xl border border-cartao-borda bg-cartao p-5"
          onPress={(event) => event.stopPropagation()}
        >
          <View className="mb-5 flex-row items-center justify-between">
            <Text
              className="text-xl font-bold text-texto"
              style={{ fontFamily: "Anuphan" }}
            >
              Foto de perfil
            </Text>

            <Pressable onPress={onClose} className="p-1">
              <XIcon size={22} color="#A8B2B9" />
            </Pressable>
          </View>

          <Text
            className="mb-5 text-sm text-texto-sec"
            style={{ fontFamily: "Anuphan" }}
          >
            Escolha como deseja adicionar sua foto ao Camisa10.
          </Text>

          {Platform.OS !== "web" && (
            <Pressable
              onPress={onCamera}
              className="mb-3 h-14 flex-row items-center rounded-xl border border-cartao-borda bg-fundo px-4"
            >
              <CameraIcon size={24} color="#00C853" weight="bold" />
              <Text
                className="ml-3 text-base text-texto"
                style={{ fontFamily: "Anuphan" }}
              >
                Tirar uma foto
              </Text>
            </Pressable>
          )}

          <Pressable
            onPress={onGaleria}
            className="h-14 flex-row items-center rounded-xl border border-cartao-borda bg-fundo px-4"
          >
            <ImageIcon size={24} color="#00C853" weight="bold" />
            <Text
              className="ml-3 text-base text-texto"
              style={{ fontFamily: "Anuphan" }}
            >
              {Platform.OS === "web"
                ? "Escolher imagem do computador"
                : "Escolher da galeria"}
            </Text>
          </Pressable>

          <Pressable
            onPress={onClose}
            className="mt-4 items-center py-2"
          >
            <Text
              className="text-sm text-texto-sec"
              style={{ fontFamily: "Anuphan" }}
            >
              Cancelar
            </Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

// =============================================================
// TELA DE CADASTRO
// =============================================================

export function Cadastro() {
  const navigation = useNavigation();

  // Estados
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmacao, setConfirmacao] = useState("");

  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);

  const [termos, setTermos] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [modalFoto, setModalFoto] = useState(false);

  const [alerta, setAlerta] = useState({
    visivel: false,
    tipo: "aviso",
    titulo: "",
    mensagem: "",
  });

  const acaoAlertaRef = useRef(null);

  // Referências dos campos e da rolagem
  const scrollRef = useRef(null);

  const nomeRef = useRef(null);
  const emailRef = useRef(null);
  const dataRef = useRef(null);
  const senhaRef = useRef(null);
  const confirmacaoRef = useRef(null);

  const posicoesCampos = useRef({});

  // ===========================================================
  // ALERTAS
  // ===========================================================

  function mostrarAlerta(tipo, titulo, mensagem, acao = null) {
    acaoAlertaRef.current = acao;

    setAlerta({
      visivel: true,
      tipo,
      titulo,
      mensagem,
    });
  }

  function fecharAlerta() {
    setAlerta((atual) => ({
      ...atual,
      visivel: false,
    }));

    const acao = acaoAlertaRef.current;
    acaoAlertaRef.current = null;

    if (acao) {
      setTimeout(() => acao(), 250);
    }
  }

  // ===========================================================
  // REDIRECIONAMENTO PARA O CAMPO
  // ===========================================================

  function focarCampo(nomeCampo, referencia) {
    const posicao = posicoesCampos.current[nomeCampo];

    if (posicao !== undefined && scrollRef.current) {
      scrollRef.current.scrollTo({
        y: Math.max(0, posicao - 30),
        animated: true,
      });
    }

    // Aguarda a rolagem antes de abrir o teclado.
    setTimeout(() => {
      referencia?.current?.focus?.();
    }, 350);
  }

  function registrarPosicao(nomeCampo, evento) {
    posicoesCampos.current[nomeCampo] = evento.nativeEvent.layout.y;
  }

  function campoObrigatorioVazio() {
    if (!nome.trim()) {
      return {
        campo: "nome",
        referencia: nomeRef,
        titulo: "Nome não informado",
        mensagem: "Preencha seu nome completo para continuar.",
      };
    }

    if (!email.trim()) {
      return {
        campo: "email",
        referencia: emailRef,
        titulo: "E-mail não informado",
        mensagem: "Informe seu endereço de e-mail para continuar.",
      };
    }

    if (!dataNascimento.trim()) {
      return {
        campo: "data",
        referencia: dataRef,
        titulo: "Data não informada",
        mensagem: "Informe sua data de nascimento.",
      };
    }

    if (!senha) {
      return {
        campo: "senha",
        referencia: senhaRef,
        titulo: "Senha não informada",
        mensagem: "Crie uma senha para sua conta.",
      };
    }

    if (!confirmacao) {
      return {
        campo: "confirmacao",
        referencia: confirmacaoRef,
        titulo: "Confirmação não informada",
        mensagem: "Confirme sua senha para continuar.",
      };
    }

    return null;
  }

  // ===========================================================
  // REQUISITOS DA SENHA
  // ===========================================================

  const senhaTem8Caracteres = senha.length >= 8;
  const senhaTemMaiuscula = /[A-Z]/.test(senha);
  const senhaTemNumero = /\d/.test(senha);

  const senhasIguais =
    senha.length > 0 &&
    confirmacao.length > 0 &&
    senha === confirmacao;

  // ===========================================================
  // FORMATAÇÃO DA DATA
  // ===========================================================

  function formatarDataNascimento(valor) {
    const numeros = valor.replace(/\D/g, "").slice(0, 8);

    if (numeros.length <= 2) {
      return numeros;
    }

    if (numeros.length <= 4) {
      return `${numeros.slice(0, 2)}/${numeros.slice(2)}`;
    }

    return `${numeros.slice(0, 2)}/${numeros.slice(2, 4)}/${numeros.slice(4)}`;
  }

  // ===========================================================
  // VALIDAÇÃO DA DATA
  // ===========================================================

  function validarDataNascimento(valor) {
    const formato = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const resultado = valor.match(formato);

    if (!resultado) return "formato";

    const dia = Number(resultado[1]);
    const mes = Number(resultado[2]);
    const ano = Number(resultado[3]);

    if (ano < 1900) return "ano_antigo";

    const data = new Date(ano, mes - 1, dia);

    const dataExiste =
      data.getFullYear() === ano &&
      data.getMonth() === mes - 1 &&
      data.getDate() === dia;

    if (!dataExiste) return "data_invalida";

    const hoje = new Date();
    hoje.setHours(23, 59, 59, 999);

    if (data > hoje) return "futura";

    return null;
  }

  // ===========================================================
  // VALIDAÇÃO DE E-MAIL
  // ===========================================================

  function emailValido(valor) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valor.trim());
  }

  // ===========================================================
  // SELEÇÃO DE FOTO
  // ===========================================================

  async function escolherGaleria() {
    setModalFoto(false);

    try {
      const resultado = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!resultado.canceled && resultado.assets?.length > 0) {
        setFotoPerfil(resultado.assets[0].uri);
      }
    } catch (error) {
      mostrarAlerta(
        "erro",
        "Não foi possível abrir as imagens",
        "Ocorreu um problema ao acessar a galeria. Tente novamente."
      );
    }
  }

  async function tirarFoto() {
    setModalFoto(false);

    try {
      const permissao =
        await ImagePicker.requestCameraPermissionsAsync();

      if (!permissao.granted) {
        mostrarAlerta(
          "aviso",
          "Permissão necessária",
          "Precisamos da sua autorização para acessar a câmera do dispositivo."
        );
        return;
      }

      const resultado = await ImagePicker.launchCameraAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!resultado.canceled && resultado.assets?.length > 0) {
        setFotoPerfil(resultado.assets[0].uri);
      }
    } catch (error) {
      mostrarAlerta(
        "erro",
        "Não foi possível abrir a câmera",
        "Verifique a permissão da câmera e tente novamente."
      );
    }
  }

  // ===========================================================
  // BACKEND - PONTO DE INTEGRAÇÃO FUTURA
  // ===========================================================

  async function cadastrarUsuario() {
    /*
      FUTURA INTEGRAÇÃO COM A API:

      const dataNascimentoISO = dataNascimento
        .split("/")
        .reverse()
        .join("-");

      await api.post("/usuarios", {
        nome,
        email,
        dataNascimento: dataNascimentoISO,
        senha,
        fotoPerfil,
      });

      O backend deverá:
      - Verificar se o e-mail já está cadastrado;
      - Validar os dados recebidos;
      - Criptografar a senha;
      - Salvar os dados no banco;
      - Receber e armazenar a foto de perfil;
      - Retornar o resultado do cadastro.

      A foto deverá ser enviada por multipart/form-data
      ou pelo mecanismo de upload definido na API.
    */

    // Simulação temporária enquanto a API não está disponível.
    await new Promise((resolve) => setTimeout(resolve, 500));

    return true;
  }

  // ===========================================================
  // FUNÇÃO PRINCIPAL DE CADASTRO
  // ===========================================================

  async function cadastrar() {
    if (carregando) return;

    Keyboard.dismiss();

    // Verifica o primeiro campo obrigatório vazio.
    const campoVazio = campoObrigatorioVazio();

    if (campoVazio) {
      mostrarAlerta(
        "aviso",
        campoVazio.titulo,
        campoVazio.mensagem,
        () => focarCampo(
          campoVazio.campo,
          campoVazio.referencia
        )
      );
      return;
    }

    if (!emailValido(email)) {
      mostrarAlerta(
        "erro",
        "E-mail inválido",
        "Informe um endereço de e-mail válido. Exemplo: usuario@gmail.com.",
        () => focarCampo("email", emailRef)
      );
      return;
    }

    const erroData = validarDataNascimento(dataNascimento);

    if (erroData === "formato") {
      mostrarAlerta(
        "erro",
        "Data incompleta",
        "Informe a data de nascimento completa no formato DD/MM/AAAA.",
        () => focarCampo("data", dataRef)
      );
      return;
    }

    if (erroData === "ano_antigo") {
      mostrarAlerta(
        "erro",
        "Ano inválido",
        "O ano de nascimento deve ser 1900 ou posterior. Verifique a data informada.",
        () => focarCampo("data", dataRef)
      );
      return;
    }

    if (erroData === "data_invalida") {
      mostrarAlerta(
        "erro",
        "Data inválida",
        "Essa data não existe. Verifique o dia e o mês informados.",
        () => focarCampo("data", dataRef)
      );
      return;
    }

    if (erroData === "futura") {
      mostrarAlerta(
        "erro",
        "Data futura",
        "A data de nascimento não pode ser posterior à data atual.",
        () => focarCampo("data", dataRef)
      );
      return;
    }

    if (!senhaTem8Caracteres) {
      mostrarAlerta(
        "aviso",
        "Senha muito curta",
        "Sua senha precisa ter pelo menos 8 caracteres.",
        () => focarCampo("senha", senhaRef)
      );
      return;
    }

    if (!senhaTemMaiuscula) {
      mostrarAlerta(
        "aviso",
        "Senha incompleta",
        "Sua senha precisa ter pelo menos uma letra maiúscula.",
        () => focarCampo("senha", senhaRef)
      );
      return;
    }

    if (!senhaTemNumero) {
      mostrarAlerta(
        "aviso",
        "Senha incompleta",
        "Sua senha precisa ter pelo menos um número.",
        () => focarCampo("senha", senhaRef)
      );
      return;
    }

    if (senha !== confirmacao) {
      mostrarAlerta(
        "erro",
        "Senhas diferentes",
        "A senha e a confirmação precisam ser iguais.",
        () => focarCampo("confirmacao", confirmacaoRef)
      );
      return;
    }

    if (!termos) {
      mostrarAlerta(
        "aviso",
        "Termos de Uso",
        "É necessário aceitar os Termos de Uso e a Política de Privacidade para continuar."
      );
      return;
    }

    try {
      setCarregando(true);

      const sucesso = await cadastrarUsuario();

      if (sucesso) {
        mostrarAlerta(
          "sucesso",
          "Cadastro validado!",
          "Todos os dados foram preenchidos corretamente. A integração com o servidor será ativada quando a API estiver disponível.",
          () => navigation.navigate("Login")
        );
      }
    } catch (error) {
      mostrarAlerta(
        "erro",
        "Erro no cadastro",
        "Não foi possível concluir o cadastro. Tente novamente."
      );
    } finally {
      setCarregando(false);
    }
  }

  // ===========================================================
  // INTERFACE
  // ===========================================================

  return (
    <SafeAreaView
      className="flex-1 bg-fundo"
      edges={["top", "bottom"]}
    >
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "android" ? "padding" : "height"}
        keyboardVerticalOffset={0}
        style={{ flex: 1 }}
      >
        <ScrollView
          ref={scrollRef}
          className="flex-1"
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingTop: 20,
            paddingBottom: 40,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* CABEÇALHO */}

          <View className="mb-6 flex-row items-center">
            <Pressable
              onPress={() => navigation.goBack()}
              className="mr-4 p-2"
              hitSlop={8}
            >
              <ArrowLeftIcon
                size={30}
                color="#F5F7F8"
                weight="bold"
              />
            </Pressable>

            <Text
              className="text-xl text-texto"
              style={{ fontFamily: "Anuphan" }}
            >
              Cadastro
            </Text>
          </View>

          {/* TÍTULO */}

          <Text
            className="text-3xl font-bold text-texto"
            style={{ fontFamily: "Anuphan" }}
          >
            Criar{" "}
            <Text className="text-verde">Conta</Text>
          </Text>

          <Text
            className="mt-2 text-sm leading-5 text-texto-sec"
            style={{ fontFamily: "Anuphan" }}
          >
            Preencha os campos com os dados
            correspondentes para criar sua conta.
          </Text>

          {/* FOTO DE PERFIL */}

          <View className="my-7 items-center">
            <Pressable
              onPress={() => setModalFoto(true)}
              className="active:opacity-70"
            >
              <View className="relative h-24 w-24 items-center justify-center overflow-hidden rounded-full border-2 border-verde bg-cartao">
                {fotoPerfil ? (
                  <Image
                    source={{ uri: fotoPerfil }}
                    className="h-full w-full"
                    resizeMode="cover"
                  />
                ) : (
                  <UserIcon
                    size={42}
                    color="#00C853"
                    weight="regular"
                  />
                )}

                <View className="absolute bottom-0 right-0 h-8 w-8 items-center justify-center rounded-full border-2 border-fundo bg-verde">
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
              style={{ fontFamily: "Anuphan" }}
            >
              {fotoPerfil ? "Alterar foto" : "Adicionar foto"}
            </Text>
          </View>

          {/* NOME COMPLETO */}

          <View
            className="mb-4"
            onLayout={(event) => registrarPosicao("nome", event)}
          >
            <Text
              className="mb-2 text-base text-texto"
              style={{ fontFamily: "Anuphan" }}
            >
              Nome completo
            </Text>

            <Input
              ref={nomeRef}
              icon={UserIcon}
              placeholder="Digite seu nome completo"
              value={nome}
              onChangeText={setNome}
              autoCapitalize="words"
              returnKeyType="next"
              onSubmitEditing={() => focarCampo("email", emailRef)}
            />
          </View>

          {/* E-MAIL */}

          <View
            className="mb-4"
            onLayout={(event) => registrarPosicao("email", event)}
          >
            <Text
              className="mb-2 text-base text-texto"
              style={{ fontFamily: "Anuphan" }}
            >
              E-mail
            </Text>

            <Input
              ref={emailRef}
              icon={EnvelopeIcon}
              placeholder="Digite seu e-mail"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="next"
              onSubmitEditing={() => focarCampo("data", dataRef)}
            />
          </View>

          {/* DATA DE NASCIMENTO */}

          <View
            className="mb-4"
            onLayout={(event) => registrarPosicao("data", event)}
          >
            <Text
              className="mb-2 text-base text-texto"
              style={{ fontFamily: "Anuphan" }}
            >
              Data de nascimento
            </Text>

            <Input
              ref={dataRef}
              icon={CalendarBlankIcon}
              placeholder="DD/MM/AAAA"
              value={dataNascimento}
              onChangeText={(valor) =>
                setDataNascimento(formatarDataNascimento(valor))
              }
              keyboardType="numeric"
              autoCapitalize="none"
              maxLength={10}
              returnKeyType="next"
              onSubmitEditing={() => focarCampo("senha", senhaRef)}
            />
          </View>

          {/* SENHA */}

          <View
            className="mb-4"
            onLayout={(event) => registrarPosicao("senha", event)}
          >
            <Text
              className="mb-2 text-base text-texto"
              style={{ fontFamily: "Anuphan" }}
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
              rightIcon={mostrarSenha ? EyeSlashIcon : EyeIcon}
              onRightIconPress={() => setMostrarSenha(!mostrarSenha)}
              returnKeyType="next"
              onSubmitEditing={() =>
                focarCampo("confirmacao", confirmacaoRef)
              }
            />

            <View className="mt-2">
              <PasswordRequirement valid={senhaTem8Caracteres}>
                Mínimo de 8 caracteres
              </PasswordRequirement>

              <PasswordRequirement valid={senhaTemMaiuscula}>
                Pelo menos uma letra maiúscula
              </PasswordRequirement>

              <PasswordRequirement valid={senhaTemNumero}>
                Pelo menos um número
              </PasswordRequirement>
            </View>
          </View>

          {/* CONFIRMAR SENHA */}

          <View
            className="mb-5"
            onLayout={(event) =>
              registrarPosicao("confirmacao", event)
            }
          >
            <Text
              className="mb-2 text-base text-texto"
              style={{ fontFamily: "Anuphan" }}
            >
              Confirmar senha
            </Text>

            <Input
              ref={confirmacaoRef}
              icon={LockIcon}
              placeholder="Confirme sua senha"
              value={confirmacao}
              onChangeText={setConfirmacao}
              secureTextEntry={!mostrarConfirmacao}
              rightIcon={
                mostrarConfirmacao ? EyeSlashIcon : EyeIcon
              }
              onRightIconPress={() =>
                setMostrarConfirmacao(!mostrarConfirmacao)
              }
              returnKeyType="done"
              onSubmitEditing={Keyboard.dismiss}
            />

            <View className="mt-2">
              <PasswordRequirement valid={senhasIguais}>
                As senhas devem ser iguais
              </PasswordRequirement>
            </View>
          </View>

          {/* TERMOS DE USO */}

          <View className="mb-6">
            <Checkbox
              checked={termos}
              onPress={() => setTermos(!termos)}
            >
              Li e concordo com os Termos de Uso
              e Política de Privacidade.
            </Checkbox>
          </View>

          {/* BOTÃO CADASTRAR */}

          <Pressable
            onPress={cadastrar}
            disabled={carregando}
            className="h-12 flex-row items-center justify-center rounded-xl bg-verde"
            style={{ opacity: carregando ? 0.7 : 1 }}
          >
            {carregando ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text
                className="text-base font-bold text-texto"
                style={{ fontFamily: "Inter" }}
              >
                Cadastrar
              </Text>
            )}
          </Pressable>

          {/* VOLTAR PARA LOGIN */}

          <View className="mt-6 flex-row justify-center">
            <Text
              className="text-sm text-texto-sec"
              style={{ fontFamily: "Anuphan" }}
            >
              Já tem uma conta?{" "}
            </Text>

            <Pressable
              onPress={() => navigation.navigate("Login")}
            >
              <Text
                className="text-sm font-bold text-verde"
                style={{ fontFamily: "Anuphan" }}
              >
                Faça Login
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* MODAL DE FOTO */}

      <ModalFoto
        visible={modalFoto}
        onClose={() => setModalFoto(false)}
        onCamera={tirarFoto}
        onGaleria={escolherGaleria}
      />

      {/* MODAL DE ALERTA */}

      <ModalAlerta
        visible={alerta.visivel}
        tipo={alerta.tipo}
        titulo={alerta.titulo}
        mensagem={alerta.mensagem}
        onClose={fecharAlerta}
      />
    </SafeAreaView>
  );
}