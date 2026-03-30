import express from "express";
import * as profileController from "./profile.controller.js";
import {
    updateUserProfileValidation,
    updateHRProfileValidation,
} from "./profile.validation.js";
import { protectHr, protectUser } from "../../middlewares/protect.js";
import validate from "../../middlewares/validate.js";
import upload from "../../config/multer.js";

const router = express.Router();

// Public routes
router.get("/:userId", profileController.getProfileByUserId);

// Protect all routes
router.use(protectUser);

// Update Profile Routes with file upload
router.put("/user", upload.single("avatar"), validate(updateUserProfileValidation), profileController.updateMyUserProfile);

router.use(protectHr);

router.put("/hr", upload.fields([{ name: "avatar", maxCount: 1 }, { name: "resume", maxCount: 1 }]), validate(updateHRProfileValidation), profileController.updateMyHRProfile);

export default router;
