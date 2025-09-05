import express from "express"
import cors from "cors"
import jwt from "jsonwebtoken"
import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
import bcrypt from "bcrypt"
import userModel from "./models/userModel.js";
import auth from "./utilities.js";
import noteModel from "./models/noteModel.js";
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
app.use(cors({ origin: "*" }));
app.get("/",(req,res)=>{
    res.json({"hii":"hii"})
})
app.post("/create-account",async (req,res)=>{
    const {fullName,email,password} = req.body
    if(!fullName){
        return res.status(401).json({"error":true , message:"Full Name is required"})
    }
    if(!email){
       return res.status(401).json({"error":true , message:"Email is required"})
    }
    if(!password){
       return res.status(401).json({"error":true , message:"Password is required"})
    }
    const isUser = await userModel.findOne({email})
    if(isUser){
        return res.json({error:true,message: "User already exist"})
    }
    const hashedPassword= await bcrypt.hash(password,10);
    const user = new userModel({
        fullName,
        email,
        password: hashedPassword
    })
    await user.save()
    // const token = jwt.sign({user},secretKey)
    res.json({
        user,
        error:false,
        message: "Registered successfully"
    })
})

app.post("/login",async (req,res)=>{
    const {email,password} = req.body
    if(!email){
        return res.status(400).json({ message : " Email required"})
    }
    if(!password){
        return res.status(400).json({message: "Password required"})
    }
    const user = await userModel.findOne({email});
    if(!user){
        return res.status(404).json({error:true, message: "user not found"})
    }
    const isMatched = await bcrypt.compare(password,user.password)
    if(isMatched){
    const token = jwt.sign({id:user._id},secretKey,{expiresIn:"3600m"});
    return res.json({
        error:false,
        token,
        message:"Successfully logined",
        email
    })
}
    else{
        return res.status(401).json({
            error:true,
            message: "incorrect credentials"
        })
    }
})
// Get user
app.get("/get-user",auth, async (req,res)=>{
    const userId = req.userId
   try{
     const user = await userModel.findOne({_id:userId})
    if(!user){
        return res.status(404).json({
            error : true,
            message: "User not found"
        })
    }
    return res.json({
        fullName: user.fullName,
        email: user.email,
        createdOn: user.createdOn,
        userId : user._id
    })
   }catch(e){
     return res.status(500).json({
        error: true,
        message: "Internal server error"
     })
   }
})
// Add note
app.post("/add-note",auth,async (req,res)=>{
    const {title,content,tags} = req.body
    const userId = req.userId
    if(!title) return res.status(400).json({msg:"title required"})
    if(!content) return res.status(400).json({msg:"content required"})
   try{
     const note = new noteModel({
        title,
        content,
        tags,
        userId: userId
     })
    await note.save();
    res.json({
        error:false,
        msg: "note added successfully"
    })
    }catch(e){
        return res.json({
            error:true,
            message:" Internal server error"
        })
     }
})
// Edit note
app.put("/edit-note/:noteId",auth,async (req,res)=>{
    const noteId = req.params.noteId
    const userId = req.userId
    const {title,content,tags,isPinned} = req.body
    if(!title && !content && !tags){
        return res.status(400).json({
            msg: "not change provided"
        })
    }
    try{
        const note = await noteModel.findOne({_id:noteId , userId})
    if(!note) {

        return res.status(404).json({
            error:true,
            "msg": "not note found"
        })
    }
    if(title) note.title = title
    if(content) note.content = content
    if(tags) note.tags = tags
    if(isPinned) note.isPinned = isPinned
    await note.save();
    return res.json({
        error:false,
        "msg":"Note updated Successfully"
    })
    }catch(e){
        return res.status(500).json({
            error:true,
            message:"internal server error"
        })
    }
})
// Get all notes
app.get("/get-all-notes",auth, async (req,res)=>{
    const userId = req.userId
    try{
        const notes = await noteModel.find({userId}).sort({isPinned:-1})
        return res.json({
            error:false,
            notes,
            "msg":"All notes retrieved seccessfully"
        })
    }catch(e){
        return res.status(500).json({
            error: true,
            message: "Internal server error"
        })
    }
})
// Delete note
app.delete("/delete-note/:noteId",auth,async (req,res)=>{
    const noteId = req.params.noteId
    const userId = req.userId
    try{
         const note = await noteModel.findOne({_id:noteId,userId})
         if(!note){
            return res.status(404).json({
                error:true,
                "msg":"Note not found"
            })
         }
         await noteModel.deleteOne({_id:noteId, userId})
         return res.json({
            error: true,
            "msg": "Note deleted successfully"
         })
        
    }catch(e){
        return res.status(500).json({
            error: true,
            message: "Internal server error"
        })
    }
})
// IsPinned

app.put("/update-note-pinned/:noteId",auth, async (req,res)=>{
    const userId = req.userId
    const isPinned = req.body.isPinned
    const noteId = req.params.noteId
    try{
        const note = await noteModel.findOne({ _id : noteId,userId})
        if(!note){
        return res.status(400).json({
            error: true,
            message: "Note not found"
        })}
        note.isPinned = isPinned ;
        await note.save()
        return res.json({
            error: false,
            note,
            message: "Note updated successfully"
        })
    
    }catch(e){
        return res.status(500).json({
            error: true,
            message: "Internal server error"
        })
    }
})

app.listen(3000);
export default app;