// import axios from "axios"
// import Movie from "../models/Movie.js";
// import Show from "../models/Show.js";
// import { inngest } from "../inngest/index.js";

// // API to get now playing movies from TMDB API
// export const getNowPlayingMovies = async (req, res)=>{
//     try {
//         const { data } = await axios.get('https://api.themoviedb.org/3/movie/now_playing', {
//             headers: {Authorization : `Bearer ${process.env.TMDB_API_KEY}`}
//         })

//         const movies = data.results;
//         res.json({success: true, movies: movies})
//     } catch (error) {
//         console.error(error);
//         res.json({success: false, message: error.message})
//     }
// }

// // API to add a new show to the database
// export const addShow = async (req, res) =>{
//     try {
//         const {movieId, showsInput, showPrice} = req.body

//         let movie = await Movie.findById(movieId)

//         if(!movie) {
//             // Fetch movie details and credits from TMDB API
//             const [movieDetailsResponse, movieCreditsResponse] = await Promise.all([
//                 axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
//             headers: {Authorization : `Bearer ${process.env.TMDB_API_KEY}`} }),

//                 axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
//             headers: {Authorization : `Bearer ${process.env.TMDB_API_KEY}`} })
//             ]);

//             const movieApiData = movieDetailsResponse.data;
//             const movieCreditsData = movieCreditsResponse.data;

//              const movieDetails = {
//                 _id: movieId,
//                 title: movieApiData.title,
//                 overview: movieApiData.overview,
//                 poster_path: movieApiData.poster_path,
//                 backdrop_path: movieApiData.backdrop_path,
//                 genres: movieApiData.genres,
//                 casts: movieCreditsData.cast,
//                 release_date: movieApiData.release_date,
//                 original_language: movieApiData.original_language,
//                 tagline: movieApiData.tagline || "",
//                 vote_average: movieApiData.vote_average,
//                 runtime: movieApiData.runtime,
//              }

//              // Add movie to the database
//              movie = await Movie.create(movieDetails);
//         }

//         const showsToCreate = [];
//         showsInput.forEach(show => {
//             const showDate = show.date;
//             show.time.forEach((time)=>{
//                 const dateTimeString = `${showDate}T${time}`;
//                 showsToCreate.push({
//                     movie: movieId,
//                     showDateTime: new Date(dateTimeString),
//                     showPrice,
//                     occupiedSeats: {}
//                 })
//             })
//         });

//         if(showsToCreate.length > 0){
//             await Show.insertMany(showsToCreate);
//         }

//          //  Trigger Inngest event
//          await inngest.send({
//             name: "app/show.added",
//              data: {movieTitle: movie.title}
//          })

//         res.json({success: true, message: 'Show Added successfully.'})
//     } catch (error) {
//         console.error(error);
//         res.json({success: false, message: error.message})
//     }
// }

// // API to get all shows from the database
// export const getShows = async (req, res) =>{
//     try {
//         const shows = await Show.find({showDateTime: {$gte: new Date()}}).populate('movie').sort({ showDateTime: 1 });

//         // filter unique shows
//         const uniqueShows = new Set(shows.map(show => show.movie))

//         res.json({success: true, shows: Array.from(uniqueShows)})
//     } catch (error) {
//         console.error(error);
//         res.json({ success: false, message: error.message });
//     }
// }

// // API to get a single show from the database
// export const getShow = async (req, res) =>{
//     try {
//         const {movieId} = req.params;
//         // get all upcoming shows for the movie
//         const shows = await Show.find({movie: movieId, showDateTime: { $gte: new Date() }})

//         const movie = await Movie.findById(movieId);
//         const dateTime = {};

//         shows.forEach((show) => {
//             const date = show.showDateTime.toISOString().split("T")[0];
//             if(!dateTime[date]){
//                 dateTime[date] = []
//             }
//             dateTime[date].push({ time: show.showDateTime, showId: show._id })
//         })

//         res.json({success: true, movie, dateTime})
//     } catch (error) {
//         console.error(error);
//         res.json({ success: false, message: error.message });
//     }
// }


// server/controllers/showController.js
// import Movie from "../models/Movie.js";
// import Show from "../models/Show.js";
// import { inngest } from "../inngest/index.js";
// import { omdb } from "../services/omdbClient.js";

// // Helper: fetch movie details from OMDb by imdbID (tt...) or title
// async function fetchMovieFromOmdb(identifier) {
//   const apiKey = process.env.OMDB_API_KEY;
//   if (!apiKey) throw new Error("OMDB_API_KEY not found in env");

//   let urlParams;
//   // If identifier looks like an IMDb ID (tt1234567) use i=, otherwise treat as title `t=`
//   if (/^tt\d+$/i.test(identifier)) {
//     urlParams = `?i=${encodeURIComponent(identifier)}&plot=full&apikey=${apiKey}`;
//   } else {
//     // treat as title (best-effort)
//     urlParams = `?t=${encodeURIComponent(identifier)}&plot=full&apikey=${apiKey}`;
//   }

//   const { data } = await omdb.get(urlParams);
//   if (!data || data.Response === "False") {
//     const message = data && data.Error ? data.Error : "OMDb returned no data";
//     throw new Error(message);
//   }
//   return data;
// }

// /**
//  * Option A (practical fallback): get now-playing movies from a curated list of IMDb IDs
//  *    - Set NOW_PLAYING_IMDB_IDS in .env (comma-separated imdb ids).
//  * Option B (recommended for production): use a "showtimes" or "now-playing" API (MovieGlu, InternationalShowtimes, Watchmode).
//  */
// export const getNowPlayingMovies = async (req, res) => {
//   try {
//     // Try curated list from environment
//     const listEnv = process.env.NOW_PLAYING_IMDB_IDS || "";
//     const ids = listEnv.split(",").map(s => s.trim()).filter(Boolean);

//     if (ids.length === 0) {
//       // Inform client that no curated list is configured, and suggest using a showtimes API
//       return res.status(400).json({
//         success: false,
//         message:
//           "No NOW_PLAYING_IMDB_IDS configured. For true 'now playing' use a showtimes API (MovieGlu / InternationalShowtimes / Watchmode) or populate NOW_PLAYING_IMDB_IDS."
//       });
//     }

//     // Fetch details in parallel (OMDb allows lookups by imdbID)
//     const movieFetches = ids.map(id => fetchMovieFromOmdb(id));
//     const results = await Promise.allSettled(movieFetches);

//     const movies = results
//       .filter(r => r.status === "fulfilled")
//       .map(r => {
//         const d = r.value;
//         return {
//           _id: d.imdbID,
//           title: d.Title,
//           overview: d.Plot,
//           poster_path: d.Poster === "N/A" ? null : d.Poster,
//           backdrop_path: null, // OMDb doesn't provide backdrop url
//           genres: d.Genre ? d.Genre.split(",").map(g => g.trim()) : [],
//           casts: d.Actors ? d.Actors.split(",").map(a => a.trim()) : [],
//           release_date: d.Released === "N/A" ? null : d.Released,
//           original_language: d.Language || null,
//           tagline: "", // OMDb does not have tagline field
//           vote_average: d.imdbRating && d.imdbRating !== "N/A" ? parseFloat(d.imdbRating) : null,
//           runtime: d.Runtime || null,
//         };
//       });

//     res.json({ success: true, movies });
//   } catch (error) {
//     console.error("OMDb now playing error:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


// // addShow: adapted to OMDb (accepts imdbID 'ttxxx' OR title string)
// export const addShow = async (req, res) => {
//   try {
//     const { movieId, showsInput, showPrice } = req.body;
//     // movieId expected to be an imdbID (tt...) or a title if you pass a title

//     let movie = await Movie.findById(movieId);

//     if (!movie) {
//       // Fetch movie details from OMDb
//       const movieApiData = await fetchMovieFromOmdb(movieId);

//       // OMDb returns Actors as a comma-separated string; no separate credits endpoint
//       const movieDetails = {
//         _id: movieApiData.imdbID || movieId,
//         title: movieApiData.Title,
//         overview: movieApiData.Plot,
//         poster_path: movieApiData.Poster === "N/A" ? null : movieApiData.Poster,
//         backdrop_path: null,
//         genres: movieApiData.Genre ? movieApiData.Genre.split(",").map(g => g.trim()) : [],
//         casts: movieApiData.Actors ? movieApiData.Actors.split(",").map(a => ({ name: a.trim() })) : [],
//         release_date: movieApiData.Released === "N/A" ? null : movieApiData.Released,
//         original_language: movieApiData.Language || null,
//         tagline: "", // not provided by OMDb
//         vote_average:
//           movieApiData.imdbRating && movieApiData.imdbRating !== "N/A"
//             ? parseFloat(movieApiData.imdbRating)
//             : null,
//         runtime: movieApiData.Runtime || null,
//       };

//       // Create movie in DB
//       movie = await Movie.create(movieDetails);
//     }

//     // Build shows as before
//     const showsToCreate = [];
//     showsInput.forEach(show => {
//       const showDate = show.date;
//       show.time.forEach((time) => {
//         const dateTimeString = `${showDate}T${time}`;
//         showsToCreate.push({
//           movie: movie._id,
//           showDateTime: new Date(dateTimeString),
//           showPrice,
//           occupiedSeats: {}
//         });
//       });
//     });

//     if (showsToCreate.length > 0) {
//       await Show.insertMany(showsToCreate);
//     }

//     // Trigger Inngest event
//     await inngest.send({
//       name: "app/show.added",
//       data: { movieTitle: movie.title }
//     });

//     res.json({ success: true, message: "Show Added successfully." });
//   } catch (error) {
//     console.error("addShow OMDb error:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


// // getShows and getShow remain unchanged — they operate against your DB, not the external API
// export const getShows = async (req, res) => {
//   try {
//     const shows = await Show.find({ showDateTime: { $gte: new Date() } })
//       .populate('movie')
//       .sort({ showDateTime: 1 });

//     const uniqueShows = new Set(shows.map(show => show.movie));
//     res.json({ success: true, shows: Array.from(uniqueShows) });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


// export const getShow = async (req, res) => {
//   try {
//     const { movieId } = req.params;
//     const shows = await Show.find({ movie: movieId, showDateTime: { $gte: new Date() } });
//     const movie = await Movie.findById(movieId);
//     const dateTime = {};

//     shows.forEach((show) => {
//       const date = show.showDateTime.toISOString().split("T")[0];
//       if (!dateTime[date]) dateTime[date] = [];
//       dateTime[date].push({ time: show.showDateTime, showId: show._id });
//     });

//     res.json({ success: true, movie, dateTime });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


// import Movie from "../models/Movie.js";
// import Show from "../models/Show.js";
// import { inngest } from "../inngest/index.js";
// import { watchmode } from "../services/watchmodeClient.js";
// import { omdb } from "../services/omdbClient.js";

// /* ================================
//    Helper: fetch movie from OMDb
// ================================ */
// const fetchMovieFromOmdb = async (identifier) => {
//   const { data } = await omdb.get("/", {
//     params: {
//       apikey: process.env.OMDB_API_KEY,
//       i: identifier,
//       plot: "full",
//     },
//   });

//   if (data.Response === "False") {
//     throw new Error(data.Error);
//   }

//   return data;
// };

// /* ================================
//    GET NOW PLAYING MOVIES
//    (Watchmode → OMDb)
// ================================ */
// export const getNowPlayingMovies = async (req, res) => {
//   try {
//     const wmRes = await watchmode.get("/list-titles/", {
//       params: {
//         apiKey: process.env.WATCHMODE_API_KEY,
//         types: "movie",
//         regions: "IN",
//         sort_by: "popularity_desc",
//         limit: 20,
//       },
//     });

//     const imdbIds = wmRes.data.titles
//       .map(movie => movie.imdb_id)
//       .filter(Boolean);

//     const movies = await Promise.all(
//       imdbIds.map(async (imdbId) => {
//         const data = await fetchMovieFromOmdb(imdbId);

//         return {
//           _id: data.imdbID,
//           title: data.Title,
//           overview: data.Plot,
//           poster_path: data.Poster,
//           genres: data.Genre?.split(", "),
//           casts: data.Actors?.split(", "),
//           release_date: data.Released,
//           original_language: data.Language,
//           vote_average: Number(data.imdbRating),
//           runtime: data.Runtime,
//         };
//       })
//     );

//     res.json({ success: true, movies });
//   } catch (error) {
//     console.error("Now Playing Error:", error.message);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /* ================================
//    ADD SHOW
//    (OMDb only)
// ================================ */
// export const addShow = async (req, res) => {
//   try {
//     const { movieId, showsInput, showPrice } = req.body;

//     let movie = await Movie.findById(movieId);

//     if (!movie) {
//       const data = await fetchMovieFromOmdb(movieId);

//       movie = await Movie.create({
//         _id: data.imdbID,
//         title: data.Title,
//         overview: data.Plot,
//         poster_path: data.Poster,
//         genres: data.Genre?.split(", "),
//         casts: data.Actors?.split(", "),
//         release_date: data.Released,
//         original_language: data.Language,
//         vote_average: Number(data.imdbRating),
//         runtime: parseInt(data.Runtime),
//       });
//     }

//     const showsToCreate = [];

//     showsInput.forEach(show => {
//       show.time.forEach(time => {
//         showsToCreate.push({
//           movie: movie._id,
//           showDateTime: new Date(`${show.date}T${time}`),
//           showPrice,
//           occupiedSeats: {},
//         });
//       });
//     });

//     await Show.insertMany(showsToCreate);

//     await inngest.send({
//       name: "app/show.added",
//       data: { movieTitle: movie.title },
//     });

//     res.json({ success: true, message: "Show added successfully." });
//   } catch (error) {
//     console.error("Add Show Error:", error.message);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /* ================================
//    GET ALL SHOWS (UNCHANGED)
// ================================ */
// export const getShows = async (req, res) => {
//   try {
//     const shows = await Show.find({
//       showDateTime: { $gte: new Date() },
//     })
//       .populate("movie")
//       .sort({ showDateTime: 1 });

//     const uniqueShows = new Set(shows.map(show => show.movie));

//     res.json({ success: true, shows: Array.from(uniqueShows) });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /* ================================
//    GET SINGLE SHOW (UNCHANGED)
// ================================ */
// export const getShow = async (req, res) => {
//   try {
//     const { movieId } = req.params;

//     const shows = await Show.find({
//       movie: movieId,
//       showDateTime: { $gte: new Date() },
//     });

//     const movie = await Movie.findById(movieId);
//     const dateTime = {};

//     shows.forEach(show => {
//       const date = show.showDateTime.toISOString().split("T")[0];
//       if (!dateTime[date]) dateTime[date] = [];
//       dateTime[date].push({
//         time: show.showDateTime,
//         showId: show._id,
//       });
//     });

//     res.json({ success: true, movie, dateTime });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// import Movie from "../models/Movie.js";
// import Show from "../models/Show.js";
// import { inngest } from "../inngest/index.js";
// import { watchmode } from "../services/watchmodeClient.js";
// import { omdb } from "../services/omdbClient.js";

// /* ================================
//    Helper: fetch movie from OMDb
// ================================ */
// const fetchMovieFromOmdb = async (identifier) => {
//   try {
//     console.log("🎬 Fetching from OMDb:", identifier);
    
//     const { data } = await omdb.get("/", {
//       params: {
//         apikey: process.env.OMDB_API_KEY,
//         i: identifier,
//         plot: "full",
//       },
//     });

//     console.log("✅ OMDb Response:", data.Response);

//     if (data.Response === "False") {
//       throw new Error(`OMDb Error: ${data.Error}`);
//     }

//     return data;
//   } catch (error) {
//     console.error("❌ OMDb Error:", error.message);
//     if (error.response) {
//       console.error("   Status:", error.response.status);
//       console.error("   Data:", error.response.data);
//     }
//     throw error;
//   }
// };

// /* ================================
//    GET NOW PLAYING MOVIES
// ================================ */
// export const getNowPlayingMovies = async (req, res) => {
//   try {
//     console.log("========================================");
//     console.log("🎥 FETCHING NOW PLAYING MOVIES");
//     console.log("========================================");
    
//     // Check if API keys exist
//     if (!process.env.WATCHMODE_API_KEY) {
//       throw new Error("WATCHMODE_API_KEY is not set");
//     }
//     if (!process.env.OMDB_API_KEY) {
//       throw new Error("OMDB_API_KEY is not set");
//     }

//     console.log("✅ API Keys loaded");
//     console.log("🔍 Calling Watchmode API...");

//     const wmRes = await watchmode.get("/list-titles/", {
//       params: {
//         apiKey: process.env.WATCHMODE_API_KEY,
//         types: "movie",
//         regions: "IN",
//         sort_by: "popularity_desc",
//         limit: 20,
//       },
//     });

//     console.log("✅ Watchmode Response received");
//     console.log("   Total titles:", wmRes.data.titles?.length || 0);

//     const imdbIds = wmRes.data.titles
//       .map(movie => movie.imdb_id)
//       .filter(Boolean);

//     console.log("✅ IMDb IDs extracted:", imdbIds.length);
//     console.log("🔍 Fetching details from OMDb...");

//     const movies = await Promise.all(
//       imdbIds.map(async (imdbId) => {
//         const data = await fetchMovieFromOmdb(imdbId);

//         return {
//           _id: data.imdbID,
//           title: data.Title,
//           overview: data.Plot,
//           poster_path: data.Poster,
//           genres: data.Genre?.split(", "),
//           casts: data.Actors?.split(", "),
//           release_date: data.Released,
//           original_language: data.Language,
//           vote_average: Number(data.imdbRating),
//           runtime: data.Runtime,
//         };
//       })
//     );

//     console.log("✅ All movies fetched successfully:", movies.length);
//     console.log("========================================");

//     res.json({ success: true, movies });
//   } catch (error) {
//     console.error("========================================");
//     console.error("❌ NOW PLAYING ERROR");
//     console.error("========================================");
//     console.error("Error message:", error.message);
    
//     if (error.response) {
//       console.error("API Response Status:", error.response.status);
//       console.error("API Response Data:", error.response.data);
//     }
    
//     console.error("========================================");

//     res.status(500).json({ 
//       success: false, 
//       message: error.message
//     });
//   }
// };

// /* ================================
//    ADD SHOW
// ================================ */
// export const addShow = async (req, res) => {
//   try {
//     const { movieId, showsInput, showPrice } = req.body;

//     console.log("➕ Adding show for movie:", movieId);

//     let movie = await Movie.findById(movieId);

//     if (!movie) {
//       console.log("🎬 Movie not in DB, fetching from OMDb...");
//       const data = await fetchMovieFromOmdb(movieId);

//       movie = await Movie.create({
//         _id: data.imdbID,
//         title: data.Title,
//         overview: data.Plot,
//         poster_path: data.Poster,
//         genres: data.Genre?.split(", "),
//         casts: data.Actors?.split(", "),
//         release_date: data.Released,
//         original_language: data.Language,
//         vote_average: Number(data.imdbRating),
//         runtime: parseInt(data.Runtime),
//       });
      
//       console.log("✅ Movie created in DB:", movie.title);
//     }

//     const showsToCreate = [];

//     showsInput.forEach(show => {
//       show.time.forEach(time => {
//         showsToCreate.push({
//           movie: movie._id,
//           showDateTime: new Date(`${show.date}T${time}`),
//           showPrice,
//           occupiedSeats: {},
//         });
//       });
//     });

//     console.log("📅 Creating", showsToCreate.length, "shows");
//     await Show.insertMany(showsToCreate);

//     await inngest.send({
//       name: "app/show.added",
//       data: { movieTitle: movie.title },
//     });

//     console.log("✅ Shows added successfully");

//     res.json({ success: true, message: "Show added successfully." });
//   } catch (error) {
//     console.error("❌ Add Show Error:", error.message);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /* ================================
//    GET ALL SHOWS
// ================================ */
// export const getShows = async (req, res) => {
//   try {
//     const shows = await Show.find({
//       showDateTime: { $gte: new Date() },
//     })
//       .populate("movie")
//       .sort({ showDateTime: 1 });

//     const uniqueShows = new Set(shows.map(show => show.movie));

//     res.json({ success: true, shows: Array.from(uniqueShows) });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /* ================================
//    GET SINGLE SHOW
// ================================ */
// export const getShow = async (req, res) => {
//   try {
//     const { movieId } = req.params;

//     const shows = await Show.find({
//       movie: movieId,
//       showDateTime: { $gte: new Date() },
//     });

//     const movie = await Movie.findById(movieId);
//     const dateTime = {};

//     shows.forEach(show => {
//       const date = show.showDateTime.toISOString().split("T")[0];
//       if (!dateTime[date]) dateTime[date] = [];
//       dateTime[date].push({
//         time: show.showDateTime,
//         showId: show._id,
//       });
//     });

//     res.json({ success: true, movie, dateTime });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// import Movie from "../models/Movie.js";
// import Show from "../models/Show.js";
// import { inngest } from "../inngest/index.js";
// import { watchmode } from "../services/watchmodeClient.js";
// import { omdb } from "../services/omdbClient.js";

// /* ================================
//    Helper: fetch movie from OMDb
// ================================ */
// const fetchMovieFromOmdb = async (identifier) => {
//   try {
//     console.log("🎬 Fetching from OMDb:", identifier);
    
//     const { data } = await omdb.get("/", {
//       params: {
//         apikey: process.env.OMDB_API_KEY,
//         i: identifier,
//         plot: "full",
//       },
//     });

//     console.log("✅ OMDb Response:", data.Response);

//     if (data.Response === "False") {
//       throw new Error(`OMDb Error: ${data.Error}`);
//     }

//     return data;
//   } catch (error) {
//     console.error("❌ OMDb Error:", error.message);
//     if (error.response) {
//       console.error("   Status:", error.response.status);
//       console.error("   Data:", error.response.data);
//     }
//     throw error;
//   }
// };

// /* ================================
//    GET NOW PLAYING MOVIES
// ================================ */
// export const getNowPlayingMovies = async (req, res) => {
//   try {
//     console.log("🎥 Fetching now playing movies");
    
//     if (!process.env.WATCHMODE_API_KEY) {
//       throw new Error("WATCHMODE_API_KEY is not set");
//     }
//     if (!process.env.OMDB_API_KEY) {
//       throw new Error("OMDB_API_KEY is not set");
//     }

//     const wmRes = await watchmode.get("/list-titles/", {
//       params: {
//         apiKey: process.env.WATCHMODE_API_KEY,
//         types: "movie",
//         regions: "IN",
//         sort_by: "popularity_desc",
//         limit: 20,
//       },
//     });

//     console.log("✅ Watchmode response received");

//     const imdbIds = wmRes.data.titles
//       .map(movie => movie.imdb_id)
//       .filter(Boolean);

//     console.log(`✅ ${imdbIds.length} IMDb IDs extracted`);

//     const movies = await Promise.all(
//       imdbIds.map(async (imdbId) => {
//         const data = await fetchMovieFromOmdb(imdbId);

//         return {
//           _id: data.imdbID,
//           title: data.Title,
//           overview: data.Plot,
//           poster_path: data.Poster,
//           genres: data.Genre?.split(", "),
//           casts: data.Actors?.split(", "),
//           release_date: data.Released,
//           original_language: data.Language,
//           vote_average: Number(data.imdbRating) || 0,
//           runtime: data.Runtime,
//         };
//       })
//     );

//     console.log(`✅ ${movies.length} movies fetched successfully`);

//     res.json({ success: true, movies });
//   } catch (error) {
//     console.error("❌ Now playing error:", error.message);

//     res.status(500).json({ 
//       success: false, 
//       message: error.message
//     });
//   }
// };

// /* ================================
//    ADD SHOW
// ================================ */
// export const addShow = async (req, res) => {
//   try {
//     const { movieId, showsInput, showPrice } = req.body;

//     if (!movieId || !showsInput || !showPrice) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "Missing required fields" 
//       });
//     }

//     console.log("➕ Adding show for movie:", movieId);

//     // ✅ Check MongoDB first
//     let movie = await Movie.findById(movieId);

//     if (!movie) {
//       console.log("🎬 Movie not in MongoDB, fetching from OMDb...");
//       const data = await fetchMovieFromOmdb(movieId);

//       movie = await Movie.create({
//         _id: data.imdbID,
//         title: data.Title,
//         overview: data.Plot,
//         poster_path: data.Poster,
//         genres: data.Genre?.split(", "),
//         casts: data.Actors?.split(", "),
//         release_date: data.Released,
//         original_language: data.Language,
//         vote_average: Number(data.imdbRating) || 0,
//         runtime: parseInt(data.Runtime) || 0,
//       });
      
//       console.log("✅ Movie created in MongoDB:", movie.title);
//     } else {
//       console.log("✅ Movie found in MongoDB:", movie.title);
//     }

//     const showsToCreate = [];

//     showsInput.forEach(show => {
//       show.time.forEach(time => {
//         showsToCreate.push({
//           movie: movie._id,
//           showDateTime: new Date(`${show.date}T${time}`),
//           showPrice,
//           occupiedSeats: {},
//         });
//       });
//     });

//     console.log(`📅 Creating ${showsToCreate.length} shows`);
//     await Show.insertMany(showsToCreate);

//     // Trigger notification
//     await inngest.send({
//       name: "app/show.added",
//       data: { movieTitle: movie.title },
//     });

//     console.log("✅ Shows added successfully");

//     res.json({ success: true, message: "Show added successfully" });
//   } catch (error) {
//     console.error("❌ Add show error:", error.message);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /* ================================
//    GET ALL SHOWS
// ================================ */
// export const getShows = async (req, res) => {
//   try {
//     const shows = await Show.find({
//       showDateTime: { $gte: new Date() },
//     })
//       .populate("movie")
//       .sort({ showDateTime: 1 });

//     // Get unique movies
//     const uniqueMovies = [];
//     const seenMovieIds = new Set();

//     shows.forEach(show => {
//       if (show.movie && !seenMovieIds.has(show.movie._id)) {
//         seenMovieIds.add(show.movie._id);
//         uniqueMovies.push(show.movie);
//       }
//     });

//     res.json({ success: true, shows: uniqueMovies });
//   } catch (error) {
//     console.error("Get shows error:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /* ================================
//    GET SINGLE SHOW
// ================================ */
// export const getShow = async (req, res) => {
//   try {
//     const { movieId } = req.params;

//     if (!movieId) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "Movie ID is required" 
//       });
//     }

//     const shows = await Show.find({
//       movie: movieId,
//       showDateTime: { $gte: new Date() },
//     });

//     const movie = await Movie.findById(movieId);

//     if (!movie) {
//       return res.status(404).json({ 
//         success: false, 
//         message: "Movie not found" 
//       });
//     }

//     const dateTime = {};

//     shows.forEach(show => {
//       const date = show.showDateTime.toISOString().split("T")[0];
//       if (!dateTime[date]) dateTime[date] = [];
//       dateTime[date].push({
//         time: show.showDateTime,
//         showId: show._id,
//       });
//     });

//     res.json({ success: true, movie, dateTime });
//   } catch (error) {
//     console.error("Get show error:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

import Movie from "../models/Movie.js";
import Show from "../models/Show.js";
import { inngest } from "../inngest/index.js";
import { watchmode } from "../services/watchmodeClient.js";
import { omdb } from "../services/omdbClient.js";

const fetchMovieFromOmdb = async (identifier) => {
  try {
    const { data } = await omdb.get("/", {
      params: {
        apikey: process.env.OMDB_API_KEY,
        i: identifier,
        plot: "full",
      },
    });

    if (data.Response === "False") {
      throw new Error(data.Error);
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const getNowPlayingMovies = async (req, res) => {
  try {
    if (!process.env.WATCHMODE_API_KEY || !process.env.OMDB_API_KEY) {
      throw new Error("API keys not configured");
    }

    const wmRes = await watchmode.get("/list-titles/", {
      params: {
        apiKey: process.env.WATCHMODE_API_KEY,
        types: "movie",
        regions: "IN",
        sort_by: "popularity_desc",
        limit: 20,
      },
    });

    const imdbIds = wmRes.data.titles
      .map(movie => movie.imdb_id)
      .filter(Boolean);

    const movies = await Promise.all(
      imdbIds.map(async (imdbId) => {
        const data = await fetchMovieFromOmdb(imdbId);

        return {
          _id: data.imdbID,
          title: data.Title,
          overview: data.Plot,
          poster_path: data.Poster,
          genres: data.Genre?.split(", "),
          casts: data.Actors?.split(", "),
          release_date: data.Released,
          original_language: data.Language,
          vote_average: Number(data.imdbRating) || 0,
          runtime: data.Runtime,
        };
      })
    );

    res.json({ success: true, movies });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addShow = async (req, res) => {
  try {
    const { movieId, showsInput, showPrice } = req.body;

    if (!movieId || !showsInput || !showPrice) {
      return res.status(400).json({ 
        success: false, 
        message: "Missing required fields" 
      });
    }

    let movie = await Movie.findById(movieId);

    if (!movie) {
      const data = await fetchMovieFromOmdb(movieId);

      movie = await Movie.create({
        _id: data.imdbID,
        title: data.Title,
        overview: data.Plot,
        poster_path: data.Poster,
        genres: data.Genre?.split(", "),
        casts: data.Actors?.split(", "),
        release_date: data.Released,
        original_language: data.Language,
        vote_average: Number(data.imdbRating) || 0,
        runtime: parseInt(data.Runtime) || 0,
      });
    }

    const showsToCreate = [];

    showsInput.forEach(show => {
      show.time.forEach(time => {
        showsToCreate.push({
          movie: movie._id,
          showDateTime: new Date(`${show.date}T${time}`),
          showPrice,
          occupiedSeats: {},
        });
      });
    });

    await Show.insertMany(showsToCreate);

    await inngest.send({
      name: "app/show.added",
      data: { movieTitle: movie.title },
    });

    res.json({ success: true, message: "Show added successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getShows = async (req, res) => {
  try {
    const shows = await Show.find({
      showDateTime: { $gte: new Date() },
    })
      .populate("movie")
      .sort({ showDateTime: 1 });

    const uniqueMovies = [];
    const seenMovieIds = new Set();

    shows.forEach(show => {
      if (show.movie && !seenMovieIds.has(show.movie._id)) {
        seenMovieIds.add(show.movie._id);
        uniqueMovies.push(show.movie);
      }
    });

    res.json({ success: true, shows: uniqueMovies });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getShow = async (req, res) => {
  try {
    const { movieId } = req.params;

    if (!movieId) {
      return res.status(400).json({ 
        success: false, 
        message: "Movie ID required" 
      });
    }

    const shows = await Show.find({
      movie: movieId,
      showDateTime: { $gte: new Date() },
    });

    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).json({ 
        success: false, 
        message: "Movie not found" 
      });
    }

    const dateTime = {};

    shows.forEach(show => {
      const date = show.showDateTime.toISOString().split("T")[0];
      if (!dateTime[date]) dateTime[date] = [];
      dateTime[date].push({
        time: show.showDateTime,
        showId: show._id,
        showPrice: show.showPrice,
      });
    });

    res.json({ success: true, movie, dateTime });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};