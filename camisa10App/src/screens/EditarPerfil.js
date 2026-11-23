import { useState, useEffect } from "react";

import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Modal,
} from "react-native";

import {
  ArrowLeftIcon,
  CalendarBlankIcon,
  EyeIcon,
  EyeSlashIcon,
  LockKeyIcon,
  TrashIcon,
  XIcon,
  CheckCircleIcon,
  WarningCircleIcon,
} from "phosphor-react-native";

import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BottomNav } from "../components/bottomNav";
import { FotoPerfil } from "../components/fotoPerfil";
import { CalendarioPersonalizado } from "../components/calendarioPersonalizado";
import { Texto } from "../components/texto";

import { useAccessibility } from "../context/AccessibilityContext";
import { useAuth } from "../context/AuthContext";

import {
  atualizarFotoPerfil,
  alterarSenha as alterarSenhaAPI,
  excluirConta as excluirContaAPI,
} from "../services/authService";

import { useTheme } from "../context/ThemeContext";

// =====================================================
// COMPONENTE: CAMPO DE TEXTO
// =====================================================

function Campo({
  label,
  valor,
  onChangeText,
  placeholder,
  keyboardType = "default",
  autoCapitalize = "sentences",
}) {
  const { cores } = useTheme();
  const { fontScale } = useAccessibility();

  return (
    <View style={{ marginBottom: 18 }}>
      <Texto
        tamanho={13}
        style={{
          color: cores.textSecondary,
          marginBottom: 8,
          fontWeight: "600",
        }}
      >
        {label}
      </Texto>

      <TextInput
        value={valor}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={cores.textTertiary}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        style={{
          backgroundColor: cores.surface,
          borderWidth: 1,
          borderColor: cores.border,
          borderRadius: 12,
          paddingHorizontal: 15,
          paddingVertical: 14,
          color: cores.text,
          fontSize: 15 * fontScale,
          minHeight: 50,
        }}
      />
    </View>
  );
}

// =====================================================
// COMPONENTE: CAMPO DE SENHA
// =====================================================

function CampoSenha({
  label,
  valor,
  onChangeText,
  mostrar,
  alternarVisibilidade,
  placeholder,
}) {
  const { cores } = useTheme();
  const { fontScale, configuracoes } = useAccessibility();

  const escalaIcone =
    configuracoes.tamanhoTexto === "grande"
      ? 1.15
      : configuracoes.tamanhoTexto === "muitoGrande"
        ? 1.3
        : 1;

  return (
    <View style={{ marginBottom: 17 }}>
      <Texto
        tamanho={13}
        style={{
          color: cores.textSecondary,
          marginBottom: 8,
          fontWeight: "600",
        }}
      >
        {label}
      </Texto>

      <View
        style={{
          backgroundColor: cores.surface,
          borderWidth: 1,
          borderColor: cores.border,
          borderRadius: 12,
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 14,
        }}
      >
        <TextInput
          value={valor}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={cores.textTertiary}
          secureTextEntry={!mostrar}
          autoCapitalize="none"
          style={{
            flex: 1,
            color: cores.text,
            paddingVertical: 14,
            fontSize: 15 * fontScale,
            minHeight: 50,
          }}
        />

        <Pressable
          onPress={alternarVisibilidade}
          hitSlop={10}
          accessibilityRole="button"
          accessibilityLabel={
            mostrar ? "Ocultar senha" : "Mostrar senha"
          }
        >
          {mostrar ? (
            <EyeSlashIcon
              size={21 * escalaIcone}
              color={cores.icon}
            />
          ) : (
            <EyeIcon
              size={21 * escalaIcone}
              color={cores.icon}
            />
          )}
        </Pressable>
      </View>
    </View>
  );
}

// =====================================================
// TELA: EDITAR PERFIL
// =====================================================

export function EditarPerfil() {
  const { cores } = useTheme();
  const { fontScale, configuracoes } = useAccessibility();
  const navigation = useNavigation();

  const escalaIcone =
    configuracoes.tamanhoTexto === "grande"
      ? 1.15
      : configuracoes.tamanhoTexto === "muitoGrande"
        ? 1.3
        : 1;

  const {
    usuario: usuarioAutenticado,
    atualizarDadosUsuario,
    atualizarFotoUsuario,
    sair,
  } = useAuth();

  const [usuario, setUsuario] = useState({
    nome: usuarioAutenticado?.nome || "",
    nomeUsuario: usuarioAutenticado?.apelido || "",
    email: usuarioAutenticado?.email || "",
    dataNascimento: usuarioAutenticado?.data_nascimento
      ? new Date(`${usuarioAutenticado.data_nascimento}T12:00:00`)
      : null,
  });

  useEffect(() => {
    if (!usuarioAutenticado) return;

    setUsuario((anterior) => ({
      ...anterior,
      nome: usuarioAutenticado.nome || "",
      nomeUsuario: usuarioAutenticado.apelido || "",
      email: usuarioAutenticado.email || "",
      dataNascimento: usuarioAutenticado.data_nascimento
        ? new Date(`${usuarioAutenticado.data_nascimento}T12:00:00`)
        : null,
    }));

    setFotoPerfil(usuarioAutenticado.avatar_url || null);
  }, [usuarioAutenticado]);

  const [fotoPerfil, setFotoPerfil] = useState(
    usuarioAutenticado?.avatar_url || null
  );

  const [fotoCarregando, setFotoCarregando] = useState(false);

  // =====================================================
  // MODAIS
  // =====================================================

  const [modalSenha, setModalSenha] = useState(false);
  const [modalExcluir, setModalExcluir] = useState(false);
  const [modalSucesso, setModalSucesso] = useState(false);

  const [mensagemSucesso, setMensagemSucesso] = useState("");

  // =====================================================
  // ALTERAÇÃO DE SENHA
  // =====================================================

  const [senhaAntiga, setSenhaAntiga] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [mostrarSenhaAntiga, setMostrarSenhaAntiga] =
    useState(false);

  const [mostrarNovaSenha, setMostrarNovaSenha] =
    useState(false);

  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] =
    useState(false);

  const [erroSenha, setErroSenha] = useState("");

  // =====================================================
  // EXCLUSÃO DE CONTA
  // =====================================================

  const [senhaExclusao, setSenhaExclusao] = useState("");

  const [mostrarSenhaExclusao, setMostrarSenhaExclusao] =
    useState(false);

  const [confirmacaoExclusao, setConfirmacaoExclusao] =
    useState("");

  const [erroExclusao, setErroExclusao] = useState("");

  // =====================================================
  // CALENDÁRIO
  // =====================================================

  const [mostrarCalendario, setMostrarCalendario] =
    useState(false);

  function formatarData(data) {
    if (!data) return "Selecionar data";

    return data.toLocaleDateString("pt-BR");
  }

  function confirmarData(data) {
    if (data > new Date()) {
      return;
    }

    atualizarCampo("dataNascimento", data);
    setMostrarCalendario(false);
  }

  // =====================================================
  // ATUALIZAÇÃO DOS DADOS
  // =====================================================

  function atualizarCampo(campo, valor) {
    setUsuario((anterior) => ({
      ...anterior,
      [campo]: valor,
    }));
  }

  async function selecionarFoto(uri) {
    if (fotoCarregando) return;

    try {
      setFotoCarregando(true);

      const resultado = await atualizarFotoPerfil(uri);

      setFotoPerfil(resultado.avatar_url);
      atualizarFotoUsuario(resultado.avatar_url);

      setMensagemSucesso("Foto de perfil atualizada com sucesso!");
      setModalSucesso(true);
    } catch (error) {
      console.log("Erro ao atualizar foto:", error.message);

      setMensagemSucesso(
        error.message || "Não foi possível atualizar sua foto."
      );

      setModalSucesso(true);
    } finally {
      setFotoCarregando(false);
    }
  }

  async function salvarAlteracoes() {
    if (!usuario.nome.trim()) {
      setMensagemSucesso("Informe seu nome completo.");
      setModalSucesso(true);
      return;
    }

    if (!usuario.nomeUsuario.trim()) {
      setMensagemSucesso("Informe seu nome de usuário.");
      setModalSucesso(true);
      return;
    }

    if (!usuario.email.trim()) {
      setMensagemSucesso("Informe seu e-mail.");
      setModalSucesso(true);
      return;
    }

    try {
      const dados = {
        nome: usuario.nome.trim(),
        email: usuario.email.trim(),
        apelido: usuario.nomeUsuario.trim(),
        data_nascimento: usuario.dataNascimento
          ? usuario.dataNascimento.toISOString().split("T")[0]
          : null,
      };

      await atualizarDadosUsuario(dados);

      setMensagemSucesso("Seus dados foram atualizados!");
      setModalSucesso(true);
    } catch (error) {
      console.log("ERRO COMPLETO AO SALVAR PERFIL:", error);
      console.log("STACK:", error.stack);

      setMensagemSucesso(
        error.message || "Não foi possível atualizar seus dados."
      );

      setModalSucesso(true);
    }
  }

  // =====================================================
  // ALTERAÇÃO DE SENHA
  // =====================================================

  function abrirModalSenha() {
    setErroSenha("");
    setModalSenha(true);
  }

  function fecharModalSenha() {
    setModalSenha(false);
    setErroSenha("");
    setSenhaAntiga("");
    setNovaSenha("");
    setConfirmarSenha("");
  }

  async function alterarSenha() {
    setErroSenha("");

    if (!senhaAntiga || !novaSenha || !confirmarSenha) {
      setErroSenha("Preencha todos os campos para continuar.");
      return;
    }

    if (novaSenha.length < 8) {
      setErroSenha("A nova senha deve possuir pelo menos 8 caracteres.");
      return;
    }

    if (novaSenha !== confirmarSenha) {
      setErroSenha("A nova senha e a confirmação precisam ser iguais.");
      return;
    }

    if (senhaAntiga === novaSenha) {
      setErroSenha("A nova senha deve ser diferente da senha antiga.");
      return;
    }

    try {
      await alterarSenhaAPI(senhaAntiga, novaSenha);

      fecharModalSenha();
      setMensagemSucesso("Senha alterada com sucesso!");
      setModalSucesso(true);
    } catch (erro) {
      console.error("ERRO AO ALTERAR SENHA:", erro);
      setErroSenha(erro.message || "Não foi possível alterar a senha.");
    }
  }

  // =====================================================
  // EXCLUSÃO DE CONTA
  // =====================================================

  function abrirModalExcluir() {
    setConfirmacaoExclusao("");
    setErroExclusao("");
    setModalExcluir(true);
  }

  function fecharModalExcluir() {
    setModalExcluir(false);
    setConfirmacaoExclusao("");
    setErroExclusao("");
    setSenhaExclusao("");
    setMostrarSenhaExclusao(false);
  }

  async function excluirConta() {
    setErroExclusao("");

    if (confirmacaoExclusao.trim() !== "EXCLUIR") {
      setErroExclusao('Digite exatamente "EXCLUIR" para confirmar.');
      return;
    }

    if (!senhaExclusao) {
      setErroExclusao("Informe sua senha atual para continuar.");
      return;
    }

    try {
      await excluirContaAPI(senhaExclusao);

      fecharModalExcluir();

      await sair();

      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (erro) {
      setErroExclusao(
        erro.message || "Não foi possível excluir sua conta."
      );
    }
  }

  // =====================================================
  // TELA
  // =====================================================

  return (
    <SafeAreaView
      edges={["top", "bottom"]}
      style={{
        flex: 1,
        backgroundColor: cores.background,
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 105,
        }}
      >
        {/* CABEÇALHO */}

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 20,
            paddingTop: 12,
            paddingBottom: 22,
          }}
        >
          <Pressable
            onPress={() => navigation.goBack()}
            style={{
              minWidth: 42,
              minHeight: 42,
              borderRadius: 12,
              backgroundColor: cores.surfaceSecondary,
              alignItems: "center",
              justifyContent: "center",
              padding: 5,
            }}
          >
            <ArrowLeftIcon
              size={22 * escalaIcone}
              color={cores.icon}
            />
          </Pressable>

          <Texto
            tamanho={21}
            style={{
              color: cores.text,
              fontWeight: "bold",
              marginLeft: 15,
              flexShrink: 1,
            }}
          >
            Editar Perfil
          </Texto>
        </View>

        {/* FOTO DE PERFIL */}

        <View style={{ marginBottom: 30 }}>
          <FotoPerfil
            foto={fotoPerfil}
            nome={usuario.nome}
            onFotoSelecionada={selecionarFoto}
          />
        </View>

        {/* INFORMAÇÕES PESSOAIS */}

        <View style={{ paddingHorizontal: 20 }}>
          <Texto
            tamanho={17}
            style={{
              color: cores.text,
              fontWeight: "bold",
              marginBottom: 18,
            }}
          >
            Informações pessoais
          </Texto>

          <Campo
            label="Nome completo"
            valor={usuario.nome}
            onChangeText={(valor) => atualizarCampo("nome", valor)}
            placeholder="Digite seu nome completo"
          />

          <Campo
            label="Nome de usuário"
            valor={usuario.nomeUsuario}
            onChangeText={(valor) => atualizarCampo("nomeUsuario", valor)}
            placeholder="Digite seu nome de usuário"
            autoCapitalize="none"
          />

          <Campo
            label="E-mail"
            valor={usuario.email}
            onChangeText={(valor) => atualizarCampo("email", valor)}
            placeholder="Digite seu e-mail"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* DATA DE NASCIMENTO */}

          <View style={{ marginBottom: 25 }}>
            <Texto
              tamanho={13}
              style={{
                color: cores.textSecondary,
                marginBottom: 8,
                fontWeight: "600",
              }}
            >
              Data de nascimento
            </Texto>

            <Pressable
              onPress={() => setMostrarCalendario(true)}
              style={{
                backgroundColor: cores.surface,
                borderWidth: 1,
                borderColor: cores.border,
                borderRadius: 12,
                paddingHorizontal: 15,
                paddingVertical: 15,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                minHeight: 52,
              }}
            >
              <Texto
                tamanho={15}
                style={{
                  color: cores.text,
                  flex: 1,
                  marginRight: 10,
                }}
              >
                {formatarData(usuario.dataNascimento)}
              </Texto>

              <CalendarBlankIcon
                size={21 * escalaIcone}
                color={cores.primary}
              />
            </Pressable>
          </View>

          {/* ALTERAR SENHA */}

          <View
            style={{
              borderTopWidth: 1,
              borderTopColor: cores.border,
              paddingTop: 23,
              marginBottom: 25,
            }}
          >
            <Texto
              tamanho={17}
              style={{
                color: cores.text,
                fontWeight: "bold",
                marginBottom: 8,
              }}
            >
              Segurança
            </Texto>

            <Texto
              tamanho={13}
              style={{
                color: cores.textSecondary,
                lineHeight: 19 * fontScale,
                marginBottom: 15,
              }}
            >
              Mantenha sua conta protegida atualizando sua senha
              periodicamente.
            </Texto>

            <Pressable
              onPress={abrirModalSenha}
              style={{
                backgroundColor: cores.surfaceSecondary,
                borderWidth: 1,
                borderColor: cores.border,
                borderRadius: 12,
                padding: 16,
                flexDirection: "row",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <LockKeyIcon
                size={22 * escalaIcone}
                color={cores.primary}
              />

              <Texto
                tamanho={15}
                style={{
                  color: cores.text,
                  fontWeight: "600",
                  marginLeft: 12,
                  flex: 1,
                }}
              >
                Alterar senha
              </Texto>

              <Texto
                tamanho={20}
                style={{ color: cores.primary }}
              >
                ›
              </Texto>
            </Pressable>
          </View>

          {/* SALVAR ALTERAÇÕES */}

          <Pressable
            onPress={salvarAlteracoes}
            style={{
              backgroundColor: cores.primary,
              paddingVertical: 16,
              paddingHorizontal: 12,
              borderRadius: 13,
              alignItems: "center",
              marginBottom: 35,
              minHeight: 52,
              justifyContent: "center",
            }}
          >
            <Texto
              tamanho={16}
              style={{
                color: cores.background,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Salvar alterações
            </Texto>
          </Pressable>

          {/* EXCLUSÃO DE CONTA */}

          <View
            style={{
              borderTopWidth: 1,
              borderTopColor: cores.border,
              paddingTop: 24,
              marginBottom: 20,
            }}
          >
            <Texto
              tamanho={17}
              style={{
                color: cores.danger,
                fontWeight: "bold",
                marginBottom: 9,
              }}
            >
              Zona de perigo
            </Texto>

            <Texto
              tamanho={13}
              style={{
                color: cores.textSecondary,
                lineHeight: 20 * fontScale,
                marginBottom: 16,
              }}
            >
              A exclusão da conta poderá remover permanentemente
              seus dados, conquistas e progresso no Camisa10.
            </Texto>

            <Pressable
              onPress={abrirModalExcluir}
              style={{
                borderWidth: 1,
                borderColor: cores.danger,
                borderRadius: 12,
                padding: 15,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap",
                minHeight: 50,
              }}
            >
              <TrashIcon
                size={20 * escalaIcone}
                color={cores.danger}
              />

              <Texto
                tamanho={15}
                style={{
                  color: cores.danger,
                  fontWeight: "bold",
                  marginLeft: 9,
                  textAlign: "center",
                }}
              >
                Excluir minha conta
              </Texto>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      {/* =====================================================
          MODAL DE ALTERAÇÃO DE SENHA
      ===================================================== */}

      <Modal
        visible={modalSenha}
        transparent
        animationType="fade"
        onRequestClose={fecharModalSenha}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: cores.overlay,
            justifyContent: "center",
            paddingHorizontal: 22,
          }}
        >
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center",
              paddingVertical: 20,
            }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View
              style={{
                backgroundColor: cores.surfaceSecondary,
                borderRadius: 20,
                padding: 22,
                borderWidth: 1,
                borderColor: cores.border,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 8,
                }}
              >
                <Texto
                  tamanho={19}
                  style={{
                    color: cores.text,
                    fontWeight: "bold",
                    flex: 1,
                  }}
                >
                  Alterar senha
                </Texto>

                <Pressable
                  onPress={fecharModalSenha}
                  hitSlop={10}
                >
                  <XIcon
                    size={23 * escalaIcone}
                    color={cores.icon}
                  />
                </Pressable>
              </View>

              <Texto
                tamanho={13}
                style={{
                  color: cores.textSecondary,
                  lineHeight: 19 * fontScale,
                  marginBottom: 22,
                }}
              >
                Informe sua senha atual e escolha uma nova senha.
              </Texto>

              <CampoSenha
                label="Senha antiga"
                valor={senhaAntiga}
                onChangeText={(valor) => {
                  setSenhaAntiga(valor);
                  setErroSenha("");
                }}
                mostrar={mostrarSenhaAntiga}
                alternarVisibilidade={() =>
                  setMostrarSenhaAntiga(!mostrarSenhaAntiga)
                }
                placeholder="Digite sua senha atual"
              />

              <CampoSenha
                label="Nova senha"
                valor={novaSenha}
                onChangeText={(valor) => {
                  setNovaSenha(valor);
                  setErroSenha("");
                }}
                mostrar={mostrarNovaSenha}
                alternarVisibilidade={() =>
                  setMostrarNovaSenha(!mostrarNovaSenha)
                }
                placeholder="Digite sua nova senha"
              />

              <CampoSenha
                label="Confirmar nova senha"
                valor={confirmarSenha}
                onChangeText={(valor) => {
                  setConfirmarSenha(valor);
                  setErroSenha("");
                }}
                mostrar={mostrarConfirmarSenha}
                alternarVisibilidade={() =>
                  setMostrarConfirmarSenha(!mostrarConfirmarSenha)
                }
                placeholder="Repita sua nova senha"
              />

              {/* ERRO DE VALIDAÇÃO */}

              {!!erroSenha && (
                <View
                  style={{
                    backgroundColor: "rgba(229,57,53,0.12)",
                    borderWidth: 1,
                    borderColor: "rgba(229,57,53,0.4)",
                    borderRadius: 11,
                    padding: 12,
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 14,
                  }}
                >
                  <WarningCircleIcon
                    size={20 * escalaIcone}
                    color={cores.danger}
                    weight="fill"
                  />

                  <Texto
                    tamanho={12}
                    style={{
                      color: cores.text,
                      flex: 1,
                      marginLeft: 9,
                      lineHeight: 18 * fontScale,
                    }}
                  >
                    {erroSenha}
                  </Texto>
                </View>
              )}

              <Pressable
                onPress={alterarSenha}
                style={{
                  backgroundColor: cores.primary,
                  borderRadius: 12,
                  paddingVertical: 15,
                  paddingHorizontal: 10,
                  alignItems: "center",
                  marginTop: 5,
                  minHeight: 50,
                  justifyContent: "center",
                }}
              >
                <Texto
                  tamanho={15}
                  style={{
                    color: cores.background,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Confirmar alteração
                </Texto>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </Modal>

      {/* =====================================================
          MODAL DE EXCLUSÃO DE CONTA
      ===================================================== */}

      <Modal
        visible={modalExcluir}
        transparent
        animationType="fade"
        onRequestClose={fecharModalExcluir}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: cores.overlay,
            justifyContent: "center",
            paddingHorizontal: 22,
          }}
        >
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center",
              paddingVertical: 20,
            }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View
              style={{
                backgroundColor: cores.surfaceSecondary,
                borderRadius: 20,
                padding: 23,
                borderWidth: 1,
                borderColor: cores.danger,
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  marginBottom: 15,
                }}
              >
                <TrashIcon
                  size={38 * escalaIcone}
                  color={cores.danger}
                />

                <Texto
                  tamanho={20}
                  style={{
                    color: cores.danger,
                    fontWeight: "bold",
                    marginTop: 12,
                    textAlign: "center",
                  }}
                >
                  Excluir conta?
                </Texto>
              </View>

              <Texto
                tamanho={14}
                style={{
                  color: cores.text,
                  textAlign: "center",
                  lineHeight: 21 * fontScale,
                  marginBottom: 17,
                }}
              >
                Essa ação é permanente e poderá apagar seus dados,
                conquistas, XP e progresso no Camisa10.
              </Texto>

              <Texto
                tamanho={13}
                style={{
                  color: cores.textSecondary,
                  marginBottom: 9,
                }}
              >
                Para confirmar, digite EXCLUIR abaixo:
              </Texto>

              <TextInput
                value={confirmacaoExclusao}
                onChangeText={(valor) => {
                  setConfirmacaoExclusao(valor);
                  setErroExclusao("");
                }}
                placeholder="Digite EXCLUIR"
                placeholderTextColor={cores.textTertiary}
                autoCapitalize="characters"
                style={{
                  backgroundColor: cores.surface,
                  borderWidth: 1,
                  borderColor: cores.danger,
                  borderRadius: 11,
                  padding: 14,
                  color: cores.text,
                  marginBottom: 12,
                  fontSize: 14 * fontScale,
                  minHeight: 50,
                }}
              />

              <CampoSenha
                label="Senha atual"
                valor={senhaExclusao}
                onChangeText={(valor) => {
                  setSenhaExclusao(valor);
                  setErroExclusao("");
                }}
                mostrar={mostrarSenhaExclusao}
                alternarVisibilidade={() =>
                  setMostrarSenhaExclusao(!mostrarSenhaExclusao)
                }
                placeholder="Digite sua senha atual"
              />

              {!!erroExclusao && (
                <Texto
                  tamanho={12}
                  style={{
                    color: cores.danger,
                    marginBottom: 13,
                    lineHeight: 18 * fontScale,
                  }}
                >
                  {erroExclusao}
                </Texto>
              )}

              <Pressable
                onPress={excluirConta}
                style={{
                  backgroundColor: cores.danger,
                  paddingVertical: 14,
                  paddingHorizontal: 10,
                  borderRadius: 11,
                  alignItems: "center",
                  marginBottom: 10,
                  minHeight: 50,
                  justifyContent: "center",
                }}
              >
                <Texto
                  tamanho={15}
                  style={{
                    color: "#FFFFFF",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Confirmar exclusão
                </Texto>
              </Pressable>

              <Pressable
                onPress={fecharModalExcluir}
                style={{
                  paddingVertical: 12,
                  alignItems: "center",
                  minHeight: 45,
                  justifyContent: "center",
                }}
              >
                <Texto
                  tamanho={14}
                  style={{
                    color: cores.textSecondary,
                    fontWeight: "600",
                    textAlign: "center",
                  }}
                >
                  Cancelar
                </Texto>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </Modal>

      {/* =====================================================
          MODAL DE SUCESSO / FEEDBACK
      ===================================================== */}

      <Modal
        visible={modalSucesso}
        transparent
        animationType="fade"
        onRequestClose={() => setModalSucesso(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: cores.overlay,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 25,
          }}
        >
          <View
            style={{
              backgroundColor: cores.surfaceSecondary,
              borderRadius: 20,
              padding: 28,
              alignItems: "center",
              width: "100%",
              borderWidth: 1,
              borderColor: cores.border,
            }}
          >
            <CheckCircleIcon
              size={52 * escalaIcone}
              color={cores.primary}
              weight="fill"
            />

            <Texto
              tamanho={18}
              style={{
                color: cores.text,
                fontWeight: "bold",
                marginTop: 15,
                textAlign: "center",
              }}
            >
              {mensagemSucesso}
            </Texto>

            <Pressable
              onPress={() => setModalSucesso(false)}
              style={{
                backgroundColor: cores.primary,
                borderRadius: 11,
                paddingVertical: 12,
                paddingHorizontal: 35,
                marginTop: 22,
                minHeight: 45,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Texto
                tamanho={14}
                style={{
                  color: cores.background,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Continuar
              </Texto>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* CALENDÁRIO PERSONALIZADO */}

      <CalendarioPersonalizado
        visible={mostrarCalendario}
        initialDate={usuario.dataNascimento}
        onCancel={() => setMostrarCalendario(false)}
        onConfirm={confirmarData}
      />

      {/* NAVEGAÇÃO INFERIOR */}

      <BottomNav />
    </SafeAreaView>
  );
}
