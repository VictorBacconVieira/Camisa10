import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import { useEffect, useState } from "react";

import {
  ArrowLeftIcon,
  CalendarBlankIcon,
  CaretDownIcon,
  CaretRightIcon,
  MagnifyingGlassIcon,
  XIcon,
} from "phosphor-react-native";

import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BottomNav } from "../components/bottomNav";
import { CalendarioPersonalizado } from "../components/calendarioPersonalizado";
import { Texto } from "../components/texto";

import { useAccessibility } from "../context/AccessibilityContext";

const API_URL =
  "https://scary-incantation-q7v4974ww77q2jp7-8000.app.github.dev";

const STATUS_AO_VIVO = ["1H", "HT", "2H", "ET", "BT", "P", "LIVE", "INT"];
const STATUS_FINALIZADO = ["FT", "AET", "PEN", "FT_PEN"];
const STATUS_AGENDADO = ["NS", "TBD"];

export function Jogos() {
  const navigation = useNavigation();

  const { fontScale, configuracoes } = useAccessibility();

  // =========================================================
  // ESCALA DE ÍCONES
  // =========================================================

  const escalaIcone =
    configuracoes.tamanhoTexto === "grande"
      ? 1.15
      : configuracoes.tamanhoTexto === "muitoGrande"
        ? 1.3
        : 1;

  // =========================================================
  // ESTADOS DOS FILTROS E DA API
  // =========================================================

  const [filtroData, setFiltroData] = useState("todos");
  const [dataSelecionada, setDataSelecionada] = useState(null);
  const [mostrarCalendario, setMostrarCalendario] = useState(false);

  const [jogos, setJogos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [atualizacao, setAtualizacao] = useState(0);
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [pesquisa, setPesquisa] = useState("");

  const hoje = new Date();
  const amanha = new Date();
  amanha.setDate(amanha.getDate() + 1);

  // =========================================================
  // BUSCA DOS JOGOS NA API
  // =========================================================

  useEffect(() => {
    let ativo = true;

    async function carregarJogos() {
      try {
        setCarregando(true);
        setErro(null);

        const dataConsulta = new Date();

        if (filtroData === "amanha") {
          dataConsulta.setDate(dataConsulta.getDate() + 1);
        } else if (filtroData === "personalizado" && dataSelecionada) {
          dataConsulta.setFullYear(
            dataSelecionada.getFullYear(),
            dataSelecionada.getMonth(),
            dataSelecionada.getDate()
          );
        }

        const ano = dataConsulta.getFullYear();
        const mes = String(dataConsulta.getMonth() + 1).padStart(2, "0");
        const dia = String(dataConsulta.getDate()).padStart(2, "0");

        const data = `${ano}-${mes}-${dia}`;

        const resposta = await fetch(`${API_URL}/api/jogos?data=${data}`);

        if (!resposta.ok) {
          throw new Error(`Erro HTTP ${resposta.status}`);
        }

        const resultado = await resposta.json();

        if (resultado.erro) {
          throw new Error(resultado.erro);
        }

        if (ativo) {
          setJogos(Array.isArray(resultado.jogos) ? resultado.jogos : []);
        }
      } catch (e) {
        if (ativo) {
          setErro(
            "Não foi possível carregar os jogos. Verifique a conexão com o servidor."
          );

          setJogos([]);
        }
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    }

    carregarJogos();

    return () => {
      ativo = false;
    };
  }, [filtroData, dataSelecionada, atualizacao]);

  // =========================================================
  // FUNÇÕES DE DATA
  // =========================================================

  const formatarData = (data) => {
    const dia = String(data.getDate()).padStart(2, "0");
    const mes = String(data.getMonth() + 1).padStart(2, "0");

    return `${dia}/${mes}`;
  };

  // Trata datas ISO e datas sem horário sem deslocar o dia por fuso.
  const obterDataJogo = (valor) => {
    if (!valor) return null;

    if (typeof valor === "string" && /^\d{4}-\d{2}-\d{2}$/.test(valor)) {
      const [ano, mes, dia] = valor.split("-").map(Number);

      return new Date(ano, mes - 1, dia, 12, 0, 0);
    }

    const data = new Date(valor);

    return Number.isNaN(data.getTime()) ? null : data;
  };

  const formatarDataAPI = (valor) => {
    const data = obterDataJogo(valor);

    if (!data) return "--/--";

    return data.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      timeZone:
        typeof valor === "string" && /^\d{4}-\d{2}-\d{2}$/.test(valor)
          ? undefined
          : "America/Sao_Paulo",
    });
  };

  const formatarHorarioAPI = (valor) => {
    const data = obterDataJogo(valor);

    if (
      !data ||
      (typeof valor === "string" && /^\d{4}-\d{2}-\d{2}$/.test(valor))
    ) {
      return "--:--";
    }

    return data.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "America/Sao_Paulo",
    });
  };

  const abrirCalendario = () => setMostrarCalendario(true);

  const confirmarData = (data) => {
    setDataSelecionada(data);
    setFiltroData("personalizado");
    setMostrarCalendario(false);
  };

  const cancelarCalendario = () => setMostrarCalendario(false);

  const selecionarFiltro = (filtro) => {
    setFiltroData(filtro);

    if (filtro !== "personalizado") {
      setDataSelecionada(null);
    }
  };

  // =========================================================
  // FILTROS DE STATUS
  // =========================================================

  const normalizarStatus = (status) =>
    String(status || "").trim().toUpperCase();

  const jogosFiltrados = jogos.filter((jogo) => {
    if (filtroData === "personalizado" && dataSelecionada) {
      return (
        formatarDataAPI(jogo.data) === formatarData(dataSelecionada)
      );
    }

    return true;
  });

  const jogosPorStatus = jogosFiltrados.filter((jogo) => {
    const status = normalizarStatus(jogo.status);

    if (filtroStatus === "aoVivo") {
      return STATUS_AO_VIVO.includes(status);
    }

    if (filtroStatus === "finalizados") {
      return STATUS_FINALIZADO.includes(status);
    }

    if (filtroStatus === "agendados") {
      return STATUS_AGENDADO.includes(status);
    }

    return true;
  });

  // =========================================================
  // PESQUISA POR PAÍS, COMPETIÇÃO OU TIME
  // =========================================================

  const normalizarPesquisa = (texto) =>
    String(texto || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();

  const termoPesquisa = normalizarPesquisa(pesquisa);

  const jogosPesquisados = jogosPorStatus.filter((jogo) => {
    if (!termoPesquisa) return true;

    const camposPesquisa = [
      jogo.pais,
      jogo.competicao,
      jogo.mandante,
      jogo.visitante,
    ];

    return camposPesquisa.some((campo) =>
      normalizarPesquisa(campo).includes(termoPesquisa)
    );
  });

  // =========================================================
  // ESTILOS DOS FILTROS DE DATA
  // =========================================================

  const obterEstiloFiltro = (filtro) => {
    const selecionado = filtroData === filtro;

    return `mr-2 items-center rounded-xl border px-5 py-2.5 ${
      selecionado
        ? "border-verde bg-verde"
        : "border-cartao-borda bg-cartao"
    }`;
  };

  const corTextoFiltro = (filtro) =>
    filtroData === filtro ? "#FFFFFF" : "#A8B2B9";

  const filtrosStatus = [
    { id: "todos", nome: "Todos" },
    { id: "aoVivo", nome: "Ao vivo" },
    { id: "finalizados", nome: "Finalizados" },
    { id: "agendados", nome: "Agendados" },
  ];

  // =========================================================
  // TELA
  // =========================================================

  return (
    <SafeAreaView className="flex-1 bg-fundo" edges={["top", "bottom"]}>
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
            className="ml-3 flex-shrink"
            style={{ color: "#F5F7F8" }}
          >
            Jogos
          </Texto>
        </View>

        {/* ================================================= */}
        {/* PESQUISA DE JOGOS */}
        {/* ================================================= */}

        <View className="mx-4 mb-3">
          <View className="min-h-[50px] flex-row items-center rounded-xl border border-cartao-borda bg-cartao px-4 py-1">
            <MagnifyingGlassIcon
              size={21 * escalaIcone}
              color="#A8B2B9"
              weight="regular"
            />

            <TextInput
              className="ml-3 flex-1 text-texto"
              style={{
                fontFamily: configuracoes.textoNegrito
                  ? "AnuphanBold"
                  : "Anuphan",
                fontSize: 14 * fontScale,
                lineHeight: Math.ceil(18 * fontScale),
                paddingVertical: 8,
              }}
              placeholder="País, competição ou time..."
              placeholderTextColor="#6F7B83"
              value={pesquisa}
              onChangeText={setPesquisa}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="search"
              accessibilityLabel="País, competição ou time"
            />

            {pesquisa.length > 0 && (
              <Pressable
                onPress={() => setPesquisa("")}
                className="ml-2 h-9 w-9 items-center justify-center rounded-full"
                accessibilityRole="button"
                accessibilityLabel="Limpar pesquisa"
              >
                <XIcon
                  size={18 * escalaIcone}
                  color="#A8B2B9"
                  weight="bold"
                />
              </Pressable>
            )}
          </View>
        </View>

        {/* ================================================= */}
        {/* SELETOR DE DATA */}
        {/* ================================================= */}

        <View className="px-4">
          <Pressable
            className="min-h-[50px] flex-row items-center justify-between rounded-xl border border-cartao-borda bg-cartao px-4 py-3"
            onPress={abrirCalendario}
            accessibilityRole="button"
            accessibilityLabel="Selecionar data dos jogos"
            style={({ pressed }) => ({
              opacity: pressed ? 0.8 : 1,
              transform: [{ scale: pressed ? 0.98 : 1 }],
            })}
          >
            <View className="flex-1 flex-row items-center">
              <CalendarBlankIcon
                size={21 * escalaIcone}
                color="#A8B2B9"
                weight="regular"
              />

              <Texto
                tamanho={14}
                className="ml-3 flex-1"
                style={{ color: "#F5F7F8" }}
              >
                {filtroData === "personalizado" && dataSelecionada
                  ? `Jogos em ${formatarData(dataSelecionada)}`
                  : "Todos os jogos"}
              </Texto>
            </View>

            <CaretDownIcon
              size={20 * escalaIcone}
              color="#A8B2B9"
              weight="regular"
            />
          </Pressable>
        </View>

        {/* CALENDÁRIO PERSONALIZADO DO CAMISA10 */}

        <CalendarioPersonalizado
          visible={mostrarCalendario}
          initialDate={dataSelecionada || new Date()}
          onCancel={cancelarCalendario}
          onConfirm={confirmarData}
        />

        {/* ================================================= */}
        {/* FILTROS RÁPIDOS DE DATA */}
        {/* ================================================= */}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-5"
          contentContainerStyle={{ paddingHorizontal: 16 }}
        >
          {/* TODOS */}

          <Pressable
            className={obterEstiloFiltro("todos")}
            onPress={() => selecionarFiltro("todos")}
            style={({ pressed }) => ({
              opacity: pressed ? 0.7 : 1,
              transform: [{ scale: pressed ? 0.95 : 1 }],
            })}
          >
            <Texto
              tamanho={12}
              style={{ color: corTextoFiltro("todos") }}
            >
              TODOS
            </Texto>

            <Texto
              tamanho={14}
              className="mt-0.5"
              style={{ color: "#F5F7F8", fontWeight: "bold" }}
            >
              Jogos
            </Texto>
          </Pressable>

          {/* HOJE */}

          <Pressable
            className={obterEstiloFiltro("hoje")}
            onPress={() => selecionarFiltro("hoje")}
            style={({ pressed }) => ({
              opacity: pressed ? 0.7 : 1,
              transform: [{ scale: pressed ? 0.95 : 1 }],
            })}
          >
            <Texto
              tamanho={12}
              style={{ color: corTextoFiltro("hoje") }}
            >
              HOJE
            </Texto>

            <Texto
              tamanho={14}
              className="mt-0.5"
              style={{ color: "#F5F7F8", fontWeight: "bold" }}
            >
              {formatarData(hoje)}
            </Texto>
          </Pressable>

          {/* AMANHÃ */}

          <Pressable
            className={obterEstiloFiltro("amanha")}
            onPress={() => selecionarFiltro("amanha")}
            style={({ pressed }) => ({
              opacity: pressed ? 0.7 : 1,
              transform: [{ scale: pressed ? 0.95 : 1 }],
            })}
          >
            <Texto
              tamanho={12}
              style={{ color: corTextoFiltro("amanha") }}
            >
              AMANHÃ
            </Texto>

            <Texto
              tamanho={14}
              className="mt-0.5"
              style={{ color: "#F5F7F8", fontWeight: "bold" }}
            >
              {formatarData(amanha)}
            </Texto>
          </Pressable>

          {/* OUTRA */}

          <Pressable
            className={obterEstiloFiltro("personalizado")}
            onPress={abrirCalendario}
            style={({ pressed }) => ({
              opacity: pressed ? 0.7 : 1,
              transform: [{ scale: pressed ? 0.95 : 1 }],
            })}
          >
            <Texto
              tamanho={12}
              style={{
                color: corTextoFiltro("personalizado"),
              }}
            >
              OUTRA
            </Texto>

            <Texto
              tamanho={14}
              className="mt-0.5"
              style={{ color: "#F5F7F8", fontWeight: "bold" }}
            >
              {filtroData === "personalizado" && dataSelecionada
                ? formatarData(dataSelecionada)
                : "DATA"}
            </Texto>
          </Pressable>
        </ScrollView>

        {/* ================================================= */}
        {/* FILTROS DE SITUAÇÃO */}
        {/* ================================================= */}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-4"
          contentContainerStyle={{ paddingHorizontal: 16 }}
        >
          {filtrosStatus.map((item) => {
            const selecionado = filtroStatus === item.id;

            return (
              <Pressable
                key={item.id}
                onPress={() => setFiltroStatus(item.id)}
                className={`mr-2 rounded-xl border px-4 py-3 ${
                  selecionado
                    ? "border-verde bg-verde"
                    : "border-cartao-borda bg-cartao"
                }`}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.75 : 1,
                  transform: [{ scale: pressed ? 0.97 : 1 }],
                })}
              >
                <Texto
                  tamanho={14}
                  style={{
                    color: selecionado ? "#FFFFFF" : "#A8B2B9",
                    textAlign: "center",
                  }}
                >
                  {item.nome}
                </Texto>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* ================================================= */}
        {/* TÍTULO DA LISTA */}
        {/* ================================================= */}

        <View className="mt-7 px-5">
          <Texto
            tamanho={20}
            style={{ color: "#F5F7F8" }}
          >
            {filtroData === "hoje"
              ? "Jogos de hoje"
              : filtroData === "amanha"
                ? "Jogos de amanhã"
                : filtroData === "personalizado"
                  ? "Jogos da data selecionada"
                  : "Próximos jogos"}
          </Texto>

          <Texto
            tamanho={14}
            className="mt-1"
            style={{ color: "#A8B2B9" }}
          >
            {carregando
              ? "Buscando partidas..."
              : `${jogosPesquisados.length} ${
                  jogosPesquisados.length === 1
                    ? "partida encontrada"
                    : "partidas encontradas"
                }`}
          </Texto>
        </View>

        {/* ================================================= */}
        {/* LISTA DE JOGOS */}
        {/* ================================================= */}

        <View className="mt-4 px-3">
          {/* CARREGAMENTO */}

          {carregando && (
            <View className="items-center py-8">
              <ActivityIndicator size="large" color="#00C853" />

              <Texto
                tamanho={14}
                className="mt-3"
                style={{ color: "#A8B2B9" }}
              >
                Carregando partidas...
              </Texto>
            </View>
          )}

          {/* ERRO */}

          {!carregando && erro && (
            <View className="items-center rounded-xl bg-cartao px-5 py-8">
              <Texto
                tamanho={16}
                style={{
                  color: "#F5F7F8",
                  textAlign: "center",
                }}
              >
                Não foi possível carregar os jogos
              </Texto>

              <Texto
                tamanho={14}
                className="mt-2"
                style={{
                  color: "#A8B2B9",
                  textAlign: "center",
                }}
              >
                {erro}
              </Texto>

              <Pressable
                className="mt-4 rounded-lg bg-verde px-4 py-3"
                onPress={() => setAtualizacao((valor) => valor + 1)}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.75 : 1,
                  transform: [{ scale: pressed ? 0.96 : 1 }],
                })}
              >
                <Texto
                  tamanho={14}
                  style={{
                    color: "#F5F7F8",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Tentar novamente
                </Texto>
              </Pressable>
            </View>
          )}

          {/* NENHUM JOGO ENCONTRADO */}

          {!carregando && !erro && jogosPesquisados.length === 0 && (
            <View className="mb-4 items-center rounded-xl bg-cartao px-5 py-8">
              <CalendarBlankIcon
                size={36 * escalaIcone}
                color="#A8B2B9"
                weight="regular"
              />

              <Texto
                tamanho={16}
                className="mt-3"
                style={{
                  color: "#F5F7F8",
                  textAlign: "center",
                }}
              >
                Nenhum jogo encontrado
              </Texto>

              <Texto
                tamanho={14}
                className="mt-1"
                style={{
                  color: "#A8B2B9",
                  textAlign: "center",
                }}
              >
                {pesquisa.trim()
                  ? "Nenhuma partida corresponde à sua pesquisa."
                  : "Não há partidas cadastradas para esta data e situação."}
              </Texto>

              <Pressable
                className="mt-4 rounded-lg bg-verde px-4 py-3"
                onPress={() => {
                  selecionarFiltro("todos");
                  setFiltroStatus("todos");
                }}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.75 : 1,
                  transform: [{ scale: pressed ? 0.96 : 1 }],
                })}
              >
                <Texto
                  tamanho={14}
                  style={{
                    color: "#F5F7F8",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Ver todos os jogos
                </Texto>
              </Pressable>
            </View>
          )}

          {/* ================================================= */}
          {/* CARDS DAS PARTIDAS */}
          {/* ================================================= */}

          {!carregando &&
            !erro &&
            jogosPesquisados.map((jogo) => {
              const status = normalizarStatus(jogo.status);

              const finalizado = STATUS_FINALIZADO.includes(status);
              const aoVivo = STATUS_AO_VIVO.includes(status);

              const horarioFormatado = formatarHorarioAPI(jogo.data);
              const dataFormatada = formatarDataAPI(jogo.data);

              const statusFormatado = finalizado
                ? "Finalizado"
                : aoVivo
                  ? "Ao vivo"
                  : STATUS_AGENDADO.includes(status)
                    ? "Agendado"
                    : jogo.status_descricao || "Agendado";

              return (
                <Pressable
                  key={jogo.id}
                  className="mb-4 rounded-[12px] bg-cartao px-4 py-4"
                  onPress={() => navigation.navigate("DetalhesJogos", { jogo })}
                  accessibilityRole="button"
                  accessibilityLabel={`Partida ${jogo.mandante} contra ${jogo.visitante}. ${statusFormatado}. Abrir detalhes`}
                  style={({ pressed }) => ({
                    opacity: pressed ? 0.88 : 1,
                    transform: [{ scale: pressed ? 0.99 : 1 }],
                  })}
                >
                  {/* ================================================= */}
                  {/* CAMPEONATO */}
                  {/* ================================================= */}

                  <View className="flex-row items-center justify-between">
                    <View className="mr-2 flex-1 flex-row items-center">
                      {jogo.logo_competicao ? (
                        <Image
                          source={{ uri: jogo.logo_competicao }}
                          style={{
                            width: 28 * escalaIcone,
                            height: 28 * escalaIcone,
                          }}
                          resizeMode="contain"
                        />
                      ) : (
                        <View
                          style={{
                            width: 28 * escalaIcone,
                            height: 28 * escalaIcone,
                          }}
                          className="rounded-md bg-white"
                        />
                      )}

                      <View className="ml-2 flex-1">
                        <Texto
                          tamanho={14}
                          numberOfLines={2}
                          style={{
                            color: "#F5F7F8",
                            fontWeight: "500",
                          }}
                        >
                          {jogo.competicao || "Competição"}
                        </Texto>

                        <Texto
                          tamanho={12}
                          numberOfLines={2}
                          className="mt-0.5"
                          style={{ color: "#A8B2B9" }}
                        >
                          {jogo.pais || ""}
                        </Texto>
                      </View>
                    </View>

                    <CaretRightIcon
                      size={20 * escalaIcone}
                      color="#6F7B83"
                      weight="regular"
                    />
                  </View>

                  {/* ================================================= */}
                  {/* PARTIDA: COLUNAS FLEXÍVEIS */}
                  {/* ================================================= */}

                  <View className="mt-5 w-full flex-row items-start">
                    {/* TIME MANDANTE */}

                    <View className="min-w-0 flex-1 items-center px-1">
                      {jogo.logo_mandante ? (
                        <Image
                          source={{ uri: jogo.logo_mandante }}
                          style={{
                            width: 60 * escalaIcone,
                            height: 60 * escalaIcone,
                          }}
                          resizeMode="contain"
                        />
                      ) : (
                        <View
                          style={{
                            width: 60 * escalaIcone,
                            height: 60 * escalaIcone,
                          }}
                          className="rounded-full bg-white"
                        />
                      )}

                      <Texto
                        tamanho={14}
                        numberOfLines={3}
                        className="mt-2 w-full"
                        style={{
                          color: "#F5F7F8",
                          textAlign: "center",
                        }}
                      >
                        {jogo.mandante || "Time da casa"}
                      </Texto>
                    </View>

                    {/* PLACAR OU HORÁRIO */}

                    <View className="w-[92px] shrink-0 items-center pt-2">
                      {jogo.gols_mandante != null &&
                      jogo.gols_visitante != null ? (
                        <Texto
                          tamanho={24}
                          numberOfLines={1}
                          style={{
                            color: "#F5F7F8",
                            fontWeight: "bold",
                            textAlign: "center",
                          }}
                        >
                          {jogo.gols_mandante} - {jogo.gols_visitante}
                        </Texto>
                      ) : (
                        <Texto
                          tamanho={20}
                          numberOfLines={1}
                          style={{
                            color: "#F5F7F8",
                            fontWeight: "bold",
                            textAlign: "center",
                          }}
                        >
                          {horarioFormatado}
                        </Texto>
                      )}

                      <Texto
                        tamanho={12}
                        className="mt-1"
                        style={{
                          color: "#A8B2B9",
                          textAlign: "center",
                        }}
                      >
                        {dataFormatada}
                      </Texto>

                      <View
                        className={`mt-2 max-w-full rounded-full px-2.5 py-1 ${
                          aoVivo ? "bg-verde" : "bg-cartao-borda"
                        }`}
                      >
                        <Texto
                          tamanho={10}
                          numberOfLines={2}
                          style={{
                            color: "#F5F7F8",
                            textAlign: "center",
                          }}
                        >
                          {statusFormatado}
                        </Texto>
                      </View>
                    </View>

                    {/* TIME VISITANTE */}

                    <View className="min-w-0 flex-1 items-center px-1">
                      {jogo.logo_visitante ? (
                        <Image
                          source={{ uri: jogo.logo_visitante }}
                          style={{
                            width: 60 * escalaIcone,
                            height: 60 * escalaIcone,
                          }}
                          resizeMode="contain"
                        />
                      ) : (
                        <View
                          style={{
                            width: 60 * escalaIcone,
                            height: 60 * escalaIcone,
                          }}
                          className="rounded-full bg-white"
                        />
                      )}

                      <Texto
                        tamanho={14}
                        numberOfLines={3}
                        className="mt-2 w-full"
                        style={{
                          color: "#F5F7F8",
                          textAlign: "center",
                        }}
                      >
                        {jogo.visitante || "Time visitante"}
                      </Texto>
                    </View>
                  </View>

                  {/* ================================================= */}
                  {/* ESTÁDIO */}
                  {/* ================================================= */}

                  {jogo.estadio ? (
                    <View className="mt-4 items-center">
                      <Texto
                        tamanho={12}
                        numberOfLines={3}
                        style={{
                          color: "#A8B2B9",
                          textAlign: "center",
                        }}
                      >
                        {jogo.estadio}
                      </Texto>
                    </View>
                  ) : null}
                </Pressable>
              );
            })}
        </View>
      </ScrollView>

      {/* ===================================================== */}
      {/* BOTÃO FLUTUANTE DA IA */}
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
          style={{
            color: "#F5F7F8",
            fontWeight: "bold",
          }}
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