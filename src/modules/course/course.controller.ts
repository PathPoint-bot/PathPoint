import type { Request, Response } from "express";
import asyncHandler from "../../middlewares/asyncHandler.js";
import * as courseService from "./course.service.js";
import type { CreateCourseInput, UpdateCourseInput } from "./course.types.js";

// Create new course
export const createCourse = asyncHandler(async (req: Request, res: Response) => {
    const input: CreateCourseInput = req.body;
    const course = await courseService.createCourse(input);
    res.status(201).json({ success: true, data: course });
});

// Get all courses
export const getAllCourses = asyncHandler(async (req: Request, res: Response) => {
    const courses = await courseService.getAllCourses(req.query);
    res.status(200).json({ success: true, data: courses });
});

// Get course by ID
export const getCourseById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const course = await courseService.getCourseById(id as string);
    res.status(200).json({ success: true, data: course });
});

// Update course
export const updateCourse = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const input: UpdateCourseInput = req.body;
    const course = await courseService.updateCourse(id as string, input);
    res.status(200).json({ success: true, data: course });
});

// Delete course
export const deleteCourse = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await courseService.deleteCourse(id as string);
    res.status(200).json({ success: true, data: result });
});
