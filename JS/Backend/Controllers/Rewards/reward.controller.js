import Joi from "joi";
import usersModel from "../../Models/Registration/users.model.js";
import RewardsModel from "../../Models/Rewards.model.js";
import Controller from "../../Utils/Controller.js";


class Reward extends Controller {
    constructor() {
        super()
        this.AddReward = this.AddReward.bind(this)
    }

    async AddReward(req, res) {
        const { id } = req.params;
        const { error, value } = Joi.string().length(24).validate(id)
        if (error) {
            return this.errorWithMsg(res, error.details[0].message)
        }
        const user = req.user;
        if (user) {
            const isUserHasRewards = await usersModel.findOne({ _id: id })
            let userRewardData = await RewardsModel.findOne({ userId: isUserHasRewards._id })
            if (!isUserHasRewards || !userRewardData) {
                return this.errorWithMsg(res, "User or reward not found.")
            }
            if (!isUserHasRewards.rewards) {
                let setUserRewardData = await usersModel.findOneAndUpdate({
                    email: user.email
                }, {
                    $set: {
                        rewards: userRewardData._id
                    }
                }, {
                    new: true,
                    upsert: true,
                    runValidators: true
                })
                return this.ok(res, setUserRewardData)
            } else {
                const addUserReward = await RewardsModel.findOneAndUpdate({
                    userId: isUserHasRewards._id
                }, {
                    $set: {
                        totalPoints: userRewardData.totalPoints + 1,
                        RemainingPoints: userRewardData.RemainingPoints + 1
                    }
                })
                if (addUserReward) {
                    return this.ok(res, addUserReward)
                } else {
                    return this.errorWithMsg(res, "Failed to update reward.")
                }
            }
        } else {
            return this.errorWithMsg(res, "User Not Found.")
        }
    }

    async getRewards(req, res) {
        const { email } = req.user;
        if (email) {
            try {
                const rewards = await usersModel.findOne({ email }).lean();
                if (rewards && rewards.rewards) {
                    return this.ok(res, rewards.rewards);
                } else {
                    return this.errorWithMsg(res, "Rewards Not Found");
                }
            } catch (error) {
                return this.errorWithMsg(res, "Error occurred while retrieving rewards");
            }
        } else {
            return this.errorWithMsg(res, "Email Not Found");
        }
    }
}

export default new Reward();