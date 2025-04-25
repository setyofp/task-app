import mongoose, { Document, Schema } from 'mongoose';
import { TaskStatus } from '../types/task';

export interface TaskDocument extends Document {
  taskId: number;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: Date;
  assignedTo: mongoose.Types.ObjectId;
}

const TaskSchema = new Schema<TaskDocument>(
  {
    taskId: { type: Number, unique: true, required: true },
    title: { type: String, required: true },
    description: { type: String, required: false },
    status: { type: String, enum: Object.values(TaskStatus), default: TaskStatus.NOT_STARTED, required: true },
    dueDate: { type: Date, required: true },
    assignedTo: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export const TaskModel = mongoose.model<TaskDocument>('Task', TaskSchema);
