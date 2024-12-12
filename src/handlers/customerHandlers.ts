import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { CustomRequest } from "../middleware/JwtMiddleware";
import argon2 from "argon2";

import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

const generateToken = (userId: string) => {
  const secret = process.env.JWT_SECRET!;
  return jwt.sign({ userId }, secret, { expiresIn: "30d" });
};

// Zod schemas
const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  username: z.string().min(1),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const prisma = new PrismaClient();

export const registerCustomer = async (req: CustomRequest, res: Response) => {
  const result = registerSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({ errors: result.error.errors });
    return;
  }

  const { email, password, username } = result.data;

  try {
    const existingUser = await prisma.users.findUnique({
      where: { email },
    });

    if (existingUser) {
      res.status(400).json({ error: "Email address is already in use." });
      return;
    }

    const hashedPassword = await argon2.hash(password);
    const userId = uuidv4();
    const user = await prisma.users.create({
      data: {
        userId,
        email,
        password: hashedPassword,
        username,
      },
    });

    const token = generateToken(user.userId);

    const customer = await prisma.customer.create({
      data: {
        userId: user.userId,
      },
    });

    const customerId = customer.id;

    res.json({ token, userId, username, customerId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
};

export const getCustomerDetails = async (req: CustomRequest, res: Response) => {
  const userId = req.userId!;
  try {
    const customer = await prisma.customer.findUnique({
      where: { userId },
      include: {
        user: true,
        Transaksis: true,
      },
    });

    if (!customer) {
      res.status(404).json({ error: "Customer not found" });
      return;
    }

    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateCustomerDetails = async (
  req: CustomRequest,
  res: Response
) => {
  const userId = req.userId!;
  const { username, email, password, hp, alamat } = req.body;

  try {
    const updatedUser = await prisma.users.update({
      where: { userId },
      data: {
        username,
        email,
        password: password ? await argon2.hash(password) : undefined,
        hp,
        alamat,
      },
    });

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
