import { CounterModel } from '../models/Counter';

export const getNextSequence = async (name: string): Promise<number> => {
  const counter = await CounterModel.findByIdAndUpdate(name, { $inc: { seq: 1 } }, { new: true, upsert: true });

  return counter.seq;
};
