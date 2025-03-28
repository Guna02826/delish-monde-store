import express, { json } from "express";
import connectDB from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();

import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

const app = express();

// Middleware

console.log("Allowed CORS Origin:", process.env.CLIENT_URL);

app.use(json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL, // Allow only this frontend
    credentials: true, // Allow cookies/auth headers
  })
);

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/users", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/payment", paymentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
