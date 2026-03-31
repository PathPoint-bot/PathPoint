// File upload constants
export const FILE_UPLOAD = {
    // Size limits in bytes
    LIMITS: {
        DEFAULT: 5 * 1024 * 1024, // 5MB
        SMALL: 10 * 1024, // 10KB for JSON payloads
        MAX_PER_FIELD: 10, // Max 10 items per array field
    },
    // Cloudinary folders
    FOLDERS: {
        RESUMES: "resumes",
        PROFILE_AVATARS: "profiles/avatars",
        PROFILE_RESUMES: "profiles/resumes",
    },
    // MIME types as readonly tuples for type safety
    MIME_TYPES: {
        IMAGES: ["image/jpeg", "image/png", "image/jpg", "image/webp"] as readonly string[],
        CV: ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"] as readonly string[],
        ALL: ["image/jpeg", "image/png", "image/jpg", "image/webp", "application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "text/plain"] as readonly string[],
    },
    RESOURCE_TYPES: {
        IMAGE: "image",
        RAW: "raw",
        AUTO: "auto",
    },
    FIELDS: {
        AVATAR: "avatar",
        RESUME: "resume",
        CV: "cv",
    },
} as const;

// Time calculations for uploads/limits
export const UPLOAD_TIME = {
    LAST_24_HOURS: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
} as const;

// Plan limits
export const PLAN_LIMITS = {
    RESUMES: {
        FREE: 1,
        BASIC: 3,
        PREMIUM: 10,
    },
} as const;
