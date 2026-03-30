// Rating target types - used across rating module
export const RATING_TARGET_TYPES = {
    PROFILE: "profile",
    COURSE: "course",
    RESUME: "resume",
} as const;

// Array of valid target types for validation
export const VALID_RATING_TARGET_TYPES = Object.values(RATING_TARGET_TYPES);

// Type for rating target
export type RatingTargetType = typeof RATING_TARGET_TYPES[keyof typeof RATING_TARGET_TYPES];
