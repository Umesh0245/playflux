import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { pool } from '../config/database.js';
import { AppError } from '../middleware/error.middleware.js';

// Generate JWT Token
const generateToken = (id: number): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  } as any);
};

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
export const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const [existingUsers]: any = await pool.query(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existingUsers.length > 0) {
      return next(new AppError('User already exists with this email', 400));
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create avatar
    const avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`;

    // Insert user
    const [result]: any = await pool.query(
      'INSERT INTO users (name, email, password, avatar) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, avatar]
    );

    // Get the created user
    const [users]: any = await pool.query(
      'SELECT id, name, email, avatar, role FROM users WHERE id = ?',
      [result.insertId]
    );

    const user = users[0];

    // Generate token
    const token = generateToken(user.id);

    res.status(201).json({
      success: true,
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          role: user.role
        },
        token
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return next(new AppError('Please provide email and password', 400));
    }

    // Check if user exists
    const [users]: any = await pool.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      return next(new AppError('Invalid credentials', 401));
    }

    const user = users[0];

    // Check password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return next(new AppError('Invalid credentials', 401));
    }

    // Generate token
    const token = generateToken(user.id);

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          role: user.role
        },
        token
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req: any, res: Response, next: NextFunction) => {
  try {
    const [users]: any = await pool.query(
      'SELECT id, name, email, avatar, role FROM users WHERE id = ?',
      [req.user.id]
    );

    if (users.length === 0) {
      return next(new AppError('User not found', 404));
    }

    res.json({
      success: true,
      data: {
        user: users[0]
      }
    });
  } catch (error) {
    next(error);
  }
};
