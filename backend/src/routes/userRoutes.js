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

userRouter.get("/user/connections", userAuth , async (req,res)=>{
    try{
        currentUser = req.user;

        const connections = await Connection.find({
            $or:[
                {fromUserId:currentUser._id,status:"accepted"},
                {toUserId:currentUser._id,status:"accepted"}
            ]
        })
        .populate("fromUserId","firstName lastName gender Bio skills profilePicURL")
        .populate("toUserId","firstName lastName gender Bio skills profilePicURL");

        const data = connections.map((row)=>{
             if(currentUser._id.toString() === row.fromUserId._id.toString()){
                return row.toUserId;
             }else{
                return row.fromUserId;
             }
        });
        res.json({data});

    }catch(err){
        res.status(500).json({message:"internal Server error" +err});
    }
});


userRouter.get("/feed",userAuth,async (req,res)=>{
    try{

       const currentUser = req.user; 
       
        
    }
    catch{
        res.status(500).json({error:""})
    }
});


module.exports=userRouter;