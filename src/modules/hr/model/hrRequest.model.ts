import mongoose, { Schema } from "mongoose";
import type { IHRRequest } from "../hr.types.js";


const hrRequestSchema = new Schema<IHRRequest>({
    userId: {
        type: String,
        required: true,
        unique: true,
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


const HRRequest = mongoose.model<IHRRequest>("HRRequest", hrRequestSchema);
export default HRRequest;