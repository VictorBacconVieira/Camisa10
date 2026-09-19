import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Login } from "./src/screens/Login";
import { Cadastro } from "./src/screens/Cadastro";
import { Home } from "./src/screens/Home";
import { Quiz } from "./src/screens/Quiz";
import { Perfil } from "./src/screens/Perfil";





const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}