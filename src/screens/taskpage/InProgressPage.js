import { FlatList, StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import { Loading, SolidButton } from "../../components";
import TaskItem from "../../components/TaskItem";
import { useNavigation } from "@react-navigation/native";
import colors from "../../constants/color";
import { useDispatch, useSelector } from "react-redux";
import { fetchTaskDataInProgress } from "../../redux/tasksSlice";

const InProgressPage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { inprogress } = useSelector((state) => state.tasks);

  useEffect(() => {
    if (!inprogress) {
      dispatch(fetchTaskDataInProgress());
    }
  }, [inprogress]);

  return (
    <View style={styles.root}>
      {!inprogress ? <Loading /> : null}

      {inprogress ? (
        <>
          <View style={styles.main}>
            <View style={{ flex: 1, flexGrow: 1 }}>
              <FlatList
                style={styles.flatlist}
                data={inprogress}
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

export default InProgressPage;
