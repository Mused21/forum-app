import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import User from '../models/User';

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { username, password } = req.body;
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully.' });
    return;
  } catch (err: any) {
    next(err);
  }
};

export const login = (req: Request, res: Response, next: NextFunction): void => {
  passport.authenticate('local', (err: any, user: any, info: any): void => {
    if (err) {
      next(err);
      return;
    }
    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }
    req.logIn(user, (err: any): void => {
      if (err) {
        next(err);
        return;
      }
      res.json({ message: 'Logged in successfully', user });
      return;
    });
  })(req, res, next);
};

export const logout = (req: Request, res: Response, next: NextFunction): void => {
  req.logout((err: any): void => {
    if (err) {
      next(err);
      return;
    }
    res.json({ message: 'Logged out successfully' });
    return;
  });
};
