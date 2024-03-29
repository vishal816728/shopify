import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import { engine } from 'express-handlebars';
import studentRoutes from "./Routes/Registration/student.routes.js";
const app=express();

// global middlewares 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extends:false}));
app.use(helmet());
app.use(morgan("tiny"))

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

//Routes

app.use("/api/v1/student",studentRoutes)


export default app;