const express=require("express");
const dotenv= require("dotenv");
const User= require("./models/user");
const connectDB = require("./config/db");

dotenv.config();
const app=express();

//middleware
app.use(express.json());



app.post("/signup", async (req,res)=>{

    try{
        const user1 = req.body;
        const user = new User (user1);
        await user.save();

        res.status(201).json({ message: "User saved to DB" });
    }
    catch(err){
        res.status(500).json({error:"failed to save user"})
    }
    
});

app.get("/feed",async (req,res)=>{
    try{
        const users= await User.find({});
        
        if(users.length === 0){
            return res.status(404).json({error:"Users not found"})
        }
        res.send(users);
    }
    catch{
        res.status(500).json({error:"failed to load users"})
    }
});
      
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

