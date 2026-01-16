
import stripe from "stripe";
import Booking from '../models/Booking.js';
import { inngest } from "../inngest/index.js";

export const stripeWebhooks = async (request, response) => {
    try {
        const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
        const sig = request.headers["stripe-signature"];


        let event;

        try {
            event = stripeInstance.webhooks.constructEvent(
                request.body, 
                sig, 
                process.env.STRIPE_WEBHOOK_SECRET
            );
            console.log("Event verified:", event.type); // DEBUG
        } catch (error) {
            console.error("⚠️ Webhook signature verification failed:", error.message);
            return response.status(400).send(`Webhook Error: ${error.message}`);
        }

        try {
            switch (event.type) {
                case "payment_intent.succeeded": {
                    
                    
                    const paymentIntent = event.data.object;
                   
                    
                    const sessionList = await stripeInstance.checkout.sessions.list({
                        payment_intent: paymentIntent.id,
                        limit: 1
                    });

                    if (sessionList.data.length === 0) {
                      
                        return response.json({ received: true, message: "No session found" });
                    }

                    const session = sessionList.data[0];
                    const { bookingId } = session.metadata;

                    console.log("Booking ID from metadata:", bookingId);

                    // Check if booking exists
                    const booking = await Booking.findById(bookingId);

                    if (!booking) {
                        console.log(`⚠️ Booking ${bookingId} not found (may have been deleted after 10 min timeout)`);
                        // Booking was deleted due to timeout
                        return response.json({ 
                            received: true, 
                            message: "Booking expired - payment was too late" 
                        });
                    }

                    // Update booking to paid
                    booking.isPaid = true;
                    booking.paymentLink = "";
                    await booking.save();

                    console.log(`Booking ${bookingId} marked as paid`);

                    // Send confirmation email
                    await inngest.send({
                        name: "app/show.booked",
                        data: { bookingId: bookingId }
                    });

                    console.log(` Confirmation email triggered for booking ${bookingId}`);
                    
                    break;
                }
            
                case "checkout.session.completed": {
                    console.log("Processing checkout.session.completed");
                    
                    const session = event.data.object;
                    const { bookingId } = session.metadata;

                    console.log("Booking ID:", bookingId);

                    const booking = await Booking.findById(bookingId);

                    if (!booking) {
                        console.log(`Booking ${bookingId} not found`);
                        return response.json({ 
                            received: true, 
                            message: "Booking not found" 
                        });
                    }

                    booking.isPaid = true;
                    booking.paymentLink = "";
                    await booking.save();

                    console.log(`Booking ${bookingId} marked as paid`);

                    await inngest.send({
                        name: "app/show.booked",
                        data: { bookingId: bookingId }
                    });

                    console.log(` Email sent for booking ${bookingId}`);
                    
                    break;
                }
            
                default:
                    console.log('Unhandled event type:', event.type);
            }
            
            return response.json({ received: true });
        } catch (err) {
            console.error("❌ Webhook processing error:", err);
            return response.status(500).json({ 
                error: "Webhook processing failed",
                message: err.message 
            });
        }
    } catch (err) {
        console.error("❌ Fatal webhook error:", err);
        return response.status(500).send("Internal Server Error");
    }
};