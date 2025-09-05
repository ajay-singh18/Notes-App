import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
    fullName:{type:String},
    email: {type:String,unique:true},
    password: {type:String},
    createdOn : {type:Date, default: new Date().getTime()}
})
const userModel = mongoose.model("User",userSchema)
export default userModel