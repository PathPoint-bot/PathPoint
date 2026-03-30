import Course from "./course.model.js";
import ApiError from "../../utils/ApiError.js";
import ApiFeatures from "../../utils/ApiFeatures.js";
import type { CreateCourseInput, UpdateCourseInput } from "./course.types.js";
import type mongoose from "mongoose";

// Create new course
export const createCourse = async (
    input: CreateCourseInput
) => {
    const course = await Course.create(input);
    return course;
};

// Get all courses with filtering, sorting and pagination
export const getAllCourses = async (queryString: any) => {
    const features = new ApiFeatures(Course.find(), queryString)
        .filter()
        .sort()
        .limit()
        .pagination();
    const courses = await features.query;
    return courses;
};

// Get course by ID
export const getCourseById = async (id: string) => {
    const course = await Course.findById(id);
    if (!course) {
        throw ApiError.notFound("Course not found");
    }
    return course;
};

// Update course
export const updateCourse = async (
    id: string,
    input: UpdateCourseInput
) => {
    const course = await Course.findByIdAndUpdate(
        id,
        { $set: input },
        { new: true, runValidators: true }
    );
    if (!course) {
        throw ApiError.notFound("Course not found");
    }
    return course;
};

// Delete course
export const deleteCourse = async (id: string) => {
    const course = await Course.findByIdAndDelete(id);
    if (!course) {
        throw ApiError.notFound("Course not found");
    }
    return { message: "Course deleted successfully" };
};
