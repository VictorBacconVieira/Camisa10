import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import {
  ArrowLeftIcon,
  ArrowUpIcon,
  LightbulbIcon,
  PlusIcon,
  SoccerBallIcon,
  SparkleIcon,
} from "phosphor-react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

export function Chatbot() {
  const navigation = useNavigation();

  const scrollRef = useRef(null);

  const [mensagem, setMensagem] = useState("");
  const [mensagens, setMensagens] = useState([]);
  const [digitando, setDigitando] = useState(false);

  // Sugestões iniciais para ajudar o usuário a começar uma conversa.
  const sugestoes = [
    {
      id: "1",
      titulo: "Notícias do meu time",
      pergunta: "Quais são as últimas notícias do meu time?",
      icone: "newspaper",
    },
    {
      id: "2",
      titulo: "Destaques da rodada",
      pergunta: "Quem foram os destaques da última rodada?",
      icone: "trophy",
    },
    {
      id: "3",
      titulo: "História do futebol",
      pergunta: "Conte uma curiosidade sobre a história do futebol.",
      icone: "book",
    },
    {
      id: "4",
      titulo: "Regras do futebol",
      pergunta: "Explique a regra do impedimento.",
      icone: "lightbulb",
    },
  ];

  // Mantém a conversa posicionada na mensagem mais recente.
  useEffect(() => {
    if (mensagens.length > 0 || digitando) {
      const timeout = setTimeout(() => {
        scrollRef.current?.scrollToEnd({ animated: true });
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [mensagens, digitando]);

  // ETAPA 2: respostas provisórias para testar a interface.
  // FUTURA API: substituir esta função pela resposta do backend.
  function gerarResposta(pergunta) {
    const texto = pergunta.toLowerCase();

    if (
      texto.includes("impedimento") ||
      texto.includes("regra")
    ) {
      return (
        "O impedimento acontece quando um jogador recebe um passe " +
        "estando mais perto da linha de gol adversária do que a bola " +
        "e o penúltimo adversário, no momento em que seu companheiro " +
        "toca na bola. Existem exceções, mas essa é a ideia principal! ⚽"
      );
    }

    if (
      texto.includes("história") ||
      texto.includes("curiosidade")
    ) {
      return (
        "Uma curiosidade do futebol: a Copa do Mundo masculina começou " +
        "em 1930, no Uruguai, e a seleção anfitriã conquistou o primeiro " +
        "título! 🏆"
      );
    }

    if (
      texto.includes("rodada") ||
      texto.includes("destaques")
    ) {
      return (
        "Vamos falar dos destaques da rodada! Para comentar resultados, " +
        "gols e atuações com precisão, precisaremos conectar o Camisa10 " +
        "IA a uma fonte atualizada de dados do futebol."
      );
    }

    if (
      texto.includes("notícia") ||
      texto.includes("notícias") ||
      texto.includes("meu time")
    ) {
      return (
        "Posso ajudar você a acompanhar seu time! 📰 " +
        "Quando conectarmos a API de notícias, poderei apresentar " +
        "informações atualizadas. Por enquanto, podemos conversar " +
        "sobre futebol e seus clubes favoritos."
      );
    }

    return (
      "Boa pergunta, torcedor! ⚽ Estou na minha versão de testes. " +
      "Ainda não estou conectado a uma inteligência artificial real, " +
      "mas já podemos testar o funcionamento da conversa. " +
      "Na próxima etapa, integraremos o backend do Camisa10 IA!"
    );
  }

  function enviarMensagem(texto = mensagem) {
    const textoEnviado = texto.trim();

    // Impede mensagens vazias ou envios simultâneos.
    if (!textoEnviado || digitando) return;

    const novaMensagem = {
      id: `${Date.now()}-usuario`,
      texto: textoEnviado,
      autor: "usuario",
    };

    // Adiciona a mensagem do usuário à conversa.
    setMensagens((anteriores) => [
      ...anteriores,
      novaMensagem,
    ]);

    setMensagem("");
    setDigitando(true);

    // Simula o tempo de resposta da IA.
    // FUTURA API: enviar textoEnviado ao backend e aguardar a resposta.
    setTimeout(() => {
      const resposta = {
        id: `${Date.now()}-ia`,
        texto: gerarResposta(textoEnviado),
        autor: "ia",
      };

      setMensagens((anteriores) => [
        ...anteriores,
        resposta,
      ]);

      setDigitando(false);
    }, 1000);
  }

  function selecionarSugestao(pergunta) {
    setMensagem(pergunta);

    // A sugestão é colocada no campo para o usuário revisar e enviar.
  }

  const conversaIniciada = mensagens.length > 0;

  return (
    <SafeAreaView
      className="flex-1 bg-fundo"
      edges={["top", "bottom"]}
    >
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "android" ? "padding" : "height"}
        keyboardVerticalOffset={0}
        style={{ flex: 1 }}
      >
        <View className="flex-1 bg-fundo">

          {/* CABEÇALHO */}
          <View className="h-[62px] flex-row items-center border-b border-cartao-borda px-4">
            <Pressable
              onPress={() => navigation.goBack()}
              className="mr-3 h-10 w-10 items-center justify-center rounded-xl bg-cartao"
              style={({ pressed }) => ({
                opacity: pressed ? 0.7 : 1,
                transform: [{ scale: pressed ? 0.96 : 1 }],
              })}
              accessibilityRole="button"
              accessibilityLabel="Voltar"
            >
              <ArrowLeftIcon size={23} color="#F5F7F8" />
            </Pressable>

            <View className="mr-3 h-10 w-10 items-center justify-center rounded-full border border-verde-claro bg-cartao">
              <SoccerBallIcon size={23} color="#39FF14" />
            </View>

            <View className="flex-1">
              <Text
                className="text-lg text-texto"
                style={{ fontFamily: "Anuphan" }}
              >
                Camisa10 IA
              </Text>

              <Text className="text-xs text-verde">
                Seu assistente de futebol
              </Text>
            </View>

            <View className="h-10 w-10 items-center justify-center rounded-full bg-cartao">
              <SparkleIcon size={21} color="#39FF14" />
            </View>
          </View>

          {/* CONTEÚDO DA CONVERSA */}
          <ScrollView
            ref={scrollRef}
            className="flex-1"
            contentContainerStyle={{
              flexGrow: 1,
              paddingHorizontal: 20,
              paddingTop: 28,
              paddingBottom: 24,
            }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() => {
              if (conversaIniciada || digitando) {
                scrollRef.current?.scrollToEnd({
                  animated: true,
                });
              }
            }}
          >
            {/* APRESENTAÇÃO INICIAL */}
            {!conversaIniciada && (
              <View>
                <View className="mb-8 items-center">
                  <View className="mb-4 h-[76px] w-[76px] items-center justify-center rounded-3xl border border-cartao-borda bg-cartao">
                    <SoccerBallIcon size={42} color="#39FF14" />
                  </View>

                  <Text
                    className="mb-2 text-center text-2xl text-texto"
                    style={{ fontFamily: "Anuphan" }}
                  >
                    Fala, torcedor!
                  </Text>

                  <Text className="max-w-[290px] text-center text-sm leading-6 text-texto-sec">
                    Sou o Camisa10 IA, seu parceiro para conversar sobre futebol.
                    O que vamos discutir hoje?
                  </Text>
                </View>

                {/* CARD DE APRESENTAÇÃO */}
                <View className="mb-7 rounded-2xl border border-cartao-borda bg-cartao-escuro p-4">
                  <View className="mb-3 flex-row items-center">
                    <View className="mr-2 h-8 w-8 items-center justify-center rounded-lg bg-cartao">
                      <LightbulbIcon size={19} color="#39FF14" />
                    </View>

                    <Text className="text-sm text-texto">
                      O que você pode perguntar?
                    </Text>
                  </View>

                  <Text className="text-sm leading-6 text-texto-sec">
                    Descubra curiosidades, explore a história dos clubes,
                    entenda as regras e converse sobre o mundo da bola.
                  </Text>
                </View>

                {/* SUGESTÕES DE PERGUNTAS */}
                <View>
                  <Text className="mb-3 text-base text-texto">
                    Vamos começar?
                  </Text>

                  <View className="gap-3">
                    {sugestoes.map((sugestao) => (
                      <Pressable
                        key={sugestao.id}
                        onPress={() =>
                          selecionarSugestao(sugestao.pergunta)
                        }
                        className="min-h-[58px] flex-row items-center rounded-2xl border border-cartao-borda bg-cartao px-4 py-3"
                        style={({ pressed }) => ({
                          opacity: pressed ? 0.75 : 1,
                          transform: [
                            { scale: pressed ? 0.99 : 1 },
                          ],
                        })}
                        accessibilityRole="button"
                        accessibilityLabel={sugestao.pergunta}
                      >
                        <View className="mr-3 h-9 w-9 items-center justify-center rounded-xl bg-cartao-escuro">
                          {sugestao.icone === "newspaper" && (
                            <SparkleIcon size={20} color="#39FF14" />
                          )}

                          {sugestao.icone === "trophy" && (
                            <SoccerBallIcon size={20} color="#39FF14" />
                          )}

                          {sugestao.icone === "book" && (
                            <LightbulbIcon size={20} color="#39FF14" />
                          )}

                          {sugestao.icone === "lightbulb" && (
                            <LightbulbIcon size={20} color="#39FF14" />
                          )}
                        </View>

                        <Text className="flex-1 text-sm text-texto">
                          {sugestao.titulo}
                        </Text>

                        <ArrowUpIcon
                          size={18}
                          color="#A8B2B9"
                          style={{
                            transform: [{ rotate: "45deg" }],
                          }}
                        />
                      </Pressable>
                    ))}
                  </View>
                </View>
              </View>
            )}

            {/* MENSAGENS DA CONVERSA */}
            {conversaIniciada && (
              <View className="gap-4">
                {mensagens.map((item) => {
                  const mensagemUsuario = item.autor === "usuario";

                  return (
                    <View
                      key={item.id}
                      className={`flex-row ${
                        mensagemUsuario
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      {!mensagemUsuario && (
                        <View className="mr-2 mt-1 h-8 w-8 items-center justify-center rounded-full bg-cartao">
                          <SparkleIcon
                            size={19}
                            color="#39FF14"
                          />
                        </View>
                      )}

                      <View
                        className={`max-w-[82%] rounded-2xl px-4 py-3 ${
                          mensagemUsuario
                            ? "rounded-br-sm bg-verde-escuro"
                            : "rounded-bl-sm border border-cartao-borda bg-cartao-escuro"
                        }`}
                      >
                        <Text
                          className={`text-sm leading-6 ${
                            mensagemUsuario
                              ? "text-texto"
                              : "text-texto"
                          }`}
                        >
                          {item.texto}
                        </Text>
                      </View>
                    </View>
                  );
                })}

                {/* INDICADOR DE DIGITAÇÃO */}
                {digitando && (
                  <View className="flex-row items-center">
                    <View className="mr-2 h-8 w-8 items-center justify-center rounded-full bg-cartao">
                      <SparkleIcon
                        size={19}
                        color="#39FF14"
                      />
                    </View>

                    <View className="flex-row items-center rounded-2xl border border-cartao-borda bg-cartao-escuro px-4 py-3">
                      <ActivityIndicator
                        size="small"
                        color="#39FF14"
                      />
                      <Text className="ml-2 text-xs text-texto-sec">
                        Camisa10 IA está digitando...
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            )}
          </ScrollView>

          {/* CAMPO DE MENSAGEM */}
          <View className="border-t border-cartao-borda bg-fundo px-4 pb-3 pt-3">
            <View className="flex-row items-end rounded-2xl border border-cartao-borda bg-cartao-escuro p-2">
              <Pressable
                onPress={() => {
                  // FUTURO: permitir anexar imagens ou arquivos.
                }}
                className="mb-0.5 h-10 w-9 items-center justify-center"
                style={({ pressed }) => ({
                  opacity: pressed ? 0.6 : 1,
                })}
                accessibilityRole="button"
                accessibilityLabel="Adicionar anexo"
              >
                <PlusIcon size={23} color="#A8B2B9" />
              </Pressable>

              <TextInput
                value={mensagem}
                onChangeText={setMensagem}
                placeholder="Pergunte sobre futebol..."
                placeholderTextColor="#6F7B83"
                multiline
                maxLength={2000}
                className="max-h-[110px] min-h-[42px] flex-1 px-2 py-2.5 text-sm text-texto"
                style={{
                  fontFamily: "Inter",
                  textAlignVertical: "center",
                }}
                accessibilityLabel="Digite sua pergunta"
                returnKeyType="default"
              />

              <Pressable
                onPress={() => enviarMensagem()}
                disabled={!mensagem.trim() || digitando}
                className="mb-0.5 h-10 w-10 items-center justify-center rounded-xl bg-verde"
                style={({ pressed }) => ({
                  opacity:
                    !mensagem.trim() || digitando
                      ? 0.45
                      : pressed
                        ? 0.75
                        : 1,
                  transform: [
                    { scale: pressed ? 0.94 : 1 },
                  ],
                })}
                accessibilityRole="button"
                accessibilityLabel="Enviar mensagem"
              >
                <ArrowUpIcon
                  size={23}
                  color="#071018"
                  weight="bold"
                />
              </Pressable>
            </View>

            <Text className="mt-2 text-center text-[10px] text-texto-ter">
              Camisa10 IA · Seu parceiro no mundo da bola
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}