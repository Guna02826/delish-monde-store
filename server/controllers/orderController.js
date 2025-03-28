import Order from "../models/orderModel.js";
import jwt from "jsonwebtoken";

//Place New Order

export const newOrder = async (req, res) => {
  try {
    console.log("User in request:", req.user);
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    const { items, totalAmount } = req.body;
    

    // Transform API request format to match schema
    const newOrder = new Order({
      userId: req.user.id, // Extracted from JWT by authMiddleware
      products: items.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
      totalPrice: totalAmount, // Matching schema field
    });

    await newOrder.save();

    res.status(201).json({
      message: "Order placed successfully!",
      order: newOrder,
    });
  } catch (error) {
    res.status(500).json({ message: "Error placing order", error: error.message });
  }
};


export const getOrders = async (req, res) => {
  try {
    if (!req.cookies.token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    // Decode token & extract user ID
    const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    const userId = decoded.id;

    console.log("Decoded User ID:", userId);

    // Fetch orders & check if they exist
    const orders = await Order.find({ userId }).populate("products.productId", "name price");

    if (!orders.length) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Error fetching user orders", error: error.message });
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const order = await findOne({
      _id: req.params.orderId,
      userId: req.user.id,
    });

    if (!order)
      return res
        .status(404)
        .json({ message: "Order not found or unauthorized" });

    if (order.status === "Shipped" || order.status === "Completed") {
      return res
        .status(400)
        .json({ message: "Order cannot be canceled at this stage" });
    }

    order.status = "Cancelled";
    await order.save();

    res.status(200).json({ message: "Order canceled successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Error canceling order", error });
  }
};
