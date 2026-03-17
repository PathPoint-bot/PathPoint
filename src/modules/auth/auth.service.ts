import User from "./models/user.model.js";
import Account from "./models/account.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {accessTokenConfig , refreshTokenConfig} from "../../config/jwt.js";
import type { ITokenPayload , IUser , RegisterInput , LoginInput } from "./auth.types.js";
import {env} from "../../config/env.js";
import ApiError from "../../utils/ApiError.js";
import ForgetPassword from "./models/forgetPassword.model.js";
// Validate and sanitize user name
const checkName = (name : string) => {
    if (name.length < 3) {
        for(let i = 0 ; i < (3 - name.length) ; i++) {
            name += `${i}`
        }
    } else if(name.length > 25) {
        name = name.slice(0,25)
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
    return user
}

// Create or link OAuth account
export const createAccount = async(providerId : string , provider : string , email : string , name : string) : Promise<IUser | null> => {
    let account = await Account.findOne({providerId, provider})
    let user : IUser | null = null
    if (!account) {
        user = await checkEmail(email)
        // if user not found, create new user
        if (!user) {
            user = await createUser(name, email, "")
        }
        await Account.create({providerId, provider , userId: user._id})
    }
    return user
}
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
        throw ApiError.conflict("Email already exists");
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
        throw ApiError.notFound("User not found");
    }
    
    // check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        throw ApiError.unauthorized("Invalid password");
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
        throw ApiError.notFound("User not found");
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
        resetPasswordExpire : Date.now() + 15 * 60 * 1000 // 15 minutes
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
        throw ApiError.notFound("User not found");
    }
    let forgetPassword = await ForgetPassword.findOne({userId:user._id});
    if (!forgetPassword) {
        throw ApiError.notFound("Reset password token not found");
    }
    // check if code is correct
    console.log(forgetPassword.resetPasswordToken , "," , code)
    if (forgetPassword.resetPasswordToken !== code) {
        throw ApiError.unauthorized("Invalid code");
    }
    // check if code is expired
    if (!forgetPassword.resetPasswordExpire || forgetPassword.resetPasswordExpire < new Date()) {
        throw ApiError.unauthorized("Code expired");
    }
    // 6 digit code
    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    forgetPassword.verifyResetToken = newCode;
    forgetPassword.verifyResetExpire = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
    await forgetPassword.save();
    return {user, newCode};
}



export const updatePassword = async (email : string, code : string, password : string) => {
    // check if email exists
    const user = await checkEmail(email);
    if (!user) {
        throw ApiError.notFound("User not found");
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
        throw ApiError.unauthorized("Code expired");
    }
    let hashedPassword = await hashPassword(password);
    // update password
    user.password = hashedPassword;
    await user.save();
    await forgetPassword.deleteOne();
    return {user};
}   