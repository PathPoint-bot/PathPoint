import mongoose, { Schema } from "mongoose";
import validator from "validator";
import type { IUser } from "../auth.types.js";




const userSchema = new Schema<IUser>({
    name:{
        type: String,
        required:true,
        trim:true,
        minlength:[3,"Name must be at least 3 characters"],
        maxlength:[25,"Name must be at most 25 characters"]
    },
    email:{
        type: String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
        validate:{
            validator:(v:string) => validator.isEmail(v),
            message:"Please enter a valid email"
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
        enum:["user","admin"],
        default:"user"
    },

    
})

const User = mongoose.model<IUser>("User", userSchema);
export default User;