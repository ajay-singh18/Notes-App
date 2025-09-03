import express from "express"
import cors from "cors"
import jwt from "jsonwebtoken"


const app = express();
app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.json({"hii":"hello"})
})
app.listen(3000)
module.exports = app