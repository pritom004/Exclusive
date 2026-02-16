import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  reviewerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
}, {_id:false});

const imageSchema = new mongoose.Schema({
  url: String,
  alt: String,
}, {_id: false});

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["In Stock", "Out of Stock", "Not Available"],
      default: "In Stock",
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    colors: {
      type: [String],
    },
    sizes: {
      type: [String],
    },
    discount: {
      type: Number,
      default: 0
    },
    ratings: [reviewSchema],
    images: [imageSchema],
  },
  { timestamps: true },
);

const Product = mongoose.model("Product", productSchema);
export default Product;
