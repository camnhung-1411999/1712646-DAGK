import mongoose, { Schema } from 'mongoose';
import UserCollection from './user.model';

export type IBoard = mongoose.Document & {
  createdBy: string;
  name: string;
  members: [];
};

const boardSchema = new mongoose.Schema({
  createdBy: { type: String, ref: typeof UserCollection, index: true },
  name: String,
  members: Array,
}, { timestamps: true });



const BoardCollection = mongoose.model<IBoard>('Board', boardSchema);

export default BoardCollection;
