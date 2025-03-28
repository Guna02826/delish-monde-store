import { Schema, model } from "mongoose";
import Product from "./productModel.js";

const orderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Customer placing order
  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true, default: 0 },
  status: {
    type: String,
    enum: ["Pending", "Completed"],
    default: "Pending",
  },
  createdAt: { type: Date, default: Date.now },
});

const Order = model("Order", orderSchema);
export default Order;
