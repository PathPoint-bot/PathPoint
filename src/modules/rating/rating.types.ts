import mongoose from "mongoose";
import type { RATING_TARGET_TYPES } from "../../constants/rating.js";

// Rating target types - can be extended for any entity
export type RatingTargetType = typeof RATING_TARGET_TYPES[keyof typeof RATING_TARGET_TYPES];

export interface IRate {
    _id: mongoose.Types.ObjectId;
    raterId: mongoose.Types.ObjectId; // User who gave the rating
    targetId: mongoose.Types.ObjectId; // ID of the entity being rated
    targetType: RatingTargetType; // Type of entity (profile, course, resume, etc.)
    rating: number; // 1-5 scale
    review?: string; // Optional text review
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateRatingInput {
    targetId: string;
    targetType: RatingTargetType;
    rating: number;
    review?: string;
}

export interface UpdateRatingInput {
    rating?: number;
    review?: string;
}

