import mongoose, { Document, Schema } from 'mongoose';

export interface ITopic extends Document {
  title: string;
  content: string;
  author: mongoose.Types.ObjectId;
  category: mongoose.Types.ObjectId;
  createdAt: Date;
}

const TopicSchema = new Schema<ITopic>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<ITopic>('Topic', TopicSchema);
