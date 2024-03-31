import rateLimit from "express-rate-limit";

// Define rate limiting options

const limiterotp = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 1, // 5 requests per windowMs
    message: "Please try again later after 5 min"
});



export {
    limiterotp
};