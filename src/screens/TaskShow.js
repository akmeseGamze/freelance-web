import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Loading, SolidButton, Timer } from "../components";
import colors from "../constants/color";
import { useDispatch } from "react-redux";
import { clearDashboardData } from "../redux/dashboardSlice";
import {
  clearTasksDataDone,
  clearTasksDataInProgress,
  clearTasksDataTodo,
} from "../redux/tasksSlice";

const TaskShow = (props) => {
  const navigation = useNavigation();
  const { id } = props.route.params;
  const [task, setTask] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const fetchTask = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");

      if (!token) {
        return;
      }

      const res = await axios(
        "https://bug-free-chainsaw-rq45p4rx9g5h5rjj-3000.app.github.dev/api/v1/freelancer/task",
        {
          method: "POST",
          data: JSON.stringify({
            authentication_token: token,
            id: id,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status != 200) {
        return;
      }

      if (!res.data.task) {
        return;
      }

      setTask(res.data.task);
    } catch (e) {}
  }, [setTask, id]);

  useEffect(() => {
    fetchTask();
  }, [id]);
  const deleteTask = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");

      if (!token) {
        return;
      }

      setIsLoading(true);

      const res = await axios(
        "https://bug-free-chainsaw-rq45p4rx9g5h5rjj-3000.app.github.dev/api/v1/freelancer/task/delete",
        {
          method: "POST",
          data: JSON.stringify({
            authentication_token: token,
            id: id,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status != 200) {
        setIsLoading(false);
        return;
      }

      if (res.data.message != "task_deleted") {
        setIsLoading(false);
        return;
      }

      dispatch(clearDashboardData());
      dispatch(clearTasksDataDone());
      dispatch(clearTasksDataInProgress());
      dispatch(clearTasksDataTodo());
      navigation.goBack();
    } catch (e) {}
  }, [id]);

  const updateTaskState = useCallback(
    async (state) => {
      try {
        const token = await AsyncStorage.getItem("userToken");

        if (!token) {
          return;
        }

        setIsLoading(true);

        const res = await axios(
          "https://bug-free-chainsaw-rq45p4rx9g5h5rjj-3000.app.github.dev/api/v1/freelancer/task/update/state",
          {
            method: "POST",
            data: JSON.stringify({
              authentication_token: token,
              id: id,
              state: state,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (res.status != 200) {
          setIsLoading(false);
          return;
        }

        const receivedTask = res.data.task;

        if (!receivedTask) {
          setIsLoading(false);
          return;
        }

        dispatch(clearDashboardData());
        dispatch(clearTasksDataDone());
        dispatch(clearTasksDataInProgress());
        dispatch(clearTasksDataTodo());
        setTask(receivedTask);
        setIsLoading(false);
      } catch (e) {}
    },
    [id]
  );

  return (
    <>
      {task ? (
        isLoading ? (
          <Loading />
        ) : (
          <View
            style={{
              flex: 1,
              padding: 24,
              backgroundColor: colors.background,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 24,
                color: colors.baseText,
              }}
            >
              {task.title}
            </Text>
            <Text
              style={{
                marginTop: 6,
                fontSize: 16,
                color: colors.baseText,
              }}
            >
              {task.description}
            </Text>

            <View style={{ flex: 1 }}></View>

            {task.state == "in_progress" ? <Timer task={task}></Timer> : null}
            {task.state == "done" ? <Timer task={task}></Timer> : null}
            {task.state == "in_progress" ? (
              <View>
                <SolidButton
                  buttonText="Done"
                  handleOnPress={() => {
                    updateTaskState("done");
                  }}
                  rootStyle={{
                    backgroundColor: colors.green,
                    borderRadius: 1000,
                    marginTop: 8,
                  }}
                />
              </View>
            ) : null}
            {task.state == "in_progress" ? (
              <View>
                <SolidButton
                  buttonText="Stop"
                  handleOnPress={() => {
                    updateTaskState("todo");
                  }}
                  rootStyle={{
                    backgroundColor: colors.gray,
                    borderRadius: 1000,
                    marginTop: 8,
                  }}
                />
              </View>
            ) : null}
            {task.state == "todo" ? (
              <View>
                <SolidButton
                  buttonText="Start"
                  handleOnPress={() => {
                    updateTaskState("in_progress");
                  }}
                  rootStyle={{
                    backgroundColor: colors.blue,
                    borderRadius: 1000,
                    marginTop: 8,
                  }}
                />
              </View>
            ) : null}
            <View>
              <SolidButton
                buttonText="Delete"
                handleOnPress={deleteTask}
                rootStyle={{
                  backgroundColor: colors.red,
                  borderRadius: 1000,
                  marginTop: 8,
                }}
              />
            </View>
          </View>
        )
      ) : (
        <Loading />
      )}
    </>
  );
};

export default TaskShow;
