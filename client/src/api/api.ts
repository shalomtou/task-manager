import axios from "axios";
import {
  Task,
  Tasks,
  addTaskFailure,
  addTaskStart,
  addTaskSuccess,
  deleteTaskFailure,
  deleteTaskStart,
  deleteTaskSuccess,
  fetchTasksFailure,
  fetchTasksStart,
  fetchTasksSuccess,
  updateTaskFailure,
  updateTaskStart,
  updateTaskSuccess,
} from "../redux/tasksReducer";
import { AppDispatch } from "../redux/store";
const { VITE_URL } = import.meta.env;

export const fetchTasks = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(fetchTasksStart());
    const response = await axios.get<Tasks[]>(VITE_URL + "/api/");
    console.log(response);
    dispatch(fetchTasksSuccess(response.data));
  } catch (error) {
    console.log(error);
    dispatch(fetchTasksFailure(error.message || "Failed to fetch tasks"));
  }
};

export const addTask = (newTask: Task) => async (dispatch: AppDispatch) => {
  try {
    dispatch(addTaskStart());
    const response = await axios.post<Task>(VITE_URL + "/api/", newTask);
    dispatch(addTaskSuccess(response.data));
  } catch (error) {
    dispatch(addTaskFailure(error.message || "Failed to add task"));
  }
};

export const updateTask =
  (updatedTask: Task) => async (dispatch: AppDispatch) => {
    try {
      dispatch(updateTaskStart());
      const response = await axios.put<Task>(
        VITE_URL + `/api/${updatedTask.id}`,
        updatedTask
      );
      dispatch(updateTaskSuccess(response.data));
    } catch (error) {
      dispatch(updateTaskFailure(error.message || "Failed to update task"));
    }
  };

export const deleteTask = (taskId: number) => async (dispatch: AppDispatch) => {
  try {
    dispatch(deleteTaskStart());
    await axios.delete(VITE_URL + `/api/${taskId}`);
    dispatch(deleteTaskSuccess(taskId));
  } catch (error) {
    dispatch(deleteTaskFailure(error.message || "Failed to delete task"));
  }
};
