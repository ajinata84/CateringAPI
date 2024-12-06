/**
 * @swagger
 * /transaksi:
 *   post:
 *     summary: Create a new transaksi
 *     tags: [Transaksi]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orders:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     paketId:
 *                       type: string
 *                     cateringId:
 *                       type: string
 *                     ongkir:
 *                       type: number
 *                     totalHarga:
 *                       type: number
 *                     paymentMethod:
 *                       type: string
 *                     statusOrder:
 *                       type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Transaksi created successfully
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /transaksi:
 *   get:
 *     summary: Get all transaksis for the authenticated user
 *     tags: [Transaksi]
 *     responses:
 *       200:
 *         description: A list of transaksis
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /transaksi/{transaksiId}:
 *   get:
 *     summary: Get a transaksi by ID
 *     tags: [Transaksi]
 *     parameters:
 *       - in: path
 *         name: transaksiId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the transaksi to retrieve
 *     responses:
 *       200:
 *         description: Transaksi retrieved successfully
 *       404:
 *         description: Transaksi not found
 *       500:
 *         description: Internal server error
 */