// import React, { useEffect, useState } from 'react'
// import { dummyBookingData } from '../assets/assets'
// import Loading from '../components/Loading'
// import BlurCircle from '../components/BlurCircle'
// import timeFormat from '../lib/timeFormat'
// import { dateFormat } from '../lib/dateFormat'
// import { useAppContext } from '../context/AppContext'
// import { Link } from 'react-router-dom'

// const MyBookings = () => {
//   const currency = import.meta.env.VITE_CURRENCY

//   const { axios, getToken, user, image_base_url} = useAppContext()

//   const [bookings, setBookings] = useState([])
//   const [isLoading, setIsLoading] = useState(true)

//   const getMyBookings = async () =>{
//     try {
//       const {data} = await axios.get('/api/user/bookings', {
//         headers: { Authorization: `Bearer ${await getToken()}` }
//       })
//         if (data.success) {
//           setBookings(data.bookings)
//         }

//     } catch (error) {
//       console.log(error)
//     }
//     setIsLoading(false)
//   }

//   useEffect(()=>{
//     if(user){
//       getMyBookings()
//     }
    
//   },[user])


//   return !isLoading ? (
//     <div className='relative px-6 md:px-16 lg:px-40 pt-30 md:pt-40 min-h-[80vh]'>
//       <BlurCircle top="100px" left="100px"/>
//       <div>
//         <BlurCircle bottom="0px" left="600px"/>
//       </div>
//       <h1 className='text-lg font-semibold mb-4'>My Bookings</h1>

//       {bookings.map((item,index)=>(
//         <div key={index} className='flex flex-col md:flex-row justify-between bg-primary/8 border border-primary/20 rounded-lg mt-4 p-2 max-w-3xl'>
//           <div className='flex flex-col md:flex-row'>
//             <img src={image_base_url + item.show.movie.poster_path} alt="" className='md:max-w-45 aspect-video h-auto object-cover object-bottom rounded'/>
//             <div className='flex flex-col p-4'>
//               <p className='text-lg font-semibold'>{item.show.movie.title}</p>
//               <p className='text-gray-400 text-sm'>{timeFormat(item.show.movie.runtime)}</p>
//               <p className='text-gray-400 text-sm mt-auto'>{dateFormat(item.show.showDateTime)}</p>
//             </div>
//           </div>

//           <div className='flex flex-col md:items-end md:text-right justify-between p-4'>
//             <div className='flex items-center gap-4'>
//               <p className='text-2xl font-semibold mb-3'>{currency}{item.amount}</p>
//               {!item.isPaid && <Link to={item.paymentLink} className='bg-primary px-4 py-1.5 mb-3 text-sm rounded-full font-medium cursor-pointer'>Pay Now</Link>}
//             </div>
//             <div className='text-sm'>
//               <p><span className='text-gray-400'>Total Tickets:</span> {item.bookedSeats.length}</p>
//               <p><span className='text-gray-400'>Seat Number:</span> {item.bookedSeats.join(", ")}</p>
//             </div>
//           </div>

//         </div>
//       ))}

//     </div>
//   ) : <Loading />
// }

// export default MyBookings

// import React, { useEffect, useState } from 'react';
// import { useAppContext } from '../context/AppContext';
// import { CalendarIcon, CheckCircleIcon, XCircleIcon } from 'lucide-react';
// import { dateFormat } from '../lib/dateFormat';
// import toast from 'react-hot-toast';
// import Loading from '../components/Loading';

// const MyBookings = () => {
//   const { axios, user, isLoaded } = useAppContext();
//   const currency = import.meta.env.VITE_CURRENCY;

//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (user) {
//       fetchBookings();
//     }
//   }, [user]);

//   const fetchBookings = async () => {
//     try {
//       setLoading(true);
//       const { data } = await axios.get('/api/user/bookings');

//       if (data.success) {
//         setBookings(data.bookings);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error("Failed to load bookings");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!isLoaded || loading) return <Loading />;

//   if (!user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-xl">Please login to view bookings</p>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-8">My Bookings</h1>

//       {bookings.length > 0 ? (
//         <div className="space-y-4">
//           {bookings.map((booking) => (
//             <div
//               key={booking._id}
//               className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
//             >
//               <div className="flex flex-col md:flex-row">
//                 <img
//                   src={booking.show?.movie?.poster_path || "https://via.placeholder.com/200x300"}
//                   alt={booking.show?.movie?.title}
//                   className="w-full md:w-48 h-64 object-cover"
//                 />

//                 <div className="flex-1 p-6">
//                   <div className="flex justify-between items-start mb-4">
//                     <div>
//                       <h2 className="text-2xl font-bold mb-2">
//                         {booking.show?.movie?.title || "Unknown Movie"}
//                       </h2>
//                       <div className="flex items-center gap-4 text-sm text-gray-600">
//                         <div className="flex items-center gap-1">
//                           <CalendarIcon className="w-4 h-4" />
//                           <span>
//                             {booking.show?.showDateTime
//                               ? dateFormat(booking.show.showDateTime)
//                               : "N/A"}
//                           </span>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-2">
//                       {booking.isPaid ? (
//                         <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
//                           <CheckCircleIcon className="w-4 h-4" />
//                           Paid
//                         </span>
//                       ) : (
//                         <span className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
//                           <XCircleIcon className="w-4 h-4" />
//                           Unpaid
//                         </span>
//                       )}
//                     </div>
//                   </div>

//                   <div className="grid md:grid-cols-2 gap-4 mb-4">
//                     <div>
//                       <span className="text-gray-600 text-sm">Seats:</span>
//                       <p className="font-semibold">
//                         {booking.bookedSeats?.join(', ') || "N/A"}
//                       </p>
//                     </div>
//                     <div>
//                       <span className="text-gray-600 text-sm">Total Amount:</span>
//                       <p className="font-semibold text-lg text-primary">
//                         {currency}{booking.amount || 0}
//                       </p>
//                     </div>
//                   </div>

//                   {!booking.isPaid && booking.paymentLink && (
//                     <a
//                       href={booking.paymentLink}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="inline-block px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
//                     >
//                       Complete Payment
//                     </a>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="text-center py-20">
//           <p className="text-xl text-gray-600 mb-4">No bookings yet</p>
//           <a
//             href="/movies"
//             className="inline-block px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
//           >
//             Browse Movies
//           </a>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyBookings;

// import React, { useEffect, useState } from 'react';
// import { useAppContext } from '../context/AppContext';
// import { CalendarIcon, CheckCircleIcon, XCircleIcon } from 'lucide-react';
// import { dateFormat } from '../lib/dateFormat';
// import toast from 'react-hot-toast';
// import Loading from '../components/Loading';

// const MyBookings = () => {
//   const { axios, user, isLoaded } = useAppContext();
//   const currency = import.meta.env.VITE_CURRENCY;

//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (user) {
//       fetchBookings();
//     } else {
//       setLoading(false);
//     }
//   }, [user]);

//   const fetchBookings = async () => {
//     try {
//       setLoading(true);
//       // ✅ Send userId as query parameter
//       const { data } = await axios.get(`/api/user/bookings?userId=${user.id}`);

//       if (data.success) {
//         setBookings(data.bookings);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error("Fetch bookings error:", error);
//       toast.error("Failed to load bookings");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!isLoaded || loading) return <Loading />;

//   if (!user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center pt-20">
//         <p className="text-xl">Please login to view bookings</p>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8 pt-24">
//       <h1 className="text-3xl font-bold mb-8">My Bookings</h1>

//       {bookings.length > 0 ? (
//         <div className="space-y-4">
//           {bookings.map((booking) => (
//             <div
//               key={booking._id}
//               className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
//             >
//               <div className="flex flex-col md:flex-row">
//                 <img
//                   src={
//                     booking.show?.movie?.poster_path ||
//                     "https://via.placeholder.com/200x300"
//                   }
//                   alt={booking.show?.movie?.title}
//                   className="w-full md:w-48 h-64 object-cover"
//                 />

//                 <div className="flex-1 p-6">
//                   <div className="flex justify-between items-start mb-4">
//                     <div>
//                       <h2 className="text-2xl font-bold mb-2">
//                         {booking.show?.movie?.title || "Unknown Movie"}
//                       </h2>
//                       <div className="flex items-center gap-4 text-sm text-gray-600">
//                         <div className="flex items-center gap-1">
//                           <CalendarIcon className="w-4 h-4" />
//                           <span>
//                             {booking.show?.showDateTime
//                               ? dateFormat(booking.show.showDateTime)
//                               : "N/A"}
//                           </span>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-2">
//                       {booking.isPaid ? (
//                         <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
//                           <CheckCircleIcon className="w-4 h-4" />
//                           Paid
//                         </span>
//                       ) : (
//                         <span className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
//                           <XCircleIcon className="w-4 h-4" />
//                           Unpaid
//                         </span>
//                       )}
//                     </div>
//                   </div>

//                   <div className="grid md:grid-cols-2 gap-4 mb-4">
//                     <div>
//                       <span className="text-gray-600 text-sm">Seats:</span>
//                       <p className="font-semibold">
//                         {booking.bookedSeats?.join(', ') || "N/A"}
//                       </p>
//                     </div>
//                     <div>
//                       <span className="text-gray-600 text-sm">Total Amount:</span>
//                       <p className="font-semibold text-lg text-primary">
//                         {currency}{booking.amount || 0}
//                       </p>
//                     </div>
//                   </div>

//                   {!booking.isPaid && booking.paymentLink && (
//                     <a
//                       href={booking.paymentLink}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="inline-block px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
//                     >
//                       Complete Payment
//                     </a>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="text-center py-20">
//           <p className="text-xl text-gray-600 mb-4">No bookings yet</p>
//           <a
//             href="/movies"
//             className="inline-block px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
//           >
//             Browse Movies
//           </a>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyBookings;

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
