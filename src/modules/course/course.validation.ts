import Joi from "joi";

export const createCourseValidation = Joi.object({
    title: Joi.string().required().max(200)
        .messages({ "any.required": "Title is required", "string.max": "Title must be at most 200 characters" }),
    description: Joi.string().required().max(2000)
        .messages({ "any.required": "Description is required", "string.max": "Description must be at most 2000 characters" }),
    category: Joi.string().required()
        .messages({ "any.required": "Category is required" }),
    level: Joi.string().valid("beginner", "intermediate", "advanced").required()
        .messages({ "any.required": "Level is required", "any.only": "Level must be beginner, intermediate, or advanced" }),
    price: Joi.number().required().min(0)
        .messages({ "any.required": "Price is required", "number.min": "Price must be at least 0" }),
    duration: Joi.number().required().min(0)
        .messages({ "any.required": "Duration is required", "number.min": "Duration must be at least 0" }),
    thumbnail: Joi.string().allow("").optional(),
    courseUrl: Joi.string().uri().required()
        .messages({ "any.required": "Course URL is required", "string.uri": "Course URL must be a valid URL" }),
    platform: Joi.string().required()
        .messages({ "any.required": "Platform is required" }),
    promoCode: Joi.string().optional(),
});

export const updateCourseValidation = Joi.object({
    title: Joi.string().max(200),
    description: Joi.string().max(2000),
    category: Joi.string(),
    level: Joi.string().valid("beginner", "intermediate", "advanced"),
    price: Joi.number().min(0),
    duration: Joi.number().min(0),
    thumbnail: Joi.string().allow("").optional(),
    courseUrl: Joi.string().uri()
        .messages({ "string.uri": "Course URL must be a valid URL" }),
    platform: Joi.string(),
    promoCode: Joi.string(),
}).min(1)
    .messages({ "object.min": "At least one field must be provided for update" });
