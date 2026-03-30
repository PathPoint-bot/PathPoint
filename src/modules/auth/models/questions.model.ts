import mongoose from "mongoose";
import type {IQuestion} from "../auth.types.js";

const questionsSchema = new mongoose.Schema<IQuestion>({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    questions: {
        type: [
            {
            key: { type: String, required: true },
            value: { type: mongoose.Schema.Types.Mixed, required: true }
            }
        ],
        required: true,
    }
}, {
    timestamps: true
});

const Questions = mongoose.model<IQuestion>("questions", questionsSchema);

export default Questions;