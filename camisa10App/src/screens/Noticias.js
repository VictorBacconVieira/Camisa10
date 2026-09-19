import {
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import {
  ArrowLeftIcon,
  CaretRightIcon,
  MagnifyingGlassIcon,
} from "phosphor-react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";

import { BottomNav } from "../components/bottomNav";

export function Noticias() {
  const navigation = useNavigation();

  // =========================================================
  // NOTÍCIAS TEMPORÁRIAS
  // =========================================================
  //
  // Estes dados são utilizados somente para o frontend.
  //
  // FUTURO BACKEND / API:
  // Substituir esta lista pelas notícias recebidas da API.
  //
  // Cada notícia poderá futuramente possuir:
  //
  // - id
  // - título
  // - imagem
  // - fonte
  // - data
  // - horário
  // - categoria
  // - conteúdo
  // - URL
  //
  // =========================================================

  const noticias = [
    {
      id: 1,
      titulo:
        'Neymar manda recado para Thiago Mendes após ser ignorado: "Soberba"',
      tempo: "2h atrás",
      fonte: "Jogada10",
      categoria: "Futebol",
    },
    {
      id: 2,
      titulo:
        "Mercado da bola movimenta os grandes clubes brasileiros nesta semana",
      tempo: "4h atrás",
      fonte: "Camisa10",
      categoria: "Mercado da Bola",
    },
    {
      id: 3,
      titulo:
        "Confira os principais jogos que acontecem nesta rodada",
      tempo: "6h atrás",
      fonte: "Camisa10",
      categoria: "Jogos",
    },
    {
      id: 4,
      titulo:
        "Craques brasileiros são destaque antes da próxima rodada",
      tempo: "8h atrás",
      fonte: "Jogada10",
      categoria: "Futebol",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-fundo" edges={["top", "bottom"]}>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingBottom: 110,
        }}
        showsVerticalScrollIndicator={false}
      >

        {/* ================================================= */}
        {/* CABEÇALHO */}
        {/* ================================================= */}

        <View className="h-[62px] flex-row items-center px-4">

          {/* VOLTAR */}

          <Pressable
            className="h-10 w-10 items-center justify-center"
            onPress={() => navigation.goBack()}
            style={({ pressed }) => ({
              opacity: pressed ? 0.6 : 1,
              transform: [
                {
                  scale: pressed ? 0.9 : 1,
                },
              ],
            })}
          >
            <ArrowLeftIcon
              size={25}
              color="#F5F7F8"
              weight="regular"
            />
          </Pressable>

          {/* TÍTULO */}

          <Text
            className="ml-3 text-[26px] text-texto"
            style={{
              fontFamily: "Anuphan",
            }}
          >
            Notícias
          </Text>

        </View>

        {/* ================================================= */}
        {/* PESQUISA */}
        {/* ================================================= */}

        <View className="px-4">

          <Pressable
            className="h-12 flex-row items-center rounded-xl border border-cartao-borda bg-cartao px-4"
            onPress={() => {
              // =================================================
              // FUTURO BACKEND:
              // Implementar pesquisa de notícias.
              // =================================================
            }}
            style={({ pressed }) => ({
              opacity: pressed ? 0.8 : 1,
            })}
          >

            <MagnifyingGlassIcon
              size={21}
              color="#A8B2B9"
              weight="regular"
            />

            <Text
              className="ml-3 text-sm text-texto-ter"
              style={{
                fontFamily: "Inter",
              }}
            >
              Buscar notícias
            </Text>

          </Pressable>

        </View>

        {/* ================================================= */}
        {/* CATEGORIAS */}
        {/* ================================================= */}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-5"
          contentContainerStyle={{
            paddingHorizontal: 16,
          }}
        >

          {/* CATEGORIA ATIVA */}

          <Pressable
            className="mr-2 rounded-full bg-verde px-5 py-2.5"
            onPress={() => {
              // FUTURO:
              // Filtrar notícias.
            }}
            style={({ pressed }) => ({
              opacity: pressed ? 0.7 : 1,
              transform: [
                {
                  scale: pressed ? 0.95 : 1,
                },
              ],
            })}
          >
            <Text
              className="text-sm font-bold text-texto"
              style={{
                fontFamily: "Inter",
              }}
            >
              Todas
            </Text>
          </Pressable>

          {/* FUTEBOL */}

          <Pressable
            className="mr-2 rounded-full border border-cartao-borda bg-cartao px-5 py-2.5"
            onPress={() => {
              // FUTURO:
              // Filtrar por futebol.
            }}
            style={({ pressed }) => ({
              opacity: pressed ? 0.7 : 1,
              transform: [
                {
                  scale: pressed ? 0.95 : 1,
                },
              ],
            })}
          >
            <Text
              className="text-sm text-texto"
              style={{
                fontFamily: "Inter",
              }}
            >
              Futebol
            </Text>
          </Pressable>

          {/* MERCADO DA BOLA */}

          <Pressable
            className="mr-2 rounded-full border border-cartao-borda bg-cartao px-5 py-2.5"
            onPress={() => {
              // FUTURO:
              // Filtrar por mercado da bola.
            }}
            style={({ pressed }) => ({
              opacity: pressed ? 0.7 : 1,
              transform: [
                {
                  scale: pressed ? 0.95 : 1,
                },
              ],
            })}
          >
            <Text
              className="text-sm text-texto"
              style={{
                fontFamily: "Inter",
              }}
            >
              Mercado da Bola
            </Text>
          </Pressable>

          {/* JOGOS */}

          <Pressable
            className="rounded-full border border-cartao-borda bg-cartao px-5 py-2.5"
            onPress={() => {
              navigation.navigate("Jogos");
            }}
            style={({ pressed }) => ({
              opacity: pressed ? 0.7 : 1,
              transform: [
                {
                  scale: pressed ? 0.95 : 1,
                },
              ],
            })}
          >
            <Text
              className="text-sm text-texto"
              style={{
                fontFamily: "Inter",
              }}
            >
              Jogos
            </Text>
          </Pressable>

        </ScrollView>

        {/* ================================================= */}
        {/* DESTAQUE */}
        {/* ================================================= */}

        <View className="mt-6 px-4">

          <Text
            className="mb-3 text-xl text-texto"
            style={{
              fontFamily: "Anuphan",
            }}
          >
            Destaque
          </Text>

          <Pressable
            className="overflow-hidden rounded-[12px] bg-cartao"
            onPress={() => {
              // =================================================
              // FUTURO BACKEND:
              // Abrir a notícia de destaque.
              // =================================================
            }}
            style={({ pressed }) => ({
              opacity: pressed ? 0.85 : 1,
              transform: [
                {
                  scale: pressed ? 0.98 : 1,
                },
              ],
            })}
          >

            {/* =================================================
                IMAGEM DA NOTÍCIA

                PLACEHOLDER TEMPORÁRIO

                FUTURO BACKEND / API:
                Substituir pela imagem da notícia.
                ================================================= */}

            <View className="h-[180px] w-full bg-cartao-borda" />

            <View className="p-4">

              <Text
                className="mb-2 text-xs font-bold text-verde"
                style={{
                  fontFamily: "Inter",
                }}
              >
                {noticias[0].categoria}
              </Text>

              <Text
                numberOfLines={3}
                className="text-lg font-bold text-texto"
                style={{
                  fontFamily: "Inter",
                }}
              >
                {noticias[0].titulo}
              </Text>

              <View className="mt-3 flex-row items-center">

                {/* FUTURO BACKEND:
                    Logo/avatar da fonte da notícia. */}

                <View className="h-5 w-5 rounded-full bg-white" />

                <Text
                  className="ml-2 text-xs text-texto-sec"
                  style={{
                    fontFamily: "Inter",
                  }}
                >
                  {noticias[0].fonte}
                </Text>

                <Text className="mx-2 text-xs text-texto-ter">
                  •
                </Text>

                <Text
                  className="text-xs text-texto-sec"
                  style={{
                    fontFamily: "Inter",
                  }}
                >
                  {noticias[0].tempo}
                </Text>

              </View>

            </View>

          </Pressable>

        </View>

        {/* ================================================= */}
        {/* TODAS AS NOTÍCIAS */}
        {/* ================================================= */}

        <View className="mt-7 px-4">

          <View className="mb-3 flex-row items-center justify-between">

            <Text
              className="text-xl text-texto"
              style={{
                fontFamily: "Anuphan",
              }}
            >
              Últimas notícias
            </Text>

          </View>

          {noticias.slice(1).map((noticia) => (

            <Pressable
              key={noticia.id}
              className="mb-4 flex-row overflow-hidden rounded-[10px] bg-cartao"
              onPress={() => {
                // =================================================
                // FUTURO BACKEND:
                // Abrir a notícia selecionada.
                //
                // Poderemos futuramente utilizar:
                //
                // navigation.navigate("NoticiaDetalhes", {
                //   noticiaId: noticia.id,
                // });
                // =================================================
              }}
              style={({ pressed }) => ({
                opacity: pressed ? 0.85 : 1,
                transform: [
                  {
                    scale: pressed ? 0.98 : 1,
                  },
                ],
              })}
            >

              {/* IMAGEM */}

              {/* =================================================
                  FUTURO BACKEND / API:
                  Substituir pelo campo noticia.imagem
                  ================================================= */}

              <View className="h-[105px] w-[115px] bg-cartao-borda" />

              {/* INFORMAÇÕES */}

              <View className="flex-1 p-3">

                <Text
                  className="mb-1 text-xs font-bold text-verde"
                  style={{
                    fontFamily: "Inter",
                  }}
                >
                  {noticia.categoria}
                </Text>

                <Text
                  numberOfLines={3}
                  className="text-sm font-medium text-texto"
                  style={{
                    fontFamily: "Inter",
                  }}
                >
                  {noticia.titulo}
                </Text>

                <View className="mt-2 flex-row items-center">

                  {/* FUTURO BACKEND:
                      Logo da fonte. */}

                  <View className="h-[14px] w-[14px] rounded-full bg-white" />

                  <Text
                    className="ml-1 text-[10px] text-texto-sec"
                    style={{
                      fontFamily: "Inter",
                    }}
                  >
                    {noticia.fonte}
                  </Text>

                  <Text className="mx-1 text-[10px] text-texto-ter">
                    •
                  </Text>

                  <Text
                    className="text-[10px] text-texto-sec"
                    style={{
                      fontFamily: "Inter",
                    }}
                  >
                    {noticia.tempo}
                  </Text>

                </View>

              </View>

              <View className="absolute bottom-3 right-3">

                <CaretRightIcon
                  size={18}
                  color="#A8B2B9"
                  weight="bold"
                />

              </View>

            </Pressable>

          ))}

        </View>

      </ScrollView>

      {/* ===================================================== */}
      {/* BOTÃO FLUTUANTE */}
      {/* ===================================================== */}

      <Pressable
        className="absolute bottom-[105px] right-5 h-[60px] w-[60px] items-center justify-center rounded-full bg-verde"
        onPress={() => {
          // ===================================================
          // FUTURO BACKEND / IA
          // ===================================================
          //
          // Abrir o assistente/IA do Camisa10.
          //
          // ===================================================
        }}
        style={({ pressed }) => ({
          opacity: pressed ? 0.75 : 1,
          transform: [
            {
              scale: pressed ? 0.9 : 1,
            },
          ],
        })}
      >
        <Text
          className="text-2xl font-bold text-texto"
          style={{
            fontFamily: "Inter",
          }}
        >
          AI
        </Text>
      </Pressable>

      {/* ===================================================== */}
      {/* BARRA DE NAVEGAÇÃO */}
      {/* ===================================================== */}

      <BottomNav />

    </SafeAreaView>
  );
}