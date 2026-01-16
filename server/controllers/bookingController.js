
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

    // DON'T SET expires_at - Let Stripe use default
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
      // NO expires_at here!
    });

    booking.paymentLink = session.url;
    await booking.save();

    //  Trigger 10-minute check
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