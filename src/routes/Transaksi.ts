import express from "express";
import { jwtMiddleware } from "../middleware/JwtMiddleware";
import {
  createTransaksi,
  getUserTransaksis,
  getTransaksiById,
} from "../handlers/transaksiHandlers";

const router = express.Router();

router.post("/", jwtMiddleware, createTransaksi);
router.get("/", jwtMiddleware, getUserTransaksis);
router.get("/:transaksiId", jwtMiddleware, getTransaksiById);

export default router;
