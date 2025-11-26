import jwt, { VerifyOptions, SignOptions } from "jsonwebtoken";
import Audience from "../constants/audience";
import { JWT_REFRESH_SECRET, JWT_SECRET } from "../constants/env";
import { UserDocument } from "../models/userModel";
import { SessionDocument } from "../models/sessionModel";

export type RefreshTokenPayload = {
  sessionId: SessionDocument["_id"];
};

export type AccessTokenPayload = {
  userId: UserDocument["_id"];
  sessionId: SessionDocument["_id"];
};

type SignOptionsAndSecret = SignOptions & {
  secret: string;
};

const defaults = {
  audience: [Audience.User] as [string, ...string[]],
} satisfies SignOptions;


const accessTokenSignOptions: SignOptionsAndSecret = {
  expiresIn: "15m",
  secret: JWT_SECRET,
};

export const refreshTokenSignOptions: SignOptionsAndSecret = {
  expiresIn: "30d",
  secret: JWT_REFRESH_SECRET,
};

export const signToken = (
  payload: AccessTokenPayload | RefreshTokenPayload,
  options?: SignOptionsAndSecret
) => {
  const { secret, ...signOpts } = options || accessTokenSignOptions;
  return jwt.sign(payload, secret, {
    ...defaults,
    ...signOpts,
  });
};

export const verifyToken = <TPayload extends object = AccessTokenPayload>(
  token: string,
  options?: VerifyOptions & { secret?: string }
) => {
  const { secret = JWT_SECRET, ...verifyOpts } = options || {};

  try {
    const decoded = jwt.verify(token, secret, {
      ...defaults,
      ...verifyOpts,
    }) as unknown;

    if (typeof decoded !== "object" || decoded === null) {
      return { error: "Invalid token payload" };
    }

    return {
      payload: decoded as TPayload,
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};
