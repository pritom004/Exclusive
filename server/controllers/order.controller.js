import Order from "../models/order.model.js";

export const getOrders = async (req, res) => {
  try {
    const userId = req.userId;

    const orders = await Order.find({ userId }).populate({
      path: "items.productId",
      select: "_id name"
    });

    return res.json({
      orders,
    });
  } catch (error) {
    return res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message
    })
  }
};
