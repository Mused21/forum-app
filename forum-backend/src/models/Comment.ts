import mongoose, { Document, Schema } from 'mongoose';

export interface IComment extends Document {
  content: string;
  author: mongoose.Types.ObjectId;
  topic: mongoose.Types.ObjectId;
  createdAt: Date;
}

const CommentSchema = new Schema<IComment>({
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  topic: { type: Schema.Types.ObjectId, ref: 'Topic', required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IComment>('Comment', CommentSchema);
