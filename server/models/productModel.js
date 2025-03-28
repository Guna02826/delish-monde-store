import { Schema, model } from "mongoose";

const ProductSchema = new Schema({
  name: { type: String, required: true },
  category: { type: [String], required: true }, // Example: Cake, Pastry, Bread
  price: { type: Number, required: true },
  stock: { type: Number, required: true, min: 0 }, // Prevent negative stock
  description: { type: String },
  image: { type: String }, // Store image URL or filename
});

const Product = model("Product", ProductSchema);

export default Product;
