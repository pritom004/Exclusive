import Product from "../models/product.model.js";
import { createCart } from "../services/cart.service.js";

export const addToCart = async (req, res) => {
  const { productId, color, size, quantity, userId, guestId } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(400).json({ message: "Product not found!" });
    }

    const cart = await createCart(userId, guestId);

    const productIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    const realPrice =
      Number((product.price - (product.discount / 100) * product.price).toFixed(2));

    const subTotal = Number((realPrice * quantity).toFixed(2));

    if (productIndex >= 0) {
      // update existing item
      cart.items[productIndex].quantity += quantity;
      cart.items[productIndex].subTotal =
        cart.items[productIndex].quantity * realPrice;
    } else {
      // add new item
      cart.items.push({
        productId,
        image: product.images[0],
        name: product.name,
        color,
        size,
        quantity,
        price: realPrice,
        subTotal,
      });
    }

    cart.totalPrice = cart.items.reduce(
      (sum, item) => sum + item.subTotal,
      0
    );

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({
      message: "Error creating cart",
      error: error.message,
    });
  }
};

export const fetchCart = async (req, res) => {

  const {userId, guestId} = req.body;

    
  try {

   const cart = await createCart(userId, guestId);

    return res.json(cart);
  } catch (error) {
     res.status(500).json({
      message: "Error fetching cart",
      error: error.message,
    });
  }
};

export const removeItem = async (req, res) => {
  try {
    const { productId } = req.params;
    const { userId, guestId } = req.body; 


    const cart = await createCart(userId, guestId);

    const productIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (productIndex < 0) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

   
    cart.items.splice(productIndex, 1);

    cart.totalPrice = cart.items.reduce((acc, curr) => (acc += curr.subTotal), 0)

    await cart.save();

    res.status(200).json({
      message: "Item removed from cart",
      cart,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error removing item",
      error: error.message,
    });
  }
};

export const updateItem = async (req, res) => {
    const {productId} = req.params;
    const {quantity, userId, guestId} = req.body;
  try {
    const cart = await createCart(userId, guestId)


    

    const productIndex =  cart.items.findIndex(item => item.productId.toString() === productId);


      
    if(productIndex < 0){
      return res.status(404).json({
        message: "Item not found"
      })
    }

    if(quantity <= 0){
       cart.items.splice(productIndex, 1)
    }else{
      cart.items[productIndex].quantity = quantity;
      let subTotal = Math.round(cart.items[productIndex].price * quantity);
      cart.items[productIndex].subTotal = subTotal;
      cart.totalPrice = cart.items.reduce((acc, curr) => acc += curr.subTotal, 0);
    }

    await cart.save()

    return res.json(cart);

  } catch (error) {
    
  }
}