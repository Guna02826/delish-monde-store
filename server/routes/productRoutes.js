import { Router } from "express";
const router = Router();

import { getCakes } from "../controllers/productController.js";

router.get("/cakes", getCakes);

export default router;
