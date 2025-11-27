import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  BACKEND_ORIGIN,
} from "../constants/env";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `${BACKEND_ORIGIN}/auth/google/callback`,
    },
    (accessToken, refreshToken, profile, done) => {
      done(null, { profile, accessToken, refreshToken });
    }
  )
);

export default passport;
