import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { CreateTaskInput, FilterTaskInput, UpdateTaskInput } from '../validators/taskValidator';

export const validateFilterTask =
  (schema: ZodSchema<FilterTaskInput>) =>
  (req: Request<object, object, object, FilterTaskInput>, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.query);
      next();
    } catch (error) {
      const err = error as ZodError;
      res.status(400).json({
        message: 'Filter task validation failed',
        errors: err.errors,
      });
    }
  };

export const validateCreateTask =
  (schema: ZodSchema<CreateTaskInput>) =>
  (req: Request<object, object, CreateTaskInput>, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      const err = error as ZodError;
      res.status(400).json({
        message: 'Create task validation failed',
        errors: err.errors,
      });
    }
  };

export const validateUpdateTask =
  (schema: ZodSchema<UpdateTaskInput>) =>
  (req: Request<object, object, UpdateTaskInput>, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      const err = error as ZodError;
      res.status(400).json({
        message: 'Update task validation failed',
        errors: err.errors,
      });
    }
  };
