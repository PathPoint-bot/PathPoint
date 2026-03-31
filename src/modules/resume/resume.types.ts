import mongoose from "mongoose";

export interface IResume {
    _id: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    title: string;
    url: string;
    publicId: string;
    fileName: string;
    fileSize: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateResumeInput {
    title: string;
    url: string;
    publicId: string;
    fileName: string;
    fileSize: number;
}

export interface UpdateResumeInput {
    title?: string;
}
