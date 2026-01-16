
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import Loading from "../components/Loading";
import { assets } from "../assets/assets";

const SeatLayout = () => {
  const { id, date } = useParams();
  const [searchParams] = useSearchParams();
  const showId = searchParams.get("showId");

  const { axios, user } = useAppContext();
  const currency = import.meta.env.VITE_CURRENCY;

  const [movie, setMovie] = useState(null);
  const [show, setShow] = useState(null);
  const [occupiedSeats, setOccupiedSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);

  const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const seatsPerRow = 10;
  const [timeLeft, setTimeLeft] = useState(600); 

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          toast.error("Time expired! Please book again.");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetchData();
  }, [showId]);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [movieRes, seatsRes] = await Promise.all([
        axios.get(`/api/show/${id}`),
        axios.get(`/api/booking/seats/${showId}`),
      ]);

      if (movieRes.data.success) {
        setMovie(movieRes.data.movie);

        const shows = movieRes.data.dateTime?.[date] || [];
        const currentShow = shows.find((s) => s.showId === showId);
        setShow(currentShow);
      }

      if (seatsRes.data.success) {
        setOccupiedSeats(seatsRes.data.occupiedSeats);
      }
    } catch {
      toast.error("Failed to load seat layout");
    } finally {
      setLoading(false);
    }
  };

  const handleSeatClick = (seatId) => {
    if (occupiedSeats.includes(seatId)) return;

    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((s) => s !== seatId)
        : [...prev, seatId]
    );
  };

  const handleBooking = async () => {
    if (selectedSeats.length === 0) {
      toast.error("Please select seats");
      return;
    }

    try {
      setBooking(true);
      const { data } = await axios.post("/api/booking/create", {
        showId,
        selectedSeats,
        userId: user?.id || "guest-user" //  Send userId from Clerk
      });

      if (data.success) {
        window.location.href = data.url;
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Booking failed");
    } finally {
      setBooking(false);
    }
  };

  if (loading) return <Loading />;
  if (!movie || !show) return null;

  const seatPrice =
    show.showPrice ??
    show.price ??
    movie.showPrice ??
    0;

  const totalPrice = selectedSeats.length * seatPrice;

  return (
    <div className="min-h-screen bg-black text-white pt-24 px-4">
      {/* HEADER */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-red-500">{movie.title}</h1>
        <p className="text-gray-400 mt-1">
          {new Date(show.time).toLocaleString()}
        </p>
        {/* <p className="text-yellow-500 font-semibold">
          ⏱️ Complete payment within: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
        </p> */}
      </div>

      <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {/* SEAT AREA */}
        <div className="md:col-span-2 bg-zinc-900 p-6 rounded-xl">
          {/* SCREEN IMAGE */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-semibold mb-4">
              Select your seat
            </h1>
            <img
              src={assets.screenImage}
              alt="screen"
              className="mx-auto mb-2"
            />
            <p className="text-gray-400 text-sm">SCREEN SIDE</p>
          </div>

          {/* SEATS */}
          {rows.map((row) => (
            <div key={row} className="flex items-center gap-2 mb-2">
              <span className="w-6">{row}</span>

              <div className="flex gap-2 flex-wrap">
                {Array.from({ length: seatsPerRow }).map((_, i) => {
                  const seatId = `${row}${i + 1}`;
                  const occupied = occupiedSeats.includes(seatId);
                  const selected = selectedSeats.includes(seatId);

                  return (
                    <button
                      key={seatId}
                      onClick={() => handleSeatClick(seatId)}
                      disabled={occupied}
                      className={`w-9 h-9 rounded text-xs font-semibold transition
                        ${occupied
                          ? "bg-gray-700 cursor-not-allowed"
                          : selected
                            ? "bg-red-600 scale-110"
                            : "bg-gray-300 text-black hover:bg-gray-400"
                        }`}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* SUMMARY */}
        <div className="bg-zinc-900 p-6 rounded-xl sticky top-28">
          <h2 className="text-xl font-bold mb-4 text-red-500">
            Booking Summary
          </h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Selected Seats</span>
              <span>{selectedSeats.join(", ") || "-"}</span>
            </div>

            <div className="flex justify-between">
              <span>Seat Price</span>
              <span>
                {currency}
                {seatPrice}
              </span>
            </div>

            <div className="flex justify-between border-t pt-3 text-lg font-bold">
              <span>Total</span>
              <span className="text-red-500">
                {currency}
                {totalPrice}
              </span>
            </div>
          </div>

          <button
            onClick={handleBooking}
            disabled={booking || selectedSeats.length === 0}
            className="w-full mt-6 bg-red-600 hover:bg-red-700 py-3 rounded font-semibold disabled:opacity-50"
          >
            {booking ? "Processing..." : "Proceed to Payment"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeatLayout;
