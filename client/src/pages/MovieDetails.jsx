
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, Clock, Calendar, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import Loading from "../components/Loading";
import  timeFormat  from "../lib/timeFormat";

const MovieDetails = () => {
  const { id } = useParams();
  const { axios, toggleFavorite, isFavoriteMovie } = useAppContext();

  const [movie, setMovie] = useState(null);
  const [dateTime, setDateTime] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dateIndex, setDateIndex] = useState(0);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const { data } = await axios.get(`/api/show/${id}`);
        if (data.success) {
          setMovie(data.movie);
          setDateTime(data.dateTime);
          const dates = Object.keys(data.dateTime);
          if (dates.length > 0) {
            setSelectedDate(dates[0]);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) return <Loading />;
  if (!movie) return null;

  const isFav = isFavoriteMovie(movie._id);
  const availableDates = Object.keys(dateTime);
  const visibleDates = availableDates.slice(dateIndex, dateIndex + 5);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return {
      day: date.getDate(),
      month: date.toLocaleString('default', { month: 'short' }),
      weekday: date.toLocaleString('default', { weekday: 'short' })
    };
  };

  const handlePrevDates = () => {
    if (dateIndex > 0) setDateIndex(dateIndex - 1);
  };

  const handleNextDates = () => {
    if (dateIndex + 5 < availableDates.length) setDateIndex(dateIndex + 1);
  };

  return (
    <div className="bg-black text-white min-h-screen ">
      {/* HERO */}
      <div className="relative h-[500px]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-10" />
        <img
          src={movie.poster_path}
          alt={movie.title}
          className="w-full h-full object-cover opacity-30"
        />

        <div className="absolute bottom-8 left-0 right-0 z-20 px-8">
          <div className="max-w-7xl mx-auto flex gap-8">
            <img
              src={movie.poster_path}
              className="w-56 h-80 object-cover rounded-xl shadow-2xl border-4 border-zinc-800"
              alt={movie.title}
            />

            <div className="flex-1">
              <h1 className="text-5xl font-bold mb-4">{movie.title}</h1>

              <div className="flex items-center gap-6 mb-4 text-gray-300">
                <span className="flex items-center gap-2 bg-zinc-800/80 px-3 py-1 rounded-full">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <span className="font-semibold">{movie.vote_average}</span>
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-red-500" />
                 {timeFormat(movie.runtime)}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-red-500" />
                  {movie.release_date}
                </span>
              </div>

              {movie.genres && (
                <div className="flex gap-2 mb-4">
                  {movie.genres.map((genre, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-red-600/20 text-red-400 rounded-full text-sm border border-red-600/30"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              )}

              <button
                onClick={() => toggleFavorite(movie._id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105
                  ${isFav
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-zinc-800 hover:bg-zinc-700 text-gray-300"
                  }`}
              >
                <Heart className={`w-5 h-5 ${isFav ? "fill-white" : ""}`} />
                {isFav ? "Remove from Favorites" : "Add to Favorites"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* OVERVIEW */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-red-500">Overview</h2>
          <p className="text-gray-300 text-lg leading-relaxed">{movie.overview}</p>
        </div>



        {/* CAST*/}
        {movie.casts && movie.casts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-red-500">Cast</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {movie.casts.map((cast, idx) => (
                <div key={idx} className="bg-zinc-900 rounded-lg p-4 border border-zinc-800 hover:border-red-900 transition flex items-center gap-3">
                  <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">👤</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white text-sm truncate">
                      {typeof cast === 'string' ? cast : cast.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

    
        {/* DATE SELECTION */}
        {availableDates.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 text-red-500">Choose Date</h2>

            <div className="flex items-center gap-4">
              {/* Previous Button */}
              <button
                onClick={handlePrevDates}
                disabled={dateIndex === 0}
                className="p-3 bg-zinc-900 rounded-lg hover:bg-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Date Cards */}
              <div className="flex gap-4 flex-1 overflow-hidden">
                {visibleDates.map((date) => {
                  const { day, month, weekday } = formatDate(date);
                  const isSelected = date === selectedDate;

                  return (
                    <button
                      key={date}
                      onClick={() => setSelectedDate(date)}
                      className={`flex-1 min-w-[120px] p-4 rounded-xl border-2 transition-all transform hover:scale-105
                        ${isSelected
                          ? "bg-red-600 border-red-600 text-white shadow-lg shadow-red-900/50"
                          : "bg-zinc-900 border-zinc-800 text-gray-300 hover:border-red-900"
                        }`}
                    >
                      <div className="text-center">
                        <div className="text-sm font-medium opacity-80">{weekday}</div>
                        <div className="text-3xl font-bold my-1">{day}</div>
                        <div className="text-sm opacity-80">{month}</div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Next Button */}
              <button
                onClick={handleNextDates}
                disabled={dateIndex + 5 >= availableDates.length}
                className="p-3 bg-zinc-900 rounded-lg hover:bg-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}

        {/* SHOW TIMES */}
        {selectedDate && dateTime[selectedDate] && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-red-500">Available Show Times</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {dateTime[selectedDate].map((slot) => (
                <Link
                  key={slot.showId}
                  to={`/movies/${movie._id}/${selectedDate}?showId=${slot.showId}`}
                  className="bg-zinc-900 border-2 border-zinc-800 hover:border-red-600 hover:bg-red-900/20 rounded-xl p-4 text-center transition-all transform hover:scale-105"
                >
                  <div className="text-2xl font-bold text-white mb-1">
                    {new Date(slot.time).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true
                    })}
                  </div>
                  <div className="text-sm text-red-500 font-semibold">
                    ${slot.showPrice}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {availableDates.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400">No shows available at the moment</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;