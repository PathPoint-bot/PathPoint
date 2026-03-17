import express from "express";
import passport from "./strategies/passport.strategy.js";
import { OAuthGoogle, OAuthFacebook, refresh, login, register, resetPassword, verifyResetPasswordCode, updatePassword } from "./auth.controller.js";
import { createUserValidation, loginValidation, refreshValidation, resetPassword as resetPasswordValidation, verifyResetPasswordCode as verifyResetPasswordCodeValidation, updatePassword as updatePasswordValidation } from "./auth.validation.js"
import validate from "../../middlewares/validate.js"

const router = express.Router();

// OAuth login endpoints to start the flow
router.get("/google", passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false
}));

router.get("/facebook", passport.authenticate("facebook", {
    scope: ["email"],
    session: false
}));

// OAuth callback endpoints
router.get("/google/callback", passport.authenticate("google", { 
    session: false,
    failureRedirect: "/login" 
}), OAuthGoogle);

router.get("/facebook/callback", passport.authenticate("facebook", { 
    session: false,
    failureRedirect: "/login" 
}), OAuthFacebook);

// Routes
router.post("/register", validate(createUserValidation), register);
router.post("/login", validate(loginValidation), login);
router.post("/refresh", validate(refreshValidation), refresh);
router.post("/reset-password", validate(resetPasswordValidation), resetPassword);
router.post("/verify-reset-password-code", validate(verifyResetPasswordCodeValidation), verifyResetPasswordCode);
router.post("/update-password", validate(updatePasswordValidation), updatePassword);

export default router;
