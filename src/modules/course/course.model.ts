import mongoose, { Schema } from "mongoose";
import type { ICourse } from "./course.types.js";

const courseSchema = new Schema<ICourse>({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200,
    },
    description: {
        type: String,
        required: true,
        maxlength: 2000,
    },
    category: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        enum: ["beginner", "intermediate", "advanced"],
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    duration: {
        type: Number,
        required: true,
        min: 0,
    },
    thumbnail: {
        type: String,
    },
    courseUrl: {
        type: String,
        required: true,
    },
    platform: {
        type: String,
        required: true,
    },
    promoCode: {
        type: String,
    },
}, {
    timestamps: true,
});

const Course = mongoose.model<ICourse>("Course", courseSchema);
export default Course;
