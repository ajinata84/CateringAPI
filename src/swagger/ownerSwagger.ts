/**
 * @swagger
 * /owner/register:
 *   post:
 *     summary: Register a new owner
 *     tags: [Owner]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               username:
 *                 type: string
 *     responses:
 *       200:
 *         description: Owner registered successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /owner/me:
 *   put:
 *     summary: Update owner details
 *     tags: [Owner]
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
 *         description: Owner updated successfully
 *       500:
 *         description: Internal server error
 */