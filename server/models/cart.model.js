import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    name: String,
     image: {
    url: String,
    alt: String,
  },
    size: String,
    color: String,
    price: {
      type: Number,
      required: true,
    },
    subTotal: {
      type: Number,
      required: true,
    },
  },
  { _id: false },
);

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    guestId: String,
    totalPrice: {
      type: Number,
      default: 0,
    },
    shippingCost: Number,
    items: [cartItemSchema],
  },
  { timestamps: true },
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
