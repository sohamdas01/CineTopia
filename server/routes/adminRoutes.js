// import express from "express";
// import { protectAdmin } from "../middleware/auth.js";
// import { getAllBookings, getAllShows, getDashboardData, isAdmin } from "../controllers/adminController.js";

// const adminRouter = express.Router();

// adminRouter.get('/is-admin', protectAdmin, isAdmin)
// adminRouter.get('/dashboard', protectAdmin, getDashboardData)
// adminRouter.get('/all-shows', protectAdmin, getAllShows)
// adminRouter.get('/all-bookings', protectAdmin, getAllBookings)

// export default adminRouter;

// import express from "express";
// import { protectAdmin } from "../middleware/auth.js";
// import {
//   getAllBookings,
//   getAllShows,
//   getDashboardData,
// } from "../controllers/adminController.js";

// const adminRouter = express.Router();

// // 🔒 ALL routes are admin-protected
// adminRouter.get("/dashboard", protectAdmin, getDashboardData);
// adminRouter.get("/all-shows", protectAdmin, getAllShows);
// adminRouter.get("/all-bookings", protectAdmin, getAllBookings);

// export default adminRouter;

// import express from "express";
// import { protectAdmin } from "../middleware/auth.js";
// import {
//   isAdmin,
//   getDashboardData,
//   getAllShows,
//   getAllBookings,
//   deleteShow,
//   deleteBooking,
// } from "../controllers/adminController.js";

// const adminRouter = express.Router();

// // All routes protected by admin middleware
// adminRouter.get("/check", protectAdmin, isAdmin);
// adminRouter.get("/dashboard", protectAdmin, getDashboardData);
// adminRouter.get("/shows",  getAllShows);
// adminRouter.get("/bookings", protectAdmin, getAllBookings);
// adminRouter.delete("/shows/:id", protectAdmin, deleteShow);
// adminRouter.delete("/bookings/:id", protectAdmin, deleteBooking);

// export default adminRouter;

// import express from "express";
// import { requireAuth } from "@clerk/express";
// import { protectAdmin } from "../middleware/auth.js";
// import {
//   isAdmin,
//   getDashboardData,
//   getAllShows,
//   getAllBookings,
//   deleteShow,
//   deleteBooking,
// } from "../controllers/adminController.js";

// const adminRouter = express.Router();

// // All routes need both requireAuth AND protectAdmin
// adminRouter.get("/check",  protectAdmin, isAdmin);
// adminRouter.get("/dashboard",  protectAdmin, getDashboardData);
// adminRouter.get("/shows", protectAdmin, getAllShows);
// adminRouter.get("/bookings",  protectAdmin, getAllBookings);
// adminRouter.delete("/shows/:id",  protectAdmin, deleteShow);
// adminRouter.delete("/bookings/:id",protectAdmin, deleteBooking);

// export default adminRouter;

// import express from "express";
// import { requireAuth } from "@clerk/express";
// import { protectAdmin } from "../middleware/auth.js";
// import {
//   isAdmin,
//   getDashboardData,
//   getAllShows,
//   getAllBookings,
//   deleteShow,
//   deleteBooking,
// } from "../controllers/adminController.js";

// const adminRouter = express.Router();

// // All admin routes
// adminRouter.get("/check", requireAuth(), protectAdmin, isAdmin);
// adminRouter.get("/dashboard", requireAuth(), protectAdmin, getDashboardData);
// adminRouter.get("/shows", requireAuth(), protectAdmin, getAllShows);
// adminRouter.get("/bookings", requireAuth(), protectAdmin, getAllBookings);
// adminRouter.delete("/shows/:id", requireAuth(), protectAdmin, deleteShow);
// adminRouter.delete("/bookings/:id", requireAuth(), protectAdmin, deleteBooking);

// export default adminRouter;

import express from "express";
import { requireAuth } from "@clerk/express";
import {
 
  getDashboardData,
  getAllShows,
  getAllBookings,
  deleteShow,
  deleteBooking,
} from "../controllers/adminController.js";

const adminRouter = express.Router();


adminRouter.get("/dashboard", getDashboardData);
adminRouter.get("/shows",  getAllShows);
adminRouter.get("/bookings",  getAllBookings);
adminRouter.delete("/shows/:id",  deleteShow);
adminRouter.delete("/bookings/:id",  deleteBooking);

export default adminRouter;