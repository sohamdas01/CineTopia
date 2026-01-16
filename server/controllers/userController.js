

import Booking from "../models/Booking.js";
import Movie from "../models/Movie.js";
import User from "../models/User.js";

export const getUserBookings = async (req, res) => {
  try {
    // Get userId from query params or body
    const userId = req.query.userId || req.body.userId;

    if (!userId) {
      return res.json({ success: false, message: "User ID required" });
    }

    const bookings = await Booking.find({ user: userId })
      .populate({
        path: "show",
        populate: { path: "movie" }
      })
      .sort({ createdAt: -1 });

    res.json({ success: true, bookings });
  } catch (error) {
    console.error("Get bookings error:", error);
    res.json({ success: false, message: error.message });
  }
};

export const updateFavorite = async (req, res) => {
  try {
    const { movieId, userId } = req.body;

    if (!movieId || !userId) {
      return res.json({ success: false, message: "Movie ID and User ID required" });
    }

    const user = await User.findById(userId);
    
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (!user.favorites) {
      user.favorites = [];
    }

    const movieIndex = user.favorites.indexOf(movieId);
    
    if (movieIndex === -1) {
      user.favorites.push(movieId);
    } else {
      user.favorites.splice(movieIndex, 1);
    }

    await user.save();

    res.json({ 
      success: true, 
      message: "Updated",
      favorites: user.favorites
    });
  } catch (error) {
    console.error("Update favorite error:", error);
    res.json({ success: false, message: error.message });
  }
};

export const getFavorites = async (req, res) => {
  try {
    const userId = req.query.userId || req.body.userId;

    if (!userId) {
      return res.json({ success: false, message: "User ID required" });
    }

    const user = await User.findById(userId);
    
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const favorites = user.favorites || [];
    const movies = await Movie.find({ _id: { $in: favorites } });

    res.json({ success: true, movies });
  } catch (error) {
    console.error("Get favorites error:", error);
    res.json({ success: false, message: error.message });
  }
};