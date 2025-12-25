import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      select: false,
    },

    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },

    providerId: {
      type: String, // supabase user id (sub)
    },

    stripeCustomerId: {
      type: String,
    },

    plan: {
      type: String,
      default: "FREE",
    },

    planExpiresAt: {
      type: Date,
    },

    payments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment",
      },
    ],
  },
  { timestamps: true }
)

export default mongoose.model("User", userSchema)
