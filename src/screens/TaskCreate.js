import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet } from "react-native";
import { Loading } from "../components";
import { CustomTextInput } from "../components/input";
import { useCallback, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "../constants/color";
import { useDispatch } from "react-redux";
import { SolidButton } from "../components/button";
import { clearDashboardData } from "../redux/dashboardSlice";
import {
  clearTasksDataDone,
  clearTasksDataInProgress,
  clearTasksDataTodo,
} from "../redux/tasksSlice";
import config from "../constants/config";

const TaskCreate = () => {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  const createTask = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");

      if (!token) {
        return;
      }

      setIsLoading(true);

      const res = await axios(config.api + "/api/v1/freelancer/task/create", {
        method: "POST",
        data: JSON.stringify({
          authentication_token: token,
          title: title,
          description: description,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status != 200) {
        setIsLoading(false);
        return;
      }

      if (!res.data.task) {
        setIsLoading(false);
        return;
      }

      dispatch(clearDashboardData());
      dispatch(clearTasksDataDone());
      dispatch(clearTasksDataInProgress());
      dispatch(clearTasksDataTodo());
      navigation.navigate("root");
    } catch (e) {}
  }, [title, description]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <View style={styles.root}>
          <View style={styles.main}>
            <CustomTextInput
              title="Title"
              isSecureText={false}
              handleOnChangeText={setTitle}
              handleValue={title}
              handlePlaceholder="Enter Your Title"
            />
            <CustomTextInput
              title="Description"
              isSecureText={false}
              handleOnChangeText={setDescription}
              handleValue={description}
              rootStyle={{ marginTop: 16 }}
              handlePlaceholder="Enter Your Description"
            />
            <SolidButton
              buttonText="Add Task"
              handleOnPress={() => {
                createTask();
              }}
              rootStyle={{ marginTop: 32, backgroundColor: colors.blue }}
            />
          </View>
        </View>
      )}
    </>
  );
};

export default TaskCreate;

const styles = StyleSheet.create({
  root: {
    height: "100%",
    paddingHorizontal: 24,
    justifyContent: "flex-start",
    backgroundColor: colors.background,
  },
  main: {
    paddingHorizontal: 8,
    paddingTop: 8,
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
  },
});
