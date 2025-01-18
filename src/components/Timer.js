import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import colors from "../constants/color";
import SolidButton from "./SolidButton";
import { useDispatch } from "react-redux";
import { clearDashboardData } from "../redux/dashboardSlice";
import {
  clearTasksDataDone,
  clearTasksDataInProgress,
  clearTasksDataTodo,
} from "../redux/tasksSlice";

const Timer = ({ task }) => {
  const dispatch = useDispatch();
  const [time, setTime] = useState(
    task.counter_started_at
      ? task.counter_duration
        ? Math.floor(task.counter_duration / 1000) +
          Math.floor(
            (Date.now() - new Date(task.counter_started_at).getTime()) / 1000
          )
        : Math.floor(
            (Date.now() - new Date(task.counter_started_at).getTime()) / 1000
          )
      : task.counter_duration
      ? Math.floor(task.counter_duration / 1000)
      : 0
  );

  // State to check if the timer is running
  const [isRunning, setIsRunning] = useState(
    task.counter_started_at ? true : false
  );
  const [isFetching, setIsFetching] = useState(false);

  const startTimer = useCallback(async () => {
    try {
      if (isFetching) {
        return;
      }

      if (isRunning) {
        return;
      }

      setIsFetching(true);

      const token = await AsyncStorage.getItem("userToken");

      if (!token) {
        setIsFetching(false);
        return;
      }

      const res = await axios(
        "https://bug-free-chainsaw-rq45p4rx9g5h5rjj-3000.app.github.dev/api/v1/freelancer/task/counter/start",
        {
          method: "POST",
          data: JSON.stringify({
            authentication_token: token,
            id: task._id,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status != 200) {
        setIsFetching(false);
        return;
      }

      setIsRunning(true);
      setIsFetching(false);
      dispatch(clearDashboardData());
      dispatch(clearTasksDataDone());
      dispatch(clearTasksDataInProgress());
      dispatch(clearTasksDataTodo());
    } catch (e) {}
  }, [isRunning, isFetching]);

  const stopTimer = useCallback(async () => {
    try {
      if (isFetching) {
        return;
      }

      if (!isRunning) {
        return;
      }

      setIsFetching(true);

      const token = await AsyncStorage.getItem("userToken");

      if (!token) {
        setIsFetching(false);
        return;
      }

      const res = await axios(
        "https://bug-free-chainsaw-rq45p4rx9g5h5rjj-3000.app.github.dev/api/v1/freelancer/task/counter/stop",
        {
          method: "POST",
          data: JSON.stringify({
            authentication_token: token,
            id: task._id,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status != 200) {
        setIsFetching(false);
        return;
      }

      setIsRunning(false);
      setIsFetching(false);
      dispatch(clearDashboardData());
    } catch (e) {}
  }, [isRunning, isFetching]);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>{formatTime(time)}</Text>
      {task.state != "done" ? (
        <View style={styles.buttonContainer}>
          {!isRunning ? (
            time > 0 ? (
              <SolidButton
                buttonText="Continue"
                handleOnPress={startTimer}
                disabled={isFetching}
                rootStyle={{ backgroundColor: colors.blue, borderRadius: 1000 }}
              />
            ) : (
              <SolidButton
                buttonText="Start"
                handleOnPress={startTimer}
                disabled={isFetching}
                rootStyle={{ backgroundColor: colors.blue, borderRadius: 1000 }}
              />
            )
          ) : (
            <SolidButton
              buttonText="Pause"
              handleOnPress={stopTimer}
              disabled={isFetching}
              rootStyle={{ backgroundColor: colors.blue, borderRadius: 1000 }}
            />
          )}
        </View>
      ) : null}
    </View>
  );
};

export default Timer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  timerText: {
    fontSize: 48,
    fontWeight: "bold",
    color: colors.baseText,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
  },
});
