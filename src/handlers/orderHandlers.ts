import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { CustomRequest } from "../middleware/JwtMiddleware";

const prisma = new PrismaClient();

export const updateOrderStatus = async (req: CustomRequest, res: Response) => {
  const { orderId } = req.params;
  const { statusOrder } = req.body;

  try {
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { statusOrder },
    });

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUserOrders = async (req: CustomRequest, res: Response) => {
  const userId = req.userId!;

  try {
    const transaksis = await prisma.transaksi.findMany({
      where: { customerId: userId },
      include: {
        Orders: {
          include: {
            paket: true,
          },
        },
      },
    });

    res.json(transaksis);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getOrderById = async (req: CustomRequest, res: Response) => {
  const { transaksiId } = req.params;

  try {
    const transaksi = await prisma.transaksi.findUnique({
      where: { id: transaksiId },
      include: {
        Orders: {
          include: {
            paket: true,
          },
        },
        customer: true,
      },
    });

    if (!transaksi) {
      res.status(404).json({ error: "Transaksi not found" });
      return;
    }

    res.json(transaksi);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
