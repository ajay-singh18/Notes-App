import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
const secretKey = process.env.JWT_SECRET   
const auth = (req,res,next)=>{
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]
    if(!token) return res.status(401)
    const decoded = jwt.verify(token,secretKey)
    if(!decoded) return res.status(401)
    req.userId = decoded.id
    next();
}   
export default auth;