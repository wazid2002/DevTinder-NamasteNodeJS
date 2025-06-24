const express=require("express");
const dotenv= require("dotenv");
const User= require("./models/user");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/authRoute");
const profileRoute = require("./routes/profileRoute");

dotenv.config();
const app=express();


//middleware
app.use(express.json());
app.use(cookieParser());


//Route
app.use("/",authRoute);
app.use("/",profileRoute);


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

app.patch("/update/:userid",async(req,res)=>{
    const userid= req.params.userid
    const data=req.body;
    try{

        const allowed_update=["gender", "Bio","skills","profilePicURL"]
        const isUpdateAllowed= Object.keys(data).every((k)=>
        allowed_update.includes(k));

        if(!isUpdateAllowed){
            throw new Error("Updates not allowed")
        }

        const updated= await User.findByIdAndUpdate(userid,data,{runValidators:true});
        

        if(!updated){
            res.status(404).json({error:"user not found"})
        }
        res.status(200).json({message:"user updated succesfully"});
    }
    catch(err){
         res.status(500).json({message:"server error:" + err});
  
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
