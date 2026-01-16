
import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  title: { type: String, required: true, trim: true },
  overview: { type: String, required: true },
  poster_path: { type: String, default: null },
  backdrop_path: { type: String, default: null },
  release_date: { type: String, required: true },
  original_language: { type: String, default: null },
  tagline: { type: String, default: "" },
  genres: { type: [String], default: [] },
  casts: { type: [String], default: [] },
  vote_average: { type: Number, default: 0 },
  runtime: { type: Number, required: true },
}, { timestamps: true });

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
