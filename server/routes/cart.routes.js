import express from "express";


const router = express.Router()

router.post("/add", addToCart)

export default router;