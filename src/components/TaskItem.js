import { useNavigation } from "@react-navigation/native";
import Divider from "./Divider";
import { StyleSheet, View, Text, Pressable } from "react-native";
import colors from "../constants/color";

const TaskItem = ({ task }) => {
  const navigation = useNavigation();

  const getStateColor = (state) => {
    switch (state) {
      case "in_progress":
        return colors.orange;
      case "done":
        return colors.green;

      default:
        return colors.gray;
    }
  };

  return (
    <Pressable
      onPress={() => {
        navigation.navigate("task_show", { id: task._id });
      }}
      style={styles.root}
    >
      <Text style={styles.title}>{task.title}</Text>
      <Text style={styles.description} numberOfLines={2}>
        {task.description}
      </Text>
      <View
        style={[styles.state, { backgroundColor: getStateColor(task.state) }]}
      ></View>
      <Divider rootStyle={{ width: "100%" }} />
    </Pressable>
  );
};

export default TaskItem;

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "medium",
    color: "black",
    color: colors.baseText,
  },
  description: {
    marginRight: 48,
    color: colors.baseText,
  },
  state: {
    width: 10,
    height: 10,
    borderRadius: 7.5,
    marginTop: 5,
    position: "absolute",
    right: 5,
    top: 5,
  },
  root: {
    position: "relative",
  },
});
