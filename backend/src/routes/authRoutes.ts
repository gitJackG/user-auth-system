import { Router } from "express";
import {
  sendPasswordResetHandler,
  loginHandler,
  logoutHandler,
  refreshHandler,
  registerHandler,
  resetPasswordHandler,
  verifyEmailHandler,
  deleteHandler,
} from "../controllers/authController";
import { loginLimiter, registerLimiter } from "../middlewares/rateLimiter";
import passport from "../services/oauthService";
import { googleOAuthHandler, googleUnlinkHandler, githubOAuthHandler, githubUnlinkHandler, discordOAuthHandler, discordUnlinkHandler, facebookOAuthHandler, facebookUnlinkHandler } from "../controllers/oauthController";


const authRoutes = Router();

authRoutes.post("/register", registerLimiter, registerHandler);
authRoutes.post("/login", loginLimiter, loginHandler);
authRoutes.get("/refresh", refreshHandler);
authRoutes.get("/logout", logoutHandler);
authRoutes.get("/email/verify/:code", verifyEmailHandler);
authRoutes.post("/password/forgot", loginLimiter, sendPasswordResetHandler);
authRoutes.post("/password/reset", loginLimiter, resetPasswordHandler);
authRoutes.delete("/delete", deleteHandler);

authRoutes.get(
  "/google",
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

authRoutes.get(
  "/github",
  loginLimiter,
  (req, res, next) => {
    const state = req.query.link === "1" ? "link=1" : undefined;
    passport.authenticate("github", { scope: ["user:email"], state })(req, res, next);
  }
);

authRoutes.get(
  "/github/callback",
  loginLimiter,
  passport.authenticate("github", { session: false }),
  githubOAuthHandler
);

authRoutes.delete("/github", githubUnlinkHandler);

authRoutes.get(
  "/discord",
  loginLimiter,
  (req, res, next) => {
    const state = req.query.link === "1" ? "link=1" : undefined;
    passport.authenticate("discord", { scope: ["identify", "email"], state })(req, res, next);
  }
);

authRoutes.get(
  "/discord/callback",
  loginLimiter,
  passport.authenticate("discord", { session: false }),
  discordOAuthHandler
);

authRoutes.delete("/discord", discordUnlinkHandler);

authRoutes.get(
  "/facebook",
  loginLimiter,
  (req, res, next) => {
    const state = req.query.link === "1" ? "link=1" : undefined;
    passport.authenticate("facebook", { scope: ["email"], state })(req, res, next);
  }
);

authRoutes.get(
  "/facebook/callback",
  loginLimiter,
  passport.authenticate("facebook", { session: false }),
  facebookOAuthHandler
);

authRoutes.delete("/facebook", facebookUnlinkHandler);

export default authRoutes;