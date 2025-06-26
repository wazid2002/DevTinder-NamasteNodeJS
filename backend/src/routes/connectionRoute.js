const express = require("express");
const requestrouter= express.Router();
const userAuth = require("../utils/userAuth");
const ConnectionRequest= require("../models/connections")
const User= require("../models/user");


requestrouter.post("/request/send/:status/:toUserId",userAuth,async (req,res)=>{
    try{
        const fromUserId= req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

         const allowedStatus=["interested","ignored"]
            
            if(!allowedStatus.includes(status)){
                return res.status(400).json({message:"Status not allowed"});
            }

            const existingConnectionRequest = await ConnectionRequest.findOne({
                $or:[
                        {fromUserId,toUserId},
                        {fromUserId:toUserId,toUserId:fromUserId}
                    ]
            });
            if(existingConnectionRequest){
                return res.status(400).json({message:"Connection Already Exists"});
            }

            const toUser = await User.findOne({_id:toUserId});
            if(!toUser){
                return res.status(404).json({message:"User does not exists"});
            }

        const connection= new ConnectionRequest({
            fromUserId,
            toUserId,
            status

        });
        
        const data= await connection.save()

        res.status(200).json({message:"Connection Request Sent"});


    }
    catch(err){
        res.status(500).json({message:"Server Error" +err});
    }
});

module.exports= requestrouter;