// Authentication related constants
export const AUTH = {
    OAUTH: {
        GOOGLE_SCOPE: ["profile", "email"],
        FACEBOOK_SCOPE: ["email"],
    },
    PASSWORD_RESET: {
        CODE_LENGTH: 5,
        VERIFY_CODE_LENGTH: 6,
        EXPIRE_MINUTES: 15,
        VERIFY_EXPIRE_MINUTES: 5,
    },
} as const;

export const RATE_LIMIT = {
    WINDOW_MS: 15 * 60 * 1000, // 15 minutes
    GLOBAL_MAX: 100,
    AUTH_MAX_PROD: 10,
    AUTH_MAX_DEV: 100,
} as const;
