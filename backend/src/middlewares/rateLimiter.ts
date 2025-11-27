import rateLimit from "express-rate-limit";
import { TOO_MANY_REQUESTS } from "../constants/http";

export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: {
        message: "Too many login attempts, please try again after 15 minutes",
    },
    standardHeaders: true,
    legacyHeaders: false,
    statusCode: TOO_MANY_REQUESTS,
});

export const registerLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 5,
    message: {
        message: "Too many accounts created from this IP, please try again after an hour",
    },
    standardHeaders: true,
    legacyHeaders: false,
    statusCode: TOO_MANY_REQUESTS,
});
