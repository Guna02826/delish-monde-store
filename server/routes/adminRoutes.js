import { Router } from "express";
const router = Router();
import verifyToken from "../middleware/verifyAdmin.js";

router.get("/", verifyToken, (req, res) => {
  if (!req.user.isAdmin) return res.status(403).json({ msg: "Access denied" });
  res.json({ msg: "Welcome, Admin!" });
});

export default router;
