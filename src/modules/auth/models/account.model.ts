import mongoose , {Schema} from "mongoose";












const accountSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    provider:{
        type: String,
        required:true
    },
    providerId:{
        type: String,
        required:true,
        unique:true
    }
})

accountSchema.index({ provider: 1, providerId: 1 }, { unique: true });
const Account = mongoose.model("Account", accountSchema);
export default Account;
