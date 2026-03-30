import Joi from "joi";







export const updateHRRequestValidation = Joi.object({
    status: Joi.string().valid("pending", "approved").required(),
});


