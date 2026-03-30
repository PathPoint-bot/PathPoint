import express  from "express"
import type {Request, Response, NextFunction} from "express"
import helmet from 'helmet';
import cors from "cors"
import hpp from "hpp"
import compression from "compression"
import { env } from "./config/env.js"
import morgan from "morgan"
import passport from "./modules/auth/strategies/passport.strategy.js"
import cookieParser from "cookie-parser"
import { globalErrorHandling } from "./middlewares/error.middleware.js"
import ApiError from "./utils/ApiError.js"
import { globalLimiter, authLimiter } from "./middlewares/ratelimiter.js"
import { swaggerUi, specs } from "./docs/swagger.js"

const app = express()




// ── Body Parsing ──────────────────────────────────────
app.use(express.json({ limit: "10kb" })); // Prevent large payload attacks
app.use(express.urlencoded({ extended: true, limit: "10kb" }));


// ── Security ─────────────────────────────────────────────────────
app.use(helmet())
app.use((req, res, next) => {
  const sanitize = (obj : Record<string,any>) => {
    if (obj && typeof obj === "object") {
      Object.keys(obj).forEach((key) => {
        if (key.startsWith("$") || key.includes(".")) {
          delete obj[key];
        } else {
          sanitize(obj[key]);
        }
      });
    }
  };
  sanitize(req.body);
  sanitize(req.params);
  next();
}); // Prevent NoSQL injection
app.use(hpp()); // Prevent HTTP parameter pollution


// ── Cors ─────────────────────────────────────────────────────
app.use(
    cors({
        origin: env.client.url,
        credentials:true
    })
)


// ── Compression ───────────────────────────────────────
app.use(compression());


// ── Cookie Parsing ─────────────────────────────────────
app.use(cookieParser());

// ── Passport initialization (JWT only, no sessions) ──────
app.use(passport.initialize());

// ── Logging ───────────────────────────────────────────
if (env.app.nodeEnv === "development") { // Dev node only
  app.use(morgan("dev"));
}

// Rate limiting
app.use(globalLimiter);


// ── Health Check ──────────────────────────────────────
app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true, message: "Server is running" });
});

// ── Swagger Documentation ───────────────────────────────
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: "PathPoint API Documentation"
}));


// Routes
import authRouter from "./modules/auth/auth.route.js";
app.use("/api/auth", authLimiter, authRouter);


// Middleware
import { isUser } from "./middlewares/isUser.middleware.js";
app.use(isUser);



import hrRouter from "./modules/hr/hr.route.js";
app.use("/api/hr", hrRouter);

import profileRouter from "./modules/profile/profile.route.js";
app.use("/api/profile", profileRouter);

import ratingRouter from "./modules/rating/rating.route.js";
app.use("/api/rating", ratingRouter);

import courseRouter from "./modules/course/course.route.js";
app.use("/api/courses", courseRouter);

// Not found route
app.use((req : Request, res : Response, next : NextFunction) => {
    next(new ApiError(`Can't find this route: ${req.originalUrl}`, 404));
});

// Global error handling middleware
app.use(globalErrorHandling);

export default app


