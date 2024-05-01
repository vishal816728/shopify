import Controller from "../../Utils/Controller.js";
import Razorpay from "razorpay";
import crypto from "crypto";
import OrderModel from "../../Models/Order.model.js";
import joi from "joi";

const razorpay = new Razorpay({
    key_id: "rzp_test_Qvt5A5DM643dTM",
    key_secret: "q2K3z8OxgBSnyGBuaq4cAcYC"
});


class Payment extends Controller {
    constructor() {
        super();
        this.processPayment = this.processPayment.bind(this);
    }

    async processPayment(req, res) {
        const { productName, amount } = req.body;
        const { email } = req.user;

        const { error } = joi.object({
            amount: joi.number().integer().min(0).max(1000000).required(),
            email: joi.string().email({ tlds: { allow: ['com', 'net'] } }).required(),
            productName: joi.string().required()
        }).validate({ amount, productName, email });
        if (error) {
            // handle validation error
            return this.errorWithMsg(res, error.details[0].message);
        }
        const recriptNumber = crypto.randomBytes(12, (err, buf) => {
            if (err) {
                console.log(err);
                return;
            }
            return buf.toString('hex');
        })
        const paymentData = {
            amount: Number(amount) * 100, // Amount in paise
            currency: 'INR',
            receipt: recriptNumber,
            payment_capture: 1// Use protocol and host dynamically
        };

        try {
            const order = await razorpay.orders.create(paymentData);
            const newOrder = new OrderModel({
                userEmail: email,
                productName: productName,
                razorpay_order_id: order.id,
                amount: amount,
                status: order.status
            });
            await newOrder.save();
            this.ok(res, order);
        } catch (err) {
            console.error(err);
            this.errorWithMsg(res, 'Failed to create payment');
        }
    }
    async verifyPayment(req, res) {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
        const body_data = razorpay_order_id + "|" + razorpay_payment_id;
        const expect = crypto.createHmac('sha256', 'q2K3z8OxgBSnyGBuaq4cAcYC').update(body_data).digest('hex');
        const isValid = expect === razorpay_signature;
        if (isValid) {
            await OrderModel.findOne({ razorpay_order_id: razorpay_order_id }, {
                $set: {
                    razorpay_payment_id,
                    razorpay_order_id,
                    razorpay_signature

                }
            })
            res.redirect("http://localhost:5173/success")
            return
        } else {
            res.redirect("http://localhost:5173/failure")
            return
        }
    }
}


export default new Payment();