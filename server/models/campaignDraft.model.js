import mongoose from "mongoose";

const campaignDraftSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // one active draft per user
    },

    channelName: {
      type: String,
      required: true,
    },

    channelUrl: {
      type: String,
      required: true,
    },

    channelDescription: {
      type: String,
    },

    subscribers: {
      type: Number,
      default: 0,
    },

    plan: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("CampaignDraft", campaignDraftSchema);
