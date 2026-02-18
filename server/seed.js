import mongoose from "mongoose";
import Product from "./models/product.model.js";
import dotenv from "dotenv";

dotenv.config();

// Connect to MongoDB
await mongoose.connect(process.env.DATABASE_URI);

// Random data arrays
const productNames = [
  "Classic T-Shirt",
  "Slim Fit Jeans",
  "Sports Sneakers",
  "Leather Jacket",
  "Casual Hoodie",
  "Formal Shirt",
  "Summer Shorts",
  "Running Shoes",
  "Denim Jacket",
  "Winter Sweater",
];

const descriptions = [
  "High quality product with premium materials.",
  "Comfortable and stylish design.",
  "Perfect for everyday wear.",
  "Best seller item with great reviews.",
  "Limited edition collection.",
];

const categories = ["Clothing", "Shoes", "Accessories"];
const colors = ["Red", "Blue", "Black", "White", "Green", "Gray"];
const sizes = ["S", "M", "L", "XL"];
const statuses = ["In Stock", "Out of Stock", "Not Available"];

// Helpers
const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomPrice = () => Math.floor(Math.random() * 200) + 20;
const getRandomDiscount = () => Math.floor(Math.random() * 40); // 0–39%
const getRandomQuantity = () => Math.floor(Math.random() * 50); // 0–49

const getRandomImages = () => {
  const imageCount = Math.floor(Math.random() * 2) + 4; // 4–5 images
  const images = [];

  for (let i = 0; i < imageCount; i++) {
    images.push({
      url: `https://picsum.photos/seed/${Math.random()}/500/500`,
      alt: "Product Image",
    });
  }

  return images;
};

// Generate products
const products = [];

for (let i = 0; i < 100; i++) {
  const quantity = getRandomQuantity();

  products.push({
    name: `${getRandom(productNames)} ${i + 1}`,
    status: getRandom(statuses),
    price: getRandomPrice(),
    discount: getRandomDiscount(),
    description: getRandom(descriptions),
    category: getRandom(categories),
    colors: [...colors].sort(() => 0.5 - Math.random()).slice(0, 3),
    sizes,
    ratings: [], // empty reviews
    images: getRandomImages(),
    quantity,
  });
}

// Seed function
const seedProducts = async () => {
  try {
    await Product.deleteMany();
    console.log("Old products deleted");

    await Product.insertMany(products);
    console.log("100 products inserted successfully");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedProducts();
