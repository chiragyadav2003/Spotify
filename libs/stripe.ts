import Stripe from "stripe";

const stripe = new Stripe(
    process.env.STRIPE_SECRET_KEY!,
    {
        typescript: true,
        apiVersion: "2024-04-10",
        appInfo: {
            name: "Spotify music player",
            version: "0.1.0"
        }
    }
);