import mongoose, { Schema } from 'mongoose';

export type ITask = mongoose.Document & {
  createBy: string;
  type: string;
  content: string;
  board: string;
};

const taskSchema = new mongoose.Schema({
  createdBy: { type: Schema.Types.ObjectId, index: true },
  type: String,
  content: String,
  board: { type: Schema.Types.ObjectId},
}, { timestamps: true });

const TaskCollection = mongoose.model<ITask>('Task', taskSchema);

export default TaskCollection;
