import { Request, Response, NextFunction } from 'express';
import Comment from '../models/Comment';

export const getCommentsByTopic = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const comments = await Comment.find({ topic: req.params.topicId }).populate('author');
    res.json(comments);
    return;
  } catch (err) {
    next(err);
  }
};

export const createComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { content, topic } = req.body;
    const newComment = new Comment({
      content,
      topic,
      author: (req.user as any)._id
    });
    await newComment.save();
    await newComment.populate('author');
    res.status(201).json(newComment);
    return;
  } catch (err) {
    next(err);
  }
};

export const deleteComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const deleted = await Comment.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({ message: 'Comment not found' });
      return;
    }
    res.json({ message: 'Comment deleted' });
    return;
  } catch (err) {
    next(err);
  }
};
