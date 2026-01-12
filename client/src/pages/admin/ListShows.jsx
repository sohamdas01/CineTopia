// import React, { useEffect, useState } from 'react'
// import { dummyShowsData } from '../../assets/assets';
// import Loading from '../../components/Loading';
// import Title from '../../components/admin/Title';
// import { dateFormat } from '../../lib/dateFormat';
// import { useAppContext } from '../../context/AppContext';

// const ListShows = () => {

//     const currency = import.meta.env.VITE_CURRENCY

//     const {axios, getToken, user} = useAppContext()

//     const [shows, setShows] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const getAllShows = async () =>{
//         try {
//             const { data } = await axios.get("/api/admin/all-shows", {
//                 headers: { Authorization: `Bearer ${await getToken()}` }
//             });
//             setShows(data.shows)
//             setLoading(false);
//         } catch (error) {
//             console.error(error);
//         }
//     }

//     useEffect(() => {
//         if(user){
//             getAllShows();
//         }   
//     }, [user]);

//   return !loading ? (
//     <>
//       <Title text1="List" text2="Shows" />
//       <div className="max-w-4xl mt-6 overflow-x-auto">
//          <table className="w-full border-collapse rounded-md overflow-hidden text-nowrap">
//              <thead>
//                 <tr className="bg-primary/20 text-left text-white">
//                     <th className="p-2 font-medium pl-5">Movie Name</th>
//                     <th className="p-2 font-medium">Show Time</th>
//                     <th className="p-2 font-medium">Total Bookings</th>
//                     <th className="p-2 font-medium">Earnings</th>
//                 </tr>
//             </thead>
//             <tbody className="text-sm font-light">
//                 {shows.map((show, index) => (
//                     <tr key={index} className="border-b border-primary/10 bg-primary/5 even:bg-primary/10">
//                         <td className="p-2 min-w-45 pl-5">{show.movie.title}</td>
//                         <td className="p-2">{dateFormat(show.showDateTime)}</td>
//                         <td className="p-2">{Object.keys(show.occupiedSeats).length}</td>
//                         <td className="p-2">{currency} {Object.keys(show.occupiedSeats).length * show.showPrice}</td>
//                     </tr>
//                 ))}
//             </tbody>
//          </table>
//       </div>
//     </>
//   ) : <Loading />
// }

// export default ListShows

// import React, { useEffect, useState } from "react";
// import Loading from "../../components/Loading";
// import Title from "../../components/admin/Title";
// import { dateFormat } from "../../lib/dateFormat";
// import { useAppContext } from "../../context/AppContext";

// const ListShows = () => {
//   const currency = import.meta.env.VITE_CURRENCY;
//   const { axios, user } = useAppContext();

//   const [shows, setShows] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const getAllShows = async () => {
//     try {
//       const { data } = await axios.get("/api/admin/all-shows");
//       setShows(data.shows);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (user) getAllShows();
//   }, [user]);

//   if (loading) return <Loading />;

//   return (
//     <>
//       <Title text1="List" text2="Shows" />

//       <table className="w-full mt-6">
//         <thead>
//           <tr>
//             <th>Movie</th>
//             <th>Show Time</th>
//             <th>Bookings</th>
//             <th>Earnings</th>
//           </tr>
//         </thead>
//         <tbody>
//           {shows.map((s, i) => (
//             <tr key={i}>
//               <td>{s.movie.title}</td>
//               <td>{dateFormat(s.showDateTime)}</td>
//               <td>{Object.keys(s.occupiedSeats).length}</td>
//               <td>
//                 {currency}{" "}
//                 {Object.keys(s.occupiedSeats).length * s.showPrice}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </>
//   );
// };

// export default ListShows;

// import React, { useEffect, useState } from "react";
// import { TrashIcon, CalendarIcon, DollarSignIcon, StarIcon } from "lucide-react";
// import Loading from "../../components/Loading";
// import Title from "../../components/admin/Title";
// import { dateFormat } from "../../lib/dateFormat";
// import { useAppContext } from "../../context/AppContext";
// import toast from "react-hot-toast";

// const ListShows = () => {
//   const { axios, user } = useAppContext();
//   const currency = import.meta.env.VITE_CURRENCY;

//   const [shows, setShows] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [deletingId, setDeletingId] = useState(null);

//   const fetchShows = async () => {
//     try {
//       setLoading(true);
//       const { data } = await axios.get("/api/admin/shows");
      
//       if (data.success) {
//         setShows(data.shows);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to fetch shows");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (showId) => {
//     if (!window.confirm("Are you sure you want to delete this show?")) {
//       return;
//     }

//     try {
//       setDeletingId(showId);
//       const { data } = await axios.delete(`/api/admin/shows/${showId}`);
      
//       if (data.success) {
//         toast.success(data.message);
//         setShows(shows.filter(show => show._id !== showId));
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to delete show");
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   useEffect(() => {
//     if (user) {
//       fetchShows();
//     }
//   }, [user]);

//   if (loading) return <Loading />;

//   return (
//     <>
//       <Title text1="All" text2="Shows" />

//       {shows.length > 0 ? (
//         <div className="mt-6 overflow-x-auto">
//           <table className="w-full border-collapse">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="p-3 text-left">Movie</th>
//                 <th className="p-3 text-left">Date & Time</th>
//                 <th className="p-3 text-left">Price</th>
//                 <th className="p-3 text-left">Rating</th>
//                 <th className="p-3 text-center">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {shows.map((show) => (
//                 <tr key={show._id} className="border-b hover:bg-gray-50">
//                   <td className="p-3">
//                     <div className="flex items-center gap-3">
//                       <img
//                         src={show.movie.poster_path}
//                         alt={show.movie.title}
//                         className="w-12 h-16 object-cover rounded"
//                       />
//                       <span className="font-medium">{show.movie.title}</span>
//                     </div>
//                   </td>
//                   <td className="p-3">
//                     <div className="flex items-center gap-2">
//                       <CalendarIcon className="w-4 h-4 text-gray-500" />
//                       <span className="text-sm">{dateFormat(show.showDateTime)}</span>
//                     </div>
//                   </td>
//                   <td className="p-3">
//                     <div className="flex items-center gap-1">
//                       <DollarSignIcon className="w-4 h-4 text-green-600" />
//                       <span className="font-semibold">{currency}{show.showPrice}</span>
//                     </div>
//                   </td>
//                   <td className="p-3">
//                     <div className="flex items-center gap-1">
//                       <StarIcon className="w-4 h-4 text-yellow-500 fill-yellow-500" />
//                       <span>{show.movie.vote_average?.toFixed(1) ?? "N/A"}</span>
//                     </div>
//                   </td>
//                   <td className="p-3 text-center">
//                     <button
//                       onClick={() => handleDelete(show._id)}
//                       disabled={deletingId === show._id}
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
//           <p className="text-xl text-gray-600">No shows found</p>
//         </div>
//       )}
//     </>
//   );
// };

// export default ListShows;

// import React, { useEffect, useState } from "react";
// import Loading from "../../components/Loading";
// import Title from "../../components/admin/Title";
// import { dateFormat } from "../../lib/dateFormat";
// import { useAppContext } from "../../context/AppContext";

// const ListShows = () => {
//   const currency = import.meta.env.VITE_CURRENCY;
//   const { axios, getToken, user } = useAppContext();

//   const [shows, setShows] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchShows = async () => {
//     try {
//       const { data } = await axios.get("/api/admin/all-shows", {
//         headers: { Authorization: `Bearer ${await getToken()}` },
//       });

//       if (data.success) {
//         setShows(data.shows);
//       }
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (user) fetchShows();
//   }, [user]);

//   if (loading) return <Loading />;

//   return (
//     <>
//       <Title text1="List" text2="Shows" />
//       <div className="max-w-4xl mt-6 overflow-x-auto">
//         <table className="w-full border-collapse">
//           <thead>
//             <tr className="bg-primary/20 text-left">
//               <th className="p-2">Movie</th>
//               <th className="p-2">Show Time</th>
//               <th className="p-2">Seats Booked</th>
//               <th className="p-2">Revenue</th>
//             </tr>
//           </thead>
//           <tbody>
//             {shows.map((s) => (
//               <tr key={s._id} className="border-b">
//                 <td className="p-2">{s.movie.title}</td>
//                 <td className="p-2">{dateFormat(s.showDateTime)}</td>
//                 <td className="p-2">
//                   {Object.keys(s.occupiedSeats).length}
//                 </td>
//                 <td className="p-2">
//                   {currency}{" "}
//                   {Object.keys(s.occupiedSeats).length * s.showPrice}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// };

// export default ListShows;

// import React, { useEffect, useState } from "react";
// import { TrashIcon, CalendarIcon, DollarSignIcon, StarIcon, RefreshCwIcon } from "lucide-react";
// import Loading from "../../components/Loading";
// import Title from "../../components/admin/Title";
// import { dateFormat } from "../../lib/dateFormat";
// import { useAppContext } from "../../context/AppContext";
// import toast from "react-hot-toast";

// const ListShows = () => {
//   const { axios, user } = useAppContext();
//   const currency = import.meta.env.VITE_CURRENCY;

//   const [shows, setShows] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [deletingId, setDeletingId] = useState(null);

//   const fetchShows = async () => {
//     try {
//       setLoading(true);
//       const { data } = await axios.get("/api/admin/shows");
      
//       if (data.success) {
//         setShows(data.shows);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error("Fetch shows error:", error);
//       if (error.response?.status === 401 || error.response?.status === 403) {
//         toast.error("Unauthorized - Admin access required");
//       } else {
//         toast.error("Failed to fetch shows");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (showId) => {
//     if (!window.confirm("Are you sure you want to delete this show?")) {
//       return;
//     }

//     try {
//       setDeletingId(showId);
//       const { data } = await axios.delete(`/api/admin/shows/${showId}`);
      
//       if (data.success) {
//         toast.success(data.message);
//         setShows(shows.filter(show => show._id !== showId));
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error("Delete show error:", error);
//       toast.error(error.response?.data?.message || "Failed to delete show");
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   useEffect(() => {
//     if (user) {
//       fetchShows();
//     }
//   }, [user]);

//   if (loading) return <Loading />;

//   return (
//     <>
//       <div className="flex items-center justify-between">
//         <Title text1="All" text2="Shows" />
//         <button
//           onClick={fetchShows}
//           className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
//         >
//           <RefreshCwIcon className="w-4 h-4" />
//           Refresh
//         </button>
//       </div>

//       {shows.length > 0 ? (
//         <div className="mt-6 overflow-x-auto">
//           <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="p-3 text-left font-semibold">Movie</th>
//                 <th className="p-3 text-left font-semibold">Date & Time</th>
//                 <th className="p-3 text-left font-semibold">Price</th>
//                 <th className="p-3 text-left font-semibold">Rating</th>
//                 <th className="p-3 text-center font-semibold">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {shows.map((show) => (
//                 <tr key={show._id} className="border-b hover:bg-gray-50 transition-colors">
//                   <td className="p-3">
//                     <div className="flex items-center gap-3">
//                       <img
//                         src={show.movie.poster_path}
//                         alt={show.movie.title}
//                         className="w-12 h-16 object-cover rounded"
//                         onError={(e) => {
//                           e.target.src = "https://via.placeholder.com/100x150?text=No+Image";
//                         }}
//                       />
//                       <span className="font-medium" title={show.movie.title}>
//                         {show.movie.title}
//                       </span>
//                     </div>
//                   </td>
//                   <td className="p-3">
//                     <div className="flex items-center gap-2">
//                       <CalendarIcon className="w-4 h-4 text-gray-500" />
//                       <span className="text-sm">{dateFormat(show.showDateTime)}</span>
//                     </div>
//                   </td>
//                   <td className="p-3">
//                     <div className="flex items-center gap-1">
//                       <DollarSignIcon className="w-4 h-4 text-green-600" />
//                       <span className="font-semibold">{currency}{show.showPrice}</span>
//                     </div>
//                   </td>
//                   <td className="p-3">
//                     <div className="flex items-center gap-1">
//                       <StarIcon className="w-4 h-4 text-yellow-500 fill-yellow-500" />
//                       <span>{show.movie.vote_average?.toFixed(1) ?? "N/A"}</span>
//                     </div>
//                   </td>
//                   <td className="p-3 text-center">
//                     <button
//                       onClick={() => handleDelete(show._id)}
//                       disabled={deletingId === show._id}
//                       className="text-red-600 hover:text-red-800 disabled:opacity-50 transition-colors p-2 rounded hover:bg-red-50"
//                       title="Delete show"
//                     >
//                       {deletingId === show._id ? (
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
//           <p className="text-xl text-gray-600">No shows found</p>
//           <p className="text-gray-400 mt-2">Add shows to see them here</p>
//         </div>
//       )}
//     </>
//   );
// };

// export default ListShows;

// import React, { useEffect, useState } from "react";
// import { TrashIcon, CalendarIcon, DollarSignIcon, StarIcon, RefreshCwIcon } from "lucide-react";
// import Loading from "../../components/Loading";
// import Title from "../../components/admin/Title";
// import { dateFormat } from "../../lib/dateFormat";
// import { useAppContext } from "../../context/AppContext";
// import toast from "react-hot-toast";

// const ListShows = () => {
//   const { axios, user } = useAppContext();
//   const currency = import.meta.env.VITE_CURRENCY;

//   const [shows, setShows] = useState([]); // ✅ Always initialize as array
//   const [loading, setLoading] = useState(true);
//   const [deletingId, setDeletingId] = useState(null);

//   const fetchShows = async () => {
//     try {
//       setLoading(true);
//       const { data } = await axios.get("/api/admin/shows");
      
//       if (data.success) {
//         // ✅ Ensure shows is always an array
//         setShows(Array.isArray(data.shows) ? data.shows : []);
//       } else {
//         toast.error(data.message);
//         setShows([]); // ✅ Set empty array on error
//       }
//     } catch (error) {
//       console.error("Fetch shows error:", error);
//       setShows([]); // ✅ Set empty array on error
      
//       if (error.response?.status === 401 || error.response?.status === 403) {
//         toast.error("Unauthorized - Admin access required");
//       } else {
//         toast.error("Failed to fetch shows");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (showId) => {
//     if (!window.confirm("Are you sure you want to delete this show?")) {
//       return;
//     }

//     try {
//       setDeletingId(showId);
//       const { data } = await axios.delete(`/api/admin/shows/${showId}`);
      
//       if (data.success) {
//         toast.success(data.message);
//         setShows(shows.filter(show => show._id !== showId));
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error("Delete show error:", error);
//       toast.error(error.response?.data?.message || "Failed to delete show");
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   useEffect(() => {
//     if (user) {
//       fetchShows();
//     }
//   }, [user]);

//   if (loading) return <Loading />;

//   return (
//     <>
//       <div className="flex items-center justify-between">
//         <Title text1="All" text2="Shows" />
//         <button
//           onClick={fetchShows}
//           className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
//         >
//           <RefreshCwIcon className="w-4 h-4" />
//           Refresh
//         </button>
//       </div>

//       {/* ✅ Added safety check */}
//       {Array.isArray(shows) && shows.length > 0 ? (
//         <div className="mt-6 overflow-x-auto">
//           <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="p-3 text-left font-semibold">Movie</th>
//                 <th className="p-3 text-left font-semibold">Date & Time</th>
//                 <th className="p-3 text-left font-semibold">Price</th>
//                 <th className="p-3 text-left font-semibold">Rating</th>
//                 <th className="p-3 text-center font-semibold">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {shows.map((show) => (
//                 <tr key={show._id} className="border-b hover:bg-gray-50 transition-colors">
//                   <td className="p-3">
//                     <div className="flex items-center gap-3">
//                       <img
//                         src={show.movie?.poster_path || "https://via.placeholder.com/100x150?text=No+Image"}
//                         alt={show.movie?.title || "Movie"}
//                         className="w-12 h-16 object-cover rounded"
//                         onError={(e) => {
//                           e.target.src = "https://via.placeholder.com/100x150?text=No+Image";
//                         }}
//                       />
//                       <span className="font-medium" title={show.movie?.title}>
//                         {show.movie?.title || "Unknown Movie"}
//                       </span>
//                     </div>
//                   </td>
//                   <td className="p-3">
//                     <div className="flex items-center gap-2">
//                       <CalendarIcon className="w-4 h-4 text-gray-500" />
//                       <span className="text-sm">{dateFormat(show.showDateTime)}</span>
//                     </div>
//                   </td>
//                   <td className="p-3">
//                     <div className="flex items-center gap-1">
//                       <DollarSignIcon className="w-4 h-4 text-green-600" />
//                       <span className="font-semibold">{currency}{show.showPrice}</span>
//                     </div>
//                   </td>
//                   <td className="p-3">
//                     <div className="flex items-center gap-1">
//                       <StarIcon className="w-4 h-4 text-yellow-500 fill-yellow-500" />
//                       <span>{show.movie?.vote_average?.toFixed(1) ?? "N/A"}</span>
//                     </div>
//                   </td>
//                   <td className="p-3 text-center">
//                     <button
//                       onClick={() => handleDelete(show._id)}
//                       disabled={deletingId === show._id}
//                       className="text-red-600 hover:text-red-800 disabled:opacity-50 transition-colors p-2 rounded hover:bg-red-50"
//                       title="Delete show"
//                     >
//                       {deletingId === show._id ? (
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
//           <p className="text-xl text-gray-600">No shows found</p>
//           <p className="text-gray-400 mt-2">Add shows to see them here</p>
//         </div>
//       )}
//     </>
//   );
// };

// export default ListShows;

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
    <>
      <div className="flex items-center justify-between">
        <Title text1="All" text2="Shows" />
        <button
          onClick={fetchShows}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
        >
          <RefreshCwIcon className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {Array.isArray(shows) && shows.length > 0 ? (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left font-semibold">Movie</th>
                <th className="p-3 text-left font-semibold">Date & Time</th>
                <th className="p-3 text-left font-semibold">Price</th>
                <th className="p-3 text-left font-semibold">Rating</th>
                <th className="p-3 text-center font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {shows.map((show) => (
                <tr key={show._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={show.movie?.poster_path || "https://via.placeholder.com/100x150"}
                        alt={show.movie?.title}
                        className="w-12 h-16 object-cover rounded"
                      />
                      <span className="font-medium">{show.movie?.title || "Unknown"}</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{dateFormat(show.showDateTime)}</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-1">
                      <DollarSignIcon className="w-4 h-4 text-green-600" />
                      <span className="font-semibold">{currency}{show.showPrice}</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-1">
                      <StarIcon className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span>{show.movie?.vote_average?.toFixed(1) ?? "N/A"}</span>
                    </div>
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleDelete(show._id)}
                      disabled={deletingId === show._id}
                      className="text-red-600 hover:text-red-800 disabled:opacity-50 p-2 rounded hover:bg-red-50"
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
        <div className="text-center py-20 bg-white rounded-lg shadow mt-6">
          <p className="text-xl text-gray-600">No shows found</p>
        </div>
      )}
    </>
  );
};

export default ListShows;