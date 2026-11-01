const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const Users = require("../models/userModel");

/**
 * Create Stripe Checkout Session
 * Premium: One-time payment
 */
exports.createCheckoutSession = async (req, res) => {
    try {
        // from JWT middleware
        const userEmail = req.payload;
        console.log("EMAIL FROM JWT:", req.payload);

        // check if already premium
        const user = await Users.findOne({ email: userEmail });
        if (!user) {
            return res.status(404).json("User not found");
        }

        if (user.subscriber) {
            return res.status(400).json("User already has Premium access");
        }

        // create checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: [
                {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: "FilmPulse Premium",
                            description: "Unlock all premium features",
                        },
                        unit_amount: 4900
                    },
                    quantity: 1,
                },
            ],
            success_url: 'http://localhost:5173/payment-success',
            cancel_url: 'http://localhost:5173/payment-error',
            metadata: {
                email: userEmail,
            },
        });

        res.status(200).json({
            message: "Checkout session created",
            url: session.url,
        });

    } catch (error) {
        res.status(500).json({
            message: "Stripe checkout failed",
            error: error.message,
        });
    }
};



exports.activatePremium = async (req, res) => {
    try {
        const userEmail = req.user.userMail;

        const user = await Users.findOne({ email: userEmail });
        console.log("REQ.USER:", req.user);
        console.log("EMAIL USED:", req.user?.userMail);

        if (!user) {
            return res.status(404).json("User not found");
        }

        if (user.subscriber) {
            return res.status(400).json("Already a premium user");
        }

        user.subscriber = true;
        await user.save();

        res.status(200).json({
            message: "Premium activated successfully",
            subscriber: true
        });

    } catch (error) {
        res.status(500).json(error.message);
    }
};
