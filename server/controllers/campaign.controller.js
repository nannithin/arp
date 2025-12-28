import campaignModel from "../models/campaign.model.js";

export const getUserCampaigns = async (req, res) => {
  try {
    console.log("req.user:", req.user);

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const campaigns = await campaignModel
      .find({ user: req.user._id })
      .sort({ createdAt: -1 });

    res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch campaigns" });
  }
};
