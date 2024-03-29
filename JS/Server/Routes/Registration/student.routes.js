import express from "express";

import limiter from "../../Middlewares/Limiter.js"

const studentRoutes=express.Router()

import User from "../../Controllers/Registration/student.controller.js"

studentRoutes.post("/registration",User.registerUser)

studentRoutes.get("/students",User.getAllUsers)

studentRoutes.get("/:id",User.getStudent)

studentRoutes.delete("/:id",User.deleteStudent)

studentRoutes.post("/signin", limiter, User.loginStudent)

studentRoutes.patch("/update/:id",User.updateStudent)

export default studentRoutes;