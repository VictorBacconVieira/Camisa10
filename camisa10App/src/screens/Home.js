import {
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import {
  BellIcon,
  CaretRightIcon,
  HouseIcon,
  ListIcon,
  MagnifyingGlassIcon,
  NewspaperIcon,
  QuestionIcon,
  SoccerBallIcon,
  UserIcon,
} from "phosphor-react-native";

import { useNavigation } from "@react-navigation/native";

import { BottomNav } from "../components/bottomNav";

export function Home() {
  const navigation = useNavigation();

  // =========================================================
  // DADOS TEMPORÁRIOS
  // =========================================================
  //
  // Estes dados são utilizados somente para o frontend.
  //
  // FUTURO BACKEND / API:
  // Substituir estes dados pelas informações recebidas
  // através da API do Camisa10.
  //
  // =========================================================

  const proximoJogo = {
    campeonato: "Brasileirão - Série A",
    timeCasa: "Santos",
    timeFora: "Vasco da Gama",
    data: "Dom, 16/08",
    horario: "16:00",
    estadio: "Vila Belmiro",
  };

  const noticias = [
    {
      id: 1,
      titulo:
        'Neymar manda recado para Thiago Mendes após ser ignorado: "Soberba"',
      tempo: "2h atrás",
      fonte: "Jogada10",
    },
    {
      id: 2,
      titulo:
        'Neymar manda recado para Thiago Mendes após ser ignorado: "Soberba"',
      tempo: "2h atrás",
      fonte: "Jogada10",
    },
  ];

  // =========================================================
  // FUTURO BACKEND / API
  // =========================================================
  //
  // Futuramente esta tela poderá receber:
  //
  // - Próximos jogos
  // - Times
  // - Escudos
  // - Campeonatos
  // - Notícias
  // - Imagens
  // - Horários
  // - Estádios
  //
  // Exemplo futuro:
  //
  // const response = await api.get("/jogos/proximos");
  //
  // =========================================================

  return (
    <View className="flex-1 bg-fundo">

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

        <View className="h-[62px] flex-row items-center justify-between px-4">

          {/* MENU */}

          <Pressable
            className="h-10 w-10 items-center justify-center"
            onPress={() => {
              // FUTURO:
              // Abrir menu lateral.
            }}
            style={({ pressed }) => ({
              opacity: pressed ? 0.6 : 1,
              transform: [
                {
                  scale: pressed ? 0.9 : 1,
                },
              ],
            })}
          >
            <ListIcon
              size={26}
              color="#F5F7F8"
              weight="regular"
            />
          </Pressable>

          {/* LOGO / NOME */}

          <Text
            className="text-[28px] text-texto"
            style={{
              fontFamily: "Anuphan",
            }}
          >
            Camisa
            <Text className="text-[#39FF14]">
              10
            </Text>
          </Text>

          {/* AÇÕES */}

          <View className="flex-row items-center">

            {/* PESQUISA */}

            <Pressable
              className="mr-2 h-10 w-10 items-center justify-center"
              onPress={() => {
                // FUTURO:
                // Abrir pesquisa.
              }}
              style={({ pressed }) => ({
                opacity: pressed ? 0.6 : 1,
                transform: [
                  {
                    scale: pressed ? 0.9 : 1,
                  },
                ],
              })}
            >
              <MagnifyingGlassIcon
                size={25}
                color="#F5F7F8"
                weight="regular"
              />
            </Pressable>

            {/* NOTIFICAÇÕES */}

            <Pressable
              className="h-10 w-10 items-center justify-center"
              onPress={() => {
                // FUTURO:
                // Abrir notificações.
              }}
              style={({ pressed }) => ({
                opacity: pressed ? 0.6 : 1,
                transform: [
                  {
                    scale: pressed ? 0.9 : 1,
                  },
                ],
              })}
            >
              <BellIcon
                size={25}
                color="#F5F7F8"
                weight="regular"
              />
            </Pressable>

          </View>

        </View>

        {/* ================================================= */}
        {/* PRÓXIMOS JOGOS */}
        {/* ================================================= */}

        <View className="mt-1">

          {/* TÍTULO */}

          <View className="mb-3 flex-row items-center justify-between px-5">

            <Text
              className="text-xl text-texto"
              style={{
                fontFamily: "Anuphan",
              }}
            >
              Próximos jogos
            </Text>

            {/* VER TODOS */}

            <Pressable
              className="flex-row items-center"
              onPress={() =>
                navigation.navigate("Jogos")
              }
              style={({ pressed }) => ({
                opacity: pressed ? 0.6 : 1,
                transform: [
                  {
                    scale: pressed ? 0.96 : 1,
                  },
                ],
              })}
            >
              <Text
                className="text-[15px] text-texto-sec"
                style={{
                  fontFamily: "Anuphan",
                }}
              >
                Ver todos
              </Text>

              <CaretRightIcon
                size={19}
                color="#A8B2B9"
                weight="regular"
              />
            </Pressable>

          </View>

          {/* CARD DO JOGO */}

          <Pressable
            className="mx-3 rounded-[10px] bg-cartao px-3 py-3"
            onPress={() =>
              navigation.navigate("Jogos")
            }
            style={({ pressed }) => ({
              opacity: pressed ? 0.85 : 1,
              transform: [
                {
                  scale: pressed ? 0.98 : 1,
                },
              ],
            })}
          >

            {/* CAMPEONATO */}

            <View className="flex-row items-center">

              {/* FUTURO API:
                  Substituir pelo escudo/logo do campeonato. */}

              <View className="h-7 w-7 rounded-md bg-white" />

              <Text
                className="ml-2 text-sm text-texto"
                style={{
                  fontFamily: "Inter",
                }}
              >
                {proximoJogo.campeonato}
              </Text>

            </View>

            {/* TIMES */}

            <View className="mt-4 flex-row items-center justify-between">

              {/* TIME DA CASA */}

              <View className="w-[105px] items-center">

                {/* =================================================
                    ESCUDO TEMPORÁRIO

                    FUTURO BACKEND / API:

                    Substituir este círculo branco pela imagem
                    do escudo recebida pela API.
                    ================================================= */}

                <View className="h-20 w-20 rounded-full bg-white" />

                <Text
                  className="mt-2 text-center text-lg text-texto"
                  style={{
                    fontFamily: "Inter",
                  }}
                >
                  {proximoJogo.timeCasa}
                </Text>

              </View>

              {/* X */}

              <Text
                className="text-5xl text-texto"
                style={{
                  fontFamily: "Inter",
                }}
              >
                x
              </Text>

              {/* TIME FORA */}

              <View className="w-[105px] items-center">

                {/* =================================================
                    ESCUDO TEMPORÁRIO

                    FUTURO BACKEND / API:

                    Substituir este círculo branco pela imagem
                    do escudo recebida pela API.
                    ================================================= */}

                <View className="h-20 w-20 rounded-full bg-white" />

                <Text
                  className="mt-2 text-center text-lg text-texto"
                  style={{
                    fontFamily: "Inter",
                  }}
                >
                  {proximoJogo.timeFora}
                </Text>

              </View>

            </View>

            {/* DATA / HORÁRIO / ESTÁDIO */}

            <View className="mt-4 items-center">

              <Text
                className="text-[15px] text-texto-sec"
                style={{
                  fontFamily: "Inter",
                }}
              >
                {proximoJogo.data} • {proximoJogo.horario}
              </Text>

              <Text
                className="mt-1 text-[15px] text-texto-sec"
                style={{
                  fontFamily: "Inter",
                }}
              >
                {proximoJogo.estadio}
              </Text>

            </View>

          </Pressable>

        </View>

        {/* ================================================= */}
        {/* ÚLTIMAS NOTÍCIAS */}
        {/* ================================================= */}

        <View className="mt-6">

          {/* TÍTULO */}

          <View className="mb-3 flex-row items-center justify-between px-5">

            <Text
              className="text-xl text-texto"
              style={{
                fontFamily: "Anuphan",
              }}
            >
              Últimas notícias
            </Text>

            {/* VER TODAS */}

            <Pressable
              className="flex-row items-center"
              onPress={() =>
                navigation.navigate("Noticias")
              }
              style={({ pressed }) => ({
                opacity: pressed ? 0.6 : 1,
                transform: [
                  {
                    scale: pressed ? 0.96 : 1,
                  },
                ],
              })}
            >

              <Text
                className="text-[15px] text-texto-sec"
                style={{
                  fontFamily: "Anuphan",
                }}
              >
                Ver todas
              </Text>

              <CaretRightIcon
                size={19}
                color="#A8B2B9"
                weight="regular"
              />

            </Pressable>

          </View>

          {/* NOTÍCIAS */}

          {noticias.map((noticia) => (

            <Pressable
              key={noticia.id}
              className="mx-3 mb-4 h-[89px] flex-row rounded-[10px] bg-cartao p-3"
              onPress={() => {
                // FUTURO BACKEND:
                // Abrir a notícia selecionada.
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

                  FUTURO BACKEND / API:

                  Substituir este placeholder pela imagem
                  recebida da API.
                  ================================================= */}

              <View className="h-[68px] w-[90px] rounded-[10px] bg-cartao-borda" />

              {/* INFORMAÇÕES */}

              <View className="ml-3 flex-1 justify-between">

                <Text
                  numberOfLines={3}
                  className="text-sm text-texto"
                  style={{
                    fontFamily: "Inter",
                  }}
                >
                  {noticia.titulo}
                </Text>

                <View className="flex-row items-center">

                  {/* FUTURO BACKEND:
                      Avatar/logo da fonte da notícia. */}

                  <View className="h-[15px] w-[15px] rounded-full bg-white" />

                  <Text
                    className="ml-1 text-xs text-texto"
                    style={{
                      fontFamily: "Inter",
                    }}
                  >
                    {noticia.fonte}
                  </Text>

                  <Text className="mx-1 text-xs text-texto-sec">
                    •
                  </Text>

                  <Text
                    className="text-xs text-texto-sec"
                    style={{
                      fontFamily: "Inter",
                    }}
                  >
                    {noticia.tempo}
                  </Text>

                </View>

              </View>

            </Pressable>

          ))}

        </View>

        {/* ================================================= */}
        {/* DESAFIO DO DIA */}
        {/* ================================================= */}

        <View className="mt-2 px-5">

          <Text
            className="text-xl text-texto"
            style={{
              fontFamily: "Anuphan",
            }}
          >
            Desafio do dia
          </Text>

          <Pressable
            className="mt-3 rounded-[10px] bg-cartao p-4"
            onPress={() =>
              navigation.navigate("Quiz")
            }
            style={({ pressed }) => ({
              opacity: pressed ? 0.85 : 1,
              transform: [
                {
                  scale: pressed ? 0.98 : 1,
                },
              ],
            })}
          >

            <View className="flex-row items-center">

              <View className="h-14 w-14 items-center justify-center rounded-full bg-verde">

                <QuestionIcon
                  size={30}
                  color="#F5F7F8"
                  weight="bold"
                />

              </View>

              <View className="ml-4 flex-1">

                <Text
                  className="text-base font-bold text-texto"
                  style={{
                    fontFamily: "Inter",
                  }}
                >
                  Quiz do dia
                </Text>

                <Text
                  className="mt-1 text-sm text-texto-sec"
                  style={{
                    fontFamily: "Inter",
                  }}
                >
                  Teste seus conhecimentos
                  sobre futebol!
                </Text>

              </View>

              <CaretRightIcon
                size={24}
                color="#A8B2B9"
                weight="bold"
              />

            </View>

          </Pressable>

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
          // Este botão será utilizado posteriormente para
          // abrir o assistente/IA do Camisa10.
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

    </View>
  );
}