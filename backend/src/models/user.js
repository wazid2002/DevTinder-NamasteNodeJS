const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minlength:4,
        maxlength:12
    },
    lastName:{
        type:String
    },
    gender:{
        type:String,
        validate:{
            validator:function(value){
                if(value !== 'male' && value !== 'female' && value !== 'other'){
                    return false;
                }
                return true;
            },
            message:props=> `${props.value} is not valid gender`
        }
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String
    },
    Bio:{
        type:String
    },
    skills:{
        type:[String]
    },
    profilePicURL:{
        type:"String",
        default:"https://static.vecteezy.com/system/resources/thumbnails/020/911/740/small_2x/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png"
    }
});


module.exports=mongoose.model('User',userSchema);