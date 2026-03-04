import express from "express";
import { checkout, getCheckout } from "../controllers/checkout.controller.js";
import { auth } from "../middlewares/auth.middlewares.js";


const router = express.Router();

router.post("/", auth, checkout)
router.get("/", auth, getCheckout)

export default router;