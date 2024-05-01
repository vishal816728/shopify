import jwt from "jsonwebtoken";

const createToken = async (payload) => {

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY
    })
    return token
}

export default createToken;