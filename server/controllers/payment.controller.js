import stripe from "../config/stripe.js";
import User from "../models/user.model.js";

export const createCheckoutSession = async (req, res) => {
  try {
    const {
      plan,
      channelName,
      channelDescription,
      channelUrl,
      subscribers
    } = req.body;

    const priceMap = {
      Starter: 75000,
      Intro: 140000,
      Popular: 200000,
      Enterprise: 250000,
    };

    const user = await User.findById(req.user.id);

    let customerId = user.stripeCustomerId;

    // 🔹 Create Stripe customer only once
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name,
      });

      customerId = customer.id;
      user.stripeCustomerId = customerId;
      await user.save();
    }

    

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer: customerId,

      metadata: {
        userId: user._id.toString(),
        plan,
        channelName,
        channelDescription,
        channelUrl,
        subscribers: subscribers.toString(), 
      },

      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${plan} SEO Plan`,
            },
            unit_amount: priceMap[plan],
          },
          quantity: 1,
        },
      ],

      success_url: "https://mygrono.com/dashboard?payment=success",
      cancel_url: "https://mygrono.com/seo-plans?payment=cancel",
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Stripe session failed" });
  }
};
