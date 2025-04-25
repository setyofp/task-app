import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { LoginUserInput, RegisterUserInput } from '../validators/userValidator';

export const validateCreateUser =
  (schema: ZodSchema<RegisterUserInput>) =>
  (req: Request<object, object, RegisterUserInput>, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      const err = error as ZodError;
      res.status(400).json({
        message: 'Create user validation failed',
        errors: err.errors,
      });
    }
  };

export const validateLoginUser =
  (schema: ZodSchema<LoginUserInput>) =>
  (req: Request<object, object, LoginUserInput>, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      const err = error as ZodError;
      res.status(400).json({
        message: 'Login user validation failed',
        errors: err.errors,
      });
    }
  };
