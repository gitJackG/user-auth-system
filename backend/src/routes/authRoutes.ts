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
import passport from "../services/oauthService";
import { googleOAuthHandler, googleUnlinkHandler } from "../controllers/oauthController";


const authRoutes = Router();

authRoutes.post("/register", registerLimiter, registerHandler);
authRoutes.post("/login", loginLimiter, loginHandler);
authRoutes.get("/refresh", refreshHandler);
authRoutes.get("/logout", logoutHandler);
authRoutes.get("/email/verify/:code", verifyEmailHandler);
authRoutes.post("/password/forgot", loginLimiter, sendPasswordResetHandler);
authRoutes.post("/password/reset", loginLimiter, resetPasswordHandler);

authRoutes.get(
  "/google",
  loginLimiter,
  (req, res, next) => {
    const state = req.query.link === "1" ? "link=1" : undefined;
    passport.authenticate("google", { scope: ["email", "profile"], state })(req, res, next);
  }
);

authRoutes.get(
  "/google/callback", loginLimiter,
  passport.authenticate("google", { session: false }),
  googleOAuthHandler
);

authRoutes.delete("/google", googleUnlinkHandler);

export default authRoutes;