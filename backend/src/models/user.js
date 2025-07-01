const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

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
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email address:"+ value);
            }
        }
    },
    password:{
        type:String
    },
    about:{
        type:String
    },
    age:{
        type:Number
    },
    skills:{
        type:[String]
    },
    profilePicURL:{
        type:String,
        default:"https://static.vecteezy.com/system/resources/thumbnails/020/911/740/small_2x/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid image URL:" + value)
            }
        }
    }
});

userSchema.methods.getjwt= async function(){
    const user= this;

    const token=await jwt.sign({_id:user._id},"Wazid1234",{expiresIn:'1d'});
    return token

};

userSchema.methods.validatePassword= async function(passwordEnteredByUser){
    const user=this;

    const auth= await bcrypt.compare(passwordEnteredByUser,user.password);
    return auth
};


module.exports=mongoose.model('User',userSchema);