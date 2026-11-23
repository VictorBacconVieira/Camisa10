import {
  Pressable,
  ScrollView,
  View,
  Text,
  Image,
  Linking,
  Modal,
  Switch,
} from "react-native";

import { Texto } from "../components/texto";

import { useEffect, useState } from "react";

import {
  PersonArmsSpreadIcon,
  CaretRightIcon,
  QuestionIcon,
} from "phosphor-react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";

import { BottomNav } from "../components/bottomNav";

import { obterPlacarPersonalizado, obterNoticias } from "../services/authService";
import { useTheme } from "../context/ThemeContext";
import { useAccessibility } from "../context/AccessibilityContext";

export function Home() {
  const navigation = useNavigation();
  const {cores, altoContraste, alternarAltoContraste,} = useTheme();

  const [placar, setPlacar] = useState(null);
  const [carregandoPlacar, setCarregandoPlacar] = useState(true);
  const [erroPlacar, setErroPlacar] = useState(null);

  const [noticias, setNoticias] = useState([]);
  const [carregandoNoticias, setCarregandoNoticias] = useState(true);
  const [erroNoticias, setErroNoticias] = useState(null)

  const {configuracoes, alterarTamanhoTexto, alternarAcessibilidade, fontScale} = useAccessibility();
  const [modalAcessibilidade, setModalAcessibilidade] = useState(false);
  const escalaEscudo = configuracoes.tamanhoTexto === "grande" ? 1.15 : configuracoes.tamanhoTexto === "muitoGrande" ? 1.3 : 1;

  useEffect(() => {
    async function carregarPlacar() {
      try {
        setCarregandoPlacar(true);
        setErroPlacar(null);

        const resultado = await obterPlacarPersonalizado();

        setPlacar(resultado);
      } catch (error) {
        console.log("Erro ao carregar placar:", error.message);
        setErroPlacar(error.message);
      } finally {
        setCarregandoPlacar(false);
      }
    }
    carregarPlacar();
  }, []);

  useEffect(() => {
    async function carregarNoticias() {
      try {
        setCarregandoNoticias(true);
        setErroNoticias(null);

        const resultado = await obterNoticias("todas");

        setNoticias(resultado.noticias || []);
      } catch (error) {
        console.error("Erro ao carregar notícias da Home:", error);
        setErroNoticias(error.message);
        setNoticias([]);
      } finally {
        setCarregandoNoticias(false);
      }
    }

    carregarNoticias();
  }, []);

  const timeFavorito = placar?.time ?? null;

  const jogoDestaque = placar?.jogo?.jogo ?? null;

  const tipoJogo = placar?.jogo?.tipo ?? null;

  const ehResultado = tipoJogo === "resultado";

  const dataFormatada = jogoDestaque?.data
    ? new Date(jogoDestaque.data).toLocaleDateString("pt-BR", {
      weekday: "short",
      day: "2-digit",
      month: "2-digit",
      timeZone: "America/Sao_Paulo",
    })
    : null;

  const horarioFormatado = jogoDestaque?.data
    ? new Date(jogoDestaque.data).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "America/Sao_Paulo",
    })
    : null;

  function formatarTempo(data) {
    if (!data) return "";

    const agora = new Date();
    const publicacao = new Date(data);
    const diferenca = Math.floor((agora - publicacao) / 60000);

    if (diferenca < 1) return "Agora";
    if (diferenca < 60) return `Há ${diferenca} min`;

    const horas = Math.floor(diferenca / 60);

    if (horas < 24) return `Há ${horas}h`;

    const dias = Math.floor(horas / 24);
    return `Há ${dias} dia${dias > 1 ? "s" : ""}`;
  }

  async function abrirNoticia(noticia) {
    if (!noticia?.url) return;

    try {
      await Linking.openURL(noticia.url);
    } catch (error) {
      console.error("Erro ao abrir notícia:", error)
    }
  }

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

        <View className="h-[62px] flex-row items-center justify-center px-4">

          {/* LOGO / NOME CENTRALIZADO */}

          <Text
            className="text-[40px] text-texto"
            style={{
              fontFamily: "Anuphan",
            }}
          >
            Camisa
            <Text className="text-[#39FF14]">10</Text>
          </Text>

          {/* AÇÕES À DIREITA */}

          <View
            className="absolute right-4 flex-row items-center"
          >

            {/* NOTIFICAÇÕES */}

            <Pressable
              className="h-10 w-10 items-center justify-center"
              onPress={() => setModalAcessibilidade(true)}
              style={({ pressed }) => ({
                opacity: pressed ? 0.6 : 1,
                transform: [
                  {
                    scale: pressed ? 0.9 : 1,
                  },
                ],
              })}
            >
              <PersonArmsSpreadIcon
                size={35}
                color={cores.icon}
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

            <Texto
              tamanho={20}
              className="text-texto text-xl"
            >
              Central de jogos
            </Texto>

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
              <Texto tamanho={15} className="text-texto-sec">
                Ver todos
              </Texto>

              <CaretRightIcon
                size={19}
                color="#A8B2B9"
                weight="regular"
              />
            </Pressable>

          </View>

          {/* CARD DO JOGO */}

          {carregandoPlacar ? (
            <View className="mx-3 rounded-[10px] bg-cartao px-3 py-8 items-center">
              <Texto tamanho={14} className="text-texto-sec">
                Carregando informações do seu time...
              </Texto>
            </View>

          ) : erroPlacar ? (
            <View className="mx-3 rounded-[10px] bg-cartao px-5 py-8 items-center">
              <Texto tamanho={16} className="text-texto text-center">
                Não foi possível carregar as informações do seu time.
              </Texto>

              <Texto tamanho={14} className="mt-2 text-texto-sec text-center">
                Verifique sua conexão e tente novamente mais tarde.
              </Texto>
            </View>
          ) : !timeFavorito ? (
            <View className="mx-3 rounded-[10px] bg-cartao px-5 py-8 items-center">
              <Texto tamanho={16} className="text-texto text-center">
                Você ainda não escolheu seu time do coração.
              </Texto>

              <Texto tamanho={14} className="mt-2 text-texto-sec text-center">
                Acesse seu perfil e escolha um time para acompanhar os jogos!
              </Texto>
            </View>
          ) : !jogoDestaque ? (
            <View className="mx-3 rounded-[10px] bg-cartao px-5 py-8 items-center">
              <Texto tamanho={16} className="text-texto text-center">
                Nenhuma partida disponível no momento
              </Texto>

              <Texto tamanho={14} className="mt-2 text-texto-sec text-center">
                Estamos buscando os próximos jogos do seu time. Volte mais tarde!
              </Texto>
            </View>
          ) : (

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

                {jogoDestaque?.logo_competicao ? (
                  <Image
                    source={{ uri: jogoDestaque.logo_competicao }}
                    style={{ width: 30 * escalaEscudo, height: 30 * escalaEscudo,}}
                    resizeMode="contain"/>
                ) : (
                  <View
                    style={{ width: 30 * escalaEscudo, height: 30 * escalaEscudo, borderRadius: 6,}}
                    className="bg-white"/>
                )}

                <Texto tamanho={14} className="ml-2 text-texto">
                  {jogoDestaque?.competicao || "Partida em destaque"}
                </Texto>

              </View>

              {/* TIMES */}

              <View className="mt-8">

                {/* ESCUDOS E PLACAR */}

                <View className="flex-row items-center">

                  <View className="flex-1 items-center justify-center">
                    {jogoDestaque?.escudo_mandante ? (
                            <Image
                              source={{ uri: jogoDestaque.escudo_mandante }}
                              style={{width: 80 * escalaEscudo, height: 80 * escalaEscudo,}}
                              resizeMode="contain"
                            />
                    ) : (
                      <View className="h-20 w-20 rounded-full bg-white" />
                    )}
                  </View>

                  <View className="flex-1 items-center justify-center">
                    <Texto tamanho={48} className="text-texto">
                      {ehResultado &&
                        jogoDestaque?.gols_mandante !== null &&
                        jogoDestaque?.gols_visitante !== null
                        ? `${jogoDestaque.gols_mandante} - ${jogoDestaque.gols_visitante}`
                        : "x"}
                    </Texto>
                  </View>

                  <View className="flex-1 items-center justify-center">
                    {jogoDestaque?.escudo_visitante ? (
                      <Image
                        source={{ uri: jogoDestaque.escudo_visitante }}
                        style={{width: 80 * escalaEscudo, height: 80 * escalaEscudo,}}
                        resizeMode="contain"
                      />
                    ) : (
                      <View className="h-20 w-20 rounded-full bg-white" />
                    )}
                  </View>

                </View>

                {/* NOMES DOS CLUBES */}

                <View className="mt-2 flex-row">

                  {/* MANDANTE */}
                  <View className="flex-1 items-center">
                    <Texto tamanho={14} className="min-h-[40px] text-center text-texto">
                      {jogoDestaque?.mandante || "A definir"}
                    </Texto>
                  </View>

                  {/* ESPAÇO CENTRAL DO PLACAR */}
                  <View className="flex-1" />

                  {/* VISITANTE */}
                  <View className="flex-1 items-center">
                    <Texto tamanho={14} className="min-h-[40px] text-center text-texto">
                      {jogoDestaque?.visitante || "A definir"}
                    </Texto>
                  </View>

                </View>
                {/* DATA / HORÁRIO / ESTÁDIO */}

                <View className="mt-4 items-center">

                  <Texto tamanho={15} className="text-texto-sec text-center">
                    {dataFormatada || "Data a definir"} • {horarioFormatado || "--:--"}
                  </Texto>

                  <Texto tamanho={15} className="mt-1 text-texto-sec text-center">
                    {jogoDestaque?.estadio || "Estádio não informado"}
                  </Texto>

                  <Texto tamanho={12} className="mt-1 text-texto-sec">
                    {ehResultado ? "Último resultado" : "Próximo jogo"}
                  </Texto>

                </View>

              </View>

            </Pressable>
          )}
        </View>

        {/* ================================================= */}
        {/* ÚLTIMAS NOTÍCIAS */}
        {/* ================================================= */}

        <View className="mt-6">

          {/* TÍTULO */}

          <View className="mb-3 flex-row items-center justify-between px-5">

            <Texto
              tamanho={20}
              className="text-texto">
              Últimas Notícias
            </Texto>

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

              <Texto
                tamanho={15}
                className="text-texto-sec">
                Ver todas
              </Texto>

              <CaretRightIcon
                size={19}
                color="#A8B2B9"
                weight="regular"
              />

            </Pressable>

          </View>

          {/* NOTÍCIAS */}

          {carregandoNoticias ? (
            <View className="mx-3 mb-4 rounded-[10px] bg-cartao p-5">
              <Texto tamanho={14} className="text-texto-sec">
                Carregando notícias...
              </Texto>
            </View>
          ) : erroNoticias ? (
            <View className="mx-3 mb-4 rounded-[10px] bg-cartao p-5">
              <Texto tamanho={14} className="text-texto-sec">
                Não foi possível carregar as notícias.
              </Texto>
            </View>
          ) : noticias.length === 0 ? (
            <View className="mx-3 mb-4 rounded-[10px] bg-cartao p-5">
              <Texto tamanho={14} className="text-texto-sec">
                Nenhuma notícia encontrada no momento.
              </Texto>
            </View>
          ) : (
            noticias.slice(0, 2).map((noticia, index) => (
              <Pressable
                key={`${noticia.url || noticia.titulo}-${index}`}
                className="mx-3 mb-4 min-h-[89px] flex-row rounded-[10px] bg-cartao p-3"
                onPress={() => abrirNoticia(noticia)}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.85 : 1,
                  transform: [{ scale: pressed ? 0.98 : 1 }],
                })}
              >
                {/* IMAGEM DA NOTÍCIA */}

                {noticia.imagem ? (
                  <Image
                    source={{ uri: noticia.imagem }}
                    className="h-[68px] w-[90px] rounded-[10px]"
                    resizeMode="cover"
                  />
                ) : (
                  <View className="h-[68px] w-[90px] rounded-[10px] bg-cartao-borda items-center justify-center">
                    <Texto tamanho={10} className="text-texto-sec text-center">
                      Sem imagem
                    </Texto>
                  </View>
                )}

                {/* INFORMAÇÕES */}

                <View className="ml-3 flex-1 justify-between">
                  <Texto tamanho={14} numberOfLines={3} className="text-texto">
                    {noticia.titulo}
                  </Texto>

                  <View className="flex-row flex-wrap items-center">
                    {noticia.url && (
                      <Image
                        source={{
                          uri: `https://www.google.com/s2/favicons?domain_url=${encodeURIComponent(noticia.url)}&sz=64`,
                        }}
                        className="h-[15px] w-[15px] rounded-full"
                        resizeMode="contain"
                      />
                    )}

                    <Texto tamanho={12} numberOfLines={1} className="ml-1 text-texto">
                      {noticia.fonte}
                    </Texto>

                    <Text className="mx-1 text-xs text-texto-sec">
                      •
                    </Text>

                    <Texto tamanho={12} className="text-texto-sec">
                      {formatarTempo(noticia.publicado_em)}
                    </Texto>
                  </View>
                </View>
              </Pressable>
            ))
          )}

        </View>

        {/* ================================================= */}
        {/* DESAFIO DO DIA */}
        {/* ================================================= */}

        <View className="mt-2 px-5">

          <Texto
            tamanho={20}
            className="text-texto">
            Desafio do dia
          </Texto>

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

                <Texto tamanho={16} className="text-texto">
                  Quiz do dia
                </Texto>

                <Texto tamanho={14} className="mt-1 text-texto-sec">
                  Teste seus conhecimentos sobre futebol!
                </Texto>

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
        className="absolute bottom-[105px] right-5 h-[80px] w-[80px] items-center justify-center rounded-full bg-verde"
        onPress={() => { navigation.navigate("Chatbot") }}
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
          className="text-5xl font-bold text-texto"
          style={{
            fontFamily: "Inter",
          }}
        >
          AI
        </Text>

      </Pressable>

      

      {/* ================================================= */}
      {/* MODAL DE ACESSIBILIDADE */}
      {/* ================================================= */}

      <Modal
        visible={modalAcessibilidade}
        transparent
        animationType="slide"
        statusBarTranslucent
        onRequestClose={() => setModalAcessibilidade(false)}
      >
        <View
          className="flex-1 justify-end"
          style={{
            backgroundColor: cores.overlay,
          }}
        >
          {/* FUNDO CLICÁVEL */}
          <Pressable
            className="absolute inset-0"
            onPress={() => setModalAcessibilidade(false)}
          />

          {/* CONTEÚDO */}
          <View
            className="rounded-t-3xl px-5 pb-8 pt-5"
            style={{
              backgroundColor: cores.surface,
              borderTopWidth: 1,
              borderColor: cores.border,
            }}
          >
            {/* CABEÇALHO */}
            <View className="mb-5 flex-row items-center justify-between">
              <View className="flex-1">
                <Texto
                  tamanho={20}
                  style={{ color: cores.text }}
                >
                  Acessibilidade
                </Texto>

                <Texto
                  tamanho={12}
                  className="mt-1"
                  style={{ color: cores.textSecondary }}
                >
                  Ajustes rápidos para sua experiência
                </Texto>
              </View>

              <Pressable
                onPress={() => setModalAcessibilidade(false)}
                className="h-10 w-10 items-center justify-center rounded-full"
                style={{
                  backgroundColor: cores.surfaceSecondary,
                }}
                accessibilityRole="button"
                accessibilityLabel="Fechar acessibilidade"
              >
                <Text
                  style={{
                    color: cores.text,
                    fontSize: 24,
                  }}
                >
                  ×
                </Text>
              </Pressable>
            </View>

            {/* TAMANHO DO TEXTO */}
            <Texto tamanho={15} className="mb-3" style={{ color: cores.text }}>
              Tamanho do texto
            </Texto>

            <View className="mb-5 flex-row gap-2">
              {[
                { id: "normal", titulo: "Normal" },
                { id: "grande", titulo: "Grande" },
                { id: "muitoGrande", titulo: "Muito grande" },
              ].map((item) => {
                const selecionado =
                  configuracoes.tamanhoTexto === item.id;

                return (
                  <Pressable
                    key={item.id}
                    onPress={() => alterarTamanhoTexto(item.id)}
                    className="flex-1 items-center justify-center rounded-xl px-2 py-3"
                    style={{
                      backgroundColor: selecionado
                        ? cores.primary + "20"
                        : cores.surfaceSecondary,
                      borderWidth: 1,
                      borderColor: selecionado
                        ? cores.primary
                        : cores.border,
                    }}
                    accessibilityRole="radio"
                    accessibilityState={{
                      selected: selecionado,
                    }}
                  >
                    <Texto tamanho={12} style={{color: cores.text, textAlign: "center",}}>
                      {item.titulo}
                    </Texto>
                  </Pressable>
                );
              })}
            </View>

            {/* NEGRITO */}
            <View className="flex-row items-center justify-between py-3">
              <View className="flex-1 pr-3">
                <Texto tamanho={14} style={{ color: cores.text }}>
                  Texto em negrito
                </Texto>

                <Texto tamanho={11}style={{ color: cores.textSecondary }}>
                  Destaca os textos da interface
                </Texto>
              </View>

              <Switch
                value={configuracoes.textoNegrito}
                onValueChange={() =>
                  alternarAcessibilidade("textoNegrito")
                }
                trackColor={{
                  false: cores.border,
                  true: cores.primary,
                }}
                thumbColor="#FFFFFF"
              />
            </View>

            {/* ALTO CONTRASTE */}
            <View className="flex-row items-center justify-between py-3">
              <View className="flex-1 pr-3">
                <Texto tamanho={14} style={{ color: cores.text }}>
                  Alto contraste
                </Texto>

                <Texto tamanho={11} style={{ color: cores.textSecondary }}>
                  Facilita a visualização dos elementos
                </Texto>
              </View>

              <Switch
                value={altoContraste}
                onValueChange={alternarAltoContraste}
                trackColor={{
                  false: cores.border,
                  true: cores.primary,
                }}
                thumbColor="#FFFFFF"
              />
            </View>

            {/* ABRIR CONFIGURAÇÕES COMPLETAS */}
            <Pressable
              className="mt-5 items-center justify-center rounded-xl py-4"
              style={{
                backgroundColor: cores.primary,
              }}
              onPress={() => {
                setModalAcessibilidade(false);
                navigation.navigate("Acessibilidade");
              }}
            >
              <Texto tamanho={14} style={{ color: "#FFFFFF" }}>
                Configurações completas
              </Texto>
            </Pressable>
          </View>
        </View>
      </Modal>



      {/* ===================================================== */}
      {/* BARRA DE NAVEGAÇÃO */}
      {/* ===================================================== */}

      <BottomNav />

    </SafeAreaView>
  );
}