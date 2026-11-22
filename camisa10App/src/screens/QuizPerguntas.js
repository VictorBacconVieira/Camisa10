import { useEffect, useRef, useState } from "react";

import {
  Animated,
  Pressable,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";

import {
  ArrowLeftIcon,
  CheckCircleIcon,
  XCircleIcon,
  TrophyIcon,
  CaretRightIcon,
} from "phosphor-react-native";

import { BottomNav } from "../components/bottomNav";

import {
  obterPerguntasQuiz,
  enviarRespostasQuiz,
} from "../services/authService";

import { useTheme } from "../context/ThemeContext";

function Confetes() {
  const { height, width } = useWindowDimensions();
  const { cores } = useTheme();

  const CORES_CONFETES = [
    cores.primary,
    cores.primaryHighlight,
    cores.text,
    cores.border,
    cores.warning,
  ];

  const particulas = useRef(
    Array.from({ length: 45 }, (_, index) => ({
      id: index,
      animacao: new Animated.Value(0),
      esquerda: Math.random() * 100,
      atraso: Math.random() * 1800,
      tamanho: Math.random() * 7 + 5,
      largura: Math.random() * 5 + 4,
      rotacao: Math.random() * 720 - 360,
      duracao: Math.random() * 1800 + 2200,
    }))
  ).current;

  useEffect(() => {
    const animacoes = particulas.map((particula, index) => {
      const animacao = Animated.loop(
        Animated.sequence([
          Animated.delay(particula.atraso),
          Animated.timing(particula.animacao, {
            toValue: 1,
            duration: particula.duracao,
            useNativeDriver: true,
          }),
          Animated.timing(particula.animacao, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      );

      animacao.start();
      return animacao;
    });

    return () => {
      animacoes.forEach((animacao) => animacao.stop());
    };
  }, [particulas]);

  return (
    <View
      pointerEvents="none"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10,
        elevation: 10,
      }}
    >
      {particulas.map((particula) => {
        const translateY = particula.animacao.interpolate({
          inputRange: [0, 1],
          outputRange: [-30, height + 40],
        });

        const translateX = particula.animacao.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [0, 35, -20],
        });

        const rotate = particula.animacao.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", `${particula.rotacao}deg`],
        });

        const opacity = particula.animacao.interpolate({
          inputRange: [0, 0.05, 0.85, 1],
          outputRange: [0, 1, 1, 0],
        });

        return (
          <Animated.View
            key={particula.id}
            style={{
              position: "absolute",
              top: 0,
              left: (particula.esquerda / 100) * width,
              width: particula.largura,
              height: particula.tamanho,
              borderRadius: 2,
              backgroundColor:
                CORES_CONFETES[particula.id % CORES_CONFETES.length],
              opacity,
              transform: [{ translateY }, { translateX }, { rotate }],
            }}
          />
        );
      })}
    </View>
  );
}

export function QuizPerguntas() {
  const navigation = useNavigation();
  const route = useRoute();

  const { quizId, titulo } = route.params ?? {};

  const { cores } = useTheme();

  const scrollRef = useRef(null);

  const [perguntas, setPerguntas] = useState([]);
  const [carregandoPerguntas, setCarregandoPerguntas] = useState(true);
  const [erroPerguntas, setErroPerguntas] = useState(null);

  const [respostas, setRespostas] = useState([]);
  const [resultadoQuiz, setResultadoQuiz] = useState(null);
  const [erroEnvio, setErroEnvio] = useState(null);
  const [enviando, setEnviando] = useState(false);

  const [indicePergunta, setIndicePergunta] = useState(0);
  const [alternativaSelecionada, setAlternativaSelecionada] = useState(null);
  const [respostaConfirmada, setRespostaConfirmada] = useState(false);
  const [acertos, setAcertos] = useState(0);
  const [xp, setXp] = useState(0);
  const [finalizado, setFinalizado] = useState(false);

  const tituloExibicao = titulo || "Quiz";

  const animacaoConteudo = useRef(new Animated.Value(0)).current;
  const animacaoFeedback = useRef(new Animated.Value(0)).current;
  const animacaoProgresso = useRef(new Animated.Value(0)).current;

  async function carregarPerguntas() {
    try {
      setCarregandoPerguntas(true);
      setErroPerguntas(null);

      const dados = await obterPerguntasQuiz(quizId);

      if (!Array.isArray(dados)) {
        throw new Error("A API retornou um formato de perguntas inválido.");
      }

      setPerguntas(dados);
      setRespostas([]);
      setIndicePergunta(0);
      setAlternativaSelecionada(null);
      setRespostaConfirmada(false);
    } catch (error) {
      console.error("Erro ao carregar perguntas:", error);
      setErroPerguntas(error.message);
    } finally {
      setCarregandoPerguntas(false);
    }
  }

  useEffect(() => {
    if (quizId) {
      carregarPerguntas();
    } else {
      setErroPerguntas("Código do quiz não informado.");
      setCarregandoPerguntas(false);
    }
  }, [quizId]);

  const perguntaAtual = perguntas[indicePergunta];
  const totalPerguntas = perguntas.length;

  const progresso =
    totalPerguntas > 0
      ? ((indicePergunta + 1) / totalPerguntas) * 100
      : 0;

  const atingiuMeta = acertos >= Math.ceil(totalPerguntas / 2);

  // Entrada suave da pergunta e das alternativas.
  useEffect(() => {
    animacaoConteudo.setValue(0);

    Animated.timing(animacaoConteudo, {
      toValue: 1,
      duration: 450,
      useNativeDriver: true,
    }).start();
  }, [indicePergunta, animacaoConteudo]);

  // Preenchimento animado da barra de progresso.
  useEffect(() => {
    Animated.timing(animacaoProgresso, {
      toValue: progresso,
      duration: 450,
      useNativeDriver: false,
    }).start();
  }, [progresso, animacaoProgresso]);

  // Entrada animada do feedback.
  useEffect(() => {
    if (respostaConfirmada) {
      animacaoFeedback.setValue(0);

      Animated.spring(animacaoFeedback, {
        toValue: 1,
        friction: 7,
        tension: 65,
        useNativeDriver: true,
      }).start();
    }
  }, [respostaConfirmada, animacaoFeedback]);

  // Acompanha a rolagem até o feedback e o botão.
  useEffect(() => {
    if (!respostaConfirmada) return;

    const timeout = setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 150);

    return () => clearTimeout(timeout);
  }, [respostaConfirmada, indicePergunta]);

  const estiloEntrada = {
    opacity: animacaoConteudo,
    transform: [
      {
        translateY: animacaoConteudo.interpolate({
          inputRange: [0, 1],
          outputRange: [18, 0],
        }),
      },
    ],
  };

  const estiloFeedback = {
    opacity: animacaoFeedback,
    transform: [
      {
        scale: animacaoFeedback.interpolate({
          inputRange: [0, 1],
          outputRange: [0.94, 1],
        }),
      },
      {
        translateY: animacaoFeedback.interpolate({
          inputRange: [0, 1],
          outputRange: [8, 0],
        }),
      },
    ],
  };

  function confirmarResposta() {
    if (alternativaSelecionada === null || respostaConfirmada) {
      return;
    }

    setRespostas((valores) => [
      ...valores,
      {
        pergunta_id: perguntaAtual.id,
        resposta_selecionada: alternativaSelecionada,
      },
    ]);

    setRespostaConfirmada(true);
  }

  async function finalizarQuiz() {
    if (enviando || respostas.length !== totalPerguntas) {
      return;
    }

    try {
      setEnviando(true);
      setErroEnvio(null);

      const resultado = await enviarRespostasQuiz(
        quizId,
        respostas
      );

      setResultadoQuiz(resultado);
      setAcertos(resultado.acertos);
      setXp(resultado.xp_total);
      setFinalizado(true);
    } catch (error) {
      console.error("Erro ao enviar respostas:", error);
      setErroEnvio(error.message);
    } finally {
      setEnviando(false);
    }
  }

  function proximaPergunta() {
    if (!respostaConfirmada || enviando) return;

    if (indicePergunta < totalPerguntas - 1) {
      setIndicePergunta((valor) => valor + 1);
      setAlternativaSelecionada(null);
      setRespostaConfirmada(false);
      setErroEnvio(null);

      requestAnimationFrame(() => {
        scrollRef.current?.scrollTo({
          y: 0,
          animated: true,
        });
      });
    } else {
      finalizarQuiz();
    }
  }

  function reiniciarQuiz() {
    setIndicePergunta(0);
    setAlternativaSelecionada(null);
    setRespostaConfirmada(false);
    setRespostas([]);
    setResultadoQuiz(null);
    setErroEnvio(null);
    setAcertos(0);
    setXp(0);
    setFinalizado(false);

    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({
        y: 0,
        animated: false,
      });
    });
  }

  function corAlternativa(index) {
    return alternativaSelecionada === index
      ? cores.primary
      : cores.surface;
  }

  function corBorda(index) {
    return alternativaSelecionada === index
      ? cores.primary
      : cores.border;
  }

  // Carregamento das perguntas.
  if (carregandoPerguntas) {
    return (
      <SafeAreaView
        className="flex-1"
        edges={["top", "bottom"]}
        style={{ backgroundColor: cores.background }}
      >
        <View className="flex-1 items-center justify-center px-6">
          <Text
            className="text-base font-semibold"
            style={{ color: cores.text }}
          >
            Carregando perguntas...
          </Text>
        </View>

        <BottomNav />
      </SafeAreaView>
    );
  }

  // Erro ao carregar perguntas.
  if (erroPerguntas) {
    return (
      <SafeAreaView
        className="flex-1"
        edges={["top", "bottom"]}
        style={{ backgroundColor: cores.background }}
      >
        <View className="flex-1 items-center justify-center px-6">
          <Text
            className="mb-3 text-xl font-bold"
            style={{ color: cores.text }}
          >
            Não foi possível carregar o quiz
          </Text>

          <Text
            className="text-center leading-6"
            style={{ color: cores.textSecondary }}
          >
            {erroPerguntas}
          </Text>

          <Pressable
            onPress={carregarPerguntas}
            className="mt-6 rounded-xl px-6 py-4"
            style={{ backgroundColor: cores.primary }}
          >
            <Text
              className="font-bold"
              style={{ color: cores.background }}
            >
              Tentar novamente
            </Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.goBack()}
            className="mt-3 rounded-xl border px-6 py-4"
            style={{ borderColor: cores.border }}
          >
            <Text
              className="font-semibold"
              style={{ color: cores.text }}
            >
              Voltar aos quizzes
            </Text>
          </Pressable>
        </View>

        <BottomNav />
      </SafeAreaView>
    );
  }

  // Quiz sem perguntas cadastradas.
  if (perguntas.length === 0) {
    return (
      <SafeAreaView
        className="flex-1"
        edges={["top", "bottom"]}
        style={{ backgroundColor: cores.background }}
      >
        <View className="flex-1 items-center justify-center px-6">
          <Text
            className="mb-3 text-xl font-bold"
            style={{ color: cores.text }}
          >
            Quiz indisponível
          </Text>

          <Text
            className="text-center leading-6"
            style={{ color: cores.textSecondary }}
          >
            Ainda não há perguntas cadastradas para este quiz.
          </Text>

          <Pressable
            onPress={() => navigation.goBack()}
            className="mt-6 rounded-xl px-6 py-4"
            style={{ backgroundColor: cores.primary }}
          >
            <Text
              className="font-bold"
              style={{ color: cores.background }}
            >
              Voltar aos quizzes
            </Text>
          </Pressable>
        </View>

        <BottomNav />
      </SafeAreaView>
    );
  }

  // Tela de resultado.
  if (finalizado && resultadoQuiz) {
    return (
      <SafeAreaView
        className="flex-1"
        edges={["top", "bottom"]}
        style={{ backgroundColor: cores.background }}
      >
        {atingiuMeta && <Confetes />}

        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 24,
            paddingTop: 30,
            paddingBottom: 140,
          }}
          showsVerticalScrollIndicator={false}
        >
          <TrophyIcon
            size={72}
            color={atingiuMeta ? cores.primaryHighlight : cores.danger}
            weight="fill"
          />

          <Text
            className="mt-6 text-3xl font-bold"
            style={{ color: cores.text }}
          >
            Quiz concluído!
          </Text>

          <Text
            className="mt-3 text-center text-base"
            style={{ color: cores.textSecondary }}
          >
            Você acertou {acertos} de {totalPerguntas} perguntas.
          </Text>

          <Text
            className="mt-5 text-2xl font-bold"
            style={{ color: cores.primaryHighlight }}
          >
            +{xp.toLocaleString("pt-BR")} XP
          </Text>

          <View className="mt-8 w-full">
            <Text
              className="mb-4 text-lg font-bold"
              style={{ color: cores.text }}
            >
              Correção das respostas
            </Text>

            {resultadoQuiz.resultados?.map((resultado, index) => {
              const pergunta = perguntas.find(
                (item) => item.id === resultado.pergunta_id
              );

              const alternativaCorreta =
                pergunta?.alternativas?.[resultado.resposta_correta];

              const alternativaEscolhida =
                pergunta?.alternativas?.[resultado.resposta_selecionada];

              const corStatus = resultado.correta
                ? cores.primary
                : cores.danger;

              return (
                <View
                  key={resultado.pergunta_id}
                  className="mb-3 rounded-xl border p-4"
                  style={{
                    backgroundColor: cores.surface,
                    borderColor: corStatus,
                  }}
                >
                  <View className="mb-2 flex-row items-center">
                    {resultado.correta ? (
                      <CheckCircleIcon
                        size={22}
                        color={cores.primary}
                        weight="fill"
                      />
                    ) : (
                      <XCircleIcon
                        size={22}
                        color={cores.danger}
                        weight="fill"
                      />
                    )}

                    <Text
                      className="ml-2 flex-1 font-bold"
                      style={{ color: corStatus }}
                    >
                      Pergunta {index + 1} —{" "}
                      {resultado.correta ? "Correta" : "Incorreta"}
                    </Text>

                    <Text
                      className="font-bold"
                      style={{ color: cores.text }}
                    >
                      +{resultado.xp_ganho} XP
                    </Text>
                  </View>

                  <Text
                    className="mb-2 font-semibold"
                    style={{ color: cores.text }}
                  >
                    {pergunta?.enunciado}
                  </Text>

                  <Text
                    className="text-sm"
                    style={{ color: cores.textSecondary }}
                  >
                    Sua resposta: {alternativaEscolhida ?? "Não identificada"}
                  </Text>

                  {!resultado.correta && (
                    <Text
                      className="mt-1 text-sm font-semibold"
                      style={{ color: cores.primaryHighlight }}
                    >
                      Resposta correta: {alternativaCorreta ?? "Não identificada"}
                    </Text>
                  )}

                  {!!resultado.explicacao && (
                    <Text
                      className="mt-3 leading-6"
                      style={{ color: cores.textSecondary }}
                    >
                      {resultado.explicacao}
                    </Text>
                  )}
                </View>
              );
            })}
          </View>

          <Pressable
            onPress={reiniciarQuiz}
            className="mt-5 w-full items-center rounded-xl py-4"
            style={{ backgroundColor: cores.primary }}
          >
            <Text
              className="font-bold"
              style={{ color: cores.background }}
            >
              Jogar novamente
            </Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.goBack()}
            className="mt-3 w-full items-center rounded-xl border py-4"
            style={{ borderColor: cores.border }}
          >
            <Text
              className="font-semibold"
              style={{ color: cores.text }}
            >
              Voltar aos quizzes
            </Text>
          </Pressable>
        </ScrollView>

        <BottomNav />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      className="flex-1"
      edges={["top", "bottom"]}
      style={{ backgroundColor: cores.background }}
    >
      {/* Cabeçalho */}
      <View className="px-5 pt-3">
        <View className="flex-row items-center">
          <Pressable
            onPress={() => navigation.goBack()}
            className="mr-4 h-10 w-10 items-center justify-center rounded-full"
            style={{ backgroundColor: cores.surface }}
          >
            <ArrowLeftIcon size={22} color={cores.icon} />
          </Pressable>

          <View className="flex-1">
            <Text
              className="text-lg font-bold"
              style={{ color: cores.text }}
            >
              {tituloExibicao}
            </Text>

            <Text
              className="mt-1 text-xs"
              style={{ color: cores.textSecondary }}
            >
              Pergunta {indicePergunta + 1} de {totalPerguntas}
            </Text>
          </View>

          <View
            className="rounded-full px-3 py-2"
            style={{ backgroundColor: cores.surfaceSecondary }}
          >
            <Text
              className="font-bold"
              style={{ color: cores.primaryHighlight }}
            >
              {xp.toLocaleString("pt-BR")} XP
            </Text>
          </View>
        </View>

        {/* Barra de progresso */}
        <View
          className="mt-6 h-2 overflow-hidden rounded-full"
          style={{ backgroundColor: cores.border }}
        >
          <Animated.View
            className="h-full rounded-full"
            style={{
              backgroundColor: cores.primary,
              width: animacaoProgresso.interpolate({
                inputRange: [0, 100],
                outputRange: ["0%", "100%",
                ],
              }),
            }}
          />
        </View>
      </View>

      <ScrollView
        ref={scrollRef}
        className="flex-1"
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 20,
          paddingTop: 28,
          paddingBottom: 100,
        }}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => {
          if (respostaConfirmada) {
            scrollRef.current?.scrollToEnd({
              animated: true,
            });
          }
        }}
      >
        {/* Pergunta e alternativas */}
        <Animated.View style={estiloEntrada}>
          <Text
            className="mb-3 text-sm font-semibold uppercase tracking-wider"
            style={{ color: cores.primaryHighlight }}
          >
            Teste seus conhecimentos
          </Text>

          <Text
            className="mb-7 text-2xl font-bold leading-9"
            style={{ color: cores.text }}
          >
            {perguntaAtual?.enunciado}
          </Text>

          {perguntaAtual?.alternativas?.map((alternativa, index) => {
            const selecionada = alternativaSelecionada === index;

            return (
              <Pressable
                key={`${indicePergunta}-${index}`}
                disabled={respostaConfirmada}
                onPress={() => setAlternativaSelecionada(index)}
                className="mb-3 flex-row items-center rounded-xl border px-4 py-4"
                style={{
                  backgroundColor: selecionada
                    ? cores.surfaceSecondary
                    : cores.surface,
                  borderColor: selecionada
                    ? cores.primary
                    : cores.border,
                  borderWidth: selecionada ? 1.5 : 1,
                }}
              >
                <View
                  className="mr-3 h-9 w-9 items-center justify-center rounded-lg"
                  style={{
                    backgroundColor: selecionada
                      ? cores.primary
                      : cores.surfaceSecondary,
                  }}
                >
                  <Text
                    className="font-bold"
                    style={{
                      color: selecionada
                        ? "#071018"
                        : cores.textSecondary,
                    }}
                  >
                    {String.fromCharCode(65 + index)}
                  </Text>
                </View>

                <Text
                  className="flex-1 text-base font-medium"
                  style={{ color: cores.text }}
                >
                  {alternativa}
                </Text>
              </Pressable>
            );
          })}
        </Animated.View>

        {/* Feedback de resposta registrada */}
        {respostaConfirmada && (
          <Animated.View
            style={[
              estiloFeedback,
              {
                backgroundColor: cores.surface,
                borderColor: cores.primary,
              },
            ]}
            className="mt-3 rounded-xl border p-4"
          >
            <Text
              className="text-base font-bold"
              style={{ color: cores.primaryHighlight }}
            >
              Resposta registrada!
            </Text>

            <Text
              className="mt-2 leading-6"
              style={{ color: cores.textSecondary }}
            >
              A correção e a explicação serão exibidas ao finalizar o quiz.
            </Text>
          </Animated.View>
        )}

        {/* Erro ao enviar respostas */}
        {erroEnvio && (
          <View
            className="mt-4 rounded-xl border p-4"
            style={{
              borderColor: cores.danger,
              backgroundColor: cores.surfaceSecondary,
            }}
          >
            <Text
              className="font-semibold"
              style={{ color: cores.danger }}
            >
              Não foi possível finalizar o quiz.
            </Text>

            <Text
              className="mt-2 leading-6"
              style={{ color: cores.textSecondary }}
            >
              {erroEnvio}
            </Text>
          </View>
        )}

        {/* Botões */}
        {!respostaConfirmada ? (
          <Pressable
            disabled={alternativaSelecionada === null}
            onPress={confirmarResposta}
            className="mt-6 items-center rounded-xl py-4"
            style={{
              backgroundColor:
                alternativaSelecionada === null
                  ? cores.surfaceSecondary
                  : cores.primary,
            }}
          >
            <Text
              className="text-base font-bold"
              style={{
                color:
                  alternativaSelecionada === null
                    ? cores.textTertiary
                    : "#071018",
              }}
            >
              Confirmar resposta
            </Text>
          </Pressable>
        ) : (
          <Pressable
            disabled={enviando}
            onPress={proximaPergunta}
            className="mt-6 flex-row items-center justify-center rounded-xl py-4"
            style={{
              backgroundColor: enviando
                ? cores.surfaceSecondary
                : cores.primary,
            }}
          >
            <Text
              className="mr-2 text-base font-bold"
              style={{
                color: enviando
                  ? cores.textTertiary
                  : "#071018",
              }}
            >
              {enviando
                ? "Enviando respostas..."
                : indicePergunta === totalPerguntas - 1
                  ? erroEnvio
                    ? "Tentar enviar novamente"
                    : "Ver resultado"
                  : "Próxima pergunta"}
            </Text>

            {!enviando && (
              <CaretRightIcon
                size={20}
                color="#071018"
                weight="bold"
              />
            )}
          </Pressable>
        )}
      </ScrollView>

      <BottomNav />
    </SafeAreaView>
  );
}

export default QuizPerguntas;