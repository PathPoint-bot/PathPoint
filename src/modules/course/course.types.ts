import mongoose from "mongoose";



export interface ICourse {
    _id: mongoose.Types.ObjectId;
    title: string;
    description: string;
    category: string;
    level: "beginner" | "intermediate" | "advanced";
    price: number;
    duration: number; // in hours
    thumbnail?: string;
    courseUrl: string;
    platform: string;
    promoCode?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateCourseInput {
    title: string;
    description: string;
    category: string;
    level: "beginner" | "intermediate" | "advanced";
    price: number;
    duration: number;
    thumbnail?: string;
    courseUrl: string;
    platform: string;
    promoCode?: string;
}

export interface UpdateCourseInput {
    title?: string;
    description?: string;
    category?: string;
    level?: "beginner" | "intermediate" | "advanced";
    price?: number;
    duration?: number;
    thumbnail?: string;
    courseUrl?: string;
    platform?: string;
    promoCode?: string;
}
