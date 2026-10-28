
import { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  Text,
  View,
} from "react-native";
import {
  CaretLeftIcon,
  CaretRightIcon,
  CalendarBlankIcon,
  CheckIcon,
  XIcon,
} from "phosphor-react-native";

const MESES = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const DIAS_SEMANA = ["SEG", "TER", "QUA", "QUI", "SEX", "SÁB", "DOM"];

const COR_VERDE = "#00C853";
const COR_FUNDO = "#111D27";
const COR_CARTAO = "#16232D";
const COR_BORDA = "#26343E";
const COR_TEXTO = "#F5F7F8";
const COR_SECUNDARIA = "#A8B2B9";

function mesmoDia(data1, data2) {
  return (
    data1.getDate() === data2.getDate() &&
    data1.getMonth() === data2.getMonth() &&
    data1.getFullYear() === data2.getFullYear()
  );
}

function formatarData(data) {
  const dia = String(data.getDate()).padStart(2, "0");
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const ano = data.getFullYear();

  return `${dia}/${mes}/${ano}`;
}

export function CalendarioPersonalizado({
  visible,
  initialDate,
  onCancel,
  onConfirm,
}) {
  const [dataSelecionada, setDataSelecionada] = useState(
    initialDate || new Date()
  );

  const [mesExibido, setMesExibido] = useState(
    (initialDate || new Date()).getMonth()
  );

  const [anoExibido, setAnoExibido] = useState(
    (initialDate || new Date()).getFullYear()
  );

  // Atualiza a seleção quando o calendário for aberto novamente.
  useEffect(() => {
    if (visible) {
      const dataInicial = initialDate
        ? new Date(initialDate)
        : new Date();

      setDataSelecionada(dataInicial);
      setMesExibido(dataInicial.getMonth());
      setAnoExibido(dataInicial.getFullYear());
    }
  }, [visible, initialDate]);

  function navegarMes(direcao) {
    const novaData = new Date(
      anoExibido,
      mesExibido + direcao,
      1
    );

    setMesExibido(novaData.getMonth());
    setAnoExibido(novaData.getFullYear());
  }

  function gerarDiasDoMes() {
    const primeiroDia = new Date(
      anoExibido,
      mesExibido,
      1
    );

    const totalDias = new Date(
      anoExibido,
      mesExibido + 1,
      0
    ).getDate();

    // Converte domingo (0) para a última posição da semana.
    const espacosIniciais = (primeiroDia.getDay() + 6) % 7;

    const dias = [];

    for (let i = 0; i < espacosIniciais; i++) {
      dias.push(null);
    }

    for (let dia = 1; dia <= totalDias; dia++) {
      dias.push(
        new Date(anoExibido, mesExibido, dia)
      );
    }

    // Completa a última semana para manter as sete colunas.
    while (dias.length % 7 !== 0) {
      dias.push(null);
    }

    return dias;
  }

  function confirmarSelecao() {
    onConfirm?.(new Date(dataSelecionada));
  }

  const diasDoMes = gerarDiasDoMes();
  const hoje = new Date();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
      statusBarTranslucent
    >
      <View className="flex-1 items-center justify-center px-5">
        {/* Fundo escurecido */}
        <Pressable
          className="absolute inset-0"
          onPress={onCancel}
          style={{ backgroundColor: "rgba(0, 0, 0, 0.78)" }}
        />

        {/* Cartão principal */}
        <View
          className="w-full overflow-hidden rounded-[28px] border"
          style={{
            maxWidth: 380,
            backgroundColor: COR_FUNDO,
            borderColor: COR_BORDA,
            borderRadius: 28,
          }}
        >
          {/* Cabeçalho */}
          <View className="flex-row items-center justify-between px-5 pt-5">
            <View className="flex-row items-center">
              <View
                className="mr-3 h-11 w-11 items-center justify-center rounded-2xl"
                style={{ backgroundColor: "rgba(0, 200, 83, 0.14)" }}
              >
                <CalendarBlankIcon
                  size={25}
                  color={COR_VERDE}
                  weight="fill"
                />
              </View>

              <View>
                <Text
                  className="text-lg font-bold"
                  style={{ color: COR_TEXTO }}
                >
                  Escolher data
                </Text>

                <Text
                  className="mt-0.5 text-xs"
                  style={{ color: COR_SECUNDARIA }}
                >
                  Selecione o dia dos jogos
                </Text>
              </View>
            </View>

            <Pressable
              onPress={onCancel}
              className="h-10 w-10 items-center justify-center rounded-full"
              style={{ backgroundColor: COR_CARTAO }}
              accessibilityRole="button"
              accessibilityLabel="Fechar calendário"
            >
              <XIcon size={21} color={COR_SECUNDARIA} />
            </Pressable>
          </View>

          {/* Navegação do mês */}
          <View className="mt-6 flex-row items-center justify-between px-5">
            <Pressable
              onPress={() => navegarMes(-1)}
              className="h-10 w-10 items-center justify-center rounded-xl"
              style={{ backgroundColor: COR_CARTAO }}
              accessibilityRole="button"
              accessibilityLabel="Mês anterior"
            >
              <CaretLeftIcon
                size={22}
                color={COR_TEXTO}
                weight="bold"
              />
            </Pressable>

            <View className="items-center">
              <Text
                className="text-lg font-bold"
                style={{ color: COR_TEXTO }}
              >
                {MESES[mesExibido]}
              </Text>

              <Text
                className="mt-0.5 text-sm"
                style={{ color: COR_VERDE }}
              >
                {anoExibido}
              </Text>
            </View>

            <Pressable
              onPress={() => navegarMes(1)}
              className="h-10 w-10 items-center justify-center rounded-xl"
              style={{ backgroundColor: COR_CARTAO }}
              accessibilityRole="button"
              accessibilityLabel="Próximo mês"
            >
              <CaretRightIcon
                size={22}
                color={COR_TEXTO}
                weight="bold"
              />
            </Pressable>
          </View>

          {/* Dias da semana */}
          <View className="mt-6 flex-row px-3">
            {DIAS_SEMANA.map((dia) => (
              <View
                key={dia}
                className="items-center justify-center"
                style={{ width: `${100 / 7}%`, height: 30 }}
              >
                <Text
                  className="text-[10px] font-bold"
                  style={{ color: COR_SECUNDARIA }}
                >
                  {dia}
                </Text>
              </View>
            ))}
          </View>

          {/* Grade de dias */}
          <View className="flex-row flex-wrap px-3">
            {diasDoMes.map((data, indice) => {
              if (!data) {
                return (
                  <View
                    key={`vazio-${indice}`}
                    style={{
                      width: `${100 / 7}%`,
                      aspectRatio: 1,
                    }}
                  />
                );
              }

              const selecionado = mesmoDia(
                data,
                dataSelecionada
              );

              const ehHoje = mesmoDia(data, hoje);

              return (
                <View
                  key={formatarData(data)}
                  className="items-center justify-center"
                  style={{
                    width: `${100 / 7}%`,
                    aspectRatio: 1,
                    padding: 2,
                  }}
                >
                  <Pressable
                    onPress={() => setDataSelecionada(data)}
                    className="h-full w-full items-center justify-center rounded-xl"
                    style={{
                      backgroundColor: selecionado
                        ? COR_VERDE
                        : "transparent",
                      borderWidth:
                        ehHoje && !selecionado ? 1 : 0,
                      borderColor: COR_VERDE,
                    }}
                    accessibilityRole="button"
                    accessibilityLabel={`${data.getDate()} de ${MESES[mesExibido]} de ${anoExibido}`}
                    accessibilityState={{
                      selected: selecionado,
                    }}
                  >
                    <Text
                      className="text-sm font-semibold"
                      style={{
                        color: selecionado
                          ? "#071018"
                          : COR_TEXTO,
                      }}
                    >
                      {data.getDate()}
                    </Text>
                  </Pressable>
                </View>
              );
            })}
          </View>

          {/* Data selecionada */}
          <View
            className="mx-5 mt-4 flex-row items-center rounded-2xl px-4 py-3"
            style={{
              backgroundColor: COR_CARTAO,
              borderWidth: 1,
              borderColor: COR_BORDA,
            }}
          >
            <CalendarBlankIcon
              size={20}
              color={COR_VERDE}
              weight="fill"
            />

            <View className="ml-3 flex-1">
              <Text
                className="text-[11px]"
                style={{ color: COR_SECUNDARIA }}
              >
                Data selecionada
              </Text>

              <Text
                className="mt-0.5 text-sm font-bold"
                style={{ color: COR_TEXTO }}
              >
                {dataSelecionada.getDate()} de{" "}
                {MESES[dataSelecionada.getMonth()]} de{" "}
                {dataSelecionada.getFullYear()}
              </Text>
            </View>
          </View>

          {/* Ações */}
          <View className="flex-row gap-3 px-5 pb-5 pt-4">
            <Pressable
              onPress={onCancel}
              className="h-12 flex-1 items-center justify-center rounded-2xl border"
              style={{
                backgroundColor: COR_CARTAO,
                borderColor: COR_BORDA,
              }}
              accessibilityRole="button"
            >
              <Text
                className="font-semibold"
                style={{ color: COR_TEXTO }}
              >
                Cancelar
              </Text>
            </Pressable>

            <Pressable
              onPress={confirmarSelecao}
              className="h-12 flex-1 flex-row items-center justify-center rounded-2xl"
              style={{ backgroundColor: COR_VERDE }}
              accessibilityRole="button"
            >
              <CheckIcon
                size={19}
                color="#071018"
                weight="bold"
              />

              <Text
                className="ml-2 font-bold"
                style={{ color: "#071018" }}
              >
                Confirmar
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}