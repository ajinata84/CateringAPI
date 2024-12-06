import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { CustomRequest } from '../middleware/JwtMiddleware';

const prisma = new PrismaClient();

export const createOrder = async (req: CustomRequest, res: Response) => {
  const customerId = req.userId!;
  const { ownerId, transaksiId, statusOrder, startDate, endDate } = req.body;

  try {
    const order = await prisma.order.create({
      data: {
        customerId,
        ownerId,
        transaksiId,
        statusOrder,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
    });

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateOrderStatus = async (req: CustomRequest, res: Response) => {
  const ownerId = req.userId!;
  const { orderId } = req.params;
  const { statusOrder } = req.body;

  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order || order.ownerId !== ownerId) {
      res.status(403).json({ error: 'You are not authorized to perform this action' });
      return;
    }

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { statusOrder },
    });

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};