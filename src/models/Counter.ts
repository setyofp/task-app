import mongoose, { Schema, Document } from 'mongoose';

interface CounterDocument extends Document {
  _id: string;
  seq: number;
}

const CounterSchema = new Schema<CounterDocument>({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

export const CounterModel = mongoose.model<CounterDocument>('Counter', CounterSchema);
