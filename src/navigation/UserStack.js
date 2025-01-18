import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TaskCreate from "../screens/TaskCreate";
import RootStack from "./RootStack";
import TaskShow from "../screens/TaskShow";
const Stack = createNativeStackNavigator();

const UserStack = (props) => {
  return (
    <Stack.Navigator
      initialRouteName="root"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="task_create"
        options={{ headerShown: true, headerTitle: "Add Task" }}
        component={TaskCreate}
      />
      <Stack.Screen
        name="task_show"
        options={{ headerShown: true, headerTitle: "Task" }}
        component={TaskShow}
      />
      <Stack.Screen name="root" component={RootStack} />
    </Stack.Navigator>
  );
};
export default UserStack;
