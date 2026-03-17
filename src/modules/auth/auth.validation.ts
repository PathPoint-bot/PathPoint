import Joi from "joi";




export const createUserValidation = Joi.object({
    name: Joi.string().required().min(3).max(25)
    .messages({
        "string.required": "Name is required",
        "string.min": "Name must be at least 3 characters",
        "string.max": "Name must be at most 25 characters",
    }),
    email: Joi.string().email().required()
    .min(3)
    .max(25)
    .messages({
        "string.required": "Email is required",
        "string.email": "Email must be a valid email",
        "string.min": "Email must be at least 3 characters",
        "string.max": "Email must be at most 25 characters",
    }),
    password: Joi.string().required()
    .min(6)
    .max(64)
    .messages({
        "string.required": "Password is required",
        "string.min": "Password must be at least 6 characters",
        "string.max": "Password must be at most 64 characters",
    })
})


export const loginValidation = Joi.object({
    email: Joi.string().email().required()
    .messages({
        "string.required": "Email is required",
        "string.email": "Email must be a valid email",
    }),
    password: Joi.string().required()
    .messages({
        "string.required": "Password is required",
    })
})


export const refreshValidation = Joi.object({
    refreshToken: Joi.string().required()
    .messages({
        "string.required": "Refresh token is required",
    })
})


export const resetPassword = Joi.object({
    email: Joi.string().email().required()
    .messages({
        "string.required": "Email is required",
        "string.email": "Email must be a valid email",
    })
})


export const verifyResetPasswordCode = Joi.object({
    email: Joi.string().email().required()
    .messages({
        "string.required": "Email is required",
        "string.email": "Email must be a valid email",
    }),
    code: Joi.string().required()
    .messages({
        "string.required": "Code is required",
    })
})


export const updatePassword = Joi.object({
    email: Joi.string().email().required()
    .messages({
        "string.required": "Email is required",
        "string.email": "Email must be a valid email",
    }),
    code: Joi.string().required()
    .messages({
        "string.required": "Code is required",
    }),
    password: Joi.string().required()
    .min(6)
    .max(64)
    .messages({
        "string.required": "Password is required",
        "string.min": "Password must be at least 6 characters",
        "string.max": "Password must be at most 64 characters",
    })
})
