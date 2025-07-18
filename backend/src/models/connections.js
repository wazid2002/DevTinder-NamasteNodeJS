const mongoose = require("mongoose");


const ConnectionSchema = new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    status:{
        type:String,
        required:true,
        enum:{
            values:["interested","ignored","accepted","rejected"],
            message:`{VALUE} is incorrect status type`
        }
    }
},{timestamps:true});

ConnectionSchema.pre("save",function(next){
    const connectionrequest = this;
    if(connectionrequest.toUserId.equals(connectionrequest.fromUserId)){
        throw new Error("Cannot send request to yourself!");
    }
    next();
});

module.exports=mongoose.model("ConnectionRequest",ConnectionSchema);