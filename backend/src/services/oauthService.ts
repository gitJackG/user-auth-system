import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import { Strategy as DiscordStrategy } from "passport-discord";
import { Strategy as FacebookStrategy } from "passport-facebook";
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  DISCORD_CLIENT_ID,
  DISCORD_CLIENT_SECRET,
  FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET,
  BACKEND_ORIGIN,
} from "../constants/env";


passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `${BACKEND_ORIGIN}/auth/google/callback`,
    },
    (accessToken: any, refreshToken: any, profile: any, done: (arg0: null, arg1: { profile: any; accessToken: any; refreshToken: any; }) => void) => {
      done(null, { profile, accessToken, refreshToken });
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: `${BACKEND_ORIGIN}/auth/github/callback`,
      scope: ["user:email"],
    },
    (accessToken: any, refreshToken: any, profile: any, done: (arg0: null, arg1: { profile: any; accessToken: any; refreshToken: any; }) => void) => {
      done(null, { profile, accessToken, refreshToken });
    }
  )
);

passport.use(
  new DiscordStrategy(
    {
      clientID: DISCORD_CLIENT_ID,
      clientSecret: DISCORD_CLIENT_SECRET,
      callbackURL: `${BACKEND_ORIGIN}/auth/discord/callback`,
      scope: ["identify", "email"],
    },
    (accessToken: any, refreshToken: any, profile: any, done: (arg0: null, arg1: { profile: any; accessToken: any; refreshToken: any; }) => void) => {
      done(null, { profile, accessToken, refreshToken });
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_CLIENT_ID,
      clientSecret: FACEBOOK_CLIENT_SECRET,
      callbackURL: `${BACKEND_ORIGIN}/auth/facebook/callback`,
      scope: ["email"],
    },
    (accessToken: any, refreshToken: any, profile: any, done: (arg0: null, arg1: { profile: any; accessToken: any; refreshToken: any; }) => void) => {
      done(null, { profile, accessToken, refreshToken });
    }
  )
);

export default passport;
