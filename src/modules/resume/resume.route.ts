import express from "express";
import * as resumeController from "./resume.controller.js";
import { createResumeValidation, updateResumeValidation } from "./resume.validation.js";
import { protectUser } from "../../middlewares/protect.js";
import { checkResumeLimit } from "../../middlewares/planLimits.middleware.js";
import validate from "../../middlewares/validate.js";
import { cvUpload } from "../../config/multer.js";

const router = express.Router();

// All routes require authentication
router.use(protectUser);

// Routes
router.get("/", resumeController.getAllResumes);
router.post(
    "/",
    cvUpload.single("cv"),
    validate(createResumeValidation),
    checkResumeLimit,
    resumeController.createResume
);
router.get("/:resumeId", resumeController.getResumeById);
router.patch("/:resumeId", cvUpload.single("cv"), validate(updateResumeValidation), resumeController.updateResume);
router.delete("/:resumeId", resumeController.deleteResume);

export default router;
