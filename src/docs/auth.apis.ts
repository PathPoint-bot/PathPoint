/**
 * @swagger
 * /auth/google:
 *   get:
 *     summary: Initiate Google OAuth login
 *     description: |
 *       Start Google OAuth2 authentication flow.
 *       
 *       **How it works:**
 *       1. Frontend calls this endpoint to start OAuth flow
 *       2. Server redirects to Google OAuth consent screen
 *       3. User grants permission to access their Google account
 *       4. Google redirects to /auth/google/callback with authorization code
 *       5. Server exchanges code for access token and user info
 *       6. Creates JWT tokens and redirects back to frontend
 *       
 *       **Usage:** Call this endpoint from frontend "Login with Google" button
 *     tags: [Authentication]
 *     responses:
 *       302:
 *         description: Redirect to Google OAuth consent screen
 *       500:
 *         description: Server error during OAuth initiation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /auth/facebook:
 *   get:
 *     summary: Initiate Facebook OAuth login
 *     description: |
 *       Start Facebook OAuth2 authentication flow.
 *       
 *       **How it works:**
 *       1. Frontend calls this endpoint to start OAuth flow
 *       2. Server redirects to Facebook OAuth consent screen
 *       3. User grants permission to access their Facebook account
 *       4. Facebook redirects to /auth/facebook/callback with authorization code
 *       5. Server exchanges code for access token and user info
 *       6. Creates JWT tokens and redirects back to frontend
 *       
 *       **Usage:** Call this endpoint from frontend "Login with Facebook" button
 *     tags: [Authentication]
 *     responses:
 *       302:
 *         description: Redirect to Facebook OAuth consent screen
 *       500:
 *         description: Server error during OAuth initiation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     summary: Google OAuth callback
 *     description: |
 *       Handle Google OAuth authentication callback.
 *       
 *       **How it works:**
 *       1. User clicks "Login with Google" on frontend
 *       2. Redirects to Google OAuth consent screen
 *       3. User approves access
 *       4. Google redirects back to this URL with authorization code
 *       5. Server exchanges code for access token and user info
 *       6. Creates JWT tokens and returns to user
 *       
 *       **Note:** This endpoint is called automatically by Google OAuth flow,
 *       not directly by users or frontend applications.
 *     tags: [Authentication]
 *     parameters:
 *       - in: query
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: |
 *           Authorization code from Google OAuth2 flow.
 *           This is a temporary code (valid ~10 minutes) that Google
 *           provides after user grants permission. Server exchanges this
 *           code for access tokens and user profile information.
 *       - in: query
 *         name: state
 *         schema:
 *           type: string
 *         required: false
 *         description: |
 *           CSRF protection parameter. Optional but recommended for
 *           preventing cross-site request forgery attacks.
 *     responses:
 *       200:
 *         description: Successfully authenticated with Google
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                   description: "JWT access token for API access"
 *                 success:
 *                   type: boolean
 *                   example: true
 *       401:
 *         description: Authentication failed or invalid authorization code
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       400:
 *         description: Missing required parameters or invalid request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /auth/facebook/callback:
 *   get:
 *     summary: Facebook OAuth callback
 *     description: |
 *       Handle Facebook OAuth authentication callback.
 *       
 *       **How it works:**
 *       1. User clicks "Login with Facebook" on frontend
 *       2. Redirects to Facebook OAuth consent screen
 *       3. User approves access to their Facebook account
 *       4. Facebook redirects back to this URL with authorization code
 *       5. Server exchanges code for access token and user info
 *       6. Creates JWT tokens and returns to user
 *       
 *       **Note:** This endpoint is called automatically by Facebook OAuth flow,
 *       not directly by users or frontend applications.
 *     tags: [Authentication]
 *     parameters:
 *       - in: query
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: |
 *           Authorization code from Facebook OAuth2 flow.
 *           This is a temporary code (valid ~10 minutes) that Facebook
 *           provides after user grants permission. Server exchanges this
 *           code for access tokens and user profile information including
 *           name, email, and Facebook user ID.
 *       - in: query
 *         name: state
 *         schema:
 *           type: string
 *         required: false
 *         description: |
 *           CSRF protection parameter. Optional but recommended for
 *           preventing cross-site request forgery attacks.
 *     responses:
 *       200:
 *         description: Successfully authenticated with Facebook
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                   description: "JWT access token for API access"
 *                 success:
 *                   type: boolean
 *                   example: true
 *       401:
 *         description: Authentication failed or invalid authorization code
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       400:
 *         description: Missing required parameters or invalid request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Create a new user account with email and password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Validation error or user already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     description: Authenticate user with email and password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 success:
 *                   type: boolean
 *                   example: true
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Refresh access token
 *     description: Get new access token using refresh token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RefreshTokenRequest'
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Invalid or expired refresh token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Request password reset
 *     description: Send password reset code to user's email
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResetPasswordRequest'
 *     responses:
 *       200:
 *         description: Reset code sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "12345"
 *                   description: "Reset code (for testing purposes)"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /auth/verify-reset-password-code:
 *   post:
 *     summary: Verify reset password code
 *     description: Verify the reset password code and get verification code
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VerifyCodeRequest'
 *     responses:
 *       200:
 *         description: Code verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 newCode:
 *                   type: string
 *                   example: "123456"
 *                   description: "Verification code for password update"
 *       401:
 *         description: Invalid or expired code
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /auth/update-password:
 *   post:
 *     summary: Update password
 *     description: Update user password using verification code
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePasswordRequest'
 *     responses:
 *       200:
 *         description: Password updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       401:
 *         description: Invalid or expired verification code
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
