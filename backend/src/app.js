const express=require("express");
const dotenv= require("dotenv");
const bcrypt= require("bcrypt");
const User= require("./models/user");
const connectDB = require("./config/db");
const validator = require("./utils/validator");
const cookieParser = require("cookie-parser");
const jwt=require("jsonwebtoken");

dotenv.config();
const app=express();

//middleware
app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req,res)=>{
    try{

        const {firstName, lastName,email,password} = req.body;

        //custom validator(api level)
        validator(req);

        const secretpass= await bcrypt.hash(password,10);

        const user = new User (
            {
                firstName,
                lastName,
                email,
                password:secretpass
            }
        );
        await user.save();

        res.status(201).json({ message: "User saved to DB" });
    }
    catch(err){
        res.status(500).json({error:"failed to save user:" + err})
    }
    
});

app.post("/login", async(req,res)=>{
    try{

        const {email, password} = req.body;
        const user= await User.findOne({email:email});
        if(!user){
            return res.status(400).json({message:"Invalid Credentials"})
        }

        const auth= await bcrypt.compare(password,user.password);
        if(!auth){
            return res.status(400).json({message:"Invalid Credentials"})
        }

        //create a jwt token
        const gentoken=jwt.sign({_id:user._id},"Wazid1234")

        //add tokaen to cookie and send to client

        res.cookie("token",gentoken);

        res.status(200).send("Login Successful!")
    }
    catch(err){
        res.status(500).json({message:"Internal server Error"+ err})
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

//profile route
app.get("/profile",async (req,res)=>{
    try{
        const token= req.cookies?.token;
        if(!token){
            return res.status(401).json({ error: "Token missing" })
        }
        const decode=await jwt.verify(token,"Wazid1234")
        if(!decode){
            return res.status(401).json({ error: "Token missing" })
        }
        const userdata = await User.findById(decode);
        if(!userdata){
            return res.status(401).json({ error: "Token missing" })
        }
        res.status(200).send(userdata);
    }
    catch(err){
        res.status(500).json({error:"server Error:"+ err});
    }

})

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
// app.use("/",(req,res)=>{
//     res.send("server Check!")
// })

