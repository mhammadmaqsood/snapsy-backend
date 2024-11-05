const stripeService = require("../services/stripe.service");
const User = require("../models/user.model");
const stripe = require("stripe");

exports.subscribe = async (req, res) => {
    try {
        const { id } = req.body;
        const user = await User.findById({ _id: req.body.id });
        if (!user) return res.status(404).json({ message: "User not found" });

        // Create Stripe customer if not already created
        if (!user.stripeCustomerId) {
            const customer = await stripeService.createStripeCustomer(user);
            user.stripeCustomerId = customer.id;
            await user.save();
        }

        // Determine priceId from query parameter (e.g ?plan=starter)
        const plan = req.query.plan;
        const priceId = plan === "starter" ? process.env.STARTER_PRICE_ID : process.env.PRO_PRICE_ID;

        const session = await stripeService.createCheckoutSession(
            priceId,
            `${process.env.BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            `${process.env.BASE_URL}/cancel`
        );

        res.json({ url: session.url });
    } catch (err) {
        console.error("Exception in subscribe controller:", err.message);
        res.status(500).json({ message: "Exception in subscribe controller" })
    }
}

exports.success = async (req, res) => {
    try {
        const session = await stripeService.retrieveCheckoutSession(req.query.session_id);
        console.log("#######################Success session: ", session)
        res.send({ message: "Subscription successful", session });
    } catch (err) {
        res.status(500).json({ message: "Exception in success controller" })
    }
}

exports.billingPortal = async (req, res) => {
    try {
        const user = await User.findById({ _id: req.body.id });
        if (!user || !user.stripeCustomerId) return res.status(404).json({ message: "User not found" });

        const portalSession = await stripeService.createBillingPortalSession(
            user.stripeCustomerId,
            process.env.BASE_URL
        );

        res.json({ url: portalSession.url });
    } catch (err) {
        res.status(500).json({ message: "Exception in billing portal controller", error: err.message })
    }
}

exports.handleWebhook = async (req, res) => {
    let event;
    try {
        const sig = req.headers["stripe-signature"];
        // Use the raw body for Stripe's signature verification
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET_KEY);

        // Process the event (handle according to your logic in stripeService)
        await stripeService.handleWebhookEvent(event);

        res.status(200).send('Webhook received successfully');
    } catch (err) {
        console.error("Error in webhook controller:", err.message);
        res.status(400).send(`Webhook Error: ${err.message}`);
    }
};

exports.correct = async (req, res) => (
    '/webhook',
    express.raw({ type: 'application/json' }),
    (req, res) => {
        let event;

        try {
            // Verify the webhook signature
            const signature = req.headers['stripe-signature'];
            event = stripe.webhooks.constructEvent(
                req.body,
                signature,
                process.env.STRIPE_WEBHOOK_SECRET_KEY
            );
        } catch (err) {
            console.log('Error in webhook controller:', err.message);
            return res.status(400).send(`Webhook Error: ${err.message}`);
        }

        // Handle the event (e.g., customer.created)
        switch (event.type) {
            case 'customer.created':
                const customer = event.data.object;
                // Handle the customer.created event
                console.log('Customer created:', customer);
                break;
            // Add cases for other event types as needed
            default:
                console.log(`Unhandled event type ${event.type}`);
        }

        res.status(200).json({ received: true });
    }
);
