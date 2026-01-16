
import express from "express";
import { requireAuth } from "@clerk/express";
import {
 
  getDashboardData,
  getAllShows,
  getAllBookings,
  deleteShow,
  deleteBooking,
  getAllUsers,
  getUserStats,
} from "../controllers/adminController.js";

const adminRouter = express.Router();


adminRouter.get("/dashboard", getDashboardData);
adminRouter.get("/shows",  getAllShows);
adminRouter.get("/bookings",  getAllBookings);
adminRouter.delete("/shows/:id",  deleteShow);
adminRouter.delete("/bookings/:id",  deleteBooking);
adminRouter.get('/users', getAllUsers); 
adminRouter.get('/users/:userId', getUserStats); 

export default adminRouter;