import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

const prisma = new PrismaClient();

const generateToken = (userId: string) => {
  const secret = process.env.JWT_SECRET!;
  return jwt.sign({ userId }, secret, { expiresIn: '30d' });
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

export const registerUser = async (req: Request, res: Response) => {
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
      res.status(400).json({ error: 'Email address is already in use.' });
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

    res.json({ token, userId, username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const result = loginSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({ errors: result.error.errors });
    return;
  }

  const { email, password } = result.data;

  try {
    const user = await prisma.users.findUnique({
      where: { email },
    });

    if (!user) {
      res.status(400).json({ error: 'Invalid email or password' });
      return;
    }

    const validPassword = await argon2.verify(user.password, password);

    if (!validPassword) {
      res.status(400).json({ error: 'Invalid email or password' });
      return;
    }

    const token = generateToken(user.userId);

    const customer = await prisma.customer.findUnique({
      where: { userId: user.userId },
    });

    const owner = await prisma.owner.findUnique({
      where: { userId: user.userId },
    });

    const userRole = owner ? { ownerId: owner.id } : { customerId: customer?.id };

    res.json({
      token,
      userId: user.userId,
      username: user.username,
      ...userRole,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};