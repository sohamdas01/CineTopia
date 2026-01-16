

import Booking from "../models/Booking.js";
import Show from "../models/Show.js";
import User from "../models/User.js";

// export const isAdmin = async (req, res) => {
//   res.json({ success: true, isAdmin: true });
// };

export const getDashboardData = async (req, res) => {
  try {
    const bookings = await Booking.find({ isPaid: true });
    const activeShows = await Show.find({ 
      showDateTime: { $gte: new Date() } 
    }).populate("movie");
    const totalUser = await User.countDocuments();

    res.json({ 
      success: true, 
      dashboardData: {
        totalBookings: bookings.length,
        totalRevenue: bookings.reduce((acc, b) => acc + b.amount, 0),
        activeShows,
        totalUser,
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllShows = async (req, res) => {
  try {
    const shows = await Show.find({ showDateTime: { $gte: new Date() } })
      .populate("movie")
      .sort({ showDateTime: 1 });
    res.json({ success: true, shows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({})
      .populate("user")
      .populate({ path: "show", populate: { path: "movie" } })
      .sort({ createdAt: -1 });
    res.json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteShow = async (req, res) => {
  try {
    const { id } = req.params;
    const bookingsCount = await Booking.countDocuments({ show: id });
    
    if (bookingsCount > 0) {
      return res.status(400).json({ 
        success: false, 
        message: "Cannot delete show with bookings" 
      });
    }

    await Show.findByIdAndDelete(id);
    res.json({ success: true, message: "Show deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id).populate('show');
    
    if (!booking) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    if (booking.show) {
      const show = await Show.findById(booking.show._id);
      if (show) {
        booking.bookedSeats.forEach(seat => delete show.occupiedSeats[seat]);
        show.markModified('occupiedSeats');
        await show.save();
      }
    }

    await Booking.findByIdAndDelete(id);
    res.json({ success: true, message: "Booking deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({})
      .select('-__v')
      .sort({ createdAt: -1 });

    // Get booking counts for each user
    const usersWithStats = await Promise.all(
      users.map(async (user) => {
        const bookingCount = await Booking.countDocuments({ 
          user: user._id 
        });
        
        const totalSpent = await Booking.aggregate([
          { $match: { user: user._id, isPaid: true } },
          { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        return {
          ...user.toObject(),
          bookingCount,
          totalSpent: totalSpent[0]?.total || 0
        };
      })
    );

    res.json({ 
      success: true, 
      users: usersWithStats,
      count: users.length 
    });
  } catch (error) {
    console.error("Get all users error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserStats = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    const bookings = await Booking.find({ user: userId })
      .populate({
        path: 'show',
        populate: { path: 'movie' }
      })
      .sort({ createdAt: -1 });

    const stats = {
      totalBookings: bookings.length,
      paidBookings: bookings.filter(b => b.isPaid).length,
      unpaidBookings: bookings.filter(b => !b.isPaid).length,
      totalSpent: bookings
        .filter(b => b.isPaid)
        .reduce((sum, b) => sum + b.amount, 0),
      favoriteCount: user.favorites?.length || 0
    };

    res.json({ 
      success: true, 
      user,
      bookings,
      stats
    });
  } catch (error) {
    console.error("Get user stats error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};