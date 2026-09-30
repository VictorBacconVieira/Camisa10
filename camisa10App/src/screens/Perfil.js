import {
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import {
  BellIcon,
  CaretRightIcon,
  CircleIcon,
  EyeIcon,
  GearIcon,
  PaletteIcon,
  PencilSimpleIcon,
  SignOutIcon,
  SoccerBallIcon,
  StarIcon,
  TrophyIcon,
  UserCircleIcon,
} from "phosphor-react-native";

import { useNavigation } from "@react-navigation/native";

import { SafeAreaView } from "react-native-safe-area-context";

import { BottomNav } from "../components/bottomNav";

export function Perfil() {
  const navigation = useNavigation();

  // =========================================================
  // DADOS TEMPORÁRIOS DO USUÁRIO
  // =========================================================
  //
  // FRONTEND:
  // Estes valores são apenas para representar o layout.
  //
  // FUTURO BACKEND:
  // Estes dados deverão vir da API após o usuário realizar
  // o login.
  //
  // =========================================================

  const usuario = {
    nome: "Neymar Jr.",
    nivel: 80,

    experienciaAtual: 15000,
    experienciaTotal: 32500,

    quizzes: 80,
    xpTotal: "2.532.126",
    sequenciaAtual: 12,

    timeFavorito: "Santos",

    notificacoes: "Ativadas",
    acessibilidade: "Ver mais",
    tema: "Escuro",
  };

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

        {/* ================================================= */}
        {/* TÍTULO */}
        {/* ================================================= */}



        {/* ================================================= */}
        {/* ÁREA DO PERFIL */}
        {/* ================================================= */}

        <View className="mt-1 bg-fundo px-5">
          <View className="items-center">

            {/* ================================================= */}
            {/* FOTO DE PERFIL */}
            {/* ================================================= */}

            <View className="relative">

              {/*
                FUTURO BACKEND / API:

                Substituir este círculo pela foto do usuário.

                Exemplo:

                <Image
                  source={{ uri: usuario.fotoPerfil }}
                  className="h-[74px] w-[74px] rounded-full"
                />
              */}

              <View className="h-[74px] w-[74px] items-center justify-center rounded-full bg-cartao-borda">
                <UserCircleIcon
                  size={55}
                  color="#A8B2B9"
                  weight="regular"
                />
              </View>

              {/* EDITAR FOTO */}

              <Pressable
                className="absolute -right-2 -top-1 h-9 w-9 items-center justify-center rounded-full bg-fundo"
                onPress={() => {
                  // FUTURO BACKEND:
                  // Abrir seleção de foto e atualizar o perfil.
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
                <PencilSimpleIcon
                  size={21}
                  color="#F5F7F8"
                  weight="regular"
                />
              </Pressable>

            </View>

            {/* ================================================= */}
            {/* NOME */}
            {/* ================================================= */}

            <Text
              className="mt-2 text-[20px] text-texto"
              style={{
                fontFamily: "Inter",
              }}
            >
              {usuario.nome}
            </Text>

            {/* ================================================= */}
            {/* NÍVEL */}
            {/* ================================================= */}

            <View className="mt-0.5 flex-row items-center">

              <StarIcon
                size={14}
                color="#FFC107"
                weight="fill"
              />

              <Text
                className="ml-1 text-xs text-texto-sec"
                style={{
                  fontFamily: "Inter",
                }}
              >
                Nível {usuario.nivel} - Gênio
              </Text>

            </View>

            {/* ================================================= */}
            {/* XP */}
            {/* ================================================= */}

            <View className="mt-3 w-full">

              <View className="flex-row justify-between">

                <Text
                  className="text-[9px] text-texto-ter"
                  style={{
                    fontFamily: "Inter",
                  }}
                >
                  XP
                </Text>

                <Text
                  className="text-[9px] text-verde"
                  style={{
                    fontFamily: "Inter",
                  }}
                >
                  {usuario.experienciaAtual.toLocaleString("pt-BR")}
                  {" / "}
                  {usuario.experienciaTotal.toLocaleString("pt-BR")}
                </Text>

              </View>

              <View className="mt-1 h-[4px] overflow-hidden rounded-full bg-cartao-borda">
                <View
                  className="h-full rounded-full bg-verde"
                  style={{
                    width: "46%",
                  }}
                />
              </View>

            </View>

          </View>
        </View>

        {/* ================================================= */}
        {/* ESTATÍSTICAS */}
        {/* ================================================= */}

        <View className="mt-4 flex-row px-5">

          {/* QUIZZES */}

          <Pressable
            className="mr-2 flex-1 items-center rounded-lg border border-cartao-borda bg-cartao py-3"
            onPress={() => {
              // FUTURO:
              // Abrir histórico de quizzes.
            }}
            style={({ pressed }) => ({
              opacity: pressed ? 0.75 : 1,
              transform: [
                {
                  scale: pressed ? 0.97 : 1,
                },
              ],
            })}
          >
            <CircleIcon
              size={21}
              color="#E53935"
              weight="regular"
            />

            <Text
              className="mt-1 text-sm font-bold text-verde"
              style={{
                fontFamily: "Inter",
              }}
            >
              {usuario.quizzes}
            </Text>

            <Text
              className="text-[9px] text-texto-ter"
              style={{
                fontFamily: "Inter",
              }}
            >
              Quizzes
            </Text>
          </Pressable>

          {/* XP TOTAL */}

          <Pressable
            className="mx-1 flex-1 items-center rounded-lg border border-cartao-borda bg-cartao py-3"
            onPress={() => {
              // FUTURO:
              // Abrir detalhes de XP.
            }}
            style={({ pressed }) => ({
              opacity: pressed ? 0.75 : 1,
              transform: [
                {
                  scale: pressed ? 0.97 : 1,
                },
              ],
            })}
          >
            <StarIcon
              size={21}
              color="#FFC107"
              weight="fill"
            />

            <Text
              className="mt-1 text-sm font-bold text-verde"
              style={{
                fontFamily: "Inter",
              }}
            >
              {usuario.xpTotal}
            </Text>

            <Text
              className="text-[9px] text-texto-ter"
              style={{
                fontFamily: "Inter",
              }}
            >
              XP Total
            </Text>
          </Pressable>

          {/* SEQUÊNCIA */}

          <Pressable
            className="ml-2 flex-1 items-center rounded-lg border border-cartao-borda bg-cartao py-3"
            onPress={() => {
              // FUTURO:
              // Abrir detalhes da sequência.
            }}
            style={({ pressed }) => ({
              opacity: pressed ? 0.75 : 1,
              transform: [
                {
                  scale: pressed ? 0.97 : 1,
                },
              ],
            })}
          >
            <CircleIcon
              size={21}
              color="#E53935"
              weight="regular"
            />

            <Text
              className="mt-1 text-sm font-bold text-verde"
              style={{
                fontFamily: "Inter",
              }}
            >
              {usuario.sequenciaAtual}
            </Text>

            <Text
              className="text-[9px] text-texto-ter"
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

        <View className="mt-5 px-5">

          <Text
            className="text-base text-texto"
            style={{
              fontFamily: "Inter",
            }}
          >
            Conquistas
          </Text>

          {/* CRAQUE */}

          <Pressable
            className="mt-1 flex-row items-center rounded-lg border border-verde bg-cartao px-3 py-2"
            onPress={() => {
              // FUTURO:
              // Abrir detalhes da conquista.
            }}
            style={({ pressed }) => ({
              opacity: pressed ? 0.75 : 1,
              transform: [
                {
                  scale: pressed ? 0.98 : 1,
                },
              ],
            })}
          >
            <View className="h-8 w-8 items-center justify-center rounded-md bg-cartao-borda">
              <TrophyIcon
                size={21}
                color="#00C853"
                weight="fill"
              />
            </View>

            <View className="ml-3 flex-1">
              <Text
                className="text-xs text-texto"
                style={{
                  fontFamily: "Inter",
                }}
              >
                Craque
              </Text>

              <Text
                className="text-[9px] text-texto-ter"
                style={{
                  fontFamily: "Inter",
                }}
              >
                Acertou 100 perguntas
              </Text>
            </View>
          </Pressable>

          {/* OLHEIRO */}

          <Pressable
            className="mt-1 flex-row items-center rounded-lg border border-verde bg-cartao px-3 py-2"
            onPress={() => {
              // FUTURO:
              // Abrir detalhes da conquista.
            }}
            style={({ pressed }) => ({
              opacity: pressed ? 0.75 : 1,
              transform: [
                {
                  scale: pressed ? 0.98 : 1,
                },
              ],
            })}
          >
            <View className="h-8 w-8 items-center justify-center rounded-md bg-cartao-borda">
              <EyeIcon
                size={21}
                color="#00C853"
                weight="regular"
              />
            </View>

            <View className="ml-3 flex-1">
              <Text
                className="text-xs text-texto"
                style={{
                  fontFamily: "Inter",
                }}
              >
                Olheiro
              </Text>

              <Text
                className="text-[9px] text-texto-ter"
                style={{
                  fontFamily: "Inter",
                }}
              >
                Acertou 10 escalações
              </Text>
            </View>
          </Pressable>

          {/* CAMPEÃO */}

          <Pressable
            className="mt-1 flex-row items-center rounded-lg bg-cartao px-3 py-2"
            onPress={() => {
              // FUTURO:
              // Abrir detalhes da conquista.
            }}
            style={({ pressed }) => ({
              opacity: pressed ? 0.75 : 1,
              transform: [
                {
                  scale: pressed ? 0.98 : 1,
                },
              ],
            })}
          >
            <View className="h-8 w-8 items-center justify-center rounded-md bg-cartao-borda">
              <Text className="text-lg text-texto-ter">
                ◇
              </Text>
            </View>

            <View className="ml-3 flex-1">
              <Text
                className="text-xs text-texto-ter"
                style={{
                  fontFamily: "Inter",
                }}
              >
                Campeão
              </Text>

              <Text
                className="text-[9px] text-texto-ter"
                style={{
                  fontFamily: "Inter",
                }}
              >
                Venceu 5 simulações
              </Text>
            </View>
          </Pressable>

          {/* EM CHAMAS */}

          <Pressable
            className="mt-1 flex-row items-center rounded-lg bg-cartao px-3 py-2"
            onPress={() => {
              // FUTURO:
              // Abrir detalhes da conquista.
            }}
            style={({ pressed }) => ({
              opacity: pressed ? 0.75 : 1,
              transform: [
                {
                  scale: pressed ? 0.98 : 1,
                },
              ],
            })}
          >
            <View className="h-8 w-8 items-center justify-center rounded-md bg-cartao-borda">
              <Text className="text-lg text-texto-ter">
                ♢
              </Text>
            </View>

            <View className="ml-3 flex-1">
              <Text
                className="text-xs text-texto-ter"
                style={{
                  fontFamily: "Inter",
                }}
              >
                Em Chamas
              </Text>

              <Text
                className="text-[9px] text-texto-ter"
                style={{
                  fontFamily: "Inter",
                }}
              >
                Sequência de 15 dias
              </Text>
            </View>
          </Pressable>

        </View>

        {/* ================================================= */}
        {/* CONFIGURAÇÕES */}
        {/* ================================================= */}

        <View className="mt-5 px-5">

          <Text
            className="text-base text-texto"
            style={{
              fontFamily: "Inter",
            }}
          >
            Configurações
          </Text>

          <View className="mt-1 overflow-hidden rounded-lg border border-cartao-borda bg-cartao">

            {/* TIME FAVORITO */}

            <Pressable
              className="h-[52px] flex-row items-center px-3"
              onPress={() => {
                // FUTURO BACKEND / API:
                // Permitir selecionar o time favorito.
              }}
              style={({ pressed }) => ({
                opacity: pressed ? 0.7 : 1,
              })}
            >
              <SoccerBallIcon
                size={23}
                color="#F5F7F8"
                weight="regular"
              />

              <Text
                className="ml-3 flex-1 text-xs text-texto"
                style={{
                  fontFamily: "Inter",
                }}
              >
                Meu Time Favorito
              </Text>

              <Text
                className="text-[9px] text-texto-ter"
                style={{
                  fontFamily: "Inter",
                }}
              >
                {usuario.timeFavorito}
              </Text>

              <CaretRightIcon
                size={17}
                color="#6F7B83"
              />
            </Pressable>

            <View className="h-px bg-cartao-borda" />

            {/* NOTIFICAÇÕES */}

            <Pressable
              className="h-[52px] flex-row items-center px-3"
              onPress={() => {
                // FUTURO:
                // Configuração de notificações.
              }}
              style={({ pressed }) => ({
                opacity: pressed ? 0.7 : 1,
              })}
            >
              <BellIcon
                size={23}
                color="#F5F7F8"
                weight="regular"
              />

              <Text
                className="ml-3 flex-1 text-xs text-texto"
                style={{
                  fontFamily: "Inter",
                }}
              >
                Notificações
              </Text>

              <Text
                className="text-[9px] text-texto-ter"
                style={{
                  fontFamily: "Inter",
                }}
              >
                {usuario.notificacoes}
              </Text>

              <CaretRightIcon
                size={17}
                color="#6F7B83"
              />
            </Pressable>

            <View className="h-px bg-cartao-borda" />

            {/* ACESSIBILIDADE */}

            <Pressable
              className="h-[52px] flex-row items-center px-3"
              onPress={() => {
                // FUTURO:
                // Abrir configurações de acessibilidade.
              }}
              style={({ pressed }) => ({
                opacity: pressed ? 0.7 : 1,
              })}
            >
              <GearIcon
                size={23}
                color="#F5F7F8"
                weight="regular"
              />

              <Text
                className="ml-3 flex-1 text-xs text-texto"
                style={{
                  fontFamily: "Inter",
                }}
              >
                Acessibilidade
              </Text>

              <Text
                className="text-[9px] text-texto-ter"
                style={{
                  fontFamily: "Inter",
                }}
              >
                {usuario.acessibilidade}
              </Text>

              <CaretRightIcon
                size={17}
                color="#6F7B83"
              />
            </Pressable>

            <View className="h-px bg-cartao-borda" />

            {/* TEMA */}

            <Pressable
              className="h-[52px] flex-row items-center px-3"
              onPress={() => {
                // FUTURO:
                // Alternar entre tema claro/escuro.
              }}
              style={({ pressed }) => ({
                opacity: pressed ? 0.7 : 1,
              })}
            >
              <PaletteIcon
                size={23}
                color="#F5F7F8"
                weight="regular"
              />

              <Text
                className="ml-3 flex-1 text-xs text-texto"
                style={{
                  fontFamily: "Inter",
                }}
              >
                Tema
              </Text>

              <Text
                className="mr-3 text-[9px] text-texto-ter"
                style={{
                  fontFamily: "Inter",
                }}
              >
                {usuario.tema}
              </Text>

              <View className="h-[20px] w-[40px] justify-center rounded-full bg-verde px-1">
                <View className="h-[16px] w-[16px] self-end rounded-full bg-white" />
              </View>

            </Pressable>

          </View>

        </View>

        {/* ================================================= */}
        {/* SAIR DA CONTA */}
        {/* ================================================= */}

        <View className="mt-4 px-5">

          <Pressable
            className="h-[45px] flex-row items-center justify-between rounded-lg border border-vermelho px-3"
            onPress={() => {
              // =================================================
              // FUTURO BACKEND:
              //
              // Aqui será realizado o logout real da sessão.
              //
              // Exemplo:
              //
              // await api.post("/logout");
              //
              // Por enquanto, apenas voltamos para o Login.
              // =================================================

              navigation.replace("Login");
            }}
            style={({ pressed }) => ({
              opacity: pressed ? 0.7 : 1,
              transform: [
                {
                  scale: pressed ? 0.98 : 1,
                },
              ],
            })}
          >

            <Text
              className="text-sm text-vermelho"
              style={{
                fontFamily: "Inter",
              }}
            >
              Sair da Conta
            </Text>

            <SignOutIcon
              size={22}
              color="#E53935"
              weight="regular"
            />

          </Pressable>

        </View>

      </ScrollView>

      {/* ================================================= */}
      {/* BOTTOM NAV */}
      {/* ================================================= */}

      <BottomNav />

    </SafeAreaView>
  );
}