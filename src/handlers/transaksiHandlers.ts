import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { CustomRequest } from "../middleware/JwtMiddleware";

const prisma = new PrismaClient();

export const createTransaksi = async (req: CustomRequest, res: Response) => {
  const customerId = req.userId!;
  const { orders, startDate, endDate, paymentMethod } = req.body;

  try {
    // Create a new transaksi
    const transaksi = await prisma.transaksi.create({
      data: {
        customerId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        paymentMethod,
      },
    });

    // Create orders for the transaksi
    const createdOrders = await Promise.all(
      orders.map(
        async (order: {
          paketId: string;
          cateringId: string;
          ongkir: number;
          totalHarga: number;
          statusOrder: string;
        }) => {
          return prisma.order.create({
            data: {
              transaksiId: transaksi.id,
              paketId: order.paketId,
              cateringId: order.cateringId,
              ongkir: order.ongkir,
              totalHarga: order.totalHarga,
              tanggal: new Date(),
              statusOrder: order.statusOrder,
            },
          });
        }
      )
    );

    res.json({ transaksi, orders: createdOrders });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUserTransaksis = async (req: CustomRequest, res: Response) => {
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

export const getTransaksiById = async (req: CustomRequest, res: Response) => {
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
