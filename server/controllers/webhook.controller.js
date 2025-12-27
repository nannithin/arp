import stripe from "../config/stripe.js";
import User from "../models/user.model.js";
import Payment from "../models/payment.model.js";

export const handleStripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STR_NEW
    );
  } catch (err) {
    console.error("Webhook signature failed", err.message);
    return res.status(400).send(`Webhook Error`);
  }
  

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const customerId = session.customer;
    const amount = session.amount_total;
    const paymentIntentId = session.payment_intent;

    const user = await User.findOne({ stripeCustomerId: customerId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🔹 Create payment record
    const payment = await Payment.create({
      user: user._id,
      stripeSessionId: session.id,
      stripePaymentIntentId: paymentIntentId,
      amount,
      plan: session.metadata.plan,
      status: "SUCCESS",
    });

    // 🔹 Update user
    user.plan = session.metadata.plan;
    user.planExpiresAt = new Date(
      Date.now() + 30 * 24 * 60 * 60 * 1000 // 30 days
    );
    user.payments.push(payment._id);

    await user.save();
  }

  res.json({ received: true });
};
