import { Request, Response } from "express";
import Task from "../models/Task";

async function getAllTasks(req: Request, res: Response): Promise<void> {
  try {
    const tasks = await Task.findAll();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).send("Error retrieving tasks");
  }
}
async function getTaskById(req: Request, res: Response): Promise<void> {
  const taskId: number = parseInt(req.params.id, 10);
  try {
    const task = await Task.findByPk(taskId);
    if (!task) {
      res.status(404).send("Task not found");
      return;
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).send("Error retrieving task");
  }
}

async function createTask(req: Request, res: Response): Promise<void> {
  const { title, description, dueDate, ...rest } = req.body;
  try {
    const newTask = await Task.create({ title, description, dueDate, ...rest });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).send("Error creating task");
  }
}

async function updateTask(req: Request, res: Response): Promise<void> {
  const taskId: number = parseInt(req.params.id, 10);
  const { title, description, dueDate } = req.body;
  try {
    const task = await Task.findByPk(taskId);
    if (!task) {
      res.status(404).send("Task not found");
      return;
    }
    await task.update({ title, description, dueDate });
    res.status(200).json(task);
  } catch (error) {
    res.status(400).send("Error updating task");
  }
}

async function deleteTask(req: Request, res: Response): Promise<void> {
  const taskId: number = parseInt(req.params.id, 10);
  try {
    const task = await Task.findByPk(taskId);
    if (!task) {
      res.status(404).send("Task not found");
      return;
    }
    await task.destroy();
    res.status(204).send('Task deleted');
  } catch (error) {
    res.status(400).send("Error deleting task");
  }
}

export default {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
