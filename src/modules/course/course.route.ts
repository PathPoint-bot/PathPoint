import express from "express";
import * as courseController from "./course.controller.js";
import validate from "../../middlewares/validate.js";
import { createCourseValidation, updateCourseValidation } from "./course.validation.js";
import { protectAdmin } from "../../middlewares/protect.js";

const router = express.Router();




// Public routes
router.get("/", courseController.getAllCourses);
router.get("/:id", courseController.getCourseById);


// Protected routes (admin only)
router.use(protectAdmin);

router.post("/", validate(createCourseValidation), courseController.createCourse);
router.put("/:id", validate(updateCourseValidation), courseController.updateCourse);
router.delete("/:id", courseController.deleteCourse);

export default router;
