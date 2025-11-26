import rateLimit from "express-rate-limit";
import { TOO_MANY_REQUESTS } from "../constants/http";

export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 login requests per windowMs
    message: {
        message: "Too many login attempts, please try again after 15 minutes",
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    statusCode: TOO_MANY_REQUESTS,
});

export const registerLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5, // Limit each IP to 5 registration requests per windowMs
    message: {
        message: "Too many accounts created from this IP, please try again after an hour",
    },
    standardHeaders: true,
    legacyHeaders: false,
    statusCode: TOO_MANY_REQUESTS,
});
