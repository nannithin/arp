import express from "express";
import { protect } from "../middlewares/auth.middleware.js" 
import { capturePayPalOrder, createPayPalOrder } from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/create-order", protect, createPayPalOrder);
router.post("/capture-order", protect, capturePayPalOrder);

export default router;
