import { z } from 'zod';
import { TaskStatus } from '../types/task';

export const filterTaskSchema = z.object({
  user: z.string().optional(),
  status: z
    .nativeEnum(TaskStatus, { message: `Invalid task status, should be [${Object.values(TaskStatus)}]` })
    .optional(),
  dueDate: z.string().date('Invalid date format').optional(),
});

export const createTaskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  status: z
    .nativeEnum(TaskStatus, { message: `Invalid task status, should be [${Object.values(TaskStatus)}]` })
    .default(TaskStatus.NOT_STARTED)
    .optional(),
  dueDate: z.string().date('Invalid date format'),
  assignedTo: z.string().email('Invalid email'),
});

export const updateTaskSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  status: z
    .nativeEnum(TaskStatus, { message: `Invalid task status. (should be ${Object.values(TaskStatus)})` })
    .optional(),
  dueDate: z.string().date('Invalid date format').optional(),
  assignedTo: z.string().email('Invalid email').optional(),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type FilterTaskInput = z.infer<typeof filterTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
