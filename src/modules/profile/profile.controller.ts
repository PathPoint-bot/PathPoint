import type { Request, Response } from "express";
import asyncHandler from "../../middlewares/asyncHandler.js";
import * as profileService from "./profile.service.js";

export const updateMyUserProfile = asyncHandler(async (req: Request, res: Response) => {
    const avatarFile = req.file;
    const profile = await profileService.updateUserProfile(req.user!.userId, req.body, avatarFile);
    res.status(200).json({ success: true, data: profile });
});

export const updateMyHRProfile = asyncHandler(async (req: Request, res: Response) => {
    const avatarFile = req.files && (req.files as { [fieldname: string]: Express.Multer.File[] })['avatar']?.[0];
    const resumeFile = req.files && (req.files as { [fieldname: string]: Express.Multer.File[] })['resume']?.[0];
    const profile = await profileService.updateHRProfile(req.user!.userId, req.body, avatarFile, resumeFile);
    res.status(200).json({ success: true, data: profile });
});

export const getProfileByUserId = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.params.userId as string;
    const profile = await profileService.getProfileByUserId(userId, req.user!.userId);
    res.status(200).json({ success: true, data: profile });
});

