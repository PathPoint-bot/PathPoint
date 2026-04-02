/**
 * @swagger
 * /hr/all:
 *   get:
 *     summary: Get all HR profiles
 *     description: |
 *       Retrieve a list of all HR profiles with filtering, sorting, and pagination support.
 *       This endpoint is accessible to authenticated users.
 *       
 *       **Features:**
 *       - Filter by various fields (companyName, industry, etc.)
 *       - Sort by any field
 *       - Pagination support
 *     tags: [HR]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           example: "-createdAt"
 *         description: Sort fields (prefix with - for descending)
 *       - in: query
 *         name: companyName
 *         schema:
 *           type: string
 *         description: Filter by company name
 *       - in: query
 *         name: industry
 *         schema:
 *           type: string
 *         description: Filter by industry
 *     responses:
 *       200:
 *         description: List of HR profiles retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/HRProfile'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
