const express=require("express");


const app=express();

app.use("/",(req,res)=>{
    res.send("server Check!")
})

app.listen(7777,()=>{
    console.log("Server Started on PORT:7777")
})