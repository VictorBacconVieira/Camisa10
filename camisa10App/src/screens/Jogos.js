import {
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import {
  ArrowLeftIcon,
  CalendarBlankIcon,
  CaretDownIcon,
  CaretRightIcon,
} from "phosphor-react-native";

import { useNavigation } from "@react-navigation/native";

import { SafeAreaView } from "react-native-safe-area-context";

import { BottomNav } from "../components/bottomNav";

export function Jogos() {
  const navigation = useNavigation();

  // =========================================================
  // DADOS TEMPORÁRIOS
  // =========================================================
  //
  // Estes dados existem somente para montar o frontend.
  //
  // FUTURO BACKEND / API:
  // Substituir esta lista pelos jogos recebidos da API.
  //
  // Cada partida poderá futuramente possuir:
  //
  // - id
  // - campeonato
  // - rodada
  // - data
  // - horário
  // - estádio
  // - timeMandante
  // - timeVisitante
  // - escudoMandante
  // - escudoVisitante
  // - status
  // - placar
  //
  // =========================================================

  const jogos = [
    {
      id: 1,
      campeonato: "Brasileirão - Série A",
      rodada: "20ª rodada",
      data: "16/08",
      horario: "16:00",
      estadio: "Vila Belmiro",
      timeCasa: "Santos",
      timeFora: "Vasco da Gama",
      status: "Agendado",
    },
    {
      id: 2,
      campeonato: "Brasileirão - Série A",
      rodada: "20ª rodada",
      data: "16/08",
      horario: "18:30",
      estadio: "Maracanã",
      timeCasa: "Flamengo",
      timeFora: "Palmeiras",
      status: "Agendado",
    },
    {
      id: 3,
      campeonato: "Brasileirão - Série A",
      rodada: "20ª rodada",
      data: "17/08",
      horario: "16:00",
      estadio: "Neo Química Arena",
      timeCasa: "Corinthians",
      timeFora: "Grêmio",
      status: "Agendado",
    },
    {
      id: 4,
      campeonato: "Brasileirão - Série A",
      rodada: "20ª rodada",
      data: "17/08",
      horario: "18:30",
      estadio: "Morumbi",
      timeCasa: "São Paulo",
      timeFora: "Internacional",
      status: "Agendado",
    },
  ];

  // =========================================================
  // FUTURO BACKEND / API
  // =========================================================
  //
  // Futuramente poderemos buscar:
  //
  // const response = await api.get("/jogos");
  //
  // E utilizar os dados retornados pela API no lugar
  // do array acima.
  //
  // =========================================================

  return (
    <SafeAreaView
      className="flex-1 bg-fundo"
      edges={["top", "bottom"]}
    >

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
            Jogos
          </Text>

        </View>

        {/* ================================================= */}
        {/* FILTRO DE DATA */}
        {/* ================================================= */}

        <View className="px-4">

          <Pressable
            className="h-[50px] flex-row items-center justify-between rounded-xl border border-cartao-borda bg-cartao px-4"
            onPress={() => {
              // =================================================
              // FUTURO:
              // Abrir seletor de data.
              //
              // Podemos posteriormente permitir que o usuário
              // escolha qualquer data do calendário.
              // =================================================
            }}
            style={({ pressed }) => ({
              opacity: pressed ? 0.8 : 1,
              transform: [
                {
                  scale: pressed ? 0.98 : 1,
                },
              ],
            })}
          >

            <View className="flex-row items-center">

              <CalendarBlankIcon
                size={21}
                color="#A8B2B9"
                weight="regular"
              />

              <Text
                className="ml-3 text-sm text-texto"
                style={{
                  fontFamily: "Inter",
                }}
              >
                Todos os jogos
              </Text>

            </View>

            <CaretDownIcon
              size={20}
              color="#A8B2B9"
              weight="regular"
            />

          </Pressable>

        </View>

        {/* ================================================= */}
        {/* DATAS RÁPIDAS */}
        {/* ================================================= */}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-5"
          contentContainerStyle={{
            paddingHorizontal: 16,
          }}
        >

          {/* TODOS */}

          <Pressable
            className="mr-2 items-center rounded-xl bg-verde px-5 py-2.5"
            onPress={() => {
              // FUTURO:
              // Mostrar todos os jogos.
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
              className="text-xs text-texto-sec"
              style={{
                fontFamily: "Inter",
              }}
            >
              TODOS
            </Text>

            <Text
              className="mt-0.5 text-sm font-bold text-texto"
              style={{
                fontFamily: "Inter",
              }}
            >
              Jogos
            </Text>

          </Pressable>

          {/* HOJE */}

          <Pressable
            className="mr-2 items-center rounded-xl border border-cartao-borda bg-cartao px-5 py-2.5"
            onPress={() => {
              // FUTURO:
              // Filtrar jogos de hoje.
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
              className="text-xs text-texto-sec"
              style={{
                fontFamily: "Inter",
              }}
            >
              HOJE
            </Text>

            <Text
              className="mt-0.5 text-sm font-bold text-texto"
              style={{
                fontFamily: "Inter",
              }}
            >
              16 AGO
            </Text>

          </Pressable>

          {/* AMANHÃ */}

          <Pressable
            className="mr-2 items-center rounded-xl border border-cartao-borda bg-cartao px-5 py-2.5"
            onPress={() => {
              // FUTURO:
              // Filtrar jogos de amanhã.
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
              className="text-xs text-texto-sec"
              style={{
                fontFamily: "Inter",
              }}
            >
              AMANHÃ
            </Text>

            <Text
              className="mt-0.5 text-sm font-bold text-texto"
              style={{
                fontFamily: "Inter",
              }}
            >
              17 AGO
            </Text>

          </Pressable>

          {/* OUTRO DIA */}

          <Pressable
            className="items-center rounded-xl border border-cartao-borda bg-cartao px-5 py-2.5"
            onPress={() => {
              // FUTURO:
              // Abrir seleção de outras datas.
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
              className="text-xs text-texto-sec"
              style={{
                fontFamily: "Inter",
              }}
            >
              OUTRO
            </Text>

            <Text
              className="mt-0.5 text-sm font-bold text-texto"
              style={{
                fontFamily: "Inter",
              }}
            >
              DATA
            </Text>

          </Pressable>

        </ScrollView>

        {/* ================================================= */}
        {/* TÍTULO */}
        {/* ================================================= */}

        <View className="mt-7 px-5">

          <Text
            className="text-xl text-texto"
            style={{
              fontFamily: "Anuphan",
            }}
          >
            Próximos jogos
          </Text>

          <Text
            className="mt-1 text-sm text-texto-sec"
            style={{
              fontFamily: "Inter",
            }}
          >
            Acompanhe as próximas partidas
          </Text>

        </View>

        {/* ================================================= */}
        {/* LISTA DE JOGOS */}
        {/* ================================================= */}

        <View className="mt-4 px-3">

          {jogos.map((jogo) => (

            <Pressable
              key={jogo.id}
              className="mb-4 rounded-[12px] bg-cartao px-4 py-4"
              onPress={() => {
                // =================================================
                // FUTURO:
                // Aqui será aberta a tela de Detalhes da Partida.
                //
                // Exemplo futuro:
                //
                // navigation.navigate("DetalhesPartida", {
                //   jogoId: jogo.id,
                // });
                //
                // Por enquanto NÃO fazemos nada.
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

              {/* ================================================= */}
              {/* CAMPEONATO */}
              {/* ================================================= */}

              <View className="flex-row items-center justify-between">

                <View className="flex-row items-center">

                  {/* =================================================
                      PLACEHOLDER DO CAMPEONATO

                      FUTURO API:
                      Substituir pelo logo/escudo do campeonato.
                      ================================================= */}

                  <View className="h-7 w-7 rounded-md bg-white" />

                  <View className="ml-2">

                    <Text
                      className="text-sm font-medium text-texto"
                      style={{
                        fontFamily: "Inter",
                      }}
                    >
                      {jogo.campeonato}
                    </Text>

                    <Text
                      className="mt-0.5 text-xs text-texto-sec"
                      style={{
                        fontFamily: "Inter",
                      }}
                    >
                      {jogo.rodada}
                    </Text>

                  </View>

                </View>

                <CaretRightIcon
                  size={20}
                  color="#6F7B83"
                  weight="regular"
                />

              </View>

              {/* ================================================= */}
              {/* PARTIDA */}
              {/* ================================================= */}

              <View className="mt-5 flex-row items-center justify-between">

                {/* TIME DA CASA */}

                <View className="w-[105px] items-center">

                  {/* =================================================
                      ESCUDO TEMPORÁRIO

                      FUTURO BACKEND / API:
                      Substituir este círculo branco pela imagem
                      do escudo recebida pela API.
                      ================================================= */}

                  <View className="h-[68px] w-[68px] rounded-full bg-white" />

                  <Text
                    numberOfLines={2}
                    className="mt-2 text-center text-base text-texto"
                    style={{
                      fontFamily: "Inter",
                    }}
                  >
                    {jogo.timeCasa}
                  </Text>

                </View>

                {/* HORÁRIO */}

                <View className="items-center">

                  <Text
                    className="text-2xl font-bold text-texto"
                    style={{
                      fontFamily: "Inter",
                    }}
                  >
                    {jogo.horario}
                  </Text>

                  <Text
                    className="mt-1 text-xs text-texto-sec"
                    style={{
                      fontFamily: "Inter",
                    }}
                  >
                    {jogo.data}
                  </Text>

                  <View className="mt-2 rounded-full bg-cartao-borda px-3 py-1">

                    <Text
                      className="text-[10px] text-texto-sec"
                      style={{
                        fontFamily: "Inter",
                      }}
                    >
                      {jogo.status}
                    </Text>

                  </View>

                </View>

                {/* TIME FORA */}

                <View className="w-[105px] items-center">

                  {/* =================================================
                      ESCUDO TEMPORÁRIO

                      FUTURO BACKEND / API:
                      Substituir este círculo branco pela imagem
                      do escudo recebida pela API.
                      ================================================= */}

                  <View className="h-[68px] w-[68px] rounded-full bg-white" />

                  <Text
                    numberOfLines={2}
                    className="mt-2 text-center text-base text-texto"
                    style={{
                      fontFamily: "Inter",
                    }}
                  >
                    {jogo.timeFora}
                  </Text>

                </View>

              </View>

              {/* ================================================= */}
              {/* ESTÁDIO */}
              {/* ================================================= */}

              <View className="mt-4 items-center">

                <Text
                  className="text-xs text-texto-sec"
                  style={{
                    fontFamily: "Inter",
                  }}
                >
                  {jogo.estadio}
                </Text>

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
        onPress={() => { navigation.navigate("Chatbot")}}
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