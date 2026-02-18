import { createCart } from "../services/cart.service.js";

export const addToCart = async (req, res) => {
  const { productId, name, image, color, size, price, discount, quantity, userId, guestId } =
    req.body;
  try {

    const cart = await createCart(userId, guestId);

    const realPrice =  price - (discount / price * 100);

    cart.items.push({productId, image, name, color, size, quantity, price: realPrice})
    await cart.save()

    return res.json(cart);
  } catch (error) {
    res.status(500).json({
      message: "Error creating cart",
      error: error.message,
    });
  }
};
