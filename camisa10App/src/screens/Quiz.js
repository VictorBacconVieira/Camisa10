import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  Pressable,
  ScrollView,
  View,
} from "react-native";

import { Texto } from "../components/texto";

import {
  ArrowLeftIcon,
  QuestionIcon,
  UsersThreeIcon,
  TrophyIcon,
  CaretRightIcon,
  SoccerBallIcon,
  GlobeHemisphereWestIcon,
  FlagIcon,
  ShieldIcon,
} from "phosphor-react-native";

import { BottomNav } from "../components/bottomNav";

import { useAccessibility } from "../context/AccessibilityContext";

const quizzesDiarios = [
  {
    id: "quiz-dia",
    titulo: "Quiz do Dia",
    icone: QuestionIcon,
    cor: "#00C853",
    destaque: true,
  },
];

const categorias = [
  {
    id: "brasileirao",
    titulo: "Brasileirão",
    icone: TrophyIcon,
    cor: "#39FF14",
  },
  {
    id: "copa-brasil",
    titulo: "Copa do Brasil",
    icone: TrophyIcon,
    cor: "#FFC107",
  },
  {
    id: "selecao-brasil",
    titulo: "Seleção Brasileira - História",
    icone: FlagIcon,
    cor: "#00C853",
  },
  {
    id: "copa-mundo",
    titulo: "Copa do Mundo",
    icone: GlobeHemisphereWestIcon,
    cor: "#FFC107",
  },
  {
    id: "champions",
    titulo: "Champions League",
    icone: TrophyIcon,
    cor: "#7B8CFF",
  },
  {
    id: "laliga",
    titulo: "La Liga",
    icone: TrophyIcon,
    cor: "#E53935",
  },
];

export function Quiz() {
  const navigation = useNavigation();

  const { configuracoes } = useAccessibility();

  const escalaIcone =
    configuracoes.tamanhoTexto === "grande"
      ? 1.15
      : configuracoes.tamanhoTexto === "muitoGrande"
        ? 1.3
        : 1;

  function abrirQuiz(id, titulo) {
    navigation.navigate("QuizPerguntas", {
      quizId: id,
      titulo,
    });
  }

  return (
    <SafeAreaView
      className="flex-1 bg-fundo"
      edges={["top", "bottom"]}
    >
      {/* Cabeçalho */}
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
            color="#F5F7F8"
            weight="regular"
          />
        </Pressable>

        <Texto
          tamanho={26}
          className="ml-3 text-texto"
        >
          Quiz
        </Texto>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingHorizontal: 15,
          paddingBottom: 100,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Quizzes diários */}
        <Texto
          tamanho={20}
          className="mb-3 mt-1 text-texto"
        >
          Quizzes Diários
        </Texto>

        <View className="overflow-hidden rounded-xl border border-cartao-borda bg-cartao">
          {quizzesDiarios.map((quiz, index) => {
            const Icone = quiz.icone;

            return (
              <Pressable
                key={quiz.id}
                onPress={() => abrirQuiz(quiz.id, quiz.titulo)}
                accessibilityRole="button"
                accessibilityLabel={`Abrir ${quiz.titulo}`}
                className={`flex-row items-center px-4 py-3 ${
                  index !== quizzesDiarios.length - 1
                    ? "border-b border-cartao-borda"
                    : ""
                }`}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.75 : 1,
                  backgroundColor: pressed
                    ? "#26343E"
                    : "transparent",
                  transform: [{ scale: pressed ? 0.99 : 1 }],
                  minHeight: 48 * escalaIcone,
                })}
              >
                {quiz.id === "escalacao" ? (
                  <View
                    className="items-center justify-center bg-verde"
                    style={{
                      width: 28 * escalaIcone,
                      height: 28 * escalaIcone,
                    }}
                  >
                    <SoccerBallIcon
                      size={20 * escalaIcone}
                      color="#071018"
                      weight="fill"
                    />
                  </View>
                ) : (
                  <Icone
                    size={(quiz.destaque ? 23 : 26) * escalaIcone}
                    color={quiz.cor}
                    weight="regular"
                  />
                )}

                <Texto
                  tamanho={14}
                  className={`ml-3 flex-1 ${
                    quiz.destaque
                      ? "font-semibold text-verde"
                      : "font-semibold text-texto"
                  }`}
                >
                  {quiz.titulo}
                </Texto>

                <CaretRightIcon
                  size={21 * escalaIcone}
                  color={quiz.destaque ? "#00C853" : "#6F7B83"}
                  weight="regular"
                />
              </Pressable>
            );
          })}
        </View>

        {/* Categorias */}
        <Texto
          tamanho={20}
          className="mb-3 mt-5 text-texto"
        >
          Quiz - Categorias
        </Texto>

        <View className="mb-5 overflow-hidden rounded-xl border border-cartao-borda bg-cartao">
          {categorias.map((categoria, index) => {
            const Icone = categoria.icone;

            return (
              <Pressable
                key={categoria.id}
                onPress={() =>
                  abrirQuiz(categoria.id, categoria.titulo)
                }
                accessibilityRole="button"
                accessibilityLabel={`Abrir ${categoria.titulo}`}
                className={`flex-row items-center px-4 py-3 ${
                  index !== categorias.length - 1
                    ? "border-b border-cartao-borda"
                    : ""
                }`}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.75 : 1,
                  backgroundColor: pressed
                    ? "#26343E"
                    : "transparent",
                  transform: [{ scale: pressed ? 0.99 : 1 }],
                  minHeight: 58 * escalaIcone,
                })}
              >
                <View
                  className="mr-3 items-center justify-center"
                  style={{
                    width: 28 * escalaIcone,
                    height: 28 * escalaIcone,
                  }}
                >
                  <Icone
                    size={23 * escalaIcone}
                    color={categoria.cor}
                    weight="fill"
                  />
                </View>

                <Texto
                  tamanho={14}
                  className="flex-1 font-semibold text-texto"
                >
                  {categoria.titulo}
                </Texto>

                <CaretRightIcon
                  size={20 * escalaIcone}
                  color="#6F7B83"
                  weight="regular"
                />
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      <BottomNav />
    </SafeAreaView>
  );
}

export default Quiz;