import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Star } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import Loading from '../components/Loading';

const Releases = () => {
  const { axios } = useAppContext();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, this-year, this-month

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/show/all');
      
      if (data.success) {
        // Sort by release date (newest first)
        const sortedMovies = data.shows.sort((a, b) => {
          const dateA = new Date(a.release_date);
          const dateB = new Date(b.release_date);
          return dateB - dateA; // Descending order (newest first)
        });
        setMovies(sortedMovies);
      }
    } catch (error) {
      console.error("Fetch movies error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getFilteredMovies = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    switch (filter) {
      case 'this-year':
        return movies.filter(movie => {
          const releaseYear = new Date(movie.release_date).getFullYear();
          return releaseYear === currentYear;
        });
      
      case 'this-month':
        return movies.filter(movie => {
          const releaseDate = new Date(movie.release_date);
          return releaseDate.getFullYear() === currentYear && 
                 releaseDate.getMonth() === currentMonth;
        });
      
      default:
        return movies;
    }
  };

  const filteredMovies = getFilteredMovies();

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-black text-white pt-24 px-6 md:px-16 lg:px-36">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 text-red-500">
          New Releases
        </h1>
       
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setFilter('all')}
          className={`px-6 py-2 rounded-full font-semibold transition ${
            filter === 'all'
              ? 'bg-red-600 text-white'
              : 'bg-zinc-900 text-gray-400 hover:bg-zinc-800'
          }`}
        >
          All Time
        </button>
        <button
          onClick={() => setFilter('this-year')}
          className={`px-6 py-2 rounded-full font-semibold transition ${
            filter === 'this-year'
              ? 'bg-red-600 text-white'
              : 'bg-zinc-900 text-gray-400 hover:bg-zinc-800'
          }`}
        >
          This Year
        </button>
        <button
          onClick={() => setFilter('this-month')}
          className={`px-6 py-2 rounded-full font-semibold transition ${
            filter === 'this-month'
              ? 'bg-red-600 text-white'
              : 'bg-zinc-900 text-gray-400 hover:bg-zinc-800'
          }`}
        >
          This Month
        </button>
      </div>

      {/* Movie Count */}
      <p className="text-gray-400 mb-6">
        Showing {filteredMovies.length} {filteredMovies.length === 1 ? 'movie' : 'movies'}
      </p>

      {/* Movies Grid */}
      {filteredMovies.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pb-12">
          {filteredMovies.map((movie) => (
            <Link
              key={movie._id}
              to={`/movies/${movie._id}`}
              className="group relative overflow-hidden rounded-lg"
            >
              {/* Movie Poster */}
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={movie.poster_path}
                  alt={movie.title}
                  className="w-full h-[300px] md:h-[400px] object-cover transition-transform group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Release Badge */}
                <div className="absolute top-3 right-3 bg-red-600 px-2 py-1 rounded-full text-xs font-bold">
                  NEW
                </div>
              </div>

              {/* Movie Info */}
              <div className="mt-3">
                <h3 className="font-semibold text-white truncate group-hover:text-red-500 transition">
                  {movie.title}
                </h3>
                
                <div className="flex items-center justify-between mt-2 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(movie.release_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short'
                      })}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span>{movie.vote_average || 'N/A'}</span>
                  </div>
                </div>

                {/* Genres */}
                {movie.genres && movie.genres.length > 0 && (
                  <div className="mt-2 flex gap-1 flex-wrap">
                    {movie.genres.slice(0, 2).map((genre, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-zinc-800 text-gray-400 px-2 py-0.5 rounded"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-xl text-gray-400">No movies found for this filter</p>
        </div>
      )}
    </div>
  );
};

export default Releases;