import Rating from "./rating.model.js";
import ApiError from "../../utils/ApiError.js";
import type mongoose from "mongoose";
import { updateProfileRating  , checkProfile} from "../profile/profile.service.js";
import type { CreateRatingInput, UpdateRatingInput, RatingTargetType } from "./rating.types.js";
import {getCourseById} from "../course/course.service.js";
// Create new rating
export const createRating = async (
    raterId: string | mongoose.Types.ObjectId,
    input: CreateRatingInput
) => {
    const { targetId, targetType, rating, review } = input;

    // Check if user already rated this target
    const existingRating = await Rating.findOne({
        raterId,
        targetId,
        targetType,
    });

    if (existingRating) {
        throw ApiError.conflict("You have already rated this item. Use update instead.");
    }
    
    // Check if target exists
    if (targetType === "course") {
        await getCourseById(targetId);
    }
    else if(targetType === "profile") {
        let targetProfile = await checkProfile(targetId);
        if (!targetProfile) {
            throw ApiError.notFound("Profile not found");
        } else if(targetProfile.profileType != "hr") {
            throw ApiError.badRequest("Only HR profiles can be rated");
        }
    }
    const newRating = await Rating.create({
        raterId,
        targetId,
        targetType,
        rating,
        ...(review && { review }),
    });
    if (targetType === "profile") {
        await updateProfileRating(newRating.raterId, "add", rating);
    }

    return newRating;
};

// Update existing rating
export const updateRating = async (
    raterId: string | mongoose.Types.ObjectId,
    ratingId: string,
    input: UpdateRatingInput
) => {
    const oldRating = await Rating.findOne({ _id: ratingId, raterId });
    const rating = await Rating.findOneAndUpdate(
        { _id: ratingId, raterId },
        { $set: input },
        { new: true, runValidators: true }
    );

    if (!rating) {
        throw ApiError.notFound("Rating not found or you are not authorized to update it");
    }

    if (oldRating?.rating !== rating.rating && oldRating && rating.targetType === "profile") {
        await updateProfileRating(rating.raterId, "update", rating.rating, oldRating.rating);
    }
    
    return rating;
};

// Delete rating
export const deleteRating = async (
    raterId: string | mongoose.Types.ObjectId,
    ratingId: string
) => {
    const rating = await Rating.findOneAndDelete({
        _id: ratingId,
        raterId,
    });

    if (!rating) {
        throw ApiError.notFound("Rating not found or you are not authorized to delete it");
    }
    if (rating.targetType === "profile") {
        await updateProfileRating(rating.raterId, "remove", rating.rating);
    }

    return { message: "Rating deleted successfully" };
};

// Get user's rating for specific target
export const getMyRatingForTarget = async (
    raterId: string | mongoose.Types.ObjectId,
    targetId: string,
    targetType: RatingTargetType
) => {
    const rating = await Rating.findOne({
        raterId,
        targetId,
        targetType,
    });
    return rating;
};
