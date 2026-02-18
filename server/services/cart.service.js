import Cart from "../models/cart.model.js"
export const createCart = async (userId, guestId) => {
    if(!userId && !guestId){
        throw new Error("Invalid details")
    }

    const cart = new Cart({userId, guestId})
    await cart.save();

    return cart;
}