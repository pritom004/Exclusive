import Cart from "../models/cart.model.js";
export const createCart = async (userId, guestId) => {

  
  if (!userId && !guestId) {
    throw new Error("Invalid details");
  }

  const query = userId ? { userId } : { guestId };

  let cart = await Cart.findOne(query);

  if (!cart) {
    cart = new Cart(query);
    await cart.save();
  }

  return cart;
};