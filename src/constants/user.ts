// User related constants
export const USER = {
    NAME: {
        MIN_LENGTH: 3,
        MAX_LENGTH: 25,
    },
    PASSWORD: {
        MIN_LENGTH: 6,
        MAX_LENGTH: 64,
    },
    ROLES: {
        USER: "user",
        HR: "hr",
        ADMIN: "admin",
    } as const,
} as const;
