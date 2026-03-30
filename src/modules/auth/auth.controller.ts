import type { Request, Response, NextFunction } from "express";
import asyncHandler from "../../middlewares/asyncHandler.js"
import * as authService from "./auth.service.js"
import type { ITokenPayload } from "./auth.types.js";
import * as authEmail from "./auth.email.js"


export const OAuthGoogle = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const payload : ITokenPayload = req.user as ITokenPayload
    const token = authService.createAcessToken(payload)
    const refreshToken = authService.createRefreshToken(payload)
    await authEmail.sendWelcomeEmail(payload.name, payload.email)
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
    res.status(200).json({token,success:true})
})


export const OAuthFacebook = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const payload : ITokenPayload = req.user as ITokenPayload
    const token = authService.createAcessToken(payload)
    const refreshToken = authService.createRefreshToken(payload)
    await authEmail.sendWelcomeEmail(payload.name, payload.email)
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
    res.status(200).json({token , success:true})
})



export const register = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;
    await authService.register(
        {
            name,
            email,
            password,
        }
    );
    res.status(200).json({success:true})
})


export const login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    let { token, refreshToken , user} = await authService.login(
        {
            email,
            password,
        }
    );
    await authEmail.sendWelcomeEmail(user.name, user.email)
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
    res.status(200).json({ token, success:true })
})

export const refresh = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { refreshToken } = req.body;
    const token = await authService.refresh(refreshToken);
    res.status(200).json({token})
})



export const resetPassword = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    const {name,code} = await authService.resetPassword(email);
    await authEmail.sendResetPasswordEmail(name,email, code);
    res.status(200).json({code})
})



export const verifyResetPasswordCode = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { email, code } = req.body;
    const {user,newCode} = await authService.verifyResetPasswordCode(email, code);
    res.status(200).json({newCode})
})



export const updatePassword = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { email, code, password } = req.body;
    await authService.updatePassword(email, code, password);
    res.status(200).json({success:true})
})



export const createQuestions = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { questions, token } = req.body;
    await authService.createQuestions(questions, token);
    res.status(200).json({success:true})
})
