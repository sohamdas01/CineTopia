// import React, { useEffect, useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import { assets, dummyDateTimeData, dummyShowsData } from '../assets/assets'
// import Loading from '../components/Loading'
// import { ArrowRightIcon, ClockIcon } from 'lucide-react'
// import isoTimeFormat from '../lib/isoTimeFormat'
// import BlurCircle from '../components/BlurCircle'
// import toast from 'react-hot-toast'
// import { useAppContext } from '../context/AppContext'

// const SeatLayout = () => {

//   const groupRows = [["A", "B"], ["C", "D"], ["E", "F"], ["G", "H"], ["I", "J"]]

//   const {id, date } = useParams()
//   const [selectedSeats, setSelectedSeats] = useState([])
//   const [selectedTime, setSelectedTime] = useState(null)
//   const [show, setShow] = useState(null)
//   const [occupiedSeats, setOccupiedSeats] = useState([])

//   const navigate = useNavigate()

//   const {axios, getToken, user} = useAppContext();

//   const getShow = async () =>{
//     try {
//       const { data } = await axios.get(`/api/show/${id}`)
//       if (data.success){
//         setShow(data)
//       }
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   const handleSeatClick = (seatId) =>{
//       if (!selectedTime) {
//         return toast("Please select time first")
//       }
//       if(!selectedSeats.includes(seatId) && selectedSeats.length > 4){
//         return toast("You can only select 5 seats")
//       }
//       if(occupiedSeats.includes(seatId)){
//         return toast('This seat is already booked')
//       }
//       setSelectedSeats(prev => prev.includes(seatId) ? prev.filter(seat => seat !== seatId) : [...prev, seatId])
//   }

//   const renderSeats = (row, count = 9)=>(
//     <div key={row} className="flex gap-2 mt-2">
//             <div className="flex flex-wrap items-center justify-center gap-2">
//                 {Array.from({ length: count }, (_, i) => {
//                     const seatId = `${row}${i + 1}`;
//                     return (
//                         <button key={seatId} onClick={() => handleSeatClick(seatId)} className={`h-8 w-8 rounded border border-primary/60 cursor-pointer
//                          ${selectedSeats.includes(seatId) && "bg-primary text-white"} 
//                          ${occupiedSeats.includes(seatId) && "opacity-50"}`}>
//                             {seatId}
//                         </button>
//                     );
//                 })}
//             </div>
//         </div>
//   )

//   const getOccupiedSeats = async ()=>{
//     try {
//       const { data } = await axios.get(`/api/booking/seats/${selectedTime.showId}`)
//       if (data.success) {
//         setOccupiedSeats(data.occupiedSeats)
//       }else{
//         toast.error(data.message)
//       }
//     } catch (error) {
//       console.log(error)
//     }
//   }


//   const bookTickets = async ()=>{
//     try {
//       if(!user) return toast.error('Please login to proceed')

//         if(!selectedTime || !selectedSeats.length) return toast.error('Please select a time and seats');

//         const {data} = await axios.post('/api/booking/create', {showId: selectedTime.showId, selectedSeats}, {headers: { Authorization: `Bearer ${await getToken()}` }});

//         if (data.success){
//           window.location.href = data.url;
//         }else{
//           toast.error(data.message)
//         }
//     } catch (error) {
//       toast.error(error.message)
//     }
//   }

//   useEffect(()=>{
//     getShow()
//   },[])

//   useEffect(()=>{
//     if(selectedTime){
//       getOccupiedSeats()
//     }
//   },[selectedTime])

//   return show ? (
//     <div className='flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-30 md:pt-50'>
//       {/* Available Timings */}
//       <div className='w-60 bg-primary/10 border border-primary/20 rounded-lg py-10 h-max md:sticky md:top-30'>
//         <p className='text-lg font-semibold px-6'>Available Timings</p>
//         <div className='mt-5 space-y-1'>
//           {show.dateTime[date].map((item)=>(
//             <div key={item.time} onClick={()=> setSelectedTime(item)} className={`flex items-center gap-2 px-6 py-2 w-max rounded-r-md cursor-pointer transition ${selectedTime?.time === item.time ? "bg-primary text-white" : "hover:bg-primary/20"}`}>
//               <ClockIcon className="w-4 h-4"/>
//               <p className='text-sm'>{isoTimeFormat(item.time)}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Seats Layout */}
//       <div className='relative flex-1 flex flex-col items-center max-md:mt-16'>
//           <BlurCircle top="-100px" left="-100px"/>
//           <BlurCircle bottom="0" right="0"/>
//           <h1 className='text-2xl font-semibold mb-4'>Select your seat</h1>
//           <img src={assets.screenImage} alt="screen" />
//           <p className='text-gray-400 text-sm mb-6'>SCREEN SIDE</p>

//           <div className='flex flex-col items-center mt-10 text-xs text-gray-300'>
//               <div className='grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-2 mb-6'>
//                 {groupRows[0].map(row => renderSeats(row))}
//               </div>

//                <div className='grid grid-cols-2 gap-11'>
//                 {groupRows.slice(1).map((group, idx)=>(
//                   <div key={idx}>
//                     {group.map(row => renderSeats(row))}
//                   </div>
//                 ))}
//               </div>
//           </div>

//           <button onClick={bookTickets} className='flex items-center gap-1 mt-20 px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer active:scale-95'>
//             Proceed to Checkout
//             <ArrowRightIcon strokeWidth={3} className="w-4 h-4"/>
//           </button>


//       </div>
//     </div>
//   ) : (
//     <Loading />
//   )
// }

// export default SeatLayout


// import React, { useEffect, useState } from 'react';
// import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
// import { useAppContext } from '../context/AppContext';
// import toast from 'react-hot-toast';
// import Loading from '../components/Loading';

// const SeatLayout = () => {
//   const { id, date } = useParams();
//   const [searchParams] = useSearchParams();
//   const showId = searchParams.get('showId');
//   const navigate = useNavigate();
//   const { axios, user } = useAppContext();
//   const currency = import.meta.env.VITE_CURRENCY;

//   const [movie, setMovie] = useState(null);
//   const [show, setShow] = useState(null);
//   const [occupiedSeats, setOccupiedSeats] = useState([]);
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [booking, setBooking] = useState(false);

//   const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
//   const seatsPerRow = 10;

//   useEffect(() => {
//     fetchData();
//   }, [showId]);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const [movieRes, seatsRes] = await Promise.all([
//         axios.get(`/api/show/${id}`),
//         axios.get(`/api/booking/seats/${showId}`)
//       ]);

//       if (movieRes.data.success) {
//         setMovie(movieRes.data.movie);

//         const shows = movieRes.data.dateTime[date];
//         const currentShow = shows?.find(s => s.showId === showId);
//         setShow(currentShow);
//       }

//       if (seatsRes.data.success) {
//         setOccupiedSeats(seatsRes.data.occupiedSeats);
//       }
//     } catch (error) {
//       toast.error("Failed to load seats");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSeatClick = (seatId) => {
//     if (occupiedSeats.includes(seatId)) return;

//     setSelectedSeats(prev =>
//       prev.includes(seatId)
//         ? prev.filter(s => s !== seatId)
//         : [...prev, seatId]
//     );
//   };

//   const handleBooking = async () => {
//     if (!user) {
//       toast.error("Please login to book");
//       return;
//     }

//     if (selectedSeats.length === 0) {
//       toast.error("Please select seats");
//       return;
//     }

//     try {
//       setBooking(true);
//       const { data } = await axios.post('/api/booking/create', {
//         showId,
//         selectedSeats
//       });

//       if (data.success) {
//         window.location.href = data.url;
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error("Booking failed");
//     } finally {
//       setBooking(false);
//     }
//   };

//   if (loading) return <Loading />;

//   if (!movie || !show) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-xl">Show not found</p>
//       </div>
//     );
//   }

//   const totalPrice = selectedSeats.length * (show.showPrice || 0);

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
//         <p className="text-gray-600">
//           {new Date(show.time).toLocaleDateString('en-US', { 
//             weekday: 'long', 
//             year: 'numeric', 
//             month: 'long', 
//             day: 'numeric' 
//           })} at {new Date(show.time).toLocaleTimeString('en-US', { 
//             hour: '2-digit', 
//             minute: '2-digit' 
//           })}
//         </p>
//       </div>

//       <div className="grid md:grid-cols-3 gap-8">
//         <div className="md:col-span-2">
//           <div className="mb-8">
//             <div className="flex justify-center mb-4">
//               <div className="w-full max-w-2xl h-2 bg-gray-300 rounded-full relative">
//                 <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-sm text-gray-500">
//                   SCREEN
//                 </span>
//               </div>
//             </div>

//             <div className="bg-white rounded-lg p-6 shadow-lg">
//               <div className="space-y-3">
//                 {rows.map((row) => (
//                   <div key={row} className="flex items-center gap-2">
//                     <span className="w-8 text-center font-bold text-gray-600">{row}</span>
//                     <div className="flex gap-2 flex-1 justify-center">
//                       {Array.from({ length: seatsPerRow }, (_, i) => {
//                         const seatId = `${row}${i + 1}`;
//                         const isOccupied = occupiedSeats.includes(seatId);
//                         const isSelected = selectedSeats.includes(seatId);

//                         return (
//                           <button
//                             key={seatId}
//                             onClick={() => handleSeatClick(seatId)}
//                             disabled={isOccupied}
//                             className={`
//                               w-10 h-10 rounded-t-lg text-xs font-semibold transition-all
//                               ${isOccupied 
//                                 ? 'bg-gray-400 cursor-not-allowed' 
//                                 : isSelected 
//                                   ? 'bg-green-500 text-white shadow-lg scale-110' 
//                                   : 'bg-gray-200 hover:bg-gray-300'
//                               }
//                             `}
//                           >
//                             {i + 1}
//                           </button>
//                         );
//                       })}
//                     </div>
//                     <span className="w-8"></span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="flex justify-center gap-8 mt-6">
//               <div className="flex items-center gap-2">
//                 <div className="w-6 h-6 bg-gray-200 rounded"></div>
//                 <span className="text-sm">Available</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <div className="w-6 h-6 bg-green-500 rounded"></div>
//                 <span className="text-sm">Selected</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <div className="w-6 h-6 bg-gray-400 rounded"></div>
//                 <span className="text-sm">Occupied</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div>
//           <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
//             <h2 className="text-xl font-bold mb-4">Booking Summary</h2>

//             <div className="space-y-3 mb-6">
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Selected Seats:</span>
//                 <span className="font-semibold">
//                   {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}
//                 </span>
//               </div>

//               <div className="flex justify-between">
//                 <span className="text-gray-600">Number of Seats:</span>
//                 <span className="font-semibold">{selectedSeats.length}</span>
//               </div>

//               <div className="flex justify-between">
//                 <span className="text-gray-600">Price per Seat:</span>
//                 <span className="font-semibold">{currency}{show.showPrice || 0}</span>
//               </div>

//               <div className="border-t pt-3 mt-3">
//                 <div className="flex justify-between text-lg">
//                   <span className="font-bold">Total:</span>
//                   <span className="font-bold text-primary">
//                     {currency}{totalPrice}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <button
//               onClick={handleBooking}
//               disabled={selectedSeats.length === 0 || booking}
//               className="w-full py-3 bg-primary text-white rounded-lg font-semibold 
//                 hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//             >
//               {booking ? 'Processing...' : 'Proceed to Payment'}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SeatLayout;
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
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

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

  // const handleBooking = async () => {
  //   if (selectedSeats.length === 0) {
  //     toast.error("Please select seats");
  //     return;
  //   }

  //   try {
  //     setBooking(true);
  //     const { data } = await axios.post("/api/booking/create", {
  //       showId,
  //       selectedSeats,
  //     });

  //     if (data.success) {
  //       window.location.href = data.url;
  //     } else {
  //       toast.error(data.message);
  //     }
  //   } catch {
  //     toast.error("Booking failed");
  //   } finally {
  //     setBooking(false);
  //   }
  // };
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
        userId: user?.id || "guest-user" // ✅ Send userId from Clerk
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

  // ✅ PRICE FIX (THIS WAS THE BUG)
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
        <p className="text-yellow-500 font-semibold">
          ⏱️ Complete payment within: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
        </p>
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
