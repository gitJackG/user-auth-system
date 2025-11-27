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

  const isLink = req.query.link === "1" || req.query.state === "link=1";

  if (isLink) {
    const accessToken = req.cookies.accessToken as string | undefined;
    appAssert(
      accessToken,
      UNAUTHORIZED,
      "Not authorized",
      AppErrorCode.InvalidAccessToken
    );

    const { error, payload } = verifyToken(accessToken);
    appAssert(
      payload,
      UNAUTHORIZED,
      error === "jwt expired" ? "Token expired" : "Invalid token",
      AppErrorCode.InvalidAccessToken
    );

    const userId = payload.userId;

    await AuthProviderModel.findOneAndUpdate(
      { provider: "google", providerId: googleId },
      { userId, provider: "google", providerId: googleId },
      { upsert: true }
    );

    return res.redirect(`${APP_ORIGIN}/`);
  }

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

export const googleUnlinkHandler = catchErrors(async (req: Request, res: Response) => {
  const userId = req.userId;

  await AuthProviderModel.findOneAndDelete({
    userId,
    provider: "google"
  });

  return res.status(200).json({ message: "Google account unlinked successfully" });
});

export const githubOAuthHandler = catchErrors(async (req: Request, res: Response) => {
  const profile = (req.user as any).profile;
  if (!profile) throw new Error("GitHub profile missing");

  const githubId = profile.id;

  const email =
    profile.emails?.[0]?.value ??
    profile._json?.email ??
    null;

  const isLink = req.query.link === "1" || req.query.state === "link=1";

  if (isLink) {
    const accessToken = req.cookies.accessToken as string | undefined;
    appAssert(accessToken, UNAUTHORIZED, "Not authorized", AppErrorCode.InvalidAccessToken);

    const { error, payload } = verifyToken(accessToken);
    appAssert(
      payload,
      UNAUTHORIZED,
      error === "jwt expired" ? "Token expired" : "Invalid token",
      AppErrorCode.InvalidAccessToken
    );

    const userId = payload.userId;

    await AuthProviderModel.findOneAndUpdate(
      { provider: "github", providerId: githubId },
      { userId, provider: "github", providerId: githubId },
      { upsert: true }
    );

    return res.redirect(`${APP_ORIGIN}/`);
  }

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

export const githubUnlinkHandler = catchErrors(async (req: Request, res: Response) => {
  await AuthProviderModel.findOneAndDelete({
    userId: req.userId,
    provider: "github",
  });

  return res.status(200).json({ message: "GitHub account unlinked successfully" });
});
