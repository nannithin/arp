import campaignModel from "../models/campaign.model";

export const getUserCampaigns = async (req, res) => {
  const campaigns = await campaignModel.find({ user: req.user._id })
    .sort({ createdAt: -1 });

  res.json(campaigns);
};
