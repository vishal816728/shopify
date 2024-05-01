import Controller from "../../Utils/Controller.js";
import sendSms from "../../Utils/SendMail.js";
import joi from "joi";
import userModel from "../../Models/Registration/users.model.js";
import OtpModel from "../../Models/Otp.model.js"
import randomOtpGenertor from "../../Utils/RandomOtpGenerator.js";
import bcrypt from "bcrypt";
class ForgotPassword extends Controller {
    constructor() {
        super()
        this.forgotPasswordVerficationOtp = this.forgotPasswordVerficationOtp.bind(this)
        this.forgotPasswordVerifyOtp = this.forgotPasswordVerifyOtp.bind(this)
        this.updatePassword = this.updatePassword.bind(this)
    }
    // send otp 
    async forgotPasswordVerficationOtp(req, res) {
        const { email } = req.body;
        const { error } = joi.string().email({ tlds: { allow: ['com', 'net'] } }).required().validate(email)
        if (error) {
            console.log(error)
            return this.errorWithMsg(res, "Wrong Email")
        }

        try {
            const otp = randomOtpGenertor()
            const title = email.split("@")[0]
            const user = title.charAt(0).toUpperCase() + title.slice(1)
            const isUser = await userModel.findOne({ email })
            if (isUser) {
                await sendSms(email, "Forgot Password - OTP XYZ Pvt Ltd", user, otp)
                await OtpModel.findOneAndUpdate({ email }, {
                    email,
                    otp
                }, {
                    upsert: true
                })
                return this.ok(res, "Otp is Successfully Sent on Email.")

            } else {
                return this.errorWithMsg(res, "Email does not exist.")
            }
        } catch (err) {
            return this.error(res, err)
        }
    }

    async forgotPasswordVerifyOtp(req, res) {
        const { otp, email } = req.body;
        const { error } = joi.object({
            otp: joi.string().length(6).required(),
            email: joi.string().email().required()
        }).validate({ otp: otp, email: email })
        if (error) {
            return this.errorWithMsg(res, error.details[0].message)
        }

        try {
            const isValidEmail = await OtpModel.findOne({ email })
            if (isValidEmail && parseInt(otp) === parseInt(isValidEmail.otp)) {
                return this.ok(res, "Otp Verified Successfully")
            } else {
                return this.errorWithMsg(res, "Invalid Otp. Please Retry")
            }
        } catch (err) {
            return this.error(res, err)
        }

    }

    async updatePassword(req, res) {
        const { password } = req.body
        const { id } = req.params
        const { error } = joi.string().required().validate(password)
        if (error) {
            return this.errorWithMsg(res, "Invalid Password")
        }
        const encryptedPass = bcrypt.hashSync(password, 10)
        try {
            const isUser = await userModel.findById(id)

            if (isUser) {
                const updatePassword = await isUser.updateOne(
                    {
                        password: encryptedPass
                    }
                )

                if (updatePassword) {
                    return this.ok(res, "Successfully Updated the Password")
                }
            } else {
                return res.send({ msg: "User Not found", result: false })
            }
        } catch (err) {
            return this.error(res, err)
        }

    }

}

export default new ForgotPassword();