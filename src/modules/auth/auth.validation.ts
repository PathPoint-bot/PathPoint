import Joi from "joi";
import { USER, VALIDATION_ERRORS } from "../../constants/index.js";




export const createUserValidation = Joi.object({
    name: Joi.string().required().min(USER.NAME.MIN_LENGTH).max(USER.NAME.MAX_LENGTH)
    .messages({
        "string.required": VALIDATION_ERRORS.NAME_REQUIRED,
        "string.min": VALIDATION_ERRORS.NAME_MIN,
        "string.max": VALIDATION_ERRORS.NAME_MAX,
    }),
    email: Joi.string().email().required()
    .min(USER.NAME.MIN_LENGTH)
    .max(USER.NAME.MAX_LENGTH)
    .messages({
        "string.required": VALIDATION_ERRORS.EMAIL_REQUIRED,
        "string.email": VALIDATION_ERRORS.EMAIL_INVALID,
        "string.min": VALIDATION_ERRORS.EMAIL_MIN,
        "string.max": VALIDATION_ERRORS.EMAIL_MAX,
    }),
    password: Joi.string().required()
    .min(USER.PASSWORD.MIN_LENGTH)
    .max(USER.PASSWORD.MAX_LENGTH)
    .messages({
        "string.required": VALIDATION_ERRORS.PASSWORD_REQUIRED,
        "string.min": VALIDATION_ERRORS.PASSWORD_MIN,
        "string.max": VALIDATION_ERRORS.PASSWORD_MAX,
    })
})


export const loginValidation = Joi.object({
    email: Joi.string().email().required()
    .messages({
        "string.required": VALIDATION_ERRORS.EMAIL_REQUIRED,
        "string.email": VALIDATION_ERRORS.EMAIL_INVALID,
    }),
    password: Joi.string().required()
    .messages({
        "string.required": VALIDATION_ERRORS.PASSWORD_REQUIRED,
    })
})


export const refreshValidation = Joi.object({
    refreshToken: Joi.string().required()
    .messages({
        "string.required": VALIDATION_ERRORS.REFRESH_TOKEN_REQUIRED,
    })
})


export const resetPassword = Joi.object({
    email: Joi.string().email().required()
    .messages({
        "string.required": VALIDATION_ERRORS.EMAIL_REQUIRED,
        "string.email": VALIDATION_ERRORS.EMAIL_INVALID,
    })
})


export const verifyResetPasswordCode = Joi.object({
    email: Joi.string().email().required()
    .messages({
        "string.required": VALIDATION_ERRORS.EMAIL_REQUIRED,
        "string.email": VALIDATION_ERRORS.EMAIL_INVALID,
    }),
    code: Joi.string().required()
    .messages({
        "string.required": VALIDATION_ERRORS.CODE_REQUIRED,
    })
})


export const updatePassword = Joi.object({
    email: Joi.string().email().required()
    .messages({
        "string.required": VALIDATION_ERRORS.EMAIL_REQUIRED,
        "string.email": VALIDATION_ERRORS.EMAIL_INVALID,
    }),
    code: Joi.string().required()
    .messages({
        "string.required": VALIDATION_ERRORS.CODE_REQUIRED,
    }),
    password: Joi.string().required()
    .min(USER.PASSWORD.MIN_LENGTH)
    .max(USER.PASSWORD.MAX_LENGTH)
    .messages({
        "string.required": VALIDATION_ERRORS.PASSWORD_REQUIRED,
        "string.min": VALIDATION_ERRORS.PASSWORD_MIN,
        "string.max": VALIDATION_ERRORS.PASSWORD_MAX,
    })
})
