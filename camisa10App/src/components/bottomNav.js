import { Pressable, Text, View } from "react-native";

import {
  HouseIcon,
  NewspaperIcon,
  SoccerBallIcon,
  QuestionIcon,
  UserIcon,
} from "phosphor-react-native";

import { useNavigation, useRoute } from "@react-navigation/native";

export function BottomNav() {
  const navigation = useNavigation();
  const route = useRoute();

  function BotaoNavegacao({
    nome,
    icone: Icon,
    tela,
  }) {
    const ativo = route.name === tela;

    return (
      <Pressable
        onPress={() => navigation.navigate(tela)}
        className="h-[60px] w-[60px] items-center justify-center"
        style={({ pressed }) => ({
          opacity: pressed ? 0.6 : 1,
          transform: [
            {
              scale: pressed ? 0.92 : 1,
            },
          ],
        })}
      >
        <Icon
          size={26}
          color={ativo ? "#00C853" : "#F5F7F8"}
          weight={ativo ? "fill" : "regular"}
        />

        <Text
          className={`mt-1 text-sm ${
            ativo
              ? "text-verde"
              : "text-texto"
          }`}
          style={{
            fontFamily: "Inter",
          }}
        >
          {nome}
        </Text>
      </Pressable>
    );
  }

  return (
    <View className="absolute bottom-0 left-0 right-0 h-[95px] flex-row items-center justify-around bg-cartao">

      <BotaoNavegacao
        nome="Início"
        icone={HouseIcon}
        tela="Home"
      />

      <BotaoNavegacao
        nome="Notícias"
        icone={NewspaperIcon}
        tela="Noticias"
      />

      <BotaoNavegacao
        nome="Jogos"
        icone={SoccerBallIcon}
        tela="Jogos"
      />

      <BotaoNavegacao
        nome="Quiz"
        icone={QuestionIcon}
        tela="Quiz"
      />

      <BotaoNavegacao
        nome="Perfil"
        icone={UserIcon}
        tela="Perfil"
      />

    </View>
  );
}