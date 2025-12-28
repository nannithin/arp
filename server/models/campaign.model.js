import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    channelName: {
      type: String,
      required: true,
      trim: true,
    },

    channelUrl: {
      type: String,
      required: true,
    },

    channelDescription: {
      type: String,
      trim: true,
    },

    channelId: {
      type: String, 
    },

    planName: {
      type: String,
      required: true, 
    },

    planPrice: {
      type: Number,
    },

    status: {
      type: String,
      enum: ["pending", "active", "paused", "completed"],
      default: "active",
    },

    subscribers: {
      type: Number,
      default: 0,
    },

    startDate: {
      type: Date,
      default: Date.now,
    },

    

    stripeSessionId: {
      type: String,
    },
  },
  {
    timestamps: true, 
  }
);

export default mongoose.model("Campaign", campaignSchema);
