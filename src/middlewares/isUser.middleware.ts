import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import {env} from "../config/env.js";
import type { ITokenPayload } from "../modules/auth/auth.types.js";
import ApiError from "../utils/ApiError.js";
import User from "../modules/auth/models/user.model.js";

// Middleware to check if user is authenticated
export const isUser = async (req: Request, res: Response, next: NextFunction) => {
    let header = req.headers.authorization;
    if (!header) {
        console.log(req.path)
        return next(ApiError.unauthorized("Unauthorized"));
    }
    let token = header.split(" ")[1];
    if (!token) {
        return next(ApiError.unauthorized("Unauthorized"));
    }
    try {
        const decoded = jwt.verify(token, env.jwt.secret) as ITokenPayload;
        let user = await User.findById(decoded.userId);
        if (!user) {
            return next(ApiError.unauthorized("User not found"));
        }
        if (user.status === "pending") {
            return next(ApiError.forbidden("Please Complete Your Profile"));
        }
        const payload = {
            userId: user._id.toString(),
            email: user.email,
            role: user.role,
            name: user.name
        }
        req.user = payload;
    } catch (error) {
        return next(ApiError.unauthorized("Invalid token"));
    }
    next();
}