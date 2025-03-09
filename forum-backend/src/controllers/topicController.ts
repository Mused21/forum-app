import { Request, Response, NextFunction } from 'express';
import Topic from '../models/Topic';

export const getAllTopics = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const topics = await Topic.find().populate('author category');
    res.json(topics);
    return;
  } catch (err) {
    next(err);
  }
};

export const getTopicById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const topic = await Topic.findById(req.params.id).populate('author category');
    if (!topic) {
      res.status(404).json({ message: 'Topic not found' });
      return;
    }
    res.json(topic);
    return;
  } catch (err) {
    next(err);
  }
};

export const createTopic = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { title, content, category } = req.body;
    const newTopic = new Topic({
      title,
      content,
      category,
      author: (req.user as any)._id
    });
    await newTopic.save();
    res.status(201).json(newTopic);
    return;
  } catch (err) {
    next(err);
  }
};

export const updateTopic = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const updatedTopic = await Topic.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTopic) {
      res.status(404).json({ message: 'Topic not found' });
      return;
    }
    res.json(updatedTopic);
    return;
  } catch (err) {
    next(err);
  }
};

export const deleteTopic = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const deleted = await Topic.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({ message: 'Topic not found' });
      return;
    }
    res.json({ message: 'Topic deleted' });
    return;
  } catch (err) {
    next(err);
  }
};
