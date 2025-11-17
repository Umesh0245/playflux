import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { pool } from '../config/database.js';
import { AppError } from './error.middleware.js';

interface JwtPayload {
  id: number;
}

export interface AuthRequest extends Request {
  user?: any;
  headers: any;
  params: any;
  body: any;
}

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    let token: string | undefined;

    // Check for token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new AppError('Not authorized to access this route', 401));
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

      // Get user from token using MySQL
      const [rows]: any = await pool.execute(
        'SELECT id, name, email, avatar, role, created_at FROM users WHERE id = ?',
        [decoded.id]
      );

      if (rows.length === 0) {
        return next(new AppError('User not found', 404));
      }

      req.user = rows[0];
      next();
    } catch (error) {
      return next(new AppError('Not authorized to access this route', 401));
    }
  } catch (error) {
    next(error);
  }
};

export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError('Not authorized', 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(`User role '${req.user.role}' is not authorized to access this route`, 403)
      );
    }

    next();
  };
};
