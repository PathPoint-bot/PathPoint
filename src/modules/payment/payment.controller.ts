import type { Request, Response, NextFunction } from "express";
import asyncHandler from "../../middlewares/asyncHandler.js";
import * as paymentService from "./payment.service.js";


// HR Booking Payment
export const initiateHRBookingPayment = asyncHandler(async (req: Request, res: Response) => {
    const { currency, hrId } = req.body;
    const user = req.user!;

    const payment = await paymentService.initiateHRBookingPayment(user, hrId, currency);

    res.status(200).json({
        success: true,
        data: payment,
    });
});

// Plan Upgrade Payment
export const initiatePlanUpgradePayment = asyncHandler(async (req: Request, res: Response) => {
    const { currency, plan } = req.body;
    const user = req.user!;

    const payment = await paymentService.initiatePlanUpgradePayment(user, plan, currency);

    res.status(200).json({
        success: true,
        data: payment,
    });
});

// Payment Callback
export const paymentCallback = asyncHandler(async (req: Request, res: Response) => {
    const hmac = req.query.hmac as string;
    const result = await paymentService.paymentCallBack(req.query, hmac);

    res.status(200).json({
        success: true,
        data: result,
    });
});
