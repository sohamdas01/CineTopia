

import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Calendar, Check, X, CreditCard, Ticket } from 'lucide-react';
import { dateFormat } from '../lib/dateFormat';
import toast from 'react-hot-toast';
import Loading from '../components/Loading';

const MyBookings = () => {
  const { axios, user, isLoaded } = useAppContext();
  const currency = import.meta.env.VITE_CURRENCY;

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchBookings();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/user/bookings?userId=${user.id}`);

      if (data.success) {
        setBookings(data.bookings);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Fetch bookings error:', error);
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const handlePayNow = (paymentLink) => {
    window.location.href = paymentLink;
  };

  if (!isLoaded || loading) return <Loading />;

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center pt-20">
        <div className="text-center">
          <Ticket className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-2xl mb-4">Please login to view bookings</p>
          <a
            href="/login"
            className="inline-block px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition"
          >
            Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-red-500 mb-2 flex items-center gap-3">
            <Ticket className="w-10 h-10" />
            My Bookings
          </h1>
          <p className="text-gray-400 text-lg">
            {bookings.length} {bookings.length === 1 ? 'booking' : 'bookings'} found
          </p>
        </div>

        {bookings.length > 0 ? (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-red-900 transition-all duration-300 hover:shadow-2xl hover:shadow-red-900/20"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Movie Poster */}
                  <div className="relative md:w-56 h-72 md:h-auto flex-shrink-0 overflow-hidden">
                    <img
                      src={booking.show?.movie?.poster_path || 'https://via.placeholder.com/300x450'}
                      alt={booking.show?.movie?.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                    {/* Status Badge on Poster */}
                    <div className="absolute top-4 right-4">
                      {booking.isPaid ? (
                        <span className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 rounded-full text-sm font-bold shadow-lg">
                          <Check className="w-4 h-4" />
                          PAID
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 rounded-full text-sm font-bold shadow-lg animate-pulse">
                          <X className="w-4 h-4" />
                          UNPAID
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Booking Details */}
                  <div className="flex-1 p-6 md:p-8">
                    {/* Movie Title */}
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                      {booking.show?.movie?.title || 'Unknown Movie'}
                    </h2>

                    {/* Show Date/Time */}
                    <div className="flex items-center gap-2 mb-6 text-gray-300">
                      <Calendar className="w-5 h-5 text-red-500" />
                      <span className="text-lg">
                        {booking.show?.showDateTime
                          ? dateFormat(booking.show.showDateTime)
                          : 'N/A'}
                      </span>
                    </div>

                    {/* Details Grid */}
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      {/* Seats */}
                      <div className="bg-black/40 p-4 rounded-xl border border-zinc-800">
                        <div className="flex items-center gap-2 mb-2">
                          <Ticket className="w-4 h-4 text-red-500" />
                          <span className="text-gray-400 text-sm font-medium">SEATS</span>
                        </div>
                        <p className="text-xl font-bold text-white">
                          {booking.bookedSeats?.join(', ') || 'N/A'}
                        </p>
                      </div>

                      {/* Amount */}
                      <div className="bg-black/40 p-4 rounded-xl border border-zinc-800">
                        <div className="flex items-center gap-2 mb-2">
                          <CreditCard className="w-4 h-4 text-red-500" />
                          <span className="text-gray-400 text-sm font-medium">TOTAL AMOUNT</span>
                        </div>
                        <p className="text-2xl font-bold text-red-500">
                          {currency}
                          {booking.amount || 0}
                        </p>
                      </div>
                    </div>

                    {/* Pay Now Button for Unpaid */}
                    {!booking.isPaid && booking.paymentLink && (
                      <button
                        onClick={() => handlePayNow(booking.paymentLink)}
                        className="w-full md:w-auto px-8 py-4 bg-red-600 hover:bg-red-700 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-red-900/50"
                      >
                        <CreditCard className="w-5 h-5" />
                        Pay Now
                      </button>
                    )}

                    {/* Confirmation Message for Paid */}
                    {booking.isPaid && (
                      <div className="flex items-center gap-2 px-4 py-3 bg-green-900/30 border border-green-800 rounded-xl">
                        <Check className="w-5 h-5 text-green-400" />
                        <span className="text-green-400 font-semibold">
                          Payment Confirmed - Enjoy your movie! 🍿
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="bg-zinc-900 rounded-2xl p-12 border border-zinc-800 max-w-md mx-auto">
              <Ticket className="w-20 h-20 text-red-500 mx-auto mb-6 opacity-50" />
              <p className="text-2xl text-gray-400 mb-6">No bookings yet</p>
              <p className="text-gray-500 mb-8">Start booking your favorite movies now!</p>
              <a
                href="/movies"
                className="inline-block px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-all duration-300 transform hover:scale-105"
              >
                Browse Movies
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
