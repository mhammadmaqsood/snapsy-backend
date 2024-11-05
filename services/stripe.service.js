const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const User = require("../models/user.model");

exports.createStripeCustomer = async (user) => {
    return await stripe.customers.create({
        email: user.email,
        name: user.name
    })
}

exports.createCheckoutSession = async (priceId, successUrl, cancelUrl) => {
    return await stripe.checkout.sessions.create({
        mode: "subscription",
        line_items: [{ price: priceId, quantity: 1 }],
        success_url: successUrl,
        cancel_url: cancelUrl
    })
}

exports.retrieveCheckoutSession = async (sessionId) => {
    return await stripe.checkout.sessions.retrieve(sessionId);
}

exports.createBillingPortalSession = async (customerId, returnUrl) => {
    return await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: returnUrl
    })
}

exports.handleWebhookEvent = async (event) => {
    switch (event.type) {
        case "checkout.session.completed":
            const session = event.data.object;
            const customerId = session.customer;
            const user = await User.findOne({ email: session.customer_details.email });
            if (user) {
                user.stripeCustomerId = customerId;
                user.subscriptionStatus = "active";
                await user.save();
            }
            break;
        case "invoice.paid":
            console.log("Subscription payment received.");
            break;
        case "customer.subscription.updated":
            console.log("Subscription updated.");
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }
}