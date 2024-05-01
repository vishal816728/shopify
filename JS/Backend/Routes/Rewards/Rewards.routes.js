import express from "express";
import rewardController from "../../Controllers/Rewards/reward.controller.js";
import { isAuthorized } from "../../Middlewares/jwtToken.js";

const rewardsRoutes = express.Router();

rewardsRoutes.post("/add/:id", isAuthorized, rewardController.AddReward);

export default rewardsRoutes; 