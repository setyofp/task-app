import express from 'express';
import { register, login } from '../controllers/userController';
import { validateCreateUser, validateLoginUser } from '../middlewares/validateUser';
import { loginUserSchema, registerUserSchema } from '../validators/userValidator';

const router = express.Router();

router.post('/register', validateCreateUser(registerUserSchema), register);
router.post('/login', validateLoginUser(loginUserSchema), login);

export default router;
