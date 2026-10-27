import {
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

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
  UserCircleIcon,
  FireIcon,
} from "phosphor-react-native";

import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BottomNav } from "../components/bottomNav";

export function Perfil() {
  const navigation = useNavigation();

  // =========================================================
  // DADOS TEMPORÁRIOS DO USUÁRIO
  // =========================================================
  // FRONTEND:
  // Estes valores são apenas para representar o layout.
  //
  // FUTURO BACKEND:
  // Estes dados deverão vir da API após o usuário realizar
  // o login.
  // =========================================================

  const usuario = {
    nome: "Neymar Jr.",
    nivel: 80,
    experienciaAtual: 15000,
    experienciaTotal: 32500,
    quizzes: 49,
    xpTotal: "2.532.126",
    sequenciaAtual: 5,
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
        {/* ÁREA DO PERFIL */}
        {/* ================================================= */}

        <View className="mt-3 bg-fundo px-5">
          <View className="items-center">
            {/* FOTO DE PERFIL */}

            <View className="relative">
              {/*
                FUTURO BACKEND / API:
                Substituir este círculo pela foto do usuário.

                Exemplo:
                <Image
                  source={{ uri: usuario.fotoPerfil }}
                  className="h-24 w-24 rounded-full"
                />
              */}

              <View className="h-24 w-24 items-center justify-center rounded-full bg-cartao-borda">
                <UserCircleIcon
                  size={68}
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
                Nível {usuario.nivel} - Gênio
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
                  {usuario.experienciaAtual.toLocaleString("pt-BR")}
                  {" / "}
                  {usuario.experienciaTotal.toLocaleString("pt-BR")}
                </Text>
              </View>

              <View className="mt-2 h-[6px] overflow-hidden rounded-full bg-cartao-borda">
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
                {
                  scale: pressed ? 0.97 : 1,
                },
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
              {usuario.quizzes}
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
                {
                  scale: pressed ? 0.97 : 1,
                },
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
              {usuario.xpTotal}
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
                {
                  scale: pressed ? 0.97 : 1,
                },
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
              {usuario.sequenciaAtual}
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

          {/* CRAQUE */}

          <Pressable
            className="mt-2 flex-row items-center rounded-lg border border-verde bg-cartao px-3 py-3"
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
            <View className="h-10 w-10 items-center justify-center rounded-md bg-cartao-borda">
              <SealQuestionIcon
                size={24}
                color="#00C853"
                weight="fill"
              />
            </View>

            <View className="ml-3 flex-1">
              <Text
                className="text-sm text-texto"
                style={{
                  fontFamily: "Inter",
                }}
              >
                Sábio
              </Text>

              <Text
                className="text-[11px] text-texto-ter"
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
            className="mt-2 flex-row items-center rounded-lg border border-verde bg-cartao px-3 py-3"
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
            <View className="h-10 w-10 items-center justify-center rounded-md bg-cartao-borda">
              <EyeIcon
                size={24}
                color="#00C853"
                weight="regular"
              />
            </View>

            <View className="ml-3 flex-1">
              <Text
                className="text-sm text-texto"
                style={{
                  fontFamily: "Inter",
                }}
              >
                Olheiro
              </Text>

              <Text
                className="text-[11px] text-texto-ter"
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
            className="mt-2 flex-row items-center rounded-lg bg-cartao px-3 py-3"
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
            <View className="h-10 w-10 items-center justify-center rounded-md bg-cartao-borda">
              <Text className="text-xl text-texto-ter">
                ◇
              </Text>
            </View>

            <View className="ml-3 flex-1">
              <Text
                className="text-sm text-texto-ter"
                style={{
                  fontFamily: "Inter",
                }}
              >
                Campeão
              </Text>

              <Text
                className="text-[11px] text-texto-ter"
                style={{
                  fontFamily: "Inter",
                }}
              >
                Venceu 50 Quizzes
              </Text>
            </View>
          </Pressable>

          {/* EM CHAMAS */}

          <Pressable
            className="mt-2 flex-row items-center rounded-lg bg-cartao px-3 py-3"
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
            <View className="h-10 w-10 items-center justify-center rounded-md bg-cartao-borda">
              <Text className="text-xl text-texto-ter">
                ♢
              </Text>
            </View>

            <View className="ml-3 flex-1">
              <Text
                className="text-sm text-texto-ter"
                style={{
                  fontFamily: "Inter",
                }}
              >
                Em Chamas
              </Text>

              <Text
                className="text-[11px] text-texto-ter"
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

        <View className="mt-7 px-5">
          <Text
            className="text-lg text-texto"
            style={{
              fontFamily: "Inter",
            }}
          >
            Configurações
          </Text>

          <View className="mt-2 overflow-hidden rounded-lg border border-cartao-borda bg-cartao">
            {/* TIME FAVORITO */}

            <Pressable
              className="h-16 flex-row items-center px-3"
              onPress={() => {
                // FUTURO BACKEND / API:
                // Permitir selecionar o time favorito.
              }}
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
                {usuario.timeFavorito}
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
                {usuario.notificacoes}
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
                {usuario.acessibilidade}
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
                {usuario.tema}
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
            onPress={() => {
              // FUTURO BACKEND:
              // Aqui será realizado o logout real da sessão.
              //
              // Exemplo:
              // await api.post("/logout");
              //
              // Por enquanto, voltamos para o Login.

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
      {/* BOTTOM NAV */}
      {/* ================================================= */}

      <BottomNav />
    </SafeAreaView>
  );
}