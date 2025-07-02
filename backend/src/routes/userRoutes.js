const express = require("express");
const userAuth = require("../utils/userAuth");
const userRouter=express.Router();
const Connection = require("../models/connections");
const User= require("../models/user")


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
        .populate("fromUserId","firstName lastName gender about age skills profilePicURL")
        .populate("toUserId","firstName lastName gender about age skills profilePicURL");

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

       const loggedInUser = req.user;

       const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit;
        const skip = (page - 1) * limit;
       
       const connectionRequest = await Connection.find({
        $or:[{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
       }).select("fromUserId toUserId");

        const hideUsersFromFeed = new Set();
        connectionRequest.forEach((req) => {
        hideUsersFromFeed.add(req.fromUserId.toString());
        hideUsersFromFeed.add(req.toUserId.toString());
        });

        const users = await User.find({
        $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
        ]})
        .select("firstName lastName gender about age skills profilePicURL")
        .skip(skip)
        .limit(limit);


 
        res.json({ data: users });
        
    }
    catch(err){
        res.status(500).json({error:"Internal Server Error"+err});
    }
});


module.exports=userRouter;