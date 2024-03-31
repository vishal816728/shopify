import forgotPassword from "../../Controllers/ForgotPassword/forgotPassword.contoller.js";
import express from "express";
import { limiterotp } from "../../Middlewares/LimiterOtp.js";

const ForgotPassword = express.Router();

ForgotPassword.post("/send/otp", limiterotp, forgotPassword.forgotPasswordVerficationOtp)

ForgotPassword.post("/verify/otp", forgotPassword.forgotPasswordVerifyOtp)

ForgotPassword.patch("/update/password/:id", forgotPassword.updatePassword)

export default ForgotPassword;