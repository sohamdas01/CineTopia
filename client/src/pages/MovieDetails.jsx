// import React, { useEffect, useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import { dummyDateTimeData, dummyShowsData } from '../assets/assets'
// import BlurCircle from '../components/BlurCircle'
// import { Heart, PlayCircleIcon, StarIcon } from 'lucide-react'
// import timeFormat from '../lib/timeFormat'
// import DateSelect from '../components/DateSelect'
// import MovieCard from '../components/MovieCard'
// import Loading from '../components/Loading'
// import { useAppContext } from '../context/AppContext'
// import toast from 'react-hot-toast'

// const MovieDetails = () => {

//   const navigate = useNavigate()
//   const {id} = useParams()
//   const [show, setShow] = useState(null)

//   const {shows, axios, getToken, user, fetchFavoriteMovies, favoriteMovies, image_base_url} = useAppContext()

//   const getShow = async ()=>{
//     try {
//       const { data } = await axios.get(`/api/show/${id}`)
//       if(data.success){
//         setShow(data)
//       }
//     } catch (error) {
//       console.log(error) 
//     }
//   }

//   const handleFavorite = async ()=>{
//     try {
//       if(!user) return toast.error("Please login to proceed");

//       const { data } = await axios.post('/api/user/update-favorite', {movieId: id}, {headers: { Authorization: `Bearer ${await getToken()}` }})

//       if(data.success){
//         await fetchFavoriteMovies()
//         toast.success(data.message)
//       }
//     } catch (error) {
//       console.log(error)
//     }
//   }
  
//   useEffect(()=>{
//     getShow()
//   },[id])

//   return show ? (
//     <div className='px-6 md:px-16 lg:px-40 pt-30 md:pt-50'>
//       <div className='flex flex-col md:flex-row gap-8 max-w-6xl mx-auto'>

//         <img src={image_base_url + show.movie.poster_path} alt="" className='max-md:mx-auto rounded-xl h-104 max-w-70 object-cover'/>

//         <div className='relative flex flex-col gap-3'>
//           <BlurCircle top="-100px" left="-100px"/>
//           <p className='text-primary'>ENGLISH</p>
//           <h1 className='text-4xl font-semibold max-w-96 text-balance'>{show.movie.title}</h1>
//           <div className='flex items-center gap-2 text-gray-300'>
//             <StarIcon className="w-5 h-5 text-primary fill-primary"/>
//             {show.movie.vote_average.toFixed(1)} User Rating
//           </div>

//           <p className='text-gray-400 mt-2 text-sm leading-tight max-w-xl'>{show.movie.overview}</p>

//           <p>
//             {timeFormat(show.movie.runtime)} • {show.movie.genres.map(genre => genre.name).join(", ")} • {show.movie.release_date.split("-")[0]}
//           </p>

//           <div className='flex items-center flex-wrap gap-4 mt-4'>
//             <button className='flex items-center gap-2 px-7 py-3 text-sm bg-gray-800 hover:bg-gray-900 transition rounded-md font-medium cursor-pointer active:scale-95'>
//               <PlayCircleIcon className="w-5 h-5"/>
//               Watch Trailer
              
//               </button>
//             <a href="#dateSelect" className='px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer active:scale-95'>Buy Tickets</a>
//             <button onClick={handleFavorite} className='bg-gray-700 p-2.5 rounded-full transition cursor-pointer active:scale-95'>
//               <Heart className={`w-5 h-5 ${favoriteMovies.find(movie => movie._id === id) ? 'fill-primary text-primary' : ""} `}/>
//             </button>
//           </div>
//         </div>
//       </div>

//       <p className='text-lg font-medium mt-20'>Your Favorite Cast</p>
//       <div className='overflow-x-auto no-scrollbar mt-8 pb-4'>
//         <div className='flex items-center gap-4 w-max px-4'>
//           {show.movie.casts.slice(0,12).map((cast,index)=> (
//             <div key={index} className='flex flex-col items-center text-center'>
//               <img src={image_base_url + cast.profile_path} alt="" className='rounded-full h-20 md:h-20 aspect-square object-cover'/>
//               <p className='font-medium text-xs mt-3'>{cast.name}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       <DateSelect dateTime={show.dateTime} id={id}/>

//       <p className='text-lg font-medium mt-20 mb-8'>You May Also Like</p>
//       <div className='flex flex-wrap max-sm:justify-center gap-8'>
//           {shows.slice(0,4).map((movie, index)=> (
//             <MovieCard key={index} movie={movie}/>
//           ))}
//       </div>
//       <div className='flex justify-center mt-20'>
//           <button onClick={()=> {navigate('/movies'); scrollTo(0,0)}} className='px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer'>Show more</button>
//       </div>

//     </div>
//   ) : <Loading />
// }

// export default MovieDetails

// import React, { useEffect, useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { StarIcon, ClockIcon, CalendarIcon, HeartIcon } from 'lucide-react';
// import { useAppContext } from '../context/AppContext';
// import toast from 'react-hot-toast';
// import Loading from '../components/Loading';

// const MovieDetails = () => {
//   const { id } = useParams();
//   const { axios, user, isFavoriteMovie, toggleFavorite } = useAppContext();
//   const currency = import.meta.env.VITE_CURRENCY;

//   const [movie, setMovie] = useState(null);
//   const [dateTime, setDateTime] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [selectedDate, setSelectedDate] = useState(null);

//   const fetchMovieDetails = async () => {
//     try {
//       setLoading(true);
//       const { data } = await axios.get(`/api/show/${id}`);
      
//       if (data.success) {
//         setMovie(data.movie);
//         setDateTime(data.dateTime);
        
//         const dates = Object.keys(data.dateTime);
//         if (dates.length > 0) {
//           setSelectedDate(dates[0]);
//         }
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error("Failed to load movie");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchMovieDetails();
//   }, [id]);

//   if (loading) return <Loading />;

//   if (!movie) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-xl">Movie not found</p>
//       </div>
//     );
//   }

//   const isFavorite = isFavoriteMovie(movie._id);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Hero Section */}
//       <div className="relative h-96 bg-gradient-to-b from-black to-gray-900">
//         <img
//           src={movie.poster_path || "https://via.placeholder.com/1920x1080"}
//           alt={movie.title}
//           className="w-full h-full object-cover opacity-30"
//         />
//         <div className="absolute inset-0 flex items-end">
//           <div className="container mx-auto px-4 pb-8">
//             <div className="flex gap-6 items-end">
//               <img
//                 src={movie.poster_path || "https://via.placeholder.com/300x450"}
//                 alt={movie.title}
//                 className="w-48 h-72 object-cover rounded-lg shadow-2xl"
//               />
//               <div className="text-white pb-4">
//                 <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
//                 <div className="flex items-center gap-4 text-sm">
//                   <div className="flex items-center gap-1">
//                     <StarIcon className="w-5 h-5 text-yellow-500 fill-yellow-500" />
//                     <span className="font-semibold">{movie.vote_average?.toFixed(1) || "N/A"}</span>
//                   </div>
//                   <div className="flex items-center gap-1">
//                     <ClockIcon className="w-4 h-4" />
//                     <span>{movie.runtime || "N/A"}</span>
//                   </div>
//                   <div className="flex items-center gap-1">
//                     <CalendarIcon className="w-4 h-4" />
//                     <span>{movie.release_date || "N/A"}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="container mx-auto px-4 py-8">
//         <div className="grid md:grid-cols-3 gap-8">
//           {/* Main Content */}
//           <div className="md:col-span-2">
//             {/* Overview */}
//             <div className="bg-white rounded-lg shadow p-6 mb-6">
//               <div className="flex justify-between items-start mb-4">
//                 <h2 className="text-2xl font-bold">Overview</h2>
//                 <button
//                   onClick={() => toggleFavorite(movie._id)}
//                   className={`p-2 rounded-full transition-colors ${
//                     isFavorite 
//                       ? 'bg-red-500 text-white' 
//                       : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
//                   }`}
//                 >
//                   <HeartIcon className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
//                 </button>
//               </div>
//               <p className="text-gray-700 leading-relaxed">{movie.overview || "No description available"}</p>
//             </div>

//             {/* Genres */}
//             {movie.genres && movie.genres.length > 0 && (
//               <div className="bg-white rounded-lg shadow p-6 mb-6">
//                 <h2 className="text-xl font-bold mb-3">Genres</h2>
//                 <div className="flex flex-wrap gap-2">
//                   {movie.genres.map((genre, index) => (
//                     <span
//                       key={index}
//                       className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium"
//                     >
//                       {genre}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Cast */}
//             {movie.casts && movie.casts.length > 0 && (
//               <div className="bg-white rounded-lg shadow p-6">
//                 <h2 className="text-xl font-bold mb-4">Cast</h2>
//                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//                   {movie.casts.slice(0, 8).map((cast, index) => (
//                     <div key={index} className="text-center">
//                       <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-2 flex items-center justify-center">
//                         <span className="text-2xl text-gray-400">👤</span>
//                       </div>
//                       <p className="text-sm font-medium text-gray-800">{cast}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Sidebar - Show Times */}
//           <div>
//             <div className="bg-white rounded-lg shadow p-6 sticky top-4">
//               <h2 className="text-xl font-bold mb-4">Book Tickets</h2>
              
//               {Object.keys(dateTime).length > 0 ? (
//                 <>
//                   {/* Date Selection */}
//                   <div className="mb-4">
//                     <h3 className="text-sm font-semibold text-gray-600 mb-2">Select Date</h3>
//                     <div className="space-y-2">
//                       {Object.keys(dateTime).map((date) => (
//                         <button
//                           key={date}
//                           onClick={() => setSelectedDate(date)}
//                           className={`w-full p-3 rounded-lg text-left transition-colors ${
//                             selectedDate === date
//                               ? 'bg-primary text-white'
//                               : 'bg-gray-100 hover:bg-gray-200'
//                           }`}
//                         >
//                           <div className="font-semibold">
//                             {new Date(date).toLocaleDateString('en-US', { 
//                               weekday: 'short', 
//                               month: 'short', 
//                               day: 'numeric' 
//                             })}
//                           </div>
//                         </button>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Time Selection */}
//                   {selectedDate && dateTime[selectedDate] && (
//                     <div>
//                       <h3 className="text-sm font-semibold text-gray-600 mb-2">Select Time</h3>
//                       <div className="grid grid-cols-2 gap-2">
//                         {dateTime[selectedDate].map((slot) => (
//                           <Link
//                             key={slot.showId}
//                             to={`/movies/${movie._id}/${selectedDate}?showId=${slot.showId}`}
//                             className="p-3 bg-primary/10 hover:bg-primary hover:text-white rounded-lg text-center font-medium transition-colors"
//                           >
//                             {new Date(slot.time).toLocaleTimeString('en-US', {
//                               hour: '2-digit',
//                               minute: '2-digit'
//                             })}
//                           </Link>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </>
//               ) : (
//                 <div className="text-center py-8">
//                   <p className="text-gray-500">No shows available</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MovieDetails;

// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { StarIcon, HeartIcon } from "lucide-react";
// import { useAppContext } from "../context/AppContext";
// import toast from "react-hot-toast";
// import Loading from "../components/Loading";

// const MovieDetails = () => {
//   const { id } = useParams();
//   const { axios, toggleFavorite, isFavoriteMovie } = useAppContext();

//   const [movie, setMovie] = useState(null);
//   const [dateTime, setDateTime] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [selectedDate, setSelectedDate] = useState(null);

//   const fetchMovieDetails = async () => {
//     try {
//       const { data } = await axios.get(`/api/show/${id}`);
//       if (data.success) {
//         setMovie(data.movie);
//         setDateTime(data.dateTime);
//         setSelectedDate(Object.keys(data.dateTime)[0]);
//       }
//     } catch {
//       toast.error("Failed to load movie");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchMovieDetails();
//   }, [id]);

//   if (loading) return <Loading />;
//   if (!movie) return <p>Movie not found</p>;

//   const isFav = isFavoriteMovie(movie._id);

//   return (
//     <div className="min-h-screen bg-black text-white">

//       {/* HERO */}
//       <div className="flex gap-8 p-10 max-w-6xl mx-auto">
//         <img
//           src={movie.poster_path}
//           className="w-72 rounded-xl shadow-lg"
//         />

//         <div className="flex-1">
//           <h1 className="text-4xl font-bold">{movie.title}</h1>

//           <div className="flex gap-4 mt-3 text-gray-400">
//             <span>{movie.release_date}</span>
//             <span>{movie.runtime} min</span>
//             <span className="flex items-center gap-1">
//               <StarIcon className="w-4 h-4 text-red-500 fill-red-500" />
//               {movie.vote_average}
//             </span>
//           </div>

//           <button
//             onClick={() => toggleFavorite(movie._id)}
//             className={`mt-5 flex items-center gap-2 px-4 py-2 rounded-full ${
//               isFav ? "bg-red-600" : "bg-gray-800"
//             }`}
//           >
//             <HeartIcon className={`w-5 h-5 ${isFav ? "fill-white" : ""}`} />
//             {isFav ? "Remove Favorite" : "Add Favorite"}
//           </button>

//           <p className="mt-6 text-gray-300">{movie.overview}</p>

//           <div className="flex gap-2 mt-6">
//             {movie.genres.map((g) => (
//               <span key={g} className="px-3 py-1 bg-red-600/20 text-red-400 rounded-full text-sm">
//                 {g}
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* SHOW TIMES */}
//       <div className="max-w-4xl mx-auto p-6">
//         <h2 className="text-2xl font-semibold mb-4">Select Show</h2>

//         {Object.keys(dateTime).map((date) => (
//           <div key={date} className="mb-4">
//             <p className="text-red-500 font-medium mb-2">{date}</p>

//             <div className="flex gap-3 flex-wrap">
//               {dateTime[date].map((slot) => (
//                 <Link
//                   key={slot.showId}
//                   to={`/movies/${movie._id}/${date}?showId=${slot.showId}`}
//                   className="px-4 py-2 bg-gray-800 hover:bg-red-600 rounded-lg"
//                 >
//                   {new Date(slot.time).toLocaleTimeString([], {
//                     hour: "2-digit",
//                     minute: "2-digit",
//                   })}
//                 </Link>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MovieDetails;

// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import {
//   StarIcon,
//   ClockIcon,
//   CalendarIcon,
//   HeartIcon,
// } from "lucide-react";
// import { useAppContext } from "../context/AppContext";
// import toast from "react-hot-toast";
// import Loading from "../components/Loading";

// const MovieDetails = () => {
//   const { id } = useParams();
//   const {
//     axios,
//     user,
//     toggleFavorite,
//     isFavoriteMovie,
//   } = useAppContext();

//   const [movie, setMovie] = useState(null);
//   const [dateTime, setDateTime] = useState({});
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchMovieDetails = async () => {
//     try {
//       setLoading(true);
//       const { data } = await axios.get(`/api/show/${id}`);

//       if (data.success) {
//         setMovie(data.movie);
//         setDateTime(data.dateTime || {});
//         const dates = Object.keys(data.dateTime || {});
//         if (dates.length > 0) setSelectedDate(dates[0]);
//       } else {
//         toast.error(data.message);
//       }
//     } catch {
//       toast.error("Failed to load movie");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchMovieDetails();
//   }, [id]);

//   if (loading) return <Loading />;
//   if (!movie) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-white bg-black">
//         Movie not found
//       </div>
//     );
//   }

//   const isFav = isFavoriteMovie(movie._id);

//   return (
//     <div className="pt-24 min-h-screen bg-black text-white">
//       {/* HERO */}
//       <div className="relative h-[420px]">
//         <img
//           src={movie.poster_path || "https://via.placeholder.com/1920x1080"}
//           alt={movie.title}
//           className="w-full h-full object-cover opacity-30"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

//         <div className="absolute bottom-8 left-0 right-0 px-6 max-w-6xl mx-auto flex gap-6">
//           <img
//             src={movie.poster_path || "https://via.placeholder.com/300x450"}
//             alt={movie.title}
//             className="w-48 h-72 object-cover rounded-xl shadow-xl"
//           />

//           <div>
//             <h1 className="text-4xl font-bold mb-3">{movie.title}</h1>

//             <div className="flex items-center gap-6 text-gray-300 text-sm">
//               <span className="flex items-center gap-1">
//                 <StarIcon className="w-5 h-5 text-red-500 fill-red-500" />
//                 {movie.vote_average?.toFixed(1)}
//               </span>

//               <span className="flex items-center gap-1">
//                 <ClockIcon className="w-4 h-4" />
//                 {movie.runtime} min
//               </span>

//               <span className="flex items-center gap-1">
//                 <CalendarIcon className="w-4 h-4" />
//                 {movie.release_date}
//               </span>
//             </div>

//             {/* FAVORITE BUTTON */}
//             <button
//               onClick={() => toggleFavorite(movie._id)}
//               className={`mt-5 flex items-center gap-2 px-5 py-2 rounded-full transition
//                 ${isFav ? "bg-red-600" : "bg-gray-800 hover:bg-gray-700"}
//               `}
//             >
//               <HeartIcon
//                 className={`w-5 h-5 ${
//                   isFav ? "fill-white text-white" : "text-gray-300"
//                 }`}
//               />
//               {isFav ? "Remove Favorite" : "Add Favorite"}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* CONTENT */}
//       <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-10">
//         {/* LEFT */}
//         <div className="md:col-span-2">
//           {/* OVERVIEW */}
//           <section className="mb-8">
//             <h2 className="text-2xl font-semibold mb-3">Overview</h2>
//             <p className="text-gray-300 leading-relaxed">
//               {movie.overview || "No description available."}
//             </p>
//           </section>

//           {/* GENRES */}
//           {movie.genres?.length > 0 && (
//             <section className="mb-8">
//               <h2 className="text-2xl font-semibold mb-3">Genres</h2>
//               <div className="flex flex-wrap gap-3">
//                 {movie.genres.map((genre, i) => (
//                   <span
//                     key={i}
//                     className="px-4 py-2 rounded-full bg-red-600/10 text-red-500 text-sm font-medium"
//                   >
//                     {genre}
//                   </span>
//                 ))}
//               </div>
//             </section>
//           )}

//           {/* CAST */}
//           {movie.casts?.length > 0 && (
//             <section>
//               <h2 className="text-2xl font-semibold mb-4">Cast</h2>
//               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//                 {movie.casts.map((cast, i) => (
//                   <div
//                     key={i}
//                     className="bg-gray-900 rounded-xl p-4 text-center hover:bg-gray-800 transition"
//                   >
//                     <div className="w-16 h-16 mx-auto rounded-full bg-red-600 flex items-center justify-center text-xl font-bold">
//                       {cast.charAt(0)}
//                     </div>
//                     <p className="mt-3 text-sm text-gray-200 truncate">
//                       {cast}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </section>
//           )}
//         </div>

//         {/* RIGHT – SHOW TIMES */}
//         <div className="bg-gray-900 rounded-xl p-6 h-fit sticky top-28">
//           <h2 className="text-xl font-semibold mb-4">Book Tickets</h2>

//           {Object.keys(dateTime).length > 0 ? (
//             <>
//               <div className="space-y-2 mb-5">
//                 {Object.keys(dateTime).map((date) => (
//                   <button
//                     key={date}
//                     onClick={() => setSelectedDate(date)}
//                     className={`w-full px-4 py-3 rounded-lg text-left transition
//                       ${
//                         selectedDate === date
//                           ? "bg-red-600"
//                           : "bg-gray-800 hover:bg-gray-700"
//                       }
//                     `}
//                   >
//                     {new Date(date).toDateString()}
//                   </button>
//                 ))}
//               </div>

//               {selectedDate && (
//                 <div className="grid grid-cols-2 gap-3">
//                   {dateTime[selectedDate].map((slot) => (
//                     <Link
//                       key={slot.showId}
//                       to={`/movies/${movie._id}/${selectedDate}?showId=${slot.showId}`}
//                       className="bg-red-600/10 hover:bg-red-600 text-center py-3 rounded-lg transition"
//                     >
//                       {new Date(slot.time).toLocaleTimeString([], {
//                         hour: "2-digit",
//                         minute: "2-digit",
//                       })}
//                     </Link>
//                   ))}
//                 </div>
//               )}
//             </>
//           ) : (
//             <p className="text-gray-400 text-center">No shows available</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MovieDetails;

// import { HeartIcon, StarIcon } from "lucide-react";
// import { useParams, Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { useAppContext } from "../context/AppContext";
// import Loading from "../components/Loading";

// const MovieDetails = () => {
//   const { id } = useParams();
//   const { axios, toggleFavorite, isFavoriteMovie } = useAppContext();

//   const [movie, setMovie] = useState(null);
//   const [dateTime, setDateTime] = useState({});
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchMovie = async () => {
//       const { data } = await axios.get(`/api/show/${id}`);
//       if (data.success) {
//         setMovie(data.movie);
//         setDateTime(data.dateTime);
//         setSelectedDate(Object.keys(data.dateTime)[0]);
//       }
//       setLoading(false);
//     };
//     fetchMovie();
//   }, [id]);

//   if (loading) return <Loading />;
//   if (!movie) return null;

//   const isFav = isFavoriteMovie(movie._id);

//   return (
//     <div className="bg-black text-white min-h-screen">
//       <div className="relative h-[400px]">
//         <img
//           src={movie.poster_path}
//           className="w-full h-full object-cover opacity-40"
//         />
//         <div className="absolute bottom-6 left-6">
//           <h1 className="text-4xl font-bold">{movie.title}</h1>
//           <div className="flex items-center gap-2 mt-2">
//             <StarIcon className="w-5 h-5 fill-red-500 text-red-500" />
//             {movie.vote_average}
//           </div>

//           <button
//             onClick={() => toggleFavorite(movie._id)}
//             className={`mt-4 px-5 py-2 rounded-full flex items-center gap-2 ${
//               isFav ? "bg-red-600" : "bg-gray-800"
//             }`}
//           >
//             <HeartIcon
//               className={`w-5 h-5 ${
//                 isFav ? "fill-white text-white" : "text-gray-400"
//               }`}
//             />
//             {isFav ? "Remove Favorite" : "Add Favorite"}
//           </button>
//         </div>
//       </div>

//       <div className="p-6 max-w-5xl mx-auto">
//         <p className="text-gray-300">{movie.overview}</p>

//         <h3 className="mt-6 text-xl font-semibold">Cast</h3>
//         <div className="flex flex-wrap gap-3 mt-2">
//           {movie.casts.map((cast, i) => (
//             <span
//               key={i}
//               className="bg-red-600/20 text-red-500 px-3 py-1 rounded-full text-sm"
//             >
//               {cast}
//             </span>
//           ))}
//         </div>

//         <h3 className="mt-8 text-xl font-semibold">Show Times</h3>
//         {selectedDate &&
//           dateTime[selectedDate]?.map((slot) => (
//             <Link
//               key={slot.showId}
//               to={`/movies/${movie._id}/${selectedDate}?showId=${slot.showId}`}
//               className="inline-block bg-red-600 px-4 py-2 rounded-lg mr-2 mt-3"
//             >
//               {new Date(slot.time).toLocaleTimeString()}
//             </Link>
//           ))}
//       </div>
//     </div>
//   );
// };

// export default MovieDetails;

// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { StarIcon, ClockIcon, CalendarIcon, HeartIcon } from "lucide-react";
// import { useAppContext } from "../context/AppContext";
// import Loading from "../components/Loading";

// const MovieDetails = () => {
//   const { id } = useParams();
//   const { axios, toggleFavorite, isFavoriteMovie } = useAppContext();

//   const [movie, setMovie] = useState(null);
//   const [dateTime, setDateTime] = useState({});
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchMovieDetails = async () => {
//       try {
//         const { data } = await axios.get(`/api/show/${id}`);
//         if (data.success) {
//           setMovie(data.movie);
//           setDateTime(data.dateTime);
//           setSelectedDate(Object.keys(data.dateTime)[0]);
//         }
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMovieDetails();
//   }, [id]);

//   if (loading) return <Loading />;
//   if (!movie) return null;

//   const isFav = isFavoriteMovie(movie._id);

//   return (
//     <div className="bg-black text-white min-h-screen pt-16">
//       {/* HERO */}
//       <div className="relative h-[420px]">
//         <img
//           src={movie.poster_path}
//           alt={movie.title}
//           className="w-full h-full object-cover opacity-40"
//         />

//         <div className="absolute bottom-6 left-6 flex gap-6">
//           <img
//             src={movie.poster_path}
//             className="w-48 h-72 object-cover rounded-lg shadow-xl"
//           />

//           <div>
//             <h1 className="text-4xl font-bold">{movie.title}</h1>

//             <div className="flex items-center gap-4 mt-3 text-sm text-gray-300">
//               <span className="flex items-center gap-1">
//                 <StarIcon className="w-4 h-4 text-red-500 fill-red-500" />
//                 {movie.vote_average}
//               </span>
//               <span className="flex items-center gap-1">
//                 <ClockIcon className="w-4 h-4" />
//                 {movie.runtime} min
//               </span>
//               <span className="flex items-center gap-1">
//                 <CalendarIcon className="w-4 h-4" />
//                 {movie.release_date}
//               </span>
//             </div>

//             <button
//               onClick={() => toggleFavorite(movie._id)}
//               className={`mt-4 flex items-center gap-2 px-5 py-2 rounded-full transition
//                 ${isFav ? "bg-red-600" : "bg-gray-800"}
//               `}
//             >
//               <HeartIcon
//                 className={`w-5 h-5 ${
//                   isFav ? "fill-white text-white" : "text-gray-400"
//                 }`}
//               />
//               {isFav ? "Remove Favorite" : "Add Favorite"}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* CONTENT */}
//       <div className="max-w-6xl mx-auto px-6 py-10">
//         <h2 className="text-xl font-semibold mb-2">Overview</h2>
//         <p className="text-gray-300 leading-relaxed">{movie.overview}</p>

//         {/* CAST */}
//         {movie.casts?.length > 0 && (
//           <>
//             <h2 className="text-xl font-semibold mt-8 mb-3">Cast</h2>
//             <div className="flex flex-wrap gap-3">
//               {movie.casts.map((cast, idx) => (
//                 <span
//                   key={idx}
//                   className="px-3 py-1 bg-red-600/20 text-red-400 rounded-full text-sm"
//                 >
//                   {cast}
//                 </span>
//               ))}
//             </div>
//           </>
//         )}

//         {/* SHOW TIMES */}
//         <h2 className="text-xl font-semibold mt-10 mb-4">Show Times</h2>

//         {selectedDate &&
//           dateTime[selectedDate]?.map((slot) => (
//             <Link
//               key={slot.showId}
//               to={`/movies/${movie._id}/${selectedDate}?showId=${slot.showId}`}
//               className="inline-block mr-3 mb-3 px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700"
//             >
//               {new Date(slot.time).toLocaleTimeString([], {
//                 hour: "2-digit",
//                 minute: "2-digit",
//               })}
//             </Link>
//           ))}
//       </div>
//     </div>
//   );
// };

// export default MovieDetails;

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, Clock, Calendar, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import Loading from "../components/Loading";

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
    <div className="bg-black text-white min-h-screen pt-16">
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
                  {movie.runtime} min
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

        {/* CAST */}
        {movie.casts && movie.casts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-red-500">Cast</h2>
            <div className="flex flex-wrap gap-3">
              {movie.casts.map((cast, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-zinc-900 text-gray-300 rounded-lg border border-zinc-800 hover:border-red-900 transition"
                >
                  {cast}
                </span>
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