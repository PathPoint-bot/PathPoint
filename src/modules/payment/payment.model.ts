import mongoose, { Schema, Document } from "mongoose";
import type { IPaymentLog } from "./payment.types.js";

const PaymentLogSchema = new Schema<IPaymentLog>(
    {
        userId: { type: String, required: true, index: true },
        orderId: { type: String, required: true, index: true },
        transactionId: { type: String },
        amount: { type: Number, required: true },
        currency: { type: String, default: "EGP" },
        status: {
            type: String,
            enum: ["initiated", "success", "failed", "cancelled"],
            default: "initiated",
        },
        provider: { type: String, default: "paymob" },
        errorMessage: { type: String },
        metadata: { type: Schema.Types.Mixed },
    },
    { timestamps: true }
);

export const PaymentLog = mongoose.model<IPaymentLog>("PaymentLog", PaymentLogSchema);
