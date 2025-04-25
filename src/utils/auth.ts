import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { UserDocument } from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};

export const comparePassword = async (password: string, hashed: string): Promise<boolean> => {
  return bcrypt.compare(password, hashed);
};

export const generateToken = (user: Pick<UserDocument, 'email' | 'role'>): string => {
  return jwt.sign({ email: user.email, role: user.role }, JWT_SECRET, {
    expiresIn: '14d',
  });
};
