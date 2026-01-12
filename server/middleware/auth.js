// import { clerkClient } from "@clerk/express";

// export const protectAdmin = async (req, res, next)=>{
//     try {
//         const { userId } = req.auth();

//         const user = await clerkClient.users.getUser(userId)

//         if(user.privateMetadata.role !== 'admin'){
//             return res.json({success: false, message: "not authorized"})
//         }

//         next();
//     } catch (error) {
//         return res.json({ success: false, message: "not authorized" });
//     }
// }


// import { clerkClient, getAuth } from "@clerk/express";

// export const protectAdmin = async (req, res, next) => {
//   try {
//     const auth = getAuth(req);

//     console.log("AUTH OBJECT 👉", auth); // 🔴 IMPORTANT

//     const { userId } = auth;

//     if (!userId) {
//       console.log("❌ NO USER ID");
//       return res.status(401).json({ success: false, message: "Unauthenticated" });
//     }

//     const user = await clerkClient.users.getUser(userId);

//     console.log("USER METADATA 👉", user.privateMetadata); // 🔴 IMPORTANT

//     if (user.privateMetadata.role !== "admin") {
//       console.log("❌ NOT ADMIN");
//       return res.status(403).json({ success: false, message: "Not authorized" });
//     }

//     console.log("✅ ADMIN AUTH PASSED");
//     next();
//   } catch (error) {
//     console.error("❌ AUTH ERROR:", error);
//     return res.status(401).json({ success: false, message: "Unauthorized" });
//   }
// };

// import { clerkClient } from "@clerk/express";

// export const protectAdmin = async (req, res, next) => {
//   try {
//     const auth = req.auth();
//     if (!auth?.userId) {
//       return res.status(401).json({ success: false, message: "Unauthorized" });
//     }

//     const user = await clerkClient.users.getUser(auth.userId);

//     if (user.privateMetadata?.role !== "admin") {
//       return res.status(403).json({ success: false, message: "Forbidden" });
//     }

//     next();
//   } catch (error) {
//     console.error("Admin auth error:", error);
//     return res.status(401).json({ success: false, message: "Unauthorized" });
//   }
// };

// import { clerkClient } from "@clerk/express";

// export const protectAdmin = async (req, res, next) => {
//   try {
//     console.log("========================================");
//     console.log("🔐 ADMIN PROTECTION CHECK");
//     console.log("========================================");
    
//     const auth = req.auth();
//     console.log("1️⃣ Auth object:", auth);
    
//     if (!auth?.userId) {
//       console.log("❌ No userId in auth object");
//       return res.status(401).json({ 
//         success: false, 
//         message: "Unauthorized - No user ID" 
//       });
//     }

//     console.log("2️⃣ Fetching user from Clerk...");
//     const user = await clerkClient.users.getUser(auth.userId);
    
//     console.log("3️⃣ User fetched:");
//     console.log("   - Email:", user.emailAddresses[0]?.emailAddress);
//     console.log("   - Private Metadata:", user.privateMetadata);
//     console.log("   - Public Metadata:", user.publicMetadata);
    
//     const isAdmin = user.privateMetadata?.role === "admin";
//     console.log("4️⃣ Is Admin:", isAdmin);

//     if (!isAdmin) {
//       console.log("❌ User is not admin, access denied");
//       return res.status(403).json({ 
//         success: false, 
//         message: "Forbidden - Admin access required",
//         debug: {
//           userId: auth.userId,
//           privateMetadata: user.privateMetadata,
//           expected: { role: "admin" }
//         }
//       });
//     }

//     console.log("✅ Admin access granted");
//     console.log("========================================");
//     next();
//   } catch (error) {
//     console.error("❌ Admin auth error:", error);
//     return res.status(401).json({ 
//       success: false, 
//       message: "Unauthorized - Auth error",
//       error: error.message 
//     });
//   }
// };

// import { clerkClient } from "@clerk/express";

// // Get admin emails from environment variable
// const getAdminEmails = () => {
//   const emails = process.env.ADMIN_EMAILS || "";
//   return emails
//     .split(",")
//     .map(email => email.trim().toLowerCase())
//     .filter(email => email.length > 0);
// };

// export const protectAdmin = async (req, res, next) => {
//   try {
//     const auth = req.auth();
    
//     if (!auth?.userId) {
//       return res.status(401).json({ 
//         success: false, 
//         message: "Unauthorized" 
//       });
//     }

//     const user = await clerkClient.users.getUser(auth.userId);
//     const userEmail = user.emailAddresses[0]?.emailAddress?.toLowerCase();
//     const adminEmails = getAdminEmails();
    
//     const isAdmin = adminEmails.includes(userEmail);

//     if (!isAdmin) {
//       return res.status(403).json({ 
//         success: false, 
//         message: "Forbidden - Admin access required"
//       });
//     }

//     // Attach user info to request
//     req.user = user;
//     req.userEmail = userEmail;
    
//     next();
//   } catch (error) {
//     console.error("Admin auth error:", error);
//     return res.status(401).json({ 
//       success: false, 
//       message: "Unauthorized"
//     });
//   }
// };
// import { clerkClient } from "@clerk/express";
// import User from "../models/User.js";

// // Get admin emails from environment
// const getAdminEmails = () => {
//   const emails = process.env.ADMIN_EMAILS || "";
//   return emails
//     .split(",")
//     .map(email => email.trim().toLowerCase())
//     .filter(email => email.length > 0);
// };

// export const protectAdmin = async (req, res, next) => {
//   try {
//     console.log("🔐 Admin Protection Check");

//     const auth = req.auth;
    
//     if (typeof auth !== 'function') {
//       return res.status(401).json({ 
//         success: false, 
//         message: "Authentication middleware not configured" 
//       });
//     }

//     const authData = auth();
    
//     if (!authData || !authData.userId) {
//       return res.status(401).json({ 
//         success: false, 
//         message: "Unauthorized - Please sign in" 
//       });
//     }

//     // ✅ OPTION 1: Get user from MongoDB (FASTER!)
//     const user = await User.findById(authData.userId);
    
//     if (!user) {
//       return res.status(401).json({ 
//         success: false, 
//         message: "User not found" 
//       });
//     }

//     // ✅ Now we can use the simple email field
//     const userEmail = user.email.toLowerCase();

//     if (!userEmail) {
//       return res.status(401).json({ 
//         success: false, 
//         message: "User email not found" 
//       });
//     }

//     const adminEmails = getAdminEmails();

//     if (adminEmails.length === 0) {
//       return res.status(500).json({ 
//         success: false, 
//         message: "Admin configuration error" 
//       });
//     }

//     const isAdmin = adminEmails.includes(userEmail);

//     if (!isAdmin) {
//       return res.status(403).json({ 
//         success: false, 
//         message: "Forbidden - Admin access required"
//       });
//     }

//     console.log("✅ Admin access granted:", userEmail);
    
//     // Attach user info to request
//     req.user = user;
//     req.userEmail = userEmail;
    
//     next();
//   } catch (error) {
//     console.error("❌ Admin auth error:", error.message);
    
//     return res.status(500).json({ 
//       success: false, 
//       message: "Authentication error"
//     });
//   }
// };

// import { clerkClient } from "@clerk/express";
// import User from "../models/User.js";

// const getAdminEmails = () => {
//   const emails = process.env.ADMIN_EMAILS || "";
//   return emails
//     .split(",")
//     .map(email => email.trim().toLowerCase())
//     .filter(email => email.length > 0);
// };

// export const protectAdmin = async (req, res, next) => {
//   try {
//     console.log("🔐 Admin Protection Check");

//     const auth = req.auth;
    
//     if (typeof auth !== 'function') {
//       return res.status(401).json({ 
//         success: false, 
//         message: "Authentication middleware not configured" 
//       });
//     }

//     const authData = auth();
    
//     if (!authData || !authData.userId) {
//       return res.status(401).json({ 
//         success: false, 
//         message: "Unauthorized - Please sign in" 
//       });
//     }

//     // ✅ Try MongoDB first (faster)
//     let user = await User.findById(authData.userId);
//     let userEmail;

//     if (user) {
//       // Found in MongoDB - use simple email field
//       userEmail = user.email.toLowerCase();
//       console.log("✅ User found in MongoDB:", userEmail);
//     } else {
//       // Not in MongoDB yet - fallback to Clerk
//       console.log("⚠️ User not in MongoDB, fetching from Clerk...");
//       const clerkUser = await clerkClient.users.getUser(authData.userId);
//       userEmail = clerkUser.emailAddresses[0]?.emailAddress?.toLowerCase();
      
//       // Optional: Create user in MongoDB for next time
//       user = await User.create({
//         _id: authData.userId,
//         email: clerkUser.emailAddresses[0]?.emailAddress,
//         name: `${clerkUser.firstName} ${clerkUser.lastName}`,
//         image: clerkUser.imageUrl
//       });
      
//       console.log("✅ User created in MongoDB from Clerk");
//     }

//     if (!userEmail) {
//       return res.status(401).json({ 
//         success: false, 
//         message: "User email not found" 
//       });
//     }

//     // Check admin status
//     const adminEmails = getAdminEmails();

//     if (adminEmails.length === 0) {
//       return res.status(500).json({ 
//         success: false, 
//         message: "Admin configuration error" 
//       });
//     }

//     const isAdmin = adminEmails.includes(userEmail);

//     if (!isAdmin) {
//       return res.status(403).json({ 
//         success: false, 
//         message: "Forbidden - Admin access required"
//       });
//     }

//     console.log("✅ Admin access granted:", userEmail);
    
//     req.user = user;
//     req.userEmail = userEmail;
    
//     next();
//   } catch (error) {
//     console.error("❌ Admin auth error:", error.message);
    
//     return res.status(500).json({ 
//       success: false, 
//       message: "Authentication error"
//     });
//   }
// };

// import { clerkClient } from "@clerk/express";
// import User from "../models/User.js";
// export const protectAdmin = async (req, res, next) => {
//   try {
//     const { userId } = req.auth();

//     if (!userId) {
//       return res.status(401).json({ success: false, message: "Unauthorized" });
//     }

//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(401).json({ success: false, message: "User not found" });
//     }
    

//     const adminEmail = process.env.ADMIN_EMAIL;

//     const userEmail = user.email;

//     if (userEmail !== adminEmail) {
//       return res.status(403).json({ success: false, message: "Not admin" });
//     }

//     next();
//   } catch (error) {
//     console.error(error);
//     return res.status(401).json({ success: false, message: "Unauthorized" });
//   }
// };

// import { clerkClient } from "@clerk/express";

// const ADMIN_EMAILS = process.env.ADMIN_EMAILS?.split(",").map(e => e.trim().toLowerCase()) || [];

// export const protectAdmin = async (req, res, next) => {
//   try {
//     // Get userId from Clerk
//     const { userId } = req.auth();
    
//     if (!userId) {
//       return res.status(401).json({ success: false, message: "Not logged in" });
//     }

//     // Get user from Clerk
//     const user = await clerkClient.users.getUser(userId);
//     const userEmail = user.emailAddresses[0]?.emailAddress?.toLowerCase();

//     console.log("👤 User Email:", userEmail);
//     console.log("👑 Admin Emails:", ADMIN_EMAILS);

//     // Check if admin
//     if (!ADMIN_EMAILS.includes(userEmail)) {
//       return res.status(403).json({ success: false, message: "Not admin" });
//     }

//     console.log("✅ Admin authorized!");
//     next();
//   } catch (error) {
//     console.error("❌ Auth error:", error.message);
//     return res.status(401).json({ success: false, message: "Auth failed" });
//   }
// };

// import User from "../models/User.js";

// export const protectAdmin = async (req, res, next) => {
//   try {
//     const { userId } = req.auth();
    
//     if (!userId) {
//       return res.status(401).json({ success: false, message: "Not logged in" });
//     }

//     // Get user from MongoDB
//     const user = await User.findById(userId);
    
//     if (!user) {
//       return res.status(401).json({ success: false, message: "User not found" });
//     }

//     // ✅ SIMPLE CHECK - Just like your blog!
//     if (!user.isAdmin) {
//       return res.status(403).json({ success: false, message: "Access denied" });
//     }

//     // Admin verified
//     req.user = user;
//     next();
//   } catch (error) {
//     console.error("Admin auth error:", error);
//     return res.status(500).json({ success: false, message: "Auth error" });
//   }
// };

// middleware/auth.js
// import User from "../models/User.js";

// export const protectAdmin = async (req, res, next) => {
//   try {
//     const userId = req.auth().userId;

//     const user = await User.findById(userId);

//     if (!user || user.isAdmin !== true) {
//       return res.status(403).json({ message: "Admin only" });
//     }

//     next();
//   } catch (err) {
//     res.status(401).json({ message: "Unauthorized" });
//   }
// };


// middleware/protectAdmin.js
// import User from "../models/User.js";

// export const protectAdmin = async (req, res, next) => {
//   try {
//     const auth = req.auth();
//     if (!auth || !auth.userId) {
//       return res.status(401).json({ message: "Not authenticated" });
//     }

//     const user = await User.findById(auth.userId);

//     if (!user) {
//       return res.status(401).json({ message: "User not found" });
//     }

//     if (user.isAdmin !== true) {
//       return res.status(403).json({ message: "Admin access only" });
//     }

//     next();
//   } catch (err) {
//     console.error("ADMIN AUTH ERROR:", err);
//     return res.status(401).json({ message: "Unauthorized" });
//   }
// };

// import User from "../models/User.js";

// export const protectAdmin = async (req, res, next) => {
//   try {
//     // Get userId from Clerk token (this is fine, just getting ID)
//     const { userId } = req.auth();
    
//     if (!userId) {
//       return res.status(401).json({ success: false, message: "Not logged in" });
//     }

//     // ✅ ONLY check MongoDB - NO Clerk API calls
//     const user = await User.findById(userId);
    
//     if (!user) {
//       return res.status(401).json({ success: false, message: "User not found" });
//     }

//     // ✅ Simple check - just like your blog
//     if (!user.isAdmin) {
//       return res.status(403).json({ success: false, message: "Not admin" });
//     }

//     // Pass user to next middleware
//     req.user = user;
//     next();
//   } catch (error) {
//     console.error("Auth error:", error);
//     return res.status(500).json({ success: false, message: "Auth error" });
//   }
// };

// import User from "../models/User.js";

// export const protectAdmin = async (req, res, next) => {
//   try {
//     const { userId } = req.auth();

//     if (!userId) {
//       return res.status(401).json({ message: "Not logged in" });
//     }

//     const user = await User.findById(userId);

//     if (!user || !user.isAdmin) {
//       return res.status(401).json({ message: "Admin only" });
//     }

//     req.admin = user;
//     next();
//   } catch (err) {
//     console.error(err);
//     res.status(401).json({ message: "Unauthorized" });
//   }
// };

// middleware/auth.js
import { clerkClient } from '@clerk/express';

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    const session = await clerkClient.sessions.verifySession(token);
    req.auth = () => ({ userId: session.userId });
    
    next();
  } catch (error) {
    return res.json({ success: false, message: "Invalid token" });
  }
};