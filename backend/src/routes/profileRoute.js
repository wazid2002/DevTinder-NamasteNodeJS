const express = require("express");
const profileRouter=express.Router();
const userAuth = require("../utils/userAuth")
const {updateValidator, validator} = require("../utils/validator");
const User = require("../models/user");
const bcrypt = require("bcrypt");



//profile route
profileRouter.get("/profile/view",userAuth, (req,res)=>{
    try{
        res.status(200).json(req.user);
    }
    catch(err){
        res.status(500).json({error:"server Error:"+ err});
    }

});

profileRouter.patch("/profile/edit",userAuth,async (req,res)=>{
    try{

        //validator for update fields
        updateValidator(req);
        if(!updateValidator){
            throw new Error("Update not allowed");
        }
        const loggedInUser = req.user;

        Object.keys(req.body).forEach((key)=>(loggedInUser[key]=req.body[key]));

        await loggedInUser.save();

        res.status(200).json({message:`${loggedInUser.firstName},Your Profile is Succesfully Updated`});

    }catch(err){
        res.status(500).json({error:"server Error:"+err});
    }
});

profileRouter.patch("/profile/password",userAuth, async(req,res)=>{
    try{
        const {newPassword}=req.body;
        
        //validation for strong password
        validator(req);

        const secretpass=await bcrypt.hash(newPassword,10);
        const user = req.user;
        user.password=secretpass;
        user.save();
        res.cookie("token",null,{expires:new Date(Date.now())});
        res.send("Password Updated Succesfully,Please Login with the new password")
    }catch (err) {
        res.status(500).json({ error: "Server error: " + err.message });
    }
});



module.exports= profileRouter;