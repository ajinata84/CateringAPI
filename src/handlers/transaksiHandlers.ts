import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { CustomRequest } from "../middleware/JwtMiddleware";
import { UserRequest } from "../middleware/UserMiddleware";

const prisma = new PrismaClient();

export const createTransaksi = async (
  req: UserRequest,
  res: Response
): Promise<void> => {
  try {
    const { orders, startDate, endDate, paymentMethod } = req.body;
    const customerId = req.customerId;

    console.log(customerId);

    if (
      !orders?.length ||
      !startDate ||
      !endDate ||
      !paymentMethod ||
      !customerId
    ) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const transaksi = await prisma.transaksi.create({
      data: {
        customerId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        paymentMethod,
      },
    });

    const createdOrders = await Promise.all(
      orders.map(
        async (order: {
          paketId: string;
          cateringId: string;
          ongkir: number;
        }) => {
          const paket = await prisma.paket.findUnique({
            where: { id: order.paketId },
          });

          if (!paket) {
            throw new Error(`Paket with id ${order.paketId} not found`);
          }

          return prisma.order.create({
            data: {
              transaksiId: transaksi.id,
              paketId: order.paketId,
              cateringId: order.cateringId,
              ongkir: Number(order.ongkir),
              totalHarga: Number(paket.harga) + Number(order.ongkir),
              tanggal: new Date(),
              statusOrder: "PENDING",
            },
          });
        }
      )
    );

    res.status(201).json({
      transaksi,
      orders: createdOrders,
    });
  } catch (error) {
    console.error("Transaction creation error:", error);
    res.status(500).json({
      error: "Failed to create transaction",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getUserTransaksis = async (req: UserRequest, res: Response) => {
  const userId = req.userId!;

  try {
    const transaksis = await prisma.transaksi.findMany({
      where: { customer: { userId: userId } },
      include: {
        Orders: {
          include: {
            catering: {
              select: {
                nama: true,
              },
            },
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
