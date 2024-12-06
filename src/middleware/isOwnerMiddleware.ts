import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { CustomRequest } from '../middleware/JwtMiddleware';

const prisma = new PrismaClient();

export const isOwnerMiddleware = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const { cateringId } = req.params;
  const userId = req.userId!;

  try {
    const catering = await prisma.catering.findUnique({
      where: { id: cateringId },
      include: { owner: true },
    });

    if (!catering || catering.owner.userId !== userId) {
      res.status(403).json({ error: 'You are not authorized to perform this action' });
      return;
    }

    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};