/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: User and HR profile management endpoints
 */

/**
 * @swagger
 * /profile/{userId}:
 *   get:
 *     summary: Get user profile by ID
 *     description: Retrieve public profile information for any user. If the requester is the profile owner, includes isOwner flag.
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ID of the user
 *     responses:
 *       200:
 *         description: Profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Profile'
 *       401:
 *         description: Unauthorized - User not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Profile not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /profile/user:
 *   put:
 *     summary: Update user profile
 *     description: |
 *       Update the authenticated user's profile (for regular users).
 *       
 *       **Note:** All fields are optional. Send only the fields you want to update.
 *       To remove the avatar, set `removeAvatar` to `true` (cannot be combined with uploading a new avatar).
 *       
 *       **Allowed file types:**
 *       - Avatar: JPEG, PNG, JPG, WEBP (max 5MB)
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *                 description: Profile avatar image (optional, replaces existing avatar if provided)
 *               bio:
 *                 type: string
 *                 maxLength: 500
 *                 description: Brief user biography/description (max 500 characters)
 *               location:
 *                 type: string
 *                 description: User's location (city, country)
 *               status:
 *                 type: string
 *                 description: Current professional status (e.g., "Open to work", "Employed")
 *               jobTitles:
 *                 type: array
 *                 items:
 *                   type: string
 *                 maxItems: 3
 *                 description: List of job titles/roles (max 3 items)
 *               social:
 *                 type: object
 *                 description: Social media links
 *                 properties:
 *                   youtube:
 *                     type: string
 *                     description: YouTube channel URL
 *                   twitter:
 *                     type: string
 *                     description: Twitter/X profile URL
 *                   facebook:
 *                     type: string
 *                     description: Facebook profile URL
 *                   linkedin:
 *                     type: string
 *                     description: LinkedIn profile URL
 *                   instagram:
 *                     type: string
 *                     description: Instagram profile URL
 *                   github:
 *                     type: string
 *                     description: GitHub profile URL
 *                   website:
 *                     type: string
 *                     description: Personal website URL
 *               removeAvatar:
 *                 type: boolean
 *                 description: Set to `true` to delete the current avatar (cannot use with 'avatar' field)
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Profile'
 *       400:
 *         description: Validation error or invalid file type
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
 *         description: Profile not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /profile/hr:
 *   put:
 *     summary: Update HR profile
 *     description: |
 *       Update the authenticated HR user's profile with company data.
 *       
 *       **Note:** All fields are optional. Send only the fields you want to update.
 *       
 *       **Special flags:**
 *       - `removeAvatar`: Set to `true` to delete the current avatar (cannot combine with uploading new avatar)
 *       - `removeResume`: Set to `true` to delete the current resume/CV (cannot combine with uploading new resume)
 *       
 *       **Allowed file types:**
 *       - Avatar: JPEG, PNG, JPG, WEBP (max 5MB)
 *       - Resume: PDF, DOC, DOCX (max 5MB)
 *       
 *       **Arrays (max 3 items each):**
 *       - `jobTitles`: Current or previous job titles/roles
 *       - `experience`: Work experience entries
 *       - `education`: Education/certification entries
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *                 description: Profile avatar image (optional, replaces existing avatar)
 *               resume:
 *                 type: string
 *                 format: binary
 *                 description: HR resume/CV file (optional, replaces existing resume)
 *               bio:
 *                 type: string
 *                 maxLength: 500
 *                 description: HR professional biography (max 500 characters)
 *               companyName:
 *                 type: string
 *                 description: Name of the company/organization
 *               companyWebsite:
 *                 type: string
 *                 description: Company website URL (e.g., https://example.com)
 *               companySize:
 *                 type: string
 *                 description: Company size range (e.g., "1-10", "50-200", "1000+")
 *               industry:
 *                 type: string
 *                 description: Industry sector (e.g., "Information Technology", "Healthcare")
 *               companyDescription:
 *                 type: string
 *                 description: Brief description of the company
 *               location:
 *                 type: string
 *                 description: Company office location (city, country)
 *               jobTitles:
 *                 type: array
 *                 items:
 *                   type: string
 *                 maxItems: 3
 *                 description: List of job titles/roles (max 3)
 *               experience:
 *                 type: array
 *                 maxItems: 3
 *                 description: Work experience entries/objects (max 3)
 *               education:
 *                 type: array
 *                 maxItems: 3
 *                 description: Education entries/objects (max 3)
 *               removeAvatar:
 *                 type: boolean
 *                 description: Set to `true` to delete the current avatar
 *               removeResume:
 *                 type: boolean
 *                 description: Set to `true` to delete the current resume/CV
 *     responses:
 *       200:
 *         description: HR Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/HRProfile'
 *       400:
 *         description: Validation error or invalid file type
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized - User not authenticated or not HR
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Profile not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
