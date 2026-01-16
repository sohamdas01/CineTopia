//currently the middleware is not working for some reason
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