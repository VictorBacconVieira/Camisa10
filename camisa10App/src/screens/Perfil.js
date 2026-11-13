
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  Modal,
  Image,
} from "react-native";

import { useState, useEffect } from "react";

import {
  BellIcon,
  CaretRightIcon,
  SealQuestionIcon,
  EyeIcon,
  GearIcon,
  PaletteIcon,
  PencilSimpleIcon,
  SignOutIcon,
  SoccerBallIcon,
  StarIcon,
  TrophyIcon,
  FireIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
} from "phosphor-react-native";

import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BottomNav } from "../components/bottomNav";
import { FotoPerfil } from "../components/fotoPerfil";

import { useAuth } from "../context/AuthContext";

import { obterTimesDisponiveis } from "../services/authService";

import { atualizarFotoPerfil } from "../services/authService";

import { obterEstatisticasGamificacao, obterSequenciaQuiz } from "../services/authService";

export function Perfil() {
  const navigation = useNavigation();

  const [modalSucessoVisivel, setModalSucessoVisivel] =
    useState(false);

  const [pesquisaTime, setPesquisaTime] = useState("");

  const [fotoCarregando, setFotoCarregando] = useState(false);

  const {
    usuario: usuarioAutenticado,
    sair,
    atualizarDadosUsuario,
    atualizarFotoUsuario,
  } = useAuth();

  const [estatisticas, setEstatisticas] = useState(null);
  const [carregandoEstatisticas, setCarregandoEstatisticas] = useState(true);
  const [erroEstatisticas, setErroEstatisticas] = useState(null);

  const [sequenciaQuiz, setSequenciaQuiz] = useState(null);
  const [carregandoSequencia, setCarregandoSequencia] = useState(true);

  const [timesDisponiveis, setTimesDisponiveis] = useState([]);
  const [carregandoTimes, setCarregandoTimes] = useState(false);
  const [modalTimesVisivel, setModalTimesVisivel] = useState(false);

  useEffect(() => {
    async function carregarEstatisticas() {
      try {
        setCarregandoEstatisticas(true);
        setErroEstatisticas(null);

        const dados = await obterEstatisticasGamificacao();

        setEstatisticas(dados);
      } catch (error) {
        console.error("Erro ao carregar estatísticas:", error);
        setErroEstatisticas(error.message);
      } finally {
        setCarregandoEstatisticas(false);
      }
    }
    if (usuarioAutenticado) {
      carregarEstatisticas();
    }
  }, [usuarioAutenticado]);

  useEffect(() => {
    async function carregarSequencia() {
      try {
        setCarregandoSequencia(true);

        const dados = await obterSequenciaQuiz();

        setSequenciaQuiz(dados);
      } catch (error) {
        console.error("Erro ao carregar sequência:", error);
      } finally {
        setCarregandoSequencia(false);
      }
    }

    if (usuarioAutenticado) {
      carregarSequencia();

      const unsubscribe = navigation.addListener(
        "focus",
        carregarSequencia
      );

      return unsubscribe;
    }
  }, [usuarioAutenticado, navigation]);

  async function selecionarFoto(uri) {
    if (fotoCarregando) return;

    try {
      setFotoCarregando(true);

      const resultado = await atualizarFotoPerfil(uri);

      atualizarFotoUsuario(resultado.avatar_url);
      setModalSucessoVisivel(true);
    } catch (error) {
      console.log("Erro ao atualizar foto:", error.message);
    } finally {
      setFotoCarregando(false);
    }
  }

  async function abrirSeletorTimes() {
    try {
      setCarregandoTimes(true);

      const resultado = await obterTimesDisponiveis();

      setTimesDisponiveis(resultado.times || []);
      setModalTimesVisivel(true);
    } catch (error) {
      console.log("Erro ao carregar clubes:", error.message);
    } finally {
      setCarregandoTimes(false);
    }
  }

  async function salvarTimeFavorito(time) {
    try {
      await atualizarDadosUsuario({
        time_coracao_id: time ? String(time.id) : null,
      });

      setModalTimesVisivel(false);
    } catch (error) {
      console.log("Erro ao atualizar time favorito:", error.message);
    }
  }

  const usuario = {
    nome: usuarioAutenticado?.nome || "Usuário",

    // Dados reais recebidos do backend.
    xpTotal: estatisticas?.xp_total ?? 0,
    quizzes: estatisticas?.quizzes_concluidos ?? 0,

    // Sequências recebidas do backend.
    sequenciaAtual: sequenciaQuiz?.sequencia_atual ?? 0,
    maiorSequencia: sequenciaQuiz?.maior_sequencia ?? 0,

    timeFavorito: usuarioAutenticado?.time_coracao?.nome || "Nenhum",
    notificacoes: "Ativadas",
    acessibilidade: "Ver mais",
    tema: "Escuro",

    // Acertos reais registrados pelo backend.
    respostasCorretas: estatisticas?.acertos ?? 0,

    // Aguardando integração do sistema de escalações.
    escalacoesCorretas: null,
  };

  // =========================================================
  // SISTEMA DE NÍVEIS — DADOS RECEBIDOS DO BACKEND
  // =========================================================

  const xpTotal = Math.max(
    0,
    Number(usuario.xpTotal) || 0
  );

  const nivelAtual = estatisticas?.nivel ?? 1;

  const xpInicioNivel = estatisticas?.xp_inicio_nivel ?? 0;

  const xpProximoNivel = estatisticas?.xp_proximo_nivel ?? 10000;

  const xpAtualNivel = estatisticas?.xp_atual_nivel ?? 0;

  const xpNecessarioNivel = estatisticas?.xp_necessario_nivel ?? 10000;

  const progressoNivel = estatisticas?.progresso_nivel ?? 0

  // =========================================================
  // REGRAS DAS CONQUISTAS
  // =========================================================
  // Cada conquista verifica o progresso do usuário.
  //
  // FUTURO BACKEND:
  // Os valores serão recebidos da API.
  // O backend poderá também informar quais conquistas
  // foram desbloqueadas pelo usuário.
  // =========================================================

  const conquistas = [
    {
      id: "sabio",
      nome: "Sábio",
      descricao: "Acertou 100 perguntas",
      progresso: Math.max(
        0,
        Number(usuario.respostasCorretas) || 0
      ),
      requisito: 100,
      Icone: SealQuestionIcon,
    },
    {
      id: "olheiro",
      nome: "Olheiro",
      descricao: "Acertou 10 escalações",
      progresso: usuario.escalacoesCorretas,
      requisito: 10,
      Icone: EyeIcon,
    },
    {
      id: "campeao",
      nome: "Campeão",
      descricao: "Concluiu 50 quizzes",
      progresso: Math.max(
        0,
        Number(usuario.quizzes) || 0
      ),
      requisito: 50,
      Icone: TrophyIcon,
    },
    {
      id: "em-chamas",
      nome: "Em Chamas",
      descricao: "Sequência de 15 dias",
      progresso: Math.max(
        0,
        Number(usuario.maiorSequencia) || 0
      ),
      requisito: 15,
      Icone: FireIcon,
    },
  ].map((conquista) => ({
    ...conquista,
    desbloqueada:
      conquista.progresso !== null &&
      conquista.progresso >= conquista.requisito,
  }));

  return (
    <SafeAreaView
      className="flex-1 bg-fundo"
      edges={["top", "bottom"]}
    >
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingBottom: 105,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* BOTÃO DE VOLTAR */}

        <View className="flex-row items-center px-5 pb-3 pt-4">
          <Pressable
            className="h-10 w-10 items-center justify-center"
            onPress={() => navigation.goBack()}
            accessibilityRole="button"
            accessibilityLabel="Voltar"
            style={({ pressed }) => ({
              opacity: pressed ? 0.6 : 1,
              transform: [{ scale: pressed ? 0.9 : 1 }],
            })}
          >
            <ArrowLeftIcon
              size={25}
              color="#F5F7F8"
              weight="regular"
            />
          </Pressable>

          <Text
            className="ml-3 text-[26px] text-texto"
            style={{ fontFamily: "Anuphan" }}
          >
            Perfil
          </Text>
        </View>

        {/* ================================================= */}
        {/* ÁREA DO PERFIL */}
        {/* ================================================= */}

        <View className="mt-3 bg-fundo px-5">
          <View className="items-center">

            {/* FOTO DE PERFIL - COMPONENTE REUTILIZÁVEL */}

            <FotoPerfil
              foto={usuarioAutenticado?.avatar_url || null}
              nome={usuario.nome}
              tamanho={96}
              onFotoSelecionada={selecionarFoto}
            />

            {/* NOME */}

            <Text
              className="mt-3 text-2xl text-texto"
              style={{
                fontFamily: "Inter",
              }}
            >
              {usuario.nome}
            </Text>

            {/* NÍVEL */}

            <View className="mt-1 flex-row items-center">
              <StarIcon
                size={17}
                color="#FFC107"
                weight="fill"
              />

              <Text
                className="ml-1 text-sm text-texto-sec"
                style={{
                  fontFamily: "Inter",
                }}
              >
                Nível {nivelAtual}
              </Text>
            </View>

            {/* XP */}

            <View className="mt-5 w-full">
              <View className="flex-row justify-between">
                <Text
                  className="text-[11px] text-texto-ter"
                  style={{
                    fontFamily: "Inter",
                  }}
                >
                  XP
                </Text>

                <Text
                  className="text-[11px] text-verde"
                  style={{
                    fontFamily: "Inter",
                  }}
                >
                  {xpAtualNivel.toLocaleString("pt-BR")}
                  {" / "}
                  {xpNecessarioNivel.toLocaleString("pt-BR")}
                </Text>
              </View>

              <View className="mt-2 h-[6px] overflow-hidden rounded-full bg-cartao-borda">
                <View
                  className="h-full rounded-full bg-verde"
                  style={{
                    width: `${progressoNivel}%`,
                  }}
                />
              </View>

              <Text
                className="mt-1 text-right text-[10px] text-texto-ter"
                style={{
                  fontFamily: "Inter",
                }}
              >
                {carregandoEstatisticas
                  ? "Carregando estatísticas..."
                  : erroEstatisticas
                    ? "Não foi possível carregar as estatísticas."
                    : `Faltam ${(xpProximoNivel - xpTotal).toLocaleString("pt-BR")} XP para o próximo nível`
                }
              </Text>
            </View>
          </View>
        </View>

        {/* ================================================= */}
        {/* ESTATÍSTICAS */}
        {/* ================================================= */}

        <View className="mt-6 flex-row px-5">

          {/* QUIZZES */}

          <Pressable
            className="mr-2 flex-1 items-center rounded-lg border border-cartao-borda bg-cartao py-4"
            onPress={() => {
              // FUTURO:
              // Abrir histórico de quizzes.
            }}
            style={({ pressed }) => ({
              opacity: pressed ? 0.75 : 1,
              transform: [
                { scale: pressed ? 0.97 : 1 },
              ],
            })}
          >
            <TrophyIcon
              size={25}
              color="#00C853"
              weight="regular"
            />

            <Text
              className="mt-1 text-base font-bold text-verde"
              style={{
                fontFamily: "Inter",
              }}
            >
              {(Number(usuario.quizzes) || 0).toLocaleString("pt-BR")}
            </Text>

            <Text
              className="text-[11px] text-texto-ter"
              style={{
                fontFamily: "Inter",
              }}
            >
              Quizzes
            </Text>
          </Pressable>

          {/* XP TOTAL */}

          <Pressable
            className="mx-1 flex-1 items-center rounded-lg border border-cartao-borda bg-cartao py-4"
            onPress={() => {
              // FUTURO:
              // Abrir detalhes de XP.
            }}
            style={({ pressed }) => ({
              opacity: pressed ? 0.75 : 1,
              transform: [
                { scale: pressed ? 0.97 : 1 },
              ],
            })}
          >
            <StarIcon
              size={25}
              color="#FFC107"
              weight="fill"
            />

            <Text
              className="mt-1 text-base font-bold text-verde"
              style={{
                fontFamily: "Inter",
              }}
            >
              {xpTotal.toLocaleString("pt-BR")}
            </Text>

            <Text
              className="text-[11px] text-texto-ter"
              style={{
                fontFamily: "Inter",
              }}
            >
              XP Total
            </Text>
          </Pressable>

          {/* SEQUÊNCIA */}

          <Pressable
            className="ml-2 flex-1 items-center rounded-lg border border-cartao-borda bg-cartao py-4"
            onPress={() => {
              // FUTURO:
              // Abrir detalhes da sequência.
            }}
            style={({ pressed }) => ({
              opacity: pressed ? 0.75 : 1,
              transform: [
                { scale: pressed ? 0.97 : 1 },
              ],
            })}
          >
            <FireIcon
              size={25}
              color="#E53935"
              weight="regular"
            />

            <Text
              className="mt-1 text-base font-bold text-verde"
              style={{
                fontFamily: "Inter",
              }}
            >
              {carregandoSequencia
                ? "..."
                : (Number(usuario.sequenciaAtual) || 0).toLocaleString("pt-BR")
              }
            </Text>

            <Text
              className="text-[11px] text-texto-ter"
              style={{
                fontFamily: "Inter",
              }}
            >
              Sequência Atual
            </Text>
          </Pressable>
        </View>

        {/* ================================================= */}
        {/* CONQUISTAS */}
        {/* ================================================= */}

        <View className="mt-7 px-5">
          <Text
            className="text-lg text-texto"
            style={{
              fontFamily: "Inter",
            }}
          >
            Conquistas
          </Text>

          {conquistas.map((conquista) => {
            const Icone = conquista.Icone;

            return (
              <Pressable
                key={conquista.id}
                className={`mt-2 flex-row items-center rounded-lg border bg-cartao px-3 py-3 ${conquista.desbloqueada
                  ? "border-verde"
                  : "border-cartao-borda"
                  }`}
                onPress={() => {
                  // FUTURO:
                  // Poderemos abrir os detalhes da conquista.
                }}
                style={({ pressed }) => ({
                  opacity: pressed
                    ? 0.75
                    : conquista.desbloqueada
                      ? 1
                      : 0.55,
                  transform: [
                    { scale: pressed ? 0.98 : 1 },
                  ],
                })}
              >
                {/* ÍCONE */}

                <View className="h-10 w-10 items-center justify-center rounded-md bg-cartao-borda">
                  <Icone
                    size={24}
                    color={
                      conquista.desbloqueada
                        ? "#00C853"
                        : "#6F7B83"
                    }
                    weight="fill"
                  />
                </View>

                {/* INFORMAÇÕES */}

                <View className="ml-3 flex-1">
                  <Text
                    className={`text-sm ${conquista.desbloqueada
                      ? "text-texto"
                      : "text-texto-ter"
                      }`}
                    style={{
                      fontFamily: "Inter",
                    }}
                  >
                    {conquista.nome}
                  </Text>

                  <Text
                    className="text-[11px] text-texto-ter"
                    style={{
                      fontFamily: "Inter",
                    }}
                  >
                    {conquista.descricao}
                  </Text>

                  {/* PROGRESSO */}

                  <Text
                    className={`mt-1 text-[10px] ${conquista.desbloqueada
                      ? "text-verde"
                      : "text-texto-ter"
                      }`}
                    style={{
                      fontFamily: "Inter",
                    }}
                  >
                    {conquista.progresso === null
                      ? "Em breve"
                      : `${conquista.progresso.toLocaleString("pt-Br")} / ${conquista.requisito.toLocaleString("pt-BR")}`
                    }
                  </Text>
                </View>

                {/* STATUS */}

                {conquista.desbloqueada && (
                  <View className="ml-2">
                    <CheckCircleIcon
                      size={21}
                      color="#00C853"
                      weight="fill"
                    />
                  </View>
                )}
              </Pressable>
            );
          })}
        </View>

        {/* ================================================= */}
        {/* CONFIGURAÇÕES */}
        {/* ================================================= */}

        <View className="mt-7 px-5">
          <Text
            className="text-lg text-texto"
            style={{
              fontFamily: "Inter",
            }}
          >
            Configurações
          </Text>

          {/* EDITAR PERFIL */}

          <View className="mt-2 overflow-hidden rounded-lg border border-cartao-borda bg-cartao">
            <Pressable
              className="h-16 flex-row items-center px-3"
              onPress={() => navigation.navigate("EditarPerfil")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.7 : 1,
              })}
            >
              <PencilSimpleIcon
                size={25}
                color="#F5F7F8"
                weight="regular"
              />

              <Text
                className="ml-3 flex-1 text-sm text-texto"
                style={{
                  fontFamily: "Inter",
                }}
              >
                Editar Perfil
              </Text>

              <CaretRightIcon
                size={19}
                color="#6F7B83"
              />
            </Pressable>
          </View>

          <View className="mt-2 overflow-hidden rounded-lg border border-cartao-borda bg-cartao">

            {/* TIME FAVORITO */}

            <Pressable
              className="h-16 flex-row items-center px-3"
              onPress={abrirSeletorTimes}
              style={({ pressed }) => ({
                opacity: pressed ? 0.7 : 1,
              })}
            >
              <SoccerBallIcon
                size={25}
                color="#F5F7F8"
                weight="regular"
              />

              <Text
                className="ml-3 flex-1 text-sm text-texto"
                style={{
                  fontFamily: "Inter",
                }}
              >
                Meu Time Favorito
              </Text>

              <Text
                className="text-[11px] text-texto-ter"
                style={{
                  fontFamily: "Inter",
                }}
              >
                {usuario.timeFavorito || "Nenhum"}
              </Text>

              <CaretRightIcon
                size={19}
                color="#6F7B83"
              />
            </Pressable>

            <View className="h-px bg-cartao-borda" />

            {/* NOTIFICAÇÕES */}

            <Pressable
              className="h-16 flex-row items-center px-3"
              onPress={() => {
                // FUTURO:
                // Configuração de notificações.
              }}
              style={({ pressed }) => ({
                opacity: pressed ? 0.7 : 1,
              })}
            >
              <BellIcon
                size={25}
                color="#F5F7F8"
                weight="regular"
              />

              <Text
                className="ml-3 flex-1 text-sm text-texto"
                style={{
                  fontFamily: "Inter",
                }}
              >
                Notificações
              </Text>

              <Text
                className="text-[11px] text-texto-ter"
                style={{
                  fontFamily: "Inter",
                }}
              >
                {usuario.notificacoes || "Desativadas"}
              </Text>

              <CaretRightIcon
                size={19}
                color="#6F7B83"
              />
            </Pressable>

            <View className="h-px bg-cartao-borda" />

            {/* ACESSIBILIDADE */}

            <Pressable
              className="h-16 flex-row items-center px-3"
              onPress={() => {
                // FUTURO:
                // Abrir configurações de acessibilidade.
              }}
              style={({ pressed }) => ({
                opacity: pressed ? 0.7 : 1,
              })}
            >
              <GearIcon
                size={25}
                color="#F5F7F8"
                weight="regular"
              />

              <Text
                className="ml-3 flex-1 text-sm text-texto"
                style={{
                  fontFamily: "Inter",
                }}
              >
                Acessibilidade
              </Text>

              <Text
                className="text-[11px] text-texto-ter"
                style={{
                  fontFamily: "Inter",
                }}
              >
                {usuario.acessibilidade || "Ver mais"}
              </Text>

              <CaretRightIcon
                size={19}
                color="#6F7B83"
              />
            </Pressable>

            <View className="h-px bg-cartao-borda" />

            {/* TEMA */}

            <Pressable
              className="h-16 flex-row items-center px-3"
              onPress={() => {
                // FUTURO:
                // Alternar entre tema claro/escuro.
              }}
              style={({ pressed }) => ({
                opacity: pressed ? 0.7 : 1,
              })}
            >
              <PaletteIcon
                size={25}
                color="#F5F7F8"
                weight="regular"
              />

              <Text
                className="ml-3 flex-1 text-sm text-texto"
                style={{
                  fontFamily: "Inter",
                }}
              >
                Tema
              </Text>

              <Text
                className="mr-3 text-[11px] text-texto-ter"
                style={{
                  fontFamily: "Inter",
                }}
              >
                {usuario.tema || "Escuro"}
              </Text>

              <View className="h-[22px] w-[42px] justify-center rounded-full bg-verde px-1">
                <View className="h-[18px] w-[18px] self-end rounded-full bg-white" />
              </View>
            </Pressable>
          </View>
        </View>

        {/* ================================================= */}
        {/* SAIR DA CONTA */}
        {/* ================================================= */}

        <View className="mt-6 px-5">
          <Pressable
            className="h-14 flex-row items-center justify-between rounded-lg border border-vermelho px-3"
            onPress={async () => {
              try {
                await sair();
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Login" }],
                });
              } catch (error) {
                console.log("Erro ao sair da conta:", error.message);
              }
            }}
            style={({ pressed }) => ({
              opacity: pressed ? 0.7 : 1,
              transform: [
                { scale: pressed ? 0.98 : 1 },
              ],
            })}
          >
            <Text
              className="text-base text-vermelho"
              style={{
                fontFamily: "Inter",
              }}
            >
              Sair da Conta
            </Text>

            <SignOutIcon
              size={24}
              color="#E53935"
              weight="regular"
            />
          </Pressable>
        </View>
      </ScrollView>

      {/* ================================================= */}
      {/* MODAL DE SELEÇÃO DO TIME FAVORITO */}
      {/* ================================================= */}

      <Modal
        visible={modalTimesVisivel}
        transparent
        animationType="slide"
        onRequestClose={() => setModalTimesVisivel(false)}
      >
        <View className="flex-1 justify-end bg-black/70">
          <View className="h-[85%] rounded-t-3xl border border-cartao-borda bg-fundo px-5 pt-5">

            {/* CABEÇALHO */}

            <View className="mb-5 flex-row items-center justify-between">
              <Text
                className="text-xl text-texto"
                style={{ fontFamily: "Inter" }}
              >
                Meu Time Favorito
              </Text>

              <Pressable
                onPress={() => setModalTimesVisivel(false)}
              >
                <Text className="text-verde">Fechar</Text>
              </Pressable>
            </View>

            {/* PESQUISA */}

            <TextInput
              value={pesquisaTime}
              onChangeText={setPesquisaTime}
              placeholder="Pesquisar clube..."
              placeholderTextColor="#6F7B83"
              className="mb-4 rounded-xl border border-cartao-borda bg-cartao px-4 py-3 text-texto"
              style={{ fontFamily: "Inter" }}
            />

            {/* REMOVER FAVORITO */}

            <Pressable
              className="mb-3 rounded-xl border border-vermelho px-4 py-3"
              onPress={() => salvarTimeFavorito(null)}
            >
              <Text
                className="text-center text-vermelho"
                style={{ fontFamily: "Inter" }}
              >
                Remover time favorito
              </Text>
            </Pressable>

            {/* LISTA DE CLUBES */}

            {carregandoTimes ? (
              <Text className="mt-5 text-center text-texto-sec">
                Carregando clubes...
              </Text>
            ) : (
              <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
              >
                {timesDisponiveis
                  .filter((time) =>
                    time.nome
                      ?.toLowerCase()
                      .includes(pesquisaTime.toLowerCase().trim())
                  )
                  .map((time) => (
                    <Pressable
                      key={time.id}
                      className="mb-2 flex-row items-center rounded-xl border border-cartao-borda bg-cartao px-3 py-3"
                      onPress={() => salvarTimeFavorito(time)}
                    >
                      {time.logo ? (
                        <Image
                          source={{ uri: time.logo }}
                          className="h-10 w-10"
                          resizeMode="contain"
                        />
                      ) : (
                        <View className="h-10 w-10 rounded-full bg-cartao-borda" />
                      )}

                      <View className="ml-3 flex-1">
                        <Text
                          className="text-sm text-texto"
                          style={{ fontFamily: "Inter" }}
                        >
                          {time.nome}
                        </Text>

                        <Text className="mt-1 text-[10px] text-texto-ter">
                          {time.pais || "País não informado"}
                        </Text>

                        <Text className="mt-1 text-[10px] text-texto-ter">
                          {time.competicoes
                            ?.map((competicao) =>
                              typeof competicao === "string"
                                ? competicao
                                : competicao.name
                            )
                            .filter(Boolean)
                            .join(" • ")}
                        </Text>
                      </View>
                    </Pressable>
                  ))}

                {timesDisponiveis.filter((time) =>
                  time.nome
                    ?.toLowerCase()
                    .includes(pesquisaTime.toLowerCase().trim())
                ).length === 0 && (
                    <Text className="mt-5 text-center text-texto-sec">
                      Nenhum clube encontrado.
                    </Text>
                  )}
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>

      {/* ================================================= */}
      {/* MODAL DE FOTO ATUALIZADA */}
      {/* ================================================= */}

      <Modal
        visible={modalSucessoVisivel}
        transparent
        animationType="fade"
        onRequestClose={() => setModalSucessoVisivel(false)}
      >
        <Pressable
          className="flex-1 items-center justify-center bg-black/70 px-6"
          onPress={() => setModalSucessoVisivel(false)}
        >
          <Pressable
            className="w-full items-center rounded-2xl border border-cartao-borda bg-cartao px-5 py-6"
            onPress={(event) => event.stopPropagation()}
          >
            <CheckCircleIcon
              size={48}
              color="#00C853"
              weight="fill"
            />

            <Text
              className="mt-3 text-center text-base text-texto"
              style={{
                fontFamily: "Inter",
              }}
            >
              Foto de perfil atualizada!
            </Text>

            <Pressable
              className="mt-5 w-full items-center rounded-xl bg-verde py-3"
              onPress={() => setModalSucessoVisivel(false)}
              style={({ pressed }) => ({
                opacity: pressed ? 0.7 : 1,
              })}
            >
              <Text
                className="text-sm font-bold text-white"
                style={{
                  fontFamily: "Inter",
                }}
              >
                Continuar
              </Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>

      {/* ================================================= */}
      {/* BOTTOM NAV */}
      {/* ================================================= */}

      <BottomNav />
    </SafeAreaView>
  );
}