import mongoose  , {Schema} from "mongoose";
import type {IResetPassword} from "../auth.types.js"









const forgetPasswordSchema = new Schema<IResetPassword> ({
    userId:{
        type:mongoose.Types.ObjectId,
        required:true,
    } ,
    resetPasswordToken: {
        type : String,
        unique:true
    },
    resetPasswordExpire: Date,
    verifyResetToken: String,
    verifyResetExpire:Date
} , {
    timestamps:true
})


forgetPasswordSchema.index({ resetPasswordExpire: 1 }, { expireAfterSeconds: 0 })
forgetPasswordSchema.index({ verifyResetExpire: 1 }, { expireAfterSeconds: 0 })
const ForgetPassword = mongoose.model<IResetPassword>("forgetPassword" , forgetPasswordSchema)

export default ForgetPassword


