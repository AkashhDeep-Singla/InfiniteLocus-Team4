import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv";
dotenv.config();
export const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log("mongo Connected");
    } catch (error) {
        console.log("Error in connecting mongo")
    }
}