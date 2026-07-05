import express from "express";
import { checkout, createPaymentIntent, getCheckout } from "../controllers/checkout.controller.js";
import { auth } from "../middlewares/auth.middlewares.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createPaymentIntentRules } from "../validations/checkout.validation.js";

const router = express.Router();

router.post("/", auth, checkout)
router.get("/", auth, getCheckout)
router.post("/create-payment-intent", auth, createPaymentIntentRules(), validate, createPaymentIntent)

export default router;