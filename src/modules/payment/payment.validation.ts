import Joi from "joi";

// Base validation for all payment initiations (no amount - comes from constants)
const basePaymentValidation = {
    currency: Joi.string().valid("EGP", "USD").optional().messages({
        "any.only": "Currency must be EGP or USD",
    }),
};

// Generic payment initiation

// HR Booking payment
export const hrBookingPaymentValidation = Joi.object({
    ...basePaymentValidation,
    hrId: Joi.string().required().messages({
        "any.required": "HR ID is required",
    }),
});

// Plan Upgrade payment
export const planUpgradePaymentValidation = Joi.object({
    ...basePaymentValidation,
    plan: Joi.string().valid("basic", "pro", "enterprise").required().messages({
        "any.required": "Plan is required",
        "any.only": "Plan must be basic, pro, or enterprise",
    }),
});

// Only validate essential fields for callback - rest is handled by .unknown(true)
export const paymentCallbackValidation = Joi.object({
    // Required for HMAC validation
    hmac: Joi.string().required(),
    
    // Required for payment status check
    success: Joi.alternatives().try(
        Joi.string().valid("true", "false"),
        Joi.boolean()
    ).required(),
    
    // Used in logs (optional)
    id: Joi.string().optional(),
    order: Joi.alternatives().try(Joi.object(), Joi.string()).optional(),
    
    // Error message (optional)
    error_message: Joi.string().optional(),
    "data.message": Joi.string().optional(),
}).unknown(true);
