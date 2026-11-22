import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "./global.css";

import { Login } from "./src/screens/Login";
import { Cadastro } from "./src/screens/Cadastro";
import { Home } from "./src/screens/Home";
import { Noticias } from "./src/screens/Noticias";
import { Jogos } from "./src/screens/Jogos";
import { DetalhesJogos } from "./src/screens/DetalhesJogos";
import { Quiz } from "./src/screens/Quiz";
import { QuizPerguntas } from "./src/screens/QuizPerguntas";
import { Perfil } from "./src/screens/Perfil";
import { EditarPerfil } from "./src/screens/EditarPerfil";
import { Acessibilidade } from "./src/screens/Acessibilidade"
import { Chatbot } from "./src/screens/Chatbot";

import { AuthProvider, useAuth } from "./src/context/AuthContext";
import { ThemeProvider } from "./src/context/ThemeContext";
import { AccessibilityProvider } from "./src/context/AccessibilityContext";

import { useFonts } from "expo-font";
import { Anuphan_400Regular, Anuphan_700Bold, } from "@expo-google-fonts/anuphan";

const Stack = createNativeStackNavigator();

function NavegacaoPrincipal() {
  const { usuario, carregando } = useAuth();

  if (carregando) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={usuario ? "Home" : "Login"}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Noticias" component={Noticias} />
        <Stack.Screen name="Jogos" component={Jogos} />
        <Stack.Screen name="DetalhesJogos" component={DetalhesJogos} />
        <Stack.Screen name="Quiz" component={Quiz} />
        <Stack.Screen name="QuizPerguntas" component={QuizPerguntas} />
        <Stack.Screen name="Perfil" component={Perfil} />
        <Stack.Screen name="EditarPerfil" component={EditarPerfil} />
        <Stack.Screen name="Acessibilidade" component={Acessibilidade} />
        <Stack.Screen name="Chatbot" component={Chatbot} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Anuphan: Anuphan_400Regular,
    AnuphanBold: Anuphan_700Bold,
  });

  if (!fontsLoaded) return null;

  return (
    <ThemeProvider>
      <AuthProvider>
        <AccessibilityProvider>
          <NavegacaoPrincipal />
        </AccessibilityProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}