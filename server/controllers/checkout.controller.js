import Cart from "../models/cart.model.js";
import Checkout from "../models/checkout.model.js";
import { createCheckout } from "../services/checkout.service.js";
import { stripe } from "../utils/stripe.js";
import Order from "../models/order.model.js";

export const checkout = async (req, res) => {
  const { cartId, productId, quantity, color, size } = req.body;

  try {
    const checkout = await createCheckout(req.userId);

    // If direct product checkout
    if (productId && quantity) {
      // Find product to get price and details securely
      const mongoose = (await import('mongoose')).default;
      const Product = mongoose.model('Product');
      const product = await Product.findById(productId);
      
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      checkout.items = [{
        productId: product._id,
        quantity: quantity,
        name: product.name,
        image: product.images[0] || {},
        size: size || "",
        color: color || "",
        price: product.price,
        subTotal: product.price * quantity
      }];
      checkout.totalPrice = product.price * quantity;
      checkout.shippingCost = 0; // Or whatever default shipping cost
      
      await checkout.save();
      return res.json(checkout);
    }

    // Otherwise, checkout from cart
    if (!cartId) {
      return res.status(400).json({ message: "Invalid cart or product details" });
    }

    const cart = await Cart.findById(cartId);

    if (!cart) {
      return res.status(400).json({ message: "Invalid cart" });
    }

    checkout.items = cart.items; // Overwrite items with current cart
    checkout.totalPrice = cart.totalPrice;
    checkout.shippingCost = cart.shippingCost || 0;
    
    await checkout.save();
    await Cart.findByIdAndDelete(cartId);

    res.json(checkout);
  } catch (error) {
    res.status(500).json({
      message: "Error creating checkout",
      error: error.message,
    });
  }
};

export const getCheckout = async (req, res) => {
  const userId = req.userId;

  try {
    const checkout = await createCheckout(userId);

    res.json(checkout);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching checkout",
      error: error.message,
    });
  }
};

export const createPaymentIntent = async (req, res) => {
  const { checkoutId, fullName, companyName, streetAddress, secondAddress, city, phoneNumber, email } = req.body;

  

  try {


    if(!fullName || !email || !phoneNumber || !streetAddress || !city){
      return res.status(400).json({
        message: "Enter the required fields"
      })
    }


    const checkout = await Checkout.findById(checkoutId);

    

    if (!checkout) {
      return res.status(400).json({
        message: "Checkout not found!",
      });
    }

  const order = new Order({
      fullName,
      companyName,
      email,
      phoneNumber,
      city,
      secondAddress,
      streetAddress,
      totalPrice: checkout.totalPrice,
      userId: req.userId,
      items: checkout.items,
    })

  

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(checkout.totalPrice * 100),
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        orderId: order._id.toString(),
      },
    });

    order.paymentIntentId = paymentIntent.id
    await order.save()

    await Checkout.findByIdAndDelete(checkout._id);

    res.send({
      clientSecret: paymentIntent.client_secret,
    })
  } catch (error) {
    res.status(500).json({
      message: "Payment Intent Error",
      error: error.message,
    });
  }
};
