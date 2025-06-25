const express = require("express");
const requestrouter= express.Router();
const userAuth = require("../utils/userAuth");
const ConnectionRequest= require("../models/connections")


requestrouter.post("/request/send/:status/:toUserId",userAuth,async (req,res)=>{
    try{
        const fromUserId= req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

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