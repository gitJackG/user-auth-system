import { Request, Response } from "express";
import UserModel from "../models/userModel";
import AuthProviderModel from "../models/authProviderModel";
import SessionModel from "../models/sessionModel";
import { signToken, verifyToken } from "../utils/jwt";
import { setAuthCookies } from "../utils/cookies";
import catchErrors from "../utils/catchErrors";
import {
  APP_ORIGIN,
} from "../constants/env";
import appAssert from "../utils/appAssert";
import AppErrorCode from "../constants/appErrorCode";
import { UNAUTHORIZED } from "../constants/http";

export const googleOAuthHandler = catchErrors(async (req: Request, res: Response) => {
  const profile = (req.user as any).profile;
  if (!profile) throw new Error("Google profile missing");

  const googleId = profile.id;
  const email = profile._json?.email ?? profile.emails?.[0]?.value ?? null;

  let providerLink = await AuthProviderModel.findOne({
    provider: "google",
    providerId: googleId,
  });

  let user;

  if (providerLink) {
    user = await UserModel.findById(providerLink.userId);
  } else {
    user = email ? await UserModel.findOne({ email }) : null;

    if (user) {
      await AuthProviderModel.create({
        userId: user._id,
        provider: "google",
        providerId: googleId,
      });
    } else {
      user = await UserModel.create({
        email,
        password: null,
        verified: true,
      });

      await AuthProviderModel.create({
        userId: user._id,
        provider: "google",
        providerId: googleId,
      });
    }
  }

  if (!user) throw new Error("User not found")
  const session = await SessionModel.create({
    userId: user._id,
    userAgent: req.headers["user-agent"],
  });

  const refreshToken = signToken(
    { sessionId: session._id },
    { secret: process.env.JWT_REFRESH_SECRET!, expiresIn: "30d" }
  );

  const accessToken = signToken({
    userId: user._id,
    sessionId: session._id,
  });

  setAuthCookies({ res, accessToken, refreshToken });

  res.redirect(`${APP_ORIGIN}/`);
});

export const googleUnlinkHandler = catchErrors(async (req, res) => {
  const accessToken = req.cookies.accessToken;
  appAssert(accessToken, UNAUTHORIZED, "Not authorized");

  const { payload } = verifyToken(accessToken);
  appAssert(payload, UNAUTHORIZED, "Invalid access token");

  const userId = payload.userId;

  const result = await AuthProviderModel.findOneAndDelete({
    userId,
    provider: "google",
  });

  if (!result) {
    return res.status(404).json({ message: "Google provider not linked" });
  }

  res.status(200).json({ message: "Google account unlinked successfully" });
});

export const githubOAuthHandler = catchErrors(async (req: Request, res: Response) => {
  const profile = (req.user as any).profile;
  if (!profile) throw new Error("GitHub profile missing");

  const githubId = profile.id;

  const email =
    profile.emails?.[0]?.value ??
    profile._json?.email ??
    null;

  let providerLink = await AuthProviderModel.findOne({
    provider: "github",
    providerId: githubId,
  });

  let user;

  if (providerLink) {
    user = await UserModel.findById(providerLink.userId);
  } else {
    user = email ? await UserModel.findOne({ email }) : null;

    if (user) {
      await AuthProviderModel.create({
        userId: user._id,
        provider: "github",
        providerId: githubId,
      });
    } else {
      user = await UserModel.create({
        email,
        password: null,
        verified: true,
      });

      await AuthProviderModel.create({
        userId: user._id,
        provider: "github",
        providerId: githubId,
      });
    }
  }

  if (!user) throw new Error("User not found");

  const session = await SessionModel.create({
    userId: user._id,
    userAgent: req.headers["user-agent"],
  });

  const refreshToken = signToken(
    { sessionId: session._id },
    { secret: process.env.JWT_REFRESH_SECRET!, expiresIn: "30d" }
  );

  const accessToken = signToken({
    userId: user._id,
    sessionId: session._id,
  });

  setAuthCookies({ res, accessToken, refreshToken });

  res.redirect(`${APP_ORIGIN}/`);
});

export const githubUnlinkHandler = catchErrors(async (req, res) => {
  const accessToken = req.cookies.accessToken;
  appAssert(accessToken, UNAUTHORIZED, "Not authorized");

  const { payload } = verifyToken(accessToken);
  appAssert(payload, UNAUTHORIZED, "Invalid access token");

  const userId = payload.userId;

  const result = await AuthProviderModel.findOneAndDelete({
    userId,
    provider: "github",
  });

  if (!result) {
    return res.status(404).json({ message: "GitHub provider not linked" });
  }

  res.status(200).json({ message: "GitHub account unlinked successfully" });
});

export const discordOAuthHandler = catchErrors(async (req: Request, res: Response) => {
  const profile = (req.user as any).profile;
  if (!profile) throw new Error("Discord profile missing");

  const discordId = profile.id;
  const email = profile.email ?? null;

  let providerLink = await AuthProviderModel.findOne({
    provider: "discord",
    providerId: discordId
  });

  let user;

  if (providerLink) {
    user = await UserModel.findById(providerLink.userId);
  } else {
    user = email ? await UserModel.findOne({ email }) : null;

    if (user) {
      await AuthProviderModel.create({
        userId: user._id,
        provider: "discord",
        providerId: discordId
      });
    } else {
      user = await UserModel.create({
        email,
        password: null,
        verified: true
      });

      await AuthProviderModel.create({
        userId: user._id,
        provider: "discord",
        providerId: discordId
      });
    }
  }

  if (!user) throw new Error("User not found");

  const session = await SessionModel.create({
    userId: user._id,
    userAgent: req.headers["user-agent"]
  });

  const refreshToken = signToken(
    { sessionId: session._id },
    { secret: process.env.JWT_REFRESH_SECRET!, expiresIn: "30d" }
  );

  const accessToken = signToken({
    userId: user._id,
    sessionId: session._id
  });

  setAuthCookies({ res, accessToken, refreshToken });

  res.redirect(`${APP_ORIGIN}/`);
});

export const discordUnlinkHandler = catchErrors(async (req, res) => {
  const accessToken = req.cookies.accessToken;
  appAssert(accessToken, UNAUTHORIZED, "Not authorized");

  const { payload } = verifyToken(accessToken);
  appAssert(payload, UNAUTHORIZED, "Invalid access token");

  const userId = payload.userId;

  const result = await AuthProviderModel.findOneAndDelete({
    userId,
    provider: "discord",
  });

  if (!result) {
    return res.status(404).json({ message: "Discord provider not linked" });
  }

  res.status(200).json({ message: "Discord account unlinked successfully" });
});

export const facebookOAuthHandler = catchErrors(async (req: Request, res: Response) => {
  const profile = (req.user as any).profile;
  if (!profile) throw new Error("Facebook profile missing");

  const facebookId = profile.id;
  const email = profile.email ?? null;

  let providerLink = await AuthProviderModel.findOne({
    provider: "facebook",
    providerId: facebookId
  });

  let user;

  if (providerLink) {
    user = await UserModel.findById(providerLink.userId);
  } else {
    user = email ? await UserModel.findOne({ email }) : null;

    if (user) {
      await AuthProviderModel.create({
        userId: user._id,
        provider: "facebook",
        providerId: facebookId
      });
    } else {
      user = await UserModel.create({
        email,
        password: null,
        verified: true
      });

      await AuthProviderModel.create({
        userId: user._id,
        provider: "facebook",
        providerId: facebookId
      });
    }
  }

  if (!user) throw new Error("User not found");

  const session = await SessionModel.create({
    userId: user._id,
    userAgent: req.headers["user-agent"]
  });

  const refreshToken = signToken(
    { sessionId: session._id },
    { secret: process.env.JWT_REFRESH_SECRET!, expiresIn: "30d" }
  );

  const accessToken = signToken({
    userId: user._id,
    sessionId: session._id
  });

  setAuthCookies({ res, accessToken, refreshToken });

  res.redirect(`${APP_ORIGIN}/`);
});

export const facebookUnlinkHandler = catchErrors(async (req, res) => {
  const accessToken = req.cookies.accessToken;
  appAssert(accessToken, UNAUTHORIZED, "Not authorized");

  const { payload } = verifyToken(accessToken);
  appAssert(payload, UNAUTHORIZED, "Invalid access token");

  const userId = payload.userId;

  const result = await AuthProviderModel.findOneAndDelete({
    userId,
    provider: "facebook",
  });

  if (!result) {
    return res.status(404).json({ message: "Facebook provider not linked" });
  }

  res.status(200).json({ message: "Facebook account unlinked successfully" });
});
