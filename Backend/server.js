import express from "express"
import dotenv from "dotenv";
import cors from 'cors';
import { connectDB } from "./DB/connectDb.js";
import AuthRoutes from './Routes/Auth.Routes.js';
import EventRoutes from './Routes/Event.Routes.js';
import UserRoutes from "./Routes/User.Routes.js";
const app=express();
dotenv.config();

app.use(cors());
app.use(express.json());

app.use("/api/v1/auth",AuthRoutes);
app.use("/api/v1/event",EventRoutes);
app.use("/api/v1/user",UserRoutes);
connectDB();
app.listen(process.env.PORT,()=>{
    console.log("Listing");
})