import express from "express";
import { jwtMiddleware } from "../middleware/JwtMiddleware";
import {
  createTransaksi,
  getUserTransaksis,
  getTransaksiById,
} from "../handlers/transaksiHandlers";
import { userMiddleware } from "../middleware/UserMiddleware";

const router = express.Router();

router.post("/", userMiddleware, createTransaksi);
router.get("/", jwtMiddleware, getUserTransaksis);
router.get("/:transaksiId", jwtMiddleware, getTransaksiById);

export default router;
