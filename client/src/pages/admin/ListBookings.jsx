

import React, { useEffect, useState } from "react";
import { TrashIcon, CheckCircleIcon, XCircleIcon, UserIcon, MailIcon, RefreshCwIcon } from "lucide-react";
import Loading from "../../components/Loading";
import Title from "../../components/admin/Title";
import { dateFormat } from "../../lib/dateFormat";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const ListBookings = () => {
  const { axios, user } = useAppContext();
  const currency = import.meta.env.VITE_CURRENCY;

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/admin/bookings");
      
      if (data.success) {
        setBookings(Array.isArray(data.bookings) ? data.bookings : []);
      } else {
        toast.error(data.message);
        setBookings([]);
      }
    } catch (error) {
      console.error("Fetch bookings error:", error);
      setBookings([]);
      
      if (error.response?.status === 401 || error.response?.status === 403) {
        toast.error("Unauthorized - Admin access required");
      } else {
        toast.error("Failed to fetch bookings");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (bookingId) => {
    if (!window.confirm("Are you sure you want to delete this booking? This will release the seats.")) {
      return;
    }

    try {
      setDeletingId(bookingId);
      const { data } = await axios.delete(`/api/admin/bookings/${bookingId}`);
      
      if (data.success) {
        toast.success(data.message);
        setBookings(bookings.filter(booking => booking._id !== bookingId));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Delete booking error:", error);
      toast.error(error.response?.data?.message || "Failed to delete booking");
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  if (loading) return <Loading />;

  return (
    <div className="text-white">
      <div className="flex items-center justify-between">
        <Title text1="All" text2="Bookings" />
        <button
          onClick={fetchBookings}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          <RefreshCwIcon className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {Array.isArray(bookings) && bookings.length > 0 ? (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full border-collapse bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800">
            <thead>
              <tr className="bg-zinc-800 border-b border-zinc-700">
                <th className="p-3 text-left font-semibold text-gray-300">User</th>
                <th className="p-3 text-left font-semibold text-gray-300">Movie</th>
                <th className="p-3 text-left font-semibold text-gray-300">Show Time</th>
                <th className="p-3 text-left font-semibold text-gray-300">Seats</th>
                <th className="p-3 text-left font-semibold text-gray-300">Amount</th>
                <th className="p-3 text-center font-semibold text-gray-300">Status</th>
                <th className="p-3 text-center font-semibold text-gray-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className="border-b border-zinc-800 hover:bg-zinc-800/50 transition-colors">
                  <td className="p-3">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <UserIcon className="w-4 h-4 text-gray-400" />
                        <span className="font-medium text-white">{booking.user?.name || "N/A"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <MailIcon className="w-3 h-3" />
                        <span>{booking.user?.email || "N/A"}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={booking.show?.movie?.poster_path || "https://via.placeholder.com/100x150?text=No+Image"}
                        alt={booking.show?.movie?.title || "Movie"}
                        className="w-10 h-14 object-cover rounded border border-zinc-700"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/100x150?text=No+Image";
                        }}
                      />
                      <span className="font-medium text-white" title={booking.show?.movie?.title}>
                        {booking.show?.movie?.title || "N/A"}
                      </span>
                    </div>
                  </td>
                  <td className="p-3">
                    <span className="text-sm text-gray-400">
                      {booking.show?.showDateTime ? dateFormat(booking.show.showDateTime) : "N/A"}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="font-medium text-white">
                      {Array.isArray(booking.bookedSeats) && booking.bookedSeats.length > 0
                        ? booking.bookedSeats.join(", ")
                        : "N/A"}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="font-semibold text-green-400">
                      {currency}{booking.amount || 0}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    {booking.isPaid ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-900/30 text-green-400 border border-green-800 rounded-full text-sm font-medium">
                        <CheckCircleIcon className="w-4 h-4" />
                        Paid
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-900/30 text-red-400 border border-red-800 rounded-full text-sm font-medium">
                        <XCircleIcon className="w-4 h-4" />
                        Unpaid
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleDelete(booking._id)}
                      disabled={deletingId === booking._id}
                      className="text-red-500 hover:text-red-400 disabled:opacity-50 transition-colors p-2 rounded hover:bg-red-900/20"
                      title="Delete booking"
                    >
                      {deletingId === booking._id ? (
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
          <p className="text-xl text-gray-400">No bookings found</p>
          <p className="text-gray-500 mt-2">Bookings will appear here</p>
        </div>
      )}
    </div>
  );
};

export default ListBookings;