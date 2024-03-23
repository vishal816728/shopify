const express = require("express");
const helmet=require("helmet");
const morgan=require("morgan");
const cors=require("cors");

const app=express();

// global middlewares 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extends:false}));
app.use(helmet());
app.use(morgan("tiny"))





module.exports=app