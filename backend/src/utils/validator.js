const validator1 = require("validator")

function validator(req){

 const{firstName,lastName,email,password}= req.body;

 if(!firstName){
    throw new Error("Please enter first name")
 }
 else if(! validator1.isStrongPassword(password)){
    throw new Error("Please Enter Strong Password")
 }

}

module.exports=validator

