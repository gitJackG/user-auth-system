import "express-session";

declare module "express-session" {
  interface SessionData {
    userId?: string;       // your login session
    oauthState?: string;   // used for oauth
    oauthNonce?: string;   // used for oauth
  }
}
