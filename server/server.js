// import express from 'express';
// import cors from 'cors';
// import 'dotenv/config';
// import connectDB from './configs/db.js';
// import { clerkMiddleware } from '@clerk/express'
// import { serve } from "inngest/express";
// import { inngest, functions } from "./inngest/index.js"
// import showRouter from './routes/showRoutes.js';
// import bookingRouter from './routes/bookingRoutes.js';
// import adminRouter from './routes/adminRoutes.js';
// import userRouter from './routes/userRoutes.js';
// import { stripeWebhooks } from './controllers/stripeWebhooks.js';

// const app = express();
// const port = 3000;

// await connectDB()

// // Stripe Webhooks Route
// app.use('/api/stripe', express.raw({type: 'application/json'}), stripeWebhooks)

// // Middleware
// app.use(express.json())
// app.use(cors())
// app.use(clerkMiddleware())


// // API Routes
// app.get('/', (req, res)=> res.send('Server is Live!'))
// app.use('/api/inngest', serve({ client: inngest, functions }))
// app.use('/api/show', showRouter)
// app.use('/api/booking', bookingRouter)
// app.use('/api/admin', adminRouter)
// app.use('/api/user', userRouter)


// app.listen(port, ()=> console.log(`Server listening at http://localhost:${port}`));

// import express from "express";
// import cors from "cors";
// import "dotenv/config";
// import connectDB from "./configs/db.js";
// import { clerkMiddleware } from "@clerk/express";
// import { serve } from "inngest/express";
// import { inngest, functions } from "./inngest/index.js";
// import { getAuth } from "@clerk/express";


// import showRouter from "./routes/showRoutes.js";
// import bookingRouter from "./routes/bookingRoutes.js";
// import adminRouter from "./routes/adminRoutes.js";
// import userRouter from "./routes/userRoutes.js";
// import { stripeWebhooks } from "./controllers/stripeWebhooks.js";

// const app = express();
// const port = 3000;

// await connectDB();

// /* ======================
//    CORE MIDDLEWARE
// ====================== */
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

// app.use(express.json());

// /* 🔴 REQUIRED FOR CLERK */
// app.use(clerkMiddleware());
// app.get("/debug-auth", (req, res) => {
//   const auth = getAuth(req);
//   res.json(auth);
// });

// /* ======================
//    ROUTES
// ====================== */
// app.get("/", (req, res) => res.send("Server is Live!"));

// // Inngest
// app.use("/api/inngest", serve({ client: inngest, functions }));

// // APIs
// app.use("/api/show", showRouter);
// app.use("/api/booking", bookingRouter);
// app.use("/api/admin", adminRouter);
// app.use("/api/user", userRouter);

// /* ======================
//    STRIPE WEBHOOK (RAW)
// ====================== */
// app.post(
//   "/api/stripe",
//   express.raw({ type: "application/json" }),
//   stripeWebhooks
// );

// app.listen(port, () =>
//   console.log(`Server listening at http://localhost:${port}`)
// );

// import express from "express";
// import cors from "cors";
// import "dotenv/config";
// import connectDB from "./configs/db.js";
// import { clerkMiddleware } from "@clerk/express";
// import { serve } from "inngest/express";
// import { inngest, functions } from "./inngest/index.js";

// import showRouter from "./routes/showRoutes.js";
// import bookingRouter from "./routes/bookingRoutes.js";
// import adminRouter from "./routes/adminRoutes.js";
// import userRouter from "./routes/userRoutes.js";
// import { stripeWebhooks } from "./controllers/stripeWebhooks.js";

// const app = express();
// const port = 3000;

// await connectDB();

// /* ======================
//    CORE MIDDLEWARE
// ====================== */
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

// app.use(express.json());
// app.use(clerkMiddleware());

// /* ======================
//    ROUTES
// ====================== */
// app.get("/", (req, res) => res.send("Server is Live!"));

// // Inngest
// app.use("/api/inngest", serve({ client: inngest, functions }));

// // APIs
// app.use("/api/show", showRouter);
// app.use("/api/booking", bookingRouter);
// app.use("/api/admin", adminRouter);
// app.use("/api/user", userRouter);

// /* ======================
//    STRIPE WEBHOOK (RAW)
// ====================== */
// app.post(
//   "/api/stripe",
//   express.raw({ type: "application/json" }),
//   stripeWebhooks
// );

// app.listen(port, () =>
//   console.log(`Server listening at http://localhost:${port}`)
// );
// import express from "express";
// import cors from "cors";
// import "dotenv/config";
// import connectDB from "./configs/db.js";
// import { clerkMiddleware } from "@clerk/express";
// import { serve } from "inngest/express";
// import { inngest, functions } from "./inngest/index.js";

// import showRouter from "./routes/showRoutes.js";
// import bookingRouter from "./routes/bookingRoutes.js";
// import adminRouter from "./routes/adminRoutes.js";
// import userRouter from "./routes/userRoutes.js";
// import { stripeWebhooks } from "./controllers/stripeWebhooks.js";

// const app = express();
// const port = 3000;

// await connectDB();

// /* ======================
//    CORE MIDDLEWARE
// ====================== */
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

// /* ======================
//    ⚠️ IMPORTANT: Clerk middleware BEFORE express.json()
// ====================== */
// app.use(clerkMiddleware());

// app.use(express.json());

// /* ======================
//    ROUTES
// ====================== */
// app.get("/", (req, res) => res.send("Server is Live!"));

// // Inngest
// app.use("/api/inngest", serve({ client: inngest, functions }));

// // APIs
// app.use("/api/show", showRouter);
// app.use("/api/booking", bookingRouter);
// app.use("/api/admin", adminRouter);
// app.use("/api/user", userRouter);

// /* ======================
//    STRIPE WEBHOOK (RAW)
// ====================== */
// app.post(
//   "/api/stripe",
//   express.raw({ type: "application/json" }),
//   stripeWebhooks
// );

// app.listen(port, () =>
//   console.log(`Server listening at http://localhost:${port}`)
// );

// import express from "express";
// import cors from "cors";
// import "dotenv/config";
// import connectDB from "./configs/db.js";
// import { clerkMiddleware } from "@clerk/express";
// import { serve } from "inngest/express";
// import { inngest, functions } from "./inngest/index.js";

// import showRouter from "./routes/showRoutes.js";
// import bookingRouter from "./routes/bookingRoutes.js";
// import adminRouter from "./routes/adminRoutes.js";
// import userRouter from "./routes/userRoutes.js";
// import { stripeWebhooks } from "./controllers/stripeWebhooks.js";

// const app = express();
// const port = 3000;

// await connectDB();

// /* ======================
//    MIDDLEWARE - ORDER IS CRITICAL!
// ====================== */

// // 1. CORS first
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

// // 2. Clerk middleware BEFORE json parser
// app.use(clerkMiddleware());

// // 3. JSON parser
// app.use(express.json());

// /* ======================
//    DEBUG ENDPOINTS (Optional - Remove in production)
// ====================== */
// app.get("/", (req, res) => res.send("Server is Live!"));

// app.get("/api/debug/env", (req, res) => {
//   res.json({
//     hasClerkSecret: !!process.env.CLERK_SECRET_KEY,
//     hasAdminEmails: !!process.env.ADMIN_EMAILS,
//     adminEmails: process.env.ADMIN_EMAILS?.split(",").map(e => e.trim()),
//     hasOmdbKey: !!process.env.OMDB_API_KEY,
//     hasWatchmodeKey: !!process.env.WATCHMODE_API_KEY,
//   });
// });

// app.get("/api/debug/auth", async (req, res) => {
//   try {
//     const auth = req.auth;
    
//     if (typeof auth !== 'function') {
//       return res.json({
//         success: false,
//         message: "Clerk middleware not attached"
//       });
//     }

//     const authData = auth();
    
//     if (!authData?.userId) {
//       return res.json({
//         success: false,
//         message: "No user authenticated"
//       });
//     }

//     const { clerkClient } = await import("@clerk/express");
//     const user = await clerkClient.users.getUser(authData.userId);
    
//     res.json({
//       success: true,
//       userId: authData.userId,
//       email: user.emailAddresses[0]?.emailAddress
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: error.message
//     });
//   }
// });

// /* ======================
//    ROUTES
// ====================== */

// // Inngest
// app.use("/api/inngest", serve({ client: inngest, functions }));

// // APIs
// app.use("/api/show", showRouter);
// app.use("/api/booking", bookingRouter);
// app.use("/api/admin", adminRouter);
// app.use("/api/user", userRouter);

// /* ======================
//    STRIPE WEBHOOK (RAW)
// ====================== */
// app.post(
//   "/api/stripe",
//   express.raw({ type: "application/json" }),
//   stripeWebhooks
// );

// /* ======================
//    ERROR HANDLING
// ====================== */
// app.use((err, req, res, next) => {
//   console.error("Server Error:", err);
//   res.status(500).json({
//     success: false,
//     message: err.message || "Internal server error"
//   });
// });

// app.listen(port, () =>
//   console.log(`Server listening at http://localhost:${port}`)
// );

// import express from "express";
// import cors from "cors";
// import "dotenv/config";
// import connectDB from "./configs/db.js";
// import { clerkMiddleware } from "@clerk/express";
// import { serve } from "inngest/express";
// import { inngest, functions } from "./inngest/index.js";

// import showRouter from "./routes/showRoutes.js";
// import bookingRouter from "./routes/bookingRoutes.js";
// import adminRouter from "./routes/adminRoutes.js";
// import userRouter from "./routes/userRoutes.js";
// import { stripeWebhooks } from "./controllers/stripeWebhooks.js";

// const app = express();
// const port = process.env.PORT || 3000;

// // Connect to MongoDB
// await connectDB();

// /* ======================
//    MIDDLEWARE
// ====================== */
// app.use(
//   cors({
//     origin: process.env.CLIENT_URL || "http://localhost:5173",
//     credentials: true,
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

// // Clerk middleware (before JSON parser)
// app.use(clerkMiddleware());

// // JSON parser
// app.use(express.json());

// /* ======================
//    ROUTES
// ====================== */
// app.get("/", (req, res) => {
//   res.json({ 
//     success: true, 
//     message: "Movie Booking API is running",
//     timestamp: new Date().toISOString()
//   });
// });

// // Health check
// app.get("/health", (req, res) => {
//   res.json({ 
//     success: true, 
//     status: "healthy",
//     database: "connected"
//   });
// });

// // Inngest
// app.use("/api/inngest", serve({ client: inngest, functions }));

// // API Routes
// app.use("/api/show", showRouter);
// app.use("/api/booking", bookingRouter);
// app.use("/api/admin", adminRouter);
// app.use("/api/user", userRouter);

// // Stripe Webhook (must use raw body)
// app.post(
//   "/api/stripe",
//   express.raw({ type: "application/json" }),
//   stripeWebhooks
// );

// /* ======================
//    ERROR HANDLING
// ====================== */
// app.use((err, req, res, next) => {
//   console.error("❌ Server Error:", err);
//   res.status(500).json({
//     success: false,
//     message: err.message || "Internal server error"
//   });
// });

// // 404 Handler
// app.use((req, res) => {
//   res.status(404).json({
//     success: false,
//     message: "Route not found"
//   });
// });

// /* ======================
//    START SERVER
// ====================== */
// app.listen(port, () => {
//   console.log("========================================");
//   console.log(`✅ Server running on port ${port}`);
//   console.log(`📍 http://localhost:${port}`);
//   console.log("========================================");
// });
// import express from "express";
// import cors from "cors";
// import "dotenv/config";
// import connectDB from "./configs/db.js";
// import { clerkMiddleware, requireAuth } from "@clerk/express";
// import { clerkClient } from "@clerk/express";
// import { serve } from "inngest/express";
// import { inngest, functions } from "./inngest/index.js";

// import showRouter from "./routes/showRoutes.js";
// import bookingRouter from "./routes/bookingRoutes.js";
// import adminRouter from "./routes/adminRoutes.js";
// import userRouter from "./routes/userRoutes.js";
// import { stripeWebhooks } from "./controllers/stripeWebhooks.js";

// const app = express();
// const port = process.env.PORT || 3000;

// // Connect to MongoDB
// await connectDB();

// /* ======================
//    MIDDLEWARE ORDER IS CRITICAL!
// ====================== */

// // 1. CORS first
// app.use(
//   cors({
//     origin: process.env.CLIENT_URL || "http://localhost:5173",
//     credentials: true,
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

// // 2. Clerk middleware BEFORE json parser (CRITICAL!)
// app.use(clerkMiddleware());

// // 3. JSON parser
// app.use(express.json());

// /* ======================
//    DEBUG & TEST ROUTES
// ====================== */
// app.get("/", (req, res) => {
//   res.json({ 
//     success: true, 
//     message: "Movie Booking API is running",
//     timestamp: new Date().toISOString()
//   });
// });

// // Health check
// app.get("/health", (req, res) => {
//   res.json({ 
//     success: true, 
//     status: "healthy",
//     database: "connected",
//     timestamp: new Date().toISOString()
//   });
// });

// // Test Clerk auth (requires login)
// app.get("/api/test-clerk", requireAuth(), (req, res) => {
//   try {
//     const { userId } = req.auth();
//     res.json({ 
//       success: true, 
//       userId: userId,
//       message: "Clerk authentication is working!" 
//     });
//   } catch (error) {
//     res.status(500).json({ 
//       success: false, 
//       error: error.message 
//     });
//   }
// });

// // Test admin status (requires login)
// app.get("/api/test-admin", requireAuth(), async (req, res) => {
//   try {
//     const { userId } = req.auth();
    
//     // Get user from Clerk
//     const user = await clerkClient.users.getUser(userId);
//     const userEmail = user.emailAddresses[0]?.emailAddress?.toLowerCase();
    
//     // Get admin emails from env
//     const adminEmails = (process.env.ADMIN_EMAILS || "")
//       .split(",")
//       .map(e => e.trim().toLowerCase())
//       .filter(e => e.length > 0);
    
//     const isAdmin = adminEmails.includes(userEmail);

//     res.json({
//       success: true,
//       userId,
//       userEmail,
//       adminEmails,
//       isAdmin,
//       message: isAdmin ? "You are an admin!" : "You are not an admin"
//     });
//   } catch (error) {
//     res.status(500).json({ 
//       success: false, 
//       error: error.message 
//     });
//   }
// });

// // Check environment variables
// app.get("/api/debug/env", (req, res) => {
//   res.json({
//     hasClerkSecret: !!process.env.CLERK_SECRET_KEY,
//     clerkSecretPrefix: process.env.CLERK_SECRET_KEY?.substring(0, 7),
//     hasAdminEmails: !!process.env.ADMIN_EMAILS,
//     adminEmailsCount: process.env.ADMIN_EMAILS?.split(",").length || 0,
//     adminEmails: process.env.ADMIN_EMAILS?.split(",").map(e => e.trim()),
//     hasOmdbKey: !!process.env.OMDB_API_KEY,
//     hasWatchmodeKey: !!process.env.WATCHMODE_API_KEY,
//     hasStripeKey: !!process.env.STRIPE_SECRET_KEY,
//     nodeEnv: process.env.NODE_ENV || "development"
//   });
// });

// /* ======================
//    MAIN ROUTES
// ====================== */

// // Inngest
// app.use("/api/inngest", serve({ client: inngest, functions }));

// // API Routes
// app.use("/api/show", showRouter);
// app.use("/api/booking", bookingRouter);
// app.use("/api/admin", adminRouter);
// app.use("/api/user", userRouter);

// /* ======================
//    STRIPE WEBHOOK (RAW BODY)
//    Must be BEFORE express.json()
// ====================== */
// app.post(
//   "/api/stripe",
//   express.raw({ type: "application/json" }),
//   stripeWebhooks
// );

// /* ======================
//    ERROR HANDLING
// ====================== */
// app.use((err, req, res, next) => {
//   console.error("❌ Server Error:", err);
//   res.status(500).json({
//     success: false,
//     message: err.message || "Internal server error",
//     stack: process.env.NODE_ENV === "development" ? err.stack : undefined
//   });
// });

// // 404 Handler
// app.use((req, res) => {
//   res.status(404).json({
//     success: false,
//     message: `Route not found: ${req.method} ${req.path}`
//   });
// });

// /* ======================
//    START SERVER
// ====================== */
// app.listen(port, () => {
//   console.log("========================================");
//   console.log(`✅ Server running on port ${port}`);
//   console.log(`📍 http://localhost:${port}`);
//   console.log(`🔐 Clerk: ${process.env.CLERK_SECRET_KEY ? "Configured ✓" : "Missing ✗"}`);
//   console.log(`👑 Admin: ${process.env.ADMIN_EMAILS ? "Configured ✓" : "Missing ✗"}`);
//   console.log(`🎬 OMDb: ${process.env.OMDB_API_KEY ? "Configured ✓" : "Missing ✗"}`);
//   console.log(`📺 Watchmode: ${process.env.WATCHMODE_API_KEY ? "Configured ✓" : "Missing ✗"}`);
//   console.log("========================================");
// });

// // Handle uncaught errors
// process.on('unhandledRejection', (error) => {
//   console.error('❌ Unhandled Rejection:', error);
// });

// process.on('uncaughtException', (error) => {
//   console.error('❌ Uncaught Exception:', error);
//   process.exit(1);
// });

// import express from "express";
// import cors from "cors";
// import "dotenv/config";
// import connectDB from "./configs/db.js";
// import { clerkMiddleware } from "@clerk/express";
// import { serve } from "inngest/express";
// import { inngest, functions } from "./inngest/index.js";

// import showRouter from "./routes/showRoutes.js";
// import bookingRouter from "./routes/bookingRoutes.js";
// import adminRouter from "./routes/adminRoutes.js";
// import userRouter from "./routes/userRoutes.js";
// import { stripeWebhooks } from "./controllers/stripeWebhooks.js";

// const app = express();
// const port = 3000;

// await connectDB();

// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true,
//   allowedHeaders: ["Content-Type", "Authorization"],
// }));

// app.use(clerkMiddleware());
// app.use(express.json());

// app.get("/", (req, res) => res.send("Server Running"));

// app.use("/api/inngest", serve({ client: inngest, functions }));
// app.use("/api/show", showRouter);
// app.use("/api/booking", bookingRouter);
// app.use("/api/admin", adminRouter);
// app.use("/api/user", userRouter);

// app.post("/api/stripe", express.raw({ type: "application/json" }), stripeWebhooks);

// app.listen(port, () => console.log(`Server on port ${port}`));

import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";

import showRouter from "./routes/showRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import userRouter from "./routes/userRoutes.js";
import { stripeWebhooks } from "./controllers/stripeWebhooks.js";

const app = express();
const port = 3000;

await connectDB();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(clerkMiddleware());

// ✅ CRITICAL: Stripe webhook MUST be BEFORE express.json()
app.post("/api/stripe", express.raw({ type: "application/json" }), stripeWebhooks);

// ✅ Now add express.json() AFTER webhook
app.use(express.json());

app.get("/", (req, res) => res.send("Server Running"));

app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/show", showRouter);
app.use("/api/booking", bookingRouter);
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);

app.listen(port, () => console.log(`Server on port ${port}`));