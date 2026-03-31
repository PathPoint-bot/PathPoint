import type { Request, Response, NextFunction } from "express";
import ApiError from "../utils/ApiError.js";
import * as resumeService from "../modules/resume/resume.service.js";
import User from "../modules/auth/models/user.model.js";
import { PLAN_LIMITS } from "../constants/upload.js";

export const checkResumeLimit = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findById(req.user!.userId);
        if (!user) {
            return next(ApiError.notFound("User not found"));
        }

        const userPlan = user.plan || "free";
        const limit = PLAN_LIMITS.RESUMES[userPlan.toUpperCase() as keyof typeof PLAN_LIMITS.RESUMES];
        const currentCount = await resumeService.countUserResumes(req.user!.userId, { last24Hours: true });

        if (currentCount >= limit) {
            return next(ApiError.forbidden(
                `Your ${userPlan} plan allows only ${limit} CV(s) daily. Please upgrade your plan to upload more.`
            ));
        }

        next();
    } catch (error) {
        next(error);
    }
};
