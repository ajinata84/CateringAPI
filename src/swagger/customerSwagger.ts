/**
 * @swagger
 * /customer/register:
 *   post:
 *     summary: Register a new Customer
 *     tags: [Customer]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Customer registered successfully
 *       400:
 *         description: Customer already exists
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /customer/me:
 *   get:
 *     summary: Get Customer details
 *     tags: [Customer]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Customer details
 *       404:
 *         description: Customer not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /customer/me:
 *   put:
 *     summary: Update Customer details
 *     tags: [Customer]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               hp:
 *                 type: string
 *               alamat:
 *                 type: string
 *     responses:
 *       200:
 *         description: Customer details updated successfully
 *       500:
 *         description: Internal server error
 */