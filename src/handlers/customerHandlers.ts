import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { CustomRequest } from '../middleware/JwtMiddleware';
import argon2 from "argon2";


const prisma = new PrismaClient();

export const registerCustomer = async (req: CustomRequest, res: Response) => {
  const userId = req.userId!;
  try {
    const existingCustomer = await prisma.customer.findUnique({
      where: { userId },
    });

    if (existingCustomer) {
      res.status(400).json({ error: 'Customer already exists' });
      return;
    }

    const customer = await prisma.customer.create({
      data: {
        userId,
      },
    });

    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
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
      res.status(404).json({ error: 'Customer not found' });
      return;
    }

    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateCustomerDetails = async (req: CustomRequest, res: Response) => {
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
    res.status(500).json({ error: 'Internal server error' });
  }
};