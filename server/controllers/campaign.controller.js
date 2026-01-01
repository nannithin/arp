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
  const PLAN_MAP = {
    750: { duration: 3, name: "Starter" },
    1400: { duration: 6, name: "Intro" },
    2000: { duration: 9, name: "Popular" },
    2500: { duration: 12, name: "Enterprise" },
  };

  try {

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }


    const info = await paymentModel
      .findOne({ user: req.user.id })

    if (!info) {
      return res.json(null);
    }
    const plan = PLAN_MAP[info.amount];
    if (!plan) {
      return res.status(400).json({ message: "Invalid plan amount" });
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