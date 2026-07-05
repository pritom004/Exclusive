import helmet from "helmet";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import passport from "./queries/passport.js";
import passportRoute from "./routes/passport.route.js";

import cookieParser from "cookie-parser";
dotenv.config();

import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import checkoutRoutes from "./routes/checkout.routes.js";
import orderRoutes from "./routes/order.routes.js";
import { stripeWebhook } from "./webhooks/stripe.webhook.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

// Stripe Webhook needs raw body
app.post("/webhook", express.raw({ type: "application/json" }), stripeWebhook);

//Middlewares
app.use(express.json());
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use(passport.initialize());

//Routes
app.get("/", (req, res) => {
  res.send("Hello world");
});
app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/items", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/auth", passportRoute); // Fixed prefix

// Global Error Handler
app.use(errorHandler);

connectDB().then(() => {
  console.log("Database Connected Successfully");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/`);
});
