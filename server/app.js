import express from "express";
import mongoose from 'mongoose';
import dotenv from "dotenv";
import { connectDB } from "./db/dbconn.js";
import cors from 'cors';
import userRouter from "./routing/user_routes.js";
import cookieParser from "cookie-parser";

const app=express();
dotenv.config({path:'./config.env'});

//db
connectDB();


//middlewares
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }));
app.use(express.json());
app.use('/user',userRouter);


app.get('/',(req,res)=>{
    res.send(`Hello world app`);
});

const PORT = 5000;
app.listen(PORT, ()=>{
    console.log(`server up and running  at ${PORT}`);
});