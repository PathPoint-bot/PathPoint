import mongoose, { Schema } from "mongoose";
import type { IResume } from "./resume.types.js";

const resumeSchema = new Schema<IResume>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: true,
        maxlength: 100,
    },
    url: {
        type: String,
        required: true,
    },
    publicId: {
        type: String,
        required: true,
    },
    fileName: {
        type: String,
        required: true,
    },
    fileSize: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});

resumeSchema.index({ userId: 1 });

const Resume = mongoose.model<IResume>("Resume", resumeSchema);
export default Resume;
