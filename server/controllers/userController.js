// import { clerkClient } from "@clerk/express";
// import Booking from "../models/Booking.js";
// import Movie from "../models/Movie.js";


// // API Controller Function to Get User Bookings
// export const getUserBookings = async (req, res)=>{
//     try {
//         const user = req.auth().userId;

//         const bookings = await Booking.find({user}).populate({
//             path: "show",
//             populate: {path: "movie"}
//         }).sort({createdAt: -1 })
//         res.json({success: true, bookings})
//     } catch (error) {
//         console.error(error.message);
//         res.json({ success: false, message: error.message });
//     }
// }

// // API Controller Function to update Favorite Movie in Clerk User Metadata
// export const updateFavorite = async (req, res)=>{
//     try {
//         const { movieId } = req.body;
//         const userId = req.auth().userId;

//         const user = await clerkClient.users.getUser(userId)

//         if(!user.privateMetadata.favorites){
//             user.privateMetadata.favorites = []
//         }

//         if(!user.privateMetadata.favorites.includes(movieId)){
//             user.privateMetadata.favorites.push(movieId)
//         }else{
//             user.privateMetadata.favorites = user.privateMetadata.favorites.filter(item => item !== movieId)
//         }

//         await clerkClient.users.updateUserMetadata(userId, {privateMetadata: user.privateMetadata})

//         res.json({success: true, message: "Favorite movies updated" })
//     } catch (error) {
//         console.error(error.message);
//         res.json({ success: false, message: error.message });
//     }
// }

// export const getFavorites = async (req, res) =>{
//     try {
//         const user = await clerkClient.users.getUser(req.auth().userId)
//         const favorites = user.privateMetadata.favorites;

//         // Getting movies from database
//         const movies = await Movie.find({_id: {$in: favorites}})

//         res.json({success: true, movies})
//     } catch (error) {
//         console.error(error.message);
//         res.json({ success: false, message: error.message });
//     }
// }

// import Booking from "../models/Booking.js";
// import Movie from "../models/Movie.js";
// import User from "../models/User.js";

// /* ================================
//    GET USER BOOKINGS
// ================================ */
// export const getUserBookings = async (req, res) => {
//     try {
//         const userId = req.auth().userId;

//         // ✅ Verify user exists in MongoDB
//         const user = await User.findById(userId);
//         if (!user) {
//             return res.json({ 
//                 success: false, 
//                 message: "User not found" 
//             });
//         }

//         const bookings = await Booking.find({ user: userId })
//             .populate({
//                 path: "show",
//                 populate: { path: "movie" }
//             })
//             .sort({ createdAt: -1 });

//         res.json({ success: true, bookings });
//     } catch (error) {
//         console.error("Get bookings error:", error.message);
//         res.json({ success: false, message: error.message });
//     }
// };

// /* ================================
//    UPDATE FAVORITE MOVIES
//    ✅ Using MongoDB instead of Clerk metadata
// ================================ */
// export const updateFavorite = async (req, res) => {
//     try {
//         const { movieId } = req.body;
//         const userId = req.auth().userId;

//         if (!movieId) {
//             return res.json({ 
//                 success: false, 
//                 message: "Movie ID is required" 
//             });
//         }

//         // ✅ Get user from MongoDB
//         const user = await User.findById(userId);
        
//         if (!user) {
//             return res.json({ 
//                 success: false, 
//                 message: "User not found" 
//             });
//         }

//         // Initialize favorites array if it doesn't exist
//         if (!user.favorites) {
//             user.favorites = [];
//         }

//         // Toggle favorite
//         const movieIndex = user.favorites.indexOf(movieId);
        
//         if (movieIndex === -1) {
//             // Add to favorites
//             user.favorites.push(movieId);
//         } else {
//             // Remove from favorites
//             user.favorites.splice(movieIndex, 1);
//         }

//         // Save to MongoDB
//         await user.save();

//         res.json({ 
//             success: true, 
//             message: "Favorite movies updated",
//             favorites: user.favorites
//         });
//     } catch (error) {
//         console.error("Update favorite error:", error.message);
//         res.json({ success: false, message: error.message });
//     }
// };

// /* ================================
//    GET FAVORITE MOVIES
//    ✅ Using MongoDB instead of Clerk metadata
// ================================ */
// export const getFavorites = async (req, res) => {
//     try {
//         const userId = req.auth().userId;

//         // ✅ Get user from MongoDB
//         const user = await User.findById(userId);
        
//         if (!user) {
//             return res.json({ 
//                 success: false, 
//                 message: "User not found" 
//             });
//         }

//         const favorites = user.favorites || [];

//         // Get movies from database
//         const movies = await Movie.find({ _id: { $in: favorites } });

//         res.json({ success: true, movies });
//     } catch (error) {
//         console.error("Get favorites error:", error.message);
//         res.json({ success: false, message: error.message });
//     }
// };

// import Booking from "../models/Booking.js";
// import Movie from "../models/Movie.js";
// import User from "../models/User.js";

// export const getUserBookings = async (req, res) => {
//   try {
//     const userId = req.auth().userId;

//     const bookings = await Booking.find({ user: userId })
//       .populate({
//         path: "show",
//         populate: { path: "movie" }
//       })
//       .sort({ createdAt: -1 });

//     res.json({ success: true, bookings });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };

// export const updateFavorite = async (req, res) => {
//   try {
//     const { movieId } = req.body;
//     const userId = req.auth().userId;

//     if (!movieId) {
//       return res.json({ success: false, message: "Movie ID required" });
//     }

//     const user = await User.findById(userId);
    
//     if (!user) {
//       return res.json({ success: false, message: "User not found" });
//     }

//     if (!user.favorites) {
//       user.favorites = [];
//     }

//     const movieIndex = user.favorites.indexOf(movieId);
    
//     if (movieIndex === -1) {
//       user.favorites.push(movieId);
//     } else {
//       user.favorites.splice(movieIndex, 1);
//     }

//     await user.save();

//     res.json({ 
//       success: true, 
//       message: "Updated",
//       favorites: user.favorites
//     });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };

// export const getFavorites = async (req, res) => {
//   try {
//     const userId = req.auth().userId;

//     const user = await User.findById(userId);
    
//     if (!user) {
//       return res.json({ success: false, message: "User not found" });
//     }

//     const favorites = user.favorites || [];
//     const movies = await Movie.find({ _id: { $in: favorites } });

//     res.json({ success: true, movies });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };

import Booking from "../models/Booking.js";
import Movie from "../models/Movie.js";
import User from "../models/User.js";

export const getUserBookings = async (req, res) => {
  try {
    // ✅ Get userId from query params or body
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