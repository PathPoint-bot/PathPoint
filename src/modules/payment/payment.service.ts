import { env } from "../../config/env.js";
import axios from "axios";
import type { ITokenPayload } from "../auth/auth.types.js";
import crypto from "crypto";
import ApiError from "../../utils/ApiError.js";
import { PaymentLog } from "./payment.model.js";
import { PAYMENT_AMOUNTS, PAYMENT_CURRENCY } from "../../constants/payment.js";
import {upgradeUserPlan} from "../auth/auth.service.js";
import {createHrBooking} from "../hr/hr.service.js";
let cacheToken: string | null = null;

// HMAC Validation for Paymob callback (handles query params format)
export const validatePaymobHmac = (data: any, receivedHmac: string): boolean => {
    try {
        const hmacSecret = env.payment.hmac;
        
        // Create the string to hash based on Paymob's requirements
        const orderId = typeof data.order === 'object' ? data.order?.id : data.order;
        const sourceDataPan = data.source_data?.pan || data['source_data.pan'];
        const sourceDataSubType = data.source_data?.sub_type || data['source_data.sub_type'];
        const sourceDataType = data.source_data?.type || data['source_data.type'];
        
        const fields = [
            data.amount_cents,
            data.created_at,
            data.currency,
            data.error_occured,
            data.has_parent_transaction,
            data.id,
            data.integration_id,
            data.is_3d_secure,
            data.is_auth,
            data.is_capture,
            data.is_refunded,
            data.is_standalone_payment,
            data.is_voided,
            orderId,
            data.owner,
            data.pending,
            sourceDataPan,
            sourceDataSubType,
            sourceDataType,
            data.success,
        ];

        const message = fields.map(String).join("");
        
        const calculatedHmac = crypto
            .createHmac("sha512", hmacSecret)
            .update(message)
            .digest("hex");

        return calculatedHmac === receivedHmac;
    } catch (error) {
        return false;
    }
};

const getAuthToken = async() => {
    const response = await axios.post(`${env.payment.paymobUrl}/api/auth/tokens`, {
        api_key: env.payment.paymobApiKey
    });
    
    cacheToken = response.data.token;
    return response.data.token;
}



const createPayment = async(amount: number, currency: string = "EGP" , user : ITokenPayload, service: string, retry : boolean = true) => {
    try {
        const response = await axios.post(
            `${env.payment.paymobUrl}/api/ecommerce/orders`,
            {
                auth_token: cacheToken,
                amount_cents: amount,
                currency: currency,
                delivery_needed: "false",
                metadata: {
                    service,
                    userId: user.userId
                }
            }
        );
        return response.data;
    } catch (err: any) {
        if (err.response?.status === 401 && retry) {
            await getAuthToken();
            return createPayment(amount, currency, user, service, false);
        }
        throw err;
    }
};



const createPaymentKey = async (
    paymobOrderId: string,  
    amount: number,      
    user: { name: string; email: string },
    currency: string = "EGP",
    retry: boolean = true
): Promise<string> => {
    try {
        const response = await axios.post(
            `${env.payment.paymobUrl}/api/acceptance/payment_keys`,
            {
                auth_token: cacheToken,
                amount_cents: amount,
                expiration: 3600,
                order_id: paymobOrderId,
                currency,
                integration_id: env.payment.integrationId,
                billing_data: {
                    first_name: user.name,
                    last_name: "NA",
                    email: user.email,
                    phone_number: "NA",
                    apartment: "NA",
                    floor: "NA",
                    street: "NA",
                    building: "NA",
                    shipping_method: "NA",
                    postal_code: "NA",
                    city: "NA",
                    country: "NA",
                    state: "NA",
                },
            }
        );

        return response.data.token;
    } catch (err: any) {
        if (err.response?.status === 401 && retry) {
            await getAuthToken();
            return createPaymentKey(paymobOrderId, amount, user, currency, false);
        }
        throw err;
    }
};




// HR Booking Payment
export const initiateHRBookingPayment = async (
    user: ITokenPayload,
    hrId: string,
    currency: string = PAYMENT_CURRENCY
): Promise<{ paymobOrderId: string; paymentKey: string; iframeUrl: string }> => {
    const amount = PAYMENT_AMOUNTS.HR_BOOKING;
    const paymobOrder = await createPayment(amount, currency, user, "hr-booking");
    const paymentKey = await createPaymentKey(paymobOrder.id, paymobOrder.amount_cents, user, paymobOrder.currency);
    
    await PaymentLog.create({
        userId: user.userId,
        orderId: paymobOrder.id,
        amount: amount,
        currency: currency,
        status: "initiated",
        provider: "paymob",
        metadata: {
             service: "hr-booking",
             hrId,
             userId: user.userId
            }
    });
    
    return {
        paymobOrderId: paymobOrder.id,
        paymentKey,
        iframeUrl: `${env.payment.paymobUrl}/api/acceptance/iframes/${env.payment.iframeId}?payment_token=${paymentKey}`,
    };
};

// Plan Upgrade Payment
export const initiatePlanUpgradePayment = async (
    user: ITokenPayload,
    plan: string,
    currency: string = PAYMENT_CURRENCY
): Promise<{ paymobOrderId: string; paymentKey: string; iframeUrl: string }> => {
    // Get amount based on plan
    const planAmounts: Record<string, number> = {
        basic: PAYMENT_AMOUNTS.PLAN_BASIC,
        pro: PAYMENT_AMOUNTS.PLAN_PRO,
        enterprise: PAYMENT_AMOUNTS.PLAN_ENTERPRISE,
    };
    const amount = planAmounts[plan] || PAYMENT_AMOUNTS.PLAN_BASIC;
    
    const paymobOrder = await createPayment(amount, currency, user, "plan-upgrade");
    const paymentKey = await createPaymentKey(paymobOrder.id, paymobOrder.amount_cents, user, paymobOrder.currency);
    
    await PaymentLog.create({
        userId: user.userId,
        orderId: paymobOrder.id,
        amount: amount,
        currency: currency,
        status: "initiated",
        provider: "paymob",
        metadata: {
             service: "plan-upgrade",
              plan 
        }
    });
    
    return {
        paymobOrderId: paymobOrder.id,
        paymentKey,
        iframeUrl: `${env.payment.paymobUrl}/api/acceptance/iframes/${env.payment.iframeId}?payment_token=${paymentKey}`,
    };
};



export const paymentCallBack = async (data: any, hmac: string): Promise<{ success: boolean; message: string }> => {
    // Validate HMAC
    console.log(data)
    const isValid = validatePaymobHmac(data, hmac);
    
    if (!isValid) {
        throw ApiError.badRequest("Invalid HMAC signature");
    }

    // Check payment status
    const isSuccess = data.success === "true";
    const orderId = typeof data.order === 'object' ? data.order?.id : data.order;
    const errorMessage = data['data.message'] || data.error_message;

    // Update payment log
    if (isSuccess) {
        // Get existing log to preserve original metadata
        const existingLog = await PaymentLog.findOne({ orderId });
        const originalMetadata = existingLog?.metadata || {};
        
        const updatedLog = await PaymentLog.findOneAndUpdate(
            { orderId },
            { 
                status: "success",
                transactionId: data.id,
                metadata: {
                    ...originalMetadata,
                    callbackData: data
                }
            },
            { upsert: true, new: true }
        );
        // Execute service-specific action based on stored metadata
        if (originalMetadata?.service === "hr-booking") {
            await createHrBooking(originalMetadata?.hrId, originalMetadata?.userId);
        } else if (originalMetadata?.service === "plan-upgrade") {
            await upgradeUserPlan(updatedLog.userId, originalMetadata?.plan);
        }
        return { success: true, message: "Payment processed successfully" };
    } else {
        const existingLog = await PaymentLog.findOne({ orderId });
        const originalMetadata = existingLog?.metadata || {};
        
        await PaymentLog.findOneAndUpdate(
            { orderId },
            { 
                status: "failed",
                transactionId: data.id,
                errorMessage: errorMessage || "Unknown error",
                metadata: {
                    ...originalMetadata,
                    callbackData: data
                }
            },
            { upsert: true, new: true }
        );
        throw ApiError.badRequest(`Payment failed: ${errorMessage || "Unknown error"}`);
    }
};