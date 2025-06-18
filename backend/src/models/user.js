const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{
        type:"string"
    },
    lastName:{
        type:"String"
    },
    email:{
        type:"string"
    },
    password:{
        type:"string"
    }
});


module.exports=mongoose.model('User',userSchema);