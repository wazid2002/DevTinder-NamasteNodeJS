const express=require("express");
const dotenv= require("dotenv");
const User= require("./models/user");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/authRoute");
const profileRoute = require("./routes/profileRoute");
const connectionRoutes = require("./routes/connectionRoute");
const userRouter = require("./routes/userRoutes");

dotenv.config();
const app=express();


//middleware
app.use(express.json());
app.use(cookieParser());


//Route
app.use("/",authRoute);
app.use("/",profileRoute);
app.use("/",connectionRoutes);
app.use("/",userRouter);

 
connectDB()
    .then(()=>{
        console.log("Database Connection Established");
        app.listen(7777,()=>{
        console.log("Server Started on PORT:7777")
        })
    })
    .catch((err)=>{
        console.log("Error occured in connecting databse")
    });
