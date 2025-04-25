import express from 'express';
import { createTask, updateTask, deleteTask, getAllTasks, getTask } from '../controllers/taskController';
import { validateCreateTask, validateFilterTask, validateUpdateTask } from '../middlewares/validateTask';
import { createTaskSchema, filterTaskSchema, updateTaskSchema } from '../validators/taskValidator';
import { authenticate, isAdmin } from '../middlewares/auth';

const router = express.Router();

router.get('/', validateFilterTask(filterTaskSchema), getAllTasks);

router.get('/:taskId', getTask);

router.post('/', validateCreateTask(createTaskSchema), createTask);

router.put('/:taskId', validateUpdateTask(updateTaskSchema), updateTask);

router.delete('/:taskId', authenticate, isAdmin, deleteTask);

export default router;
