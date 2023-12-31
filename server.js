const mongoose = require('mongoose')
const cors = require('cors')
const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const { connectDB } = require('./config/dbConfig.js')
const cookieParser = require('cookie-parser')
const { createUser } = require('./Controllers/createUser.js')
const verifyEmailAndToken  = require('./Controllers/authenticateUser.js');


// import mongoose from "mongoose";
// import cors from  "cors";
// import express from "express";
// import dotenv from "dotenv";
// import bodyParser from "body-parser";
// import { connectDB } from "./config/DbConjs";
// import userRouter from "./routes/userRoutes.js";
// import productRouter from "./routes/productRoutes.js";
// import contactRoute from "./routes/contactRoute.js";
// import errorHandler from "./middleware/errorMiddleware.js";
// import cookieParser from "cookie-parser";


const app = express();
dotenv.config();
const PORT = process.env.PORT;

//connect to db
connectDB();

//app middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());

// routes middleware
// app.use("/api/users", userRouter);
// app.use("/api/products", productRouter);
// app.use("/api/contactus", contactRoute);
app.use("/api/users", createUser);
app.use("/api/auth", verifyEmailAndToken)


//route
app.get("/", (req, res) => {
    res.send("Home Page!");
});

//error handler
//app.use(errorHandler);

//start server
mongoose.connection.once('open', () => {
    console.log('DB connected');

    app.listen(PORT, () => {
        console.log(`Server is running on ${PORT}`);
    });
});
