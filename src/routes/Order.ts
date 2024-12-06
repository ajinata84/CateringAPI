import express from 'express';
import { jwtMiddleware } from '../middleware/JwtMiddleware';
import {
  createOrder,
  updateOrderStatus,
} from '../handlers/orderHandlers';

const router = express.Router();

router.post('/', jwtMiddleware, createOrder);
router.put('/:orderId', jwtMiddleware, updateOrderStatus);

export default router;