import passport from "passport";
import {Strategy as GoogleStrategy} from "passport-google-oauth20";
import dotenv from "dotenv";


import User from "../models/user.model.js";

dotenv.config()



passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
    try {
            const googleId = profile.id;
        let user = await User.findOneAndUpdate({googleId})  
        if(!user){
          user = await User.create({
            googleId,
            email: profile.emails[0].value,
            avatar: profile.photos[0].value
          })
        }

        return done(null, user)

    } catch (error) {
      console.log("Debug: Error at passport.js", error.message)
       return done(error, undefined);
    }
}))

export default passport;


