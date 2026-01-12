// import express from "express";
// import { getFavorites, getUserBookings, updateFavorite } from "../controllers/userController.js";

// const userRouter = express.Router();

// userRouter.get('/bookings', getUserBookings)
// userRouter.post('/update-favorite', updateFavorite)
// userRouter.get('/favorites', getFavorites)

// export default userRouter;
// import express from "express";
// import { getFavorites, getUserBookings, updateFavorite } from "../controllers/userController.js";
// import { requireAuth } from "@clerk/express";

// const userRouter = express.Router();

// // All user routes need authentication
// userRouter.get('/bookings', getUserBookings);
// userRouter.post('/update-favorite',  updateFavorite);
// userRouter.get('/favorites', getFavorites);

// export default userRouter;
import express from "express";
import { requireAuth } from "@clerk/express";
import { getFavorites, getUserBookings, updateFavorite } from "../controllers/userController.js";
import { verifyToken } from "../middleware/auth.js";
const userRouter = express.Router();

userRouter.get('/bookings',  getUserBookings);
userRouter.post('/update-favorite',  updateFavorite);
userRouter.get('/favorites',  getFavorites);

export default userRouter;