
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userEmail: {
        type: String
    },
    productName: {
        type: String,
        required: true
    },
    razorpay_order_id: {
        type: String,
        required: true,
        unique: true
    },
    razorpay_payment_id: {
        type: String
    },
    razorpay_sinature: {
        type: String
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        default: "INR"
    },
    status: {
        type: String,
        enum: ['created', 'pending', 'paid', 'failed', 'cancelled', 'refunded']
    },
}, {
    timestamps: true
})

export default mongoose.model("Order", orderSchema);