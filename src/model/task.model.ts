import mongoose, { Schema } from 'mongoose';
import BoardCollection from './board.model';
import UserCollection from './user.model';

export type ITask = mongoose.Document & {
  createBy: string;
  type: string;
  content: string;
  board: string;
};

const taskSchema = new mongoose.Schema({
  createdBy: { type: Schema.Types.ObjectId, ref: UserCollection, index: true },
  type: String,
  content: String,
  board: { type: Schema.Types.ObjectId, ref: typeof BoardCollection},
}, { timestamps: true });

const TaskCollection = mongoose.model<ITask>('Task', taskSchema);

export default TaskCollection;
