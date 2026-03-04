import Cart from "../models/cart.model.js";
import { createCheckout } from "../services/checkout.service.js";

export const checkout = async (req, res) => {
  const { cartId } = req.body;

  try {
    if (!cartId) {
      return res.status(400).json({
        message: "Invalid cart",
      });
    }

    const cart = await Cart.findById(cartId);

    if (!cart) {
      return res.status(400).json({
        message: "Invalid cart",
      });
    }

  

    const checkout = await createCheckout(req.userId);

    checkout.items.push(...cart.items);
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
