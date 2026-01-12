// import express from "express";
// import { addShow, getNowPlayingMovies, getShow, getShows } from "../controllers/showController.js";
// import { protectAdmin } from "../middleware/auth.js";

// const showRouter = express.Router();

// showRouter.get('/now-playing', getNowPlayingMovies)
// showRouter.post('/add',protectAdmin, addShow)
// showRouter.get("/all", getShows)
// showRouter.get("/:movieId", getShow)

// export default showRouter;

// import express from "express";
// import { addShow, getNowPlayingMovies, getShow, getShows } from "../controllers/showController.js";
// import { protectAdmin } from "../middleware/auth.js"; // ✅ Fixed import path

// const showRouter = express.Router();

// // ✅ now-playing should be protected but accessed correctly
// showRouter.get('/now-playing',  getNowPlayingMovies);
// showRouter.post('/add',  addShow);

// // Public routes (no auth needed)
// showRouter.get("/all", getShows);
// showRouter.get("/:movieId", getShow);

// export default showRouter;

// import express from "express";
// import { requireAuth } from "@clerk/express";
// import { protectAdmin } from "../middleware/auth.js";
// import { addShow, getNowPlayingMovies, getShow, getShows } from "../controllers/showController.js";

// const showRouter = express.Router();

// // Admin routes - MUST have both requireAuth AND protectAdmin
// showRouter.get('/now-playing', protectAdmin, getNowPlayingMovies);
// showRouter.post('/add', protectAdmin, addShow);

// // Public routes
// showRouter.get("/all", getShows);
// showRouter.get("/:movieId", getShow);

// export default showRouter;

// import express from "express";
// import { requireAuth } from "@clerk/express";
// import { protectAdmin } from "../middleware/auth.js";
// import { addShow, getNowPlayingMovies, getShow, getShows } from "../controllers/showController.js";

// const showRouter = express.Router();

// // Admin routes
// showRouter.get('/now-playing', requireAuth(), protectAdmin, getNowPlayingMovies);
// showRouter.post('/add', requireAuth(), protectAdmin, addShow);

// // Public routes
// showRouter.get("/all", getShows);
// showRouter.get("/:movieId", getShow);

// export default showRouter;

import express from "express";

import { addShow, getNowPlayingMovies, getShow, getShows } from "../controllers/showController.js";

const showRouter = express.Router();

showRouter.get('/now-playing',  getNowPlayingMovies);
showRouter.post('/add',  addShow);
showRouter.get("/all", getShows);
showRouter.get("/:movieId", getShow);

export default showRouter;