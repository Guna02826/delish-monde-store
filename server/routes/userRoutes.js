import { Router } from "express"; // Use require
const router = Router();

import { registerUser, loginUser, getUserProfile, logoutUser } from "../controllers/userController.js";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", getUserProfile);
router.delete("/logout", logoutUser);

export default router; // Use module.exports
