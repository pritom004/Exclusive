import express from "express";
import { getOrders } from "../controllers/order.controller.js";
import { auth } from "../middlewares/auth.middlewares.js";


const router = express.Router();

router.get("/", auth,getOrders)


export default router;