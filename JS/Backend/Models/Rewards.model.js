import mongoose from "mongoose";

const rewardSchema = new mongoose.Schema({
    totalPoints: {
        type: Number,
        default: 0
    },
    totalRedeemed: {
        type: Number,
        default: 0
    },
    RemainingPoints: {
        type: Number,
        default: 0
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

}, {
    timestamps: true
})


export default mongoose.model("Reward", rewardSchema)