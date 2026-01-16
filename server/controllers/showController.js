

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
          casts: data.Actors?.split(", ") || [], 
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
        casts: data.Actors?.split(", ") || [],
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