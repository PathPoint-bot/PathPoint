import mongoose, { Schema } from "mongoose";
import type { IHrBooking } from "../hr.types.js";

const hrBookingSchema = new Schema<IHrBooking>({
    userId: {
        type: String,
        required: true,
    },
    hrId: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "approved"],
        required: true,
        default: "pending"
    }
}, {
    timestamps: true
});

const HRBooking = mongoose.model<IHrBooking>("HRBooking", hrBookingSchema);
export default HRBooking;