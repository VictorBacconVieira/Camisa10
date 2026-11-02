
import { useState } from "react";

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

// =====================================================
// COMPONENTE: CAMPO DE TEXTO
// Declarado fora de EditarPerfil para preservar o foco.
// =====================================================

function Campo({
  label,
  valor,
  onChangeText,
  placeholder,
  keyboardType = "default",
  autoCapitalize = "sentences",
}) {
  return (
    <View style={{ marginBottom: 18 }}>
      <Text
        style={{
          color: "#A8B2B9",
          fontSize: 13,
          marginBottom: 8,
          fontWeight: "600",
        }}
      >
        {label}
      </Text>

      <TextInput
        value={valor}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#6F7B83"
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        style={{
          backgroundColor: "#111D27",
          borderWidth: 1,
          borderColor: "#26343E",
          borderRadius: 12,
          paddingHorizontal: 15,
          paddingVertical: 14,
          color: "#F5F7F8",
          fontSize: 15,
        }}
      />
    </View>
  );
}

// =====================================================
// COMPONENTE: CAMPO DE SENHA
// Declarado fora de EditarPerfil para preservar o foco.
// =====================================================

function CampoSenha({
  label,
  valor,
  onChangeText,
  mostrar,
  alternarVisibilidade,
  placeholder,
}) {
  return (
    <View style={{ marginBottom: 17 }}>
      <Text
        style={{
          color: "#A8B2B9",
          fontSize: 13,
          marginBottom: 8,
          fontWeight: "600",
        }}
      >
        {label}
      </Text>

      <View
        style={{
          backgroundColor: "#111D27",
          borderWidth: 1,
          borderColor: "#26343E",
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
          placeholderTextColor="#6F7B83"
          secureTextEntry={!mostrar}
          autoCapitalize="none"
          style={{
            flex: 1,
            color: "#F5F7F8",
            paddingVertical: 14,
            fontSize: 15,
          }}
        />

        <Pressable onPress={alternarVisibilidade}>
          {mostrar ? (
            <EyeSlashIcon size={21} color="#A8B2B9" />
          ) : (
            <EyeIcon size={21} color="#A8B2B9" />
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
  const navigation = useNavigation();

  // =====================================================
  // DADOS TEMPORÁRIOS DO USUÁRIO
  // BACKEND: substituir pelos dados do usuário autenticado.
  // =====================================================

  const [usuario, setUsuario] = useState({
    nome: "Neymar Jr.",
    nomeUsuario: "neymarjr",
    email: "neymar@email.com",
    dataNascimento: new Date(1992, 1, 5),
  });

  const [fotoPerfil, setFotoPerfil] = useState(null);

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

  const [confirmacaoExclusao, setConfirmacaoExclusao] =
    useState("");

  const [erroExclusao, setErroExclusao] = useState("");

  // =====================================================
  // CALENDÁRIO
  // =====================================================

  const [mostrarCalendario, setMostrarCalendario] =
    useState(false);

  function formatarData(data) {
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

  function salvarAlteracoes() {
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

    // BACKEND:
    // Enviar os dados atualizados para a API.
    // Exemplo futuro: PUT/PATCH dos dados do usuário.
    // A API deverá validar e-mail, nome de usuário e demais informações.

    setMensagemSucesso("Seus dados foram atualizados!");
    setModalSucesso(true);
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

  function alterarSenha() {
    if (!senhaAntiga || !novaSenha || !confirmarSenha) {
      setErroSenha("Preencha todos os campos para continuar.");
      return;
    }

    if (novaSenha.length < 8) {
      setErroSenha(
        "A nova senha deve possuir pelo menos 8 caracteres."
      );
      return;
    }

    if (novaSenha !== confirmarSenha) {
      setErroSenha(
        "A nova senha e a confirmação precisam ser iguais."
      );
      return;
    }

    if (senhaAntiga === novaSenha) {
      setErroSenha(
        "A nova senha deve ser diferente da senha antiga."
      );
      return;
    }

    // BACKEND:
    // Enviar senha antiga e nova senha para a API.
    // O backend deverá validar a senha antiga e atualizar
    // a senha utilizando hash seguro.
    // Nunca armazenar senhas em texto puro.

    fecharModalSenha();

    setMensagemSucesso("Senha alterada com sucesso!");
    setModalSucesso(true);
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
  }

  function excluirConta() {
    if (confirmacaoExclusao.trim() !== "EXCLUIR") {
      setErroExclusao(
        'Digite exatamente "EXCLUIR" para confirmar.'
      );
      return;
    }

    // BACKEND:
    // Solicitar a exclusão da conta autenticada.
    // O backend deverá validar a identidade do usuário,
    // encerrar a sessão e aplicar a política de exclusão
    // dos dados associados à conta.

    fecharModalExcluir();

    setMensagemSucesso(
      "A exclusão de conta será integrada ao backend futuramente."
    );

    setModalSucesso(true);
  }

  // =====================================================
  // TELA
  // =====================================================

  return (
    <SafeAreaView
      edges={["top", "bottom"]}
      style={{ flex: 1, backgroundColor: "#071018" }}
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
              width: 42,
              height: 42,
              borderRadius: 12,
              backgroundColor: "#16232D",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ArrowLeftIcon size={22} color="#F5F7F8" />
          </Pressable>

          <Text
            style={{
              color: "#F5F7F8",
              fontSize: 21,
              fontWeight: "bold",
              marginLeft: 15,
            }}
          >
            Editar Perfil
          </Text>
        </View>

        {/* FOTO DE PERFIL */}

        <View style={{ marginBottom: 30 }}>
          <FotoPerfil
            foto={fotoPerfil}
            nome={usuario.nome}
            onFotoSelecionada={(uri) => {
              setFotoPerfil(uri);

              // BACKEND:
              // Futuramente enviar a imagem para o serviço
              // de armazenamento e atualizar a foto do usuário.

              setMensagemSucesso("Foto de perfil atualizada!");
              setModalSucesso(true);
            }}
          />
        </View>

        {/* INFORMAÇÕES PESSOAIS */}

        <View style={{ paddingHorizontal: 20 }}>
          <Text
            style={{
              color: "#F5F7F8",
              fontSize: 17,
              fontWeight: "bold",
              marginBottom: 18,
            }}
          >
            Informações pessoais
          </Text>

          <Campo
            label="Nome completo"
            valor={usuario.nome}
            onChangeText={(valor) =>
              atualizarCampo("nome", valor)
            }
            placeholder="Digite seu nome completo"
          />

          <Campo
            label="Nome de usuário"
            valor={usuario.nomeUsuario}
            onChangeText={(valor) =>
              atualizarCampo("nomeUsuario", valor)
            }
            placeholder="Digite seu nome de usuário"
            autoCapitalize="none"
          />

          <Campo
            label="E-mail"
            valor={usuario.email}
            onChangeText={(valor) =>
              atualizarCampo("email", valor)
            }
            placeholder="Digite seu e-mail"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* DATA DE NASCIMENTO */}

          <View style={{ marginBottom: 25 }}>
            <Text
              style={{
                color: "#A8B2B9",
                fontSize: 13,
                marginBottom: 8,
                fontWeight: "600",
              }}
            >
              Data de nascimento
            </Text>

            <Pressable
              onPress={() => setMostrarCalendario(true)}
              style={{
                backgroundColor: "#111D27",
                borderWidth: 1,
                borderColor: "#26343E",
                borderRadius: 12,
                paddingHorizontal: 15,
                paddingVertical: 15,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ color: "#F5F7F8", fontSize: 15 }}>
                {formatarData(usuario.dataNascimento)}
              </Text>

              <CalendarBlankIcon size={21} color="#00C853" />
            </Pressable>
          </View>

          {/* ALTERAR SENHA */}

          <View
            style={{
              borderTopWidth: 1,
              borderTopColor: "#26343E",
              paddingTop: 23,
              marginBottom: 25,
            }}
          >
            <Text
              style={{
                color: "#F5F7F8",
                fontSize: 17,
                fontWeight: "bold",
                marginBottom: 8,
              }}
            >
              Segurança
            </Text>

            <Text
              style={{
                color: "#A8B2B9",
                fontSize: 13,
                lineHeight: 19,
                marginBottom: 15,
              }}
            >
              Mantenha sua conta protegida atualizando sua senha
              periodicamente.
            </Text>

            <Pressable
              onPress={abrirModalSenha}
              style={{
                backgroundColor: "#16232D",
                borderWidth: 1,
                borderColor: "#26343E",
                borderRadius: 12,
                padding: 16,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <LockKeyIcon size={22} color="#00C853" />

              <Text
                style={{
                  color: "#F5F7F8",
                  fontSize: 15,
                  fontWeight: "600",
                  marginLeft: 12,
                  flex: 1,
                }}
              >
                Alterar senha
              </Text>

              <Text style={{ color: "#00C853", fontSize: 20 }}>
                ›
              </Text>
            </Pressable>
          </View>

          {/* SALVAR ALTERAÇÕES */}

          <Pressable
            onPress={salvarAlteracoes}
            style={{
              backgroundColor: "#00C853",
              paddingVertical: 16,
              borderRadius: 13,
              alignItems: "center",
              marginBottom: 35,
            }}
          >
            <Text
              style={{
                color: "#071018",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Salvar alterações
            </Text>
          </Pressable>

          {/* EXCLUSÃO DE CONTA */}

          <View
            style={{
              borderTopWidth: 1,
              borderTopColor: "#26343E",
              paddingTop: 24,
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                color: "#E53935",
                fontSize: 17,
                fontWeight: "bold",
                marginBottom: 9,
              }}
            >
              Zona de perigo
            </Text>

            <Text
              style={{
                color: "#A8B2B9",
                fontSize: 13,
                lineHeight: 20,
                marginBottom: 16,
              }}
            >
              A exclusão da conta poderá remover permanentemente
              seus dados, conquistas e progresso no Camisa10.
            </Text>

            <Pressable
              onPress={abrirModalExcluir}
              style={{
                borderWidth: 1,
                borderColor: "#E53935",
                borderRadius: 12,
                padding: 15,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TrashIcon size={20} color="#E53935" />

              <Text
                style={{
                  color: "#E53935",
                  fontWeight: "bold",
                  fontSize: 15,
                  marginLeft: 9,
                }}
              >
                Excluir minha conta
              </Text>
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
            backgroundColor: "rgba(0,0,0,0.75)",
            justifyContent: "center",
            paddingHorizontal: 22,
          }}
        >
          <View
            style={{
              backgroundColor: "#16232D",
              borderRadius: 20,
              padding: 22,
              borderWidth: 1,
              borderColor: "#26343E",
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
              <Text
                style={{
                  color: "#F5F7F8",
                  fontSize: 19,
                  fontWeight: "bold",
                }}
              >
                Alterar senha
              </Text>

              <Pressable onPress={fecharModalSenha}>
                <XIcon size={23} color="#A8B2B9" />
              </Pressable>
            </View>

            <Text
              style={{
                color: "#A8B2B9",
                fontSize: 13,
                lineHeight: 19,
                marginBottom: 22,
              }}
            >
              Informe sua senha atual e escolha uma nova senha.
            </Text>

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
                  size={20}
                  color="#E53935"
                  weight="fill"
                />

                <Text
                  style={{
                    color: "#F5F7F8",
                    fontSize: 12,
                    flex: 1,
                    marginLeft: 9,
                    lineHeight: 18,
                  }}
                >
                  {erroSenha}
                </Text>
              </View>
            )}

            <Pressable
              onPress={alterarSenha}
              style={{
                backgroundColor: "#00C853",
                borderRadius: 12,
                paddingVertical: 15,
                alignItems: "center",
                marginTop: 5,
              }}
            >
              <Text
                style={{
                  color: "#071018",
                  fontWeight: "bold",
                  fontSize: 15,
                }}
              >
                Confirmar alteração
              </Text>
            </Pressable>
          </View>
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
            backgroundColor: "rgba(0,0,0,0.8)",
            justifyContent: "center",
            paddingHorizontal: 22,
          }}
        >
          <View
            style={{
              backgroundColor: "#16232D",
              borderRadius: 20,
              padding: 23,
              borderWidth: 1,
              borderColor: "#E53935",
            }}
          >
            <View
              style={{
                alignItems: "center",
                marginBottom: 15,
              }}
            >
              <TrashIcon size={38} color="#E53935" />

              <Text
                style={{
                  color: "#E53935",
                  fontSize: 20,
                  fontWeight: "bold",
                  marginTop: 12,
                }}
              >
                Excluir conta?
              </Text>
            </View>

            <Text
              style={{
                color: "#F5F7F8",
                fontSize: 14,
                textAlign: "center",
                lineHeight: 21,
                marginBottom: 17,
              }}
            >
              Essa ação é permanente e poderá apagar seus dados,
              conquistas, XP e progresso no Camisa10.
            </Text>

            <Text
              style={{
                color: "#A8B2B9",
                fontSize: 13,
                marginBottom: 9,
              }}
            >
              Para confirmar, digite EXCLUIR abaixo:
            </Text>

            <TextInput
              value={confirmacaoExclusao}
              onChangeText={(valor) => {
                setConfirmacaoExclusao(valor);
                setErroExclusao("");
              }}
              placeholder="Digite EXCLUIR"
              placeholderTextColor="#6F7B83"
              autoCapitalize="characters"
              style={{
                backgroundColor: "#111D27",
                borderWidth: 1,
                borderColor: "#E53935",
                borderRadius: 11,
                padding: 14,
                color: "#F5F7F8",
                marginBottom: 12,
              }}
            />

            {!!erroExclusao && (
              <Text
                style={{
                  color: "#E53935",
                  fontSize: 12,
                  marginBottom: 13,
                }}
              >
                {erroExclusao}
              </Text>
            )}

            <Pressable
              onPress={excluirConta}
              style={{
                backgroundColor: "#E53935",
                paddingVertical: 14,
                borderRadius: 11,
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  fontWeight: "bold",
                  fontSize: 15,
                }}
              >
                Confirmar exclusão
              </Text>
            </Pressable>

            <Pressable
              onPress={fecharModalExcluir}
              style={{
                paddingVertical: 12,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#A8B2B9",
                  fontWeight: "600",
                }}
              >
                Cancelar
              </Text>
            </Pressable>
          </View>
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
            backgroundColor: "rgba(0,0,0,0.75)",
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 25,
          }}
        >
          <View
            style={{
              backgroundColor: "#16232D",
              borderRadius: 20,
              padding: 28,
              alignItems: "center",
              width: "100%",
              borderWidth: 1,
              borderColor: "#26343E",
            }}
          >
            <CheckCircleIcon
              size={52}
              color="#00C853"
              weight="fill"
            />

            <Text
              style={{
                color: "#F5F7F8",
                fontSize: 18,
                fontWeight: "bold",
                marginTop: 15,
                textAlign: "center",
              }}
            >
              {mensagemSucesso}
            </Text>

            <Pressable
              onPress={() => setModalSucesso(false)}
              style={{
                backgroundColor: "#00C853",
                borderRadius: 11,
                paddingVertical: 12,
                paddingHorizontal: 35,
                marginTop: 22,
              }}
            >
              <Text
                style={{
                  color: "#071018",
                  fontWeight: "bold",
                }}
              >
                Continuar
              </Text>
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