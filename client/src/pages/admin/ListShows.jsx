

import React, { useEffect, useState } from "react";
import { TrashIcon, CalendarIcon, DollarSignIcon, StarIcon, RefreshCwIcon } from "lucide-react";
import Loading from "../../components/Loading";
import Title from "../../components/admin/Title";
import { dateFormat } from "../../lib/dateFormat";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const ListShows = () => {
  const { axios, user } = useAppContext();
  const currency = import.meta.env.VITE_CURRENCY;

  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fetchShows = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/admin/shows");
      
      if (data.success) {
        setShows(Array.isArray(data.shows) ? data.shows : []);
      } else {
        toast.error(data.message);
        setShows([]);
      }
    } catch (error) {
      toast.error("Failed to fetch shows");
      setShows([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (showId) => {
    if (!window.confirm("Delete this show?")) return;

    try {
      setDeletingId(showId);
      const { data } = await axios.delete(`/api/admin/shows/${showId}`);
      
      if (data.success) {
        toast.success(data.message);
        setShows(shows.filter(show => show._id !== showId));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to delete");
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    if (user) fetchShows();
  }, [user]);

  if (loading) return <Loading />;

  return (
    <div className="text-white">
      <div className="flex items-center justify-between">
        <Title text1="All" text2="Shows" />
        <button
          onClick={fetchShows}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          <RefreshCwIcon className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {Array.isArray(shows) && shows.length > 0 ? (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full border-collapse bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800">
            <thead>
              <tr className="bg-zinc-800 border-b border-zinc-700">
                <th className="p-3 text-left font-semibold text-gray-300">Movie</th>
                <th className="p-3 text-left font-semibold text-gray-300">Date & Time</th>
                <th className="p-3 text-left font-semibold text-gray-300">Price</th>
                <th className="p-3 text-left font-semibold text-gray-300">Rating</th>
                <th className="p-3 text-center font-semibold text-gray-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {shows.map((show) => (
                <tr key={show._id} className="border-b border-zinc-800 hover:bg-zinc-800/50 transition">
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={show.movie?.poster_path || "https://via.placeholder.com/100x150"}
                        alt={show.movie?.title}
                        className="w-12 h-16 object-cover rounded border border-zinc-700"
                      />
                      <span className="font-medium text-white">{show.movie?.title || "Unknown"}</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-400">{dateFormat(show.showDateTime)}</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-1">
                      <DollarSignIcon className="w-4 h-4 text-green-400" />
                      <span className="font-semibold text-green-400">{currency}{show.showPrice}</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-1">
                      <StarIcon className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-gray-300">{show.movie?.vote_average?.toFixed(1) ?? "N/A"}</span>
                    </div>
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleDelete(show._id)}
                      disabled={deletingId === show._id}
                      className="text-red-500 hover:text-red-400 disabled:opacity-50 p-2 rounded hover:bg-red-900/20 transition"
                    >
                      {deletingId === show._id ? (
                        <RefreshCwIcon className="w-5 h-5 animate-spin" />
                      ) : (
                        <TrashIcon className="w-5 h-5" />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-20 bg-zinc-900 border border-zinc-800 rounded-lg mt-6">
          <p className="text-xl text-gray-400">No shows found</p>
        </div>
      )}
    </div>
  );
};

export default ListShows;