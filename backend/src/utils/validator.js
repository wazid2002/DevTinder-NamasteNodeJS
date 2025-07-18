const validator1 = require("validator")

function validator(req){

 const password=  req.body.password || req.body.newPassword;

    if(! validator1.isStrongPassword(password)){
      throw new Error("Please Enter Strong Password");
   }

};

function updateValidator(req){
   const allowedUpdateFields=["firstName","lastName","gender","about","skills","profilePicURL","age"];

   const updateAllowed=Object.keys(req.body).every((key)=>{
      return allowedUpdateFields.includes(key);
   });
   if(!updateAllowed){
      throw new Error("Update not allowed");
   }

   return true;
}

module.exports={validator,updateValidator}
