import express from 'express';
import {
  getOrders,
  getOrder,
  createOrder,
  updateOrderStatus
} from '../controllers/order.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

// All order routes require authentication
router.use(protect);

router.get('/', getOrders);
router.get('/:id', getOrder);
router.post('/', createOrder);

// Admin route
router.put('/:id/status', authorize('admin'), updateOrderStatus);

export default router;
