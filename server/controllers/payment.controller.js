import stripe from "../config/stripe.js";
import User from "../models/user.model.js";

export const createCheckoutSession = async (req, res) => {
    try {
        const { plan } = req.body;

        const priceMap = {
            Starter: 1000,
            Intro: 1900,
            Popular: 4500,
            Enterprise: 9000,
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
                plan,
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

            success_url: "http://localhost:3000/dashboard?payment=success",
            cancel_url: "http://localhost:3000/pricing?payment=cancel",
        });


        res.json({ url: session.url });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Stripe session failed" });
    }
};
