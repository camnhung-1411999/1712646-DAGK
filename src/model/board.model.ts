import mongoose, { Schema } from 'mongoose';
import UserCollection from './user.model';

export type IBoard = mongoose.Document & {
  createBy: string;
  name: string;
  members: [];
};

const boardSchema = new mongoose.Schema({
  createdBy: { type: Schema.Types.ObjectId, ref: typeof UserCollection, index: true },
  name: String,
  members: Array,
}, { timestamps: true });



const BoardCollection = mongoose.model<IBoard>('Board', boardSchema);

export default BoardCollection;
