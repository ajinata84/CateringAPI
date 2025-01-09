import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { CustomRequest } from "../middleware/JwtMiddleware";
import { UserRequest } from "../middleware/UserMiddleware";

const prisma = new PrismaClient();

export const createCatering = async (req: UserRequest, res: Response) => {
  const ownerId = req.ownerId!;
  const { nama, alamat, hp, rating, deskripsi, imageUrl } = req.body;

  try {
    const catering = await prisma.catering.create({
      data: {
        ownerId,
        nama,
        alamat,
        hp,
        rating,
        deskripsi,
        imageUrl,
      },
    });

    res.json(catering);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getAllCaterings = async (req: Request, res: Response) => {
  const { alamat } = req.body;
  try {
    const caterings = await prisma.catering.findMany({
      where: alamat ? { alamat: { contains: alamat } } : {},
      include: {
        owner: true,
        Manajemens: true,
        Pakets: {
          include: {
            Kategori: { select: { nama: true } },
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

    const response = caterings.map((catering) => {
      const kategoris = [
        ...new Set(
          catering.Pakets.map((paket) => paket.Kategori?.nama).filter(
            (nama) => nama !== undefined
          )
        ),
      ];

      return {
        ...catering,
        kategoris,
        Pakets: catering.Pakets.map((paket) => ({
          ...paket,
          kategori: paket.Kategori!.nama,
          Kategori: undefined,
        })),
      };
    });

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getCateringById = async (req: Request, res: Response) => {
  const { cateringId } = req.params;

  try {
    const catering = await prisma.catering.findUnique({
      where: { id: cateringId },
      include: {
        owner: true,
        Manajemens: true,
        Pakets: {
          include: {
            Kategori: { select: { nama: true } },
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

    if (!catering) {
      res.status(404).json({ error: "Catering not found" });
      return;
    }

    const kategoris = [
      ...new Set(
        catering.Pakets.map((paket) => paket.Kategori?.nama).filter(
          (nama) => nama !== undefined
        )
      ),
    ];

    const response = {
      ...catering,
      kategoris,
      Pakets: catering.Pakets.map((paket) => {
        return {
          ...paket,
          kategori: paket.Kategori!.nama,
          Kategori: undefined,
        };
      }),
    };
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getPaketById = async (req: Request, res: Response) => {
  const { paketId } = req.params;

  try {
    const paket = await prisma.paket.findUnique({
      where: { id: paketId },
      include: {
        Kategori: { select: { nama: true } },
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
    });

    if (!paket) {
      res.status(404).json({ error: "paket not found" });
      return;
    }

    const response = {
      ...paket,
      kategori: paket.Kategori!.nama,
      Kategori: undefined,
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error });
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
    res.status(500).json({ error: error });
  }
};

export const deletePaket = async (req: CustomRequest, res: Response) => {
  const { paketId } = req.params;
  try {
    const makananIds = await prisma.makanan.findMany({
      where: {
        ScheduleFoods: {
          some: {
            schedule: {
              paketId,
            },
          },
        },
      },
      select: { id: true },
    });

    await prisma.scheduleFoods.deleteMany({
      where: { schedule: { paketId } },
    });

    await prisma.schedule.deleteMany({
      where: { paketId },
    });

    await prisma.makanan.deleteMany({
      where: {
        id: {
          in: makananIds.map((m) => m.id),
        },
      },
    });

    await prisma.paket.delete({
      where: { id: paketId },
    });

    res.json({ message: "Paket and associated data deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const deleteCatering = async (req: CustomRequest, res: Response) => {
  const { cateringId } = req.params;

  try {
    await prisma.catering.delete({
      where: { id: cateringId },
    });

    res.json({ message: "Catering deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const addScheduleAndFood = async (req: CustomRequest, res: Response) => {
  const { paketId, waktu, makanan } = req.body;

  try {
    const schedule = await prisma.schedule.create({
      data: {
        paketId,
        waktu,
      },
    });

    const scheduleFoods = await Promise.all(
      makanan.map(
        async (makananItem: {
          nama: string;
          deskripsi?: string;
          imageUrl?: string;
        }) => {
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
        }
      )
    );

    res.json({ schedule, scheduleFoods });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const addPaketWithSchedules = async (
  req: CustomRequest,
  res: Response
) => {
  const { cateringId } = req.params;
  const { durasi, harga, deskripsi, schedules, namaPaket } = req.body;

  try {
    const paket = await prisma.paket.create({
      data: {
        nama: namaPaket,
        cateringId,
        durasi,
        harga,
        deskripsi,
      },
    });

    const createdSchedules = await Promise.all(
      schedules.map(
        async (scheduleItem: {
          waktu: string;
          makanan: { nama: string; deskripsi?: string; imageUrl?: string }[];
        }) => {
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
        }
      )
    );

    res.json({ paket, schedules: createdSchedules });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const searchCatering = async (req: Request, res: Response) => {
  const { query } = req.query;
  const { alamat } = req.body;

  if (!query) {
    res.status(400).json({ error: "Query parameter is required" });
    return;
  }

  try {
    const caterings = await prisma.catering.findMany({
      where: {
        AND: [
          alamat ? { alamat: { contains: alamat } } : {},
          {
            OR: [
              { nama: { contains: query as string } },
              { deskripsi: { contains: query as string } },
              { alamat: { contains: query as string } },
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
        ],
      },
      select: {
        id: true,
        nama: true,
        alamat: true,
        hp: true,
        rating: true,
        deskripsi: true,
        imageUrl: true,
        Pakets: {
          select: {
            Kategori: {
              select: {
                nama: true,
              },
            },
            Schedules: {
              select: {
                ScheduleFoods: {
                  select: {
                    makanan: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const formattedResponse = caterings.map((catering) => {
      const allMakanan = new Set();
      const kategoris = new Set();

      catering.Pakets.forEach((paket) => {
        if (paket.Kategori?.nama) {
          kategoris.add(paket.Kategori.nama);
        }
        paket.Schedules.forEach((schedule) =>
          schedule.ScheduleFoods.forEach((sf) =>
            allMakanan.add(JSON.stringify(sf.makanan))
          )
        );
      });

      const makananArray = Array.from(allMakanan)
        .map((m) => JSON.parse(m as string))
        .sort((a, b) => {
          const aMatch = a.nama
            .toLowerCase()
            .includes((query as string).toLowerCase());
          const bMatch = b.nama
            .toLowerCase()
            .includes((query as string).toLowerCase());
          return bMatch ? 1 : aMatch ? -1 : 0;
        });

      const { Pakets, ...cateringData } = catering;
      return {
        ...cateringData,
        kategoris: Array.from(kategoris),
        makanan: makananArray,
      };
    });

    res.json(formattedResponse);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ error: error });
  }
};
