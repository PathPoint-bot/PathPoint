import rateLimit from "express-rate-limit";
import { env } from "../config/env.js";
import { RATE_LIMIT, RATE_LIMIT_ERRORS } from "../constants/index.js";

const globalLimiter = rateLimit({
    windowMs: RATE_LIMIT.WINDOW_MS,
    max: RATE_LIMIT.GLOBAL_MAX,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: RATE_LIMIT_ERRORS.TOO_MANY_REQUESTS,
    },
})

const authLimiter = rateLimit({
    windowMs: RATE_LIMIT.WINDOW_MS,
    max: env.app.nodeEnv === "production" ? RATE_LIMIT.AUTH_MAX_PROD : RATE_LIMIT.AUTH_MAX_DEV,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: RATE_LIMIT_ERRORS.TOO_MANY_ATTEMPTS,
    },
})

export { globalLimiter, authLimiter }