import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { CustomRequest } from '../middleware/JwtMiddleware';

const prisma = new PrismaClient();

export const createCatering = async (req: CustomRequest, res: Response) => {
  const ownerId = req.userId!;
  const { nama, alamat, hp, rating, deskripsi } = req.body;

  try {
    const catering = await prisma.catering.create({
      data: {
        ownerId,
        nama,
        alamat,
        hp,
        rating,
        deskripsi,
      },
    });

    res.json(catering);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAllCaterings = async (req: Request, res: Response) => {
  const { alamat } = req.body;
  try {
    const caterings = await prisma.catering.findMany({
      include: {
        owner: true,
        kategoris: true,
        Manajemens: true,
        Pakets: true,
        Transaksis: true,
      },
      where: { alamat: { contains: alamat as string } },
    });

    res.json(caterings);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getCateringById = async (req: Request, res: Response) => {
  const { cateringId } = req.params;

  try {
    const catering = await prisma.catering.findUnique({
      where: { id: cateringId },
      include: {
        owner: true,
        kategoris: true,
        Manajemens: true,
        Pakets: true,
        Transaksis: true,
      },
    });

    if (!catering) {
      res.status(404).json({ error: 'Catering not found' });
      return;
    }

    res.json(catering);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateCatering = async (req: CustomRequest, res: Response) => {
  const { cateringId } = req.params;
  const { nama, alamat, hp, rating, deskripsi } = req.body;

  try {
    const catering = await prisma.catering.update({
      where: { id: cateringId },
      data: {
        nama,
        alamat,
        hp,
        rating,
        deskripsi,
      },
    });

    res.json(catering);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteCatering = async (req: CustomRequest, res: Response) => {
  const { cateringId } = req.params;

  try {
    await prisma.catering.delete({
      where: { id: cateringId },
    });

    res.json({ message: 'Catering deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const addScheduleAndFood = async (req: CustomRequest, res: Response) => {
  const { cateringId } = req.params;
  const { paketId, waktu, makanan } = req.body;

  try {
    const schedule = await prisma.schedule.create({
      data: {
        paketId,
        waktu,
      },
    });

    const scheduleFoods = await Promise.all(
      makanan.map(async (makananItem: { nama: string; deskripsi?: string; imageUrl?: string }) => {
        const food = await prisma.makanan.create({
          data: {
            nama: makananItem.nama,
            deskripsi: makananItem.deskripsi,
            imageUrl: makananItem.imageUrl,
          },
        });

        return prisma.scheduleFoods.create({
          data: {
            scheduleId: schedule.id,
            makananId: food.id,
          },
        });
      })
    );

    res.json({ schedule, scheduleFoods });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const addPaketWithSchedules = async (req: CustomRequest, res: Response) => {
  const { cateringId } = req.params;
  const { durasi, harga, deskripsi, schedules } = req.body;

  try {
    const paket = await prisma.paket.create({
      data: {
        cateringId,
        durasi,
        harga,
        deskripsi,
      },
    });

    const createdSchedules = await Promise.all(
      schedules.map(async (scheduleItem: { waktu: string; makanan: { nama: string; deskripsi?: string; imageUrl?: string }[] }) => {
        const schedule = await prisma.schedule.create({
          data: {
            paketId: paket.id,
            waktu: scheduleItem.waktu,
          },
        });

        const scheduleFoods = await Promise.all(
          scheduleItem.makanan.map(async (makananItem) => {
            const food = await prisma.makanan.create({
              data: {
                nama: makananItem.nama,
                deskripsi: makananItem.deskripsi,
                imageUrl: makananItem.imageUrl,
              },
            });

            return prisma.scheduleFoods.create({
              data: {
                scheduleId: schedule.id,
                makananId: food.id,
              },
            });
          })
        );

        return { schedule, scheduleFoods };
      })
    );

    res.json({ paket, schedules: createdSchedules });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const searchCatering = async (req: Request, res: Response) => {
  const { query } = req.query;
  const { alamat } = req.body;

  if (!query) {
    res.status(400).json({ error: 'Query parameter is required' });
    return;
  }

  try {
    const caterings = await prisma.catering.findMany({
      where: {
        OR: [
          { alamat: { contains: alamat as string } },
          { nama: { contains: query as string } },
          { deskripsi: { contains: query as string } },
          {
            kategoris: {
              some: {
                kategori: {
                  nama: { contains: query as string },
                },
              },
            },
          },
          {
            Pakets: {
              some: {
                Schedules: {
                  some: {
                    ScheduleFoods: {
                      some: {
                        makanan: {
                          nama: { contains: query as string },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        ],
      },
      include: {
        owner: true,
        kategoris: {
          include: {
            kategori: true,
          },
        },
        Pakets: {
          include: {
            Schedules: {
              include: {
                ScheduleFoods: {
                  include: {
                    makanan: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    res.json(caterings);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};