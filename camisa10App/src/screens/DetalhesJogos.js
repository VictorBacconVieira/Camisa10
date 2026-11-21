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

// =========================================================
// PALETA CAMISA10
// =========================================================

const CORES = {
  fundo: "#071018",
  card: "#111D27",
  card2: "#16232D",
  borda: "#26343E",
  verde: "#00C853",
  verdeClaro: "#39FF14",
  texto: "#F5F7F8",
  secundario: "#A8B2B9",
  terciario: "#6F7B83",
  amarelo: "#FFC107",
  vermelho: "#E53935",
};

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
  return (
    <View
      className={`bg-[#111D27] border border-[#26343E] rounded-2xl p-4 ${className}`}
    >
      {children}
    </View>
  );
}

// =========================================================
// COMPONENTE: TÍTULO DE SEÇÃO
// =========================================================

function TituloSecao({ titulo, subtitulo, icone: Icon }) {
  return (
    <View className="flex-row items-center mb-4">
      {Icon ? (
        <View className="w-10 h-10 rounded-xl bg-[#00C853]/10 items-center justify-center mr-3">
          <Icon size={21} color="#00C853" weight="bold" />
        </View>
      ) : null}

      <View className="flex-1">
        <Text className="text-[#F5F7F8] text-base font-bold">
          {titulo}
        </Text>

        {subtitulo ? (
          <Text className="text-[#6F7B83] text-xs mt-1">
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
          className="rounded-full bg-[#26343E] border border-[#344652] items-center justify-center"
          style={{
            width: tamanho - 8,
            height: tamanho - 8,
          }}
        >
          <Text className="text-[#00C853] text-xl font-extrabold">
            {nome?.substring(0, 3).toUpperCase()}
          </Text>
        </View>
      )}
    </View>
  );
}

// =========================================================
// COMPONENTE: ESTATÍSTICA
// BARRA PROPORCIONAL + DESTAQUE DE MELHOR RESULTADO
// =========================================================

function Estatistica({ titulo, valores }) {
  const [mandante, visitante] = valores;

  const total = mandante + visitante || 1;
  const porcentagemMandante = (mandante / total) * 100;
  const porcentagemVisitante = (visitante / total) * 100;

  // Em faltas e cartões, menor quantidade é melhor.
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
          className={`text-sm font-extrabold ${
            mandanteMelhor || empate
              ? "text-[#00C853]"
              : "text-[#F5F7F8]"
          }`}
        >
          {mandante}
        </Text>

        <Text className="text-[#A8B2B9] text-xs text-center">
          {titulo}
        </Text>

        <Text
          className={`text-sm font-extrabold ${
            visitanteMelhor || empate
              ? "text-[#00C853]"
              : "text-[#F5F7F8]"
          }`}
        >
          {visitante}
        </Text>
      </View>

      {/* BARRA PROPORCIONAL */}

      <View
        className="flex-row h-3 rounded-full overflow-hidden"
        style={{ backgroundColor: "#26343E" }}
      >
        <View
          style={{
            width: `${porcentagemMandante}%`,
            backgroundColor: "#00C853",
          }}
        />

        <View
          style={{
            width: `${porcentagemVisitante}%`,
            backgroundColor: "#FFC107",
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
  if (evento.tipo === "gol") {
    return (
      <View className="w-8 h-8 items-center justify-center">
        <SoccerBallIcon size={22} color="#F5F7F8" weight="fill" />
      </View>
    );
  }

  if (evento.tipo === "cartao") {
    const vermelho = evento.cartao === "vermelho";

    return (
      <View
        className={`w-5 h-7 rounded-sm ${
          vermelho ? "bg-[#E53935]" : "bg-[#FFC107]"
        }`}
      />
    );
  }

  if (evento.tipo === "substituicao") {
    return (
      <View className="items-center justify-center">
        <Text className="text-[#00C853] text-lg font-extrabold">↑</Text>
        <Text className="text-[#E53935] text-lg font-extrabold -mt-2">↓</Text>
      </View>
    );
  }

  return null;
}

// =========================================================
// COMPONENTE: TEXTO DO EVENTO
// =========================================================

function ConteudoEvento({ evento }) {
  if (evento.tipo === "gol") {
    return (
      <View>
        <Text className="text-[#F5F7F8] text-sm font-bold">
          {evento.jogador || "Autor não informado"}
        </Text>

        {evento.assistencia ? (
          <Text className="text-[#6F7B83] text-xs mt-1">
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
        <Text className="text-[#F5F7F8] text-sm font-bold">
          {evento.jogador || "Jogador não informado"}
        </Text>

        <Text
          className={`text-xs mt-1 ${
            vermelho ? "text-[#E53935]" : "text-[#FFC107]"
          }`}
        >
          Cartão {vermelho ? "vermelho" : "amarelo"}
        </Text>

        {evento.descricao ? (
          <Text className="text-[#6F7B83] text-xs mt-1">
            {evento.descricao}
          </Text>
        ) : null}
      </View>
    );
  }

  if (evento.tipo === "substituicao") {
    return (
      <View>
        <Text className="text-[#00C853] text-sm font-bold">
          {evento.entrou || evento.jogador || "Jogador"}
        </Text>

        <Text className="text-[#A8B2B9] text-sm mt-1">
          {evento.saiu || evento.substituido || "Substituição"}
        </Text>

      </View>
    );
  }

  return (
    <Text className="text-[#F5F7F8] text-sm">
      {evento.descricao || "Evento"}
    </Text>
  );
}

// =========================================================
// COMPONENTE: EVENTO NA TIMELINE
// MANDANTE ESQUERDA / VISITANTE DIREITA
// =========================================================

function LinhaEvento({ evento, lado }) {
  const ladoMandante = lado === "mandante";

  return (
    <View className="flex-row items-center min-h-[78px]">
      {/* LADO ESQUERDO */}

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

      {/* MINUTO E LINHA CENTRAL */}

      <View className="w-[54px] items-center justify-center self-stretch">
        <View className="absolute top-0 bottom-0 w-[2px] bg-[#26343E]" />

        <View className="bg-[#111D27] px-1 items-center justify-center z-10">
          <Text
            className={`text-sm font-extrabold ${
              evento.cartao === "vermelho"
                ? "text-[#E53935]"
                : "text-[#F5F7F8]"
            }`}
          >
            {evento.minuto}'
          </Text>
        </View>
      </View>

      {/* LADO DIREITO */}

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
  return (
    <View className="flex-row items-center my-4">
      <View className="flex-1 h-[1px] bg-[#26343E]" />

      <View className="bg-[#071018] border border-[#344652] rounded-full px-4 py-2 mx-2">
        <Text className="text-[#A8B2B9] text-xs font-semibold">
          {titulo}{placar ? ` • ${placar}` : ""}
        </Text>
      </View>

      <View className="flex-1 h-[1px] bg-[#26343E]" />
    </View>
  );
}

// =========================================================
// COMPONENTE: EVENTOS DA PARTIDA
// DESTAQUES / TODOS
// =========================================================


function EventosPartida({ jogo }) {
  const [abaEventos, setAbaEventos] = useState("todos");

  // FUTURO BACKEND / API:
  // Buscar eventos oficiais, minutos, atletas, assistências,
  // cartões, substituições e placar por período.

  const eventos = jogo.eventos || [];

  // Converte minutos normais e acréscimos para ordenação.
  // Ex.: 45+2 -> 47 | 90+5 -> 95
  const converterMinuto = (minuto) => {
    const texto = String(minuto ?? "0").replace("'", "").trim();
    const [base, acrescimo] = texto.split("+");

    const minutoBase = Number(base) || 0;
    const minutoAcrescimo = Number(acrescimo) || 0;

    return minutoBase + minutoAcrescimo;
  };

  // Ordena do mais recente para o mais antigo.
  const eventosOrdenados = [...eventos].sort(
    (a, b) =>
      converterMinuto(b.minuto) - converterMinuto(a.minuto)
  );

  // Destaques: gols.
  // FUTURO: incluir outros eventos importantes.
  const eventosDestaque = eventosOrdenados.filter(
    (evento) => evento.tipo === "gol"
  );

  const listaEventos =
    abaEventos === "destaques"
      ? eventosDestaque
      : eventosOrdenados;

  // Separa os eventos por tempo.
  const segundoTempo = listaEventos.filter(
    (evento) => converterMinuto(evento.minuto) > 45
  );

  const primeiroTempo = listaEventos.filter(
    (evento) => converterMinuto(evento.minuto) <= 45
  );

  // Renderiza os eventos de cada equipe na timeline.
  const renderLista = (lista) => {
    return lista.map((evento, index) => {
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
  };

  return (
    <Card className="p-0 overflow-hidden">
      {/* TÍTULO */}

      <View className="p-4 pb-3">
        <TituloSecao
          titulo="Eventos da Partida"
          subtitulo="Acompanhe os principais acontecimentos"
          icone={SoccerBallIcon}
        />
      </View>

      {/* ABAS */}

      <View className="flex-row border-b border-[#26343E]">
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
                borderBottomColor: "#00C853",
              }}
            >
              <Text
                className={`text-sm font-bold ${
                  ativa
                    ? "text-[#F5F7F8]"
                    : "text-[#6F7B83]"
                }`}
              >
                {aba.nome}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* PLACAR */}

      <View className="px-4 pt-4">
        <View className="bg-[#16232D] rounded-xl p-3 flex-row items-center justify-center">
          <Text className="text-[#F5F7F8] font-bold text-xs">
            {jogo.mandante}
          </Text>

          <Text className="text-[#00C853] text-lg font-extrabold mx-3">
            {jogo.gols_mandante} - {jogo.gols_visitante}
          </Text>

          <Text className="text-[#F5F7F8] font-bold text-xs">
            {jogo.visitante}
          </Text>
        </View>
      </View>

      {/* IDENTIFICAÇÃO DOS LADOS */}

      <View className="flex-row px-4 mt-4 mb-2">
        <View className="flex-1 items-end pr-3">
          <Text className="text-[#00C853] text-[10px] font-extrabold">
            {jogo.mandante}
          </Text>
        </View>

        <View className="w-[54px]" />

        <View className="flex-1 items-start pl-3">
          <Text className="text-[#FFC107] text-[10px] font-extrabold">
            {jogo.visitante}
          </Text>
        </View>
      </View>

      {/* TIMELINE */}

      <View className="px-2 pb-4">
        {listaEventos.length === 0 ? (
          <View className="py-10 items-center">
            <SoccerBallIcon size={30} color="#6F7B83" />

            <Text className="text-[#6F7B83] text-xs mt-3">
              Nenhum evento disponível.
            </Text>
          </View>
        ) : (
          <>
            {/* SEGUNDO TEMPO */}

            {segundoTempo.length > 0 ? (
              <>
                <SeparadorTempo
                  titulo="Fim do Jogo"
                  placar={`${jogo.gols_mandante} - ${jogo.gols_visitante}`}
                />

                {renderLista(segundoTempo)}
              </>
            ) : null}

            {/* INTERVALO */}

            {abaEventos === "todos" &&
            primeiroTempo.length > 0 &&
            segundoTempo.length > 0 ? (
              <SeparadorTempo titulo="Intervalo" />
            ) : null}

            {/* PRIMEIRO TEMPO */}

            {primeiroTempo.length > 0 ? (
              <>
                {renderLista(primeiroTempo)}
              </>
            ) : null}
          </>
        )}
      </View>

      {/* LEGENDA */}

      {abaEventos === "todos" ? (
        <View className="border-t border-[#26343E] p-3">
          <View className="flex-row justify-center flex-wrap gap-4">
            <View className="flex-row items-center">
              <View className="w-3 h-4 rounded-sm bg-[#FFC107] mr-2" />
              <Text className="text-[#6F7B83] text-[10px]">
                Amarelo
              </Text>
            </View>

            <View className="flex-row items-center">
              <View className="w-3 h-4 rounded-sm bg-[#E53935] mr-2" />
              <Text className="text-[#6F7B83] text-[10px]">
                Vermelho
              </Text>
            </View>

            <View className="flex-row items-center">
              <Text className="text-[#00C853] font-extrabold mr-1">
                ↑
              </Text>

              <Text className="text-[#6F7B83] text-[10px]">
                Entrada
              </Text>

              <Text className="text-[#E53935] font-extrabold ml-3 mr-1">
                ↓
              </Text>

              <Text className="text-[#6F7B83] text-[10px]">
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
          backgroundColor: "#00C853",
          borderWidth: 2,
          borderColor: "#FFFFFF",
          alignItems: "center",
          justifyContent: "center",
          elevation: 4,
        }}
      >
        <Text className="text-[#071018] text-[10px] font-extrabold">
          {jogador.n}
        </Text>
      </View>

      <View
        style={{
          width: 72,
          backgroundColor: "#071018",
          borderRadius: 5,
          paddingHorizontal: 4,
          paddingVertical: 3,
          marginTop: 4,
        }}
      >
        <Text
          className="text-white text-[9px] font-bold text-center"
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
              backgroundColor: faixa % 2 === 0 ? "#176B3A" : "#1D7844",
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
    jogo.status === "FT" ? CORES.secundario : CORES.verde;

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
          selecionados: [...desafio.selecionados, idJogador],
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
  // ORDEM: EVENTOS → ESTATÍSTICAS → INFORMAÇÕES
  // =======================================================

  const renderDetalhes = () => (
    <View className="gap-4">

      {/* EVENTOS DA PARTIDA */}

      <EventosPartida jogo={jogo} />

      {/* ESTATÍSTICAS */}

      <Card>
        <TituloSecao
          titulo="Estatísticas"
          subtitulo="Comparativo entre as equipes"
          icone={ChartBarIcon}
        />

        <View className="flex-row justify-between mb-5">
          <Text className="text-[#00C853] text-xs font-bold">
            {jogo.mandante}
          </Text>

          <Text className="text-[#FFC107] text-xs font-bold">
            {jogo.visitante}
          </Text>
        </View>

        <Estatistica titulo="Posse de bola" valores={jogo.estatisticas.posse} />
        <Estatistica titulo="Finalizações" valores={jogo.estatisticas.finalizacoes} />
        <Estatistica titulo="No gol" valores={jogo.estatisticas.chutesGol} />
        <Estatistica titulo="Escanteios" valores={jogo.estatisticas.escanteios} />
        <Estatistica titulo="Faltas" valores={jogo.estatisticas.faltas} />
        <Estatistica titulo="Cartões amarelos" valores={jogo.estatisticas.amarelos} />

        {/* LEGENDA */}

        <View className="flex-row items-center justify-center mt-1">
          <View className="w-2 h-2 rounded-full bg-[#00C853] mr-2" />

          <Text className="text-[#6F7B83] text-[10px]">
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

        <View className="bg-[#16232D] rounded-xl p-3 mb-3">
          <Text className="text-[#6F7B83] text-[10px] font-bold mb-1">
            COMPETIÇÃO
          </Text>

          <Text className="text-[#F5F7F8] font-bold text-base">
            {jogo.competicao}
          </Text>

          <Text className="text-[#00C853] text-sm mt-1">
            {jogo.fase}
          </Text>
        </View>

        <View className="flex-row mb-3">
          <View className="flex-1 bg-[#16232D] rounded-xl p-3 mr-2">
            <ClockIcon size={18} color="#00C853" />

            <Text className="text-[#6F7B83] text-[10px] mt-2">
              DATA
            </Text>

            <Text className="text-[#F5F7F8] text-xs font-semibold mt-1">
              {formatarData(jogo.data)}
            </Text>

            <Text className="text-[#A8B2B9] text-xs mt-1">
              {formatarHorario(jogo.data)}
            </Text>
          </View>

          <View className="flex-1 bg-[#16232D] rounded-xl p-3 ml-2">
            <MapPinIcon size={18} color="#00C853" />

            <Text className="text-[#6F7B83] text-[10px] mt-2">
              ESTÁDIO
            </Text>

            <Text className="text-[#F5F7F8] text-xs font-semibold mt-1">
              {jogo.estadio}
            </Text>

            <Text className="text-[#A8B2B9] text-xs mt-1">
              {jogo.cidade}
            </Text>
          </View>
        </View>

        <View className="bg-[#16232D] rounded-xl p-3">
          <Text className="text-[#6F7B83] text-[10px] font-bold mb-1">
            ARBITRAGEM
          </Text>

          <Text className="text-[#F5F7F8] text-sm font-semibold">
            {jogo.arbitro}
          </Text>
        </View>

        <View className="bg-[#16232D] rounded-xl p-3 mt-3">
          <Text className="text-[#6F7B83] text-[10px] font-bold mb-1">
            PÚBLICO
          </Text>

          <Text className="text-[#F5F7F8] text-sm font-semibold">
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

        <View className="bg-[#16232D] rounded-xl p-3 mb-4 flex-row items-center justify-between">
          <View>
            <Text className="text-[#6F7B83] text-xs font-bold">
              RECOMPENSA MÁXIMA
            </Text>

            <Text className="text-[#FFC107] font-extrabold text-lg mt-1">
              16.000 XP
            </Text>

            <Text className="text-[#6F7B83] text-[10px] mt-1">
              1.000 XP por acerto + bônus de 5.000 XP
            </Text>
          </View>

          <View className="bg-[#FFC107]/10 rounded-xl p-3">
            <TrophyIcon size={25} color="#FFC107" weight="fill" />
          </View>
        </View>

        <Text className="text-[#A8B2B9] text-xs mb-3">
          Selecione os 11 jogadores que começarão a partida.
          Você pode escolher entre titulares e reservas.
        </Text>

        {/* PROGRESSO */}

        <View className="flex-row items-center justify-between mb-2">
          <Text className="text-[#F5F7F8] font-bold text-sm">
            Sua escalação
          </Text>

          <Text className="text-[#00C853] font-extrabold text-sm">
            {selecionados.length}/11
          </Text>
        </View>

        <View className="h-2 bg-[#26343E] rounded-full overflow-hidden mb-4">
          <View
            className="h-full bg-[#00C853] rounded-full"
            style={{
              width: `${(selecionados.length / 11) * 100}%`,
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
              className={`flex-row items-center rounded-xl p-3 mb-2 border ${
                selecionado
                  ? "bg-[#00C853]/10 border-[#00C853]"
                  : "bg-[#16232D] border-[#26343E]"
              }`}
            >
              <View
                className={`w-9 h-9 rounded-xl items-center justify-center mr-3 ${
                  selecionado ? "bg-[#00C853]" : "bg-[#26343E]"
                }`}
              >
                <Text
                  className={`font-extrabold text-xs ${
                    selecionado
                      ? "text-[#071018]"
                      : "text-[#A8B2B9]"
                  }`}
                >
                  {jogador.n}
                </Text>
              </View>

              <View className="flex-1">
                <Text
                  className={`font-bold text-sm ${
                    selecionado
                      ? "text-[#F5F7F8]"
                      : "text-[#A8B2B9]"
                  }`}
                >
                  {jogador.nome}
                </Text>

                <Text className="text-[#6F7B83] text-xs mt-1">
                  {jogador.pos}
                </Text>
              </View>

              <View
                className={`w-6 h-6 rounded-full border items-center justify-center ${
                  selecionado
                    ? "bg-[#00C853] border-[#00C853]"
                    : "border-[#344652]"
                }`}
              >
                {selecionado ? (
                  <Text className="text-[#071018] text-xs font-extrabold">
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
          <View className="bg-[#16232D] border border-[#00C853]/30 rounded-xl p-4 mt-3">
            <View className="items-center">
              <View className="w-14 h-14 rounded-full bg-[#00C853]/10 items-center justify-center mb-3">
                <TrophyIcon size={28} color="#FFC107" weight="fill" />
              </View>

              <Text className="text-[#00C853] font-extrabold text-xl text-center">
                {acertos}/11 acertos
              </Text>

              <Text className="text-[#A8B2B9] text-xs text-center mt-2">
                {acertos === 11
                  ? "Perfeito! Você acertou todos os titulares!"
                  : acertos >= 7
                  ? "Mandou muito bem! Você conhece bastante esse time."
                  : acertos >= 4
                  ? "Bom resultado! Você acertou alguns titulares."
                  : "Desafio concluído! Continue acompanhando o futebol."}
              </Text>

              <View className="w-full border-t border-[#26343E] mt-4 pt-4">
                <Text className="text-[#6F7B83] text-xs text-center">
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
            className={`rounded-xl py-4 items-center mt-3 ${
              selecionados.length === 11
                ? "bg-[#00C853]"
                : "bg-[#26343E]"
            }`}
          >
            <Text
              className={`font-extrabold text-sm ${
                selecionados.length === 11
                  ? "text-[#071018]"
                  : "text-[#6F7B83]"
              }`}
            >
              {selecionados.length === 11
                ? "Confirmar escalação"
                : `Selecione mais ${11 - selecionados.length} jogadores`}
            </Text>
          </Pressable>
        ) : (
          <Pressable
            onPress={reiniciarDesafio}
            className="rounded-xl py-4 items-center mt-3 bg-[#26343E] border border-[#344652]"
          >
            <Text className="text-[#F5F7F8] font-bold text-sm">
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

        <View className="flex-row bg-[#111D27] border border-[#26343E] rounded-2xl p-1">
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
                  backgroundColor: selecionado ? "#00C853" : "transparent",
                }}
              >
                <Text
                  className={`text-xs font-bold ${
                    selecionado
                      ? "text-[#071018]"
                      : "text-[#A8B2B9]"
                  }`}
                >
                  {nome}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* FORMAÇÃO */}

        <View className="bg-[#111D27] border border-[#26343E] rounded-2xl p-4 flex-row justify-between items-center">
          <View>
            <Text className="text-[#6F7B83] text-xs">
              FORMAÇÃO TÁTICA
            </Text>

            <Text className="text-[#F5F7F8] text-base font-bold mt-1">
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

        <View className="flex-row bg-[#111D27] border border-[#26343E] rounded-xl p-1">
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
                  backgroundColor: ativo ? "#26343E" : "transparent",
                }}
              >
                <Text
                  className={`text-xs font-bold ${
                    ativo ? "text-[#F5F7F8]" : "text-[#6F7B83]"
                  }`}
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
              className={`flex-row items-center py-3 ${
                index !== jogadores.length - 1
                  ? "border-b border-[#26343E]"
                  : ""
              }`}
            >
              <View className="w-10 h-10 rounded-xl bg-[#16232D] border border-[#26343E] items-center justify-center mr-3">
                <Text className="text-[#00C853] font-extrabold text-sm">
                  {jogador.n}
                </Text>
              </View>

              <View className="flex-1">
                <Text className="text-[#F5F7F8] font-semibold text-sm">
                  {jogador.nome}
                </Text>

                <Text className="text-[#6F7B83] text-xs mt-1">
                  {jogador.pos}
                </Text>
              </View>

              <CaretRightIcon size={16} color="#6F7B83" />
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
      (a, b) => converterMinuto(b.minuto) - converterMinuto(a.minuto)
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

        <View className="bg-[#16232D] rounded-xl p-3 flex-row items-center justify-center mb-5">
          <Text className="text-[#F5F7F8] font-bold text-xs">
            {jogo.mandante}
          </Text>

          <Text className="text-[#00C853] text-lg font-extrabold mx-3">
            {jogo.gols_mandante} - {jogo.gols_visitante}
          </Text>

          <Text className="text-[#F5F7F8] font-bold text-xs">
            {jogo.visitante}
          </Text>
        </View>

        {eventos.map((evento, index) => (
          <View key={`${evento.minuto}-${evento.tipo}-${index}`} className="flex-row">
            {/* MINUTO */}

            <View className="w-12 items-center">
              <Text className="text-[#00C853] font-extrabold text-xs">
                {evento.minuto}'
              </Text>

              {index !== eventos.length - 1 ? (
                <View className="w-[2px] flex-1 bg-[#26343E] my-2" />
              ) : null}
            </View>

            {/* EVENTO */}

            <View className="flex-1 flex-row pb-5">
              <View className="w-10 h-10 rounded-xl bg-[#16232D] border border-[#26343E] items-center justify-center">
                <Text>{iconeEvento(evento)}</Text>
              </View>

              <View className="flex-1 ml-3">
                <Text className="text-[#F5F7F8] font-bold text-sm">
                  {evento.jogador || evento.entrou || "Evento"}
                </Text>

                {evento.assistencia ? (
                  <Text className="text-[#6F7B83] text-xs mt-1">
                    Assistência: {evento.assistencia}
                  </Text>
                ) : null}

                {evento.saiu ? (
                  <Text className="text-[#A8B2B9] text-xs mt-1">
                    Saiu: {evento.saiu}
                  </Text>
                ) : null}

                <Text className="text-[#A8B2B9] text-xs mt-1">
                  {evento.descricao ||
                    (evento.tipo === "gol"
                      ? "Gol"
                      : evento.tipo === "cartao"
                      ? `Cartão ${evento.cartao || "recebido"}`
                      : "Substituição")}
                </Text>

                <Text className="text-[#6F7B83] text-xs mt-1">
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

          <View className="flex-row bg-[#16232D] px-3 py-3">
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
                className="text-[#6F7B83] text-[10px] font-extrabold text-center"
                style={{ width: largura }}
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
                className={`flex-row items-center px-3 py-3 border-b border-[#26343E] ${
                  destaque ? "bg-[#16232D]" : ""
                }`}
              >
                <View className="w-[30px] items-center">
                  <Text
                    className={`text-xs font-bold ${
                      destaque ? "text-[#00C853]" : "text-[#A8B2B9]"
                    }`}
                  >
                    {time.pos}
                  </Text>
                </View>

                <View className="w-[130px]">
                  <Text
                    numberOfLines={1}
                    className={`text-xs font-semibold ${
                      destaque ? "text-[#F5F7F8]" : "text-[#A8B2B9]"
                    }`}
                  >
                    {time.equipe}
                  </Text>
                </View>

                {[time.pts, time.j, time.v, time.e, time.d, time.sg].map(
                  (valor, index) => (
                    <Text
                      key={index}
                      className={`text-xs text-center ${
                        index === 0
                          ? "text-[#F5F7F8] font-extrabold"
                          : "text-[#A8B2B9]"
                      }`}
                      style={{
                        width: [38, 32, 32, 32, 32, 38][index],
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
        <Text className="text-[#6F7B83] text-[10px]">
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
    <SafeAreaView className="flex-1 bg-[#071018]">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 35 }}
      >
        {/* HEADER */}

        <View className="flex-row items-center px-5 pt-3 pb-5">
          <Pressable
            onPress={() => navigation.goBack()}
            className="w-10 h-10 rounded-xl bg-[#16232D] border border-[#26343E] items-center justify-center"
          >
            <ArrowLeftIcon size={20} color="#F5F7F8" weight="bold" />
          </Pressable>

          <View className="flex-1 ml-3">
            <Text className="text-[#F5F7F8] text-lg font-extrabold">
              Central da Partida
            </Text>

            <Text className="text-[#6F7B83] text-xs mt-1">
              Informações completas do confronto
            </Text>
          </View>

          <View className="w-10 h-10 rounded-xl bg-[#00C853]/10 items-center justify-center">
            <SoccerBallIcon size={21} color="#00C853" weight="bold" />
          </View>
        </View>

        {/* CARD PRINCIPAL */}

        <View className="mx-4 bg-[#111D27] border border-[#26343E] rounded-3xl p-5">
          {/* COMPETIÇÃO */}

          <View className="items-center mb-6">
            {jogo.logo_competicao ? (
              <Image
                source={{ uri: jogo.logo_competicao }}
                resizeMode="contain"
                className="w-10 h-10 mb-2"
              />
            ) : (
              <View className="w-10 h-10 rounded-xl bg-[#00C853]/10 items-center justify-center mb-2">
                <TrophyIcon size={20} color="#00C853" weight="bold" />
              </View>
            )}

            <Text className="text-[#F5F7F8] text-sm font-bold">
              {jogo.competicao}
            </Text>

            <View className="bg-[#16232D] border border-[#26343E] rounded-full px-3 py-1 mt-2">
              <Text className="text-[#00C853] text-[10px] font-bold">
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
                className="text-[#F5F7F8] text-sm font-extrabold text-center mt-2"
                numberOfLines={2}
              >
                {jogo.mandante}
              </Text>

              <Text className="text-[#6F7B83] text-[10px] mt-1">
                MANDANTE
              </Text>
            </View>

            {/* PLACAR */}

            <View className="items-center px-1">
              <Text className="text-[#F5F7F8] text-4xl font-extrabold tracking-wider">
                {jogo.gols_mandante}
                <Text className="text-[#00C853]"> - </Text>
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
                <ClockIcon size={13} color="#6F7B83" />

                <Text className="text-[#A8B2B9] text-xs ml-1">
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
                className="text-[#F5F7F8] text-sm font-extrabold text-center mt-2"
                numberOfLines={2}
              >
                {jogo.visitante}
              </Text>

              <Text className="text-[#6F7B83] text-[10px] mt-1">
                VISITANTE
              </Text>
            </View>
          </View>

          {/* DATA */}

          <View className="border-t border-[#26343E] mt-5 pt-4">
            <View className="flex-row items-center justify-center">
              <ClockIcon size={15} color="#00C853" />

              <Text className="text-[#A8B2B9] text-xs ml-2">
                {formatarData(jogo.data)}
              </Text>
            </View>
          </View>

          {/* ESTÁDIO */}

          <View className="bg-[#16232D] rounded-xl p-3 mt-3 flex-row items-center justify-center">
            <MapPinIcon size={17} color="#00C853" />

            <View className="ml-2">
              <Text className="text-[#F5F7F8] text-xs font-bold text-center">
                {jogo.estadio}
              </Text>

              <Text className="text-[#6F7B83] text-[10px] text-center mt-1">
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
                className={`mr-2 flex-row items-center rounded-xl px-4 py-3 border ${
                  selecionada
                    ? "bg-[#00C853] border-[#00C853]"
                    : "bg-[#111D27] border-[#26343E]"
                }`}
              >
                <Icon
                  size={17}
                  color={selecionada ? "#071018" : "#A8B2B9"}
                  weight="bold"
                />

                <Text
                  className={`text-xs font-bold ml-2 ${
                    selecionada
                      ? "text-[#071018]"
                      : "text-[#A8B2B9]"
                  }`}
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