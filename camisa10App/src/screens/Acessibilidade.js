import {
  View,
  Text,
  ScrollView,
  Pressable,
  Switch,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import {
  ArrowLeftIcon,
  TextAaIcon,
  EyeIcon,
  HandIcon,
  SparkleIcon,
  TextBolderIcon,
  ArrowCounterClockwiseIcon,
} from "phosphor-react-native";

import { useNavigation } from "@react-navigation/native";

import { useTheme } from "../context/ThemeContext";
import { useAccessibility } from "../context/AccessibilityContext";

export function Acessibilidade() {
  const navigation = useNavigation();

  const {
    cores,
    altoContraste,
    alternarAltoContraste,
  } = useTheme();

  const {
    configuracoes,
    alterarTamanhoTexto,
    alternarAcessibilidade,
    restaurarAcessibilidade,
    fontScale,
  } = useAccessibility();

  const tamanhos = [
    { id: "normal", titulo: "Normal", tamanho: 16 },
    { id: "grande", titulo: "Grande", tamanho: 20 },
    { id: "muitoGrande", titulo: "Muito grande", tamanho: 25 },
  ];

  // COMPONENTE DE OPÇÃO COM SWITCH
  function OpcaoSwitch({
    titulo,
    descricao,
    valor,
    onChange,
    icone: Icone,
  }) {
    return (
      <View
        className="flex-row items-center justify-between py-4"
        style={{
          borderBottomWidth: 1,
          borderBottomColor: cores.border,
        }}
      >
        <View className="flex-1 flex-row items-center pr-3">
          {Icone && (
            <View
              className="mr-3 rounded-xl p-2"
              style={{
                backgroundColor: cores.surfaceSecondary,
              }}
            >
              <Icone
                size={22}
                color={cores.primary}
                weight="bold"
              />
            </View>
          )}

          <View className="flex-1">
            <Text
              style={{
                color: cores.text,
                fontSize: 15 * fontScale,
                fontWeight: configuracoes.textoNegrito
                  ? "700"
                  : "500",
              }}
            >
              {titulo}
            </Text>

            <Text
              className="mt-1"
              style={{
                color: cores.textSecondary,
                fontSize: 12 * fontScale,
                lineHeight: 18 * fontScale,
              }}
            >
              {descricao}
            </Text>
          </View>
        </View>

        <Switch
          value={valor}
          onValueChange={onChange}
          trackColor={{
            false: cores.border,
            true: cores.primary,
          }}
          thumbColor={valor ? "#FFFFFF" : "#D1D5DB"}
          accessibilityRole="switch"
          accessibilityLabel={titulo}
          accessibilityHint={descricao}
        />
      </View>
    );
  }

  // COMPONENTE DE SEÇÃO
  function Secao({ titulo, children }) {
    return (
      <View className="mb-6">
        <Text
          className="mb-3"
          style={{
            color: cores.primary,
            fontSize: 14 * fontScale,
            fontWeight: "700",
          }}
        >
          {titulo}
        </Text>

        <View
          className="rounded-2xl px-4"
          style={{
            backgroundColor: cores.surface,
            borderWidth: 1,
            borderColor: cores.border,
          }}
        >
          {children}
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView
      className="flex-1"
      style={{
        backgroundColor: cores.background,
      }}
    >
      {/* HEADER */}
      <View className="flex-row items-center px-5 pt-3 pb-5">
        <Pressable
          onPress={() => navigation.goBack()}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel="Voltar"
          className="mr-4 rounded-xl p-2"
          style={{
            backgroundColor: cores.surface,
          }}
        >
          <ArrowLeftIcon
            size={24}
            color={cores.icon}
            weight="bold"
          />
        </Pressable>

        <View className="flex-1">
          <Text
            style={{
              color: cores.text,
              fontSize: 23 * fontScale,
              fontWeight: "700",
            }}
          >
            Acessibilidade
          </Text>

          <Text
            style={{
              color: cores.textSecondary,
              fontSize: 12 * fontScale,
            }}
          >
            Personalize sua experiência
          </Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 40,
        }}
      >
        {/* PRÉ-VISUALIZAÇÃO */}
        <View
          className="mb-6 rounded-2xl p-5"
          style={{
            backgroundColor: cores.surfaceSecondary,
            borderWidth: 1,
            borderColor: cores.border,
          }}
        >
          <Text
            style={{
              color: cores.textSecondary,
              fontSize: 12 * fontScale,
              fontWeight: "600",
            }}
          >
            PRÉ-VISUALIZAÇÃO
          </Text>

          <Text
            className="mt-3"
            style={{
              color: cores.text,
              fontSize: 18 * fontScale,
              fontWeight: configuracoes.textoNegrito
                ? "800"
                : "600",
            }}
          >
            Seu futebol, do seu jeito!
          </Text>

          <Text
            className="mt-2"
            style={{
              color: cores.textSecondary,
              fontSize: 14 * fontScale,
              lineHeight: 21 * fontScale,
              fontWeight: configuracoes.textoNegrito
                ? "700"
                : "400",
            }}
          >
            Estas configurações ajudam a tornar o Camisa10
            mais confortável e fácil de utilizar.
          </Text>
        </View>

        {/* LEITURA E VISUALIZAÇÃO */}
        <Secao titulo="Leitura e visualização">
          <View className="py-4">
            <View className="flex-row items-center mb-3">
              <TextAaIcon
                size={22}
                color={cores.primary}
                weight="bold"
              />

              <Text
                className="ml-3"
                style={{
                  color: cores.text,
                  fontSize: 15 * fontScale,
                  fontWeight: "600",
                }}
              >
                Tamanho do texto
              </Text>
            </View>

            {tamanhos.map((item) => {
              const selecionado =
                configuracoes.tamanhoTexto === item.id;

              return (
                <Pressable
                  key={item.id}
                  onPress={() => alterarTamanhoTexto(item.id)}
                  accessibilityRole="radio"
                  accessibilityState={{
                    selected: selecionado,
                  }}
                  accessibilityLabel={`Tamanho de texto ${item.titulo}`}
                  className="mb-2 flex-row items-center justify-between rounded-xl px-4 py-3"
                  style={{
                    backgroundColor: selecionado
                      ? cores.primary + "20"
                      : cores.surfaceSecondary,
                    borderWidth: 1,
                    borderColor: selecionado
                      ? cores.primary
                      : cores.border,
                  }}
                >
                  <Text
                    style={{
                      color: cores.text,
                      fontSize: 14 * fontScale,
                      fontWeight: configuracoes.textoNegrito
                        ? "700"
                        : "500",
                    }}
                  >
                    {item.titulo}
                  </Text>

                  <Text
                    style={{
                      color: cores.text,
                      fontSize: item.tamanho,
                      fontWeight: "700",
                    }}
                  >
                    A
                  </Text>

                  {selecionado && (
                    <View
                      className="rounded-full px-2 py-1"
                      style={{
                        backgroundColor: cores.primary,
                      }}
                    >
                      <Text className="text-white text-xs font-bold">
                        Ativo
                      </Text>
                    </View>
                  )}
                </Pressable>
              );
            })}
          </View>

          <OpcaoSwitch
            titulo="Texto em negrito"
            descricao="Deixa os textos mais destacados"
            valor={configuracoes.textoNegrito}
            onChange={() =>
              alternarAcessibilidade("textoNegrito")
            }
            icone={TextBolderIcon}
          />

          <OpcaoSwitch
            titulo="Alto contraste"
            descricao="Destaca textos, bordas e elementos visuais"
            valor={altoContraste}
            onChange={alternarAltoContraste}
            icone={EyeIcon}
          />
        </Secao>

        {/* MOVIMENTO E EFEITOS */}
        <Secao titulo="Movimento e efeitos">
          <OpcaoSwitch
            titulo="Reduzir animações"
            descricao="Reduz movimentos e animações da interface"
            valor={configuracoes.reduzirAnimacoes}
            onChange={() =>
              alternarAcessibilidade("reduzirAnimacoes")
            }
            icone={SparkleIcon}
          />

          <OpcaoSwitch
            titulo="Desativar efeitos"
            descricao="Desativa efeitos visuais e elementos decorativos"
            valor={configuracoes.desativarEfeitos}
            onChange={() =>
              alternarAcessibilidade("desativarEfeitos")
            }
            icone={EyeIcon}
          />
        </Secao>

        {/* INTERFACE */}
        <Secao titulo="Interface">
          <OpcaoSwitch
            titulo="Interface simplificada"
            descricao="Reduz elementos visuais para facilitar a navegação (em desenvolvimento)"
            valor={configuracoes.interfaceSimplificada}
            onChange={() =>
              alternarAcessibilidade("interfaceSimplificada")
            }
            icone={EyeIcon}
          />
        </Secao>

        {/* RESTAURAR CONFIGURAÇÕES */}
        <Pressable
          onPress={restaurarAcessibilidade}
          className="flex-row items-center justify-center rounded-2xl py-4"
          style={{
            backgroundColor: cores.surface,
            borderWidth: 1,
            borderColor: cores.border,
          }}
          accessibilityRole="button"
          accessibilityLabel="Restaurar configurações de acessibilidade"
        >
          <ArrowCounterClockwiseIcon
            size={20}
            color={cores.text}
            weight="bold"
          />

          <Text
            className="ml-2"
            style={{
              color: cores.text,
              fontSize: 14 * fontScale,
              fontWeight: "600",
            }}
          >
            Restaurar configurações padrão
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}