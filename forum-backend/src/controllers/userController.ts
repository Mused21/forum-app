import { Request, Response, NextFunction } from 'express';
import User from '../models/User';

export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      if (user.role === 'moderator') {
        res.status(403).json({ message: 'Cannot delete a moderator' });
        return;
      }
      await User.findByIdAndDelete(req.params.id);
      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      next(err);
    }
  };