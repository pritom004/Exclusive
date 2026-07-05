import express from "express";
import { signup, getAccessToken, login, getUser, logout, updateProfile } from "../controllers/auth.controller.js";
import { auth } from "../middlewares/auth.middlewares.js";
import { validate } from "../middlewares/validate.middleware.js";
import { signupValidationRules, loginValidationRules, updateProfileValidationRules } from "../validations/auth.validation.js";

const router = express.Router();

router.post("/login", loginValidationRules(), validate, login);
router.get("/access-token", getAccessToken);
router.post("/signup", signupValidationRules(), validate, signup);
router.get("/me", auth, getUser)
router.post("/logout", auth, logout)
router.post("/update-profile", auth, updateProfileValidationRules(), validate, updateProfile)

export default router;