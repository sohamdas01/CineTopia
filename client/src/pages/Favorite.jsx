

import { useAppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import { Heart, Star } from "lucide-react";
import Loading from "../components/Loading";

const Favorite = () => {
  const { favoriteMovies, toggleFavorite, favoritesLoading, user, isLoaded } = useAppContext();

  if (!isLoaded || favoritesLoading) {
    return <Loading />;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black pt-20">
        <div className="text-center">
          <Heart className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-xl">Please login to view favorites</p>
        </div>
      </div>
    );
  }

  if (favoriteMovies.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black pt-20">
        <div className="text-center">
          <Heart className="w-16 h-16 text-red-500 mx-auto mb-4 opacity-50" />
          <p className="text-xl mb-4">No favorites yet</p>
          <Link
            to="/movies"
            className="inline-block px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition"
          >
            Browse Movies
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen p-6 pt-24">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-white text-4xl font-bold mb-8 flex items-center gap-3">
          <Heart className="w-10 h-10 text-red-500 fill-red-500" />
          My Favorites
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {favoriteMovies.map((movie) => (
            <div key={movie._id} className="relative group">
              <Link to={`/movies/${movie._id}`}>
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={movie.poster_path}
                    alt={movie.title}
                    className="h-80 w-full object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleFavorite(movie._id);
                }}
                className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 p-2 rounded-full transition-all transform hover:scale-110 shadow-lg"
              >
                <Heart className="w-5 h-5 fill-white text-white" />
              </button>

              <div className="mt-3">
                <p className="text-white font-semibold truncate">{movie.title}</p>
                <div className="flex items-center gap-1 text-sm text-gray-400">
                  <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  {movie.vote_average}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorite;