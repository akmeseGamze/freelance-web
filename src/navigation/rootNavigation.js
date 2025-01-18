import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import UserStack from "./UserStack";
import AuthStack from "./AuthStack";
import { useSelector } from "react-redux";
import UserNotActivePage from "../screens/UserNotActivePage";
const rootNavigation = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <NavigationContainer>
      {!user ? (
        <AuthStack />
      ) : user.activated_at ? (
        <UserStack />
      ) : (
        <UserNotActivePage />
      )}
      ,
    </NavigationContainer>
  );
};

export default rootNavigation;
