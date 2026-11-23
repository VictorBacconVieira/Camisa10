import {
  Pressable,
  ScrollView,
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
  PersonArmsSpreadIcon,
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
import { Texto } from "../components/texto";

import { useAuth } from "../context/AuthContext";
import { obterTimesDisponiveis } from "../services/authService";
import { atualizarFotoPerfil } from "../services/authService";
import {
  obterEstatisticasGamificacao,
  obterSequenciaQuiz,
} from "../services/authService";

import { useTheme } from "../context/ThemeContext";
import { useAccessibility } from "../context/AccessibilityContext";

export function Perfil() {
  const navigation = useNavigation();

  const { temaAtivo, cores, alterarTema } = useTheme();

  const { fontScale, configuracoes } = useAccessibility();

  // =========================================================
  // ESCALA DOS ÍCONES
  // =========================================================

  const escalaIcone =
    configuracoes.tamanhoTexto === "grande"
      ? 1.2
      : configuracoes.tamanhoTexto === "muitoGrande"
        ? 1.4
        : 1;

  // =========================================================
  // ESTADOS
  // =========================================================

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
  const [carregandoEstatisticas, setCarregandoEstatisticas] =
    useState(true);
  const [erroEstatisticas, setErroEstatisticas] = useState(null);

  const [sequenciaQuiz, setSequenciaQuiz] = useState(null);
  const [carregandoSequencia, setCarregandoSequencia] =
    useState(true);

  const [timesDisponiveis, setTimesDisponiveis] = useState([]);
  const [carregandoTimes, setCarregandoTimes] = useState(false);
  const [modalTimesVisivel, setModalTimesVisivel] = useState(false);

  // =========================================================
  // ESTATÍSTICAS
  // =========================================================

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

  // =========================================================
  // SEQUÊNCIA DO QUIZ
  // =========================================================

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

  // =========================================================
  // FOTO DE PERFIL
  // =========================================================

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

  // =========================================================
  // TIME FAVORITO
  // =========================================================

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

  // =========================================================
  // DADOS DO USUÁRIO
  // =========================================================

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
    tema: temaAtivo === "dark" ? "Escuro" : "Claro",

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

  const xpNecessarioNivel =
    estatisticas?.xp_necessario_nivel ?? 10000;

  const progressoNivel = estatisticas?.progresso_nivel ?? 0;

  // =========================================================
  // REGRAS DAS CONQUISTAS
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

  // =========================================================
  // COMPONENTE
  // =========================================================

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: cores.background }}
      edges={["top", "bottom"]}
    >
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingBottom: 105,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* ================================================= */}
        {/* BOTÃO DE VOLTAR */}
        {/* ================================================= */}

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
              size={25 * escalaIcone}
              color={cores.icon}
              weight="regular"
            />
          </Pressable>

          <Texto
            tamanho={26}
            className="ml-3"
            style={{ color: cores.text }}
          >
            Perfil
          </Texto>
        </View>

        {/* ================================================= */}
        {/* ÁREA DO PERFIL */}
        {/* ================================================= */}

        <View
          className="mt-3 px-5"
          style={{ backgroundColor: cores.background }}
        >
          <View className="items-center">
            {/* FOTO DE PERFIL */}

            <FotoPerfil
              foto={usuarioAutenticado?.avatar_url || null}
              nome={usuario.nome}
              tamanho={96}
              onFotoSelecionada={selecionarFoto}
            />

            {/* NOME */}

            <Texto
              tamanho={24}
              className="mt-3 text-center text-texto"
            >
              {usuario.nome}
            </Texto>

            {/* NÍVEL */}

            <View className="mt-1 flex-row items-center">
              <StarIcon
                size={17 * escalaIcone}
                color="#FFC107"
                weight="fill"
              />

              <Texto
                tamanho={14}
                className="ml-1 text-texto-sec"
              >
                Nível {nivelAtual}
              </Texto>
            </View>

            {/* XP */}

            <View className="mt-5 w-full">
              <View className="flex-row flex-wrap justify-between">
                <Texto
                  tamanho={11}
                  className="text-texto-ter"
                >
                  XP
                </Texto>

                <Texto
                  tamanho={11}
                  className="text-verde"
                >
                  {xpAtualNivel.toLocaleString("pt-BR")}
                  {" / "}
                  {xpNecessarioNivel.toLocaleString("pt-BR")}
                </Texto>
              </View>

              <View className="mt-2 h-[6px] overflow-hidden rounded-full bg-cartao-borda">
                <View
                  className="h-full rounded-full bg-verde"
                  style={{
                    width: `${progressoNivel}%`,
                  }}
                />
              </View>

              <Texto
                tamanho={10}
                className="mt-1 text-right text-texto-ter"
              >
                {carregandoEstatisticas
                  ? "Carregando estatísticas..."
                  : erroEstatisticas
                    ? "Não foi possível carregar as estatísticas."
                    : `Faltam ${(
                        xpProximoNivel - xpTotal
                      ).toLocaleString("pt-BR")} XP para o próximo nível`}
              </Texto>
            </View>
          </View>
        </View>

        {/* ================================================= */}
        {/* ESTATÍSTICAS */}
        {/* ================================================= */}

        <View className="mt-6 flex-row px-5">
          {/* QUIZZES */}

          <Pressable
            className="mr-2 flex-1 items-center rounded-lg border border-cartao-borda bg-cartao px-1 py-4"
            onPress={() => {
              // FUTURO:
              // Abrir histórico de quizzes.
            }}
            style={({ pressed }) => ({
              opacity: pressed ? 0.75 : 1,
              transform: [{ scale: pressed ? 0.97 : 1 }],
            })}
          >
            <TrophyIcon
              size={25 * escalaIcone}
              color="#00C853"
              weight="regular"
            />

            <Texto
              tamanho={16}
              className="mt-1 text-center font-bold text-verde"
            >
              {(Number(usuario.quizzes) || 0).toLocaleString("pt-BR")}
            </Texto>

            <Texto
              tamanho={11}
              className="text-center text-texto-ter"
            >
              Quizzes
            </Texto>
          </Pressable>

          {/* XP TOTAL */}

          <Pressable
            className="mx-1 flex-1 items-center rounded-lg border border-cartao-borda bg-cartao px-1 py-4"
            onPress={() => {
              // FUTURO:
              // Abrir detalhes de XP.
            }}
            style={({ pressed }) => ({
              opacity: pressed ? 0.75 : 1,
              transform: [{ scale: pressed ? 0.97 : 1 }],
            })}
          >
            <StarIcon
              size={25 * escalaIcone}
              color="#FFC107"
              weight="fill"
            />

            <Texto
              tamanho={16}
              className="mt-1 text-center font-bold text-verde"
            >
              {xpTotal.toLocaleString("pt-BR")}
            </Texto>

            <Texto
              tamanho={11}
              className="text-center text-texto-ter"
            >
              XP Total
            </Texto>
          </Pressable>

          {/* SEQUÊNCIA */}

          <Pressable
            className="ml-2 flex-1 items-center rounded-lg border border-cartao-borda bg-cartao px-1 py-4"
            onPress={() => {
              // FUTURO:
              // Abrir detalhes da sequência.
            }}
            style={({ pressed }) => ({
              opacity: pressed ? 0.75 : 1,
              transform: [{ scale: pressed ? 0.97 : 1 }],
            })}
          >
            <FireIcon
              size={25 * escalaIcone}
              color="#E53935"
              weight="regular"
            />

            <Texto
              tamanho={16}
              className="mt-1 text-center font-bold text-verde"
            >
              {carregandoSequencia
                ? "..."
                : (Number(usuario.sequenciaAtual) || 0).toLocaleString("pt-BR")}
            </Texto>

            <Texto
              tamanho={11}
              className="text-center text-texto-ter"
            >
              Sequência Atual
            </Texto>
          </Pressable>
        </View>

        {/* ================================================= */}
        {/* CONQUISTAS */}
        {/* ================================================= */}

        <View className="mt-7 px-5">
          <Texto
            tamanho={18}
            className="text-texto"
          >
            Conquistas
          </Texto>

          {conquistas.map((conquista) => {
            const Icone = conquista.Icone;

            return (
              <Pressable
                key={conquista.id}
                className={`mt-2 flex-row items-center rounded-lg border bg-cartao px-3 py-3 ${
                  conquista.desbloqueada
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
                  transform: [{ scale: pressed ? 0.98 : 1 }],
                })}
              >
                {/* ÍCONE */}

                <View className="h-10 w-10 items-center justify-center rounded-md bg-cartao-borda">
                  <Icone
                    size={24 * escalaIcone}
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
                  <Texto
                    tamanho={14}
                    className={
                      conquista.desbloqueada
                        ? "text-texto"
                        : "text-texto-ter"
                    }
                  >
                    {conquista.nome}
                  </Texto>

                  <Texto
                    tamanho={11}
                    className="text-texto-ter"
                  >
                    {conquista.descricao}
                  </Texto>

                  {/* PROGRESSO */}

                  <Texto
                    tamanho={10}
                    className={`mt-1 ${
                      conquista.desbloqueada
                        ? "text-verde"
                        : "text-texto-ter"
                    }`}
                  >
                    {conquista.progresso === null
                      ? "Em breve"
                      : `${conquista.progresso.toLocaleString("pt-BR")} / ${conquista.requisito.toLocaleString("pt-BR")}`}
                  </Texto>
                </View>

                {/* STATUS */}

                {conquista.desbloqueada && (
                  <View className="ml-2">
                    <CheckCircleIcon
                      size={21 * escalaIcone}
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
          <Texto
            tamanho={18}
            className="text-texto"
          >
            Configurações
          </Texto>

          {/* EDITAR PERFIL */}

          <View className="mt-2 overflow-hidden rounded-lg border border-cartao-borda bg-cartao">
            <Pressable
              className="min-h-16 flex-row items-center px-3 py-3"
              onPress={() => navigation.navigate("EditarPerfil")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.7 : 1,
              })}
            >
              <PencilSimpleIcon
                size={25 * escalaIcone}
                color={cores.icon}
                weight="regular"
              />

              <Texto
                tamanho={14}
                className="ml-3 flex-1 text-texto"
              >
                Editar Perfil
              </Texto>

              <CaretRightIcon
                size={19 * escalaIcone}
                color="#6F7B83"
              />
            </Pressable>
          </View>

          <View className="mt-2 overflow-hidden rounded-lg border border-cartao-borda bg-cartao">
            {/* TIME FAVORITO */}

            <Pressable
              className="min-h-16 flex-row items-center px-3 py-3"
              onPress={abrirSeletorTimes}
              style={({ pressed }) => ({
                opacity: pressed ? 0.7 : 1,
              })}
            >
              <SoccerBallIcon
                size={25 * escalaIcone}
                color={cores.icon}
                weight="regular"
              />

              <Texto
                tamanho={14}
                className="ml-3 flex-1 text-texto"
              >
                Meu Time Favorito
              </Texto>

              <Texto
                tamanho={11}
                className="mr-1 text-right text-texto-ter"
              >
                {usuario.timeFavorito || "Nenhum"}
              </Texto>

              <CaretRightIcon
                size={19 * escalaIcone}
                color="#6F7B83"
              />
            </Pressable>

            <View className="h-px bg-cartao-borda" />

            {/* NOTIFICAÇÕES */}

            <Pressable
              className="min-h-16 flex-row items-center px-3 py-3"
              onPress={() => {
                // FUTURO:
                // Configuração de notificações.
              }}
              style={({ pressed }) => ({
                opacity: pressed ? 0.7 : 1,
              })}
            >
              <BellIcon
                size={25 * escalaIcone}
                color={cores.icon}
                weight="regular"
              />

              <Texto
                tamanho={14}
                className="ml-3 flex-1 text-texto"
              >
                Notificações
              </Texto>

              <Texto
                tamanho={11}
                className="mr-1 text-texto-ter"
              >
                {usuario.notificacoes || "Desativadas"}
              </Texto>

              <CaretRightIcon
                size={19 * escalaIcone}
                color="#6F7B83"
              />
            </Pressable>

            <View className="h-px bg-cartao-borda" />

            {/* ACESSIBILIDADE */}

            <Pressable
              className="min-h-16 flex-row items-center px-3 py-3"
              onPress={() => navigation.navigate("Acessibilidade")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.7 : 1,
              })}
            >
              <PersonArmsSpreadIcon
                size={25 * escalaIcone}
                color={cores.icon}
                weight="regular"
              />

              <Texto
                tamanho={14}
                className="ml-3 flex-1 text-texto"
              >
                Acessibilidade
              </Texto>

              <Texto
                tamanho={11}
                className="mr-1 text-texto-ter"
              >
                {usuario.acessibilidade || "Ver mais"}
              </Texto>

              <CaretRightIcon
                size={19 * escalaIcone}
                color="#6F7B83"
              />
            </Pressable>

            <View className="h-px bg-cartao-borda" />

            {/* TEMA */}

            <Pressable
              className="min-h-16 flex-row items-center px-3 py-3"
              onPress={() =>
                alterarTema(temaAtivo === "dark" ? "light" : "dark")
              }
              style={({ pressed }) => ({
                opacity: pressed ? 0.7 : 1,
              })}
            >
              <PaletteIcon
                size={25 * escalaIcone}
                color={cores.icon}
                weight="regular"
              />

              <Texto
                tamanho={14}
                className="ml-3 flex-1 text-texto"
              >
                Tema
              </Texto>

              <Texto
                tamanho={11}
                className="mr-3 text-texto-ter"
              >
                {usuario.tema || "Escuro"}
              </Texto>

              <View
                className="h-[22px] w-[42px] justify-center rounded-full px-1"
                style={{
                  backgroundColor:
                    temaAtivo === "dark"
                      ? cores.primary
                      : cores.border,
                }}
              >
                <View
                  className="h-[18px] w-[18px] rounded-full bg-white"
                  style={{
                    alignSelf:
                      temaAtivo === "dark"
                        ? "flex-end"
                        : "flex-start",
                  }}
                />
              </View>
            </Pressable>
          </View>
        </View>

        {/* ================================================= */}
        {/* SAIR DA CONTA */}
        {/* ================================================= */}

        <View className="mt-6 px-5">
          <Pressable
            className="min-h-14 flex-row items-center justify-between rounded-lg border border-vermelho px-3 py-3"
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
              transform: [{ scale: pressed ? 0.98 : 1 }],
            })}
          >
            <Texto
              tamanho={16}
              className="text-vermelho"
            >
              Sair da Conta
            </Texto>

            <SignOutIcon
              size={24 * escalaIcone}
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
              <Texto
                tamanho={20}
                className="flex-1 text-texto"
              >
                Meu Time Favorito
              </Texto>

              <Pressable
                onPress={() => setModalTimesVisivel(false)}
              >
                <Texto
                  tamanho={14}
                  className="text-verde"
                >
                  Fechar
                </Texto>
              </Pressable>
            </View>

            {/* PESQUISA */}

            <TextInput
              value={pesquisaTime}
              onChangeText={setPesquisaTime}
              placeholder="Pesquisar clube..."
              placeholderTextColor="#6F7B83"
              className="mb-4 rounded-xl border border-cartao-borda bg-cartao px-4 py-3 text-texto"
              style={{
                fontFamily: "Inter",
                fontSize: 14 * fontScale,
              }}
            />

            {/* REMOVER FAVORITO */}

            <Pressable
              className="mb-3 rounded-xl border border-vermelho px-4 py-3"
              onPress={() => salvarTimeFavorito(null)}
            >
              <Texto
                tamanho={14}
                className="text-center text-vermelho"
              >
                Remover time favorito
              </Texto>
            </Pressable>

            {/* LISTA DE CLUBES */}

            {carregandoTimes ? (
              <Texto
                tamanho={14}
                className="mt-5 text-center text-texto-sec"
              >
                Carregando clubes...
              </Texto>
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
                        <Texto
                          tamanho={14}
                          className="text-texto"
                        >
                          {time.nome}
                        </Texto>

                        <Texto
                          tamanho={10}
                          className="mt-1 text-texto-ter"
                        >
                          {time.pais || "País não informado"}
                        </Texto>

                        <Texto
                          tamanho={10}
                          className="mt-1 text-texto-ter"
                        >
                          {time.competicoes
                            ?.map((competicao) =>
                              typeof competicao === "string"
                                ? competicao
                                : competicao.name
                            )
                            .filter(Boolean)
                            .join(" • ")}
                        </Texto>
                      </View>
                    </Pressable>
                  ))}

                {timesDisponiveis.filter((time) =>
                  time.nome
                    ?.toLowerCase()
                    .includes(pesquisaTime.toLowerCase().trim())
                ).length === 0 && (
                  <Texto
                    tamanho={14}
                    className="mt-5 text-center text-texto-sec"
                  >
                    Nenhum clube encontrado.
                  </Texto>
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
              size={48 * escalaIcone}
              color="#00C853"
              weight="fill"
            />

            <Texto
              tamanho={16}
              className="mt-3 text-center text-texto"
            >
              Foto de perfil atualizada!
            </Texto>

            <Pressable
              className="mt-5 w-full items-center rounded-xl bg-verde py-3"
              onPress={() => setModalSucessoVisivel(false)}
              style={({ pressed }) => ({
                opacity: pressed ? 0.7 : 1,
              })}
            >
              <Texto
                tamanho={14}
                className="font-bold text-white"
              >
                Continuar
              </Texto>
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