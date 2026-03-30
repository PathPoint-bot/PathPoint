import express from "express";
import * as ratingController from "./rating.controller.js";
import { protectUser } from "../../middlewares/protect.js";
import validate from "../../middlewares/validate.js";
import { createRatingValidation, updateRatingValidation } from "./rating.validation.js";

const router = express.Router();

// Protected routes - require authentication
router.use(protectUser);

// Create new rating
router.post("/", validate(createRatingValidation), ratingController.rateTarget);

// Update user's own rating
router.put("/:ratingId", validate(updateRatingValidation), ratingController.updateUserRating);

// Delete user's own rating
router.delete("/:ratingId", ratingController.deleteUserRating);

// Get user's rating for a specific target
router.get("/my-rating/:targetType/:targetId", ratingController.getMyRatingForTarget);

export default router;
