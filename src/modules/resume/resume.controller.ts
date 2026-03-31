import type { Request, Response } from "express";
import asyncHandler from "../../middlewares/asyncHandler.js";
import * as resumeService from "./resume.service.js";

export const createResume = asyncHandler(async (req: Request, res: Response) => {
    const file = req.file;
    if (!file) {
        return res.status(400).json({ success: false, message: "Please upload a CV file" });
    }

    const resume = await resumeService.createResume(req.user!.userId, file, req.body.title);
    res.status(201).json({ success: true, data: resume });
});

export const getAllResumes = asyncHandler(async (req: Request, res: Response) => {
    const resumes = await resumeService.getAllResumes(req.user!.userId, req.query);
    res.status(200).json({ success: true, data: resumes });
});

export const getResumeById = asyncHandler(async (req: Request, res: Response) => {
    const { resumeId } = req.params;
    const resume = await resumeService.getResumeById(req.user!.userId, resumeId as string);
    res.status(200).json({ success: true, data: resume });
});

export const updateResume = asyncHandler(async (req: Request, res: Response) => {
    const { resumeId } = req.params;
    const file = req.file;

    const resume = await resumeService.updateResume(
        req.user!.userId,
        resumeId as string,
        { title: req.body.title },
        file
    );
    res.status(200).json({ success: true, data: resume });
});

export const deleteResume = asyncHandler(async (req: Request, res: Response) => {
    const { resumeId } = req.params;
    const result = await resumeService.deleteResume(req.user!.userId, resumeId as string);
    res.status(200).json({ success: true, data: result });
});
