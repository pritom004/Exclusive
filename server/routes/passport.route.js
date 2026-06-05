import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { signToken } from "../services/auth.service.js";
import User from "../models/user.model.js";

const router = express.Router();

router.get("/google", 
  passport.authenticate("google", {
    scope: ["profile", "email"]
}));

router.get("/google/callback", 

passport.authenticate("google", {session: false,}), async (req, res) => {
    try {
       const token = await signToken({ id: req.user._id });

    res.cookie("refresh_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

     const user = await User.findOne({email: req.user.email});

    user.refreshToken = token;
    await user.save()

    res.redirect(`${process.env.CLIENT_URL}/`)
    } catch (error) {
        console.error("Google login error: ", error.message)
         res.redirect(`${process.env.CLIENT_URL}/login`)
    }
})



export default router;


