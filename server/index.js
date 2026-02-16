import helmet from "helmet";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import cookieParser from "cookie-parser";
dotenv.config();



import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js"
import Product from "./models/product.model.js";

const app = express();


//Middlewares
app.use(express.json());
app.use(helmet());
app.use(cors({origin: 'http://localhost:5173', credentials: true}))
app.use(cookieParser())

//Routes
app.get("/", (req, res) => {
    res.send("Hello world")
});
app.use("/api/auth", authRoutes)
app.use("/api/product", productRoutes)
app.use("/api/items", cartRoutes)



connectDB().then(() => {
    console.log("Database Connected Successfully");
})


// async function getProducts(){
//     const products = await Product.find().limit(12);
//     console.log(products.length);
// }

// getProducts()

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}/`);
})