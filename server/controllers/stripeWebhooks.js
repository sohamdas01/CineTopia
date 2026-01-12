// import stripe from "stripe";
// import Booking from '../models/Booking.js'
// import { inngest } from "../inngest/index.js";

// export const stripeWebhooks = async (request, response)=>{
//     const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
//     const sig = request.headers["stripe-signature"];

//     let event;

//     try {
//         event = stripeInstance.webhooks.constructEvent(request.body, sig, process.env.STRIPE_WEBHOOK_SECRET)
//     } catch (error) {
//         return response.status(400).send(`Webhook Error: ${error.message}`);
//     }

//     try {
//         switch (event.type) {
//             case "payment_intent.succeeded": {
//                 const paymentIntent = event.data.object;
//                 const sessionList = await stripeInstance.checkout.sessions.list({
//                     payment_intent: paymentIntent.id
//                 })

//                 const session = sessionList.data[0];
//                 const { bookingId } = session.metadata;

//                 await Booking.findByIdAndUpdate(bookingId, {
//                     isPaid: true,
//                     paymentLink: ""
//                 })

//                  // Send Confirmation Email
//                  await inngest.send({
//                     name: "app/show.booked",
//                     data: {bookingId}
//                  })
                
//                 break;
//             }
        
//             default:
//                 console.log('Unhandled event type:', event.type)
//         }
//         response.json({received: true})
//     } catch (err) {
//         console.error("Webhook processing error:", err);
//         response.status(500).send("Internal Server Error");
//     }
// }

// import stripe from 'stripe';
// import Booking from '../models/Booking.js';
// import { inngest } from '../inngest/index.js';

// const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

// export const stripeWebhooks = async (req, res) => {
//     const sig = req.headers['stripe-signature'];

//     let event;

//     try {
//         event = stripeInstance.webhooks.constructEvent(
//             req.body,
//             sig,
//             process.env.STRIPE_WEBHOOK_SECRET
//         );
//     } catch (err) {
//         console.error('❌ Webhook signature verification failed:', err.message);
//         return res.status(400).send(`Webhook Error: ${err.message}`);
//     }

//     // Handle the event
//     switch (event.type) {
//         case 'checkout.session.completed':
//             const session = event.data.object;
//             const bookingId = session.metadata.bookingId;

//             console.log('💳 Payment completed for booking:', bookingId);

//             // ✅ Update booking in MongoDB
//             await Booking.findByIdAndUpdate(bookingId, { isPaid: true });

//             // Send confirmation email via Inngest
//             await inngest.send({
//                 name: 'app/show.booked',
//                 data: { bookingId }
//             });

//             console.log('✅ Booking marked as paid and email queued');
//             break;

//         case 'checkout.session.expired':
//             const expiredSession = event.data.object;
//             const expiredBookingId = expiredSession.metadata.bookingId;
            
//             console.log('⏰ Payment session expired for booking:', expiredBookingId);
//             break;

//         default:
//             console.log(`ℹ️ Unhandled event type: ${event.type}`);
//     }

//     res.json({ received: true });
// };
// import stripe from 'stripe';
// import Booking from '../models/Booking.js';
// import { inngest } from '../inngest/index.js';

// const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

// export const stripeWebhooks = async (req, res) => {
//   const sig = req.headers['stripe-signature'];
//   let event;

//   try {
//     event = stripeInstance.webhooks.constructEvent(
//       req.body,
//       sig,
//       process.env.STRIPE_WEBHOOK_SECRET
//     );
//   } catch (err) {
//     return res.status(400).send(`Webhook Error: ${err.message}`);
//   }

//   switch (event.type) {
//     case 'checkout.session.completed':
//       const session = event.data.object;
//       const bookingId = session.metadata.bookingId;

//       await Booking.findByIdAndUpdate(bookingId, { isPaid: true });

//       await inngest.send({
//         name: 'app/show.booked',
//         data: { bookingId }
//       });
//       break;

//     default:
//       break;
//   }

//   res.json({ received: true });
// };

// import stripe from "stripe";
// import Booking from '../models/Booking.js';
// import { inngest } from "../inngest/index.js";

// export const stripeWebhooks = async (request, response) => {
//     const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
//     const sig = request.headers["stripe-signature"];

//     let event;

//     try {
//         event = stripeInstance.webhooks.constructEvent(
//             request.body, 
//             sig, 
//             process.env.STRIPE_WEBHOOK_SECRET
//         );
//     } catch (error) {
//         console.error("Webhook signature verification failed:", error.message);
//         return response.status(400).send(`Webhook Error: ${error.message}`);
//     }

//     try {
//         switch (event.type) {
//             case "payment_intent.succeeded": {
//                 const paymentIntent = event.data.object;
//                 const sessionList = await stripeInstance.checkout.sessions.list({
//                     payment_intent: paymentIntent.id
//                 });

//                 const session = sessionList.data[0];
//                 const { bookingId } = session.metadata;

//                 // Check if booking still exists (might have been deleted after 10 min)
//                 const booking = await Booking.findById(bookingId);

//                 if (!booking) {
//                     console.log(`Booking ${bookingId} was already deleted (payment too late)`);
//                     // Booking was deleted due to 10-minute timeout
//                     // You might want to refund the customer here or log it
//                     return response.json({ 
//                         received: true, 
//                         message: "Booking expired - seats were released" 
//                     });
//                 }

//                 // Update booking to paid
//                 await Booking.findByIdAndUpdate(bookingId, {
//                     isPaid: true,
//                     paymentLink: ""
//                 });

//                 console.log(`Payment confirmed for booking ${bookingId}`);

//                 // Send Confirmation Email
//                 await inngest.send({
//                     name: "app/show.booked",
//                     data: { bookingId }
//                 });
                
//                 break;
//             }
        
//             default:
//                 console.log('Unhandled event type:', event.type);
//         }
        
//         response.json({ received: true });
//     } catch (err) {
//         console.error("Webhook processing error:", err);
//         response.status(500).send("Internal Server Error");
//     }
// };

import stripe from "stripe";
import Booking from '../models/Booking.js';
import { inngest } from "../inngest/index.js";

export const stripeWebhooks = async (request, response) => {
    try {
        const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
        const sig = request.headers["stripe-signature"];

        console.log("Webhook received"); // DEBUG
        console.log("Signature:", sig); // DEBUG

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
                    console.log("Processing payment_intent.succeeded");
                    
                    const paymentIntent = event.data.object;
                    console.log("Payment Intent ID:", paymentIntent.id);
                    
                    const sessionList = await stripeInstance.checkout.sessions.list({
                        payment_intent: paymentIntent.id,
                        limit: 1
                    });

                    if (sessionList.data.length === 0) {
                        console.log("No session found for payment intent");
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

                    console.log(`✅ Booking ${bookingId} marked as paid`);

                    // Send confirmation email
                    await inngest.send({
                        name: "app/show.booked",
                        data: { bookingId: bookingId }
                    });

                    console.log(`✅ Confirmation email triggered for booking ${bookingId}`);
                    
                    break;
                }
            
                case "checkout.session.completed": {
                    console.log("Processing checkout.session.completed");
                    
                    const session = event.data.object;
                    const { bookingId } = session.metadata;

                    console.log("Booking ID:", bookingId);

                    const booking = await Booking.findById(bookingId);

                    if (!booking) {
                        console.log(`⚠️ Booking ${bookingId} not found`);
                        return response.json({ 
                            received: true, 
                            message: "Booking not found" 
                        });
                    }

                    booking.isPaid = true;
                    booking.paymentLink = "";
                    await booking.save();

                    console.log(`✅ Booking ${bookingId} marked as paid`);

                    await inngest.send({
                        name: "app/show.booked",
                        data: { bookingId: bookingId }
                    });

                    console.log(`✅ Email sent for booking ${bookingId}`);
                    
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