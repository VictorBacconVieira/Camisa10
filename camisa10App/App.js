import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "./global.css";

import { Login } from "./src/screens/Login";
import { Cadastro } from "./src/screens/Cadastro";
import { Home } from "./src/screens/Home";
import { Noticias } from "./src/screens/Noticias";
import { Jogos } from "./src/screens/Jogos";
import { Quiz } from "./src/screens/Quiz";
import { Perfil } from "./src/screens/Perfil";
import { Chatbot } from "./src/screens/Chatbot";
import { QuizPerguntas } from "./src/screens/QuizPerguntas";



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Noticias" component={Noticias} />
        <Stack.Screen name="Jogos" component={Jogos} />
        <Stack.Screen name="Quiz" component={Quiz} />
        <Stack.Screen name="Perfil" component={Perfil} />
        <Stack.Screen name="Chatbot" component={Chatbot} />
        <Stack.Screen name="QuizPerguntas" component={QuizPerguntas} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}