

import { StarIcon } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import timeFormat from '../lib/timeFormat'

const MovieCard = ({ movie }) => {
  const navigate = useNavigate()

  return (
    <div className="bg-black text-white rounded-2xl p-4 w-72 hover:-translate-y-1 transition">

      <img
        onClick={() => navigate(`/movies/${movie._id}`)}
        src={movie.poster_path || "https://via.placeholder.com/300x450"}
        alt={movie.title}
        className="h-64 w-full object-cover rounded-xl cursor-pointer"
      />

      <h3 className="mt-3 font-semibold truncate">{movie.title}</h3>

      {/*  GENRES  */}
      {movie.genres && movie.genres.length > 0 && (
        <div className="flex gap-2 mt-2 flex-wrap">
          {movie.genres.slice(0, 2).map((genre, idx) => (
            <span
              key={idx}
              className="text-xs px-2 py-1 bg-red-600/20 text-red-400 border border-red-600/30 rounded-full"
            >
              {genre}
            </span>
          ))}
        </div>
      )}

      <p className="text-sm text-gray-400 mt-2">
        {timeFormat(movie.runtime)}
      </p>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => navigate(`/movies/${movie._id}`)}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-full text-sm"
        >
          Buy Tickets
        </button>

        <div className="flex items-center gap-1 text-sm">
          <StarIcon className="w-4 h-4 text-red-500 fill-red-500" />
          {movie.vote_average?.toFixed(1)}
        </div>
      </div>
    </div>
  )
}

export default MovieCard