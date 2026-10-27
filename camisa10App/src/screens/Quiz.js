
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

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
            size={25}
            color="#F5F7F8"
            weight="regular"
          />
        </Pressable>

        <Text
          className="ml-3 text-[26px] text-texto"
          style={{ fontFamily: "Anuphan" }}
        >
          Quiz
        </Text>
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
        <Text
          className="mb-3 mt-1 text-[20px] text-texto"
          style={{ fontFamily: "Inter" }}
        >
          Quizzes Diários
        </Text>

        <View className="overflow-hidden rounded-xl border border-cartao-borda bg-cartao">
          {quizzesDiarios.map((quiz, index) => {
            const Icone = quiz.icone;

            return (
              <Pressable
                key={quiz.id}
                onPress={() => abrirQuiz(quiz.id, quiz.titulo)}
                accessibilityRole="button"
                accessibilityLabel={`Abrir ${quiz.titulo}`}
                className={`flex-row items-center px-4 ${
                  index === 0 ? "h-[48px]" : "h-[52px]"
                } ${
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
                })}
              >
                {quiz.id === "escalacao" ? (
                  <View className="h-7 w-7 items-center justify-center bg-verde">
                    <SoccerBallIcon
                      size={20}
                      color="#071018"
                      weight="fill"
                    />
                  </View>
                ) : (
                  <Icone
                    size={quiz.destaque ? 23 : 26}
                    color={quiz.cor}
                    weight="regular"
                  />
                )}

                <Text
                  className={`ml-3 flex-1 text-[14px] ${
                    quiz.destaque
                      ? "font-semibold text-verde"
                      : "font-semibold text-texto"
                  }`}
                  style={{ fontFamily: "Inter" }}
                >
                  {quiz.titulo}
                </Text>

                <CaretRightIcon
                  size={21}
                  color={quiz.destaque ? "#00C853" : "#6F7B83"}
                  weight="regular"
                />
              </Pressable>
            );
          })}
        </View>

        {/* Categorias */}
        <Text
          className="mb-3 mt-5 text-[20px] text-texto"
          style={{ fontFamily: "Inter" }}
        >
          Quiz - Categorias
        </Text>

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
                className={`h-[58px] flex-row items-center px-4 ${
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
                })}
              >
                <View className="mr-3 h-7 w-7 items-center justify-center">
                  <Icone
                    size={23}
                    color={categoria.cor}
                    weight="fill"
                  />
                </View>

                <Text
                  className="flex-1 text-[14px] font-semibold text-texto"
                  style={{ fontFamily: "Inter" }}
                  numberOfLines={1}
                >
                  {categoria.titulo}
                </Text>

                <CaretRightIcon
                  size={20}
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
