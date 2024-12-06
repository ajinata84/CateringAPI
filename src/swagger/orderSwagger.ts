/**
 * @swagger
 * /order:
 *   post:
 *     summary: Create a new order
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ownerId:
 *                 type: string
 *               transaksiId:
 *                 type: string
 *               statusOrder:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date-time
 *               endDate:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Order created successfully
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /order/{orderId}:
 *   put:
 *     summary: Update order status
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               statusOrder:
 *                 type: string
 *     responses:
 *       200:
 *         description: Order status updated successfully
 *       403:
 *         description: You are not authorized to perform this action
 *       500:
 *         description: Internal server error
 */