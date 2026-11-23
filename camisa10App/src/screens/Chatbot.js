import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
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

import { useTheme } from "../context/ThemeContext";
import { useAccessibility } from "../context/AccessibilityContext";
import { Texto } from "../components/texto";

export function Chatbot() {
  const { cores } = useTheme();
  const { fontScale, configuracoes } = useAccessibility();
  const navigation = useNavigation();

  const scrollRef = useRef(null);

  const [mensagem, setMensagem] = useState("");
  const [mensagens, setMensagens] = useState([]);
  const [digitando, setDigitando] = useState(false);

  const escalaIcone =
    configuracoes.tamanhoTexto === "grande"
      ? 1.15
      : configuracoes.tamanhoTexto === "muitoGrande"
        ? 1.3
        : 1;

  const fontFamily = configuracoes.textoNegrito
    ? "AnuphanBold"
    : "Anuphan";

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

  async function enviarMensagem(texto = mensagem) {
    const textoEnviado = texto.trim();

    if (!textoEnviado || digitando) return;

    const gerarId = (prefixo) =>
      `${prefixo}-${Date.now()}-${Math.random().toString(36).slice(2)}`;

    const novaMensagem = {
      id: gerarId("usuario"),
      texto: textoEnviado,
      autor: "usuario",
    };

    setMensagens((anteriores) => [...anteriores, novaMensagem]);
    setMensagem("");
    setDigitando(true);

    try {
      const respostaApi = await fetch(
        "https://scary-incantation-q7v4974ww77q2jp7-8000.app.github.dev/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            pergunta: textoEnviado,
          }),
        }
      );

      if (!respostaApi.ok) {
        throw new Error(`Erro HTTP ${respostaApi.status}`);
      }

      const dados = await respostaApi.json();

      if (
        typeof dados.response !== "string" ||
        !dados.response.trim()
      ) {
        throw new Error("A API não retornou uma resposta válida.");
      }

      setMensagens((anteriores) => [
        ...anteriores,
        {
          id: gerarId("ia"),
          texto: dados.response,
          autor: "ia",
        },
      ]);
    } catch (erro) {
      console.error("Erro ao consultar o Camisa10:", erro);

      setMensagens((anteriores) => [
        ...anteriores,
        {
          id: gerarId("erro"),
          texto:
            "Não consegui obter uma resposta agora. Tente novamente em instantes.",
          autor: "ia",
        },
      ]);
    } finally {
      setDigitando(false);
    }
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
          <View className="min-h-[62px] flex-row items-center border-b border-cartao-borda px-4 py-2">
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
              <ArrowLeftIcon
                size={23 * escalaIcone}
                color={cores.icon}
              />
            </Pressable>

            <View
              className="mr-3 items-center justify-center rounded-full border border-verde-claro bg-cartao"
              style={{
                width: 40 * escalaIcone,
                height: 40 * escalaIcone,
              }}
            >
              <SoccerBallIcon
                size={23 * escalaIcone}
                color="#39FF14"
              />
            </View>

            <View className="flex-1">
              <Texto tamanho={18} className="text-texto">
                Camisa10 IA
              </Texto>

              <Texto tamanho={12} className="text-verde">
                Seu assistente de futebol
              </Texto>
            </View>

            <View
              className="items-center justify-center rounded-full bg-cartao"
              style={{
                width: 40 * escalaIcone,
                height: 40 * escalaIcone,
              }}
            >
              <SparkleIcon
                size={21 * escalaIcone}
                color="#39FF14"
              />
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
                  <View
                    className="mb-4 items-center justify-center rounded-3xl border border-cartao-borda bg-cartao"
                    style={{
                      width: 76 * escalaIcone,
                      height: 76 * escalaIcone,
                    }}
                  >
                    <SoccerBallIcon
                      size={42 * escalaIcone}
                      color="#39FF14"
                    />
                  </View>

                  <Texto
                    tamanho={24}
                    className="mb-2 text-center text-texto"
                  >
                    Fala, torcedor!
                  </Texto>

                  <Texto
                    tamanho={14}
                    className="max-w-[290px] text-center leading-6 text-texto-sec"
                  >
                    Sou o Camisa10 IA, seu parceiro para conversar sobre futebol.
                    O que vamos discutir hoje?
                  </Texto>
                </View>

                {/* CARD DE APRESENTAÇÃO */}
                <View className="mb-7 rounded-2xl border border-cartao-borda bg-cartao-escuro p-4">
                  <View className="mb-3 flex-row items-center">
                    <View
                      className="mr-2 items-center justify-center rounded-lg bg-cartao"
                      style={{
                        width: 32 * escalaIcone,
                        height: 32 * escalaIcone,
                      }}
                    >
                      <LightbulbIcon
                        size={19 * escalaIcone}
                        color="#39FF14"
                      />
                    </View>

                    <Texto tamanho={14} className="flex-1 text-texto">
                      O que você pode perguntar?
                    </Texto>
                  </View>

                  <Texto
                    tamanho={14}
                    className="leading-6 text-texto-sec"
                  >
                    Descubra curiosidades, explore a história dos clubes,
                    entenda as regras e converse sobre o mundo da bola.
                  </Texto>
                </View>

                {/* SUGESTÕES DE PERGUNTAS */}
                <View>
                  <Texto
                    tamanho={16}
                    className="mb-3 text-texto"
                  >
                    Vamos começar?
                  </Texto>

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
                        <View
                          className="mr-3 items-center justify-center rounded-xl bg-cartao-escuro"
                          style={{
                            width: 36 * escalaIcone,
                            height: 36 * escalaIcone,
                          }}
                        >
                          {sugestao.icone === "newspaper" && (
                            <SparkleIcon
                              size={20 * escalaIcone}
                              color="#39FF14"
                            />
                          )}

                          {sugestao.icone === "trophy" && (
                            <SoccerBallIcon
                              size={20 * escalaIcone}
                              color="#39FF14"
                            />
                          )}

                          {sugestao.icone === "book" && (
                            <LightbulbIcon
                              size={20 * escalaIcone}
                              color="#39FF14"
                            />
                          )}

                          {sugestao.icone === "lightbulb" && (
                            <LightbulbIcon
                              size={20 * escalaIcone}
                              color="#39FF14"
                            />
                          )}
                        </View>

                        <Texto
                          tamanho={14}
                          className="flex-1 text-texto"
                        >
                          {sugestao.titulo}
                        </Texto>

                        <ArrowUpIcon
                          size={18 * escalaIcone}
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
                        <View
                          className="mr-2 mt-1 items-center justify-center rounded-full bg-cartao"
                          style={{
                            width: 32 * escalaIcone,
                            height: 32 * escalaIcone,
                          }}
                        >
                          <SparkleIcon
                            size={19 * escalaIcone}
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
                        <Texto
                          tamanho={14}
                          className="leading-6 text-texto"
                        >
                          {item.texto}
                        </Texto>
                      </View>
                    </View>
                  );
                })}

                {/* INDICADOR DE DIGITAÇÃO */}
                {digitando && (
                  <View className="flex-row items-center">
                    <View
                      className="mr-2 items-center justify-center rounded-full bg-cartao"
                      style={{
                        width: 32 * escalaIcone,
                        height: 32 * escalaIcone,
                      }}
                    >
                      <SparkleIcon
                        size={19 * escalaIcone}
                        color="#39FF14"
                      />
                    </View>

                    <View className="flex-row items-center rounded-2xl border border-cartao-borda bg-cartao-escuro px-4 py-3">
                      <ActivityIndicator
                        size="small"
                        color="#39FF14"
                      />

                      <Texto
                        tamanho={12}
                        className="ml-2 text-texto-sec"
                      >
                        Camisa10 IA está digitando...
                      </Texto>
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
                className="mb-0.5 items-center justify-center"
                style={({ pressed }) => ({
                  width: 36 * escalaIcone,
                  height: 40 * escalaIcone,
                  opacity: pressed ? 0.6 : 1,
                })}
                accessibilityRole="button"
                accessibilityLabel="Adicionar anexo"
              >
                <PlusIcon
                  size={23 * escalaIcone}
                  color="#A8B2B9"
                />
              </Pressable>

              <TextInput
                value={mensagem}
                onChangeText={setMensagem}
                placeholder="Pergunte sobre futebol..."
                placeholderTextColor="#6F7B83"
                multiline
                maxLength={2000}
                className="max-h-[150px] min-h-[42px] flex-1 px-2 py-2.5 text-texto"
                style={{
                  fontFamily,
                  fontSize: 14 * fontScale,
                  lineHeight: Math.ceil(14 * fontScale * 1.4),
                  textAlignVertical: "center",
                }}
                accessibilityLabel="Digite sua pergunta"
                returnKeyType="default"
              />

              <Pressable
                onPress={() => enviarMensagem()}
                disabled={!mensagem.trim() || digitando}
                className="mb-0.5 items-center justify-center rounded-xl bg-verde"
                style={({ pressed }) => ({
                  width: 40 * escalaIcone,
                  height: 40 * escalaIcone,
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
                  size={23 * escalaIcone}
                  color="#071018"
                  weight="bold"
                />
              </Pressable>
            </View>

            <Texto
              tamanho={10}
              className="mt-2 text-center text-texto-ter"
            >
              Camisa10 IA · Seu parceiro no mundo da bola
            </Texto>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}