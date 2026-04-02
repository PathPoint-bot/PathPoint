import { Router } from "express";
import validate from "../../middlewares/validate.js";
import { protectUser } from "../../middlewares/protect.js";
import { isUser } from "../../middlewares/isUser.middleware.js";
import { 
    initiateHRBookingPayment,
    initiatePlanUpgradePayment,
    paymentCallback 
} from "./payment.controller.js";
import { 
    hrBookingPaymentValidation,
    planUpgradePaymentValidation,
    paymentCallbackValidation 
} from "./payment.validation.js";

const router = Router();

// Payment Callback (public - from Paymob)
router.get(
    "/callback",
    validate(paymentCallbackValidation, "query"),
    paymentCallback
);



// HR Booking Payment
router.post(
    "/hr-booking",
    isUser,
    protectUser,
    validate(hrBookingPaymentValidation),
    initiateHRBookingPayment
);

// Plan Upgrade Payment
router.post(
    "/plan-upgrade",
    isUser,
    protectUser,
    validate(planUpgradePaymentValidation),
    initiatePlanUpgradePayment
);


export default router;
