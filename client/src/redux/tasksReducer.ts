import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Tasks {
  tasks: Task[];
  x?: string;
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  dueDate?: string;
}

export interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    fetchTasksStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchTasksSuccess(state, action: PayloadAction<Task[]>) {
      state.tasks = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchTasksFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addTaskStart(state) {
      state.loading = true;
      state.error = null;
    },
    addTaskSuccess(state, action: PayloadAction<Task>) {
      state.tasks.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    addTaskFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    updateTaskStart(state) {
      state.loading = true;
      state.error = null;
    },
    updateTaskSuccess(state, action: PayloadAction<Task>) {
      const updatedTask = action.payload;
      const index = state.tasks.findIndex((task) => task.id === updatedTask.id);
      if (index !== -1) {
        state.tasks[index] = updatedTask;
      }
      state.loading = false;
      state.error = null;
    },
    updateTaskFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteTaskStart(state) {
      state.loading = true;
      state.error = null;
    },
    deleteTaskSuccess(state, action: PayloadAction<number>) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      state.loading = false;
      state.error = null;
    },
    deleteTaskFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchTasksStart,
  fetchTasksSuccess,
  fetchTasksFailure,
  addTaskStart,
  addTaskSuccess,
  addTaskFailure,
  updateTaskStart,
  updateTaskSuccess,
  updateTaskFailure,
  deleteTaskStart,
  deleteTaskSuccess,
  deleteTaskFailure,
} = tasksSlice.actions;

export default tasksSlice.reducer;
