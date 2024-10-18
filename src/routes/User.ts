import express from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { jwtMiddleware, customRequest } from "../middleware/JwtMiddleware";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/getData", jwtMiddleware, async (req: customRequest, res) => {
  const userId = req.userId!;

  try {
    const user = await prisma.users.findUnique({
      where: { userId },
      select: {
        username: true,
      },
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json({ username: user.username });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch username" });
    return;
  }
});

export default router;
