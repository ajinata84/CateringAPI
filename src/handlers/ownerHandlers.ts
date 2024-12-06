import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';
import { CustomRequest } from '../middleware/JwtMiddleware';

const prisma = new PrismaClient();

const generateToken = (userId: string) => {
  const secret = process.env.JWT_SECRET!;
  return jwt.sign({ userId }, secret, { expiresIn: '30d' });
};

// Zod schema for registration
const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  username: z.string().min(1),
});

export const registerOwner = async (req: Request, res: Response) => {
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

    const owner = await prisma.owner.create({
      data: {
        userId: user.userId,
      },
    });

    const token = generateToken(user.userId);

    res.json({
      token,
      userId: user.userId,
      username: user.username,
      ownerId: owner.id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

export const updateOwnerDetails = async (req: CustomRequest, res: Response) => {
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

    res.status(200).json({ status: 'Success', message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};