import type { Request, Response, NextFunction } from "express";
import * as courseService from "./course.service.js";
import type { CreateCourseInput, UpdateCourseInput } from "./course.types.js";

// Create new course
export const createCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const input: CreateCourseInput = req.body;
        const course = await courseService.createCourse(input);
        res.status(201).json({ success: true, data: course });
    } catch (error) {
        next(error);
    }
};

// Get all courses
export const getAllCourses = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const courses = await courseService.getAllCourses(req.query);
        res.status(200).json({ success: true, data: courses });
    } catch (error) {
        next(error);
    }
};

// Get course by ID
export const getCourseById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const course = await courseService.getCourseById(id as string);
        res.status(200).json({ success: true, data: course });
    } catch (error) {
        next(error);
    }
};

// Update course
export const updateCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const input: UpdateCourseInput = req.body;
        const course = await courseService.updateCourse(id as string, input);
        res.status(200).json({ success: true, data: course });
    } catch (error) {
        next(error);
    }
};

// Delete course
export const deleteCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const result = await courseService.deleteCourse(id as string);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        next(error);
    }
};
