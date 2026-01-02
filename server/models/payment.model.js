import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    // 🔐 Who paid
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // 🏦 Payment provider
    provider: {
      type: String,
      enum: ["stripe", "paypal"],
      required: true,
    },

    // 🔑 Unique transaction reference (Stripe OR PayPal)
    transactionId: {
      type: String,
      required: true,
      unique: true,
    },

    // 💰 Amount info
    amount: {
      type: Number,
      required: true, // cents for Stripe, decimal for PayPal
    },

    currency: {
      type: String,
      default: "USD",
    },

    // 📦 Plan info
    plan: {
      type: String,
      required: true,
    },

    // 📊 Status
    status: {
      type: String,
      enum: ["PENDING", "SUCCESS", "FAILED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
