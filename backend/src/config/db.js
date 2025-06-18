const mongoose = require("mongoose");

const ConnectDB = async() =>{
    try{
        const conn= await mongoose.connect(process.env.MONGO_URI);
        console.log(`Mongodb Connected:${conn.connection.host}`);
    }
    catch(err){
        console.error(`Error occured:${err.message}`);
        process.exit(1);
    }
}

module.exports=ConnectDB;