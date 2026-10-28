import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import { useEffect, useState } from "react";

import {
  ArrowLeftIcon,
  CalendarBlankIcon,
  CaretDownIcon,
  CaretRightIcon,
} from "phosphor-react-native";

import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BottomNav } from "../components/bottomNav";
import { CalendarioPersonalizado } from "../components/calendarioPersonalizado";

const API_URL =
  "https://scary-incantation-q7v4974ww77q2jp7-8000.app.github.dev";

const STATUS_AO_VIVO = ["1H", "HT", "2H", "ET", "BT", "P", "LIVE", "INT"];
const STATUS_FINALIZADO = ["FT", "AET", "PEN", "FT_PEN"];
const STATUS_AGENDADO = ["NS", "TBD"];

export function Jogos() {
  const navigation = useNavigation();

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
      return formatarDataAPI(jogo.data) === formatarData(dataSelecionada);
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
      >
        {/* CABEÇALHO */}
        <View className="h-[62px] flex-row items-center px-4">
          <Pressable
            className="h-10 w-10 items-center justify-center"
            onPress={() => navigation.goBack()}
            style={({ pressed }) => ({
              opacity: pressed ? 0.6 : 1,
              transform: [{ scale: pressed ? 0.9 : 1 }],
            })}
          >
            <ArrowLeftIcon size={25} color="#F5F7F8" weight="regular" />
          </Pressable>

          <Text
            className="ml-3 text-[26px] text-texto"
            style={{ fontFamily: "Anuphan" }}
          >
            Jogos
          </Text>
        </View>

        {/* SELETOR DE DATA */}
        <View className="px-4">
          <Pressable
            className="h-[50px] flex-row items-center justify-between rounded-xl border border-cartao-borda bg-cartao px-4"
            onPress={abrirCalendario}
            style={({ pressed }) => ({
              opacity: pressed ? 0.8 : 1,
              transform: [{ scale: pressed ? 0.98 : 1 }],
            })}
          >
            <View className="flex-row items-center">
              <CalendarBlankIcon size={21} color="#A8B2B9" weight="regular" />

              <Text
                className="ml-3 text-sm text-texto"
                style={{ fontFamily: "Inter" }}
              >
                {filtroData === "personalizado" && dataSelecionada
                  ? `Jogos em ${formatarData(dataSelecionada)}`
                  : "Todos os jogos"}
              </Text>
            </View>

            <CaretDownIcon size={20} color="#A8B2B9" weight="regular" />
          </Pressable>
        </View>

        {/* CALENDÁRIO PERSONALIZADO DO CAMISA10 */}
        <CalendarioPersonalizado
          visible={mostrarCalendario}
          initialDate={dataSelecionada || new Date()}
          onCancel={cancelarCalendario}
          onConfirm={confirmarData}
        />

        {/* FILTROS RÁPIDOS DE DATA */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-5"
          contentContainerStyle={{ paddingHorizontal: 16 }}
        >
          <Pressable
            className={obterEstiloFiltro("todos")}
            onPress={() => selecionarFiltro("todos")}
            style={({ pressed }) => ({
              opacity: pressed ? 0.7 : 1,
              transform: [{ scale: pressed ? 0.95 : 1 }],
            })}
          >
            <Text
              className="text-xs"
              style={{ fontFamily: "Inter", color: corTextoFiltro("todos") }}
            >
              TODOS
            </Text>

            <Text
              className="mt-0.5 text-sm font-bold text-texto"
              style={{ fontFamily: "Inter" }}
            >
              Jogos
            </Text>
          </Pressable>

          <Pressable
            className={obterEstiloFiltro("hoje")}
            onPress={() => selecionarFiltro("hoje")}
            style={({ pressed }) => ({
              opacity: pressed ? 0.7 : 1,
              transform: [{ scale: pressed ? 0.95 : 1 }],
            })}
          >
            <Text
              className="text-xs"
              style={{ fontFamily: "Inter", color: corTextoFiltro("hoje") }}
            >
              HOJE
            </Text>

            <Text
              className="mt-0.5 text-sm font-bold text-texto"
              style={{ fontFamily: "Inter" }}
            >
              {formatarData(hoje)}
            </Text>
          </Pressable>

          <Pressable
            className={obterEstiloFiltro("amanha")}
            onPress={() => selecionarFiltro("amanha")}
            style={({ pressed }) => ({
              opacity: pressed ? 0.7 : 1,
              transform: [{ scale: pressed ? 0.95 : 1 }],
            })}
          >
            <Text
              className="text-xs"
              style={{ fontFamily: "Inter", color: corTextoFiltro("amanha") }}
            >
              AMANHÃ
            </Text>

            <Text
              className="mt-0.5 text-sm font-bold text-texto"
              style={{ fontFamily: "Inter" }}
            >
              {formatarData(amanha)}
            </Text>
          </Pressable>

          <Pressable
            className={obterEstiloFiltro("personalizado")}
            onPress={abrirCalendario}
            style={({ pressed }) => ({
              opacity: pressed ? 0.7 : 1,
              transform: [{ scale: pressed ? 0.95 : 1 }],
            })}
          >
            <Text
              className="text-xs"
              style={{
                fontFamily: "Inter",
                color: corTextoFiltro("personalizado"),
              }}
            >
              OUTRO
            </Text>

            <Text
              className="mt-0.5 text-sm font-bold text-texto"
              style={{ fontFamily: "Inter" }}
            >
              {filtroData === "personalizado" && dataSelecionada
                ? formatarData(dataSelecionada)
                : "DATA"}
            </Text>
          </Pressable>
        </ScrollView>

        {/* FILTROS DE SITUAÇÃO */}
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
                <Text
                  className="text-sm"
                  style={{
                    fontFamily: "Inter",
                    color: selecionado ? "#FFFFFF" : "#A8B2B9",
                  }}
                >
                  {item.nome}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* TÍTULO DA LISTA */}
        <View className="mt-7 px-5">
          <Text
            className="text-xl text-texto"
            style={{ fontFamily: "Anuphan" }}
          >
            {filtroData === "hoje"
              ? "Jogos de hoje"
              : filtroData === "amanha"
                ? "Jogos de amanhã"
                : filtroData === "personalizado"
                  ? "Jogos da data selecionada"
                  : "Próximos jogos"}
          </Text>

          <Text
            className="mt-1 text-sm text-texto-sec"
            style={{ fontFamily: "Inter" }}
          >
            {carregando
              ? "Buscando partidas..."
              : `${jogosPorStatus.length} ${
                  jogosPorStatus.length === 1
                    ? "partida encontrada"
                    : "partidas encontradas"
                }`}
          </Text>
        </View>

        {/* LISTA DE JOGOS */}
        <View className="mt-4 px-3">
          {carregando && (
            <View className="items-center py-8">
              <ActivityIndicator size="large" color="#00C853" />

              <Text
                className="mt-3 text-sm text-texto-sec"
                style={{ fontFamily: "Inter" }}
              >
                Carregando partidas...
              </Text>
            </View>
          )}

          {!carregando && erro && (
            <View className="items-center rounded-xl bg-cartao px-5 py-8">
              <Text
                className="text-center text-base text-texto"
                style={{ fontFamily: "Inter" }}
              >
                Não foi possível carregar os jogos
              </Text>

              <Text
                className="mt-2 text-center text-sm text-texto-sec"
                style={{ fontFamily: "Inter" }}
              >
                {erro}
              </Text>

              <Pressable
                className="mt-4 rounded-lg bg-verde px-4 py-2"
                onPress={() => setAtualizacao((valor) => valor + 1)}
              >
                <Text
                  className="font-bold text-texto"
                  style={{ fontFamily: "Inter" }}
                >
                  Tentar novamente
                </Text>
              </Pressable>
            </View>
          )}

          {!carregando && !erro && jogosPorStatus.length === 0 && (
            <View className="mb-4 items-center rounded-xl bg-cartao px-5 py-8">
              <CalendarBlankIcon size={36} color="#A8B2B9" weight="regular" />

              <Text
                className="mt-3 text-base text-texto"
                style={{ fontFamily: "Inter" }}
              >
                Nenhum jogo encontrado
              </Text>

              <Text
                className="mt-1 text-center text-sm text-texto-sec"
                style={{ fontFamily: "Inter" }}
              >
                Não há partidas cadastradas para esta data e situação.
              </Text>

              <Pressable
                className="mt-4 rounded-lg bg-verde px-4 py-2"
                onPress={() => {
                  selecionarFiltro("todos");
                  setFiltroStatus("todos");
                }}
              >
                <Text
                  className="font-bold text-texto"
                  style={{ fontFamily: "Inter" }}
                >
                  Ver todos os jogos
                </Text>
              </Pressable>
            </View>
          )}
          {!carregando &&
            !erro &&
            jogosPorStatus.map((jogo) => {
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
                  onPress={() => {
                    // Futuramente, navegar para os detalhes da partida.
                    // navigation.navigate("DetalhesPartida", { jogoId: jogo.id });
                  }}
                  style={({ pressed }) => ({
                    opacity: pressed ? 0.88 : 1,
                    transform: [{ scale: pressed ? 0.99 : 1 }],
                  })}
                >
                  {/* CAMPEONATO */}
                  <View className="flex-row items-center justify-between">
                    <View className="mr-2 flex-1 flex-row items-center">
                      {jogo.logo_competicao ? (
                        <Image
                          source={{ uri: jogo.logo_competicao }}
                          style={{ width: 28, height: 28 }}
                          resizeMode="contain"
                        />
                      ) : (
                        <View className="h-7 w-7 rounded-md bg-white" />
                      )}

                      <View className="ml-2 flex-1">
                        <Text
                          numberOfLines={1}
                          className="text-sm font-medium text-texto"
                          style={{ fontFamily: "Inter" }}
                        >
                          {jogo.competicao || "Competição"}
                        </Text>

                        <Text
                          numberOfLines={1}
                          className="mt-0.5 text-xs text-texto-sec"
                          style={{ fontFamily: "Inter" }}
                        >
                          {jogo.pais || ""}
                        </Text>
                      </View>
                    </View>

                    <CaretRightIcon
                      size={20}
                      color="#6F7B83"
                      weight="regular"
                    />
                  </View>

                  {/* PARTIDA: COLUNAS FLEXÍVEIS */}
                  <View className="mt-5 w-full flex-row items-start">
                    {/* TIME MANDANTE */}
                    <View className="min-w-0 flex-1 items-center px-1">
                      {jogo.logo_mandante ? (
                        <Image
                          source={{ uri: jogo.logo_mandante }}
                          style={{ width: 60, height: 60 }}
                          resizeMode="contain"
                        />
                      ) : (
                        <View className="h-[60px] w-[60px] rounded-full bg-white" />
                      )}

                      <Text
                        numberOfLines={2}
                        className="mt-2 w-full text-center text-sm text-texto"
                        style={{ fontFamily: "Inter" }}
                      >
                        {jogo.mandante || "Time da casa"}
                      </Text>
                    </View>

                    {/* PLACAR OU HORÁRIO */}
                    <View className="w-[92px] shrink-0 items-center pt-2">
                      {jogo.gols_mandante != null &&
                      jogo.gols_visitante != null ? (
                        <Text
                          numberOfLines={1}
                          className="text-2xl font-bold text-texto"
                          style={{ fontFamily: "Inter" }}
                        >
                          {jogo.gols_mandante} - {jogo.gols_visitante}
                        </Text>
                      ) : (
                        <Text
                          numberOfLines={1}
                          className="text-xl font-bold text-texto"
                          style={{ fontFamily: "Inter" }}
                        >
                          {horarioFormatado}
                        </Text>
                      )}

                      <Text
                        className="mt-1 text-xs text-texto-sec"
                        style={{ fontFamily: "Inter" }}
                      >
                        {dataFormatada}
                      </Text>

                      <View
                        className={`mt-2 max-w-full rounded-full px-2.5 py-1 ${
                          aoVivo ? "bg-verde" : "bg-cartao-borda"
                        }`}
                      >
                        <Text
                          numberOfLines={1}
                          className="text-center text-[10px] text-texto"
                          style={{ fontFamily: "Inter" }}
                        >
                          {statusFormatado}
                        </Text>
                      </View>
                    </View>

                    {/* TIME VISITANTE */}
                    <View className="min-w-0 flex-1 items-center px-1">
                      {jogo.logo_visitante ? (
                        <Image
                          source={{ uri: jogo.logo_visitante }}
                          style={{ width: 60, height: 60 }}
                          resizeMode="contain"
                        />
                      ) : (
                        <View className="h-[60px] w-[60px] rounded-full bg-white" />
                      )}

                      <Text
                        numberOfLines={2}
                        className="mt-2 w-full text-center text-sm text-texto"
                        style={{ fontFamily: "Inter" }}
                      >
                        {jogo.visitante || "Time visitante"}
                      </Text>
                    </View>
                  </View>

                  {/* ESTÁDIO */}
                  {jogo.estadio ? (
                    <View className="mt-4 items-center">
                      <Text
                        numberOfLines={2}
                        className="text-center text-xs text-texto-sec"
                        style={{ fontFamily: "Inter" }}
                      >
                        {jogo.estadio}
                      </Text>
                    </View>
                  ) : null}
                </Pressable>
              );
            })}
        </View>
      </ScrollView>

      {/* BOTÃO FLUTUANTE DA IA */}
      <Pressable
        className="absolute bottom-[105px] right-5 h-[60px] w-[60px] items-center justify-center rounded-full bg-verde"
        onPress={() => navigation.navigate("Chatbot")}
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

      {/* NAVEGAÇÃO INFERIOR */}
      <BottomNav />
    </SafeAreaView>
  );
}