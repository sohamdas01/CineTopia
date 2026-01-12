// import React, { useEffect, useState } from 'react'
// import { dummyBookingData } from '../../assets/assets';
// import Loading from '../../components/Loading';
// import Title from '../../components/admin/Title';
// import { dateFormat } from '../../lib/dateFormat';
// import { useAppContext } from '../../context/AppContext';

// const ListBookings = () => {
//     const currency = import.meta.env.VITE_CURRENCY

//     const {axios, getToken, user} = useAppContext()

//     const [bookings, setBookings] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);

//     const getAllBookings = async () => {
//         try {
//           const { data } = await axios.get("/api/admin/all-bookings", {
//                 headers: { Authorization: `Bearer ${await getToken()}` }
//             });
//             setBookings(data.bookings)
//         } catch (error) {
//           console.error(error);
//         }
//         setIsLoading(false)
//     };

//      useEffect(() => {
//       if (user) {
//         getAllBookings();
//       }    
//     }, [user]);


//   return !isLoading ? (
//     <>
//       <Title text1="List" text2="Bookings" />
//       <div className="max-w-4xl mt-6 overflow-x-auto">
//         <table className="w-full border-collapse  rounded-md overflow-hidden text-nowrap">
//             <thead>
//                 <tr className="bg-primary/20 text-left text-white">
//                     <th className="p-2 font-medium pl-5">User Name</th>
//                     <th className="p-2 font-medium">Movie Name</th>
//                     <th className="p-2 font-medium">Show Time</th>
//                     <th className="p-2 font-medium">Seats</th>
//                     <th className="p-2 font-medium">Amount</th>
//                 </tr>
//             </thead>
//             <tbody className="text-sm font-light">
//                 {bookings.map((item, index) => (
//                     <tr key={index} className="border-b border-primary/20 bg-primary/5 even:bg-primary/10">
//                         <td className="p-2 min-w-45 pl-5">{item.user.name}</td>
//                         <td className="p-2">{item.show.movie.title}</td>
//                         <td className="p-2">{dateFormat(item.show.showDateTime)}</td>
//                         <td className="p-2">{Object.keys(item.bookedSeats).map(seat => item.bookedSeats[seat]).join(", ")}</td>
//                         <td className="p-2">{currency} {item.amount}</td>
//                     </tr>
//                 ))}
//             </tbody>
//         </table>
//       </div>
//     </>
//   ) : <Loading />
// }

// export default ListBookings


// import React, { useEffect, useState } from "react";
// import Loading from "../../components/Loading";
// import Title from "../../components/admin/Title";
// import { dateFormat } from "../../lib/dateFormat";
// import { useAppContext } from "../../context/AppContext";

// const ListBookings = () => {
//   const currency = import.meta.env.VITE_CURRENCY;
//   const { axios, user } = useAppContext();

//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const getAllBookings = async () => {
//     try {
//       const { data } = await axios.get("/api/admin/all-bookings");
//       setBookings(data.bookings);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (user) getAllBookings();
//   }, [user]);

//   if (loading) return <Loading />;

//   return (
//     <>
//       <Title text1="List" text2="Bookings" />

//       <table className="w-full mt-6">
//         <thead>
//           <tr>
//             <th>User</th>
//             <th>Movie</th>
//             <th>Show Time</th>
//             <th>Seats</th>
//             <th>Amount</th>
//           </tr>
//         </thead>
//         <tbody>
//           {bookings.map((b, i) => (
//             <tr key={i}>
//               <td>{b.user.username}</td>
//               <td>{b.show.movie.title}</td>
//               <td>{dateFormat(b.show.showDateTime)}</td>
//               <td>{b.bookedSeats.join(", ")}</td>
//               <td>{currency} {b.amount}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </>
//   );
// };

// export default ListBookings;

// import React, { useEffect, useState } from "react";
// import { TrashIcon, CheckCircleIcon, XCircleIcon, UserIcon, MailIcon } from "lucide-react";
// import Loading from "../../components/Loading";
// import Title from "../../components/admin/Title";
// import { dateFormat } from "../../lib/dateFormat";
// import { useAppContext } from "../../context/AppContext";
// import toast from "react-hot-toast";

// const ListBookings = () => {
//   const { axios, user } = useAppContext();
//   const currency = import.meta.env.VITE_CURRENCY;

//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [deletingId, setDeletingId] = useState(null);

//   const fetchBookings = async () => {
//     try {
//       setLoading(true);
//       const { data } = await axios.get("/api/admin/bookings");
      
//       if (data.success) {
//         setBookings(data.bookings);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to fetch bookings");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (bookingId) => {
//     if (!window.confirm("Are you sure you want to delete this booking?")) {
//       return;
//     }

//     try {
//       setDeletingId(bookingId);
//       const { data } = await axios.delete(`/api/admin/bookings/${bookingId}`);
      
//       if (data.success) {
//         toast.success(data.message);
//         setBookings(bookings.filter(booking => booking._id !== bookingId));
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to delete booking");
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   useEffect(() => {
//     if (user) {
//       fetchBookings();
//     }
//   }, [user]);

//   if (loading) return <Loading />;

//   return (
//     <>
//       <Title text1="All" text2="Bookings" />

//       {bookings.length > 0 ? (
//         <div className="mt-6 overflow-x-auto">
//           <table className="w-full border-collapse">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="p-3 text-left">User</th>
//                 <th className="p-3 text-left">Movie</th>
//                 <th className="p-3 text-left">Show Time</th>
//                 <th className="p-3 text-left">Seats</th>
//                 <th className="p-3 text-left">Amount</th>
//                 <th className="p-3 text-center">Status</th>
//                 <th className="p-3 text-center">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {bookings.map((booking) => (
//                 <tr key={booking._id} className="border-b hover:bg-gray-50">
//                   <td className="p-3">
//                     <div className="flex flex-col gap-1">
//                       <div className="flex items-center gap-2">
//                         <UserIcon className="w-4 h-4 text-gray-500" />
//                         <span className="font-medium">{booking.user?.name || "N/A"}</span>
//                       </div>
//                       <div className="flex items-center gap-2 text-sm text-gray-600">
//                         <MailIcon className="w-3 h-3" />
//                         <span>{booking.user?.email || "N/A"}</span>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="p-3">
//                     <div className="flex items-center gap-3">
//                       <img
//                         src={booking.show?.movie?.poster_path}
//                         alt={booking.show?.movie?.title}
//                         className="w-10 h-14 object-cover rounded"
//                       />
//                       <span className="font-medium">{booking.show?.movie?.title || "N/A"}</span>
//                     </div>
//                   </td>
//                   <td className="p-3">
//                     <span className="text-sm">{dateFormat(booking.show?.showDateTime)}</span>
//                   </td>
//                   <td className="p-3">
//                     <span className="font-medium">{booking.seats?.join(", ") || "N/A"}</span>
//                   </td>
//                   <td className="p-3">
//                     <span className="font-semibold text-green-600">
//                       {currency}{booking.amount}
//                     </span>
//                   </td>
//                   <td className="p-3 text-center">
//                     {booking.isPaid ? (
//                       <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
//                         <CheckCircleIcon className="w-4 h-4" />
//                         Paid
//                       </span>
//                     ) : (
//                       <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
//                         <XCircleIcon className="w-4 h-4" />
//                         Unpaid
//                       </span>
//                     )}
//                   </td>
//                   <td className="p-3 text-center">
//                     <button
//                       onClick={() => handleDelete(booking._id)}
//                       disabled={deletingId === booking._id}
//                       className="text-red-600 hover:text-red-800 disabled:opacity-50 transition-colors"
//                     >
//                       <TrashIcon className="w-5 h-5 inline" />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <div className="text-center py-20">
//           <p className="text-xl text-gray-600">No bookings found</p>
//         </div>
//       )}
//     </>
//   );
// };

// export default ListBookings;

// import React, { useEffect, useState } from "react";
// import Loading from "../../components/Loading";
// import Title from "../../components/admin/Title";
// import { dateFormat } from "../../lib/dateFormat";
// import { useAppContext } from "../../context/AppContext";

// const ListBookings = () => {
//   const currency = import.meta.env.VITE_CURRENCY;
//   const { axios, getToken, user } = useAppContext();

//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchBookings = async () => {
//     try {
//       const { data } = await axios.get("/api/admin/all-bookings", {
//         headers: { Authorization: `Bearer ${await getToken()}` },
//       });

//       if (data.success) {
//         setBookings(data.bookings);
//       }
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (user) fetchBookings();
//   }, [user]);

//   if (loading) return <Loading />;

//   return (
//     <>
//       <Title text1="List" text2="Bookings" />
//       <div className="max-w-4xl mt-6 overflow-x-auto">
//         <table className="w-full border-collapse text-nowrap">
//           <thead>
//             <tr className="bg-primary/20 text-left">
//               <th className="p-2">User</th>
//               <th className="p-2">Movie</th>
//               <th className="p-2">Show Time</th>
//               <th className="p-2">Seats</th>
//               <th className="p-2">Amount</th>
//             </tr>
//           </thead>
//           <tbody>
//             {bookings.map((b) => (
//               <tr key={b._id} className="border-b">
//                 <td className="p-2">{b.user?.name}</td>
//                 <td className="p-2">{b.show?.movie?.title}</td>
//                 <td className="p-2">{dateFormat(b.show?.showDateTime)}</td>
//                 <td className="p-2">{b.bookedSeats.join(", ")}</td>
//                 <td className="p-2">
//                   {currency} {b.amount}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// };

// export default ListBookings;

// import React, { useEffect, useState } from "react";
// import { TrashIcon, CheckCircleIcon, XCircleIcon, UserIcon, MailIcon, RefreshCwIcon } from "lucide-react";
// import Loading from "../../components/Loading";
// import Title from "../../components/admin/Title";
// import { dateFormat } from "../../lib/dateFormat";
// import { useAppContext } from "../../context/AppContext";
// import toast from "react-hot-toast";

// const ListBookings = () => {
//   const { axios, user } = useAppContext();
//   const currency = import.meta.env.VITE_CURRENCY;

//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [deletingId, setDeletingId] = useState(null);

//   const fetchBookings = async () => {
//     try {
//       setLoading(true);
//       const { data } = await axios.get("/api/admin/bookings");
      
//       if (data.success) {
//         setBookings(data.bookings);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error("Fetch bookings error:", error);
//       if (error.response?.status === 401 || error.response?.status === 403) {
//         toast.error("Unauthorized - Admin access required");
//       } else {
//         toast.error("Failed to fetch bookings");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (bookingId) => {
//     if (!window.confirm("Are you sure you want to delete this booking? This will release the seats.")) {
//       return;
//     }

//     try {
//       setDeletingId(bookingId);
//       const { data } = await axios.delete(`/api/admin/bookings/${bookingId}`);
      
//       if (data.success) {
//         toast.success(data.message);
//         setBookings(bookings.filter(booking => booking._id !== bookingId));
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error("Delete booking error:", error);
//       toast.error(error.response?.data?.message || "Failed to delete booking");
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   useEffect(() => {
//     if (user) {
//       fetchBookings();
//     }
//   }, [user]);

//   if (loading) return <Loading />;

//   return (
//     <>
//       <div className="flex items-center justify-between">
//         <Title text1="All" text2="Bookings" />
//         <button
//           onClick={fetchBookings}
//           className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
//         >
//           <RefreshCwIcon className="w-4 h-4" />
//           Refresh
//         </button>
//       </div>

//       {bookings.length > 0 ? (
//         <div className="mt-6 overflow-x-auto">
//           <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="p-3 text-left font-semibold">User</th>
//                 <th className="p-3 text-left font-semibold">Movie</th>
//                 <th className="p-3 text-left font-semibold">Show Time</th>
//                 <th className="p-3 text-left font-semibold">Seats</th>
//                 <th className="p-3 text-left font-semibold">Amount</th>
//                 <th className="p-3 text-center font-semibold">Status</th>
//                 <th className="p-3 text-center font-semibold">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {bookings.map((booking) => (
//                 <tr key={booking._id} className="border-b hover:bg-gray-50 transition-colors">
//                   <td className="p-3">
//                     <div className="flex flex-col gap-1">
//                       <div className="flex items-center gap-2">
//                         <UserIcon className="w-4 h-4 text-gray-500" />
//                         <span className="font-medium">{booking.user?.name || "N/A"}</span>
//                       </div>
//                       <div className="flex items-center gap-2 text-sm text-gray-600">
//                         <MailIcon className="w-3 h-3" />
//                         <span>{booking.user?.email || "N/A"}</span>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="p-3">
//                     <div className="flex items-center gap-3">
//                       <img
//                         src={booking.show?.movie?.poster_path}
//                         alt={booking.show?.movie?.title}
//                         className="w-10 h-14 object-cover rounded"
//                         onError={(e) => {
//                           e.target.src = "https://via.placeholder.com/100x150?text=No+Image";
//                         }}
//                       />
//                       <span className="font-medium" title={booking.show?.movie?.title}>
//                         {booking.show?.movie?.title || "N/A"}
//                       </span>
//                     </div>
//                   </td>
//                   <td className="p-3">
//                     <span className="text-sm">{dateFormat(booking.show?.showDateTime)}</span>
//                   </td>
//                   <td className="p-3">
//                     <span className="font-medium">{booking.bookedSeats?.join(", ") || "N/A"}</span>
//                   </td>
//                   <td className="p-3">
//                     <span className="font-semibold text-green-600">
//                       {currency}{booking.amount}
//                     </span>
//                   </td>
//                   <td className="p-3 text-center">
//                     {booking.isPaid ? (
//                       <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
//                         <CheckCircleIcon className="w-4 h-4" />
//                         Paid
//                       </span>
//                     ) : (
//                       <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
//                         <XCircleIcon className="w-4 h-4" />
//                         Unpaid
//                       </span>
//                     )}
//                   </td>
//                   <td className="p-3 text-center">
//                     <button
//                       onClick={() => handleDelete(booking._id)}
//                       disabled={deletingId === booking._id}
//                       className="text-red-600 hover:text-red-800 disabled:opacity-50 transition-colors p-2 rounded hover:bg-red-50"
//                       title="Delete booking"
//                     >
//                       {deletingId === booking._id ? (
//                         <RefreshCwIcon className="w-5 h-5 animate-spin" />
//                       ) : (
//                         <TrashIcon className="w-5 h-5" />
//                       )}
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <div className="text-center py-20 bg-white rounded-lg shadow mt-6">
//           <p className="text-xl text-gray-600">No bookings found</p>
//           <p className="text-gray-400 mt-2">Bookings will appear here</p>
//         </div>
//       )}
//     </>
//   );
// };

// export default ListBookings;

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

  // ✅ Always initialize as array
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/admin/bookings");
      
      if (data.success) {
        // ✅ Ensure bookings is always an array
        setBookings(Array.isArray(data.bookings) ? data.bookings : []);
      } else {
        toast.error(data.message);
        setBookings([]); // ✅ Set empty array on error
      }
    } catch (error) {
      console.error("Fetch bookings error:", error);
      setBookings([]); // ✅ Set empty array on error
      
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
    <>
      <div className="flex items-center justify-between">
        <Title text1="All" text2="Bookings" />
        <button
          onClick={fetchBookings}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          <RefreshCwIcon className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* ✅ Added safety check */}
      {Array.isArray(bookings) && bookings.length > 0 ? (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left font-semibold">User</th>
                <th className="p-3 text-left font-semibold">Movie</th>
                <th className="p-3 text-left font-semibold">Show Time</th>
                <th className="p-3 text-left font-semibold">Seats</th>
                <th className="p-3 text-left font-semibold">Amount</th>
                <th className="p-3 text-center font-semibold">Status</th>
                <th className="p-3 text-center font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="p-3">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <UserIcon className="w-4 h-4 text-gray-500" />
                        <span className="font-medium">{booking.user?.name || "N/A"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
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
                        className="w-10 h-14 object-cover rounded"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/100x150?text=No+Image";
                        }}
                      />
                      <span className="font-medium" title={booking.show?.movie?.title}>
                        {booking.show?.movie?.title || "N/A"}
                      </span>
                    </div>
                  </td>
                  <td className="p-3">
                    <span className="text-sm">
                      {booking.show?.showDateTime ? dateFormat(booking.show.showDateTime) : "N/A"}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="font-medium">
                      {Array.isArray(booking.bookedSeats) && booking.bookedSeats.length > 0
                        ? booking.bookedSeats.join(", ")
                        : "N/A"}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="font-semibold text-green-600">
                      {currency}{booking.amount || 0}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    {booking.isPaid ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                        <CheckCircleIcon className="w-4 h-4" />
                        Paid
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                        <XCircleIcon className="w-4 h-4" />
                        Unpaid
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleDelete(booking._id)}
                      disabled={deletingId === booking._id}
                      className="text-red-600 hover:text-red-800 disabled:opacity-50 transition-colors p-2 rounded hover:bg-red-50"
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
        <div className="text-center py-20 bg-white rounded-lg shadow mt-6">
          <p className="text-xl text-gray-600">No bookings found</p>
          <p className="text-gray-400 mt-2">Bookings will appear here</p>
        </div>
      )}
    </>
  );
};

export default ListBookings;