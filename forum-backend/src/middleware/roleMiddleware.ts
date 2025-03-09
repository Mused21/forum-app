import { Request, Response, NextFunction, RequestHandler } from 'express';

export const permit = (...allowed: string[]): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = req.user as { role?: string };
    if (user && user.role && allowed.includes(user.role)) {
      next();
    } else {
      res.status(403).json({ message: 'Forbidden' });
    }
  };
};