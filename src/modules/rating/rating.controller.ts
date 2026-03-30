import type { Request, Response } from "express";
import asyncHandler from "../../middlewares/asyncHandler.js";
import * as ratingService from "./rating.service.js";
import type { CreateRatingInput, UpdateRatingInput, RatingTargetType } from "./rating.types.js";

export const rateTarget = asyncHandler(async (req: Request, res: Response) => {
    const input: CreateRatingInput = req.body;
    const rating = await ratingService.createRating(req.user!.userId, input);
    res.status(201).json({ success: true, data: rating });
});

export const updateUserRating = asyncHandler(async (req: Request, res: Response) => {
    const { ratingId } = req.params;
    const input: UpdateRatingInput = req.body;
    const rating = await ratingService.updateRating(req.user!.userId, ratingId as string, input);
    res.status(200).json({ success: true, data: rating });
});

export const deleteUserRating = asyncHandler(async (req: Request, res: Response) => {
    const { ratingId } = req.params;
    const result = await ratingService.deleteRating(req.user!.userId, ratingId as string);
    res.status(200).json({ success: true, data: result });
});

export const getMyRatingForTarget = asyncHandler(async (req: Request, res: Response) => {
    const { targetId, targetType } = req.params;
    const rating = await ratingService.getMyRatingForTarget(
        req.user!.userId,
        targetId as string,
        targetType as RatingTargetType
    );
    res.status(200).json({ success: true, data: rating });
});
