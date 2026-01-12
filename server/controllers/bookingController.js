// import { inngest } from "../inngest/index.js";
// import Booking from "../models/Booking.js";
// import Show from "../models/Show.js"
// import stripe from 'stripe'


// // Function to check availability of selected seats for a movie
// const checkSeatsAvailability = async (showId, selectedSeats)=>{
//     try {
//         const showData = await Show.findById(showId)
//         if(!showData) return false;

//         const occupiedSeats = showData.occupiedSeats;

//         const isAnySeatTaken = selectedSeats.some(seat => occupiedSeats[seat]);

//         return !isAnySeatTaken;
//     } catch (error) {
//         console.log(error.message);
//         return false;
//     }
// }

// export const createBooking = async (req, res)=>{
//     try {
//         const {userId} = req.auth();
//         const {showId, selectedSeats} = req.body;
//         const { origin } = req.headers;

//         // Check if the seat is available for the selected show
//         const isAvailable = await checkSeatsAvailability(showId, selectedSeats)

//         if(!isAvailable){
//             return res.json({success: false, message: "Selected Seats are not available."})
//         }

//         // Get the show details
//         const showData = await Show.findById(showId).populate('movie');

//         // Create a new booking
//         const booking = await Booking.create({
//             user: userId,
//             show: showId,
//             amount: showData.showPrice * selectedSeats.length,
//             bookedSeats: selectedSeats
//         })

//         selectedSeats.map((seat)=>{
//             showData.occupiedSeats[seat] = userId;
//         })

//         showData.markModified('occupiedSeats');

//         await showData.save();

//          // Stripe Gateway Initialize
//          const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY)

//          // Creating line items to for Stripe
//          const line_items = [{
//             price_data: {
//                 currency: 'usd',
//                 product_data:{
//                     name: showData.movie.title
//                 },
//                 unit_amount: Math.floor(booking.amount) * 100
//             },
//             quantity: 1
//          }]

//          const session = await stripeInstance.checkout.sessions.create({
//             success_url: `${origin}/loading/my-bookings`,
//             cancel_url: `${origin}/my-bookings`,
//             line_items: line_items,
//             mode: 'payment',
//             metadata: {
//                 bookingId: booking._id.toString()
//             },
//             expires_at: Math.floor(Date.now() / 1000) + 30 * 60, // Expires in 30 minutes
//          })

//          booking.paymentLink = session.url
//          await booking.save()

//          // Run Inngest Sheduler Function to check payment status after 10 minutes
//          await inngest.send({
//             name: "app/checkpayment",
//             data: {
//                 bookingId: booking._id.toString()
//             }
//          })

//          res.json({success: true, url: session.url})

//     } catch (error) {
//         console.log(error.message);
//         res.json({success: false, message: error.message})
//     }
// }

// export const getOccupiedSeats = async (req, res)=>{
//     try {
        
//         const {showId} = req.params;
//         const showData = await Show.findById(showId)

//         const occupiedSeats = Object.keys(showData.occupiedSeats)

//         res.json({success: true, occupiedSeats})

//     } catch (error) {
//         console.log(error.message);
//         res.json({success: false, message: error.message})
//     }
// }

// import { inngest } from "../inngest/index.js";
// import Booking from "../models/Booking.js";
// import Show from "../models/Show.js";
// import User from "../models/User.js";
// import stripe from 'stripe';

// /* ================================
//    CHECK SEATS AVAILABILITY
// ================================ */
// const checkSeatsAvailability = async (showId, selectedSeats) => {
//     try {
//         const showData = await Show.findById(showId);
//         if (!showData) return false;

//         const occupiedSeats = showData.occupiedSeats;
//         const isAnySeatTaken = selectedSeats.some(seat => occupiedSeats[seat]);

//         return !isAnySeatTaken;
//     } catch (error) {
//         console.error("Check seats error:", error.message);
//         return false;
//     }
// };

// /* ================================
//    CREATE BOOKING
// ================================ */
// export const createBooking = async (req, res) => {
//     try {
//         const { userId } = req.auth();
//         const { showId, selectedSeats } = req.body;
//         const { origin } = req.headers;

//         // ✅ Verify user exists in MongoDB
//         const user = await User.findById(userId);
//         if (!user) {
//             return res.json({ 
//                 success: false, 
//                 message: "User not found. Please try logging in again." 
//             });
//         }

//         // Validate input
//         if (!showId || !selectedSeats || selectedSeats.length === 0) {
//             return res.json({ 
//                 success: false, 
//                 message: "Invalid booking data" 
//             });
//         }

//         // Check if seats are available
//         const isAvailable = await checkSeatsAvailability(showId, selectedSeats);

//         if (!isAvailable) {
//             return res.json({ 
//                 success: false, 
//                 message: "Selected seats are not available" 
//             });
//         }

//         // Get show details
//         const showData = await Show.findById(showId).populate('movie');

//         if (!showData) {
//             return res.json({ 
//                 success: false, 
//                 message: "Show not found" 
//             });
//         }

//         if (!showData.movie) {
//             return res.json({ 
//                 success: false, 
//                 message: "Movie information not found" 
//             });
//         }

//         // Create booking
//         const booking = await Booking.create({
//             user: userId,
//             show: showId,
//             amount: showData.showPrice * selectedSeats.length,
//             bookedSeats: selectedSeats
//         });

//         // Mark seats as occupied
//         selectedSeats.forEach((seat) => {
//             showData.occupiedSeats[seat] = userId;
//         });

//         showData.markModified('occupiedSeats');
//         await showData.save();

//         // Create Stripe payment session
//         const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

//         const line_items = [{
//             price_data: {
//                 currency: 'inr',
//                 product_data: {
//                     name: `${showData.movie.title} - ${selectedSeats.length} Seat(s)`,
//                     description: `Seats: ${selectedSeats.join(', ')}`
//                 },
//                 unit_amount: Math.floor(booking.amount) * 100
//             },
//             quantity: 1
//         }];

//         const session = await stripeInstance.checkout.sessions.create({
//             success_url: `${origin}/loading/my-bookings`,
//             cancel_url: `${origin}/my-bookings`,
//             line_items: line_items,
//             mode: 'payment',
//             metadata: {
//                 bookingId: booking._id.toString(),
//                 userId: userId,
//                 showId: showId
//             },
//             expires_at: Math.floor(Date.now() / 1000) + 30 * 60, // 30 minutes
//         });

//         booking.paymentLink = session.url;
//         await booking.save();

//         // Schedule payment check (10 minutes)
//         await inngest.send({
//             name: "app/checkpayment",
//             data: {
//                 bookingId: booking._id.toString()
//             }
//         });

//         console.log("✅ Booking created:", booking._id);

//         res.json({ success: true, url: session.url });

//     } catch (error) {
//         console.error("Create booking error:", error.message);
//         res.json({ success: false, message: error.message });
//     }
// };

// /* ================================
//    GET OCCUPIED SEATS
// ================================ */
// export const getOccupiedSeats = async (req, res) => {
//     try {
//         const { showId } = req.params;
        
//         const showData = await Show.findById(showId);

//         if (!showData) {
//             return res.json({ 
//                 success: false, 
//                 message: "Show not found" 
//             });
//         }

//         const occupiedSeats = Object.keys(showData.occupiedSeats);

//         res.json({ success: true, occupiedSeats });

//     } catch (error) {
//         console.error("Get occupied seats error:", error.message);
//         res.json({ success: false, message: error.message });
//     }
// };

// import { inngest } from "../inngest/index.js";
// import Booking from "../models/Booking.js";
// import Show from "../models/Show.js";
// import stripe from 'stripe';

// const checkSeatsAvailability = async (showId, selectedSeats) => {
//   try {
//     const showData = await Show.findById(showId);
//     if (!showData) return false;

//     const occupiedSeats = showData.occupiedSeats;
//     const isAnySeatTaken = selectedSeats.some(seat => occupiedSeats[seat]);

//     return !isAnySeatTaken;
//   } catch (error) {
//     return false;
//   }
// };

// export const createBooking = async (req, res) => {
//   try {
//     const { userId } = req.auth();
//     const { showId, selectedSeats } = req.body;
//     const { origin } = req.headers;

//     const isAvailable = await checkSeatsAvailability(showId, selectedSeats);

//     if (!isAvailable) {
//       return res.json({ success: false, message: "Seats not available" });
//     }

//     const showData = await Show.findById(showId).populate('movie');

//     if (!showData) {
//       return res.json({ success: false, message: "Show not found" });
//     }

//     const booking = await Booking.create({
//       user: userId,
//       show: showId,
//       amount: showData.showPrice * selectedSeats.length,
//       bookedSeats: selectedSeats
//     });

//     selectedSeats.forEach((seat) => {
//       showData.occupiedSeats[seat] = userId;
//     });

//     showData.markModified('occupiedSeats');
//     await showData.save();

//     const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

//     const line_items = [{
//       price_data: {
//         currency: 'usd',
//         product_data: {
//           name: `${showData.movie.title} - ${selectedSeats.length} Seat(s)`,
//           description: `Seats: ${selectedSeats.join(', ')}`
//         },
//         unit_amount: Math.floor(booking.amount) * 100
//       },
//       quantity: 1
//     }];

//     const session = await stripeInstance.checkout.sessions.create({
//       success_url: `${origin}/loading/my-bookings`,
//       cancel_url: `${origin}/my-bookings`,
//       line_items: line_items,
//       mode: 'payment',
//       metadata: {
//         bookingId: booking._id.toString(),
//         userId: userId,
//         showId: showId
//       },
//       expires_at: Math.floor(Date.now() / 1000) + 30 * 60,
//     });

//     booking.paymentLink = session.url;
//     await booking.save();

//     await inngest.send({
//       name: "app/checkpayment",
//       data: {
//         bookingId: booking._id.toString()
//       }
//     });

//     res.json({ success: true, url: session.url });

//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };
// export const createBooking = async (req, res) => {
//   try {
//     // ✅ TEMPORARY: Get userId from body instead of auth
//     const { showId, selectedSeats, userId } = req.body;
//     const { origin } = req.headers;

//     // If no userId provided, use a default test user
//     const bookingUserId = userId || "test-user-123";

//     const isAvailable = await checkSeatsAvailability(showId, selectedSeats);

//     if (!isAvailable) {
//       return res.json({ success: false, message: "Seats not available" });
//     }

//     const showData = await Show.findById(showId).populate('movie');

//     if (!showData) {
//       return res.json({ success: false, message: "Show not found" });
//     }

//     const booking = await Booking.create({
//       user: bookingUserId,
//       show: showId,
//       amount: showData.showPrice * selectedSeats.length,
//       bookedSeats: selectedSeats
//     });

//     selectedSeats.forEach((seat) => {
//       showData.occupiedSeats[seat] = bookingUserId;
//     });

//     showData.markModified('occupiedSeats');
//     await showData.save();

//     const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

//     const line_items = [{
//       price_data: {
//         currency: 'usd',
//         product_data: {
//           name: `${showData.movie.title} - ${selectedSeats.length} Seat(s)`,
//           description: `Seats: ${selectedSeats.join(', ')}`
//         },
//         unit_amount: Math.floor(booking.amount) * 100
//       },
//       quantity: 1
//     }];

//     const session = await stripeInstance.checkout.sessions.create({
//       success_url: `${origin}/loading/my-bookings`,
//       cancel_url: `${origin}/my-bookings`,
//       line_items: line_items,
//       mode: 'payment',
//       metadata: {
//         bookingId: booking._id.toString(),
//         userId: bookingUserId,
//         showId: showId
//       },
//       expires_at: Math.floor(Date.now() / 1000) + 4* 60 * 60, // 4 hours
//     });

//     booking.paymentLink = session.url;
//     await booking.save();

//     await inngest.send({
//       name: "app/checkpayment",
//       data: {
//         bookingId: booking._id.toString()
//       }
//     });

//     res.json({ success: true, url: session.url });

//   } catch (error) {
//     console.error("Booking Error:", error);
//     res.json({ success: false, message: error.message });
//   }
// };
// export const getOccupiedSeats = async (req, res) => {
//   try {
//     const { showId } = req.params;
//     const showData = await Show.findById(showId);

//     if (!showData) {
//       return res.json({ success: false, message: "Show not found" });
//     }

//     const occupiedSeats = Object.keys(showData.occupiedSeats);

//     res.json({ success: true, occupiedSeats });

//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };

// import { inngest } from "../inngest/index.js";
// import Booking from "../models/Booking.js";
// import Show from "../models/Show.js";
// import stripe from 'stripe';

// const checkSeatsAvailability = async (showId, selectedSeats) => {
//   try {
//     const showData = await Show.findById(showId);
//     if (!showData) return false;

//     const occupiedSeats = showData.occupiedSeats;
//     const isAnySeatTaken = selectedSeats.some(seat => occupiedSeats[seat]);

//     return !isAnySeatTaken;
//   } catch (error) {
//     return false;
//   }
// };

// export const createBooking = async (req, res) => {
//   try {
//     const { showId, selectedSeats, userId } = req.body;
//     const { origin } = req.headers;

//     const bookingUserId = userId || "guest-user";

//     const isAvailable = await checkSeatsAvailability(showId, selectedSeats);

//     if (!isAvailable) {
//       return res.json({ success: false, message: "Seats not available" });
//     }

//     const showData = await Show.findById(showId).populate('movie');

//     if (!showData) {
//       return res.json({ success: false, message: "Show not found" });
//     }

//     const booking = await Booking.create({
//       user: bookingUserId,
//       show: showId,
//       amount: showData.showPrice * selectedSeats.length,
//       bookedSeats: selectedSeats
//     });

//     selectedSeats.forEach((seat) => {
//       showData.occupiedSeats[seat] = bookingUserId;
//     });

//     showData.markModified('occupiedSeats');
//     await showData.save();

//     const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

//     const line_items = [{
//       price_data: {
//         currency: 'usd',
//         product_data: {
//           name: `${showData.movie.title} - ${selectedSeats.length} Seat(s)`,
//           description: `Seats: ${selectedSeats.join(', ')}`
//         },
//         unit_amount: Math.floor(booking.amount) * 100
//       },
//       quantity: 1
//     }];

//     // Stripe minimum is 30 minutes, but we'll auto-cancel after 10 min via Inngest
//     const expiresAt = Math.floor(Date.now() / 1000) + (30 * 60);

//     const session = await stripeInstance.checkout.sessions.create({
//       success_url: `${origin}/loading/my-bookings`,
//       cancel_url: `${origin}/my-bookings`,
//       line_items: line_items,
//       mode: 'payment',
//       metadata: {
//         bookingId: booking._id.toString(),
//         userId: bookingUserId,
//         showId: showId
//       },
//       expires_at: expiresAt,
//     });

//     booking.paymentLink = session.url;
//     await booking.save();

//     // Trigger 10-minute check
//     await inngest.send({
//       name: "app/checkpayment",
//       data: {
//         bookingId: booking._id.toString()
//       }
//     });

//     res.json({ success: true, url: session.url });

//   } catch (error) {
//     console.error("Booking Error:", error);
//     res.json({ success: false, message: error.message });
//   }
// };

// export const getOccupiedSeats = async (req, res) => {
//   try {
//     const { showId } = req.params;
//     const showData = await Show.findById(showId);

//     if (!showData) {
//       return res.json({ success: false, message: "Show not found" });
//     }

//     const occupiedSeats = Object.keys(showData.occupiedSeats);

//     res.json({ success: true, occupiedSeats });

//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };
import { inngest } from "../inngest/index.js";
import Booking from "../models/Booking.js";
import Show from "../models/Show.js";
import stripe from 'stripe';

const checkSeatsAvailability = async (showId, selectedSeats) => {
  try {
    const showData = await Show.findById(showId);
    if (!showData) return false;

    const occupiedSeats = showData.occupiedSeats;
    const isAnySeatTaken = selectedSeats.some(seat => occupiedSeats[seat]);

    return !isAnySeatTaken;
  } catch (error) {
    return false;
  }
};

export const createBooking = async (req, res) => {
  try {
    const { showId, selectedSeats, userId } = req.body;
    const { origin } = req.headers;

    const bookingUserId = userId || "guest-user";

    const isAvailable = await checkSeatsAvailability(showId, selectedSeats);

    if (!isAvailable) {
      return res.json({ success: false, message: "Seats not available" });
    }

    const showData = await Show.findById(showId).populate('movie');

    if (!showData) {
      return res.json({ success: false, message: "Show not found" });
    }

    const booking = await Booking.create({
      user: bookingUserId,
      show: showId,
      amount: showData.showPrice * selectedSeats.length,
      bookedSeats: selectedSeats
    });

    selectedSeats.forEach((seat) => {
      showData.occupiedSeats[seat] = bookingUserId;
    });

    showData.markModified('occupiedSeats');
    await showData.save();

    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

    const line_items = [{
      price_data: {
        currency: 'usd',
        product_data: {
          name: `${showData.movie.title} - ${selectedSeats.length} Seat(s)`,
          description: `Seats: ${selectedSeats.join(', ')}`
        },
        unit_amount: Math.floor(booking.amount) * 100
      },
      quantity: 1
    }];

    // ✅ DON'T SET expires_at - Let Stripe use default
    // Inngest will handle the 10-minute timeout separately
    const session = await stripeInstance.checkout.sessions.create({
      success_url: `${origin}/loading/my-bookings`,
      cancel_url: `${origin}/my-bookings`,
      line_items: line_items,
      mode: 'payment',
      metadata: {
        bookingId: booking._id.toString(),
        userId: bookingUserId,
        showId: showId
      }
      // ✅ NO expires_at here!
    });

    booking.paymentLink = session.url;
    await booking.save();

    // ✅ Trigger 10-minute check
    await inngest.send({
      name: "app/checkpayment",
      data: {
        bookingId: booking._id.toString()
      }
    });

    res.json({ success: true, url: session.url });

  } catch (error) {
    console.error("Booking Error:", error);
    res.json({ success: false, message: error.message });
  }
};

export const getOccupiedSeats = async (req, res) => {
  try {
    const { showId } = req.params;
    const showData = await Show.findById(showId);

    if (!showData) {
      return res.json({ success: false, message: "Show not found" });
    }

    const occupiedSeats = Object.keys(showData.occupiedSeats);

    res.json({ success: true, occupiedSeats });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};