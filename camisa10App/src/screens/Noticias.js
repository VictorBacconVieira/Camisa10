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
import { Texto } from "../components/texto";

import { useAccessibility } from "../context/AccessibilityContext";

import { obterNoticias } from "../services/authService";

export function Noticias() {
  const navigation = useNavigation();

  const { fontScale, configuracoes } = useAccessibility();

  const escalaIcone =
    configuracoes.tamanhoTexto === "grande"
      ? 1.15
      : configuracoes.tamanhoTexto === "muitoGrande"
        ? 1.3
        : 1;

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
        throw new Error("URL não suportada.");
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

        <View className="min-h-[62px] flex-row items-center px-4 py-2">
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
            Notícias
          </Texto>
        </View>

        {/* ================================================= */}
        {/* PESQUISA */}
        {/* ================================================= */}

        <View className="px-4">
          <View
            className="min-h-[48px] flex-row items-center rounded-xl border border-cartao-borda bg-cartao px-4 py-2"
          >
            <MagnifyingGlassIcon
              size={21 * escalaIcone}
              color="#A8B2B9"
              weight="regular"
            />

            <TextInput
              value={busca}
              onChangeText={setBusca}
              placeholder="Buscar notícias"
              placeholderTextColor="#6F7B83"
              className="ml-3 flex-1 text-texto"
              style={{
                fontFamily: configuracoes.textoNegrito
                  ? "AnuphanBold"
                  : "Inter",
                fontSize: 14 * fontScale,
                lineHeight: Math.ceil(18 * fontScale),
                paddingVertical: 4,
              }}
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
                <Texto
                  tamanho={14}
                  className={`${
                    ativa ? "font-bold text-texto" : "text-texto"
                  }`}
                >
                  {categoria}
                </Texto>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* ================================================= */}
        {/* DESTAQUE */}
        {/* ================================================= */}

        <View className="mt-6 px-4">
          <Texto
            tamanho={20}
            className="mb-3 text-texto"
          >
            Destaque
          </Texto>

          {carregando ? (
            <View className="rounded-xl border border-cartao-borda bg-cartao p-5">
              <Texto
                tamanho={14}
                className="text-texto-sec"
              >
                Carregando notícias...
              </Texto>
            </View>
          ) : erro ? (
            <View className="rounded-xl border border-cartao-borda bg-cartao p-5">
              <Texto
                tamanho={14}
                className="text-texto-sec"
              >
                Não foi possível carregar as notícias.
              </Texto>

              <Pressable
                className="mt-3 self-start rounded-lg bg-verde px-4 py-2"
                onPress={() => setCategoriaAtiva((atual) => atual)}
              >
                <Texto
                  tamanho={14}
                  className="font-bold text-texto"
                >
                  Tentar novamente
                </Texto>
              </Pressable>
            </View>
          ) : null}

          {carregando && (
            <View className="rounded-xl border border-cartao-borda bg-cartao p-5">
              <Texto
                tamanho={14}
                className="text-texto-sec"
              >
                Carregando notícias
              </Texto>
            </View>
          )}

          {erro && !carregando && (
            <View className="rounded-xl border border-cartao-borda bg-cartao p-5">
              <Texto
                tamanho={14}
                className="text-texto-sec"
              >
                Não foi possível carregar as notícias.
              </Texto>

              <Pressable
                className="mt-3 self-start rounded-lg bg-verde px-4 py-2"
                onPress={() => setAtualizacao((valor) => valor + 1)}
              >
                <Texto
                  tamanho={14}
                  className="font-bold text-texto"
                >
                  Tentar novamente
                </Texto>
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
                <View className="h-[180px] w-full bg-cartao-borda items-center justify-center px-3">
                  <Texto
                    tamanho={12}
                    className="text-texto-ter text-center"
                  >
                    Imagem indisponível
                  </Texto>
                </View>
              )}

              <View className="p-4">
                <Texto
                  tamanho={12}
                  className="mb-2 font-bold text-verde"
                >
                  {obterCategoriaExibicao()}
                </Texto>

                <Texto
                  tamanho={18}
                  className="font-bold text-texto"
                  style={{ flexShrink: 1 }}
                >
                  {noticiaDestaque.titulo}
                </Texto>

                <View className="mt-3 flex-row items-center flex-wrap">
                  {noticiaDestaque.url && (
                    <Image
                      source={{
                        uri: `https://www.google.com/s2/favicons?domain_url=${encodeURIComponent(noticiaDestaque.url)}&sz=64`,
                      }}
                      className="h-5 w-5 rounded-full"
                      resizeMode="contain"
                    />
                  )}

                  <Texto
                    tamanho={12}
                    className="ml-2 text-texto-sec"
                  >
                    {noticiaDestaque.fonte}
                  </Texto>

                  <Texto
                    tamanho={12}
                    className="mx-2 text-texto-ter"
                  >
                    •
                  </Texto>

                  <Texto
                    tamanho={12}
                    className="text-texto-sec"
                  >
                    {formatarTempo(noticiaDestaque.publicado_em)}
                  </Texto>
                </View>
              </View>
            </Pressable>
          ) : !carregando && !erro ? (
            <View className="rounded-xl border border-cartao-borda bg-cartao p-5">
              <Texto
                tamanho={14}
                className="text-texto-sec"
              >
                Nenhuma notícia encontrada com esses filtros.
              </Texto>
            </View>
          ) : null}
        </View>

        {/* ================================================= */}
        {/* ÚLTIMAS NOTÍCIAS */}
        {/* ================================================= */}

        <View className="mt-7 px-4">
          <View className="mb-3 flex-row items-center justify-between">
            <Texto
              tamanho={20}
              className="text-texto"
            >
              Últimas notícias
            </Texto>
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
                  <View className="h-[105px] w-[115px] items-center justify-center bg-cartao-borda px-1">
                    <Texto
                      tamanho={10}
                      className="text-texto-ter text-center"
                    >
                      Imagem indisponível
                    </Texto>
                  </View>
                )}

                <View className="flex-1 p-3 pr-7">
                  <Texto
                    tamanho={12}
                    className="mb-1 font-bold text-verde"
                  >
                    {obterCategoriaExibicao()}
                  </Texto>

                  <Texto
                    tamanho={14}
                    className="font-medium text-texto"
                    style={{ flexShrink: 1 }}
                  >
                    {noticia.titulo}
                  </Texto>

                  <View className="mt-2 flex-row items-center flex-wrap">
                    {noticia.url && (
                      <Image
                        source={{
                          uri: `https://www.google.com/s2/favicons?domain_url=${encodeURIComponent(noticia.url)}&sz=64`,
                        }}
                        className="h-[14px] w-[14px] rounded-full"
                        resizeMode="contain"
                      />
                    )}

                    <Texto
                      tamanho={10}
                      className="ml-1 text-texto-sec"
                      style={{ flexShrink: 1 }}
                    >
                      {noticia.fonte}
                    </Texto>

                    <Texto
                      tamanho={10}
                      className="mx-1 text-texto-ter"
                    >
                      •
                    </Texto>

                    <Texto
                      tamanho={10}
                      className="text-texto-sec"
                    >
                      {formatarTempo(noticia.publicado_em)}
                    </Texto>
                  </View>
                </View>

                <View className="absolute bottom-3 right-3">
                  <CaretRightIcon
                    size={18 * escalaIcone}
                    color="#A8B2B9"
                    weight="bold"
                  />
                </View>
              </Pressable>
            ))
          ) : noticiaDestaque ? (
            <Texto
              tamanho={14}
              className="mb-4 text-texto-ter"
            >
              Não há outras notícias nesta seleção.
            </Texto>
          ) : null}
        </View>
      </ScrollView>

      {/* ===================================================== */}
      {/* BOTÃO FLUTUANTE DE IA */}
      {/* ===================================================== */}

      <Pressable
        className="absolute bottom-[105px] right-5 h-[60px] w-[60px] items-center justify-center rounded-full bg-verde"
        onPress={() => navigation.navigate("Chatbot")}
        accessibilityRole="button"
        accessibilityLabel="Abrir assistente de IA"
        style={({ pressed }) => ({
          opacity: pressed ? 0.75 : 1,
          transform: [{ scale: pressed ? 0.9 : 1 }],
        })}
      >
        <Texto
          tamanho={24}
          className="font-bold text-texto"
        >
          AI
        </Texto>
      </Pressable>

      {/* ===================================================== */}
      {/* BARRA DE NAVEGAÇÃO */}
      {/* ===================================================== */}

      <BottomNav />
    </SafeAreaView>
  );
}