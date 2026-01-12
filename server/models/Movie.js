// import mongoose from "mongoose";

// const movieSchema = new mongoose.Schema(
//     {
//         _id: {type: String, required: true},
//         title: {type: String, required: true},
//         overview: {type: String, required: true},
//         poster_path: {type: String, required: true},
//         backdrop_path: {type: String, required: true},
//         release_date: {type: String, required: true},
//         original_language: {type: String},
//         tagline: {type: String},
//         genres: {type: Array, required: true},
//         casts: {type: Array, required: true},
//         vote_average: {type: Number, required: true},
//         runtime: {type: Number, required: true},
//     }, {timestamps: true}
// )

// const Movie = mongoose.model('Movie', movieSchema)

// export default Movie;
// import mongoose from "mongoose";

// const movieSchema = new mongoose.Schema({
//   _id: { type: String, required: true },
//   title: { type: String, required: true, trim: true },
//   overview: { type: String, required: true },
//   poster_path: { type: String, default: null },
//   backdrop_path: { type: String, default: null },
//   release_date: { type: String, required: true },
//   original_language: { type: String, default: null },
//   tagline: { type: String, default: "" },
//   genres: { type: [String], default: [] },
//   casts: { type: [String], default: [] },
//   vote_average: { type: Number, default: 0 },
//   runtime: { type: Number, required: true },
// }, { timestamps: true });

// const Movie = mongoose.model("Movie", movieSchema);

// export default Movie;

import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  title: { type: String, required: true },
  overview: { type: String },
  poster_path: { type: String },
  genres: { type: [String] },
  casts: { 
    type: [{
      name: String,
      character: String,
      profile_path: String
    }],
    default: []
  },
  release_date: { type: String },
  original_language: { type: String },
  vote_average: { type: Number },
  runtime: { type: String }
}, { timestamps: true });

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
