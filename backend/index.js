import express from "express"
import cors from "cors"
import jwt from "jsonwebtoken"
import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
import bcrypt from "bcrypt"
import userModel from "./models/userModel.js";
import auth from "./utilities.js";
const secretKey = process.env.JWT_SECRET
const url = process.env.MONGO_URL
try{
    await mongoose.connect(url)
    console.log("Mongo db connected at : " + url);
}catch(e){
    console.log("db not connected: "+ e);
}

const app = express();
app.use(express.json());
app.use(cors());
app.get("/",(req,res)=>{
    res.json({"hii":"hii"})
})
app.post("/create-account",async (req,res)=>{
    const {fullName,email,password} = req.body
    if(!fullName){
        return res.status(401).json({"error":true , "msg":"Full Name is required"})
    }
    if(!email){
       return res.status(401).json({"error":true , "msg":"Email is required"})
    }
    if(!password){
       return res.status(401).json({"error":true , "msg":"Password is required"})
    }
    const isUser = await userModel.findOne({email})
    if(isUser){
        return res.json({error:true,"msg": "User already exist"})
    }
    const hashedPassword= await bcrypt.hash(password,10);
    const user = new userModel({
        fullName,
        email,
        password: hashedPassword
    })
    await user.save()
    const token = jwt.sign({user},secretKey)
    res.json({
        user,
        error:false,
        token,
        "msg": "Registered successfully"
    })
})

app.post("/login",async (req,res)=>{
    const {email,password} = req.body
    if(!email){
        return res.status(400).json({ " msg " : " Email required"})
    }
    if(!password){
        return res.status(400).json({"msg": "Password required"})
    }
    const user = await userModel.findOne({email});
    if(!user){
        return res.status(404).json("user not found")
    }
    const isMatched = await bcrypt.compare(password,user.password)
    if(user.email == email && isMatched){
    const token = jwt.sign({id:user._id},secretKey,{expiresIn:"3600m"});
    return res.json({
        error:false,
        token,
        msg:"Successfully logined",
        email
    })
}
    else{
        return res.json({
            error:true,
            message: "incorrect credentials"
        })
    }
    
})

app.listen(3000);
export default app;