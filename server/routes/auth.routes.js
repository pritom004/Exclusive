import express from "express";
import { signup, getAccessToken, login, getUser, logout, updateProfile } from "../controllers/auth.controller.js";
import { auth } from "../middlewares/auth.middlewares.js";


const router = express.Router();


router.post("/login", login);
router.get("/access-token", getAccessToken);
router.post("/signup", signup);
router.get("/me", auth, getUser)
router.post("/logout", auth, logout)
router.post("/update-profile", auth, updateProfile)


export default router;