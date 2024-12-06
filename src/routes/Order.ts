import express from "express";
import { jwtMiddleware } from "../middleware/JwtMiddleware";
import {
  updateOrderStatus,
  getUserOrders,
} from "../handlers/orderHandlers";
import { isOwnerMiddleware } from "../middleware/isOwnerMiddleware";

const router = express.Router();

router.put("/:orderId", jwtMiddleware, isOwnerMiddleware, updateOrderStatus);
router.get("/", jwtMiddleware, getUserOrders);

export default router;
