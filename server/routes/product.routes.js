import express from "express";
import { productDetails, products } from "../controllers/product.controller.js";


const router = express.Router();

router.get("/products", products);
router.get("/:productId", productDetails)


export default router;