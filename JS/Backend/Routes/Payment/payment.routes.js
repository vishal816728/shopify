import express from "express";
import paymentController from "../../Controllers/Payment_Razorpay/payment.controller.js";
import { isAuthorized } from "../../Middlewares/jwtToken.js";

const paymentRouter = express.Router();

paymentRouter.post("/execute", isAuthorized, paymentController.processPayment);

paymentRouter.post("/verify", paymentController.verifyPayment);

export default paymentRouter; 