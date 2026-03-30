import User from "./models/user.model.js";
import Account from "./models/account.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {accessTokenConfig , refreshTokenConfig} from "../../config/jwt.js";
import type { ITokenPayload , IUser , RegisterInput , LoginInput } from "./auth.types.js";
import {env} from "../../config/env.js";
import ApiError from "../../utils/ApiError.js";
import crypto from "crypto";
import ForgetPassword from "./models/forgetPassword.model.js";
import { USER, TIME, AUTH, USER_ERRORS, AUTH_ERRORS } from "../../constants/index.js";
import { createProfile } from "../profile/profile.service.js";
import {updateProfileHR} from "../profile/profile.service.js"
import Questions from "./models/questions.model.js"
// Validate and sanitize user name
const checkName = (name : string) => {
    if (name.length < USER.NAME.MIN_LENGTH) {
        for(let i = 0 ; i < (USER.NAME.MIN_LENGTH - name.length) ; i++) {
            name += `${i}`
        }
    } else if(name.length > USER.NAME.MAX_LENGTH) {
        name = name.slice(0, USER.NAME.MAX_LENGTH)
    }
    return name
}

// Check if user exists by email
export const checkEmail = async (email : string) => {
    const user = await User.findOne({email}).select("+password") // because password is hidden by default
    return user
}

// Create new user with password
export async function createUser(name : string, email : string, password : string) {
    name = checkName(name)
    const user = await User.create({name, email, password})
    await createProfile(user._id.toString(), USER.ROLES.USER);
    return user
}

// Create new user without password (for OAuth)
export async function createOAuthUser(name : string, email : string) {
    name = checkName(name)
    const securePassword = crypto.randomBytes(16).toString("hex");
    const user = await User.create({name, email, password: securePassword})
    await createProfile(user._id.toString(), USER.ROLES.USER);
    return user
}

// Create or link OAuth account
export const createAccount = async(providerId : string , provider : string , email : string , name : string) : Promise<IUser> => {
    let account = await Account.findOne({providerId, provider})
    if (!account) {
        let user = await checkEmail(email);
        if (!user) {
         user = await createOAuthUser(name, email);
        }
        await Account.create({ providerId, provider, userId: user._id });
        return user;
    }

    const user = await User.findById(account.userId);

    if (!user) {
        throw new Error('User not found');
    }
    return user;
    };


// Generate JWT Refresh Token (long-lived - 1 Hour)
export function createAcessToken(payload : ITokenPayload) {
    return jwt.sign(payload, accessTokenConfig.secret, {expiresIn: accessTokenConfig.expiresIn})
}

// Generate JWT Refresh Token (long-lived - 7 days)
export function createRefreshToken(payload : ITokenPayload) {
    return jwt.sign(payload, refreshTokenConfig.secret, {expiresIn: refreshTokenConfig.expiresIn})
}


async function hashPassword(password : string) {
    return await bcrypt.hash(password, env.bcrypt.saltRounds)
}


// Register new user
export const register = async (data : RegisterInput) => {
    const { name, email, password } = data;
    

    // check if email exists
    const user = await checkEmail(email);
    if (user) {
        throw ApiError.conflict(USER_ERRORS.EMAIL_EXISTS);
    }

    // hash password
    const hashedPassword = await hashPassword(password);


    const newUser = await createUser(name, email, hashedPassword);
    return newUser;
}



export const login = async(data : LoginInput) => {
    const { email, password } = data;
    
    // check if email exists
    const user = await checkEmail(email);
    if (!user) {
        throw ApiError.notFound(USER_ERRORS.NOT_FOUND);
    }
    
    // check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        throw ApiError.unauthorized(USER_ERRORS.INVALID_PASSWORD);
    }
    
    // generate tokens
    const payload : ITokenPayload = {
        userId: user._id.toString(),
        role: user.role,
        name: user.name,
        email: user.email
    };
    
    const token = createAcessToken(payload);
    const refreshToken = createRefreshToken(payload);
    
    return { token, refreshToken ,user};
}



export const refresh = async (refreshToken : string): Promise<string> => {
    try {
        const payload = jwt.verify(refreshToken, refreshTokenConfig.secret) as ITokenPayload;
        const token = createAcessToken(payload);
        return token;
    } catch (error) {
        throw ApiError.unauthorized("Invalid refresh token");
    }
}

 // check if email exists and generate 5-digit code
export const resetPassword = async (email : string) => {
    // check if email exists
    const user = await checkEmail(email);
    if (!user) {
        throw ApiError.notFound(USER_ERRORS.NOT_FOUND);
    }
    
    // generate 5-digit code
    const code = Math.floor(10000 + Math.random() * 90000).toString();
    
    // delete old reset password token
    let forgetPassword = await ForgetPassword.findOne({userId:user._id});
    if (forgetPassword) {
        await forgetPassword.deleteOne();
    }

    // set reset password token and expire
    forgetPassword = await ForgetPassword.create({
        userId:user._id,
        resetPasswordToken : code,
        resetPasswordExpire : Date.now() + TIME.FIFTEEN_MINUTES
    });
    if (!forgetPassword) {
        throw ApiError.serverError("Failed to create reset password token");
    }
    return {name:user.name,code};
}


export const verifyResetPasswordCode = async (email : string, code : string) => {
    // check if email exists
    const user = await checkEmail(email);
    if (!user) {
        throw ApiError.notFound(USER_ERRORS.NOT_FOUND);
    }
    let forgetPassword = await ForgetPassword.findOne({userId:user._id});
    if (!forgetPassword) {
        throw ApiError.notFound("Reset password token not found");
    }
    // check if code is correct
    console.log(forgetPassword.resetPasswordToken , "," , code)
    if (forgetPassword.resetPasswordToken !== code) {
        throw ApiError.unauthorized(AUTH_ERRORS.INVALID_CODE);
    }
    // check if code is expired
    if (!forgetPassword.resetPasswordExpire || forgetPassword.resetPasswordExpire < new Date()) {
        throw ApiError.unauthorized("Code expired");
    }
    // 6 digit code
    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    forgetPassword.verifyResetToken = newCode;
    forgetPassword.verifyResetExpire = new Date(Date.now() + TIME.FIVE_MINUTES);
    await forgetPassword.save();
    return {user, newCode};
}



export const updatePassword = async (email : string, code : string, password : string) => {
    // check if email exists
    const user = await checkEmail(email);
    if (!user) {
        throw ApiError.notFound(USER_ERRORS.NOT_FOUND);
    }
    let forgetPassword = await ForgetPassword.findOne({userId:user._id});
    if (!forgetPassword) {
        throw ApiError.notFound("Reset password token not found");
    }
    // check if code is correct
    if (forgetPassword.verifyResetToken !== code) {
        throw ApiError.unauthorized("Invalid code");
    }
    // check if code is expired
    if (!forgetPassword.verifyResetExpire || forgetPassword.verifyResetExpire < new Date()) {
        throw ApiError.unauthorized(AUTH_ERRORS.CODE_EXPIRED);
    }
    let hashedPassword = await hashPassword(password);
    // update password
    user.password = hashedPassword;
    await user.save();
    await forgetPassword.deleteOne();
    return {user};
}   



export const updateUserHR = async (userId: string) => {
    const user = await User.findById(userId);
    if (!user) {
        throw ApiError.notFound(USER_ERRORS.NOT_FOUND);
    }
    user.role = "hr";
    await user.save();
    await updateProfileHR(user._id.toString());
    return {user};
}


export const createQuestions = async (questions: any  , token : string) => {
    let tokenData: ITokenPayload;
    try {
    tokenData = jwt.verify(token, process.env.JWT_SECRET as string) as ITokenPayload;
    } catch (error) {
        throw ApiError.unauthorized("Invalid token");
    }
    let user = await User.findById(tokenData.userId);
    if (!user) {
        throw ApiError.notFound(USER_ERRORS.NOT_FOUND);
    }
    else if (user.status !== "pending") {
        throw ApiError.badRequest("Profile already completed");
    }
    const question = await Questions.create({ userId: tokenData.userId, questions });
    if (!question) {
        throw ApiError.serverError("Failed to complete questions");
    }
    user.status = "completed";
    await user.save();
    return {user};
}



