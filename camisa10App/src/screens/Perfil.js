
import {
  Pressable,
  ScrollView,
  Text,
  View,
  Modal,
} from "react-native";

import { useState } from "react";

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
  FireIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
} from "phosphor-react-native";

import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BottomNav } from "../components/bottomNav";
import { FotoPerfil } from "../components/fotoPerfil";

export function Perfil() {
  const navigation = useNavigation();

  const [modalSucessoVisivel, setModalSucessoVisivel] =
    useState(false);

  const [fotoPerfil, setFotoPerfil] = useState(null);

  // =========================================================
  // FOTO DE PERFIL
  // =========================================================
  // O componente FotoPerfil controla a seleção da imagem,
  // permissões, câmera, galeria e modal de seleção.
  //
  // FUTURO BACKEND:
  // Enviar a imagem para a API e salvar a foto do usuário.
  // =========================================================

  // =========================================================
  // DADOS TEMPORÁRIOS DO USUÁRIO
  // =========================================================
  // FRONTEND:
  // Valores temporários para testar a interface.
  //
  // FUTURO BACKEND:
  // Substituir pelos dados recebidos da API do usuário.
  // Campos numéricos sem registros devem retornar 0.
  // =========================================================

  const usuario = {
    nome: "Neymar Jr.",

    // XP acumulado pelo usuário.
    // Exemplo: 0, 10000, 11000, 12000...
    xpTotal: 451000,

    quizzes: 49,
    sequenciaAtual: 5,

    timeFavorito: "Santos",
    notificacoes: "Ativadas",
    acessibilidade: "Ver mais",
    tema: "Escuro",

    // =====================================================
    // DADOS DAS CONQUISTAS
    // =====================================================
    // FRONTEND:
    // Valores temporários para testar os desbloqueios.
    //
    // FUTURO BACKEND:
    // Substituir pelos dados recebidos da API.
    // =====================================================

    respostasCorretas: 101,
    escalacoesCorretas: 9,
  };

  // =========================================================
  // SISTEMA DE NÍVEIS
  // =========================================================
  // Nível 1 -> 2: 10.000 XP
  // Nível 2 -> 3: 11.000 XP
  // Nível 3 -> 4: 12.000 XP
  // Nível 4 -> 5: 13.000 XP
  //
  // A cada nível, o requisito aumenta em 1.000 XP.
  //
  // FUTURO BACKEND:
  // Receber o XP total acumulado do usuário pela API.
  // O XP total nunca deve ser zerado ao subir de nível.
  // =========================================================

  const xpTotal = Math.max(
    0,
    Number(usuario.xpTotal) || 0
  );

  // Calcula o XP total necessário para alcançar determinado nível.
  function calcularXpNivel(nivel) {
    if (nivel <= 1) return 0;

    const quantidadeNiveis = nivel - 1;

    return (
      quantidadeNiveis * 10000 +
      ((quantidadeNiveis - 1) * quantidadeNiveis * 1000) / 2
    );
  }

  // Descobre o nível atual com base no XP acumulado.
  let nivelAtual = 1;

  while (xpTotal >= calcularXpNivel(nivelAtual + 1)) {
    nivelAtual++;
  }

  // XP total necessário para alcançar o nível atual.
  const xpInicioNivel = calcularXpNivel(nivelAtual);

  // XP total necessário para alcançar o próximo nível.
  const xpProximoNivel = calcularXpNivel(nivelAtual + 1);

  // XP conquistado dentro do nível atual.
  const xpAtualNivel = xpTotal - xpInicioNivel;

  // XP necessário para completar o nível atual.
  const xpNecessarioNivel = xpProximoNivel - xpInicioNivel;

  // Progresso da barra.
  const progressoNivel = Math.min(
    100,
    Math.max(
      0,
      (xpAtualNivel / xpNecessarioNivel) * 100
    )
  );

  // =========================================================
  // REGRAS DAS CONQUISTAS
  // =========================================================
  // Cada conquista verifica o progresso do usuário.
  //
  // FUTURO BACKEND:
  // Os valores serão recebidos da API.
  // O backend poderá também informar quais conquistas
  // foram desbloqueadas pelo usuário.
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
      progresso: Math.max(
        0,
        Number(usuario.escalacoesCorretas) || 0
      ),
      requisito: 10,
      Icone: EyeIcon,
    },
    {
      id: "campeao",
      nome: "Campeão",
      descricao: "Venceu 50 quizzes",
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
        Number(usuario.sequenciaAtual) || 0
      ),
      requisito: 15,
      Icone: FireIcon,
    },
  ].map((conquista) => ({
    ...conquista,
    desbloqueada:
      conquista.progresso >= conquista.requisito,
  }));

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
        {/* BOTÃO DE VOLTAR */}

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
            Perfil
          </Text>
        </View>

        {/* ================================================= */}
        {/* ÁREA DO PERFIL */}
        {/* ================================================= */}

        <View className="mt-3 bg-fundo px-5">
          <View className="items-center">

            {/* FOTO DE PERFIL - COMPONENTE REUTILIZÁVEL */}

            <FotoPerfil
              foto={fotoPerfil}
              nome={usuario.nome}
              tamanho={96}
              onFotoSelecionada={(uri) => {
                setFotoPerfil(uri);
                setModalSucessoVisivel(true);

                // FUTURO BACKEND:
                // Enviar a imagem para a API e salvar
                // a foto do usuário.
              }}
            />

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
                Nível {nivelAtual}
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
                  {xpAtualNivel.toLocaleString("pt-BR")}
                  {" / "}
                  {xpNecessarioNivel.toLocaleString("pt-BR")}
                </Text>
              </View>

              <View className="mt-2 h-[6px] overflow-hidden rounded-full bg-cartao-borda">
                <View
                  className="h-full rounded-full bg-verde"
                  style={{
                    width: `${progressoNivel}%`,
                  }}
                />
              </View>

              <Text
                className="mt-1 text-right text-[10px] text-texto-ter"
                style={{
                  fontFamily: "Inter",
                }}
              >
                Faltam{" "}
                {(xpProximoNivel - xpTotal).toLocaleString("pt-BR")}
                {" XP para o próximo nível"}
              </Text>
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
                { scale: pressed ? 0.97 : 1 },
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
              {(Number(usuario.quizzes) || 0).toLocaleString("pt-BR")}
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
                { scale: pressed ? 0.97 : 1 },
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
              {xpTotal.toLocaleString("pt-BR")}
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
                { scale: pressed ? 0.97 : 1 },
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
              {(Number(usuario.sequenciaAtual) || 0).toLocaleString("pt-BR")}
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
                  transform: [
                    { scale: pressed ? 0.98 : 1 },
                  ],
                })}
              >
                {/* ÍCONE */}

                <View className="h-10 w-10 items-center justify-center rounded-md bg-cartao-borda">
                  <Icone
                    size={24}
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
                  <Text
                    className={`text-sm ${
                      conquista.desbloqueada
                        ? "text-texto"
                        : "text-texto-ter"
                    }`}
                    style={{
                      fontFamily: "Inter",
                    }}
                  >
                    {conquista.nome}
                  </Text>

                  <Text
                    className="text-[11px] text-texto-ter"
                    style={{
                      fontFamily: "Inter",
                    }}
                  >
                    {conquista.descricao}
                  </Text>

                  {/* PROGRESSO */}

                  <Text
                    className={`mt-1 text-[10px] ${
                      conquista.desbloqueada
                        ? "text-verde"
                        : "text-texto-ter"
                    }`}
                    style={{
                      fontFamily: "Inter",
                    }}
                  >
                    {conquista.progresso.toLocaleString("pt-BR")}
                    {" / "}
                    {conquista.requisito.toLocaleString("pt-BR")}
                  </Text>
                </View>

                {/* STATUS */}

                {conquista.desbloqueada && (
                  <View className="ml-2">
                    <CheckCircleIcon
                      size={21}
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
          <Text
            className="text-lg text-texto"
            style={{
              fontFamily: "Inter",
            }}
          >
            Configurações
          </Text>

          {/* EDITAR PERFIL */}

          <View className="mt-2 overflow-hidden rounded-lg border border-cartao-borda bg-cartao">
            <Pressable
              className="h-16 flex-row items-center px-3"
              onPress={() => navigation.navigate("EditarPerfil")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.7 : 1,
              })}
            >
              <PencilSimpleIcon
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
                Editar Perfil
              </Text>

              <CaretRightIcon
                size={19}
                color="#6F7B83"
              />
            </Pressable>
          </View>

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
                {usuario.timeFavorito || "Nenhum"}
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
                {usuario.notificacoes || "Desativadas"}
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
                {usuario.acessibilidade || "Ver mais"}
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
                {usuario.tema || "Escuro"}
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
                { scale: pressed ? 0.98 : 1 },
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
              size={48}
              color="#00C853"
              weight="fill"
            />

            <Text
              className="mt-3 text-center text-base text-texto"
              style={{
                fontFamily: "Inter",
              }}
            >
              Foto de perfil atualizada!
            </Text>

            <Pressable
              className="mt-5 w-full items-center rounded-xl bg-verde py-3"
              onPress={() => setModalSucessoVisivel(false)}
              style={({ pressed }) => ({
                opacity: pressed ? 0.7 : 1,
              })}
            >
              <Text
                className="text-sm font-bold text-white"
                style={{
                  fontFamily: "Inter",
                }}
              >
                Continuar
              </Text>
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