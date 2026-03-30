import mongoose, { Schema } from "mongoose";
import validator from "validator";
import type { IUser } from "../auth.types.js";
import { USER, VALIDATION_ERRORS } from "../../../constants/index.js";



const userSchema = new Schema<IUser>({
    name:{
        type: String,
        required:true,
        trim:true,
        minlength:[USER.NAME.MIN_LENGTH, VALIDATION_ERRORS.NAME_MIN],
        maxlength:[USER.NAME.MAX_LENGTH, VALIDATION_ERRORS.NAME_MAX]
    },
    email:{
        type: String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
        validate:{
            validator:(v:string) => validator.isEmail(v),
            message: VALIDATION_ERRORS.EMAIL_INVALID
        }
    },
    password:{
        type: String,
        required:true,
        trim:true,
        select:false
    },
    role:{
        type: String,
        enum:[USER.ROLES.USER, USER.ROLES.HR, USER.ROLES.ADMIN],
        default:USER.ROLES.USER
    },


})

const User = mongoose.model<IUser>("User", userSchema);
export default User;