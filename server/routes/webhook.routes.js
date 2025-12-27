import express from "express";
import { handleStripeWebhook } from "../controllers/webhook.controller.js";

const router = express.Router();

// Stripe needs RAW body
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  handleStripeWebhook
);

export default router;
