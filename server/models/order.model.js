import mongoose from "mongoose";

const orderItemsSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },    name: String,
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

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    fullName: String,
    email: {
        type: String,
        trim: true,
        required: true
    },
    companyName: String,
    phoneNumber: {
        type: String,
        required: true
    },
    paymentIntentId: {
        type: String
    },
    city: {
      type: String,
      required: true
    },
    secondAddress: String,
    paymentStatus: {
        type: String,
        enum: ["paid", "unpaid"],
        default: "unpaid"
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    items: [orderItemsSchema],
    orderStatus: {
        type: String,
        enum: ["processing", "shipped", "delivered"],
        default: "processing"
    },
    streetAddress: {
      type: String
    }
}, {timestamps: true});


const Order = mongoose.model("Order", orderSchema);
export default Order;