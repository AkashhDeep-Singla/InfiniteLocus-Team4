import mongoose from "mongoose";

const AuthModel= new mongoose.Schema({
    username:{
        type:String,
        required:true,
        minLength:3
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        minLength:8,
        maxLength:100
    },
    phoneNumber:{
        type:Number,
        minLength:10,
        maxLength:10,
        // required:true
    },
    role:{
        type:String,
        enum:["user","organizer"],
        default:"user",
        required:true
    }
},{timestamps:true})
const Auth=new mongoose.model("Auth",AuthModel);
export default Auth;