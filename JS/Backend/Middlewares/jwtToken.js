import jwt from "jsonwebtoken";
import userModel from "../../Backend/Models/Registration/users.model.js"

const isAuthorized = async (req, res, next) => {
    try {
        if (req.headers && req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            const token = req.headers.authorization.split(" ")[1]
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            if (decode) {
                switch (decode.Role) {
                    case "user":
                        const isUser = await userModel.findOne({ email: decode.email })
                        if (isUser) {
                            req.user = isUser
                            next()
                        } else {
                            throw new Error("User Not Found check your Token")
                        }
                        break;
                    case "Admin":
                        const isAdmin = await userModel.findOne({ email: decode.email })
                        if (isAdmin) {
                            req.admin = isAdmin
                            next()
                        } else {
                            throw new Error("Admin Not Found check your Token")
                        }
                        break;
                }
            } else {
                throw new Error("Not Authorized.")
            }
        } else {
            throw new Error("Not Authorized.")
        }
    } catch (err) {
        console.log(err)
        throw new Error(err.message)
    }
}

const isAdmin = async (req, res, next) => {
    try {
        if (req.headers.x_api_key && req.headers.x_api_key === process.env.X_API_KEY) {
            next()
        } else {
            throw new Error("Incorrect Api Key.")
        }
    } catch (err) {
        throw new Error(err.message)
    }
}

export {
    isAuthorized,
    isAdmin
};