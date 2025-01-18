import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import dashboardReducer from "./dashboardSlice";
import tasksReducer from "./tasksSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    dashboard: dashboardReducer,
    tasks: tasksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
