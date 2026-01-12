// import express from 'express';
// import { createBooking, getOccupiedSeats } from '../controllers/bookingController.js';

// const bookingRouter = express.Router();


// bookingRouter.post('/create', createBooking);
// bookingRouter.get('/seats/:showId', getOccupiedSeats);

// export default bookingRouter;
// import express from 'express';
// import { createBooking, getOccupiedSeats } from '../controllers/bookingController.js';
// import { clerkMiddleware, requireAuth } from '@clerk/express';

// const bookingRouter = express.Router();

// // createBooking needs authentication (regular users)
// bookingRouter.post('/create',  createBooking);

// // getOccupiedSeats can be public
// bookingRouter.get('/seats/:showId', getOccupiedSeats);

// export default bookingRouter;

import express from 'express';
import { clerkMiddleware, requireAuth } from '@clerk/express';
import { createBooking, getOccupiedSeats } from '../controllers/bookingController.js';
import { verifyToken } from '../middleware/auth.js';
const bookingRouter = express.Router();

bookingRouter.post('/create', createBooking);
bookingRouter.get('/seats/:showId', getOccupiedSeats);

export default bookingRouter;