/**
 * @swagger
 * /payments/hr-booking:
 *   post:
 *     summary: Initiate HR booking payment
 *     description: |
 *       Create a payment for HR booking session.
 *       Amount is fixed at 100 EGP (from constants).
 *       Returns Paymob iframe URL for payment processing.
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [hrId]
 *             properties:
 *               hrId:
 *                 type: string
 *                 example: "507f1f77bcf86cd799439011"
 *                 description: HR ID to book appointment with
 *               currency:
 *                 type: string
 *                 enum: [EGP, USD]
 *                 default: EGP
 *                 description: Payment currency (optional)
 *     responses:
 *       200:
 *         description: Payment initiated successfully
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
 *                     paymobOrderId:
 *                       type: string
 *                       example: "498017829"
 *                     paymentKey:
 *                       type: string
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                     iframeUrl:
 *                       type: string
 *                       format: uri
 *                       example: "https://accept.paymob.com/api/acceptance/iframes/67890?payment_token=..."
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /payments/plan-upgrade:
 *   post:
 *     summary: Initiate plan upgrade payment
 *     description: |
 *       Create a payment for upgrading user plan.
 *       Amounts are fixed based on plan (from constants):
 *       - basic: 200 EGP
 *       - pro: 500 EGP
 *       - enterprise: 1000 EGP
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [plan]
 *             properties:
 *               plan:
 *                 type: string
 *                 enum: [basic, pro, enterprise]
 *                 example: "pro"
 *                 description: Plan tier to upgrade to
 *               currency:
 *                 type: string
 *                 enum: [EGP, USD]
 *                 default: EGP
 *                 description: Payment currency (optional)
 *     responses:
 *       200:
 *         description: Payment initiated successfully
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
 *                     paymobOrderId:
 *                       type: string
 *                     paymentKey:
 *                       type: string
 *                     iframeUrl:
 *                       type: string
 *                       format: uri
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /payments/callback:
 *   get:
 *     summary: Paymob payment callback (GET)
 *     description: |
 *       Handle Paymob payment callback. This endpoint is called by Paymob
 *       after payment processing (success or failure).
 *       
 *       **Note:** This is a public endpoint - no authentication required.
 *       Paymob sends the callback with query parameters containing
 *       payment status, transaction ID, and HMAC signature.
 *       
 *       **Actions on success:**
 *       - HR booking: Updates user to HR role
 *       - Plan upgrade: Updates user plan
 *     tags: [Payments]
 *     parameters:
 *       - in: query
 *         name: hmac
 *         schema:
 *           type: string
 *         required: true
 *         description: HMAC signature for validation
 *       - in: query
 *         name: success
 *         schema:
 *           type: string
 *           enum: ["true", "false"]
 *         required: true
 *         description: Payment success status
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         description: Transaction ID
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *         description: Order ID
 *       - in: query
 *         name: amount_cents
 *         schema:
 *           type: string
 *         description: Amount in cents
 *       - in: query
 *         name: error_message
 *         schema:
 *           type: string
 *         description: Error message if payment failed
 *     responses:
 *       200:
 *         description: Callback processed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Payment processed successfully"
 *       400:
 *         description: Invalid HMAC or payment failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   post:
 *     summary: Paymob payment callback (POST)
 *     description: |
 *       Handle Paymob payment callback via POST method.
 *       Same as GET endpoint - accepts query parameters.
 *     tags: [Payments]
 *     parameters:
 *       - in: query
 *         name: hmac
 *         schema:
 *           type: string
 *         required: true
 *       - in: query
 *         name: success
 *         schema:
 *           type: string
 *           enum: ["true", "false"]
 *         required: true
 *     responses:
 *       200:
 *         description: Callback processed successfully
 *       400:
 *         description: Invalid HMAC or payment failed
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PaymentLog:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         userId:
 *           type: string
 *         orderId:
 *           type: string
 *         transactionId:
 *           type: string
 *         amount:
 *           type: number
 *           example: 10000
 *         currency:
 *           type: string
 *           example: "EGP"
 *         status:
 *           type: string
 *           enum: [initiated, success, failed, cancelled]
 *           example: "success"
 *         provider:
 *           type: string
 *           example: "paymob"
 *         errorMessage:
 *           type: string
 *         metadata:
 *           type: object
 *           description: Contains service type and callback data
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
