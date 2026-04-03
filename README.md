# PathPoint API

A comprehensive career platform API built with Node.js, Express, TypeScript, and MongoDB. PathPoint connects job seekers with HR professionals, offering resume management, profile customization, ratings, and course listings.

## 🚀 Features

### 🔐 Authentication & Authorization
- **Local Registration & Login** - Email/password based authentication with JWT
- **OAuth Integration** - Google & Facebook OAuth2 support
- **JWT Tokens** - Access tokens (15 mins) + Refresh tokens (7 days)
- **Cookie-based Auth** - HTTP-only, secure refresh token storage
- **Password Reset** - Secure email-based password recovery with verification codes
- **Role-based Access** - User, HR, and Admin roles with protected routes

### 👤 Profile Management
- **User Profiles** - Bio, location, social links, job titles, avatar upload
- **HR Profiles** - Company information, resume/CV, experience, education
- **Avatar Upload** - Cloudinary integration (JPEG, PNG, JPG, WEBP)
- **Resume Upload** - For HR professionals (PDF, DOC, DOCX)
- **Public Profile Viewing** - Access any user's public profile

### 📄 Resume/CV Management
- **Upload CVs** - Support for PDF, DOC, DOCX formats
- **Plan-based Limits** - Daily upload limits based on subscription tier
- **Cloud Storage** - Cloudinary integration for file storage
- **CRUD Operations** - Create, read, update, delete resumes
- **Pagination & Sorting** - Query parameters for efficient data retrieval

### ⭐ Rating System
- **Rate HR Professionals** - Users can rate and review HR profiles
- **Average Rating Calculation** - Automatic rating aggregation
- **Update & Delete Ratings** - Modify or remove existing ratings
- **View Own Ratings** - Users can see their rating history

### 📧 Email Notifications
- **HTML Email Templates** - Professional responsive email designs
- **Welcome Emails** - Sent on user registration/login
- **Password Reset** - Verification code emails for password recovery
- **Payment Confirmation** - Transaction details after successful payment
- **HR Reservation** - Booking confirmation emails for HR sessions
- **Text-based Logo** - PathPoint branding in all emails

### 💳 Payment Integration
- **Paymob Integration** - Secure payment processing with Paymob
- **HR Booking Payments** - Fixed 100 EGP for booking HR sessions
- **Plan Upgrade Payments** - Tiered pricing (Basic: 200 EGP, Pro: 500 EGP)
- **HMAC Validation** - Secure callback verification
- **Automatic Actions** - Upgrade user roles on successful payment
- **Payment Logging** - Complete transaction history in database

### � Course Management
- **Course Listings** - Browse available courses
- **Admin CRUD** - Create, update, delete courses (admin only)
- **Public Access** - Anyone can view course listings

### 🛡️ Security
- **Rate Limiting** - Global and authentication-specific limits
- **Input Validation** - Joi schema validation for all inputs
- **File Upload Security** - Strict MIME type checking and size limits
- **Password Hashing** - bcrypt with configurable salt rounds
- **CORS Protection** - Configured for frontend integration
- **Security Headers** - Helmet.js for enhanced security
- **NoSQL Injection Protection** - Request body sanitization

### 📚 Documentation
- **Swagger UI** - Interactive API documentation
- **OpenAPI 3.0** - Comprehensive API specs
- **Examples** - Request/response examples for all endpoints

## 🛠️ Tech Stack

- **Runtime**: Node.js (v18+)
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Passport.js + JWT + Cookies
- **Validation**: Joi
- **File Upload**: Multer + Cloudinary
- **Documentation**: Swagger/OpenAPI 3.0
- **Security**: Helmet, CORS, Rate Limiting, bcrypt
- **Email**: Nodemailer with Gmail SMTP
- **Payments**: Paymob (Paymob API)

## 📦 Installation

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- Gmail account (for email features)
- Cloudinary account (for file uploads)

### Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd PathPoint
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Configuration**
```bash
cp .env.example .env
```

4. **Configure environment variables**
```env
# App
NODE_ENV=development
PORT=3000

# Database
MONGO_URI=mongodb://localhost:27017/pathpoint

# Client
CLIENT_URL=http://localhost:5173

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback

# Facebook OAuth
FACEBOOK_CLIENT_ID=your-facebook-client-id
FACEBOOK_CLIENT_SECRET=your-facebook-client-secret
FACEBOOK_CALLBACK_URL=http://localhost:3000/api/auth/facebook/callback

# JWT
JWT_SECRET=your-jwt-secret
REFRESH_TOKEN_SECRET=your-refresh-token-secret

# Email
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASSWORD=your-gmail-app-password

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Paymob
PAYMOB_API_KEY=your-paymob-api-key
PAYMOB_SECRET_KEY=your-paymob-secret-key
PAYMOB_HMAC_SECRET=your-paymob-hmac-secret
PAYMOB_INTEGRATION_ID=your-integration-id
PAYMOB_IFRAME_ID=your-iframe-id
PAYMOB_URL=https://accept.paymob.com
```

### OAuth Setup

#### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add redirect URI: `http://localhost:3000/api/auth/google/callback`

#### Facebook OAuth
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create new app
3. Add Facebook Login product
4. Configure OAuth redirect URI: `http://localhost:3000/api/auth/facebook/callback`

#### Email Setup (Gmail)
1. Enable 2-Step Verification on your Gmail account
2. Generate App Password
3. Use App Password in `EMAIL_PASSWORD` environment variable

#### Cloudinary Setup
1. Create account at [Cloudinary](https://cloudinary.com)
2. Get your cloud name, API key, and API secret from the dashboard
3. Add them to your `.env` file

#### Paymob Setup
1. Create account at [Paymob](https://paymob.com)
2. Get your API key, Secret Key, and HMAC Secret from the dashboard
3. Create an Integration ID (Card Payment)
4. Get your Iframe ID from the Accept dashboard
5. Add them to your `.env` file
6. Set your callback URL in Paymob dashboard: `https://your-api.com/api/payments/callback`

## 🚀 Running the Application

### Development
```bash
npm run dev
```

### Production
```bash
npm run build
npm start
```

### Health Check
```bash
curl http://localhost:3000/api/health
```

## 📚 API Documentation

### Swagger UI
Visit `http://localhost:3000/api-docs` for interactive API documentation.

### Authentication Endpoints

#### Local Auth
```http
POST /api/auth/register       # Register new user
POST /api/auth/login          # Login with email/password
POST /api/auth/refresh        # Get new access token
POST /api/auth/logout         # Logout user
```

#### OAuth
```http
GET /api/auth/google          # Initiate Google OAuth
GET /api/auth/facebook        # Initiate Facebook OAuth
GET /api/auth/google/callback # Google OAuth callback
GET /api/auth/facebook/callback # Facebook OAuth callback
```

#### Password Reset
```http
POST /api/auth/reset-password              # Request password reset
POST /api/auth/verify-reset-password-code # Verify reset code
POST /api/auth/update-password           # Update password with token
```

### Profile Endpoints

```http
GET    /api/profile              # Get all HR profiles (public)
GET    /api/profile/:userId      # Get specific profile by user ID
PUT    /api/profile/user         # Update user profile (auth required)
PUT    /api/profile/hr           # Update HR profile (HR role required)
```

### Resume Endpoints

```http
GET    /api/resumes              # Get all user resumes
POST   /api/resumes              # Upload new resume
GET    /api/resumes/:id          # Get specific resume
PATCH  /api/resumes/:id          # Update resume
DELETE /api/resumes/:id          # Delete resume
```

**Plan Limits:**
- Free: 1 resume daily
- Basic: 3 resumes daily
- Premium: 10 resumes daily

### Rating Endpoints

```http
POST   /api/rating               # Create rating for HR
PUT    /api/rating/:id           # Update rating
DELETE /api/rating/:id           # Delete rating
GET    /api/rating/my-rating     # Get user's ratings
```

### Payment Endpoints

```http
POST   /api/payments/hr-booking      # Initiate HR booking payment (100 EGP)
POST   /api/payments/plan-upgrade    # Initiate plan upgrade payment
GET    /api/payments/callback        # Paymob callback (GET)
POST   /api/payments/callback        # Paymob callback (POST)
```

**Payment Amounts (from constants):**
- HR Booking: 100 EGP
- Plan Basic: 200 EGP
- Plan Pro: 500 EGP

### Course Endpoints

```http
GET    /api/courses              # Get all courses (public)
GET    /api/courses/:id          # Get specific course (public)
POST   /api/courses              # Create course (admin only)
PATCH  /api/courses/:id          # Update course (admin only)
DELETE /api/courses/:id          # Delete course (admin only)
```

### Request Examples

#### Register User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

#### Login User
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

#### Refresh Token
```bash
curl -X POST http://localhost:3000/api/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "your-refresh-token"
  }'
```

## 🔧 Configuration

### JWT Configuration
- **Access Token**: 15 minutes expiration
- **Refresh Token**: 7 days expiration
- **Storage**: HTTP-only cookie for refresh token

### Rate Limiting
- **Global**: 100 requests per 15 minutes
- **Auth**: 20 requests per 15 minutes
- **Resumes**: Plan-based daily limits

### File Upload Limits
- **Images**: JPEG, PNG, JPG, WEBP (max 5MB)
- **Documents**: PDF, DOC, DOCX (max 5MB)
- **Storage**: Cloudinary with organized folders

### Security Features
- **Helmet.js**: Security headers
- **CORS**: Cross-origin resource sharing
- **HPP**: HTTP parameter pollution protection
- **Compression**: Response compression
- **Body Sanitization**: NoSQL injection protection

## 🗂️ Project Structure

```
src/
├── config/
│   ├── env.ts              # Environment validation
│   ├── jwt.ts              # JWT configuration
│   ├── multer.ts           # File upload configuration
│   └── passport.ts         # Passport strategies
├── constants/
│   ├── upload.ts           # Upload constants (limits, MIME types)
│   └── payment.ts          # Payment amounts and currency
├── docs/
│   ├── swagger.ts          # Swagger configuration
│   ├── auth.apis.ts        # Auth API docs
│   ├── profile.apis.ts     # Profile API docs
│   ├── resume.apis.ts      # Resume API docs
│   ├── rating.apis.ts      # Rating API docs
│   ├── payment.apis.ts     # Payment API docs
│   └── hr.apis.ts          # HR API docs
├── middlewares/
│   ├── error.middleware.ts # Error handling
│   ├── protect.ts          # Auth protection (user/HR/admin)
│   ├── ratelimiter.ts      # Rate limiting
│   ├── validate.ts         # Input validation
│   └── planLimits.middleware.ts # Plan-based upload limits
├── modules/
│   ├── auth/               # Authentication module
│   │   ├── models/
│   │   ├── strategies/
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.route.ts
│   │   └── auth.validation.ts
│   ├── profile/            # Profile module
│   │   ├── profile.model.ts
│   │   ├── profile.controller.ts
│   │   ├── profile.service.ts
│   │   ├── profile.route.ts
│   │   └── profile.validation.ts
│   ├── resume/             # Resume module
│   │   ├── resume.model.ts
│   │   ├── resume.controller.ts
│   │   ├── resume.service.ts
│   │   └── resume.route.ts
│   ├── rating/             # Rating module
│   │   ├── rating.model.ts
│   │   ├── rating.controller.ts
│   │   ├── rating.service.ts
│   │   └── rating.route.ts
│   ├── course/             # Course module
│   │   ├── course.model.ts
│   │   ├── course.controller.ts
│   │   └── course.route.ts
│   ├── hr/                 # HR request module
│   │   ├── hr.model.ts
│   │   ├── hr.controller.ts
│   │   └── hr.route.ts
│   └── payment/            # Payment module
│       ├── payment.model.ts
│       ├── payment.controller.ts
│       ├── payment.service.ts
│       ├── payment.route.ts
│       └── payment.validation.ts
├── services/
│   └── email.ts            # Email service (Nodemailer)
├── templates/              # HTML email templates
│   ├── welcome.html        # Welcome email
│   ├── reset-password.html # Password reset email
│   ├── payment-confirmation.html # Payment success email
│   └── hr-reservation.html # HR booking confirmation email
├── utils/
│   ├── ApiError.ts         # Custom error class
│   ├── ApiFeatures.ts      # Query features (filter, sort, paginate)
│   └── cloudinaryUpload.ts # Cloudinary utilities
├── app.ts                  # Express app setup
└── server.ts               # Server startup
```

## 🧪 Testing

### Environment Setup
```bash
# Test environment
NODE_ENV=test
MONGO_URI=mongodb://localhost:27017/pathpoint-test
```

### Running Tests
```bash
npm test
```

## 🚀 Deployment

### Environment Variables for Production
```env
NODE_ENV=production
PORT=3000
CLIENT_URL=https://your-frontend-domain.com
GOOGLE_CALLBACK_URL=https://your-api-domain.com/api/auth/google/callback
FACEBOOK_CALLBACK_URL=https://your-api-domain.com/api/auth/facebook/callback
```

### Production Considerations
- Use HTTPS in production
- Set secure cookie flags (`secure: true`, `sameSite: 'none'`)
- Configure proper CORS origins
- Use environment-specific secrets
- Enable logging and monitoring
- Set up database backups
- Configure Cloudinary for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests if applicable
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Submit a pull request

## 📝 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the API documentation at `/api-docs`
- Review the environment configuration

## 🔒 Security Notes

- Always use HTTPS in production
- Keep environment variables secure
- Never commit `.env` files
- Regularly update dependencies
- Monitor security advisories
- Use strong secrets for JWT and OAuth
- Implement proper logging and monitoring
- Validate all file uploads strictly

## 📊 Monitoring

### Health Endpoints
- `/api/health` - Basic health check
- Logs and metrics should be implemented for production

### Error Handling
- Structured error responses
- Development vs production error details
- Custom error classes for better debugging

---

**Built with ❤️ for connecting talent with opportunity**
