import React from "react";
import { AuthPage, LoginPage, SignUpPage } from "../screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="auth"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="auth" component={AuthPage} />
      <Stack.Screen name="login" component={LoginPage} />
      <Stack.Screen name="signup" component={SignUpPage} />
    </Stack.Navigator>
  );
};

export default AuthStack;
