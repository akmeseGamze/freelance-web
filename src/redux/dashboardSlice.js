import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import config from "../constants/config";

export const clearDashboardData = createAsyncThunk(
  "freelancer/dashboard/clear",
  async () => {
    try {
      return true;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchDashboardData = createAsyncThunk(
  "freelancer/dashboard",
  async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");

      if (!token) {
        throw new Error("Error");
      }

      const res = await axios(config.api + "/api/v1/freelancer/dashboard", {
        method: "POST",
        data: JSON.stringify({
          authentication_token: token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

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
  data: null,
  error: null,
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(clearDashboardData.fulfilled, (state, action) => {
        state.data = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.data = action.payload.data;
      })
      .addCase(fetchDashboardData.rejected, (state) => {
        state.error = action.error.message;
      });
  },
});

export const { setDashboardData } = dashboardSlice.actions;
export default dashboardSlice.reducer;
