const express = require("express");
const userAuth = require("../utils/userAuth");
const userRouter=express.Router();
const Connection = require("../models/connections");


userRouter.get("/user/requests/recieved",userAuth, async(req,res)=>{
    try{
        currentUser=req.user._id;

        const requests = await Connection.find({
            toUserId:currentUser,
            status:"interested"
        }).populate("fromUserId","firstName lastName gender Bio skills profilePicURL");

        if(requests.length===0){
            return res.status(200).json({message:"No connection requests!"})
        }

        res.status(200).json({messaage:"Data fetched Succesfully",data:requests });

    }catch(err){
        res.status(500).json({message:"Internal Server Error"+ err});
    }
});

module.exports=userRouter;