// import stripe from "../config/stripe.js";
// import User from "../models/user.model.js";

// export const createCheckoutSession = async (req, res) => {
//   try {
//     const {
//       plan,
//       channelName,
//       channelDescription,
//       channelUrl,
//       subscribers
//     } = req.body;

//     const priceMap = {
//       Starter: 75000,
//       Intro: 140000,
//       Popular: 200000,
//       Enterprise: 250000,
//     };

//     const user = await User.findById(req.user.id);

//     let customerId = user.stripeCustomerId;

//     // 🔹 Create Stripe customer only once
//     if (!customerId) {
//       const customer = await stripe.customers.create({
//         email: user.email,
//         name: user.name,
//       });

//       customerId = customer.id;
//       user.stripeCustomerId = customerId;
//       await user.save();
//     }



//     const session = await stripe.checkout.sessions.create({
//       mode: "payment",
//       customer: customerId,

//       metadata: {
//         userId: user._id.toString(),
//         plan,
//         channelName,
//         channelDescription,
//         channelUrl,
//         subscribers: subscribers.toString(), 
//       },

//       line_items: [
//         {
//           price_data: {
//             currency: "usd",
//             product_data: {
//               name: `${plan} SEO Plan`,
//             },
//             unit_amount: priceMap[plan],
//           },
//           quantity: 1,
//         },
//       ],

//       success_url: "https://mygrono.com/dashboard?payment=success",
//       cancel_url: "https://mygrono.com/seo-plans?payment=cancel",
//     });

//     res.json({ url: session.url });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Stripe session failed" });
//   }
// };
import checkoutNodeJssdk from "@paypal/checkout-server-sdk";
import { paypalClient } from "../config/paypal.js";
import Campaign from "../models/campaign.model.js";
import Payment from "../models/payment.model.js";
import userModel from "../models/user.model.js";
import CampaignDraft from "../models/campaignDraft.model.js";


export const createPayPalOrder = async (req, res) => {
  try {
    const {
      plan,
      channelName,
      channelUrl,
      channelDescription,
      subscribers,
    } = req.body;

    await CampaignDraft.findOneAndUpdate(
      { user: req.user.id },
      {
        user: req.user.id,
        channelName,
        channelUrl,
        channelDescription,
        subscribers,
        plan,
      },
      { upsert: true, new: true }
    );

    const selectedPlan = PLANS[plan];
    if (!selectedPlan) {
      return res.status(400).json({ message: "Invalid plan" });
    }


    const request = new checkoutNodeJssdk.orders.OrdersCreateRequest();
    request.prefer("return=representation");

    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          reference_id: req.user.id.toString(),
          amount: {
            currency_code: "usd",
            value: selectedPlan.price.toFixed(2),
          },
        },
      ],
    });

    const order = await paypalClient.execute(request);

    res.json({ orderId: order.result.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create PayPal order" });
  }
};


import { PLANS } from "../config/plans.js";

export const capturePayPalOrder = async (req, res) => {
  try {
    const { orderId } = req.body;

    const request =
      new checkoutNodeJssdk.orders.OrdersCaptureRequest(orderId);

    const capture = await paypalClient.execute(request);

    const unit = capture.result.purchase_units[0];
    const captureInfo = unit.payments.captures[0];

    const userId = unit.reference_id;
    const transactionId = captureInfo.id;

    // 🔴 READ PLAN FROM USER / DRAFT
    const user = await User.findById(userId);
    const plan = user.pendingPlan;

    const selectedPlan = PLANS[plan];

    await Payment.create({
      user: userId,
      provider: "paypal",
      transactionId,
      amount: selectedPlan.price,
      currency: captureInfo.amount.currency_code,
      plan,
      status: "SUCCESS",
    });

    await Campaign.create({
      user: userId,
      channelName: draft.channelName,
      channelUrl: draft.channelUrl,
      channelDescription: draft.channelDescription,
      subscribers: draft.subscribers,
      planName: plan,
      planPrice: selectedPlan.price,
      durationMonths: selectedPlan.duration,
      status: "active",
    });

    res.json({ success: true });
  } catch (error) {
    console.error("Capture PayPal order error:", error);
    res.status(500).json({ message: "Payment capture failed" });
  }
};
