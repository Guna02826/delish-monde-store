import jwt from "jsonwebtoken";
const { verify } = jwt;
import isAdmin from "../models/userModel.js";
import user from "../models/userModel.js";
import dotenv from "dotenv";
dotenv.config();


const verifyAdmin = (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = verify(token, process.env.ACCESS_TOKEN); // Same key as login
    if (!decoded) return res.status(401).json({ message: "Unauthorized" });

    if (!decoded.isAdmin)
      return res.status(403).json({ message: "Access denied" });

    req.user = decoded; // Attach user data
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export default verifyAdmin;
