import type { Request, Response, NextFunction } from "express";
import ApiError from "../utils/ApiError.js";
import { USER_ERRORS } from "../constants/errors.js";
import { USER } from "../constants/user.js";







// Check if user is authenticated
export const protectUser = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.user)
    if (!req.user) {
        return next(ApiError.unauthorized(USER_ERRORS.UNAUTHORIZED));
    }
    next();
}




// Check if user is HR or Admin
export const protectHr = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
        return next(ApiError.unauthorized(USER_ERRORS.UNAUTHORIZED));
    }
    if (req.user.role !== USER.ROLES.HR && req.user.role !== USER.ROLES.ADMIN) {
        return next(ApiError.unauthorized(USER_ERRORS.UNAUTHORIZED));
    }
    next();
}





// Check if user is Admin
export const protectAdmin = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
        return next(ApiError.unauthorized(USER_ERRORS.UNAUTHORIZED));
    }
    if (req.user.role !== USER.ROLES.ADMIN) {
        return next(ApiError.unauthorized(USER_ERRORS.UNAUTHORIZED));
    }
    next();
}