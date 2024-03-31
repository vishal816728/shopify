import rateLimit from "express-rate-limit";

// Define rate limiting options

const limiter = rateLimit({
  windowMs: 2 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per windowMs
  message: "Too many login attempts. Please try again later."
});



export {
  limiter
};