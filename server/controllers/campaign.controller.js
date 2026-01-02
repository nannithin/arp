import { PLANS } from "../config/plans.js";
import campaignModel from "../models/campaign.model.js";
import paymentModel from "../models/payment.model.js";

export const getUserCampaigns = async (req, res) => {
  try {

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }


    const campaigns = await campaignModel
      .find({ user: req.user.id })
      .sort({ createdAt: -1 });

    res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch campaigns" });
  }
};

export const getUserPayments = async (req, res) => {
  

  try {

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }


    const info = await paymentModel
      .findOne({ user: req.user.id })

    if (!info) {
      return res.json(null);
    }

    const plan = PLANS[info.plan];

    if (!plan) {
      return res.status(400).json({ message: "Invalid plan" });
    }

    const startDate = info.createdAt;
    const renewAt = new Date(startDate);
    renewAt.setMonth(renewAt.getMonth() + plan.duration);

    res.status(200).json({
      ...info.toObject(),
      duration: plan.duration,
      displayPrice: `$ ${info.amount} / ${plan.duration} Months`,
      renewAt,
    });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ message: "Failed to fetch campaigns" });
  }
};