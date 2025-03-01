import { FlatList, StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import { Loading, TaskItem } from "../../components";
import { useNavigation } from "@react-navigation/native";
import colors from "../../constants/color";
import { useDispatch, useSelector } from "react-redux";
import { fetchTaskDataTodo } from "../../redux/tasksSlice";
import { SolidButton } from "../../components/button";

const ToDoPage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { todo } = useSelector((state) => state.tasks);

  useEffect(() => {
    if (!todo) {
      dispatch(fetchTaskDataTodo());
    }
  }, [todo]);

  return (
    <View style={styles.root}>
      {!todo ? <Loading /> : null}

      {todo ? (
        <>
          <View style={styles.main}>
            <View style={{ flex: 1, flexGrow: 1 }}>
              <FlatList
                style={styles.flatlist}
                data={todo}
                renderItem={(value) => {
                  return <TaskItem task={value.item} />;
                }}
                contentContainerStyle={{ flexGrow: 1 }}
              />
            </View>
            <View style={styles.list_footer}>
              <SolidButton
                buttonText="Add Task"
                rootStyle={{ backgroundColor: colors.blue }}
                handleOnPress={() => navigation.navigate("task_create")}
              />
            </View>
          </View>
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    height: "100%",
    backgroundColor: colors.background,
  },
  main: {
    flex: 1,
    display: "flex",
    padding: 10,
    paddingHorizontal: 42,
    flexGrow: 1,
    justifyContent: "center",
    paddingBottom: 12,
  },
  list_footer: {
    alignItems: "center",
    justifyContent: "center",
  },
  flatlist: {
    width: "100%",
    padding: 0,
    margin: 0,
    paddingVertical: 10,
  },
});

export default ToDoPage;
