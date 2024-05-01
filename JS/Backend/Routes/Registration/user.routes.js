import express from "express";

import { limiter } from "../../Middlewares/Limiter.js"

import User from "../../Controllers/Registration/users.controller.js";

const userRoutes = express.Router()

userRoutes.post("/registration", User.registerUser)

userRoutes.get("/users", User.getAllUsers)

userRoutes.get("/:id", User.getUser)

userRoutes.delete("/:id", User.deleteUser)

userRoutes.post("/signin", limiter, User.loginUser)

userRoutes.patch("/update/:id", User.updateUser)

export default userRoutes;