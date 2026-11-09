import { useState, useEffect } from "react";

import {
  Alert,
  Linking,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  Image,
} from "react-native";

import {
  ArrowLeftIcon,
  CaretRightIcon,
  MagnifyingGlassIcon,
} from "phosphor-react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import { BottomNav } from "../components/bottomNav";

import { obterNoticias } from "../services/authService";

export function Noticias() {
  const navigation = useNavigation();

  // =========================================================
  // ESTADOS DA TELA
  // =========================================================

  const [categoriaAtiva, setCategoriaAtiva] = useState("Todas");
  const [busca, setBusca] = useState("");
  const [noticias, setNoticias] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [timeFavorito, setTimeFavorito] = useState(null);
  const [atualizacao, setAtualizacao] = useState(0);

  useEffect(() => {
    async function carregarNoticias() {
      try {
        setCarregando(true);
        setErro(null);

        const categoria = categoriaAtiva
          .toLowerCase()
          .replaceAll(" ", " ");

        const resultado = await obterNoticias(categoria);

        setNoticias(resultado.noticias || []);
        setTimeFavorito(resultado.time || null);
      } catch (error) {
        console.error("Erro ao carregar notícias:", error);
        setErro(error.message);
        setNoticias([]);
      } finally {
        setCarregando(false);
      }
    }

    carregarNoticias();
  }, [categoriaAtiva, atualizacao]);

  // =========================================================
  // CATEGORIAS
  // =========================================================

  const categorias = [
    "Todas",
    "Seu Time",
    "Mercado da Bola",
    "Jogos",
  ];

  // =========================================================
  // FILTRO E PESQUISA
  // =========================================================

  const noticiasFiltradas = noticias.filter((noticia) => {
    const termo = busca.trim().toLowerCase();

    const titulo = (noticia.titulo || "").toLowerCase();
    const fonte = (noticia.fonte || "").toLowerCase();
    const descricao = (noticia.descricao || "").toLowerCase();

    const correspondeBusca =
      titulo.includes(termo) ||
      fonte.includes(termo) ||
      descricao.includes(termo);

    return correspondeBusca;
  });

  function formatarTempo(data) {
    if (!data) return "";

    const publicada = new Date(data);
    const agora = new Date();

    const diferenca = Math.floor(
      (agora - publicada) / 1000
    );

    if (diferenca < 60) return "Agora há pouco";

    const minutos = Math.floor(diferenca / 60);
    if (minutos < 60) return `Há ${minutos} min`;

    const horas = Math.floor(minutos / 60);
    if (horas < 24) return `Há ${horas}h`;

    const dias = Math.floor(horas / 24);
    if (dias < 7) return `Há ${dias} dias`;

    return publicada.toLocaleDateString("pt-BR");
  }

  function obterCategoriaExibicao() {
    const categoriasExibicao = {
      todas: "Futebol",
      "seu time": timeFavorito || "Seu Time",
      "mercado da bola": "Mercado da Bola",
      jogos: "Jogos",
    };

    return categoriasExibicao[categoriaAtiva.toLowerCase()] || "Futebol";
  }

  // =========================================================
  // ABRIR NOTÍCIA NO NAVEGADOR
  // =========================================================

  async function abrirNoticia(noticia) {
    if (!noticia?.url) {
      Alert.alert(
        "Link indisponível",
        "Não foi possível encontrar o endereço original desta notícia."
      );
      return;
    }

    try {
      const podeAbrir = await Linking.canOpenURL(noticia.url);

      if (!podeAbrir) {
        throw new Error("URL não suportada.")
      }

      await Linking.openURL(noticia.url);
    } catch (error) {
      console.error("Erro ao abrir notícia:", error);

      Alert.alert(
        "Não foi possível abrir",
        "Tente acessar esta notícia novamente mais tarde."
      );
    }
  }

  // =========================================================
  // ESTILOS DAS CATEGORIAS
  // =========================================================

  function selecionarCategoria(categoria) {
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

          {carregando ? (
            <View className="rounded-xl border border-cartao-borda bg-cartao p-5">
              <Text
                className="text-sm text-texto-sec"
                style={{ fontFamily: "Inter" }}
              >
                Carregando notícias...  
              </Text>
            </View>
          ) : erro ? (
            <View className="rounded-xl border border-cartao-borda bg-cartao p-5">
              <Text
                className="text-sm text-texto-sec"
                style={{ fontFamily: "Inter" }}
              >
                Não foi possível carregar as notícias.
              </Text>

              <Pressable
                className="mt-3 self-start rounded-lg bg-verde px-4 py-2"
                onPress={() => setCategoriaAtiva((atual) => atual)}
              >
                <Text className="text-sm font-bold text-texto">
                  Tentar novamente
                </Text>
              </Pressable>
            </View>
          ) : null}

          {carregando && (
            <View className="rounded-xl border border-cartao-borda bg-cartao p-5">
              <Text
                className="text-sm text-texto-sec"
                style={{ fontFamily: "Inter" }}
              >
                Carregando notícias
              </Text>
            </View>
          )}

          {erro && !carregando && (
            <View className="rounded-xl border border-cartao-borda bg-cartao p-5">
              <Text
                className="text-sm text-texto-sec"
                style={{ fontFamily: "Inter" }}
              >
                Não foi possível carregar as notícias.
              </Text>

              <Pressable
                className="mt-3 self-start rounded-lg bg-verde px-4 py-2"
                onPress={() => setAtualizacao((valor) => valor + 1)}
              >
                <Text className="text-sm font-bold text-texto">
                  Tentar novamente
                </Text>
              </Pressable>
            </View>
          )}

          {!carregando && !erro && noticiaDestaque ? (
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

              {noticiaDestaque.imagem ? (
                <Image
                  source={{ uri: noticiaDestaque.imagem }}
                  className="h-[180px] w-full"
                  resizeMode="cover"
                />
              ) : (
                <View className="h-[180px] w-full bg-cartao-borda items-center justify-center">
                  <Text
                    className="text-xs text-texto-ter"
                    style={{ fontFamily: "Inter" }}
                  >
                    Imagem indisponível
                  </Text>
                </View>
              )}

              <View className="p-4">
                <Text
                  className="mb-2 text-xs font-bold text-verde"
                  style={{ fontFamily: "Inter" }}
                >
                  {obterCategoriaExibicao()}
                </Text>

                <Text
                  numberOfLines={3}
                  className="text-lg font-bold text-texto"
                  style={{ fontFamily: "Inter" }}
                >
                  {noticiaDestaque.titulo}
                </Text>

                <View className="mt-3 flex-row items-center">

                  {noticiaDestaque.url && (
                    <Image
                      source={{
                        uri: `https://www.google.com/s2/favicons?domain_url=${encodeURIComponent(noticiaDestaque.url)}&sz=64`,
                      }}
                      className="h-5 w-5 rounded-full"
                      resizeMode="contain"
                    />
                  )}

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
                    {formatarTempo(noticiaDestaque.publicado_em)}
                  </Text>
                </View>
              </View>
            </Pressable>
          ) : !carregando && !erro ? (
            <View className="rounded-xl border border-cartao-borda bg-cartao p-5">
              <Text
                className="text-sm text-texto-sec"
                style={{ fontFamily: "Inter" }}
              >
                Nenhuma notícia encontrada com esses filtros.
              </Text>
            </View>
          ) : null}
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
            ultimasNoticias.map((noticia, index) => (
              <Pressable
                key={`${noticia.url || noticia.titulo}-${index}`}
                className="mb-4 flex-row overflow-hidden rounded-[10px] bg-cartao"
                onPress={() => abrirNoticia(noticia)}
                accessibilityRole="button"
                accessibilityLabel={`Abrir notícia: ${noticia.titulo}`}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.85 : 1,
                  transform: [{ scale: pressed ? 0.98 : 1 }],
                })}
              >

                {noticia.imagem ? (
                  <Image
                    source={{ uri: noticia.imagem }}
                    className="h-[105px] w-[115px]"
                    resizeMode="cover"
                  />
                ) : (
                  <View className="h-[105px] w-[115px] items-center justify-center bg-cartao-borda">
                    <Text
                      className="text-[10px] text-texto-ter"
                      style={{ fontFamily: "Inter" }}
                    >
                      Imagem indisponível
                    </Text>
                  </View>
                )}

                <View className="flex-1 p-3 pr-7">
                  <Text
                    className="mb-1 text-xs font-bold text-verde"
                    style={{ fontFamily: "Inter" }}
                  >
                    {obterCategoriaExibicao()}
                  </Text>

                  <Text
                    numberOfLines={3}
                    className="text-sm font-medium text-texto"
                    style={{ fontFamily: "Inter" }}
                  >
                    {noticia.titulo}
                  </Text>

                  <View className="mt-2 flex-row items-center">

                    {noticia.url && (
                      <Image
                        source={{
                          uri: `https://www.google.com/s2/favicons?domain_url=${encodeURIComponent(noticia.url)}&sz=64`
                        }}
                        className="h-[14px] w-[14px] rounded-full"
                        resizeMode="contain"
                      />
                    )}

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
                      {formatarTempo(noticia.publicado_em)}
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
        onPress={() => { navigation.navigate("Chatbot")}}
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