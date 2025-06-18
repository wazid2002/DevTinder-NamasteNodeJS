const express=require("express");
const dotenv= require("dotenv");
const User= require("./models/user");
const connectDB = require("./config/db");

dotenv.config();
const app=express();



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
      
connectDB()
    .then(()=>{
        console.log("Database connection Established");
        app.listen(7777,()=>{
        console.log("Server Started on PORT:7777")
        })
    })
    .catch((err)=>{
        console.log("Error occured in connecting databse")
    });
// app.use("/",(req,res)=>{
//     res.send("server Check!")
// })

