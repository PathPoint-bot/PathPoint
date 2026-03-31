import Joi from "joi";

export const createResumeValidation = Joi.object({
    title: Joi.string().max(100).messages({
        "string.max": "Title cannot exceed 100 characters",
    }),
});

export const updateResumeValidation = Joi.object({
    title: Joi.string().max(100).messages({
        "string.max": "Title cannot exceed 100 characters",
    }),
});
