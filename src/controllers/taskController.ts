import { Request, Response } from 'express';
import { TaskModel } from '../models/Task';
import mongoose from 'mongoose';
import { UserModel } from '../models/User';
import { getNextSequence } from '../utils/getNextSequence';

export const getAllTasks = async (req: Request, res: Response) => {
  const { status, dueDate, user } = req.query;
  const query: Record<string, string | object> = {};

  if (status) {
    query.status = status as string;
  }

  if (dueDate) {
    query.dueDate = { $lte: new Date(dueDate as string) };
  }

  if (user) {
    const getUser = await UserModel.findOne({ email: user });

    if (!getUser) {
      res.status(404).json({
        message: 'User not found',
        data: { email: user },
      });
      return;
    }

    query.assignedTo = getUser;
  }

  const tasks = await TaskModel.find(query).populate('assignedTo', 'name email');

  if (!tasks.length) {
    res.status(404).json({
      message: 'No Task found',
    });
    return;
  }

  res.status(201).json({
    message: 'Successfully retrieved tasks',
    data: tasks,
  });
};

export const getTask = async (req: Request, res: Response) => {
  const { taskId } = req.params;
  const task = await TaskModel.findOne({ taskId }).populate('assignedTo', 'name email');
  if (!task) {
    res.status(404).json({
      message: `Task with ID: ${taskId} not found`,
    });
    return;
  }
  res.status(201).json({
    message: 'Successfully retrived task with ID: ' + taskId,
    data: task,
  });
};

export const createTask = async (req: Request, res: Response) => {
  const { title, status, description, dueDate, assignedTo } = req.body;

  const user = await UserModel.findOne({ email: assignedTo });
  const id = user?.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: 'User is not found' });
    return;
  }
  const nextId = await getNextSequence('tasks');
  const task = new TaskModel({
    title,
    status,
    description,
    dueDate,
    assignedTo: id,
    taskId: nextId,
  });
  await task.save();
  res.status(201).json({
    message: 'Task created successfully',
    data: task,
  });
};

export const updateTask = async (req: Request, res: Response) => {
  const { taskId } = req.params;
  const { title, description, dueDate, status, assignedTo } = req.body;

  const task = await TaskModel.findOne({ taskId }).populate('assignedTo', 'name email');

  if (!task) {
    res.status(404).json({ message: 'Task not found' });
    return;
  }

  if (title) task.title = title;
  if (description) task.description = description;
  if (dueDate) task.dueDate = dueDate;
  if (status) task.status = status;

  if (assignedTo) {
    const user = await UserModel.findOne({ email: assignedTo });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    task.assignedTo = user?.id;
  }

  await task.save();
  res.status(200).json({ message: `Task with ID: ${taskId} updated`, data: task });
};

export const deleteTask = async (req: Request, res: Response) => {
  const { taskId } = req.params;
  const result = await TaskModel.findOneAndDelete({ taskId });

  if (!result) {
    res.status(404).json({ message: 'Task not found' });
    return;
  }

  res.status(204).send({ message: `Task with ID: ${taskId} deleted` });
};
