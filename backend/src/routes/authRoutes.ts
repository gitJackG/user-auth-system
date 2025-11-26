import { Router } from "express";
import {
  sendPasswordResetHandler,
  loginHandler,
  logoutHandler,
  refreshHandler,
  registerHandler,
  resetPasswordHandler,
  verifyEmailHandler,
} from "../controllers/authController";
import { loginLimiter, registerLimiter } from "../middlewares/rateLimiter";

const authRoutes = Router();

authRoutes.post("/register", registerLimiter, registerHandler);
authRoutes.post("/login", loginLimiter, loginHandler);
authRoutes.get("/refresh", refreshHandler);
authRoutes.get("/logout", logoutHandler);
authRoutes.get("/email/verify/:code", verifyEmailHandler);
authRoutes.post("/password/forgot", loginLimiter, sendPasswordResetHandler);
authRoutes.post("/password/reset", loginLimiter, resetPasswordHandler);

export default authRoutes;