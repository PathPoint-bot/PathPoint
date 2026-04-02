import express from "express";
import * as hrController from "./hr.contoller.js";
import { updateHRRequestValidation } from "./hr.validation.js";
import { protectUser, protectHr , protectAdmin } from "../../middlewares/protect.js"
import validate from "../../middlewares/validate.js"
const router = express.Router();

// Protect all routes
router.use(protectUser)
router.get("/all", hrController.getAllHrs)
router.get("/", hrController.getHRRequest)
router.post("/", hrController.createHRRequest)
router.delete("/", hrController.deleteHRRequest)

router.use(protectHr)
router.get("/bookings", hrController.getHrBookings)
// Admin routes
router.use(protectAdmin)

router.put("/:id", validate(updateHRRequestValidation), hrController.updateHRRequest)
router.get("/allRequest", hrController.getAllHrRequests)

export default router;