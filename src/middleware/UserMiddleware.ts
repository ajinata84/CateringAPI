import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export interface UserRequest extends Request {
  userId?: string;
  ownerId?: string;
  customerId?: string;
}

export const userMiddleware: RequestHandler = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Access denied" });
    return;
  }

  try {
    const secret = process.env.JWT_SECRET!;
    const decoded = jwt.verify(token, secret) as { userId: string };
    const userId = decoded.userId;
    req.userId = userId;

    try {
      const owner = await prisma.owner.findUnique({
        where: { userId: userId },
        select: { userId: true, id: true },
      });

      const customer = await prisma.customer.findUnique({
        where: { userId: userId },
        select: { userId: true, id: true },
      });

      if (owner) {
        req.ownerId = owner.id;
      }

      if (customer) {
        req.customerId = customer.id;
      }
    } catch (err) {
      res.status(401).json({ error: "User not found" });
    }

    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
    return;
  }
};
