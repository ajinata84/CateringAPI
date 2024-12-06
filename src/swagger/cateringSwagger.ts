/**
 * @swagger
 * /catering:
 *   post:
 *     summary: Create a new Catering
 *     tags: [Catering]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nama:
 *                 type: string
 *               alamat:
 *                 type: string
 *               hp:
 *                 type: string
 *               rating:
 *                 type: number
 *               deskripsi:
 *                 type: string
 *     responses:
 *       200:
 *         description: Catering created successfully
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /catering:
 *   get:
 *     summary: Get all Caterings
 *     tags: [Catering]
 *     responses:
 *       200:
 *         description: List of all caterings
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /catering/{cateringId}:
 *   get:
 *     summary: Get Catering details by ID
 *     tags: [Catering]
 *     parameters:
 *       - in: path
 *         name: cateringId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Catering details
 *       404:
 *         description: Catering not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /catering/{cateringId}:
 *   put:
 *     summary: Update Catering details
 *     tags: [Catering]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cateringId
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
 *               nama:
 *                 type: string
 *               alamat:
 *                 type: string
 *               hp:
 *                 type: string
 *               rating:
 *                 type: number
 *               deskripsi:
 *                 type: string
 *     responses:
 *       200:
 *         description: Catering updated successfully
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /catering/{cateringId}:
 *   delete:
 *     summary: Delete Catering
 *     tags: [Catering]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cateringId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Catering deleted successfully
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /catering/{cateringId}/schedules:
 *   post:
 *     summary: Add Schedule and Food to Catering
 *     tags: [Catering]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cateringId
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
 *               paketId:
 *                 type: string
 *               waktu:
 *                 type: string
 *               makanan:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     nama:
 *                       type: string
 *                     deskripsi:
 *                       type: string
 *                     imageUrl:
 *                       type: string
 *     responses:
 *       200:
 *         description: Schedule and Food added successfully
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /catering/{cateringId}/pakets:
 *   post:
 *     summary: Add Paket to Catering with Schedules
 *     tags: [Catering]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cateringId
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
 *               durasi:
 *                 type: number
 *               harga:
 *                 type: number
 *               deskripsi:
 *                 type: string
 *               schedules:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     waktu:
 *                       type: string
 *                     makanan:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           nama:
 *                             type: string
 *                           deskripsi:
 *                             type: string
 *                           imageUrl:
 *                             type: string
 *     responses:
 *       200:
 *         description: Paket and Schedules added successfully
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /catering/search:
 *   get:
 *     summary: Search for Catering, Makanan, or Kategori
 *     tags: [Catering]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of search results
 *       400:
 *         description: Query parameter is required
 *       500:
 *         description: Internal server error
 */