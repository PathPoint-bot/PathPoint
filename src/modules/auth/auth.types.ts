import mongoose from "mongoose";


export type role = "user" | "hr" | "admin";
export type provider = "google" | "facebook" 


export interface IUser {
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    password: string;
    role: role;
    status: "pending" | "completed";
    createdAt: Date;
    updatedAt: Date;
}



export interface IAccount {
    _id: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    provider:  provider,
    providerId: string,
    createdAt: Date;
    updatedAt: Date;
}

export interface ITokenPayload {
    userId: string;
    role: role;
    name: string;
    email:string;
}



export interface RegisterInput {
    name: string;
    email: string;
    password: string;
}

export interface LoginInput {
    email: string;
    password: string;  
}

export interface IResetPassword {
    resetPasswordToken: string
    resetPasswordExpire : Date ,
    userId : mongoose.Types.ObjectId,
    verifyResetToken: string,
    verifyResetExpire : Date
}


export interface IQuestion {
    userId: mongoose.Types.ObjectId;
    questions: {
    key: string;
    value: any;
    }[]
    createdAt: Date;
    updatedAt: Date;
}