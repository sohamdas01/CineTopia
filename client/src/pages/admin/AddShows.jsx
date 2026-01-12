// import React, { useEffect, useState } from 'react'
// import { dummyShowsData } from '../../assets/assets';
// import Loading from '../../components/Loading';
// import Title from '../../components/admin/Title';
// import { CheckIcon, DeleteIcon, StarIcon } from 'lucide-react';
// import { kConverter } from '../../lib/kConverter';
// import { useAppContext } from '../../context/AppContext';
// import toast from 'react-hot-toast';

// const AddShows = () => {

//     const {axios, getToken, user, image_base_url} = useAppContext()

//     const currency = import.meta.env.VITE_CURRENCY
//     const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
//     const [selectedMovie, setSelectedMovie] = useState(null);
//     const [dateTimeSelection, setDateTimeSelection] = useState({});
//     const [dateTimeInput, setDateTimeInput] = useState("");
//     const [showPrice, setShowPrice] = useState("");
//     const [addingShow, setAddingShow] = useState(false)


//      const fetchNowPlayingMovies = async () => {
//         try {
//             const { data } = await axios.get('/api/show/now-playing', {
//                 headers: { Authorization: `Bearer ${await getToken()}` }})
//                 if(data.success){
//                     setNowPlayingMovies(data.movies)
//                 }
//         } catch (error) {
//             console.error('Error fetching movies:', error)
//         }
//     };

//     const handleDateTimeAdd = () => {
//         if (!dateTimeInput) return;
//         const [date, time] = dateTimeInput.split("T");
//         if (!date || !time) return;

//         setDateTimeSelection((prev) => {
//             const times = prev[date] || [];
//             if (!times.includes(time)) {
//                 return { ...prev, [date]: [...times, time] };
//             }
//             return prev;
//         });
//     };

//     const handleRemoveTime = (date, time) => {
//         setDateTimeSelection((prev) => {
//             const filteredTimes = prev[date].filter((t) => t !== time);
//             if (filteredTimes.length === 0) {
//                 const { [date]: _, ...rest } = prev;
//                 return rest;
//             }
//             return {
//                 ...prev,
//                 [date]: filteredTimes,
//             };
//         });
//     };

//     const handleSubmit = async ()=>{
//         try {
//             setAddingShow(true)

//             if(!selectedMovie || Object.keys(dateTimeSelection).length === 0 || !showPrice){
//                 return toast('Missing required fields');
//             }

//             const showsInput = Object.entries(dateTimeSelection).map(([date, time])=> ({date, time}));

//             const payload = {
//                 movieId: selectedMovie,
//                 showsInput,
//                 showPrice: Number(showPrice)
//             }

//             const { data } = await axios.post('/api/show/add', payload, {headers: { Authorization: `Bearer ${await getToken()}` }})

//             if(data.success){
//                 toast.success(data.message)
//                 setSelectedMovie(null)
//                 setDateTimeSelection({})
//                 setShowPrice("")
//             }else{
//                 toast.error(data.message)
//             }
//         } catch (error) {
//             console.error("Submission error:", error);
//             toast.error('An error occurred. Please try again.')
//         }
//         setAddingShow(false)
//     }

//     useEffect(() => {
//         if(user){
//             fetchNowPlayingMovies();
//         }
//     }, [user]);

//   return nowPlayingMovies.length > 0 ? (
//     <>
//       <Title text1="Add" text2="Shows" />
//       <p className="mt-10 text-lg font-medium">Now Playing Movies</p>
//       <div className="overflow-x-auto pb-4">
//         <div className="group flex flex-wrap gap-4 mt-4 w-max">
//             {nowPlayingMovies.map((movie) =>(
//                 <div key={movie.id} className={`relative max-w-40 cursor-pointer group-hover:not-hover:opacity-40 hover:-translate-y-1 transition duration-300 `} onClick={()=> setSelectedMovie(movie.id)}>
//                     <div className="relative rounded-lg overflow-hidden">
//                         <img src={image_base_url + movie.poster_path} alt="" className="w-full object-cover brightness-90" />
//                         <div className="text-sm flex items-center justify-between p-2 bg-black/70 w-full absolute bottom-0 left-0">
//                                     <p className="flex items-center gap-1 text-gray-400">
//                                         <StarIcon className="w-4 h-4 text-primary fill-primary" />
//                                         {movie.vote_average.toFixed(1)}
//                                     </p>
//                                     <p className="text-gray-300">{kConverter(movie.vote_count)} Votes</p>
//                                 </div>
//                     </div>
//                     {selectedMovie === movie.id && (
//                         <div className="absolute top-2 right-2 flex items-center justify-center bg-primary h-6 w-6 rounded">
//                             <CheckIcon className="w-4 h-4 text-white" strokeWidth={2.5} />
//                         </div>
//                     )}
//                     <p className="font-medium truncate">{movie.title}</p>
//                     <p className="text-gray-400 text-sm">{movie.release_date}</p>
//                 </div>
//             ))}
//         </div>
//       </div>

//        {/* Show Price Input */}
//        <div className="mt-8">
//             <label className="block text-sm font-medium mb-2">Show Price</label>
//             <div className="inline-flex items-center gap-2 border border-gray-600 px-3 py-2 rounded-md">
//                 <p className="text-gray-400 text-sm">{currency}</p>
//                 <input min={0} type="number" value={showPrice} onChange={(e) => setShowPrice(e.target.value)} placeholder="Enter show price" className="outline-none" />
//             </div>
//         </div>

//         {/* Date & Time Selection */}
//         <div className="mt-6">
//             <label className="block text-sm font-medium mb-2">Select Date and Time</label>
//             <div className="inline-flex gap-5 border border-gray-600 p-1 pl-3 rounded-lg">
//                 <input type="datetime-local" value={dateTimeInput} onChange={(e) => setDateTimeInput(e.target.value)} className="outline-none rounded-md" />
//                 <button onClick={handleDateTimeAdd} className="bg-primary/80 text-white px-3 py-2 text-sm rounded-lg hover:bg-primary cursor-pointer" >
//                     Add Time
//                 </button>
//             </div>
//         </div>

//        {/* Display Selected Times */}
//         {Object.keys(dateTimeSelection).length > 0 && (
//         <div className="mt-6">
//             <h2 className=" mb-2">Selected Date-Time</h2>
//             <ul className="space-y-3">
//                 {Object.entries(dateTimeSelection).map(([date, times]) => (
//                     <li key={date}>
//                         <div className="font-medium">{date}</div>
//                         <div className="flex flex-wrap gap-2 mt-1 text-sm">
//                             {times.map((time) => (
//                                 <div key={time} className="border border-primary px-2 py-1 flex items-center rounded" >
//                                     <span>{time}</span>
//                                     <DeleteIcon onClick={() => handleRemoveTime(date, time)} width={15} className="ml-2 text-red-500 hover:text-red-700 cursor-pointer" />
//                                 </div>
//                             ))}
//                         </div>
//                     </li>
//                 ))}
//             </ul>
//             </div>
//        )}
//        <button onClick={handleSubmit} disabled={addingShow} className="bg-primary text-white px-8 py-2 mt-6 rounded hover:bg-primary/90 transition-all cursor-pointer" >
//             Add Show
//         </button>
//     </>
//   ) : <Loading />
// }

// export default AddShows


// import React, { useEffect, useState } from "react";
// import Loading from "../../components/Loading";
// import Title from "../../components/admin/Title";
// import { CheckIcon, DeleteIcon, StarIcon } from "lucide-react";
// import { useAppContext } from "../../context/AppContext";
// import toast from "react-hot-toast";

// const AddShows = () => {
//   const { axios, getToken, user } = useAppContext();
//   const currency = import.meta.env.VITE_CURRENCY;

//   const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
//   const [selectedMovie, setSelectedMovie] = useState(null);
//   const [dateTimeSelection, setDateTimeSelection] = useState({});
//   const [dateTimeInput, setDateTimeInput] = useState("");
//   const [showPrice, setShowPrice] = useState("");
//   const [addingShow, setAddingShow] = useState(false);

//   const fetchNowPlayingMovies = async () => {
//     try {
//       const { data } = await axios.get("/api/show/now-playing", {
//         headers: { Authorization: `Bearer ${await getToken()}` },
//       });

//       if (data.success) setNowPlayingMovies(data.movies);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     if (user) fetchNowPlayingMovies();
//   }, [user]);

//   const handleDateTimeAdd = () => {
//     if (!dateTimeInput) return;
//     const [date, time] = dateTimeInput.split("T");

//     setDateTimeSelection((prev) => ({
//       ...prev,
//       [date]: [...(prev[date] || []), time],
//     }));
//   };

//   const handleRemoveTime = (date, time) => {
//     setDateTimeSelection((prev) => {
//       const updated = prev[date].filter((t) => t !== time);
//       if (!updated.length) {
//         const { [date]: _, ...rest } = prev;
//         return rest;
//       }
//       return { ...prev, [date]: updated };
//     });
//   };

//   const handleSubmit = async () => {
//     if (!selectedMovie || !showPrice || !Object.keys(dateTimeSelection).length) {
//       return toast.error("Missing required fields");
//     }

//     try {
//       setAddingShow(true);

//       const showsInput = Object.entries(dateTimeSelection).map(([date, time]) => ({
//         date,
//         time,
//       }));

//       const payload = {
//         movieId: selectedMovie,
//         showsInput,
//         showPrice: Number(showPrice),
//       };

//       const { data } = await axios.post("/api/show/add", payload, {
//         headers: { Authorization: `Bearer ${await getToken()}` },
//       });

//       if (data.success) {
//         toast.success(data.message);
//         setSelectedMovie(null);
//         setDateTimeSelection({});
//         setShowPrice("");
//       } else {
//         toast.error(data.message);
//       }
//     } catch {
//       toast.error("Failed to add show");
//     } finally {
//       setAddingShow(false);
//     }
//   };

//   if (!nowPlayingMovies.length) return <Loading />;

//   return (
//     <>
//       <Title text1="Add" text2="Shows" />

//       <div className="flex flex-wrap gap-4 mt-6">
//         {nowPlayingMovies.map((movie) => (
//           <div
//             key={movie._id}
//             onClick={() => setSelectedMovie(movie._id)}
//             className="w-40 cursor-pointer"
//           >
//             <img src={movie.poster_path} alt="" className="rounded-md h-56 w-full object-cover" />
//             <p className="font-medium truncate mt-1">{movie.title}</p>
//             <p className="flex items-center gap-1 text-sm text-gray-400">
//               <StarIcon className="w-4 h-4 text-primary fill-primary" />
//               {movie.vote_average?.toFixed(1) ?? "N/A"}
//             </p>

//             {selectedMovie === movie._id && (
//               <div className="absolute top-2 right-2 bg-primary h-6 w-6 rounded flex items-center justify-center">
//                 <CheckIcon className="w-4 h-4 text-white" />
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       <div className="mt-6">
//         <input type="number" placeholder="Show Price" value={showPrice} onChange={(e) => setShowPrice(e.target.value)} />
//       </div>

//       <div className="mt-4">
//         <input type="datetime-local" value={dateTimeInput} onChange={(e) => setDateTimeInput(e.target.value)} />
//         <button onClick={handleDateTimeAdd}>Add Time</button>
//       </div>

//       <ul className="mt-4">
//         {Object.entries(dateTimeSelection).map(([date, times]) => (
//           <li key={date}>
//             {date}
//             {times.map((time) => (
//               <span key={time} onClick={() => handleRemoveTime(date, time)}>
//                 {time} <DeleteIcon size={14} />
//               </span>
//             ))}
//           </li>
//         ))}
//       </ul>

//       <button onClick={handleSubmit} disabled={addingShow} className="mt-6">
//         Add Show
//       </button>
//     </>
//   );
// };

// export default AddShows;

// import React, { useEffect, useState } from "react";
// import Loading from "../../components/Loading";
// import Title from "../../components/admin/Title";
// import { CheckIcon, XIcon, StarIcon, CalendarIcon, ClockIcon } from "lucide-react";
// import { useAppContext } from "../../context/AppContext";
// import toast from "react-hot-toast";

// const AddShows = () => {
//   const { axios, user } = useAppContext();
//   const currency = import.meta.env.VITE_CURRENCY;

//   const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
//   const [selectedMovie, setSelectedMovie] = useState(null);
//   const [dateTimeSelection, setDateTimeSelection] = useState({});
//   const [dateTimeInput, setDateTimeInput] = useState("");
//   const [showPrice, setShowPrice] = useState("");
//   const [addingShow, setAddingShow] = useState(false);
//   const [loading, setLoading] = useState(true);

//   const fetchNowPlayingMovies = async () => {
//     try {
//       setLoading(true);
//       const { data } = await axios.get("/api/show/now-playing");
//       if (data.success) {
//         setNowPlayingMovies(data.movies);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to fetch movies");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (user) fetchNowPlayingMovies();
//   }, [user]);

//   const handleDateTimeAdd = () => {
//     if (!dateTimeInput) {
//       toast.error("Please select date and time");
//       return;
//     }

//     const selectedDateTime = new Date(dateTimeInput);
//     const now = new Date();

//     if (selectedDateTime < now) {
//       toast.error("Cannot add shows in the past");
//       return;
//     }

//     const [date, time] = dateTimeInput.split("T");

//     // Check if time already exists for this date
//     if (dateTimeSelection[date]?.includes(time)) {
//       toast.error("This time slot already exists");
//       return;
//     }

//     setDateTimeSelection((prev) => ({
//       ...prev,
//       [date]: [...(prev[date] || []), time],
//     }));

//     setDateTimeInput("");
//     toast.success("Time slot added");
//   };

//   const handleRemoveTime = (date, time) => {
//     setDateTimeSelection((prev) => {
//       const updated = prev[date].filter((t) => t !== time);
//       if (!updated.length) {
//         const { [date]: _, ...rest } = prev;
//         return rest;
//       }
//       return { ...prev, [date]: updated };
//     });
//     toast.success("Time slot removed");
//   };

//   const handleSubmit = async () => {
//     if (!selectedMovie) {
//       toast.error("Please select a movie");
//       return;
//     }

//     if (!showPrice || Number(showPrice) <= 0) {
//       toast.error("Please enter valid show price");
//       return;
//     }

//     if (!Object.keys(dateTimeSelection).length) {
//       toast.error("Please add at least one show time");
//       return;
//     }

//     try {
//       setAddingShow(true);

//       const showsInput = Object.entries(dateTimeSelection).map(
//         ([date, times]) => ({ date, time: times })
//       );

//       const payload = {
//         movieId: selectedMovie,
//         showsInput,
//         showPrice: Number(showPrice),
//       };

//       const { data } = await axios.post("/api/show/add", payload);

//       if (data.success) {
//         toast.success(data.message);
//         setSelectedMovie(null);
//         setDateTimeSelection({});
//         setShowPrice("");
//         fetchNowPlayingMovies(); // Refresh the list
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to add show");
//     } finally {
//       setAddingShow(false);
//     }
//   };

//   if (loading) return <Loading />;

//   if (!nowPlayingMovies.length) {
//     return (
//       <div className="text-center py-20">
//         <p className="text-xl text-gray-600">No movies available</p>
//         <button
//           onClick={fetchNowPlayingMovies}
//           className="mt-4 px-6 py-2 bg-primary text-white rounded hover:bg-primary/90"
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Title text1="Add" text2="Shows" />

//       {/* Movie Selection */}
//       <div className="mt-6">
//         <h3 className="text-lg font-semibold mb-4">Select Movie</h3>
//         <div className="flex flex-wrap gap-4">
//           {nowPlayingMovies.map((movie) => (
//             <div
//               key={movie._id}
//               onClick={() => setSelectedMovie(movie._id)}
//               className={`w-40 cursor-pointer relative transition-transform hover:scale-105 ${
//                 selectedMovie === movie._id ? "ring-2 ring-primary rounded-md" : ""
//               }`}
//             >
//               <img
//                 src={movie.poster_path}
//                 alt={movie.title}
//                 className="rounded-md h-56 w-full object-cover"
//               />
//               <p className="font-medium truncate mt-2 text-sm">{movie.title}</p>
//               <p className="flex items-center gap-1 text-sm text-gray-500">
//                 <StarIcon className="w-4 h-4 text-yellow-500 fill-yellow-500" />
//                 {movie.vote_average?.toFixed(1) ?? "N/A"}
//               </p>

//               {selectedMovie === movie._id && (
//                 <div className="absolute top-2 right-2 bg-primary h-8 w-8 rounded-full flex items-center justify-center shadow-lg">
//                   <CheckIcon className="w-5 h-5 text-white" />
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Show Price */}
//       <div className="mt-8">
//         <h3 className="text-lg font-semibold mb-4">Set Show Price</h3>
//         <div className="flex items-center gap-2">
//           <span className="text-lg font-medium">{currency}</span>
//           <input
//             type="number"
//             placeholder="Enter price"
//             value={showPrice}
//             onChange={(e) => setShowPrice(e.target.value)}
//             className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary w-40"
//             min="0"
//             step="10"
//           />
//         </div>
//       </div>

//       {/* Date Time Selection */}
//       <div className="mt-8">
//         <h3 className="text-lg font-semibold mb-4">Add Show Times</h3>
//         <div className="flex gap-2">
//           <input
//             type="datetime-local"
//             value={dateTimeInput}
//             onChange={(e) => setDateTimeInput(e.target.value)}
//             className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
//             min={new Date().toISOString().slice(0, 16)}
//           />
//           <button
//             onClick={handleDateTimeAdd}
//             className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
//           >
//             Add Time
//           </button>
//         </div>
//       </div>

//       {/* Selected Times Display */}
//       {Object.keys(dateTimeSelection).length > 0 && (
//         <div className="mt-8">
//           <h3 className="text-lg font-semibold mb-4">Selected Show Times</h3>
//           <div className="space-y-4">
//             {Object.entries(dateTimeSelection).map(([date, times]) => (
//               <div key={date} className="border rounded-lg p-4">
//                 <div className="flex items-center gap-2 mb-3">
//                   <CalendarIcon className="w-5 h-5 text-primary" />
//                   <p className="font-semibold">
//                     {new Date(date).toLocaleDateString("en-US", {
//                       weekday: "long",
//                       year: "numeric",
//                       month: "long",
//                       day: "numeric",
//                     })}
//                   </p>
//                 </div>
//                 <div className="flex flex-wrap gap-2">
//                   {times.map((time) => (
//                     <div
//                       key={time}
//                       className="flex items-center gap-2 bg-primary/10 px-3 py-2 rounded-lg"
//                     >
//                       <ClockIcon className="w-4 h-4 text-primary" />
//                       <span className="font-medium">
//                         {new Date(`2000-01-01T${time}`).toLocaleTimeString("en-US", {
//                           hour: "2-digit",
//                           minute: "2-digit",
//                         })}
//                       </span>
//                       <button
//                         onClick={() => handleRemoveTime(date, time)}
//                         className="ml-2 text-red-500 hover:text-red-700"
//                       >
//                         <XIcon className="w-4 h-4" />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Submit Button */}
//       <button
//         onClick={handleSubmit}
//         disabled={addingShow || !selectedMovie || !showPrice || !Object.keys(dateTimeSelection).length}
//         className="mt-8 px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold"
//       >
//         {addingShow ? "Adding Show..." : "Add Show"}
//       </button>
//     </>
//   );
// };

// export default AddShows;
// import React, { useEffect, useState } from "react";
// import Loading from "../../components/Loading";
// import Title from "../../components/admin/Title";
// import { CheckIcon, XIcon, StarIcon, CalendarIcon, ClockIcon } from "lucide-react";
// import { useAppContext } from "../../context/AppContext";
// import toast from "react-hot-toast";

// const AddShows = () => {
//   const { axios, user } = useAppContext();
//   const currency = import.meta.env.VITE_CURRENCY;

//   const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
//   const [selectedMovie, setSelectedMovie] = useState(null);
//   const [dateTimeSelection, setDateTimeSelection] = useState({});
//   const [dateTimeInput, setDateTimeInput] = useState("");
//   const [showPrice, setShowPrice] = useState("");
//   const [addingShow, setAddingShow] = useState(false);
//   const [loading, setLoading] = useState(true);

//   const fetchNowPlayingMovies = async () => {
//     try {
//       setLoading(true);
//       // ✅ Token will be added automatically by interceptor
//       const { data } = await axios.get("/api/show/now-playing");
      
//       if (data.success) {
//         setNowPlayingMovies(data.movies);
//       } else {
//         toast.error(data.message || "Failed to fetch movies");
//       }
//     } catch (error) {
//       console.error("Fetch movies error:", error);
      
//       if (error.response?.status === 401) {
//         toast.error("Unauthorized - Please check your admin access");
//       } else {
//         toast.error("Failed to fetch movies");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (user) {
//       fetchNowPlayingMovies();
//     }
//   }, [user]);

//   const handleDateTimeAdd = () => {
//     if (!dateTimeInput) {
//       toast.error("Please select date and time");
//       return;
//     }

//     const selectedDateTime = new Date(dateTimeInput);
//     const now = new Date();

//     if (selectedDateTime < now) {
//       toast.error("Cannot add shows in the past");
//       return;
//     }

//     const [date, time] = dateTimeInput.split("T");

//     if (dateTimeSelection[date]?.includes(time)) {
//       toast.error("This time slot already exists");
//       return;
//     }

//     setDateTimeSelection((prev) => ({
//       ...prev,
//       [date]: [...(prev[date] || []), time],
//     }));

//     setDateTimeInput("");
//     toast.success("Time slot added");
//   };

//   const handleRemoveTime = (date, time) => {
//     setDateTimeSelection((prev) => {
//       const updated = prev[date].filter((t) => t !== time);
//       if (!updated.length) {
//         const { [date]: _, ...rest } = prev;
//         return rest;
//       }
//       return { ...prev, [date]: updated };
//     });
//     toast.success("Time slot removed");
//   };

//   const handleSubmit = async () => {
//     if (!selectedMovie) {
//       toast.error("Please select a movie");
//       return;
//     }

//     if (!showPrice || Number(showPrice) <= 0) {
//       toast.error("Please enter valid show price");
//       return;
//     }

//     if (!Object.keys(dateTimeSelection).length) {
//       toast.error("Please add at least one show time");
//       return;
//     }

//     try {
//       setAddingShow(true);

//       const showsInput = Object.entries(dateTimeSelection).map(
//         ([date, times]) => ({ date, time: times })
//       );

//       const payload = {
//         movieId: selectedMovie,
//         showsInput,
//         showPrice: Number(showPrice),
//       };

//       // ✅ Token will be added automatically by interceptor
//       const { data } = await axios.post("/api/show/add", payload);

//       if (data.success) {
//         toast.success(data.message);
//         setSelectedMovie(null);
//         setDateTimeSelection({});
//         setShowPrice("");
//         fetchNowPlayingMovies();
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error(error);
      
//       if (error.response?.status === 401) {
//         toast.error("Unauthorized - Please check your admin access");
//       } else {
//         toast.error("Failed to add show");
//       }
//     } finally {
//       setAddingShow(false);
//     }
//   };

//   if (loading) return <Loading />;

//   if (!nowPlayingMovies.length) {
//     return (
//       <div className="text-center py-20">
//         <p className="text-xl text-gray-600">No movies available</p>
//         <button
//           onClick={fetchNowPlayingMovies}
//           className="mt-4 px-6 py-2 bg-primary text-white rounded hover:bg-primary/90"
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Title text1="Add" text2="Shows" />

//       {/* Movie Selection */}
//       <div className="mt-6">
//         <h3 className="text-lg font-semibold mb-4">Select Movie</h3>
//         <div className="flex flex-wrap gap-4">
//           {nowPlayingMovies.map((movie) => (
//             <div
//               key={movie._id}
//               onClick={() => setSelectedMovie(movie._id)}
//               className={`w-40 cursor-pointer relative transition-transform hover:scale-105 ${
//                 selectedMovie === movie._id ? "ring-2 ring-primary rounded-md" : ""
//               }`}
//             >
//               <img
//                 src={movie.poster_path}
//                 alt={movie.title}
//                 className="rounded-md h-56 w-full object-cover"
//               />
//               <p className="font-medium truncate mt-2 text-sm">{movie.title}</p>
//               <p className="flex items-center gap-1 text-sm text-gray-500">
//                 <StarIcon className="w-4 h-4 text-yellow-500 fill-yellow-500" />
//                 {movie.vote_average?.toFixed(1) ?? "N/A"}
//               </p>

//               {selectedMovie === movie._id && (
//                 <div className="absolute top-2 right-2 bg-primary h-8 w-8 rounded-full flex items-center justify-center shadow-lg">
//                   <CheckIcon className="w-5 h-5 text-white" />
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Show Price */}
//       <div className="mt-8">
//         <h3 className="text-lg font-semibold mb-4">Set Show Price</h3>
//         <div className="flex items-center gap-2">
//           <span className="text-lg font-medium">{currency}</span>
//           <input
//             type="number"
//             placeholder="Enter price"
//             value={showPrice}
//             onChange={(e) => setShowPrice(e.target.value)}
//             className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary w-40"
//             min="0"
//             step="10"
//           />
//         </div>
//       </div>

//       {/* Date Time Selection */}
//       <div className="mt-8">
//         <h3 className="text-lg font-semibold mb-4">Add Show Times</h3>
//         <div className="flex gap-2">
//           <input
//             type="datetime-local"
//             value={dateTimeInput}
//             onChange={(e) => setDateTimeInput(e.target.value)}
//             className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
//             min={new Date().toISOString().slice(0, 16)}
//           />
//           <button
//             onClick={handleDateTimeAdd}
//             className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
//           >
//             Add Time
//           </button>
//         </div>
//       </div>

//       {/* Selected Times Display */}
//       {Object.keys(dateTimeSelection).length > 0 && (
//         <div className="mt-8">
//           <h3 className="text-lg font-semibold mb-4">Selected Show Times</h3>
//           <div className="space-y-4">
//             {Object.entries(dateTimeSelection).map(([date, times]) => (
//               <div key={date} className="border rounded-lg p-4">
//                 <div className="flex items-center gap-2 mb-3">
//                   <CalendarIcon className="w-5 h-5 text-primary" />
//                   <p className="font-semibold">
//                     {new Date(date).toLocaleDateString("en-US", {
//                       weekday: "long",
//                       year: "numeric",
//                       month: "long",
//                       day: "numeric",
//                     })}
//                   </p>
//                 </div>
//                 <div className="flex flex-wrap gap-2">
//                   {times.map((time) => (
//                     <div
//                       key={time}
//                       className="flex items-center gap-2 bg-primary/10 px-3 py-2 rounded-lg"
//                     >
//                       <ClockIcon className="w-4 h-4 text-primary" />
//                       <span className="font-medium">
//                         {new Date(`2000-01-01T${time}`).toLocaleTimeString("en-US", {
//                           hour: "2-digit",
//                           minute: "2-digit",
//                         })}
//                       </span>
//                       <button
//                         onClick={() => handleRemoveTime(date, time)}
//                         className="ml-2 text-red-500 hover:text-red-700"
//                       >
//                         <XIcon className="w-4 h-4" />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Submit Button */}
//       <button
//         onClick={handleSubmit}
//         disabled={addingShow || !selectedMovie || !showPrice || !Object.keys(dateTimeSelection).length}
//         className="mt-8 px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold"
//       >
//         {addingShow ? "Adding Show..." : "Add Show"}
//       </button>
//     </>
//   );
// };

// export default AddShows;

// import React, { useEffect, useState } from "react";
// import Loading from "../../components/Loading";
// import Title from "../../components/admin/Title";
// import { CheckIcon, XIcon, StarIcon, CalendarIcon, ClockIcon } from "lucide-react";
// import { useAppContext } from "../../context/AppContext";
// import toast from "react-hot-toast";

// const AddShows = () => {
//   const { axios, user } = useAppContext();
//   const currency = import.meta.env.VITE_CURRENCY;

//   const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
//   const [selectedMovie, setSelectedMovie] = useState(null);
//   const [dateTimeSelection, setDateTimeSelection] = useState({});
//   const [dateTimeInput, setDateTimeInput] = useState("");
//   const [showPrice, setShowPrice] = useState("");
//   const [addingShow, setAddingShow] = useState(false);
//   const [loading, setLoading] = useState(true);

//   const fetchNowPlayingMovies = async () => {
//     try {
//       setLoading(true);
//       const { data } = await axios.get("/api/show/now-playing");
      
//       if (data.success) {
//         setNowPlayingMovies(data.movies);
//       } else {
//         toast.error(data.message || "Failed to fetch movies");
//       }
//     } catch (error) {
//       console.error("Fetch movies error:", error);
      
//       if (error.response?.status === 401) {
//         toast.error("Unauthorized - Please check your admin access");
//       } else if (error.response?.status === 403) {
//         toast.error("Access denied - Admin privileges required");
//       } else {
//         toast.error(error.response?.data?.message || "Failed to fetch movies");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (user) {
//       fetchNowPlayingMovies();
//     }
//   }, [user]);

//   const handleDateTimeAdd = () => {
//     if (!dateTimeInput) {
//       toast.error("Please select date and time");
//       return;
//     }

//     const selectedDateTime = new Date(dateTimeInput);
//     const now = new Date();

//     if (selectedDateTime < now) {
//       toast.error("Cannot add shows in the past");
//       return;
//     }

//     const [date, time] = dateTimeInput.split("T");

//     if (dateTimeSelection[date]?.includes(time)) {
//       toast.error("This time slot already exists");
//       return;
//     }

//     setDateTimeSelection((prev) => ({
//       ...prev,
//       [date]: [...(prev[date] || []), time],
//     }));

//     setDateTimeInput("");
//     toast.success("Time slot added");
//   };

//   const handleRemoveTime = (date, time) => {
//     setDateTimeSelection((prev) => {
//       const updated = prev[date].filter((t) => t !== time);
//       if (!updated.length) {
//         const { [date]: _, ...rest } = prev;
//         return rest;
//       }
//       return { ...prev, [date]: updated };
//     });
//     toast.success("Time slot removed");
//   };

//   const handleSubmit = async () => {
//     if (!selectedMovie) {
//       toast.error("Please select a movie");
//       return;
//     }

//     if (!showPrice || Number(showPrice) <= 0) {
//       toast.error("Please enter valid show price");
//       return;
//     }

//     if (!Object.keys(dateTimeSelection).length) {
//       toast.error("Please add at least one show time");
//       return;
//     }

//     try {
//       setAddingShow(true);

//       const showsInput = Object.entries(dateTimeSelection).map(
//         ([date, times]) => ({ date, time: times })
//       );

//       const payload = {
//         movieId: selectedMovie,
//         showsInput,
//         showPrice: Number(showPrice),
//       };

//       const { data } = await axios.post("/api/show/add", payload);

//       if (data.success) {
//         toast.success(data.message);
//         setSelectedMovie(null);
//         setDateTimeSelection({});
//         setShowPrice("");
//         fetchNowPlayingMovies();
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error("Add show error:", error);
      
//       if (error.response?.status === 401) {
//         toast.error("Unauthorized - Please check your admin access");
//       } else if (error.response?.status === 403) {
//         toast.error("Access denied - Admin privileges required");
//       } else {
//         toast.error(error.response?.data?.message || "Failed to add show");
//       }
//     } finally {
//       setAddingShow(false);
//     }
//   };

//   if (loading) return <Loading />;

//   if (!nowPlayingMovies.length) {
//     return (
//       <div className="text-center py-20">
//         <p className="text-xl text-gray-600 mb-4">No movies available</p>
//         <p className="text-gray-500 mb-4">Please check your API keys</p>
//         <button
//           onClick={fetchNowPlayingMovies}
//           className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Title text1="Add" text2="Shows" />

//       {/* Movie Selection */}
//       <div className="mt-6">
//         <h3 className="text-lg font-semibold mb-4">Select Movie</h3>
//         <div className="flex flex-wrap gap-4">
//           {nowPlayingMovies.map((movie) => (
//             <div
//               key={movie._id}
//               onClick={() => setSelectedMovie(movie._id)}
//               className={`w-40 cursor-pointer relative transition-transform hover:scale-105 ${
//                 selectedMovie === movie._id ? "ring-2 ring-primary rounded-md" : ""
//               }`}
//             >
//               <img
//                 src={movie.poster_path}
//                 alt={movie.title}
//                 className="rounded-md h-56 w-full object-cover"
//                 onError={(e) => {
//                   e.target.src = "https://via.placeholder.com/300x450?text=No+Image";
//                 }}
//               />
//               <p className="font-medium truncate mt-2 text-sm" title={movie.title}>
//                 {movie.title}
//               </p>
//               <p className="flex items-center gap-1 text-sm text-gray-500">
//                 <StarIcon className="w-4 h-4 text-yellow-500 fill-yellow-500" />
//                 {movie.vote_average?.toFixed(1) ?? "N/A"}
//               </p>

//               {selectedMovie === movie._id && (
//                 <div className="absolute top-2 right-2 bg-primary h-8 w-8 rounded-full flex items-center justify-center shadow-lg">
//                   <CheckIcon className="w-5 h-5 text-white" />
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Show Price */}
//       <div className="mt-8">
//         <h3 className="text-lg font-semibold mb-4">Set Show Price</h3>
//         <div className="flex items-center gap-2">
//           <span className="text-lg font-medium">{currency}</span>
//           <input
//             type="number"
//             placeholder="Enter price"
//             value={showPrice}
//             onChange={(e) => setShowPrice(e.target.value)}
//             className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary w-40"
//             min="0"
//             step="10"
//           />
//         </div>
//       </div>

//       {/* Date Time Selection */}
//       <div className="mt-8">
//         <h3 className="text-lg font-semibold mb-4">Add Show Times</h3>
//         <div className="flex gap-2 flex-wrap">
//           <input
//             type="datetime-local"
//             value={dateTimeInput}
//             onChange={(e) => setDateTimeInput(e.target.value)}
//             className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
//             min={new Date().toISOString().slice(0, 16)}
//           />
//           <button
//             onClick={handleDateTimeAdd}
//             className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
//           >
//             Add Time
//           </button>
//         </div>
//       </div>

//       {/* Selected Times Display */}
//       {Object.keys(dateTimeSelection).length > 0 && (
//         <div className="mt-8">
//           <h3 className="text-lg font-semibold mb-4">Selected Show Times</h3>
//           <div className="space-y-4">
//             {Object.entries(dateTimeSelection).map(([date, times]) => (
//               <div key={date} className="border rounded-lg p-4">
//                 <div className="flex items-center gap-2 mb-3">
//                   <CalendarIcon className="w-5 h-5 text-primary" />
//                   <p className="font-semibold">
//                     {new Date(date).toLocaleDateString("en-US", {
//                       weekday: "long",
//                       year: "numeric",
//                       month: "long",
//                       day: "numeric",
//                     })}
//                   </p>
//                 </div>
//                 <div className="flex flex-wrap gap-2">
//                   {times.map((time) => (
//                     <div
//                       key={time}
//                       className="flex items-center gap-2 bg-primary/10 px-3 py-2 rounded-lg"
//                     >
//                       <ClockIcon className="w-4 h-4 text-primary" />
//                       <span className="font-medium">
//                         {new Date(`2000-01-01T${time}`).toLocaleTimeString("en-US", {
//                           hour: "2-digit",
//                           minute: "2-digit",
//                         })}
//                       </span>
//                       <button
//                         onClick={() => handleRemoveTime(date, time)}
//                         className="ml-2 text-red-500 hover:text-red-700"
//                       >
//                         <XIcon className="w-4 h-4" />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Submit Button */}
//       <button
//         onClick={handleSubmit}
//         disabled={addingShow || !selectedMovie || !showPrice || !Object.keys(dateTimeSelection).length}
//         className="mt-8 px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold"
//       >
//         {addingShow ? "Adding Show..." : "Add Show"}
//       </button>
//     </>
//   );
// };

// export default AddShows;

// import React, { useEffect, useState } from "react";
// import Loading from "../../components/Loading";
// import Title from "../../components/admin/Title";
// import { CheckIcon, XIcon, StarIcon, CalendarIcon, ClockIcon } from "lucide-react";
// import { useAppContext } from "../../context/AppContext";
// import toast from "react-hot-toast";

// const AddShows = () => {
//   const { axios, user } = useAppContext();
//   const currency = import.meta.env.VITE_CURRENCY;

//   // ✅ Always initialize as array
//   const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
//   const [selectedMovie, setSelectedMovie] = useState(null);
//   const [dateTimeSelection, setDateTimeSelection] = useState({});
//   const [dateTimeInput, setDateTimeInput] = useState("");
//   const [showPrice, setShowPrice] = useState("");
//   const [addingShow, setAddingShow] = useState(false);
//   const [loading, setLoading] = useState(true);

//   const fetchNowPlayingMovies = async () => {
//     try {
//       setLoading(true);
//       const { data } = await axios.get("/api/show/now-playing");
      
//       if (data.success) {
//         // ✅ Ensure movies is always an array
//         setNowPlayingMovies(Array.isArray(data.movies) ? data.movies : []);
//       } else {
//         toast.error(data.message || "Failed to fetch movies");
//         setNowPlayingMovies([]); // ✅ Set empty array on error
//       }
//     } catch (error) {
//       console.error("Fetch movies error:", error);
//       setNowPlayingMovies([]); // ✅ Set empty array on error
      
//       if (error.response?.status === 401) {
//         toast.error("Unauthorized - Please check your admin access");
//       } else if (error.response?.status === 403) {
//         toast.error("Access denied - Admin privileges required");
//       } else {
//         toast.error(error.response?.data?.message || "Failed to fetch movies");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (user) {
//       fetchNowPlayingMovies();
//     }
//   }, [user]);

//   const handleDateTimeAdd = () => {
//     if (!dateTimeInput) {
//       toast.error("Please select date and time");
//       return;
//     }

//     const selectedDateTime = new Date(dateTimeInput);
//     const now = new Date();

//     if (selectedDateTime < now) {
//       toast.error("Cannot add shows in the past");
//       return;
//     }

//     const [date, time] = dateTimeInput.split("T");

//     if (dateTimeSelection[date]?.includes(time)) {
//       toast.error("This time slot already exists");
//       return;
//     }

//     setDateTimeSelection((prev) => ({
//       ...prev,
//       [date]: [...(prev[date] || []), time],
//     }));

//     setDateTimeInput("");
//     toast.success("Time slot added");
//   };

//   const handleRemoveTime = (date, time) => {
//     setDateTimeSelection((prev) => {
//       const updated = prev[date].filter((t) => t !== time);
//       if (!updated.length) {
//         const { [date]: _, ...rest } = prev;
//         return rest;
//       }
//       return { ...prev, [date]: updated };
//     });
//     toast.success("Time slot removed");
//   };

//   const handleSubmit = async () => {
//     if (!selectedMovie) {
//       toast.error("Please select a movie");
//       return;
//     }

//     if (!showPrice || Number(showPrice) <= 0) {
//       toast.error("Please enter valid show price");
//       return;
//     }

//     if (!Object.keys(dateTimeSelection).length) {
//       toast.error("Please add at least one show time");
//       return;
//     }

//     try {
//       setAddingShow(true);

//       const showsInput = Object.entries(dateTimeSelection).map(
//         ([date, times]) => ({ date, time: times })
//       );

//       const payload = {
//         movieId: selectedMovie,
//         showsInput,
//         showPrice: Number(showPrice),
//       };

//       const { data } = await axios.post("/api/show/add", payload);

//       if (data.success) {
//         toast.success(data.message);
//         setSelectedMovie(null);
//         setDateTimeSelection({});
//         setShowPrice("");
//         fetchNowPlayingMovies();
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error("Add show error:", error);
      
//       if (error.response?.status === 401) {
//         toast.error("Unauthorized - Please check your admin access");
//       } else if (error.response?.status === 403) {
//         toast.error("Access denied - Admin privileges required");
//       } else {
//         toast.error(error.response?.data?.message || "Failed to add show");
//       }
//     } finally {
//       setAddingShow(false);
//     }
//   };

//   if (loading) return <Loading />;

//   // ✅ Added safety check
//   if (!Array.isArray(nowPlayingMovies) || nowPlayingMovies.length === 0) {
//     return (
//       <div className="text-center py-20">
//         <p className="text-xl text-gray-600 mb-4">No movies available</p>
//         <p className="text-gray-500 mb-4">
//           {nowPlayingMovies.length === 0 
//             ? "Please check your API keys or try again later" 
//             : "Loading movies..."}
//         </p>
//         <button
//           onClick={fetchNowPlayingMovies}
//           className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Title text1="Add" text2="Shows" />

//       {/* Movie Selection */}
//       <div className="mt-6">
//         <h3 className="text-lg font-semibold mb-4">Select Movie</h3>
//         <div className="flex flex-wrap gap-4">
//           {nowPlayingMovies.map((movie) => (
//             <div
//               key={movie._id}
//               onClick={() => setSelectedMovie(movie._id)}
//               className={`w-40 cursor-pointer relative transition-transform hover:scale-105 ${
//                 selectedMovie === movie._id ? "ring-2 ring-primary rounded-md" : ""
//               }`}
//             >
//               <img
//                 src={movie.poster_path || "https://via.placeholder.com/300x450?text=No+Image"}
//                 alt={movie.title || "Movie"}
//                 className="rounded-md h-56 w-full object-cover"
//                 onError={(e) => {
//                   e.target.src = "https://via.placeholder.com/300x450?text=No+Image";
//                 }}
//               />
//               <p className="font-medium truncate mt-2 text-sm" title={movie.title}>
//                 {movie.title || "Unknown Movie"}
//               </p>
//               <p className="flex items-center gap-1 text-sm text-gray-500">
//                 <StarIcon className="w-4 h-4 text-yellow-500 fill-yellow-500" />
//                 {movie.vote_average?.toFixed(1) ?? "N/A"}
//               </p>

//               {selectedMovie === movie._id && (
//                 <div className="absolute top-2 right-2 bg-primary h-8 w-8 rounded-full flex items-center justify-center shadow-lg">
//                   <CheckIcon className="w-5 h-5 text-white" />
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Show Price */}
//       <div className="mt-8">
//         <h3 className="text-lg font-semibold mb-4">Set Show Price</h3>
//         <div className="flex items-center gap-2">
//           <span className="text-lg font-medium">{currency}</span>
//           <input
//             type="number"
//             placeholder="Enter price"
//             value={showPrice}
//             onChange={(e) => setShowPrice(e.target.value)}
//             className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary w-40"
//             min="0"
//             step="10"
//           />
//         </div>
//       </div>

//       {/* Date Time Selection */}
//       <div className="mt-8">
//         <h3 className="text-lg font-semibold mb-4">Add Show Times</h3>
//         <div className="flex gap-2 flex-wrap">
//           <input
//             type="datetime-local"
//             value={dateTimeInput}
//             onChange={(e) => setDateTimeInput(e.target.value)}
//             className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
//             min={new Date().toISOString().slice(0, 16)}
//           />
//           <button
//             onClick={handleDateTimeAdd}
//             className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
//           >
//             Add Time
//           </button>
//         </div>
//       </div>

//       {/* Selected Times Display */}
//       {Object.keys(dateTimeSelection).length > 0 && (
//         <div className="mt-8">
//           <h3 className="text-lg font-semibold mb-4">Selected Show Times</h3>
//           <div className="space-y-4">
//             {Object.entries(dateTimeSelection).map(([date, times]) => (
//               <div key={date} className="border rounded-lg p-4">
//                 <div className="flex items-center gap-2 mb-3">
//                   <CalendarIcon className="w-5 h-5 text-primary" />
//                   <p className="font-semibold">
//                     {new Date(date).toLocaleDateString("en-US", {
//                       weekday: "long",
//                       year: "numeric",
//                       month: "long",
//                       day: "numeric",
//                     })}
//                   </p>
//                 </div>
//                 <div className="flex flex-wrap gap-2">
//                   {times.map((time) => (
//                     <div
//                       key={time}
//                       className="flex items-center gap-2 bg-primary/10 px-3 py-2 rounded-lg"
//                     >
//                       <ClockIcon className="w-4 h-4 text-primary" />
//                       <span className="font-medium">
//                         {new Date(`2000-01-01T${time}`).toLocaleTimeString("en-US", {
//                           hour: "2-digit",
//                           minute: "2-digit",
//                         })}
//                       </span>
//                       <button
//                         onClick={() => handleRemoveTime(date, time)}
//                         className="ml-2 text-red-500 hover:text-red-700"
//                       >
//                         <XIcon className="w-4 h-4" />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Submit Button */}
//       <button
//         onClick={handleSubmit}
//         disabled={addingShow || !selectedMovie || !showPrice || !Object.keys(dateTimeSelection).length}
//         className="mt-8 px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold"
//       >
//         {addingShow ? "Adding Show..." : "Add Show"}
//       </button>
//     </>
//   );
// };

// export default AddShows;

import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import Title from "../../components/admin/Title";
import { CheckIcon, XIcon, StarIcon, CalendarIcon, ClockIcon, AlertCircleIcon } from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AddShows = () => {
  const { axios, user, isAdmin, getToken } = useAppContext();
  const currency = import.meta.env.VITE_CURRENCY;

  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [dateTimeSelection, setDateTimeSelection] = useState({});
  const [dateTimeInput, setDateTimeInput] = useState("");
  const [showPrice, setShowPrice] = useState("");
  const [addingShow, setAddingShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNowPlayingMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log("========================================");
      console.log("📡 Fetching now playing movies...");
      console.log("👤 User:", user?.primaryEmailAddress?.emailAddress);
      console.log("👑 Is Admin:", isAdmin);
      
      // Get token explicitly
      const token = await getToken();
      console.log("🔑 Token obtained:", !!token);
      
      if (!token) {
        throw new Error("No authentication token available");
      }

      // Make request with explicit token
      const { data } = await axios.get("/api/show/now-playing", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      console.log("✅ Response received:", data);
      
      if (data.success) {
        setNowPlayingMovies(Array.isArray(data.movies) ? data.movies : []);
        console.log("✅ Movies loaded:", data.movies.length);
      } else {
        console.error("❌ API returned error:", data.message);
        setError(data.message);
        toast.error(data.message || "Failed to fetch movies");
        setNowPlayingMovies([]);
      }
    } catch (error) {
      console.error("========================================");
      console.error("❌ Fetch movies error:");
      console.error("Status:", error.response?.status);
      console.error("Message:", error.message);
      console.error("Response:", error.response?.data);
      console.error("========================================");
      
      setNowPlayingMovies([]);
      
      if (error.response?.status === 401) {
        setError("Not authenticated. Please log in again.");
        toast.error("Unauthorized - Please log in again");
      } else if (error.response?.status === 403) {
        setError("Access denied. Admin privileges required.");
        toast.error("Access denied - Admin privileges required");
      } else if (error.response?.status === 500) {
        setError(error.response?.data?.message || "Server error. Please check API keys.");
        toast.error("Server error - Check console for details");
      } else {
        setError(error.message || "Failed to fetch movies");
        toast.error(error.response?.data?.message || "Failed to fetch movies");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Only fetch if user is loaded and is admin
    if (user && isAdmin) {
      console.log("✅ User is admin, fetching movies...");
      fetchNowPlayingMovies();
    } else if (user && !isAdmin) {
      console.log("❌ User is not admin");
      setLoading(false);
      setError("Admin access required");
    }
  }, [user, isAdmin]);

  const handleDateTimeAdd = () => {
    if (!dateTimeInput) {
      toast.error("Please select date and time");
      return;
    }

    const selectedDateTime = new Date(dateTimeInput);
    const now = new Date();

    if (selectedDateTime < now) {
      toast.error("Cannot add shows in the past");
      return;
    }

    const [date, time] = dateTimeInput.split("T");

    if (dateTimeSelection[date]?.includes(time)) {
      toast.error("This time slot already exists");
      return;
    }

    setDateTimeSelection((prev) => ({
      ...prev,
      [date]: [...(prev[date] || []), time],
    }));

    setDateTimeInput("");
    toast.success("Time slot added");
  };

  const handleRemoveTime = (date, time) => {
    setDateTimeSelection((prev) => {
      const updated = prev[date].filter((t) => t !== time);
      if (!updated.length) {
        const { [date]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [date]: updated };
    });
    toast.success("Time slot removed");
  };

  const handleSubmit = async () => {
    if (!selectedMovie) {
      toast.error("Please select a movie");
      return;
    }

    if (!showPrice || Number(showPrice) <= 0) {
      toast.error("Please enter valid show price");
      return;
    }

    if (!Object.keys(dateTimeSelection).length) {
      toast.error("Please add at least one show time");
      return;
    }

    try {
      setAddingShow(true);

      const showsInput = Object.entries(dateTimeSelection).map(
        ([date, times]) => ({ date, time: times })
      );

      const token = await getToken();
      
      const payload = {
        movieId: selectedMovie,
        showsInput,
        showPrice: Number(showPrice),
      };

      const { data } = await axios.post("/api/show/add", payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (data.success) {
        toast.success(data.message);
        setSelectedMovie(null);
        setDateTimeSelection({});
        setShowPrice("");
        fetchNowPlayingMovies();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Add show error:", error);
      
      if (error.response?.status === 401) {
        toast.error("Unauthorized - Please log in again");
      } else if (error.response?.status === 403) {
        toast.error("Access denied - Admin privileges required");
      } else {
        toast.error(error.response?.data?.message || "Failed to add show");
      }
    } finally {
      setAddingShow(false);
    }
  };

  if (loading) return <Loading />;

  // Show error state
  if (error) {
    return (
      <div className="text-center py-20">
        <AlertCircleIcon className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <p className="text-xl text-gray-600 mb-2">Unable to load movies</p>
        <p className="text-red-500 mb-4">{error}</p>
        <div className="space-y-2 mb-4">
          <p className="text-sm text-gray-500">Troubleshooting:</p>
          <ul className="text-sm text-gray-600 list-disc list-inside">
            <li>Check if you're logged in as admin</li>
            <li>Check browser console for errors (F12)</li>
            <li>Verify OMDB_API_KEY in backend .env</li>
            <li>Verify WATCHMODE_API_KEY in backend .env</li>
          </ul>
        </div>
        <button
          onClick={fetchNowPlayingMovies}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
        >
          Retry
        </button>
      </div>
    );
  }

  // Show no movies state
  if (!Array.isArray(nowPlayingMovies) || nowPlayingMovies.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-gray-600 mb-4">No movies available</p>
        <p className="text-gray-500 mb-4">Please check your API keys</p>
        <button
          onClick={fetchNowPlayingMovies}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <Title text1="Add" text2="Shows" />

      {/* Movie Selection */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">Select Movie ({nowPlayingMovies.length} available)</h3>
        <div className="flex flex-wrap gap-4">
          {nowPlayingMovies.map((movie) => (
            <div
              key={movie._id}
              onClick={() => setSelectedMovie(movie._id)}
              className={`w-40 cursor-pointer relative transition-transform hover:scale-105 ${
                selectedMovie === movie._id ? "ring-2 ring-primary rounded-md" : ""
              }`}
            >
              <img
                src={movie.poster_path || "https://via.placeholder.com/300x450?text=No+Image"}
                alt={movie.title || "Movie"}
                className="rounded-md h-56 w-full object-cover"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/300x450?text=No+Image";
                }}
              />
              <p className="font-medium truncate mt-2 text-sm" title={movie.title}>
                {movie.title || "Unknown Movie"}
              </p>
              <p className="flex items-center gap-1 text-sm text-gray-500">
                <StarIcon className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                {movie.vote_average?.toFixed(1) ?? "N/A"}
              </p>

              {selectedMovie === movie._id && (
                <div className="absolute top-2 right-2 bg-primary h-8 w-8 rounded-full flex items-center justify-center shadow-lg">
                  <CheckIcon className="w-5 h-5 text-white" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Show Price */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Set Show Price</h3>
        <div className="flex items-center gap-2">
          <span className="text-lg font-medium">{currency}</span>
          <input
            type="number"
            placeholder="Enter price"
            value={showPrice}
            onChange={(e) => setShowPrice(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary w-40"
            min="0"
            step="10"
          />
        </div>
      </div>

      {/* Date Time Selection */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Add Show Times</h3>
        <div className="flex gap-2 flex-wrap">
          <input
            type="datetime-local"
            value={dateTimeInput}
            onChange={(e) => setDateTimeInput(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            min={new Date().toISOString().slice(0, 16)}
          />
          <button
            onClick={handleDateTimeAdd}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Add Time
          </button>
        </div>
      </div>

      {/* Selected Times Display */}
      {Object.keys(dateTimeSelection).length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Selected Show Times</h3>
          <div className="space-y-4">
            {Object.entries(dateTimeSelection).map(([date, times]) => (
              <div key={date} className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <CalendarIcon className="w-5 h-5 text-primary" />
                  <p className="font-semibold">
                    {new Date(date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {times.map((time) => (
                    <div
                      key={time}
                      className="flex items-center gap-2 bg-primary/10 px-3 py-2 rounded-lg"
                    >
                      <ClockIcon className="w-4 h-4 text-primary" />
                      <span className="font-medium">
                        {new Date(`2000-01-01T${time}`).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      <button
                        onClick={() => handleRemoveTime(date, time)}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        <XIcon className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={addingShow || !selectedMovie || !showPrice || !Object.keys(dateTimeSelection).length}
        className="mt-8 px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold"
      >
        {addingShow ? "Adding Show..." : "Add Show"}
      </button>
    </>
  );
};

export default AddShows;