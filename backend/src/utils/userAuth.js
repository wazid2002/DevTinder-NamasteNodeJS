const jwt = require("jsonwebtoken");
const User = require("../models/user")

const userAuth = async (req,res,next)=>{
    try{
        const token = req.cookies?.token;
        if(!token){
            res.status(401).json({error:"Token Missing"})
        }
        const decoded=jwt.verify(token,"Wazid1234");
        const user= await User.findById(decoded);
        if(!user){
            res.status(401).json({error:"User not found"})
        }
        req.user = user;
        next();
    }
    catch(err){
        res.status(401).json({Error:err.message})

    }
}    

module.exports=userAuth;