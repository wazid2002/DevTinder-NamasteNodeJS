const express = require("express");
const profileRouter=express.Router();
const userAuth = require("../utils/userAuth")

//profile route
profileRouter.get("/profile/view",userAuth, (req,res)=>{
    try{
        res.status(200).json(req.user);
    }
    catch(err){
        res.status(500).json({error:"server Error:"+ err});
    }

})

module.exports= profileRouter;