import crypto from "crypto";

function randomOtpGenertor() {
    const digits = '0123456789'
    let otp = ""
    for (let index = 0; index < 6; index++) {
        otp += digits[crypto.randomInt(0, digits.length)]
    }
    return otp

}

export default randomOtpGenertor;
