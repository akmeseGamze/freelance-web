import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import TaskPage from "../screens/TaskPage";
import { Pressable } from "react-native";
import colors from "../constants/color";
import { View } from "react-native-web";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import HomePage from "../screens/HomePage";
import ProfilePage from "../screens/ProfilePage";
const Tab = createBottomTabNavigator();

const RootStack = () => {
  const dispatch = useDispatch();

  return (
    <Tab.Navigator
      detachInactiveScreens={false}
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerRight: () => {
          if (route.name == "Home") {
            return (
              <View style={{ paddingRight: 12 }}>
                <Pressable
                  onPress={() => {
                    dispatch(logout());
                  }}
                >
                  <Icon name={"log-out"} size={24} color={colors.gray} />
                </Pressable>
              </View>
            );
          }

          return null;
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name == "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name == "Tasks") {
            iconName = focused ? "menu" : "menu-outline";
          } else if (route.name == "Profile") {
            iconName = focused ? "person-circle" : "person-circle-outline";
          }
          return <Icon name={iconName} size={size} color={color} />;
        },

        tabBarActiveTintColor: colors.blue,
        tabBarInactiveTintColor: colors.gray,
        tabBarStyle: { backgroundColor: "#f8f8f8" },
      })}
    >
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="Profile" component={ProfilePage} />
      <Tab.Screen name="Tasks" component={TaskPage} />
    </Tab.Navigator>
  );
};

export default RootStack;
