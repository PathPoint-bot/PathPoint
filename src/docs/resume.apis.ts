/**
 * @swagger
 * tags:
 *   name: Resumes
 *   description: CV/Resume management endpoints
 */

/**
 * @swagger
 * /resumes:
 *   get:
 *     summary: Get all user resumes
 *     description: |
 *       Retrieve all resumes uploaded by the authenticated user with filtering, sorting, and pagination.
 *       
 *       **Query Parameters:**
 *       - `page`: Page number for pagination (default: 1)
 *       - `limit`: Items per page (default: 10, max: 20)
 *       - `sort`: Sort order, prefix with `-` for descending (e.g., `-createdAt` for newest first)
 *       
 *       **Example:** `/resumes?page=1&limit=10&sort=-createdAt`
 *     tags: [Resumes]
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
 *           maximum: 20
 *         description: Number of items per page
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           default: "-createdAt"
 *         description: Sort order (e.g., "-createdAt" for descending, "createdAt" for ascending)
 *     responses:
 *       200:
 *         description: List of resumes retrieved successfully
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
 *                     $ref: '#/components/schemas/Resume'
 *       401:
 *         description: Unauthorized - User not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Plan limit exceeded
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /resumes:
 *   post:
 *     summary: Upload a new CV/Resume
 *     description: |
 *       Upload a new CV file (PDF, DOC, DOCX) to the user's account.
 *       
 *       **Plan Limits:**
 *       - Free: 1 CV daily
 *       - Basic: 3 CVs daily
 *       - Premium: 10 CVs daily
 *     tags: [Resumes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - cv
 *             properties:
 *               cv:
 *                 type: string
 *                 format: binary
 *                 description: |
 *                   CV file to upload (required).
 *                   
 *                   **Allowed formats:** PDF, DOC, DOCX
 *                   **Max size:** 5MB
 *               title:
 *                 type: string
 *                 description: |
 *                   Custom title for the resume (optional).
 *                   If not provided, the original filename will be used.
 *     responses:
 *       201:
 *         description: Resume uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Resume'
 *       400:
 *         description: Invalid file type or size
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized - User not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Daily plan limit exceeded
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /resumes/{resumeId}:
 *   get:
 *     summary: Get a specific resume by ID
 *     description: |
 *       Retrieve details of a specific resume owned by the authenticated user.
 *       
 *       **Note:** Only the resume owner can access their resumes.
 *     tags: [Resumes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: resumeId
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ID of the resume
 *     responses:
 *       200:
 *         description: Resume details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Resume'
 *       401:
 *         description: Unauthorized - User not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Resume not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /resumes/{resumeId}:
 *   patch:
 *     summary: Update a resume
 *     description: |
 *       Update resume title or replace the CV file.
 *       
 *       **Note:** At least one field must be provided. All fields are optional.
 *       
 *       **Allowed file formats for CV:** PDF, DOC, DOCX (max 5MB)
 *     tags: [Resumes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: resumeId
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ID of the resume
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               cv:
 *                 type: string
 *                 format: binary
 *                 description: |
 *                   New CV file to replace existing (optional).
 *                   
 *                   **Allowed formats:** PDF, DOC, DOCX
 *                   **Max size:** 5MB
 *               title:
 *                 type: string
 *                 description: New title for the resume (optional)
 *     responses:
 *       200:
 *         description: Resume updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Resume'
 *       400:
 *         description: Invalid file type or validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized - User not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Resume not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /resumes/{resumeId}:
 *   delete:
 *     summary: Delete a resume
 *     description: |
 *       Delete a resume and remove the file from Cloudinary storage.
 *       
 *       **Note:** This action is permanent and cannot be undone.
 *     tags: [Resumes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: resumeId
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ID of the resume to delete
 *     responses:
 *       200:
 *         description: Resume deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Resume deleted successfully"
 *       401:
 *         description: Unauthorized - User not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Resume not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
