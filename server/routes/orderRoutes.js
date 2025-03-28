import { Router } from "express";
const router = Router();
import {
  newOrder,
  getOrders,
  cancelOrder,
} from "../controllers/orderController.js";
import {authMiddleware} from "../middleware/authMiddleware.js"; // JWT Authentication Middleware
//import calculateTotalAmount from "../middleware/totalAmount.js"; // Calculate Total Amount Middleware

// Place a New Order (Customer)
router.post("/", authMiddleware, newOrder);

// Get Orders for Logged-In User (Customer)
router.get("/my-orders", authMiddleware, getOrders);

// Cancel Order (Customer Only)
router.put("/:orderId/cancel", authMiddleware, cancelOrder);

export default router;
