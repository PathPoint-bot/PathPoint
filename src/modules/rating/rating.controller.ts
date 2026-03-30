import type { Request, Response, NextFunction } from "express";
import * as ratingService from "./rating.service.js";
import type { CreateRatingInput, UpdateRatingInput, RatingTargetType } from "./rating.types.js";

export const rateTarget = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const input: CreateRatingInput = req.body;
        const rating = await ratingService.createRating(req.user!.userId, input);
        res.status(201).json({ success: true, data: rating });
    } catch (error) {
        next(error);
    }
};

export const updateUserRating = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { ratingId } = req.params;
        const input: UpdateRatingInput = req.body;
        const rating = await ratingService.updateRating(req.user!.userId, ratingId as string, input);
        res.status(200).json({ success: true, data: rating });
    } catch (error) {
        next(error);
    }
};

export const deleteUserRating = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { ratingId } = req.params;
        const result = await ratingService.deleteRating(req.user!.userId, ratingId as string);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        next(error);
    }
};

export const getMyRatingForTarget = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { targetId, targetType } = req.params;
        const rating = await ratingService.getMyRatingForTarget(
            req.user!.userId,
            targetId as string,
            targetType as RatingTargetType
        );
        res.status(200).json({ success: true, data: rating });
    } catch (error) {
        next(error);
    }
};
