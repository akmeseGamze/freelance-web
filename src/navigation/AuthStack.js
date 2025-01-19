import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthPage from "../screens/auth/AuthPage";
import LoginPage from "../screens/auth/LoginPage";
import SignUpPage from "../screens/auth/SignUpPage";

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
