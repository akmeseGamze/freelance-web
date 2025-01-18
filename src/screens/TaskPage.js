import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ToDoPage from "./taskpage/ToDoPage";
import InProgressPage from "./taskpage/InProgressPage";
import DonePage from "./taskpage/DonePage";
import colors from "../constants/color";

const TaskPage = () => {
  const [page, setPage] = useState("todo");

  const taskButton = ({ buttonText, handleOnPress, active }) => {
    return (
      <Pressable
        onPress={() => handleOnPress()}
        style={[
          styles.taskButtonRoot,
          { backgroundColor: active ? colors.blue : colors.gray },
        ]}
      >
        <Text style={styles.taskButtonText}>{buttonText}</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        {taskButton({
          active: page == "todo",
          buttonText: "ToDo",
          handleOnPress: () => {
            setPage("todo");
          },
        })}
        {taskButton({
          active: page == "in_progress",
          buttonText: "In Progress",
          handleOnPress: () => {
            setPage("in_progress");
          },
        })}
        {taskButton({
          active: page == "done",
          buttonText: "Done",
          handleOnPress: () => {
            setPage("done");
          },
        })}
      </View>
      {page == "todo" ? <ToDoPage></ToDoPage> : <></>}
      {page == "in_progress" ? <InProgressPage></InProgressPage> : <></>}
      {page == "done" ? <DonePage></DonePage> : <></>}
    </View>
  );
};

export default TaskPage;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    height: "100%",
    backgroundColor: colors.background,
    padding: 8,
  },
  header: {
    justifyContent: "space-evenly",
    gap: 2,
    flexDirection: "row",
  },
  taskButtonRoot: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 1000,
    alignItems: "center",
    justifyContent: "center",
  },
  taskButtonText: {
    fontWeight: "bold",
    color: "white",
  },
});
