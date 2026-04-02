import Joi from "joi";
import { VALID_RATING_TARGET_TYPES } from "../../constants/rating.js";

export const createRatingValidation = Joi.object({
    targetId: Joi.string().required()
        .messages({ "any.required": "Target ID is required" }),
    targetType: Joi.string().valid(...VALID_RATING_TARGET_TYPES).required()
        .messages({ "any.required": "Target type is required", "any.only": "Invalid target type" }),
    rating: Joi.number().integer().min(1).max(5).required()
        .messages({ 
            "any.required": "Rating is required",
            "number.base": "Rating must be a number",
            "number.integer": "Rating must be an integer",
            "number.min": "Rating must be at least 1",
            "number.max": "Rating must be at most 5"
        }),
    review: Joi.string().max(1000).allow(""),
});

export const updateRatingValidation = Joi.object({
    rating: Joi.number().integer().min(1).max(5).required()
        .messages({ 
            "number.base": "Rating must be a number",
            "number.integer": "Rating must be an integer",
            "number.min": "Rating must be at least 1",
            "number.max": "Rating must be at most 5",
            "any.required": "Rating is required"
        }),
});
