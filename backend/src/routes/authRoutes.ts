import { Router, Request, Response, NextFunction } from "express";
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
import { googleOAuthHandler, googleUnlinkHandler, githubOAuthHandler, githubUnlinkHandler, discordOAuthHandler, discordUnlinkHandler, facebookOAuthHandler, facebookUnlinkHandler } from "../controllers/oauthController";
import crypto from "crypto";
import { NODE_ENV } from "../constants/env";

const authRoutes = Router();

const verifyState = (req: Request, res: Response, next: NextFunction) => {
  const stateQuery = req.query.state as string;
  const stateCookie = req.cookies.oauth_state;

  if (!stateQuery || !stateCookie || stateQuery !== stateCookie) {
    return res.status(403).json({ message: "Invalid OAuth state" });
  }

  res.clearCookie("oauth_state");
  next();
};

authRoutes.post("/register", registerLimiter, registerHandler);
authRoutes.post("/login", loginLimiter, loginHandler);
authRoutes.get("/refresh", loginLimiter, refreshHandler);
authRoutes.get("/logout", logoutHandler);
authRoutes.get("/email/verify/:code", verifyEmailHandler);
authRoutes.post("/password/forgot", loginLimiter, sendPasswordResetHandler);
authRoutes.post("/password/reset", loginLimiter, resetPasswordHandler);


authRoutes.get(
  "/google", loginLimiter,
  (req, res, next) => {
    const state = crypto.randomBytes(32).toString('hex');
    res.cookie("oauth_state", state, {
      httpOnly: true,
      secure: NODE_ENV === "production",
      maxAge: 5 * 60 * 1000,
    });
    passport.authenticate("google", { scope: ["email", "profile"], state })(req, res, next);
  }
);

authRoutes.get(
  "/google/callback", loginLimiter,
  verifyState,
  passport.authenticate("google", { session: false }),
  googleOAuthHandler
);

authRoutes.delete("/google", googleUnlinkHandler);

authRoutes.get(
  "/github", loginLimiter,
  (req, res, next) => {
    const state = crypto.randomBytes(32).toString('hex');
    res.cookie("oauth_state", state, {
      httpOnly: true,
      secure: NODE_ENV === "production",
      maxAge: 5 * 60 * 1000,
    });
    passport.authenticate("github", { scope: ["user:email"], state })(req, res, next);
  }
);

authRoutes.get(
  "/github/callback", loginLimiter,
  verifyState,
  passport.authenticate("github", { session: false }),
  githubOAuthHandler
);

authRoutes.delete("/github", githubUnlinkHandler);

authRoutes.get(
  "/discord", loginLimiter,
  (req, res, next) => {
    const state = crypto.randomBytes(32).toString('hex');
    res.cookie("oauth_state", state, {
      httpOnly: true,
      secure: NODE_ENV === "production",
      maxAge: 5 * 60 * 1000,
    });
    passport.authenticate("discord", { scope: ["identify", "email"], state })(req, res, next);
  }
);

authRoutes.get(
  "/discord/callback", loginLimiter,
  verifyState,
  passport.authenticate("discord", { session: false }),
  discordOAuthHandler
);

authRoutes.delete("/discord", discordUnlinkHandler);

authRoutes.get(
  "/facebook", loginLimiter,
  (req, res, next) => {
    const state = crypto.randomBytes(32).toString('hex');
    res.cookie("oauth_state", state, {
      httpOnly: true,
      secure: NODE_ENV === "production",
      maxAge: 5 * 60 * 1000,
    });
    passport.authenticate("facebook", { scope: ["email"], state })(req, res, next);
  }
);

authRoutes.get(
  "/facebook/callback", loginLimiter,
  verifyState,
  passport.authenticate("facebook", { session: false }),
  facebookOAuthHandler
);

authRoutes.delete("/facebook", facebookUnlinkHandler);

export default authRoutes;