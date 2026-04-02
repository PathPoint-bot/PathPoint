export interface IPaymentLog extends Document {
    userId: string;
    orderId: string;
    transactionId?: string;
    amount: number;
    currency: string;
    status: "initiated" | "success" | "failed" | "cancelled";
    provider: string;
    errorMessage?: string;
    metadata?: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
}
