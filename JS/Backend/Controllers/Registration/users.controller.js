import userModel from "../../Models/Registration/users.model.js";
import Controller from "../../Utils/Controller.js";
import joi from "joi";
import bcrypt from "bcrypt";
import createToken from "../../Utils/createToken.js";
import RewardsModel from "../../Models/Rewards.model.js";


class User extends Controller {
    constructor() {
        super()
        this.registerUser = this.registerUser.bind(this)
        this.getAllUsers = this.getAllUsers.bind(this)
        this.getUser = this.getUser.bind(this)
        this.loginUser = this.loginUser.bind(this)
        this.updateUser = this.updateUser.bind(this)
        this.deleteUser = this.deleteUser.bind(this)
    }

    async registerUser(req, res) {
        const { username, phoneNumber, email, password } = req.body;

        // Validate the request body -- for phoneNumber range is 6000000000 to 9999999999
        const { error } = joi.object({
            username: joi.string().required(),
            phoneNumber: joi.number().integer().min(6000000000).max(9999999999).required(),
            email: joi.string().email({ tlds: { allow: ['com', 'net'] } }).required(),
            password: joi.string().min(8).alphanum().required()
        }).validate({ username, phoneNumber, email, password });
        if (error) {
            // handle validation error
            return this.errorWithMsg(res, error.details[0].message);
        }
        try {
            const isUserExist = await userModel.findOne({ email: email })
            if (!isUserExist) {
                const hashedPassword = await bcrypt.hash(password, Number(process.env.saltRounds));
                const saveUser = new userModel({
                    email,
                    username,
                    phoneNumber,
                    password: hashedPassword
                })
                await saveUser.save();
                const createReward = new RewardsModel({
                    totalPoints: 1,
                    totalRedeemed: 0,
                    RemainingPoints: 1,
                    userId: saveUser._id
                })
                await createReward.save()
                saveUser.password = undefined
                return this.ok(res, saveUser);

            } else {
                return this.errorWithMsg(res, "User already exists");
            }
        } catch (error) {
            // Handle the error here
            console.log(error)
            return this.error(res, error)
        }
    }

    async getUser(req, res) {
        const { id } = req.params;
        const { error, value } = joi.string().length(24).validate(id)
        if (error) {
            return this.errorWithMsg(res, error.details[0].message)
        }
        try {
            const student = await userModel.findById(id).select("-password")
            if (student) {
                return this.ok(res, student)
            } else {
                return this.errorWithMsg(res, "User Id Does Not Exist.")
            }
        } catch (err) {
            return this.error(res, err)
        }
    }

    async loginUser(req, res) {
        const { email, password } = req.body;
        const { error } = joi.object({
            email: joi.string().email().required(),
            password: joi.string()
        }).validate({ email, password })

        if (error) {
            return this.errorWithMsg(res, "Invalid email/password. Please Try Again")
        }

        try {
            const isUserExist = await userModel.findOne({ email }).lean()
            if (isUserExist) {
                const isCorrectPassword = await bcrypt.compare(password, isUserExist.password)
                if (isCorrectPassword) {
                    const jwtToken = await createToken({ id: isUserExist._id, Role: isUserExist.Role, email: isUserExist.email })
                    isUserExist.password = undefined
                    isUserExist.token = jwtToken
                    return this.ok(res, isUserExist)
                } else {
                    return this.errorWithMsg(res, "Invalid email/password. Please Try Again")
                }
            } else {
                return this.errorWithMsg(res, "User Id Does not Exist")
            }
        } catch (err) {
            return this.error(res, err)
        }
    }

    async updateUser(req, res) {
        const { error } = joi.string().email({ tlds: { allow: ['com', 'net'] } }).required().validate(req.body.email)

        if (error) {
            return this.errorWithMsg(res, "Wrong Email")
        }
        try {
            const isUser = await userModel.findOne({ email: req.body.email })
            if (isUser) {
                const update = {
                    $set: {
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        address: {
                            street: req.body.street,
                            city: req.body.city,
                            state: req.body.state,
                            pincode: req.body.pincode,
                            country: req.body.country
                        },
                        phoneNumber: req.body.phoneNumber,
                        dateOfBirth: req.body.dateOfBirth ? new Date(req.body.dateOfBirth) : undefined,
                        gender: req.body.gender,
                    }
                }

                const updateUser = await userModel.findOneAndUpdate({ email: req.body.email }, update, {
                    new: true, upsert: true, runValidators: true,
                    useFindAndModify: false
                })
                if (updateUser) {
                    return this.ok(res, updateUser)
                }
            } else {
                return this.errorWithMsg(res, "Student does not exist")
            }
        } catch (err) {
            return this.error(res, err)
        }
    }
    async deleteUser(req, res) {
        const { id } = req.params;
        const { error, value } = joi.string().length(24).validate(id)
        if (error) {
            return this.errorWithMsg(res, error.details[0].message)
        }
        try {
            const user = await userModel.findById(id)
            if (user) {
                const deletedStudent = await userModel.findByIdAndDelete(id)
                return this.ok(res, deletedStudent)
            } else {
                return this.errorWithMsg(res, "Student Id Does Not Exist.")
            }
        } catch (err) {
            return this.error(res, err)
        }
    }

    async getAllUsers(req, res) {
        try {
            const users = await userModel.find().select({ "password": 0 })
            this.ok(res, users)
        } catch (error) {
            return this.error(res, error)
        }
    }

}

export default new User();