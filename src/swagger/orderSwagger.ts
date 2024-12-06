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
 *       500:
 *         description: Internal server error
 */