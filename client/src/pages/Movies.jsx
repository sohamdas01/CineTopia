
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { StarIcon } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import Loading from '../components/Loading';

const Movies = () => {
  const { shows, isLoaded } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');

  if (!isLoaded) return <Loading />;

  const filteredMovies = shows.filter(movie =>
    movie.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-14 px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Now Showing</h1>

      <div className="mb-8">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-96 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {filteredMovies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filteredMovies.map((movie) => (
            <Link
              key={movie._id}
              to={`/movies/${movie._id}`}
              className="group"
            >
              <div className="relative overflow-hidden rounded-lg shadow-md group-hover:shadow-xl transition-shadow">
                <img
                  src={movie.poster_path || "https://via.placeholder.com/300x450"}
                  alt={movie.title}
                  className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="mt-2">
                <p className="font-semibold truncate" title={movie.title}>
                  {movie.title}
                </p>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <StarIcon className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span>{movie.vote_average?.toFixed(1) || "N/A"}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-xl text-gray-600">No movies found</p>
        </div>
      )}
    </div>
  );
};

export default Movies;