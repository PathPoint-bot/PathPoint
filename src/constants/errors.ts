// Error messages organized by domain

export const USER_ERRORS = {
    NOT_FOUND: "User not found",
    EMAIL_EXISTS: "Email already exists",
    INVALID_PASSWORD: "Invalid password",
    UNAUTHORIZED: "Unauthorized",
} as const;

export const AUTH_ERRORS = {
    INVALID_REFRESH_TOKEN: "Invalid refresh token",
    INVALID_CODE: "Invalid code",
    CODE_EXPIRED: "Code expired",
    RESET_TOKEN_NOT_FOUND: "Reset password token not found",
    FAILED_CREATE_TOKEN: "Failed to create reset password token",
} as const;

export const VALIDATION_ERRORS = {
    NAME_REQUIRED: "Name is required",
    NAME_MIN: "Name must be at least 3 characters",
    NAME_MAX: "Name must be at most 25 characters",
    EMAIL_REQUIRED: "Email is required",
    EMAIL_INVALID: "Email must be a valid email",
    EMAIL_MIN: "Email must be at least 3 characters",
    EMAIL_MAX: "Email must be at most 25 characters",
    PASSWORD_REQUIRED: "Password is required",
    PASSWORD_MIN: "Password must be at least 6 characters",
    PASSWORD_MAX: "Password must be at most 64 characters",
    REFRESH_TOKEN_REQUIRED: "Refresh token is required",
    CODE_REQUIRED: "Code is required",
} as const;

export const RATE_LIMIT_ERRORS = {
    TOO_MANY_REQUESTS: "Too many requests, please try again later.",
    TOO_MANY_ATTEMPTS: "Too many login attempts, please try again later.",
} as const;

export const SERVER_ERRORS = {
    INTERNAL_ERROR: "Internal Server Error",
} as const;
