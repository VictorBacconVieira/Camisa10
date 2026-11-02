
import { useState } from "react";

import {
  View,
  Text,
  Image,
  Modal,
  Pressable,
  Platform,
} from "react-native";

import * as ImagePicker from "expo-image-picker";

import {
  CameraIcon,
  ImagesIcon,
  XIcon,
  CheckCircleIcon,
  WarningCircleIcon,
  UserIcon,
} from "phosphor-react-native";

export function FotoPerfil({
  foto,
  nome = "",
  onFotoSelecionada,
  tamanho = 112,
}) {
  const [modalVisivel, setModalVisivel] = useState(false);
  const [mensagemErro, setMensagemErro] = useState("");

  async function selecionarGaleria() {
    setMensagemErro("");

    const permissao =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissao.granted) {
      setMensagemErro(
        "Precisamos de permissão para acessar sua galeria. Verifique as configurações do dispositivo."
      );
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!resultado.canceled && resultado.assets?.length > 0) {
      onFotoSelecionada?.(resultado.assets[0].uri);
      setModalVisivel(false);
      setMensagemErro("");
    }
  }

  async function tirarFoto() {
    setMensagemErro("");

    if (Platform.OS === "web") {
      setMensagemErro(
        "A câmera está disponível somente na versão mobile do aplicativo."
      );
      return;
    }

    const permissao =
      await ImagePicker.requestCameraPermissionsAsync();

    if (!permissao.granted) {
      setMensagemErro(
        "Precisamos de permissão para utilizar sua câmera. Verifique as configurações do dispositivo."
      );
      return;
    }

    const resultado = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!resultado.canceled && resultado.assets?.length > 0) {
      onFotoSelecionada?.(resultado.assets[0].uri);
      setModalVisivel(false);
      setMensagemErro("");
    }
  }

  function fecharModal() {
    setModalVisivel(false);
    setMensagemErro("");
  }

  return (
    <>
      {/* FOTO E BOTÃO DE EDIÇÃO */}

      <View style={{ alignItems: "center" }}>
        <Pressable
          onPress={() => setModalVisivel(true)}
          style={{
            width: tamanho,
            height: tamanho,
            borderRadius: tamanho / 2,
            backgroundColor: "#16232D",
            borderWidth: 3,
            borderColor: "#00C853",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {foto ? (
            <Image
              source={{ uri: foto }}
              style={{
                width: tamanho - 6,
                height: tamanho - 6,
                borderRadius: tamanho / 2,
              }}
            />
            ) : (
            <UserIcon
                size={tamanho * 0.45}
                color="#00C853"
                weight="regular"
            />
            )}

          <View
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: 34,
              height: 34,
              borderRadius: 17,
              backgroundColor: "#00C853",
              borderWidth: 3,
              borderColor: "#071018",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CameraIcon
              size={17}
              color="#071018"
              weight="bold"
            />
          </View>
        </Pressable>

        <Text
          style={{
            color: "#A8B2B9",
            fontSize: 13,
            marginTop: 12,
          }}
        >
          Toque na foto para alterá-la
        </Text>
      </View>

      {/* MODAL DE SELEÇÃO */}

      <Modal
        visible={modalVisivel}
        transparent
        animationType="fade"
        onRequestClose={fecharModal}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.78)",
            justifyContent: "center",
            paddingHorizontal: 24,
          }}
        >
          <Pressable
            onPress={fecharModal}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            }}
          />

          <View
            style={{
              backgroundColor: "#16232D",
              borderRadius: 22,
              padding: 22,
              borderWidth: 1,
              borderColor: "#26343E",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <Text
                style={{
                  color: "#F5F7F8",
                  fontSize: 19,
                  fontWeight: "bold",
                }}
              >
                Foto de perfil
              </Text>

              <Pressable onPress={fecharModal}>
                <XIcon size={23} color="#A8B2B9" />
              </Pressable>
            </View>

            <Text
              style={{
                color: "#A8B2B9",
                fontSize: 13,
                marginBottom: 22,
              }}
            >
              Como deseja escolher sua foto?
            </Text>

            {/* GALERIA */}

            <Pressable
              onPress={selecionarGaleria}
              style={{
                backgroundColor: "#111D27",
                borderWidth: 1,
                borderColor: "#26343E",
                borderRadius: 14,
                padding: 16,
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <View
                style={{
                  width: 43,
                  height: 43,
                  borderRadius: 12,
                  backgroundColor: "rgba(0,200,83,0.13)",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ImagesIcon
                  size={23}
                  color="#00C853"
                  weight="fill"
                />
              </View>

              <View style={{ marginLeft: 13, flex: 1 }}>
                <Text
                  style={{
                    color: "#F5F7F8",
                    fontSize: 14,
                    fontWeight: "bold",
                  }}
                >
                  Escolher da galeria
                </Text>

                <Text
                  style={{
                    color: "#A8B2B9",
                    fontSize: 12,
                    marginTop: 3,
                  }}
                >
                  Selecione uma imagem do dispositivo
                </Text>
              </View>
            </Pressable>

            {/* CÂMERA */}

            {Platform.OS !== "web" && (
              <Pressable
                onPress={tirarFoto}
                style={{
                  backgroundColor: "#111D27",
                  borderWidth: 1,
                  borderColor: "#26343E",
                  borderRadius: 14,
                  padding: 16,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: 43,
                    height: 43,
                    borderRadius: 12,
                    backgroundColor: "rgba(0,200,83,0.13)",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CameraIcon
                    size={23}
                    color="#00C853"
                    weight="fill"
                  />
                </View>

                <View style={{ marginLeft: 13, flex: 1 }}>
                  <Text
                    style={{
                      color: "#F5F7F8",
                      fontSize: 14,
                      fontWeight: "bold",
                    }}
                  >
                    Tirar uma foto
                  </Text>

                  <Text
                    style={{
                      color: "#A8B2B9",
                      fontSize: 12,
                      marginTop: 3,
                    }}
                  >
                    Utilize a câmera do dispositivo
                  </Text>
                </View>
              </Pressable>
            )}

            {/* MENSAGEM DE ERRO */}

            {!!mensagemErro && (
              <View
                style={{
                  marginTop: 16,
                  padding: 12,
                  borderRadius: 12,
                  backgroundColor: "rgba(229,57,53,0.12)",
                  borderWidth: 1,
                  borderColor: "rgba(229,57,53,0.4)",
                  flexDirection: "row",
                  alignItems: "flex-start",
                }}
              >
                <WarningCircleIcon
                  size={20}
                  color="#E53935"
                  weight="fill"
                />

                <Text
                  style={{
                    color: "#F5F7F8",
                    fontSize: 12,
                    lineHeight: 18,
                    flex: 1,
                    marginLeft: 9,
                  }}
                >
                  {mensagemErro}
                </Text>
              </View>
            )}

            {/* CANCELAR */}

            <Pressable
              onPress={fecharModal}
              style={{
                alignItems: "center",
                paddingVertical: 13,
                marginTop: 12,
              }}
            >
              <Text
                style={{
                  color: "#A8B2B9",
                  fontWeight: "600",
                }}
              >
                Cancelar
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}