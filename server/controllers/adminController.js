// import Booking from "../models/Booking.js"
// import Show from "../models/Show.js";
// import User from "../models/User.js";


// // API to check if user is admin
// export const isAdmin = async (req, res) =>{
//     res.json({success: true, isAdmin: true})
// }

// // API to get dashboard data
// export const getDashboardData = async (req, res) =>{
//     try {
//         const bookings = await Booking.find({isPaid: true});
//         const activeShows = await Show.find({showDateTime: {$gte: new Date()}}).populate('movie');

//         const totalUser = await User.countDocuments();

//         const dashboardData = {
//             totalBookings: bookings.length,
//             totalRevenue: bookings.reduce((acc, booking)=> acc + booking.amount, 0),
//             activeShows,
//             totalUser
//         }

//         res.json({success: true, dashboardData})
//     } catch (error) {
//         console.error(error);
//         res.json({success: false, message: error.message})
//     }
// }

// // API to get all shows
// export const getAllShows = async (req, res) =>{
//     try {
//         const shows = await Show.find({showDateTime: { $gte: new Date() }}).populate('movie').sort({ showDateTime: 1 })
//         res.json({success: true, shows})
//     } catch (error) {
//         console.error(error);
//         res.json({success: false, message: error.message})
//     }
// }

// // API to get all bookings
// export const getAllBookings = async (req, res) =>{
//     try {
//         const bookings = await Booking.find({}).populate('user').populate({
//             path: "show",
//             populate: {path: "movie"}
//         }).sort({ createdAt: -1 })
//         res.json({success: true, bookings })
//     } catch (error) {
//         console.error(error);
//         res.json({success: false, message: error.message})
//     }
// }

// import Booking from "../models/Booking.js";
// import Show from "../models/Show.js";
// import User from "../models/User.js";

// // API to get dashboard data
// export const getDashboardData = async (req, res) => {
//   try {
//     const bookings = await Booking.find({ isPaid: true });
//     const activeShows = await Show.find({
//       showDateTime: { $gte: new Date() },
//     }).populate("movie");

//     const totalUser = await User.countDocuments();

//     const dashboardData = {
//       totalBookings: bookings.length,
//       totalRevenue: bookings.reduce(
//         (acc, booking) => acc + booking.amount,
//         0
//       ),
//       activeShows,
//       totalUser,
//     };

//     res.json({ success: true, dashboardData });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // API to get all shows
// export const getAllShows = async (req, res) => {
//   try {
//     const shows = await Show.find({
//       showDateTime: { $gte: new Date() },
//     })
//       .populate("movie")
//       .sort({ showDateTime: 1 });

//     res.json({ success: true, shows });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // API to get all bookings
// export const getAllBookings = async (req, res) => {
//   try {
//     const bookings = await Booking.find({})
//       .populate("user")
//       .populate({
//         path: "show",
//         populate: { path: "movie" },
//       })
//       .sort({ createdAt: -1 });

//     res.json({ success: true, bookings });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// import Booking from "../models/Booking.js";
// import Show from "../models/Show.js";
// import User from "../models/User.js";

// // Get admin emails from environment
// const getAdminEmails = () => {
//   const emails = process.env.ADMIN_EMAILS || "";
//   return emails
//     .split(",")
//     .map(email => email.trim().toLowerCase())
//     .filter(email => email.length > 0);
// };

// /* ================================
//    CHECK IF USER IS ADMIN
//    ⚠️ This should be protected by protectAdmin middleware
// ================================ */
// export const isAdmin = async (req, res) => {
//   try {
//     // At this point, protectAdmin middleware has already verified admin status
//     // This endpoint is just for frontend to double-check
//     const userEmail = req.userEmail; // Set by protectAdmin middleware
//     const adminEmails = getAdminEmails();
    
//     res.json({
//       success: true, 
//       isAdmin: true,
//       userEmail: userEmail,
//       message: "Admin verified"
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /* ================================
//    GET DASHBOARD DATA
// ================================ */
// export const getDashboardData = async (req, res) => {
//   try {
//     const bookings = await Booking.find({ isPaid: true });
//     const activeShows = await Show.find({ 
//       showDateTime: { $gte: new Date() } 
//     }).populate("movie");

//     const totalUser = await User.countDocuments();

//     const dashboardData = {
//       totalBookings: bookings.length,
//       totalRevenue: bookings.reduce((acc, booking) => acc + booking.amount, 0),
//       activeShows,
//       totalUser,
//     };

//     res.json({ success: true, dashboardData });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /* ================================
//    GET ALL SHOWS
// ================================ */
// export const getAllShows = async (req, res) => {
//   try {
//     const shows = await Show.find({ 
//       showDateTime: { $gte: new Date() } 
//     })
//       .populate("movie")
//       .sort({ showDateTime: 1 });
      
//     res.json({ success: true, shows });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /* ================================
//    GET ALL BOOKINGS
// ================================ */
// export const getAllBookings = async (req, res) => {
//   try {
//     const bookings = await Booking.find({})
//       .populate("user")
//       .populate({
//         path: "show",
//         populate: { path: "movie" },
//       })
//       .sort({ createdAt: -1 });
      
//     res.json({ success: true, bookings });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /* ================================
//    DELETE SHOW
// ================================ */
// export const deleteShow = async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     // Check if show has any bookings
//     const bookingsCount = await Booking.countDocuments({ show: id });
    
//     if (bookingsCount > 0) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "Cannot delete show with existing bookings" 
//       });
//     }

//     await Show.findByIdAndDelete(id);
    
//     res.json({ success: true, message: "Show deleted successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /* ================================
//    DELETE BOOKING
// ================================ */
// export const deleteBooking = async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     const booking = await Booking.findById(id);
    
//     if (!booking) {
//       return res.status(404).json({ 
//         success: false, 
//         message: "Booking not found" 
//       });
//     }

//     // If booking was paid, you might want to handle refunds here
//     if (booking.isPaid) {
//       // TODO: Implement refund logic with Stripe
//       console.log("Paid booking deleted - refund may be needed:", booking._id);
//     }

//     await Booking.findByIdAndDelete(id);
    
//     res.json({ success: true, message: "Booking deleted successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
// import Booking from "../models/Booking.js";
// import Show from "../models/Show.js";
// import User from "../models/User.js";

// // Get admin emails from environment
// const getAdminEmails = () => {
//   const emails = process.env.ADMIN_EMAILS || "";
//   return emails
//     .split(",")
//     .map(email => email.trim().toLowerCase())
//     .filter(email => email.length > 0);
// };

// /* ================================
//    CHECK IF USER IS ADMIN
//    ⚠️ This should be protected by protectAdmin middleware
// ================================ */
// export const isAdmin = async (req, res) => {
//   try {
//     // At this point, protectAdmin middleware has already verified admin status
//     // This endpoint is just for frontend to double-check
//     const userEmail = req.userEmail; // Set by protectAdmin middleware
//     const adminEmails = getAdminEmails();
    
//     res.json({
//       success: true, 
//       isAdmin: true,
//       userEmail: userEmail,
//       message: "Admin verified"
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /* ================================
//    GET DASHBOARD DATA
// ================================ */
// export const getDashboardData = async (req, res) => {
//   try {
//     const bookings = await Booking.find({ isPaid: true });
//     const activeShows = await Show.find({ 
//       showDateTime: { $gte: new Date() } 
//     }).populate("movie");

//     const totalUser = await User.countDocuments();

//     const dashboardData = {
//       totalBookings: bookings.length,
//       totalRevenue: bookings.reduce((acc, booking) => acc + booking.amount, 0),
//       activeShows,
//       totalUser,
//     };

//     res.json({ success: true, dashboardData });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /* ================================
//    GET ALL SHOWS
// ================================ */
// export const getAllShows = async (req, res) => {
//   try {
//     const shows = await Show.find({ 
//       showDateTime: { $gte: new Date() } 
//     })
//       .populate("movie")
//       .sort({ showDateTime: 1 });
      
//     res.json({ success: true, shows });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /* ================================
//    GET ALL BOOKINGS
// ================================ */
// export const getAllBookings = async (req, res) => {
//   try {
//     const bookings = await Booking.find({})
//       .populate("user")
//       .populate({
//         path: "show",
//         populate: { path: "movie" },
//       })
//       .sort({ createdAt: -1 });
      
//     res.json({ success: true, bookings });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /* ================================
//    DELETE SHOW
// ================================ */
// export const deleteShow = async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     // Check if show has any bookings
//     const bookingsCount = await Booking.countDocuments({ show: id });
    
//     if (bookingsCount > 0) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "Cannot delete show with existing bookings" 
//       });
//     }

//     await Show.findByIdAndDelete(id);
    
//     res.json({ success: true, message: "Show deleted successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /* ================================
//    DELETE BOOKING
// ================================ */
// export const deleteBooking = async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     const booking = await Booking.findById(id);
    
//     if (!booking) {
//       return res.status(404).json({ 
//         success: false, 
//         message: "Booking not found" 
//       });
//     }

//     // If booking was paid, you might want to handle refunds here
//     if (booking.isPaid) {
//       // TODO: Implement refund logic with Stripe
//       console.log("Paid booking deleted - refund may be needed:", booking._id);
//     }

//     await Booking.findByIdAndDelete(id);
    
//     res.json({ success: true, message: "Booking deleted successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// import Booking from "../models/Booking.js";
// import Show from "../models/Show.js";
// import User from "../models/User.js";

// /* ================================
//    CHECK IF USER IS ADMIN
// ================================ */
// export const isAdmin = async (req, res) => {
//   try {
//     // At this point, protectAdmin middleware has already verified admin status
//     const userEmail = req.userEmail;
    
//     res.json({
//       success: true, 
//       isAdmin: true,
//       userEmail: userEmail,
//       message: "Admin verified"
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /* ================================
//    GET DASHBOARD DATA
// ================================ */
// export const getDashboardData = async (req, res) => {
//   try {
//     const bookings = await Booking.find({ isPaid: true });
//     const activeShows = await Show.find({ 
//       showDateTime: { $gte: new Date() } 
//     }).populate("movie");

//     const totalUser = await User.countDocuments();

//     const dashboardData = {
//       totalBookings: bookings.length,
//       totalRevenue: bookings.reduce((acc, booking) => acc + booking.amount, 0),
//       activeShows,
//       totalUser,
//     };

//     res.json({ success: true, dashboardData });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /* ================================
//    GET ALL SHOWS
// ================================ */
// export const getAllShows = async (req, res) => {
//   try {
//     const shows = await Show.find({ 
//       showDateTime: { $gte: new Date() } 
//     })
//       .populate("movie")
//       .sort({ showDateTime: 1 });
      
//     res.json({ success: true, shows });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /* ================================
//    GET ALL BOOKINGS
// ================================ */
// export const getAllBookings = async (req, res) => {
//   try {
//     const bookings = await Booking.find({})
//       .populate("user")
//       .populate({
//         path: "show",
//         populate: { path: "movie" },
//       })
//       .sort({ createdAt: -1 });
      
//     res.json({ success: true, bookings });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /* ================================
//    DELETE SHOW
// ================================ */
// export const deleteShow = async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     // Check if show has any bookings
//     const bookingsCount = await Booking.countDocuments({ show: id });
    
//     if (bookingsCount > 0) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "Cannot delete show with existing bookings" 
//       });
//     }

//     await Show.findByIdAndDelete(id);
    
//     res.json({ success: true, message: "Show deleted successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /* ================================
//    DELETE BOOKING
// ================================ */
// export const deleteBooking = async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     const booking = await Booking.findById(id);
    
//     if (!booking) {
//       return res.status(404).json({ 
//         success: false, 
//         message: "Booking not found" 
//       });
//     }

//     await Booking.findByIdAndDelete(id);
    
//     res.json({ success: true, message: "Booking deleted successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// import Booking from "../models/Booking.js";
// import Show from "../models/Show.js";
// import User from "../models/User.js";

// /* ================================
//    CHECK IF USER IS ADMIN
// ================================ */
// export const isAdmin = async (req, res) => {
//   try {
//     // protectAdmin middleware already verified admin status
//     const userEmail = req.userEmail;
    
//     res.json({
//       success: true, 
//       isAdmin: true,
//       userEmail: userEmail,
//       message: "Admin verified"
//     });
//   } catch (error) {
//     console.error("Admin check error:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /* ================================
//    GET DASHBOARD DATA
// ================================ */
// export const getDashboardData = async (req, res) => {
//   try {
//     // ✅ All queries use MongoDB
//     const bookings = await Booking.find({ isPaid: true });
    
//     const activeShows = await Show.find({ 
//       showDateTime: { $gte: new Date() } 
//     }).populate("movie");

//     const totalUser = await User.countDocuments();

//     const dashboardData = {
//       totalBookings: bookings.length,
//       totalRevenue: bookings.reduce((acc, booking) => acc + booking.amount, 0),
//       activeShows,
//       totalUser,
//     };

//     res.json({ success: true, dashboardData });
//   } catch (error) {
//     console.error("Dashboard error:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /* ================================
//    GET ALL SHOWS
// ================================ */
// export const getAllShows = async (req, res) => {
//   try {
//     const shows = await Show.find({ 
//       showDateTime: { $gte: new Date() } 
//     })
//       .populate("movie")
//       .sort({ showDateTime: 1 });
      
//     res.json({ success: true, shows });
//   } catch (error) {
//     console.error("Get shows error:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /* ================================
//    GET ALL BOOKINGS
// ================================ */
// export const getAllBookings = async (req, res) => {
//   try {
//     const bookings = await Booking.find({})
//       .populate("user")
//       .populate({
//         path: "show",
//         populate: { path: "movie" },
//       })
//       .sort({ createdAt: -1 });
      
//     res.json({ success: true, bookings });
//   } catch (error) {
//     console.error("Get bookings error:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /* ================================
//    DELETE SHOW
// ================================ */
// export const deleteShow = async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     if (!id) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "Show ID is required" 
//       });
//     }

//     // Check if show exists
//     const show = await Show.findById(id);
//     if (!show) {
//       return res.status(404).json({ 
//         success: false, 
//         message: "Show not found" 
//       });
//     }

//     // Check if show has any bookings
//     const bookingsCount = await Booking.countDocuments({ show: id });
    
//     if (bookingsCount > 0) {
//       return res.status(400).json({ 
//         success: false, 
//         message: `Cannot delete show with ${bookingsCount} existing booking(s)` 
//       });
//     }

//     await Show.findByIdAndDelete(id);
    
//     console.log("✅ Show deleted:", id);
//     res.json({ success: true, message: "Show deleted successfully" });
//   } catch (error) {
//     console.error("Delete show error:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /* ================================
//    DELETE BOOKING
// ================================ */
// export const deleteBooking = async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     if (!id) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "Booking ID is required" 
//       });
//     }

//     const booking = await Booking.findById(id).populate('show');
    
//     if (!booking) {
//       return res.status(404).json({ 
//         success: false, 
//         message: "Booking not found" 
//       });
//     }

//     // Release seats if booking is being deleted
//     if (booking.show) {
//       const show = await Show.findById(booking.show._id);
//       if (show) {
//         booking.bookedSeats.forEach((seat) => {
//           delete show.occupiedSeats[seat];
//         });
//         show.markModified('occupiedSeats');
//         await show.save();
//         console.log("✅ Seats released for deleted booking");
//       }
//     }

//     await Booking.findByIdAndDelete(id);
    
//     console.log("✅ Booking deleted:", id);
//     res.json({ success: true, message: "Booking deleted successfully" });
//   } catch (error) {
//     console.error("Delete booking error:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// import Booking from "../models/Booking.js";
// import Show from "../models/Show.js";
// import User from "../models/User.js";

// /* ================================
//    CHECK IF USER IS ADMIN
// ================================ */
// export const isAdmin = async (req, res) => {
//   // protectAdmin already verified, so we know user is admin
//   res.json({
//     success: true, 
//     isAdmin: true,
//     message: "Admin verified"
//   });
// };

// /* ================================
//    GET DASHBOARD DATA
// ================================ */
// export const getDashboardData = async (req, res) => {
//   try {
//     const bookings = await Booking.find({ isPaid: true });
//     const activeShows = await Show.find({ 
//       showDateTime: { $gte: new Date() } 
//     }).populate("movie");
//     const totalUser = await User.countDocuments();

//     const dashboardData = {
//       totalBookings: bookings.length,
//       totalRevenue: bookings.reduce((acc, booking) => acc + booking.amount, 0),
//       activeShows,
//       totalUser,
//     };

//     res.json({ success: true, dashboardData });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /* ================================
//    GET ALL SHOWS
// ================================ */
// export const getAllShows = async (req, res) => {
//   try {
//     const shows = await Show.find({ 
//       showDateTime: { $gte: new Date() } 
//     })
//       .populate("movie")
//       .sort({ showDateTime: 1 });
      
//     res.json({ success: true, shows });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /* ================================
//    GET ALL BOOKINGS
// ================================ */
// export const getAllBookings = async (req, res) => {
//   try {
//     const bookings = await Booking.find({})
//       .populate("user")
//       .populate({
//         path: "show",
//         populate: { path: "movie" },
//       })
//       .sort({ createdAt: -1 });
      
//     res.json({ success: true, bookings });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /* ================================
//    DELETE SHOW
// ================================ */
// export const deleteShow = async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     const bookingsCount = await Booking.countDocuments({ show: id });
    
//     if (bookingsCount > 0) {
//       return res.status(400).json({ 
//         success: false, 
//         message: `Cannot delete show with ${bookingsCount} existing bookings` 
//       });
//     }

//     await Show.findByIdAndDelete(id);
//     res.json({ success: true, message: "Show deleted successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /* ================================
//    DELETE BOOKING
// ================================ */
// export const deleteBooking = async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     const booking = await Booking.findById(id).populate('show');
    
//     if (!booking) {
//       return res.status(404).json({ 
//         success: false, 
//         message: "Booking not found" 
//       });
//     }

//     // Release seats
//     if (booking.show) {
//       const show = await Show.findById(booking.show._id);
//       if (show) {
//         booking.bookedSeats.forEach((seat) => {
//           delete show.occupiedSeats[seat];
//         });
//         show.markModified('occupiedSeats');
//         await show.save();
//       }
//     }

//     await Booking.findByIdAndDelete(id);
//     res.json({ success: true, message: "Booking deleted successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// import Booking from "../models/Booking.js";
// import Show from "../models/Show.js";
// import User from "../models/User.js";

// /* ================================
//    CHECK IF USER IS ADMIN
// ================================ */
// export const isAdmin = async (req, res) => {
//   // protectAdmin already verified, so we know user is admin
//   res.json({
//     success: true, 
//     isAdmin: true,
//     message: "Admin verified"
//   });
// };

// /* ================================
//    GET DASHBOARD DATA
// ================================ */
// export const getDashboardData = async (req, res) => {
//   try {
//     const bookings = await Booking.find({ isPaid: true });
//     const activeShows = await Show.find({ 
//       showDateTime: { $gte: new Date() } 
//     }).populate("movie");
//     const totalUser = await User.countDocuments();

//     const dashboardData = {
//       totalBookings: bookings.length,
//       totalRevenue: bookings.reduce((acc, booking) => acc + booking.amount, 0),
//       activeShows,
//       totalUser,
//     };

//     res.json({ success: true, dashboardData });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /* ================================
//    GET ALL SHOWS
// ================================ */
// export const getAllShows = async (req, res) => {
//   try {
//     const shows = await Show.find({ 
//       showDateTime: { $gte: new Date() } 
//     })
//       .populate("movie")
//       .sort({ showDateTime: 1 });
      
//     res.json({ success: true, shows });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /* ================================
//    GET ALL BOOKINGS
// ================================ */
// export const getAllBookings = async (req, res) => {
//   try {
//     const bookings = await Booking.find({})
//       .populate("user")
//       .populate({
//         path: "show",
//         populate: { path: "movie" },
//       })
//       .sort({ createdAt: -1 });
      
//     res.json({ success: true, bookings });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /* ================================
//    DELETE SHOW
// ================================ */
// export const deleteShow = async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     const bookingsCount = await Booking.countDocuments({ show: id });
    
//     if (bookingsCount > 0) {
//       return res.status(400).json({ 
//         success: false, 
//         message: `Cannot delete show with ${bookingsCount} existing bookings` 
//       });
//     }

//     await Show.findByIdAndDelete(id);
//     res.json({ success: true, message: "Show deleted successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /* ================================
//    DELETE BOOKING
// ================================ */
// export const deleteBooking = async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     const booking = await Booking.findById(id).populate('show');
    
//     if (!booking) {
//       return res.status(404).json({ 
//         success: false, 
//         message: "Booking not found" 
//       });
//     }

//     // Release seats
//     if (booking.show) {
//       const show = await Show.findById(booking.show._id);
//       if (show) {
//         booking.bookedSeats.forEach((seat) => {
//           delete show.occupiedSeats[seat];
//         });
//         show.markModified('occupiedSeats');
//         await show.save();
//       }
//     }

//     await Booking.findByIdAndDelete(id);
//     res.json({ success: true, message: "Booking deleted successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// import Booking from "../models/Booking.js";
// import Show from "../models/Show.js";
// import User from "../models/User.js";

// export const isAdmin = async (req, res) => {
//   res.json({ success: true, isAdmin: true });
// };

// export const getDashboardData = async (req, res) => {
//   try {
//     const bookings = await Booking.find({ isPaid: true });
//     const activeShows = await Show.find({ 
//       showDateTime: { $gte: new Date() } 
//     }).populate("movie");
//     const totalUser = await User.countDocuments();

//     res.json({ 
//       success: true, 
//       dashboardData: {
//         totalBookings: bookings.length,
//         totalRevenue: bookings.reduce((acc, b) => acc + b.amount, 0),
//         activeShows,
//         totalUser,
//       }
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export const getAllShows = async (req, res) => {
//   try {
//     const shows = await Show.find({ showDateTime: { $gte: new Date() } })
//       .populate("movie")
//       .sort({ showDateTime: 1 });
//     res.json({ success: true, shows });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export const getAllBookings = async (req, res) => {
//   try {
//     const bookings = await Booking.find({})
//       .populate("user")
//       .populate({ path: "show", populate: { path: "movie" } })
//       .sort({ createdAt: -1 });
//     res.json({ success: true, bookings });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export const deleteShow = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const bookingsCount = await Booking.countDocuments({ show: id });
    
//     if (bookingsCount > 0) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "Cannot delete show with bookings" 
//       });
//     }

//     await Show.findByIdAndDelete(id);
//     res.json({ success: true, message: "Deleted" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export const deleteBooking = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const booking = await Booking.findById(id).populate('show');
    
//     if (!booking) {
//       return res.status(404).json({ success: false, message: "Not found" });
//     }

//     if (booking.show) {
//       const show = await Show.findById(booking.show._id);
//       if (show) {
//         booking.bookedSeats.forEach(seat => delete show.occupiedSeats[seat]);
//         show.markModified('occupiedSeats');
//         await show.save();
//       }
//     }

//     await Booking.findByIdAndDelete(id);
//     res.json({ success: true, message: "Deleted" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

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