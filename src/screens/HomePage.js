import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect } from "react";
import { Loading, SolidButton } from "../components";
import TaskItem from "../components/TaskItem";
import { useNavigation } from "@react-navigation/native";
import colors from "../constants/color";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardData } from "../redux/dashboardSlice";

const HomePage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.dashboard);

  useEffect(() => {
    if (!data) {
      dispatch(fetchDashboardData());
    }
  }, [data]);

  return (
    <View style={styles.root}>
      {!data ? <Loading /> : null}

      {data ? (
        <>
          <View style={styles.main}>
            <Text style={styles.title}>Tasks</Text>
            <View style={{ flex: 1, flexGrow: 1 }}>
              <FlatList
                style={styles.flatlist}
                data={data.tasks}
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

export default HomePage;

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
  title: {
    width: "100%",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "left",
    //color: "gray",
    color: colors.baseText,
  },
  flatlist: {
    width: "100%",
    padding: 0,
    margin: 0,
    paddingVertical: 10,
  },
});
