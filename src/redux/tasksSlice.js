import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const clearTasksDataTodo = createAsyncThunk(
  "freelancer/tasks/clear/todo",
  async () => {
    try {
      return true;
    } catch (error) {
      throw error;
    }
  }
);

export const clearTasksDataDone = createAsyncThunk(
  "freelancer/tasks/clear/done",
  async () => {
    try {
      return true;
    } catch (error) {
      throw error;
    }
  }
);

export const clearTasksDataInProgress = createAsyncThunk(
  "freelancer/tasks/clear/inprogress",
  async () => {
    try {
      return true;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchTaskDataTodo = createAsyncThunk(
  "freelancer/tasks/todo",
  async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");

      if (!token) {
        throw new Error("Error");
      }

      const res = await axios(
        "https://bug-free-chainsaw-rq45p4rx9g5h5rjj-3000.app.github.dev/api/v1/freelancer/task/list",
        {
          method: "POST",
          data: JSON.stringify({
            authentication_token: token,
            state: "todo",
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status != 200) {
        throw new Error("Error");
      }

      const tasks = res.data.tasks;

      if (!tasks) {
        throw new Error("Error");
      }

      return {
        data: {
          tasks: tasks,
        },
      };
    } catch (error) {
      throw error;
    }
  }
);

export const fetchTaskDataDone = createAsyncThunk(
  "freelancer/tasks/done",
  async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");

      if (!token) {
        throw new Error("Error");
      }

      const res = await axios(
        "https://bug-free-chainsaw-rq45p4rx9g5h5rjj-3000.app.github.dev/api/v1/freelancer/task/list",
        {
          method: "POST",
          data: JSON.stringify({
            authentication_token: token,
            state: "done",
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status != 200) {
        throw new Error("Error");
      }

      const tasks = res.data.tasks;

      if (!tasks) {
        throw new Error("Error");
      }

      return {
        data: {
          tasks: tasks,
        },
      };
    } catch (error) {
      throw error;
    }
  }
);

export const fetchTaskDataInProgress = createAsyncThunk(
  "freelancer/tasks/inprogress",
  async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");

      if (!token) {
        throw new Error("Error");
      }

      const res = await axios(
        "https://bug-free-chainsaw-rq45p4rx9g5h5rjj-3000.app.github.dev/api/v1/freelancer/task/list",
        {
          method: "POST",
          data: JSON.stringify({
            authentication_token: token,
            state: "in_progress",
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status != 200) {
        throw new Error("Error");
      }

      const tasks = res.data.tasks;

      if (!tasks) {
        throw new Error("Error");
      }

      return {
        data: {
          tasks: tasks,
        },
      };
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  todo: null,
  done: null,
  inprogress: null,
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(clearTasksDataTodo.fulfilled, (state, action) => {
        state.todo = null;
      })
      .addCase(clearTasksDataInProgress.fulfilled, (state, action) => {
        state.inprogress = null;
      })
      .addCase(clearTasksDataDone.fulfilled, (state, action) => {
        state.done = null;
      })
      .addCase(fetchTaskDataTodo.fulfilled, (state, action) => {
        state.todo = action.payload.data.tasks;
      })
      .addCase(fetchTaskDataInProgress.fulfilled, (state, action) => {
        state.inprogress = action.payload.data.tasks;
      })
      .addCase(fetchTaskDataDone.fulfilled, (state, action) => {
        state.done = action.payload.data.tasks;
      });
  },
});

export default tasksSlice.reducer;
