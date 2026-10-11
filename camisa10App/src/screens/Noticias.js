import { useState } from "react";

import {
  Alert,
  Linking,
  Pressable,
  ScrollView,
  Text,
  TextInput,
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
  // ESTADOS DA TELA
  // =========================================================

  const [categoriaAtiva, setCategoriaAtiva] = useState("Todas");
  const [busca, setBusca] = useState("");

  // FUTURO BACKEND / API:
  // Substituir esta lista pelas notícias recebidas do backend.
  //
  // Estrutura esperada:
  // id, titulo, imagem, fonte, tempo, categoria, url,
  // timesRelacionados.
  //
  // Os campos imagem e url poderão vir diretamente da API.

  const noticias = [
    {
      id: 1,
      titulo:
        'Neymar manda recado para Thiago Mendes após ser ignorado: "Soberba"',
      tempo: "2h atrás",
      fonte: "Jogada10",
      categoria: "Futebol",

      // Cadastre aqui o endereço EXATO da matéria.
      // null significa que o link ainda precisa ser cadastrado.
      url: null,

      imagem: null,

      // FUTURA API: preencher com os times relacionados.
      timesRelacionados: ["Santos"],
    },
    {
      id: 2,
      titulo:
        "Mercado da bola movimenta os grandes clubes brasileiros nesta semana",
      tempo: "4h atrás",
      fonte: "Camisa10",
      categoria: "Mercado da Bola",
      url: "https://ge.globo.com/pr/especial-publicitario/aurora/dicas-de-churrasco/noticia/2026/04/22/churras-do-ge-ex-jogador-do-santos-diz-que-neymar-e-imprescindivel-para-a-selecao-brasileira.ghtml",
      imagem: null,
      timesRelacionados: [],
    },
    {
      id: 3,
      titulo:
        "Confira os principais jogos que acontecem nesta rodada",
      tempo: "6h atrás",
      fonte: "Camisa10",
      categoria: "Jogos",
      url: null,
      imagem: null,
      timesRelacionados: [],
    },
    {
      id: 4,
      titulo:
        "Craques brasileiros são destaque antes da próxima rodada",
      tempo: "8h atrás",
      fonte: "Jogada10",
      categoria: "Futebol",
      url: null,
      imagem: null,
      timesRelacionados: ["Santos"],
    },
  ];

  // =========================================================
  // CATEGORIAS
  // =========================================================

  const categorias = [
    "Todas",
    "Seu Time",
    "Mercado da Bola",
    "Jogos",
  ];

  // FUTURO BACKEND:
  // Receber o time favorito do perfil do usuário.
  // Enquanto isso, altere para "Santos" para testar o filtro.
  const timeFavorito = null;

  // =========================================================
  // FILTRO E PESQUISA
  // =========================================================

  const noticiasFiltradas = noticias.filter((noticia) => {
    const termo = busca.trim().toLowerCase();

    const correspondeBusca =
      noticia.titulo.toLowerCase().includes(termo) ||
      noticia.fonte.toLowerCase().includes(termo) ||
      noticia.categoria.toLowerCase().includes(termo);

    let correspondeCategoria = true;

    if (categoriaAtiva === "Mercado da Bola") {
      correspondeCategoria =
        noticia.categoria === "Mercado da Bola";
    } else if (categoriaAtiva === "Jogos") {
      correspondeCategoria = noticia.categoria === "Jogos";
    } else if (categoriaAtiva === "Seu Time") {
      correspondeCategoria =
        timeFavorito !== null &&
        noticia.timesRelacionados?.includes(timeFavorito);
    }

    return correspondeBusca && correspondeCategoria;
  });

  // =========================================================
  // ABRIR NOTÍCIA NO NAVEGADOR
  // =========================================================

  async function abrirNoticia(noticia) {
    if (!noticia?.url) {
      Alert.alert(
        "Link não cadastrado",
        "Esta notícia ainda não possui uma URL. Cadastre o endereço da matéria na lista de notícias."
      );
      return;
    }

    try {
      await Linking.openURL(noticia.url);
    } catch (error) {
      Alert.alert(
        "Não foi possível abrir",
        "Verifique o endereço cadastrado e tente novamente."
      );
    }
  }

  // =========================================================
  // ESTILOS DAS CATEGORIAS
  // =========================================================

  function selecionarCategoria(categoria) {
    // Mantém o comportamento original do botão Jogos.
    if (categoria === "Jogos") {
      navigation.navigate("Jogos");
      return;
    }

    setCategoriaAtiva(categoria);
  }

  // O destaque é o primeiro resultado filtrado.
  const noticiaDestaque = noticiasFiltradas[0];

  // As demais notícias não repetem o destaque.
  const ultimasNoticias = noticiasFiltradas.slice(1);

  return (
    <SafeAreaView
      className="flex-1 bg-fundo"
      edges={["top", "bottom"]}
    >
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 110 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* ================================================= */}
        {/* CABEÇALHO */}
        {/* ================================================= */}

        <View className="h-[62px] flex-row items-center px-4">
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
            Notícias
          </Text>
        </View>

        {/* ================================================= */}
        {/* PESQUISA */}
        {/* ================================================= */}

        <View className="px-4">
          <View className="h-12 flex-row items-center rounded-xl border border-cartao-borda bg-cartao px-4">
            <MagnifyingGlassIcon
              size={21}
              color="#A8B2B9"
              weight="regular"
            />

            <TextInput
              value={busca}
              onChangeText={setBusca}
              placeholder="Buscar notícias"
              placeholderTextColor="#6F7B83"
              className="ml-3 flex-1 text-sm text-texto"
              style={{ fontFamily: "Inter" }}
              returnKeyType="search"
              accessibilityLabel="Buscar notícias"
            />
          </View>
        </View>

        {/* ================================================= */}
        {/* CATEGORIAS */}
        {/* ================================================= */}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-5"
          contentContainerStyle={{ paddingHorizontal: 16 }}
        >
          {categorias.map((categoria) => {
            const ativa = categoriaAtiva === categoria;

            return (
              <Pressable
                key={categoria}
                className={`mr-2 rounded-full px-5 py-2.5 ${
                  ativa
                    ? "bg-verde"
                    : "border border-cartao-borda bg-cartao"
                }`}
                onPress={() => selecionarCategoria(categoria)}
                accessibilityRole="button"
                accessibilityState={{ selected: ativa }}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.7 : 1,
                  transform: [{ scale: pressed ? 0.95 : 1 }],
                })}
              >
                <Text
                  className={`text-sm ${
                    ativa ? "font-bold text-texto" : "text-texto"
                  }`}
                  style={{ fontFamily: "Inter" }}
                >
                  {categoria}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* ================================================= */}
        {/* DESTAQUE */}
        {/* ================================================= */}

        <View className="mt-6 px-4">
          <Text
            className="mb-3 text-xl text-texto"
            style={{ fontFamily: "Anuphan" }}
          >
            Destaque
          </Text>

          {noticiaDestaque ? (
            <Pressable
              className="overflow-hidden rounded-[12px] bg-cartao"
              onPress={() => abrirNoticia(noticiaDestaque)}
              accessibilityRole="button"
              accessibilityLabel={`Abrir notícia: ${noticiaDestaque.titulo}`}
              style={({ pressed }) => ({
                opacity: pressed ? 0.85 : 1,
                transform: [{ scale: pressed ? 0.98 : 1 }],
              })}
            >
              {/* FUTURA API:
                  Exibir noticiaDestaque.imagem aqui.
                  O bloco cinza é um placeholder visual. */}

              <View className="h-[180px] w-full bg-cartao-borda items-center justify-center">
                <Text
                  className="text-xs text-texto-ter"
                  style={{ fontFamily: "Inter" }}
                >
                  Imagem da notícia
                </Text>
              </View>

              <View className="p-4">
                <Text
                  className="mb-2 text-xs font-bold text-verde"
                  style={{ fontFamily: "Inter" }}
                >
                  {noticiaDestaque.categoria}
                </Text>

                <Text
                  numberOfLines={3}
                  className="text-lg font-bold text-texto"
                  style={{ fontFamily: "Inter" }}
                >
                  {noticiaDestaque.titulo}
                </Text>

                <View className="mt-3 flex-row items-center">
                  {/* FUTURA API: logo da fonte */}

                  <View className="h-5 w-5 rounded-full bg-white" />

                  <Text
                    className="ml-2 text-xs text-texto-sec"
                    style={{ fontFamily: "Inter" }}
                  >
                    {noticiaDestaque.fonte}
                  </Text>

                  <Text className="mx-2 text-xs text-texto-ter">
                    •
                  </Text>

                  <Text
                    className="text-xs text-texto-sec"
                    style={{ fontFamily: "Inter" }}
                  >
                    {noticiaDestaque.tempo}
                  </Text>
                </View>
              </View>
            </Pressable>
          ) : (
            <View className="rounded-xl border border-cartao-borda bg-cartao p-5">
              <Text
                className="text-sm text-texto-sec"
                style={{ fontFamily: "Inter" }}
              >
                Nenhuma notícia encontrada com esses filtros.
              </Text>
            </View>
          )}
        </View>

        {/* ================================================= */}
        {/* ÚLTIMAS NOTÍCIAS */}
        {/* ================================================= */}

        <View className="mt-7 px-4">
          <View className="mb-3 flex-row items-center justify-between">
            <Text
              className="text-xl text-texto"
              style={{ fontFamily: "Anuphan" }}
            >
              Últimas notícias
            </Text>
          </View>

          {ultimasNoticias.length > 0 ? (
            ultimasNoticias.map((noticia) => (
              <Pressable
                key={noticia.id}
                className="mb-4 flex-row overflow-hidden rounded-[10px] bg-cartao"
                onPress={() => abrirNoticia(noticia)}
                accessibilityRole="button"
                accessibilityLabel={`Abrir notícia: ${noticia.titulo}`}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.85 : 1,
                  transform: [{ scale: pressed ? 0.98 : 1 }],
                })}
              >
                {/* FUTURA API:
                    Substituir o placeholder por noticia.imagem. */}

                <View className="h-[105px] w-[115px] items-center justify-center bg-cartao-borda">
                  <Text
                    className="text-[10px] text-texto-ter"
                    style={{ fontFamily: "Inter" }}
                  >
                    Imagem
                  </Text>
                </View>

                <View className="flex-1 p-3 pr-7">
                  <Text
                    className="mb-1 text-xs font-bold text-verde"
                    style={{ fontFamily: "Inter" }}
                  >
                    {noticia.categoria}
                  </Text>

                  <Text
                    numberOfLines={3}
                    className="text-sm font-medium text-texto"
                    style={{ fontFamily: "Inter" }}
                  >
                    {noticia.titulo}
                  </Text>

                  <View className="mt-2 flex-row items-center">
                    {/* FUTURA API: logo da fonte */}

                    <View className="h-[14px] w-[14px] rounded-full bg-white" />

                    <Text
                      numberOfLines={1}
                      className="ml-1 text-[10px] text-texto-sec"
                      style={{ fontFamily: "Inter" }}
                    >
                      {noticia.fonte}
                    </Text>

                    <Text className="mx-1 text-[10px] text-texto-ter">
                      •
                    </Text>

                    <Text
                      className="text-[10px] text-texto-sec"
                      style={{ fontFamily: "Inter" }}
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
            ))
          ) : noticiaDestaque ? (
            <Text
              className="mb-4 text-sm text-texto-ter"
              style={{ fontFamily: "Inter" }}
            >
              Não há outras notícias nesta seleção.
            </Text>
          ) : null}
        </View>
      </ScrollView>

      {/* ===================================================== */}
      {/* BOTÃO FLUTUANTE DE IA */}
      {/* ===================================================== */}

      <Pressable
        className="absolute bottom-[105px] right-5 h-[60px] w-[60px] items-center justify-center rounded-full bg-verde"
        onPress={() => {
          // FUTURO BACKEND / IA:
          // Abrir o assistente de IA do Camisa10.
        }}
        accessibilityRole="button"
        accessibilityLabel="Abrir assistente de IA"
        style={({ pressed }) => ({
          opacity: pressed ? 0.75 : 1,
          transform: [{ scale: pressed ? 0.9 : 1 }],
        })}
      >
        <Text
          className="text-2xl font-bold text-texto"
          style={{ fontFamily: "Inter" }}
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