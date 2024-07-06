import { configureStore } from "@reduxjs/toolkit";
import tasksReducer, { TasksState } from "./tasksReducer";

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = {
  tasks: TasksState;
};

export type AppDispatch = typeof store.dispatch;

export default store;
