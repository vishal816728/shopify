import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import { engine } from 'express-handlebars';
import usersRoutes from "./Routes/Registration/user.routes.js";
import ForgotPassword from "./Routes/ForgetPassword/forgotpassword.routes.js";
import rewardsRoutes from "./Routes/Rewards/Rewards.routes.js";
import paymentRouter from "./Routes/Payment/payment.routes.js";

const app = express();

// global middlewares 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extends: false }));
app.use(helmet());
app.use(morgan("tiny"))

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

//Routes 

app.use("/api/v1/user", usersRoutes)
app.use("/api/v1/otp", ForgotPassword)
app.use("/api/v1/reward", rewardsRoutes)
app.use("/api/v1/payment", paymentRouter)

export default app;