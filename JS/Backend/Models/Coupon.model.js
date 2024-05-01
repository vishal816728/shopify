import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
    couponCode: {
        type: String,
        required: [true, "Coupon code is required field."]
    },
    isCouponValid: {
        type: Boolean,
        required: [true, "isCouponValid is a required field"]
    },
    platform: {
        type: String,
        requried: [true, "Platform is required field"]
    },
    pointsRequiredToRedeem: {
        type: Number,
        required: [true, "pointsRequiredToRedeem is required field"]
    },
    // Number of times coupon can be used
    timesUsed: {
        type: Number,
        required: true
    },
    Validity: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
}
)


export default new mongoose.model("Coupon", couponSchema)