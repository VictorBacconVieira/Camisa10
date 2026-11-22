
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeftIcon,
  SoccerBallIcon,
  ClockIcon,
  MapPinIcon,
  TrophyIcon,
  UsersThreeIcon,
  ChartBarIcon,
  CaretRightIcon,
} from "phosphor-react-native";

import { useTheme } from "../context/ThemeContext";

// =========================================================
// DADOS FICTÍCIOS
// FUTURO BACKEND: substituir pelos dados da API
// =========================================================

const PARTIDA = {
  mandante: "Flamengo",
  visitante: "Palmeiras",
  gols_mandante: 2,
  gols_visitante: 1,

  logo_mandante: null,
  logo_visitante: null,
  logo_competicao: null,

  competicao: "Brasileirão Série A",
  pais: "Brasil",
  fase: "32ª Rodada",

  data: "2026-11-15T18:30:00",
  status: "FT",
  status_descricao: "ENCERRADO",

  estadio: "Maracanã",
  cidade: "Rio de Janeiro - RJ",
  arbitro: "Raphael Claus",
  publico: "62.548 pessoas",

  estatisticas: {
    posse: [58, 42],
    finalizacoes: [16, 11],
    chutesGol: [7, 4],
    escanteios: [8, 5],
    faltas: [12, 15],
    amarelos: [2, 3],
  },

  escalacoes: {
    mandante: {
      formacao: "4-3-3",
      titulares: [
        { n: 1, nome: "Rossi", pos: "GOL", x: 50, y: 92 },
        { n: 2, nome: "Varela", pos: "LD", x: 15, y: 75 },
        { n: 3, nome: "Léo Ortiz", pos: "ZAG", x: 35, y: 75 },
        { n: 4, nome: "Léo Pereira", pos: "ZAG", x: 65, y: 75 },
        { n: 6, nome: "Alex Sandro", pos: "LE", x: 85, y: 75 },
        { n: 5, nome: "Pulgar", pos: "VOL", x: 50, y: 58 },
        { n: 8, nome: "De la Cruz", pos: "MC", x: 25, y: 48 },
        { n: 18, nome: "Arrascaeta", pos: "MC", x: 75, y: 48 },
        { n: 7, nome: "Gerson", pos: "ATA", x: 15, y: 25 },
        { n: 9, nome: "Pedro", pos: "ATA", x: 50, y: 18 },
        { n: 11, nome: "Bruno Henrique", pos: "ATA", x: 85, y: 25 },
      ],

      reservas: [
        { n: 25, nome: "Matheus Cunha", pos: "GOL" },
        { n: 26, nome: "Wesley", pos: "DEF" },
        { n: 13, nome: "Danilo", pos: "DEF" },
        { n: 15, nome: "Fabrício Bruno", pos: "DEF" },
        { n: 21, nome: "Allan", pos: "MEI" },
        { n: 20, nome: "Victor Hugo", pos: "MEI" },
        { n: 10, nome: "Gabigol", pos: "ATA" },
        { n: 27, nome: "Luiz Araújo", pos: "ATA" },
      ],
    },

    visitante: {
      formacao: "4-2-3-1",
      titulares: [
        { n: 21, nome: "Weverton", pos: "GOL", x: 50, y: 92 },
        { n: 2, nome: "Marcos Rocha", pos: "LD", x: 15, y: 75 },
        { n: 15, nome: "Gómez", pos: "ZAG", x: 35, y: 75 },
        { n: 26, nome: "Murilo", pos: "ZAG", x: 65, y: 75 },
        { n: 22, nome: "Piquerez", pos: "LE", x: 85, y: 75 },
        { n: 5, nome: "Aníbal Moreno", pos: "VOL", x: 35, y: 58 },
        { n: 8, nome: "Richard Ríos", pos: "VOL", x: 65, y: 58 },
        { n: 23, nome: "Raphael Veiga", pos: "MEI", x: 50, y: 42 },
        { n: 7, nome: "Dudu", pos: "ATA", x: 15, y: 28 },
        { n: 10, nome: "Rony", pos: "ATA", x: 50, y: 25 },
        { n: 9, nome: "Endrick", pos: "ATA", x: 85, y: 28 },
      ],

      reservas: [
        { n: 14, nome: "Lomba", pos: "GOL" },
        { n: 12, nome: "Mayke", pos: "DEF" },
        { n: 13, nome: "Luan", pos: "DEF" },
        { n: 6, nome: "Vanderlan", pos: "DEF" },
        { n: 20, nome: "Atuesta", pos: "MEI" },
        { n: 18, nome: "Maurício", pos: "MEI" },
        { n: 11, nome: "Lázaro", pos: "ATA" },
        { n: 19, nome: "Flaco López", pos: "ATA" },
      ],
    },
  },

  // FUTURO BACKEND / API:
  // Os eventos deverão trazer tipo, minuto, equipe, jogador,
  // assistência, jogador que entra/sai e cartão recebido.

  eventos: [
    {
      minuto: "12",
      tipo: "gol",
      equipe: "Flamengo",
      jogador: "Pedro",
      assistencia: "Gerson",
    },
    {
      minuto: "28",
      tipo: "cartao",
      cartao: "amarelo",
      equipe: "Palmeiras",
      jogador: "Aníbal Moreno",
    },
    {
      minuto: "41",
      tipo: "gol",
      equipe: "Palmeiras",
      jogador: "Raphael Veiga",
      assistencia: "Rony",
    },
    {
      minuto: "45+2",
      tipo: "cartao",
      cartao: "amarelo",
      equipe: "Flamengo",
      jogador: "Pulgar",
    },
    {
      minuto: "63",
      tipo: "substituicao",
      equipe: "Flamengo",
      entrou: "Gabigol",
      saiu: "Pedro",
    },
    {
      minuto: "78",
      tipo: "gol",
      equipe: "Flamengo",
      jogador: "Arrascaeta",
      assistencia: "Bruno Henrique",
    },
    {
      minuto: "84",
      tipo: "substituicao",
      equipe: "Palmeiras",
      entrou: "Flaco López",
      saiu: "Rony",
    },
  ],

  classificacao: [
    { pos: 1, equipe: "Botafogo", pts: 68, j: 32, v: 21, e: 5, d: 6, sg: 28 },
    { pos: 2, equipe: "Palmeiras", pts: 64, j: 32, v: 19, e: 7, d: 6, sg: 24 },
    { pos: 3, equipe: "Flamengo", pts: 61, j: 32, v: 18, e: 7, d: 7, sg: 21 },
    { pos: 4, equipe: "Fortaleza", pts: 58, j: 32, v: 17, e: 7, d: 8, sg: 15 },
    { pos: 5, equipe: "São Paulo", pts: 54, j: 32, v: 15, e: 9, d: 8, sg: 12 },
    { pos: 6, equipe: "Internacional", pts: 52, j: 32, v: 15, e: 7, d: 10, sg: 10 },
    { pos: 7, equipe: "Bahia", pts: 49, j: 32, v: 14, e: 7, d: 11, sg: 7 },
    { pos: 8, equipe: "Cruzeiro", pts: 47, j: 32, v: 13, e: 8, d: 11, sg: 5 },
  ],
};

// =========================================================
// COMPONENTE: CARD
// =========================================================

function Card({ children, className = "" }) {
  const { cores } = useTheme();

  return (
    <View
      className={`rounded-2xl border p-4 ${className}`}
      style={{
        backgroundColor: cores.surface,
        borderColor: cores.border,
      }}
    >
      {children}
    </View>
  );
}

// =========================================================
// COMPONENTE: TÍTULO DE SEÇÃO
// =========================================================

function TituloSecao({ titulo, subtitulo, icone: Icon }) {
  const { cores } = useTheme();

  return (
    <View className="flex-row items-center mb-4">
      {Icon ? (
        <View
          className="w-10 h-10 rounded-xl items-center justify-center mr-3"
          style={{ backgroundColor: `${cores.primary}15` }}
        >
          <Icon size={21} color={cores.primary} weight="bold" />
        </View>
      ) : null}

      <View className="flex-1">
        <Text
          className="text-base font-bold"
          style={{ color: cores.text }}
        >
          {titulo}
        </Text>

        {subtitulo ? (
          <Text
            className="text-xs mt-1"
            style={{ color: cores.textTertiary }}
          >
            {subtitulo}
          </Text>
        ) : null}
      </View>
    </View>
  );
}

// =========================================================
// COMPONENTE: LOGO DO TIME
// =========================================================

function LogoTime({ logo, nome, tamanho = 76 }) {
  const { cores } = useTheme();

  return (
    <View
      style={{
        width: tamanho,
        height: tamanho,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {logo ? (
        <Image
          source={{ uri: logo }}
          resizeMode="contain"
          style={{ width: tamanho, height: tamanho }}
        />
      ) : (
        <View
          className="rounded-full border items-center justify-center"
          style={{
            width: tamanho - 8,
            height: tamanho - 8,
            backgroundColor: cores.surfaceSecondary,
            borderColor: cores.border,
          }}
        >
          <Text
            className="text-xl font-extrabold"
            style={{ color: cores.primary }}
          >
            {nome?.substring(0, 3).toUpperCase()}
          </Text>
        </View>
      )}
    </View>
  );
}

// =========================================================
// COMPONENTE: ESTATÍSTICA
// =========================================================

function Estatistica({ titulo, valores }) {
  const { cores } = useTheme();

  const [mandante, visitante] = valores;

  const total = mandante + visitante || 1;
  const porcentagemMandante = (mandante / total) * 100;
  const porcentagemVisitante = (visitante / total) * 100;

  const menorMelhor = ["Faltas", "Cartões amarelos"].includes(titulo);

  const mandanteMelhor = menorMelhor
    ? mandante < visitante
    : mandante > visitante;

  const visitanteMelhor = menorMelhor
    ? visitante < mandante
    : visitante > mandante;

  const empate = mandante === visitante;

  return (
    <View className="mb-5">
      <View className="flex-row items-center justify-between mb-2">
        <Text
          className="text-sm font-extrabold"
          style={{
            color:
              mandanteMelhor || empate
                ? cores.primary
                : cores.text,
          }}
        >
          {mandante}
        </Text>

        <Text
          className="text-xs text-center"
          style={{ color: cores.textSecondary }}
        >
          {titulo}
        </Text>

        <Text
          className="text-sm font-extrabold"
          style={{
            color:
              visitanteMelhor || empate
                ? cores.primary
                : cores.text,
          }}
        >
          {visitante}
        </Text>
      </View>

      <View
        className="flex-row h-3 rounded-full overflow-hidden"
        style={{ backgroundColor: cores.border }}
      >
        <View
          style={{
            width: `${porcentagemMandante}%`,
            backgroundColor: cores.primary,
          }}
        />

        <View
          style={{
            width: `${porcentagemVisitante}%`,
            backgroundColor: cores.warning,
          }}
        />
      </View>
    </View>
  );
}

// =========================================================
// COMPONENTE: EVENTO DA PARTIDA
// =========================================================

function IconeEvento({ evento }) {
  const { cores } = useTheme();

  if (evento.tipo === "gol") {
    return (
      <View className="w-8 h-8 items-center justify-center">
        <SoccerBallIcon
          size={22}
          color={cores.icon}
          weight="fill"
        />
      </View>
    );
  }

  if (evento.tipo === "cartao") {
    const vermelho = evento.cartao === "vermelho";

    return (
      <View
        className="w-5 h-7 rounded-sm"
        style={{
          backgroundColor: vermelho
            ? cores.danger
            : cores.warning,
        }}
      />
    );
  }

  if (evento.tipo === "substituicao") {
    return (
      <View className="items-center justify-center">
        <Text
          className="text-lg font-extrabold"
          style={{ color: cores.primary }}
        >
          ↑
        </Text>

        <Text
          className="text-lg font-extrabold -mt-2"
          style={{ color: cores.danger }}
        >
          ↓
        </Text>
      </View>
    );
  }

  return null;
}

// =========================================================
// COMPONENTE: TEXTO DO EVENTO
// =========================================================

function ConteudoEvento({ evento }) {
  const { cores } = useTheme();

  if (evento.tipo === "gol") {
    return (
      <View>
        <Text
          className="text-sm font-bold"
          style={{ color: cores.text }}
        >
          {evento.jogador || "Autor não informado"}
        </Text>

        {evento.assistencia ? (
          <Text
            className="text-xs mt-1"
            style={{ color: cores.textTertiary }}
          >
            Assistência: {evento.assistencia}
          </Text>
        ) : null}
      </View>
    );
  }

  if (evento.tipo === "cartao") {
    const vermelho = evento.cartao === "vermelho";

    return (
      <View>
        <Text
          className="text-sm font-bold"
          style={{ color: cores.text }}
        >
          {evento.jogador || "Jogador não informado"}
        </Text>

        <Text
          className="text-xs mt-1"
          style={{
            color: vermelho ? cores.danger : cores.warning,
          }}
        >
          Cartão {vermelho ? "vermelho" : "amarelo"}
        </Text>

        {evento.descricao ? (
          <Text
            className="text-xs mt-1"
            style={{ color: cores.textTertiary }}
          >
            {evento.descricao}
          </Text>
        ) : null}
      </View>
    );
  }

  if (evento.tipo === "substituicao") {
    return (
      <View>
        <Text
          className="text-sm font-bold"
          style={{ color: cores.primary }}
        >
          {evento.entrou || evento.jogador || "Jogador"}
        </Text>

        <Text
          className="text-sm mt-1"
          style={{ color: cores.textSecondary }}
        >
          {evento.saiu || evento.substituido || "Substituição"}
        </Text>
      </View>
    );
  }

  return (
    <Text
      className="text-sm"
      style={{ color: cores.text }}
    >
      {evento.descricao || "Evento"}
    </Text>
  );
}

// =========================================================
// COMPONENTE: EVENTO NA TIMELINE
// =========================================================

function LinhaEvento({ evento, lado }) {
  const { cores } = useTheme();
  const ladoMandante = lado === "mandante";

  return (
    <View className="flex-row items-center min-h-[78px]">
      <View className="flex-1 items-end pr-2">
        {ladoMandante ? (
          <View className="flex-row items-center justify-end">
            <View className="flex-1 items-end mr-2">
              <ConteudoEvento evento={evento} />
            </View>

            <IconeEvento evento={evento} />
          </View>
        ) : null}
      </View>

      <View className="w-[54px] items-center justify-center self-stretch">
        <View
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            width: 2,
            backgroundColor: cores.border,
          }}
        />

        <View
          className="px-1 items-center justify-center z-10"
          style={{ backgroundColor: cores.surface }}
        >
          <Text
            className="text-sm font-extrabold"
            style={{
              color:
                evento.cartao === "vermelho"
                  ? cores.danger
                  : cores.text,
            }}
          >
            {evento.minuto}'
          </Text>
        </View>
      </View>

      <View className="flex-1 items-start pl-2">
        {!ladoMandante ? (
          <View className="flex-row items-center justify-start">
            <IconeEvento evento={evento} />

            <View className="flex-1 ml-2">
              <ConteudoEvento evento={evento} />
            </View>
          </View>
        ) : null}
      </View>
    </View>
  );
}

// =========================================================
// COMPONENTE: SEPARADOR DE TEMPO
// =========================================================

function SeparadorTempo({ titulo, placar }) {
  const { cores } = useTheme();

  return (
    <View className="flex-row items-center my-4">
      <View
        className="flex-1 h-[1px]"
        style={{ backgroundColor: cores.border }}
      />

      <View
        className="rounded-full px-4 py-2 mx-2 border"
        style={{
          backgroundColor: cores.background,
          borderColor: cores.border,
        }}
      >
        <Text
          className="text-xs font-semibold"
          style={{ color: cores.textSecondary }}
        >
          {titulo}{placar ? ` • ${placar}` : ""}
        </Text>
      </View>

      <View
        className="flex-1 h-[1px]"
        style={{ backgroundColor: cores.border }}
      />
    </View>
  );
}

// =========================================================
// COMPONENTE: EVENTOS DA PARTIDA
// =========================================================

function EventosPartida({ jogo }) {
  const { cores } = useTheme();
  const [abaEventos, setAbaEventos] = useState("todos");

  // FUTURO BACKEND / API:
  // Buscar eventos oficiais, minutos, atletas, assistências,
  // cartões, substituições e placar por período.

  const eventos = jogo.eventos || [];

  const converterMinuto = (minuto) => {
    const texto = String(minuto ?? "0").replace("'", "").trim();
    const [base, acrescimo] = texto.split("+");

    return (Number(base) || 0) + (Number(acrescimo) || 0);
  };

  const eventosOrdenados = [...eventos].sort(
    (a, b) =>
      converterMinuto(b.minuto) - converterMinuto(a.minuto)
  );

  const eventosDestaque = eventosOrdenados.filter(
    (evento) => evento.tipo === "gol"
  );

  const listaEventos =
    abaEventos === "destaques"
      ? eventosDestaque
      : eventosOrdenados;

  const segundoTempo = listaEventos.filter(
    (evento) => converterMinuto(evento.minuto) > 45
  );

  const primeiroTempo = listaEventos.filter(
    (evento) => converterMinuto(evento.minuto) <= 45
  );

  const renderLista = (lista) =>
    lista.map((evento, index) => {
      const ladoEvento =
        evento.equipe === jogo.mandante
          ? "mandante"
          : "visitante";

      return (
        <LinhaEvento
          key={`${evento.minuto}-${evento.tipo}-${evento.jogador || evento.entrou}-${index}`}
          evento={evento}
          lado={ladoEvento}
        />
      );
    });

  return (
    <Card className="p-0 overflow-hidden">
      <View className="p-4 pb-3">
        <TituloSecao
          titulo="Eventos da Partida"
          subtitulo="Acompanhe os principais acontecimentos"
          icone={SoccerBallIcon}
        />
      </View>

      <View
        className="flex-row border-b"
        style={{ borderColor: cores.border }}
      >
        {[
          { id: "destaques", nome: "Destaques" },
          { id: "todos", nome: "Todos" },
        ].map((aba) => {
          const ativa = abaEventos === aba.id;

          return (
            <Pressable
              key={aba.id}
              onPress={() => setAbaEventos(aba.id)}
              className="flex-1 py-4 items-center justify-center"
              style={{
                borderBottomWidth: ativa ? 2 : 0,
                borderBottomColor: cores.primary,
              }}
            >
              <Text
                className="text-sm font-bold"
                style={{
                  color: ativa
                    ? cores.text
                    : cores.textTertiary,
                }}
              >
                {aba.nome}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View className="px-4 pt-4">
        <View
          className="rounded-xl p-3 flex-row items-center justify-center"
          style={{ backgroundColor: cores.surfaceSecondary }}
        >
          <Text
            className="font-bold text-xs"
            style={{ color: cores.text }}
          >
            {jogo.mandante}
          </Text>

          <Text
            className="text-lg font-extrabold mx-3"
            style={{ color: cores.primary }}
          >
            {jogo.gols_mandante} - {jogo.gols_visitante}
          </Text>

          <Text
            className="font-bold text-xs"
            style={{ color: cores.text }}
          >
            {jogo.visitante}
          </Text>
        </View>
      </View>

      <View className="flex-row px-4 mt-4 mb-2">
        <View className="flex-1 items-end pr-3">
          <Text
            className="text-[10px] font-extrabold"
            style={{ color: cores.primary }}
          >
            {jogo.mandante}
          </Text>
        </View>

        <View className="w-[54px]" />

        <View className="flex-1 items-start pl-3">
          <Text
            className="text-[10px] font-extrabold"
            style={{ color: cores.warning }}
          >
            {jogo.visitante}
          </Text>
        </View>
      </View>

      <View className="px-2 pb-4">
        {listaEventos.length === 0 ? (
          <View className="py-10 items-center">
            <SoccerBallIcon
              size={30}
              color={cores.textTertiary}
            />

            <Text
              className="text-xs mt-3"
              style={{ color: cores.textTertiary }}
            >
              Nenhum evento disponível.
            </Text>
          </View>
        ) : (
          <>
            {segundoTempo.length > 0 ? (
              <>
                <SeparadorTempo
                  titulo="Fim do Jogo"
                  placar={`${jogo.gols_mandante} - ${jogo.gols_visitante}`}
                />

                {renderLista(segundoTempo)}
              </>
            ) : null}

            {abaEventos === "todos" &&
            primeiroTempo.length > 0 &&
            segundoTempo.length > 0 ? (
              <SeparadorTempo titulo="Intervalo" />
            ) : null}

            {primeiroTempo.length > 0 ? (
              <>{renderLista(primeiroTempo)}</>
            ) : null}
          </>
        )}
      </View>

      {abaEventos === "todos" ? (
        <View
          className="p-3 border-t"
          style={{ borderColor: cores.border }}
        >
          <View className="flex-row justify-center flex-wrap gap-4">
            <View className="flex-row items-center">
              <View className="w-3 h-4 rounded-sm mr-2 bg-[#FFC107]" />
              <Text
                className="text-[10px]"
                style={{ color: cores.textTertiary }}
              >
                Amarelo
              </Text>
            </View>

            <View className="flex-row items-center">
              <View className="w-3 h-4 rounded-sm mr-2 bg-[#E53935]" />
              <Text
                className="text-[10px]"
                style={{ color: cores.textTertiary }}
              >
                Vermelho
              </Text>
            </View>

            <View className="flex-row items-center">
              <Text
                className="font-extrabold mr-1"
                style={{ color: cores.primary }}
              >
                ↑
              </Text>

              <Text
                className="text-[10px]"
                style={{ color: cores.textTertiary }}
              >
                Entrada
              </Text>

              <Text className="text-[#E53935] font-extrabold ml-3 mr-1">
                ↓
              </Text>

              <Text
                className="text-[10px]"
                style={{ color: cores.textTertiary }}
              >
                Saída
              </Text>
            </View>
          </View>
        </View>
      ) : null}
    </Card>
  );
}

 // =========================================================
 // COMPONENTE: JOGADOR NO CAMPO
 // =========================================================

function JogadorCampo({ jogador }) {
  const { cores } = useTheme();

  return (
    <View
      style={{
        position: "absolute",
        left: `${jogador.x}%`,
        top: `${jogador.y}%`,
        width: 56,
        alignItems: "center",
        transform: [{ translateX: -28 }, { translateY: -20 }],
        zIndex: 10,
      }}
    >
      <View
        style={{
          width: 36,
          height: 36,
          borderRadius: 18,
          backgroundColor: cores.surface,
          borderWidth: 2,
          borderColor: cores.border,
          alignItems: "center",
          justifyContent: "center",
          elevation: 4,
        }}
      >
        <Text
          className="text-[10px] font-extrabold"
          style={{ color: cores.text }}
        >
          {jogador.n}
        </Text>
      </View>

      <View
        style={{
          width: 72,
          backgroundColor: cores.surface,
          borderRadius: 5,
          paddingHorizontal: 4,
          paddingVertical: 3,
          marginTop: 4,
        }}
      >
        <Text
          className="text-[9px] font-bold text-center"
          style={{ color: cores.text }}
          numberOfLines={1}
        >
          {jogador.nome}
        </Text>
      </View>
    </View>
  );
}

// =========================================================
// COMPONENTE: CAMPO DE FUTEBOL
// =========================================================

function CampoFutebol({ jogadores }) {
  const margem = 10;

  return (
    <View
      style={{
        height: 500,
        backgroundColor: "#176B3A",
        position: "relative",
        borderRadius: 16,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#2D8A50",
      }}
    >
      {/* GRAMADO */}

      <View
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          flexDirection: "row",
        }}
      >
        {[0, 1, 2, 3, 4, 5].map((faixa) => (
          <View
            key={faixa}
            style={{
              flex: 1,
              backgroundColor:
                faixa % 2 === 0 ? "#176B3A" : "#1D7844",
            }}
          />
        ))}
      </View>

      {/* CONTORNO */}

      <View
        style={{
          position: "absolute",
          top: margem,
          bottom: margem,
          left: margem,
          right: margem,
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.7)",
        }}
      />

      {/* LINHA CENTRAL */}

      <View
        style={{
          position: "absolute",
          left: margem,
          right: margem,
          top: "50%",
          height: 1,
          backgroundColor: "rgba(255,255,255,0.7)",
        }}
      />

      {/* CÍRCULO CENTRAL */}

      <View
        style={{
          position: "absolute",
          width: 100,
          height: 100,
          borderRadius: 50,
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.7)",
          left: "50%",
          top: "50%",
          transform: [{ translateX: -50 }, { translateY: -50 }],
        }}
      />

      {/* PONTO CENTRAL */}

      <View
        style={{
          position: "absolute",
          width: 6,
          height: 6,
          borderRadius: 3,
          backgroundColor: "#FFFFFF",
          left: "50%",
          top: "50%",
          transform: [{ translateX: -3 }, { translateY: -3 }],
        }}
      />

      {/* ÁREA SUPERIOR */}

      <View
        style={{
          position: "absolute",
          top: margem,
          left: "25%",
          width: "50%",
          height: 70,
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.7)",
        }}
      />

      <View
        style={{
          position: "absolute",
          top: margem,
          left: "37.5%",
          width: "25%",
          height: 30,
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.7)",
        }}
      />

      {/* ÁREA INFERIOR */}

      <View
        style={{
          position: "absolute",
          bottom: margem,
          left: "25%",
          width: "50%",
          height: 70,
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.7)",
        }}
      />

      <View
        style={{
          position: "absolute",
          bottom: margem,
          left: "37.5%",
          width: "25%",
          height: 30,
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.7)",
        }}
      />

      {/* JOGADORES */}

      {jogadores.map((jogador) => (
        <JogadorCampo
          key={`${jogador.n}-${jogador.nome}`}
          jogador={jogador}
        />
      ))}
    </View>
  );
}

// =========================================================
// TELA DETALHES DOS JOGOS
// =========================================================

export function DetalhesJogos({ route, navigation }) {
  const { cores } = useTheme();
  const jogo = PARTIDA;

  const [abaSelecionada, setAbaSelecionada] = useState("Detalhes");
  const [equipeEscalacao, setEquipeEscalacao] = useState("mandante");
  const [tipoEscalacao, setTipoEscalacao] = useState("titulares");

  // ACERTE A ESCALAÇÃO

  const [desafios, setDesafios] = useState({
    mandante: {
      selecionados: [],
      confirmado: false,
    },
    visitante: {
      selecionados: [],
      confirmado: false,
    },
  });

  const abas = [
    { nome: "Detalhes", icone: ChartBarIcon },
    { nome: "Escalação", icone: UsersThreeIcon },
    { nome: "Tempo Real", icone: ClockIcon },
    { nome: "Classificação", icone: TrophyIcon },
  ];

  const formatarData = (data) => {
    if (!data) return "--";

    const dataObj = new Date(data);

    if (isNaN(dataObj.getTime())) return "--";

    return dataObj.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const formatarHorario = (data) => {
    if (!data) return "--:--";

    const dataObj = new Date(data);

    if (isNaN(dataObj.getTime())) return "--:--";

    return dataObj.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const corStatus =
    jogo.status === "FT"
      ? cores.textSecondary
      : cores.primary;

  // =======================================================
  // FUNÇÕES DO ACERTE A ESCALAÇÃO
  // =======================================================

  const desafioAtual = desafios[equipeEscalacao];

  const alternarJogadorDesafio = (jogador) => {
    const idJogador = `${jogador.n}-${jogador.nome}`;

    setDesafios((atual) => {
      const desafio = atual[equipeEscalacao];

      if (desafio.confirmado) return atual;

      const jaSelecionado = desafio.selecionados.includes(idJogador);

      if (jaSelecionado) {
        return {
          ...atual,
          [equipeEscalacao]: {
            ...desafio,
            selecionados: desafio.selecionados.filter(
              (id) => id !== idJogador
            ),
          },
        };
      }

      if (desafio.selecionados.length >= 11) {
        return atual;
      }

      return {
        ...atual,
        [equipeEscalacao]: {
          ...desafio,
          selecionados: [
            ...desafio.selecionados,
            idJogador,
          ],
        },
      };
    });
  };

  const confirmarDesafio = () => {
    if (desafioAtual.selecionados.length !== 11) return;

    setDesafios((atual) => ({
      ...atual,
      [equipeEscalacao]: {
        ...atual[equipeEscalacao],
        confirmado: true,
      },
    }));
  };

  const reiniciarDesafio = () => {
    setDesafios((atual) => ({
      ...atual,
      [equipeEscalacao]: {
        selecionados: [],
        confirmado: false,
      },
    }));
  };

  const calcularAcertos = () => {
    const equipe = jogo.escalacoes[equipeEscalacao];

    const titularesCorretos = equipe.titulares.map(
      (jogador) => `${jogador.n}-${jogador.nome}`
    );

    return desafioAtual.selecionados.filter((jogador) =>
      titularesCorretos.includes(jogador)
    ).length;
  };

  const calcularXP = () => {
    const acertos = calcularAcertos();

    return acertos * 1000 + (acertos === 11 ? 5000 : 0);
  };

  // =======================================================
  // ABA DETALHES
  // =======================================================

  const renderDetalhes = () => (
    <View className="gap-4">
      {/* EVENTOS */}

      <EventosPartida jogo={jogo} />

      {/* ESTATÍSTICAS */}

      <Card>
        <TituloSecao
          titulo="Estatísticas"
          subtitulo="Comparativo entre as equipes"
          icone={ChartBarIcon}
        />

        <View className="flex-row justify-between mb-5">
          <Text
            className="text-xs font-bold"
            style={{ color: cores.primary }}
          >
            {jogo.mandante}
          </Text>

          <Text
            className="text-xs font-bold"
            style={{ color: cores.warning }}
          >
            {jogo.visitante}
          </Text>
        </View>

        <Estatistica titulo="Posse de bola" valores={jogo.estatisticas.posse} />
        <Estatistica titulo="Finalizações" valores={jogo.estatisticas.finalizacoes} />
        <Estatistica titulo="No gol" valores={jogo.estatisticas.chutesGol} />
        <Estatistica titulo="Escanteios" valores={jogo.estatisticas.escanteios} />
        <Estatistica titulo="Faltas" valores={jogo.estatisticas.faltas} />
        <Estatistica titulo="Cartões amarelos" valores={jogo.estatisticas.amarelos} />

        <View className="flex-row items-center justify-center mt-1">
          <View
            className="w-2 h-2 rounded-full mr-2"
            style={{ backgroundColor: cores.primary }}
          />

          <Text
            className="text-[10px]"
            style={{ color: cores.textTertiary }}
          >
            Melhor resultado na estatística
          </Text>
        </View>
      </Card>

      {/* INFORMAÇÕES DA PARTIDA */}

      <Card>
        <TituloSecao
          titulo="Informações da partida"
          subtitulo="Dados do confronto"
          icone={SoccerBallIcon}
        />

        <View
          className="rounded-xl p-3 mb-3"
          style={{ backgroundColor: cores.surfaceSecondary }}
        >
          <Text
            className="text-[10px] font-bold mb-1"
            style={{ color: cores.textTertiary }}
          >
            COMPETIÇÃO
          </Text>

          <Text
            className="font-bold text-base"
            style={{ color: cores.text }}
          >
            {jogo.competicao}
          </Text>

          <Text
            className="text-sm mt-1"
            style={{ color: cores.primary }}
          >
            {jogo.fase}
          </Text>
        </View>

        <View className="flex-row mb-3">
          <View
            className="flex-1 rounded-xl p-3 mr-2"
            style={{ backgroundColor: cores.surfaceSecondary }}
          >
            <ClockIcon size={18} color={cores.primary} />

            <Text
              className="text-[10px] mt-2"
              style={{ color: cores.textTertiary }}
            >
              DATA
            </Text>

            <Text
              className="text-xs font-semibold mt-1"
              style={{ color: cores.text }}
            >
              {formatarData(jogo.data)}
            </Text>

            <Text
              className="text-xs mt-1"
              style={{ color: cores.textSecondary }}
            >
              {formatarHorario(jogo.data)}
            </Text>
          </View>

          <View
            className="flex-1 rounded-xl p-3 ml-2"
            style={{ backgroundColor: cores.surfaceSecondary }}
          >
            <MapPinIcon size={18} color={cores.primary} />

            <Text
              className="text-[10px] mt-2"
              style={{ color: cores.textTertiary }}
            >
              ESTÁDIO
            </Text>

            <Text
              className="text-xs font-semibold mt-1"
              style={{ color: cores.text }}
            >
              {jogo.estadio}
            </Text>

            <Text
              className="text-xs mt-1"
              style={{ color: cores.textSecondary }}
            >
              {jogo.cidade}
            </Text>
          </View>
        </View>

        <View
          className="rounded-xl p-3"
          style={{ backgroundColor: cores.surfaceSecondary }}
        >
          <Text
            className="text-[10px] font-bold mb-1"
            style={{ color: cores.textTertiary }}
          >
            ARBITRAGEM
          </Text>

          <Text
            className="text-sm font-semibold"
            style={{ color: cores.text }}
          >
            {jogo.arbitro}
          </Text>
        </View>

        <View
          className="rounded-xl p-3 mt-3"
          style={{ backgroundColor: cores.surfaceSecondary }}
        >
          <Text
            className="text-[10px] font-bold mb-1"
            style={{ color: cores.textTertiary }}
          >
            PÚBLICO
          </Text>

          <Text
            className="text-sm font-semibold"
            style={{ color: cores.text }}
          >
            {jogo.publico}
          </Text>
        </View>
      </Card>
  </View>
);

  // =======================================================
  // CARD: ACERTE A ESCALAÇÃO
  // =======================================================

  const renderDesafioEscalacao = (equipe) => {
    const selecionados = desafioAtual.selecionados;
    const confirmado = desafioAtual.confirmado;
    const acertos = calcularAcertos();
    const xp = calcularXP();

    const listaJogadores = [
      ...equipe.titulares,
      ...equipe.reservas,
    ];

    return (
      <Card>
        <TituloSecao
          titulo="Acerte a Escalação"
          subtitulo="Você conhece os 11 titulares dessa partida?"
          icone={TrophyIcon}
        />

        {/* RECOMPENSA */}

        <View
          className="rounded-xl p-3 mb-4 flex-row items-center justify-between"
          style={{ backgroundColor: cores.surfaceSecondary }}
        >
          <View>
            <Text
              className="text-xs font-bold"
              style={{ color: cores.textTertiary }}
            >
              RECOMPENSA MÁXIMA
            </Text>

            <Text className="text-[#FFC107] font-extrabold text-lg mt-1">
              16.000 XP
            </Text>

            <Text
              className="text-[10px] mt-1"
              style={{ color: cores.textTertiary }}
            >
              1.000 XP por acerto + bônus de 5.000 XP
            </Text>
          </View>

          <View className="rounded-xl p-3 bg-[#FFC107]/10">
            <TrophyIcon size={25} color="#FFC107" weight="fill" />
          </View>
        </View>

        <Text
          className="text-xs mb-3"
          style={{ color: cores.textSecondary }}
        >
          Selecione os 11 jogadores que começarão a partida.
          Você pode escolher entre titulares e reservas.
        </Text>

        {/* PROGRESSO */}

        <View className="flex-row items-center justify-between mb-2">
          <Text
            className="font-bold text-sm"
            style={{ color: cores.text }}
          >
            Sua escalação
          </Text>

          <Text
            className="text-sm font-extrabold"
            style={{ color: cores.primary }}
          >
            {selecionados.length}/11
          </Text>
        </View>

        <View
          className="h-2 rounded-full overflow-hidden mb-4"
          style={{ backgroundColor: cores.border }}
        >
          <View
            className="h-full rounded-full"
            style={{
              width: `${(selecionados.length / 11) * 100}%`,
              backgroundColor: cores.primary,
            }}
          />
        </View>

        {/* LISTA DE JOGADORES */}

        {listaJogadores.map((jogador) => {
          const idJogador = `${jogador.n}-${jogador.nome}`;
          const selecionado = selecionados.includes(idJogador);

          const titular = equipe.titulares.some(
            (item) => `${item.n}-${item.nome}` === idJogador
          );

          const acertou = confirmado && titular && selecionado;

          return (
            <Pressable
              key={idJogador}
              onPress={() => alternarJogadorDesafio(jogador)}
              disabled={confirmado}
              className="flex-row items-center rounded-xl p-3 mb-2 border"
              style={{
                backgroundColor: selecionado
                  ? `${cores.primary}15`
                  : cores.surfaceSecondary,
                borderColor: selecionado
                  ? cores.primary
                  : cores.border,
              }}
            >
              <View
                className="w-9 h-9 rounded-xl items-center justify-center mr-3"
                style={{
                  backgroundColor: selecionado
                    ? cores.primary
                    : cores.border,
                }}
              >
                <Text
                  className="font-extrabold text-xs"
                  style={{
                    color: selecionado
                      ? cores.background
                      : cores.textSecondary,
                  }}
                >
                  {jogador.n}
                </Text>
              </View>

              <View className="flex-1">
                <Text
                  className="font-bold text-sm"
                  style={{
                    color: selecionado
                      ? cores.text
                      : cores.textSecondary,
                  }}
                >
                  {jogador.nome}
                </Text>

                <Text
                  className="text-xs mt-1"
                  style={{ color: cores.textTertiary }}
                >
                  {jogador.pos}
                </Text>
              </View>

              <View
                className="w-6 h-6 rounded-full border items-center justify-center"
                style={{
                  backgroundColor: selecionado
                    ? cores.primary
                    : "transparent",
                  borderColor: selecionado
                    ? cores.primary
                    : cores.border,
                }}
              >
                {selecionado ? (
                  <Text
                    className="text-xs font-extrabold"
                    style={{ color: cores.background }}
                  >
                    ✓
                  </Text>
                ) : null}
              </View>

              {confirmado ? (
                <View className="ml-2">
                  {acertou ? (
                    <Text className="text-[#00C853] text-xs font-extrabold">
                      ✓
                    </Text>
                  ) : selecionado && !titular ? (
                    <Text className="text-[#E53935] text-xs font-extrabold">
                      ✕
                    </Text>
                  ) : null}
                </View>
              ) : null}
            </Pressable>
          );
        })}

        {/* RESULTADO */}

        {confirmado ? (
          <View
            className="rounded-xl p-4 mt-3 border"
            style={{
              backgroundColor: cores.surfaceSecondary,
              borderColor: `${cores.primary}30`,
            }}
          >
            <View className="items-center">
              <View className="w-14 h-14 rounded-full bg-[#FFC107]/10 items-center justify-center mb-3">
                <TrophyIcon size={28} color="#FFC107" weight="fill" />
              </View>

              <Text className="text-[#00C853] font-extrabold text-xl text-center">
                {acertos}/11 acertos
              </Text>

              <Text
                className="text-xs text-center mt-2"
                style={{ color: cores.textSecondary }}
              >
                {acertos === 11
                  ? "Perfeito! Você acertou todos os titulares!"
                  : acertos >= 7
                  ? "Mandou muito bem! Você conhece bastante esse time."
                  : acertos >= 4
                  ? "Bom resultado! Você acertou alguns titulares."
                  : "Desafio concluído! Continue acompanhando o futebol."}
              </Text>

              <View
                className="w-full mt-4 pt-4 border-t"
                style={{ borderColor: cores.border }}
              >
                <Text
                  className="text-xs text-center"
                  style={{ color: cores.textTertiary }}
                >
                  EXPERIÊNCIA CONQUISTADA
                </Text>

                <Text className="text-[#FFC107] font-extrabold text-2xl text-center mt-1">
                  +{xp} XP
                </Text>

                {acertos === 11 ? (
                  <Text className="text-[#00C853] font-bold text-xs text-center mt-2">
                    Bônus de 5.000 XP por escalação perfeita!
                  </Text>
                ) : null}
              </View>
            </View>
          </View>
        ) : null}

        {/* BOTÕES */}

        {!confirmado ? (
          <Pressable
            onPress={confirmarDesafio}
            disabled={selecionados.length !== 11}
            className="rounded-xl py-4 items-center mt-3"
            style={{
              backgroundColor:
                selecionados.length === 11
                  ? cores.primary
                  : cores.border,
            }}
          >
            <Text
              className="font-extrabold text-sm"
              style={{
                color:
                  selecionados.length === 11
                    ? cores.background
                    : cores.textTertiary,
              }}
            >
              {selecionados.length === 11
                ? "Confirmar escalação"
                : `Selecione mais ${11 - selecionados.length} jogadores`}
            </Text>
          </Pressable>
        ) : (
          <Pressable
            onPress={reiniciarDesafio}
            className="rounded-xl py-4 items-center mt-3 border"
            style={{
              backgroundColor: cores.surfaceSecondary,
              borderColor: cores.border,
            }}
          >
            <Text
              className="font-bold text-sm"
              style={{ color: cores.text }}
            >
              Tentar novamente
            </Text>
          </Pressable>
        )}
      </Card>
    );
  };

  // =======================================================
  // ABA ESCALAÇÃO
  // =======================================================

  const renderEscalacao = () => {
    const equipe = jogo.escalacoes[equipeEscalacao];

    const jogadores =
      tipoEscalacao === "titulares"
        ? equipe.titulares
        : equipe.reservas;

    const nomeEquipe =
      equipeEscalacao === "mandante"
        ? jogo.mandante
        : jogo.visitante;

    return (
      <View className="gap-4">
        {/* ESCOLHA DA EQUIPE */}

        <View
          className="flex-row rounded-2xl border p-1"
          style={{
            backgroundColor: cores.surface,
            borderColor: cores.border,
          }}
        >
          {["mandante", "visitante"].map((time) => {
            const selecionado = equipeEscalacao === time;

            const nome =
              time === "mandante"
                ? jogo.mandante
                : jogo.visitante;

            return (
              <Pressable
                key={time}
                onPress={() => {
                  setEquipeEscalacao(time);
                  setTipoEscalacao("titulares");
                }}
                className="flex-1 rounded-xl py-3 items-center"
                style={{
                  backgroundColor: selecionado
                    ? cores.primary
                    : "transparent",
                }}
              >
                <Text
                  className="text-xs font-bold"
                  style={{
                    color: selecionado
                      ? cores.background
                      : cores.textSecondary,
                  }}
                >
                  {nome}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* FORMAÇÃO */}

        <View
          className="border rounded-2xl p-4 flex-row justify-between items-center"
          style={{
            backgroundColor: cores.surface,
            borderColor: cores.border,
          }}
        >
          <View>
            <Text
              className="text-xs"
              style={{ color: cores.textTertiary }}
            >
              FORMAÇÃO TÁTICA
            </Text>

            <Text
              className="text-base font-bold mt-1"
              style={{ color: cores.text }}
            >
              {nomeEquipe}
            </Text>
          </View>

          <View className="bg-[#00C853]/10 rounded-xl px-4 py-2">
            <Text className="text-[#00C853] text-lg font-extrabold">
              {equipe.formacao}
            </Text>
          </View>
        </View>

        {/* SELETOR */}

        <View
          className="flex-row border rounded-xl p-1"
          style={{
            backgroundColor: cores.surface,
            borderColor: cores.border,
          }}
        >
          {[
            { id: "titulares", nome: "Titulares" },
            { id: "reservas", nome: "Reservas" },
          ].map((tipo) => {
            const ativo = tipoEscalacao === tipo.id;

            return (
              <Pressable
                key={tipo.id}
                onPress={() => setTipoEscalacao(tipo.id)}
                className="flex-1 py-3 rounded-lg items-center"
                style={{
                  backgroundColor: ativo
                    ? cores.surfaceSecondary
                    : "transparent",
                }}
              >
                <Text
                  className="text-xs font-bold"
                  style={{
                    color: ativo
                      ? cores.text
                      : cores.textTertiary,
                  }}
                >
                  {tipo.nome}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* CAMPO */}

        {tipoEscalacao === "titulares" ? (
          <Card>
            <TituloSecao
              titulo="Campo"
              subtitulo={`Titulares • ${equipe.formacao}`}
              icone={SoccerBallIcon}
            />

            <CampoFutebol jogadores={equipe.titulares} />
          </Card>
        ) : null}

        {/* ACERTE A ESCALAÇÃO */}

        {renderDesafioEscalacao(equipe)}

        {/* LISTA */}

        <Card>
          <TituloSecao
            titulo={
              tipoEscalacao === "titulares"
                ? "Titulares"
                : "Banco de reservas"
            }
            subtitulo={`${jogadores.length} jogadores`}
            icone={UsersThreeIcon}
          />

          {jogadores.map((jogador, index) => (
            <View
              key={`${jogador.n}-${jogador.nome}`}
              className="flex-row items-center py-3"
              style={{
                borderBottomWidth:
                  index !== jogadores.length - 1 ? 1 : 0,
                borderColor: cores.border,
              }}
            >
              <View
                className="w-10 h-10 rounded-xl border items-center justify-center mr-3"
                style={{
                  backgroundColor: cores.surfaceSecondary,
                  borderColor: cores.border,
                }}
              >
                <Text
                  className="font-extrabold text-sm"
                  style={{ color: cores.primary }}
                >
                  {jogador.n}
                </Text>
              </View>

              <View className="flex-1">
                <Text
                  className="font-semibold text-sm"
                  style={{ color: cores.text }}
                >
                  {jogador.nome}
                </Text>

                <Text
                  className="text-xs mt-1"
                  style={{ color: cores.textTertiary }}
                >
                  {jogador.pos}
                </Text>
              </View>

              <CaretRightIcon
                size={16}
                color={cores.textTertiary}
              />
            </View>
          ))}
        </Card>
      </View>
    );
  };

  // =======================================================
  // ABA TEMPO REAL
  // =======================================================

  const renderTempoReal = () => {
    const converterMinuto = (minuto) => {
      const texto = String(minuto ?? "0").replace("'", "").trim();
      const [base, acrescimo] = texto.split("+");

      return (Number(base) || 0) + (Number(acrescimo) || 0);
    };

    const eventos = [...jogo.eventos].sort(
      (a, b) =>
        converterMinuto(b.minuto) - converterMinuto(a.minuto)
    );

    const iconeEvento = (evento) => {
      if (evento.tipo === "gol") return "⚽";

      if (evento.tipo === "cartao") {
        return evento.cartao === "vermelho" ? "🟥" : "🟨";
      }

      if (evento.tipo === "substituicao") return "🔄";

      return "•";
    };

    return (
      <Card>
        <TituloSecao
          titulo="Tempo Real"
          subtitulo="Principais acontecimentos"
          icone={ClockIcon}
        />

        {/* PLACAR */}

        <View
          className="rounded-xl p-3 flex-row items-center justify-center mb-5"
          style={{ backgroundColor: cores.surfaceSecondary }}
        >
          <Text
            className="font-bold text-xs"
            style={{ color: cores.text }}
          >
            {jogo.mandante}
          </Text>

          <Text
            className="text-lg font-extrabold mx-3"
            style={{ color: cores.primary }}
          >
            {jogo.gols_mandante} - {jogo.gols_visitante}
          </Text>

          <Text
            className="font-bold text-xs"
            style={{ color: cores.text }}
          >
            {jogo.visitante}
          </Text>
        </View>

        {eventos.map((evento, index) => (
          <View
            key={`${evento.minuto}-${evento.tipo}-${index}`}
            className="flex-row"
          >
            {/* MINUTO */}

            <View className="w-12 items-center">
              <Text
                className="font-extrabold text-xs"
                style={{ color: cores.primary }}
              >
                {evento.minuto}'
              </Text>

              {index !== eventos.length - 1 ? (
                <View
                  className="w-[2px] flex-1 my-2"
                  style={{ backgroundColor: cores.border }}
                />
              ) : null}
            </View>

            {/* EVENTO */}

            <View className="flex-1 flex-row pb-5">
              <View
                className="w-10 h-10 rounded-xl border items-center justify-center"
                style={{
                  backgroundColor: cores.surfaceSecondary,
                  borderColor: cores.border,
                }}
              >
                <Text>{iconeEvento(evento)}</Text>
              </View>

              <View className="flex-1 ml-3">
                <Text
                  className="font-bold text-sm"
                  style={{ color: cores.text }}
                >
                  {evento.jogador || evento.entrou || "Evento"}
                </Text>

                {evento.assistencia ? (
                  <Text
                    className="text-xs mt-1"
                    style={{ color: cores.textTertiary }}
                  >
                    Assistência: {evento.assistencia}
                  </Text>
                ) : null}

                {evento.saiu ? (
                  <Text
                    className="text-xs mt-1"
                    style={{ color: cores.textSecondary }}
                  >
                    Saiu: {evento.saiu}
                  </Text>
                ) : null}

                <Text
                  className="text-xs mt-1"
                  style={{ color: cores.textSecondary }}
                >
                  {evento.descricao ||
                    (evento.tipo === "gol"
                      ? "Gol"
                      : evento.tipo === "cartao"
                      ? `Cartão ${evento.cartao || "recebido"}`
                      : "Substituição")}
                </Text>

                <Text
                  className="text-xs mt-1"
                  style={{ color: cores.textTertiary }}
                >
                  {evento.equipe}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </Card>
    );
  };

  // =======================================================
  // ABA CLASSIFICAÇÃO
  // =======================================================

  const renderClassificacao = () => (
    <Card className="p-0 overflow-hidden">
      <View className="p-4">
        <TituloSecao
          titulo="Brasileirão Série A"
          subtitulo="Classificação fictícia"
          icone={TrophyIcon}
        />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View>
          {/* CABEÇALHO */}

          <View
            className="flex-row px-3 py-3"
            style={{ backgroundColor: cores.surfaceSecondary }}
          >
            {[
              ["#", 30],
              ["CLUBE", 130],
              ["PTS", 38],
              ["J", 32],
              ["V", 32],
              ["E", 32],
              ["D", 32],
              ["SG", 38],
            ].map(([titulo, largura]) => (
              <Text
                key={titulo}
                className="text-[10px] font-extrabold text-center"
                style={{
                  width: largura,
                  color: cores.textTertiary,
                }}
              >
                {titulo}
              </Text>
            ))}
          </View>

          {/* CLUBES */}

          {jogo.classificacao.map((time) => {
            const destaque =
              time.equipe === jogo.mandante ||
              time.equipe === jogo.visitante;

            return (
              <View
                key={time.pos}
                className="flex-row items-center px-3 py-3 border-b"
                style={{
                  borderColor: cores.border,
                  backgroundColor: destaque
                    ? cores.surfaceSecondary
                    : cores.surface,
                }}
              >
                <View className="w-[30px] items-center">
                  <Text
                    className="text-xs font-bold"
                    style={{
                      color: destaque
                        ? cores.primary
                        : cores.textSecondary,
                    }}
                  >
                    {time.pos}
                  </Text>
                </View>

                <View className="w-[130px]">
                  <Text
                    numberOfLines={1}
                    className="text-xs font-semibold"
                    style={{
                      color: destaque
                        ? cores.text
                        : cores.textSecondary,
                    }}
                  >
                    {time.equipe}
                  </Text>
                </View>

                {[time.pts, time.j, time.v, time.e, time.d, time.sg].map(
                  (valor, index) => (
                    <Text
                      key={index}
                      className="text-xs text-center"
                      style={{
                        width: [38, 32, 32, 32, 32, 38][index],
                        color:
                          index === 0
                            ? cores.text
                            : cores.textSecondary,
                        fontWeight: index === 0 ? "800" : "400",
                      }}
                    >
                      {valor}
                    </Text>
                  )
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>

      <View className="p-3">
        <Text
          className="text-[10px]"
          style={{ color: cores.textTertiary }}
        >
          PTS: Pontos • J: Jogos • V: Vitórias • E: Empates • D: Derrotas • SG: Saldo
        </Text>
      </View>
    </Card>
  );

  // =======================================================
  // CONTEÚDO DAS ABAS
  // =======================================================

  const renderConteudoAba = () => {
    switch (abaSelecionada) {
      case "Detalhes":
        return renderDetalhes();

      case "Escalação":
        return renderEscalacao();

      case "Tempo Real":
        return renderTempoReal();

      case "Classificação":
        return renderClassificacao();

      default:
        return null;
    }
  };

  // =======================================================
  // RENDER PRINCIPAL
  // =======================================================

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: cores.background }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 35 }}
      >
        {/* HEADER */}

        <View className="flex-row items-center px-5 pt-3 pb-5">
          <Pressable
            onPress={() => navigation.goBack()}
            className="w-10 h-10 rounded-xl border items-center justify-center"
            style={{
              backgroundColor: cores.surfaceSecondary,
              borderColor: cores.border,
            }}
          >
            <ArrowLeftIcon
              size={20}
              color={cores.icon}
              weight="bold"
            />
          </Pressable>

          <View className="flex-1 ml-3">
            <Text
              className="text-lg font-extrabold"
              style={{ color: cores.text }}
            >
              Central da Partida
            </Text>

            <Text
              className="text-xs mt-1"
              style={{ color: cores.textSecondary }}
            >
              Informações completas do confronto
            </Text>
          </View>

          <View
            className="w-10 h-10 rounded-xl items-center justify-center"
            style={{ backgroundColor: `${cores.primary}15` }}
          >
            <SoccerBallIcon
              size={21}
              color={cores.primary}
              weight="bold"
            />
          </View>
        </View>

        {/* CARD PRINCIPAL */}

        <View
          className="mx-4 border rounded-3xl p-5"
          style={{
            backgroundColor: cores.surface,
            borderColor: cores.border,
          }}
        >
          {/* COMPETIÇÃO */}

          <View className="items-center mb-6">
            {jogo.logo_competicao ? (
              <Image
                source={{ uri: jogo.logo_competicao }}
                resizeMode="contain"
                className="w-10 h-10 mb-2"
              />
            ) : (
              <View
                className="w-10 h-10 rounded-xl items-center justify-center mb-2"
                style={{ backgroundColor: `${cores.primary}15` }}
              >
                <TrophyIcon
                  size={20}
                  color={cores.primary}
                  weight="bold"
                />
              </View>
            )}

            <Text
              className="text-sm font-bold"
              style={{ color: cores.text }}
            >
              {jogo.competicao}
            </Text>

            <View
              className="rounded-full px-3 py-1 mt-2 border"
              style={{
                backgroundColor: cores.surfaceSecondary,
                borderColor: cores.border,
              }}
            >
              <Text
                className="text-[10px] font-bold"
                style={{ color: cores.primary }}
              >
                {jogo.fase}
              </Text>
            </View>
          </View>

          {/* TIMES / PLACAR */}

          <View className="flex-row items-center">
            {/* MANDANTE */}

            <View className="flex-1 items-center">
              <LogoTime
                logo={jogo.logo_mandante}
                nome={jogo.mandante}
                tamanho={74}
              />

              <Text
                className="text-sm font-extrabold text-center mt-2"
                style={{ color: cores.text }}
                numberOfLines={2}
              >
                {jogo.mandante}
              </Text>

              <Text
                className="text-[10px] mt-1"
                style={{ color: cores.textTertiary }}
              >
                MANDANTE
              </Text>
            </View>

            {/* PLACAR */}

            <View className="items-center px-1">
              <Text
                className="text-4xl font-extrabold tracking-wider"
                style={{ color: cores.text }}
              >
                {jogo.gols_mandante}
                <Text style={{ color: cores.primary }}> - </Text>
                {jogo.gols_visitante}
              </Text>

              <View
                className="rounded-full px-3 py-1 mt-3"
                style={{ backgroundColor: `${corStatus}20` }}
              >
                <Text
                  className="text-[10px] font-extrabold"
                  style={{ color: corStatus }}
                >
                  {jogo.status_descricao}
                </Text>
              </View>

              <View className="flex-row items-center mt-3">
                <ClockIcon
                  size={13}
                  color={cores.textTertiary}
                />

                <Text
                  className="text-xs ml-1"
                  style={{ color: cores.textSecondary }}
                >
                  {formatarHorario(jogo.data)}
                </Text>
              </View>
            </View>

            {/* VISITANTE */}

            <View className="flex-1 items-center">
              <LogoTime
                logo={jogo.logo_visitante}
                nome={jogo.visitante}
                tamanho={74}
              />

              <Text
                className="text-sm font-extrabold text-center mt-2"
                style={{ color: cores.text }}
                numberOfLines={2}
              >
                {jogo.visitante}
              </Text>

              <Text
                className="text-[10px] mt-1"
                style={{ color: cores.textTertiary }}
              >
                VISITANTE
              </Text>
            </View>
          </View>

          {/* DATA */}

          <View
            className="border-t mt-5 pt-4"
            style={{ borderColor: cores.border }}
          >
            <View className="flex-row items-center justify-center">
              <ClockIcon size={15} color={cores.primary} />

              <Text
                className="text-xs ml-2"
                style={{ color: cores.textSecondary }}
              >
                {formatarData(jogo.data)}
              </Text>
            </View>
          </View>

          {/* ESTÁDIO */}

          <View
            className="rounded-xl p-3 mt-3 flex-row items-center justify-center"
            style={{ backgroundColor: cores.surfaceSecondary }}
          >
            <MapPinIcon size={17} color={cores.primary} />

            <View className="ml-2">
              <Text
                className="text-xs font-bold text-center"
                style={{ color: cores.text }}
              >
                {jogo.estadio}
              </Text>

              <Text
                className="text-[10px] text-center mt-1"
                style={{ color: cores.textTertiary }}
              >
                {jogo.cidade}
              </Text>
            </View>
          </View>
        </View>

        {/* ABAS */}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
            marginTop: 22,
          }}
        >
          {abas.map(({ nome, icone: Icon }) => {
            const selecionada = abaSelecionada === nome;

            return (
              <Pressable
                key={nome}
                onPress={() => setAbaSelecionada(nome)}
                className="mr-2 flex-row items-center rounded-xl px-4 py-3 border"
                style={{
                  backgroundColor: selecionada
                    ? cores.primary
                    : cores.surface,
                  borderColor: selecionada
                    ? cores.primary
                    : cores.border,
                }}
              >
                <Icon
                  size={17}
                  color={
                    selecionada
                      ? cores.background
                      : cores.icon
                  }
                  weight="bold"
                />

                <Text
                  className="text-xs font-bold ml-2"
                  style={{
                    color: selecionada
                      ? cores.background
                      : cores.textSecondary,
                  }}
                >
                  {nome}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* CONTEÚDO */}

        <View className="px-4 mt-5">
          {renderConteudoAba()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}