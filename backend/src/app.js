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

//get all the users

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

//get one user

app.get("/user",async(req,res)=>{
    const userEmail=req.body.email;
    console.log(userEmail);

    try{
        const user = await User.findOne({email:userEmail});
        if(!user){
            return res.status(404).json({message:"user not found"});
        };

        res.json({user});

    }
    catch{
        res.status(500).json({message:"server error"});
    }
});

app.patch("/update",async(req,res)=>{
    const useremail= req.body.email;
    const data=req.body;

    console.log(useremail);
    console.log(data);

    try{
        const updated= await User.updateOne({email:useremail},{$set:data});
        

        if(!updated){
            res.status(404).json({error:"user not found"})
        }
        res.status(200).json({message:"user updated succesfully"});
    }
    catch{
         res.status(500).json({message:"server error"});
  
    }
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

