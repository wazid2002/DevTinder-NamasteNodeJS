const express=require("express");
const dotenv= require("dotenv");
const User= require("./models/user");
const connectDB = require("./config/db");

dotenv.config();
const app=express();

connectDB();

app.post("/signup",(req,res)=>{
    const user1={
        firstName:"wazid",
        lastName:"munavalli",
        email:"munavalliwazid@gmail.com",
        password:"1245"
    }

    const user = new User (user1);
    user.save();

   res.status(201).json({ message: "User saved to DB" });
})
                
// app.use("/",(req,res)=>{
//     res.send("server Check!")
// })

app.listen(7777,()=>{
    console.log("Server Started on PORT:7777")
})