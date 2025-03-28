import Product from '../models/productModel.js';

//get all cakes
export const getCakes = async (req, res) => {
  try {
    const cakes = await Product.find();
    res.json(cakes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
