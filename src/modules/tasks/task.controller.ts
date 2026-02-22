import { Request, Response } from "express";
import * as taskService from "./task.service";

export const createTaskController = async (req: Request, res: Response) => {
  try {
    const { title, description, dueDate, assignedUserId } = req.body;
    const adminId = req.user!.id;

    const task = await taskService.createTask({
      title,
      description,
      dueDate: new Date(dueDate),
      assignedUserId,
      adminId,
    });

    return res.status(201).json(task);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const getTasksController = async (req: Request, res: Response) => {
  try {
    const { id, role } = req.user!;
    const tasks = await taskService.getTasks(id, role);
    return res.status(200).json(tasks);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const updateTaskController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await taskService.updateTask(Number(id), req.body);
    return res.status(200).json(task);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const deleteTaskController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await taskService.deleteTask(Number(id));
    return res.status(204).send();
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};
