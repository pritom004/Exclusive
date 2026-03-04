import mongoose from "mongoose";

const checkoutItems = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
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

const checkoutSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    totalPrice: {
        type: Number,
        default: 0
    },
    shippingCost: {
        type: Number,
        default: 0
    },
    items: [checkoutItems]
}, {timestamps: true});

const Checkout = mongoose.model("Checkout", checkoutSchema);
export default Checkout;