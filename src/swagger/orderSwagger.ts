/**
 * @swagger
 * /order/{orderId}:
 *   put:
 *     summary: Update the status of an order
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the order to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               statusOrder:
 *                 type: string
 *           example:
 *             statusOrder: "Delivered"
 *     responses:
 *       200:
 *         description: Order status updated successfully
 *       403:
 *         description: You are not authorized to perform this action
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /order:
 *   get:
 *     summary: Get all orders for the authenticated user
 *     tags: [Order]
 *     responses:
 *       200:
 *         description: A list of orders
 *         content:
 *           application/json:
 *             example:
 *               - id: "1"
 *                 customerId: "123"
 *                 Orders:
 *                   - id: "1"
 *                     statusOrder: "Delivered"
 *                     catering:
 *                       nama: "Catering A"
 *                     paket:
 *                       id: "1"
 *                       nama: "Paket A"
 *                       deskripsi: "Deskripsi Paket A"
 *                       harga: 500000
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /order/{transaksiId}:
 *   get:
 *     summary: Get order details by transaction ID
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: transaksiId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the transaction to retrieve
 *     responses:
 *       200:
 *         description: Order details
 *         content:
 *           application/json:
 *             example:
 *               id: "1"
 *               customerId: "123"
 *               customer:
 *                 id: "123"
 *                 nama: "John Doe"
 *               Orders:
 *                 - id: "1"
 *                   statusOrder: "Delivered"
 *                   paket:
 *                     id: "1"
 *                     nama: "Paket A"
 *                     deskripsi: "Deskripsi Paket A"
 *                     harga: 500000
 *       404:
 *         description: Transaksi not found
 *       500:
 *         description: Internal server error
 */
