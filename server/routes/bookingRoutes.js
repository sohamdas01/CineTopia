

import express from 'express';
import { clerkMiddleware, requireAuth } from '@clerk/express';
import { createBooking, getOccupiedSeats } from '../controllers/bookingController.js';
import { verifyToken } from '../middleware/auth.js';
const bookingRouter = express.Router();

bookingRouter.post('/create', createBooking);
bookingRouter.get('/seats/:showId', getOccupiedSeats);

export default bookingRouter;