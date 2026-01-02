// import stripe from "../config/stripe.js";
// import User from "../models/user.model.js";
// import Payment from "../models/payment.model.js";
// import Campaign from "../models/campaign.model.js";

// export const handleStripeWebhook = async (req, res) => {
//   const sig = req.headers["stripe-signature"];
//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(
//       req.body,
//       sig,
//       process.env.STR_NEW // webhook signing secret
//     );
//   } catch (err) {
//     console.error("❌ Webhook signature verification failed:", err.message);
//     return res.status(400).send("Webhook Error");
//   }

//   // ✅ Only handle successful checkout
//   if (event.type === "checkout.session.completed") {
//     const session = event.data.object;

//     try {
//       const customerId = session.customer;
//       const amount = session.amount_total;
//       const paymentIntentId = session.payment_intent;

//       // 🔍 Find user
//       const user = await User.findOne({ stripeCustomerId: customerId });
//       if (!user) {
//         console.error("❌ User not found for customer:", customerId);
//         return res.status(404).send("User not found");
//       }

//       // 🛑 Prevent duplicate webhook processing
//       const existingCampaign = await Campaign.findOne({
//         stripeSessionId: session.id,
//       });

//       if (existingCampaign) {
//         console.log("⚠️ Webhook already processed:", session.id);
//         return res.status(200).json({ received: true });
//       }

//       // 💳 Create payment record
//       const payment = await Payment.create({
//         user: user._id,
//         stripeSessionId: session.id,
//         stripePaymentIntentId: paymentIntentId,
//         amount,
//         plan: session.metadata.plan,
//         status: "SUCCESS",
//       });

//       // 🚀 Create campaign
//       await Campaign.create({
//         user: user._id,
//         channelName: session.metadata.channelName,
//         channelDescription: session.metadata.channelDescription,
//         channelUrl: session.metadata.channelUrl,
//         planName: session.metadata.plan,
//         subscribers: Number(session.metadata.subscribers || 0),
//         stripeSessionId: session.id,
//         status: "active",
//         startDate: new Date(),
//       });

//       // 👤 Update user
//       user.plan = session.metadata.plan;
//       user.planExpiresAt = new Date(
//         Date.now() + 30 * 24 * 60 * 60 * 1000 // 30 days
//       );
//       user.payments.push(payment._id);
//       await user.save();

//       console.log("✅ Campaign & payment created successfully");
//     } catch (error) {
//       console.error("❌ Webhook processing error:", error);
//       return res.status(500).send("Webhook processing failed");
//     }
//   }

//   res.status(200).json({ received: true });
// };
