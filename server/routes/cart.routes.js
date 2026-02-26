import express from "express";
import { addToCart, fetchCart, removeItem, updateItem } from "../controllers/cart.controller.js";


const router = express.Router()

router.post("/add", addToCart)
router.post("/", fetchCart);
router.delete("/:productId", removeItem);
router.put("/:productId", updateItem);

export default router;