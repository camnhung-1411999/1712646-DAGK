import mongoose, { Schema } from 'mongoose';
import BoardCollection from './board.model';
import UserCollection from './user.model';

export type ITask = mongoose.Document & {
  createdBy: string;
  updatedBy: string;
  status: string;
  content: string;
  board: string;
};

const taskSchema = new mongoose.Schema({
  createdBy: { type: String, ref: UserCollection, index: true },
  updatedBy: { type: String, ref:UserCollection},
  status: String,
  content: String,
  board: { type: Schema.Types.ObjectId, ref: typeof BoardCollection},
}, { timestamps: true });

const TaskCollection = mongoose.model<ITask>('Task', taskSchema);

export default TaskCollection;
