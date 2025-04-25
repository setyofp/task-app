import { Request, Response } from 'express';
import { UserModel } from '../models/User';
import { hashPassword, comparePassword, generateToken } from '../utils/auth';

export const register = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  const existing = await UserModel.findOne({ email });
  if (existing) {
    res.status(409).json({ message: 'Email already in use', data: { email } });
    return;
  }
  const hashed = await hashPassword(password);
  const user = new UserModel({ name, email, password: hashed, role });
  await user.save();

  // const token = generateToken(user);
  res.status(201).json({ message: 'User created successfully' });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });
  if (!user) {
    res.status(400).json({ message: 'User not found' });
    return;
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    res.status(400).json({ message: 'Invalid password' });
    return;
  }

  const token = generateToken(user);
  res
    .status(200)
    .json({ message: 'Successfully logged in', data: { name: user.name, email: user.email, role: user.role, token } });
};
