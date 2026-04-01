import { Router } from "express";
import {
  registerValidation,
  loginValidationRules,
} from "../validator/auth.validator.js";
import {
  register,
  login,
  getMe,
  googleAuthCallback,
} from "../controllers/auth.controller.js";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { config } from "../config/config.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/api/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    },
  ),
);

const router = Router();

//POST /api/auth/register
router.post("/register", registerValidation, register, (res, req) => {
  res.json({ message: "Register successfully" });
});

//POST /api/auth/login
router.post("/login", loginValidationRules, login, (req, res) => {
  res.json({ message: "Login endpoint" });
});

router.get("/me", getMe, (req, res) => {
  res.json({ message: "Me endpoint" });
});

//POST /api/auth/logout
router.post("/logout", (req, res) => {
  res.json({ message: "Logout endpoint" });
});

// Route to initiate Google OAuth flow
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

// Route for Google OAuth callback yaha hame user ka data milta hay jab hum authcode exchange karte hay.
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    // Successful authentication, redirect to dashboard or home page
    console.log(req.user, "Google Auth Callback Route.");
  },
  googleAuthCallback,
);

export default router;
