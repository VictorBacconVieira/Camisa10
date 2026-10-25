
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
import { quizzes } from "../data/quizPerguntas";

const CORES_CONFETES = [
  "#00C853",
  "#39FF14",
  "#FFFFFF",
  "#263541",
  "#FFD740",
];

function Confetes() {
  const { height, width } = useWindowDimensions();

  const particulas = useRef(
    Array.from({ length: 45 }, (_, index) => ({
      id: index,
      animacao: new Animated.Value(0),
      esquerda: Math.random() * 100,
      atraso: Math.random() * 1800,
      tamanho: Math.random() * 7 + 5,
      largura: Math.random() * 5 + 4,
      cor: CORES_CONFETES[index % CORES_CONFETES.length],
      rotacao: Math.random() * 720 - 360,
      duracao: Math.random() * 1800 + 2200,
    }))
  ).current;

  useEffect(() => {
    const animacoes = particulas.map((particula) => {
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
              backgroundColor: particula.cor,
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

  const scrollRef = useRef(null);

  const quizSelecionado = quizzes[quizId];
  const perguntas = quizSelecionado?.perguntas ?? [];
  const tituloExibicao = titulo || quizSelecionado?.titulo || "Quiz";

  const [indicePergunta, setIndicePergunta] = useState(0);
  const [alternativaSelecionada, setAlternativaSelecionada] = useState(null);
  const [respostaConfirmada, setRespostaConfirmada] = useState(false);
  const [acertos, setAcertos] = useState(0);
  const [xp, setXp] = useState(0);
  const [finalizado, setFinalizado] = useState(false);

  const animacaoConteudo = useRef(new Animated.Value(0)).current;
  const animacaoFeedback = useRef(new Animated.Value(0)).current;
  const animacaoProgresso = useRef(new Animated.Value(0)).current;

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

    setRespostaConfirmada(true);

    if (alternativaSelecionada === perguntaAtual.respostaCorreta) {
      setAcertos((valor) => valor + 1);
      setXp((valor) => valor + 1000);
    }
  }

  function proximaPergunta() {
    if (!respostaConfirmada) return;

    if (indicePergunta < totalPerguntas - 1) {
      setIndicePergunta((valor) => valor + 1);
      setAlternativaSelecionada(null);
      setRespostaConfirmada(false);

      requestAnimationFrame(() => {
        scrollRef.current?.scrollTo({
          y: 0,
          animated: true,
        });
      });
    } else {
      setFinalizado(true);
    }
  }

  function reiniciarQuiz() {
    setIndicePergunta(0);
    setAlternativaSelecionada(null);
    setRespostaConfirmada(false);
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
    if (!respostaConfirmada) {
      return alternativaSelecionada === index
        ? "#163B2B"
        : "#111D27";
    }

    if (index === perguntaAtual.respostaCorreta) return "#123D2B";
    if (index === alternativaSelecionada) return "#401F25";
    return "#111D27";
  }

  function corBorda(index) {
    if (!respostaConfirmada) {
      return alternativaSelecionada === index
        ? "#00C853"
        : "#263541";
    }

    if (index === perguntaAtual.respostaCorreta) return "#00C853";
    if (index === alternativaSelecionada) return "#FF5252";
    return "#263541";
  }

  // Tela alternativa para categorias ainda sem perguntas.
  if (perguntas.length === 0) {
    return (
      <SafeAreaView
        className="flex-1 bg-fundo"
        edges={["top", "bottom"]}
      >
        <View className="flex-1 items-center justify-center px-6">
          <Text className="mb-3 text-xl font-bold text-white">
            Quiz indisponível
          </Text>

          <Text className="text-center leading-6 text-gray-400">
            Ainda não há perguntas cadastradas para este quiz.
          </Text>

          <Pressable
            onPress={() => navigation.goBack()}
            className="mt-6 rounded-xl bg-[#00C853] px-6 py-4"
          >
            <Text className="font-bold text-black">
              Voltar aos quizzes
            </Text>
          </Pressable>
        </View>

        <BottomNav />
      </SafeAreaView>
    );
  }

  // Tela de resultado.
  if (finalizado) {
    return (
      <SafeAreaView
        className="flex-1 bg-fundo"
        edges={["top", "bottom"]}
      >
        {atingiuMeta && <Confetes />}

        <View className="flex-1 items-center justify-center px-6">
          <TrophyIcon
            size={72}
            color={atingiuMeta ? "#39FF14" : "#FF5252"}
            weight="fill"
          />

          <Text className="mt-6 text-3xl font-bold text-white">
            Quiz concluído!
          </Text>

          <Text className="mt-3 text-center text-base text-gray-400">
            Você acertou {acertos} de {totalPerguntas} perguntas.
          </Text>

          <Text className="mt-5 text-2xl font-bold text-[#39FF14]">
            +{xp.toLocaleString("pt-BR")} XP
          </Text>

          <Pressable
            onPress={reiniciarQuiz}
            className="mt-8 w-full items-center rounded-xl bg-[#00C853] py-4"
          >
            <Text className="font-bold text-black">
              Jogar novamente
            </Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.goBack()}
            className="mt-3 w-full items-center rounded-xl border border-[#263541] py-4"
          >
            <Text className="font-semibold text-white">
              Voltar aos quizzes
            </Text>
          </Pressable>
        </View>

        <BottomNav />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      className="flex-1 bg-fundo"
      edges={["top", "bottom"]}
    >
      {/* Cabeçalho */}
      <View className="px-5 pt-3">
        <View className="flex-row items-center">
          <Pressable
            onPress={() => navigation.goBack()}
            className="mr-4 h-10 w-10 items-center justify-center rounded-full bg-[#111D27]"
          >
            <ArrowLeftIcon size={22} color="#F5F7F8" />
          </Pressable>

          <View className="flex-1">
            <Text className="text-lg font-bold text-white">
              {tituloExibicao}
            </Text>

            <Text className="mt-1 text-xs text-gray-400">
              Pergunta {indicePergunta + 1} de {totalPerguntas}
            </Text>
          </View>

          <View className="rounded-full bg-[#16232D] px-3 py-2">
            <Text className="font-bold text-[#39FF14]">
              {xp.toLocaleString("pt-BR")} XP
            </Text>
          </View>
        </View>

        {/* Barra de progresso */}
        <View className="mt-6 h-2 overflow-hidden rounded-full bg-[#263541]">
          <Animated.View
            className="h-full rounded-full bg-[#00C853]"
            style={{
              width: animacaoProgresso.interpolate({
                inputRange: [0, 100],
                outputRange: ["0%", "100%"],
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
          <Text className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#39FF14]">
            Teste seus conhecimentos
          </Text>

          <Text className="mb-7 text-2xl font-bold leading-9 text-white">
            {perguntaAtual.pergunta}
          </Text>

          {perguntaAtual.alternativas.map((alternativa, index) => {
            const selecionada = alternativaSelecionada === index;
            const correta = index === perguntaAtual.respostaCorreta;

            return (
              <Pressable
                key={`${indicePergunta}-${index}`}
                disabled={respostaConfirmada}
                onPress={() => setAlternativaSelecionada(index)}
                className="mb-3 flex-row items-center rounded-xl border px-4 py-4"
                style={{
                  backgroundColor: corAlternativa(index),
                  borderColor: corBorda(index),
                  borderWidth:
                    selecionada || (respostaConfirmada && correta)
                      ? 1.5
                      : 1,
                }}
              >
                <View
                  className="mr-3 h-9 w-9 items-center justify-center rounded-lg"
                  style={{
                    backgroundColor:
                      respostaConfirmada && correta
                        ? "#00C853"
                        : respostaConfirmada && selecionada
                          ? "#FF5252"
                          : selecionada
                            ? "#00C853"
                            : "#263541",
                  }}
                >
                  {respostaConfirmada && correta ? (
                    <CheckCircleIcon
                      size={21}
                      color="#071018"
                      weight="fill"
                    />
                  ) : respostaConfirmada && selecionada ? (
                    <XCircleIcon
                      size={21}
                      color="#FFFFFF"
                      weight="fill"
                    />
                  ) : (
                    <Text
                      className="font-bold"
                      style={{
                        color: selecionada ? "#071018" : "#F5F7F8",
                      }}
                    >
                      {String.fromCharCode(65 + index)}
                    </Text>
                  )}
                </View>

                <Text className="flex-1 text-base font-medium text-white">
                  {alternativa}
                </Text>
              </Pressable>
            );
          })}
        </Animated.View>

        {/* Feedback da resposta */}
        {respostaConfirmada && (
          <Animated.View
            style={[
              estiloFeedback,
              {
                backgroundColor:
                  alternativaSelecionada === perguntaAtual.respostaCorreta
                    ? "#123D2B"
                    : "#401F25",
                borderColor:
                  alternativaSelecionada === perguntaAtual.respostaCorreta
                    ? "#00C853"
                    : "#FF5252",
              },
            ]}
            className="mt-3 rounded-xl border p-4"
          >
            <Text
              className="text-base font-bold"
              style={{
                color:
                  alternativaSelecionada === perguntaAtual.respostaCorreta
                    ? "#39FF14"
                    : "#FF7777",
              }}
            >
              {alternativaSelecionada === perguntaAtual.respostaCorreta
                ? "Resposta correta! +1.000 XP"
                : "Resposta incorreta!"}
            </Text>

            {!!perguntaAtual.explicacao && (
              <Text className="mt-2 leading-6 text-gray-200">
                {perguntaAtual.explicacao}
              </Text>
            )}
          </Animated.View>
        )}

        {/* Botões */}
        {!respostaConfirmada ? (
          <Pressable
            disabled={alternativaSelecionada === null}
            onPress={confirmarResposta}
            className="mt-6 items-center rounded-xl py-4"
            style={{
              backgroundColor:
                alternativaSelecionada === null ? "#263541" : "#00C853",
            }}
          >
            <Text
              className="text-base font-bold"
              style={{
                color:
                  alternativaSelecionada === null ? "#82909A" : "#071018",
              }}
            >
              Confirmar resposta
            </Text>
          </Pressable>
        ) : (
          <Pressable
            onPress={proximaPergunta}
            className="mt-6 flex-row items-center justify-center rounded-xl bg-[#00C853] py-4"
          >
            <Text className="mr-2 text-base font-bold text-[#071018]">
              {indicePergunta === totalPerguntas - 1
                ? "Ver resultado"
                : "Próxima pergunta"}
            </Text>

            <CaretRightIcon
              size={20}
              color="#071018"
              weight="bold"
            />
          </Pressable>
        )}
      </ScrollView>

      <BottomNav />
    </SafeAreaView>
  );
}