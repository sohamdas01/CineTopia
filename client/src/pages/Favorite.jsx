// import React from 'react'
// import MovieCard from '../components/MovieCard'
// import BlurCircle from '../components/BlurCircle'
// import { useAppContext } from '../context/AppContext'

// const Favorite = () => {

//   const {favoriteMovies} = useAppContext()

//   return favoriteMovies.length > 0 ? (
//     <div className='relative my-40 mb-60 px-6 md:px-16 lg:px-40 xl:px-44 overflow-hidden min-h-[80vh]'>

//       <BlurCircle top="150px" left="0px"/>
//       <BlurCircle bottom="50px" right="50px"/>

//       <h1 className='text-lg font-medium my-4'>Your Favorite Movies</h1>
//       <div className='flex flex-wrap max-sm:justify-center gap-8'>
//         {favoriteMovies.map((movie)=> (
//           <MovieCard movie={movie} key={movie._id}/>
//         ))}
//       </div>
//     </div>
//   ) : (
//     <div className='flex flex-col items-center justify-center h-screen'>
//       <h1 className='text-3xl font-bold text-center'>No movies available</h1>
//     </div>
//   )
// }

// export default Favorite

// import React from 'react';
// import { useAppContext } from '../context/AppContext';
// import { Link } from 'react-router-dom';
// import { StarIcon, HeartIcon } from 'lucide-react';
// import Loading from '../components/Loading';
// import Title from '../components/admin/Title';

// const Favorite = () => {
//   const { favoriteMovies, loadingFavorites, toggleFavorite, user } = useAppContext();
//   const currency = import.meta.env.VITE_CURRENCY;

//   if (!user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <HeartIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//           <p className="text-xl text-gray-600 mb-4">Please login to see your favorites</p>
//           <Link to="/" className="text-primary hover:underline">
//             Go to Home
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   if (loadingFavorites) {
//     return <Loading />;
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <Title text1="My" text2="Favorites" />

//       {favoriteMovies.length > 0 ? (
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-8">
//           {favoriteMovies.map((movie) => (
//             <div key={movie._id} className="group relative">
//               <Link to={`/movies/${movie._id}`}>
//                 <img
//                   src={movie.poster_path}
//                   alt={movie.title}
//                   className="w-full h-72 object-cover rounded-lg shadow-md group-hover:shadow-xl transition-shadow"
//                   onError={(e) => {
//                     e.target.src = "https://via.placeholder.com/300x450?text=No+Image";
//                   }}
//                 />
//                 <div className="mt-2">
//                   <p className="font-semibold truncate" title={movie.title}>
//                     {movie.title}
//                   </p>
//                   <div className="flex items-center justify-between mt-1">
//                     <div className="flex items-center gap-1 text-sm">
//                       <StarIcon className="w-4 h-4 text-yellow-500 fill-yellow-500" />
//                       {movie.vote_average?.toFixed(1) ?? "N/A"}
//                     </div>
//                   </div>
//                 </div>
//               </Link>
              
//               {/* Remove from favorites button */}
//               <button
//                 onClick={() => toggleFavorite(movie._id)}
//                 className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
//                 title="Remove from favorites"
//               >
//                 <HeartIcon className="w-5 h-5 fill-current" />
//               </button>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="text-center py-20">
//           <HeartIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//           <p className="text-xl text-gray-600 mb-2">No favorite movies yet</p>
//           <p className="text-gray-400 mb-4">Start adding movies to your favorites!</p>
//           <Link 
//             to="/movies" 
//             className="inline-block px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
//           >
//             Browse Movies
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Favorite;

// import React from 'react';
// import { useAppContext } from '../context/AppContext';
// import { Link } from 'react-router-dom';
// import { StarIcon, HeartIcon } from 'lucide-react';
// import Loading from '../components/Loading';

// const Favorite = () => {
//   const { favoriteMovies, toggleFavorite, user, isLoaded } = useAppContext();

//   if (!isLoaded) return <Loading />;

//   if (!user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <HeartIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//           <p className="text-xl text-gray-600 mb-4">Please login to see favorites</p>
//           <Link to="/" className="text-primary hover:underline">
//             Go to Home
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-8">My Favorites</h1>

//       {favoriteMovies.length > 0 ? (
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
//           {favoriteMovies.map((movie) => (
//             <div key={movie._id} className="group relative">
//               <Link to={`/movies/${movie._id}`}>
//                 <img
//                   src={movie.poster_path || "https://via.placeholder.com/300x450"}
//                   alt={movie.title}
//                   className="w-full h-72 object-cover rounded-lg shadow-md group-hover:shadow-xl transition-shadow"
//                 />
//                 <div className="mt-2">
//                   <p className="font-semibold truncate" title={movie.title}>
//                     {movie.title}
//                   </p>
//                   <div className="flex items-center gap-1 text-sm">
//                     <StarIcon className="w-4 h-4 text-yellow-500 fill-yellow-500" />
//                     {movie.vote_average?.toFixed(1) || "N/A"}
//                   </div>
//                 </div>
//               </Link>
              
//               <button
//                 onClick={() => toggleFavorite(movie._id)}
//                 className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
//               >
//                 <HeartIcon className="w-5 h-5 fill-current" />
//               </button>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="text-center py-20">
//           <HeartIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//           <p className="text-xl text-gray-600 mb-2">No favorites yet</p>
//           <Link 
//             to="/movies" 
//             className="inline-block px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
//           >
//             Browse Movies
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Favorite;

// import { useAppContext } from "../context/AppContext";
// import { Link } from "react-router-dom";
// import { HeartIcon, StarIcon } from "lucide-react";

// const Favorite = () => {
//   const { favoriteMovies, toggleFavorite } = useAppContext();

//   if (favoriteMovies.length === 0) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-white bg-black">
//         No favorites yet
//       </div>
//     );
//   }

//   return (
//     <div className="bg-black min-h-screen p-6">
//       <h1 className="text-white text-3xl mb-6">My Favorites</h1>

//       <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//         {favoriteMovies.map((movie) => (
//           <div key={movie._id} className="relative">
//             <Link to={`/movies/${movie._id}`}>
//               <img
//                 src={movie.poster_path}
//                 className="h-72 w-full object-cover rounded-lg"
//               />
//             </Link>

//             <button
//               onClick={() => toggleFavorite(movie._id)}
//               className="absolute top-2 right-2 bg-red-600 p-2 rounded-full"
//             >
//               <HeartIcon className="w-5 h-5 fill-white text-white" />
//             </button>

//             <p className="text-white mt-2 font-semibold truncate">
//               {movie.title}
//             </p>
//             <div className="flex items-center gap-1 text-sm text-gray-400">
//               <StarIcon className="w-4 h-4 fill-red-500 text-red-500" />
//               {movie.vote_average}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Favorite;

import { useAppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import { Heart, Star } from "lucide-react";
import Loading from "../components/Loading";

const Favorite = () => {
  const { favoriteMovies, toggleFavorite, favoritesLoading, user, isLoaded } = useAppContext();

  if (!isLoaded || favoritesLoading) {
    return <Loading />;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black pt-20">
        <div className="text-center">
          <Heart className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-xl">Please login to view favorites</p>
        </div>
      </div>
    );
  }

  if (favoriteMovies.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black pt-20">
        <div className="text-center">
          <Heart className="w-16 h-16 text-red-500 mx-auto mb-4 opacity-50" />
          <p className="text-xl mb-4">No favorites yet</p>
          <Link
            to="/movies"
            className="inline-block px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition"
          >
            Browse Movies
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen p-6 pt-24">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-white text-4xl font-bold mb-8 flex items-center gap-3">
          <Heart className="w-10 h-10 text-red-500 fill-red-500" />
          My Favorites
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {favoriteMovies.map((movie) => (
            <div key={movie._id} className="relative group">
              <Link to={`/movies/${movie._id}`}>
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={movie.poster_path}
                    alt={movie.title}
                    className="h-80 w-full object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleFavorite(movie._id);
                }}
                className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 p-2 rounded-full transition-all transform hover:scale-110 shadow-lg"
              >
                <Heart className="w-5 h-5 fill-white text-white" />
              </button>

              <div className="mt-3">
                <p className="text-white font-semibold truncate">{movie.title}</p>
                <div className="flex items-center gap-1 text-sm text-gray-400">
                  <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  {movie.vote_average}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorite;