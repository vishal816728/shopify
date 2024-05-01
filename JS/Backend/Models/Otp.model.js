import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    otp: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

OtpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 })

export default mongoose.model("Otp", OtpSchema)