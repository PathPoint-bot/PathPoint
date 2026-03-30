import mongoose, { Schema } from "mongoose";
import type { IRate } from "./rating.types.js";
import { VALID_RATING_TARGET_TYPES } from "../../constants/rating.js";


const ratingSchema = new Schema<IRate>({
    raterId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    targetId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    targetType: {
        type: String,
        enum: VALID_RATING_TARGET_TYPES,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    review: {
        type: String,
        maxlength: 1000,
    },
}, {
    timestamps: true,
});

// Compound index to ensure one rating per user per target
ratingSchema.index({ raterId: 1, targetId: 1, targetType: 1 }, { unique: true });

// Index for querying ratings by target
ratingSchema.index({ targetId: 1, targetType: 1 });

const Rating = mongoose.model<IRate>("Rating", ratingSchema);
export default Rating;
