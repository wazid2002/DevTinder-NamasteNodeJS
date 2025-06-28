const express = require("express");
const authRoute = express.Router();
const User = require("../models/user");
const {validator} = require("../utils/validator");
const bcrypt = require("bcrypt")


authRoute.post("/signup", async (req,res)=>{
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

authRoute.post("/login", async(req,res)=>{
    try{

        const {email, password} = req.body;
        const user= await User.findOne({email:email});
        if(!user){
            return res.status(400).json({message:"Invalid Credentials"})
        }

        const auth= await user.validatePassword(password);
        if(!auth){
            return res.status(400).json({message:"Invalid Credentials"})
        }

        //create a jwt token
        const gentoken=await user.getjwt();

        //add tokaen to cookie and send to client

        res.cookie("token", gentoken, {
            httpOnly: true,         // Protect from client-side JS access
            secure: false,          // Set to true if using HTTPS
            sameSite: "lax",        // or "none" if secure: true
            maxAge: 2 * 60 * 60 * 1000 // 2 hours
        });

        res.status(200).send(user);
    }
    catch(err){
        res.status(500).json({message:"Internal server Error"+ err})
    }

});

authRoute.post("/logout",(req,res)=>{
    res.cookie("token",null,{expires: new Date(Date.now())});
    res.send("Logged Out Succesfully!")
});

module.exports=authRoute;