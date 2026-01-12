// // // import React from 'react'
// // // import Navbar from './components/Navbar'
// // // import { Route, Routes, useLocation } from 'react-router-dom'
// // // import Home from './pages/Home'
// // // import Movies from './pages/Movies'
// // // import MovieDetails from './pages/MovieDetails'
// // // import SeatLayout from './pages/SeatLayout'
// // // import MyBookings from './pages/MyBookings'
// // // import Favorite from './pages/Favorite'
// // // import { Toaster } from 'react-hot-toast'
// // // import Footer from './components/Footer'
// // // import Layout from './pages/admin/Layout'
// // // import Dashboard from './pages/admin/Dashboard'
// // // import AddShows from './pages/admin/AddShows'
// // // import ListShows from './pages/admin/ListShows'
// // // import ListBookings from './pages/admin/ListBookings'
// // // import { useAppContext } from './context/AppContext'
// // // import { SignIn } from '@clerk/clerk-react'
// // // import Loading from './components/Loading'

// // // const App = () => {

// // //   const isAdminRoute = useLocation().pathname.startsWith('/admin')

// // //   const { user } = useAppContext()

// // //   return (
// // //     <>
// // //       <Toaster />
// // //       {!isAdminRoute && <Navbar/>}
// // //       <Routes>
// // //         <Route path='/' element={<Home/>} />
// // //         <Route path='/movies' element={<Movies/>} />
// // //         <Route path='/movies/:id' element={<MovieDetails/>} />
// // //         <Route path='/movies/:id/:date' element={<SeatLayout/>} />
// // //         <Route path='/my-bookings' element={<MyBookings/>} />
// // //         <Route path='/loading/:nextUrl' element={<Loading/>} />

// // //         <Route path='/favorite' element={<Favorite/>} />
// // //         <Route path='/admin/*' element={user ? <Layout/> : (
// // //           <div className='min-h-screen flex justify-center items-center'>
// // //             <SignIn fallbackRedirectUrl={'/admin'} />
// // //           </div>
// // //         )}>
// // //           <Route index element={<Dashboard/>}/>
// // //           <Route path="add-shows" element={<AddShows/>}/>
// // //           <Route path="list-shows" element={<ListShows/>}/>
// // //           <Route path="list-bookings" element={<ListBookings/>}/>
// // //         </Route>
// // //       </Routes>
// // //        {!isAdminRoute && <Footer />}
// // //     </>
// // //   )
// // // }

// // // export default App

// // import React from "react";
// // import { Route, Routes, useLocation, Navigate } from "react-router-dom";
// // import { Toaster } from "react-hot-toast";
// // import { SignIn } from "@clerk/clerk-react";

// // import Navbar from "./components/Navbar";
// // import Footer from "./components/Footer";
// // import Loading from "./components/Loading";

// // import Home from "./pages/Home";
// // import Movies from "./pages/Movies";
// // import MovieDetails from "./pages/MovieDetails";
// // import SeatLayout from "./pages/SeatLayout";
// // import MyBookings from "./pages/MyBookings";
// // import Favorite from "./pages/Favorite";

// // import Layout from "./pages/admin/Layout";
// // import Dashboard from "./pages/admin/Dashboard";
// // import AddShows from "./pages/admin/AddShows";
// // import ListShows from "./pages/admin/ListShows";
// // import ListBookings from "./pages/admin/ListBookings";

// // import { useAppContext } from "./context/AppContext";

// // const App = () => {
// //   const location = useLocation();
// //   const isAdminRoute = location.pathname.startsWith("/admin");

// //   const { user, isAdmin, isLoaded } = useAppContext();

// //   // ⏳ wait until Clerk loads user data
// //   if (!isLoaded) {
// //     return <Loading />;
// //   }

// //   return (
// //     <>
// //       <Toaster />
// //       {!isAdminRoute && <Navbar />}

// //       <Routes>
// //         {/* Public Routes */}
// //         <Route path="/" element={<Home />} />
// //         <Route path="/movies" element={<Movies />} />
// //         <Route path="/movies/:id" element={<MovieDetails />} />
// //         <Route path="/movies/:id/:date" element={<SeatLayout />} />
// //         <Route path="/my-bookings" element={<MyBookings />} />
// //         <Route path="/favorite" element={<Favorite />} />
// //         <Route path="/loading/:nextUrl" element={<Loading />} />

// //         {/* Admin Routes */}
// //         <Route
// //           path="/admin/*"
// //           element={
// //             user && isAdmin ? (
// //               <Layout />
// //             ) : (
// //               <Navigate to="/admin/sign-in" replace />
// //             )
// //           }
// //         >
// //           <Route index element={<Dashboard />} />
// //           <Route path="add-shows" element={<AddShows />} />
// //           <Route path="list-shows" element={<ListShows />} />
// //           <Route path="list-bookings" element={<ListBookings />} />
// //         </Route>

// //         {/* Admin Sign In */}
// //         <Route
// //           path="/admin/sign-in"
// //           element={
// //             <div className="min-h-screen flex justify-center items-center">
// //               <SignIn fallbackRedirectUrl="/admin" />
// //             </div>
// //           }
// //         />
// //       </Routes>

// //       {!isAdminRoute && <Footer />}
// //     </>
// //   );
// // };

// // export default App;

// // import React from "react";
// // import { Route, Routes, useLocation } from "react-router-dom";
// // import { SignIn, useUser } from "@clerk/clerk-react";
// // import { Toaster } from "react-hot-toast";

// // import Navbar from "./components/Navbar";
// // import Footer from "./components/Footer";
// // import Loading from "./components/Loading";

// // import Home from "./pages/Home";
// // import Movies from "./pages/Movies";
// // import MovieDetails from "./pages/MovieDetails";
// // import SeatLayout from "./pages/SeatLayout";
// // import MyBookings from "./pages/MyBookings";
// // import Favorite from "./pages/Favorite";

// // import Layout from "./pages/admin/Layout";
// // import Dashboard from "./pages/admin/Dashboard";
// // import AddShows from "./pages/admin/AddShows";
// // import ListShows from "./pages/admin/ListShows";
// // import ListBookings from "./pages/admin/ListBookings";

// // const App = () => {
// //   const location = useLocation();
// //   const isAdminRoute = location.pathname.startsWith("/admin");

// //   const { isLoaded, isSignedIn } = useUser();

// //   // ⛔ WAIT for Clerk
// //   if (!isLoaded) {
// //     return <Loading />;
// //   }

// //   return (
// //     <>
// //       <Toaster />
// //       {!isAdminRoute && <Navbar />}

// //       <Routes>
// //         {/* Public Routes */}
// //         <Route path="/" element={<Home />} />
// //         <Route path="/movies" element={<Movies />} />
// //         <Route path="/movies/:id" element={<MovieDetails />} />
// //         <Route path="/movies/:id/:date" element={<SeatLayout />} />
// //         <Route path="/my-bookings" element={<MyBookings />} />
// //         <Route path="/favorite" element={<Favorite />} />

// //         {/* Admin Routes */}
// //         <Route
// //           path="/admin/*"
// //           element={
// //             isSignedIn ? (
// //               <Layout />
// //             ) : (
// //               <div className="min-h-screen flex items-center justify-center">
// //                 <SignIn redirectUrl="/admin" />
// //               </div>
// //             )
// //           }
// //         >
// //           <Route index element={<Dashboard />} />
// //           <Route path="add-shows" element={<AddShows />} />
// //           <Route path="list-shows" element={<ListShows />} />
// //           <Route path="list-bookings" element={<ListBookings />} />
// //         </Route>
// //       </Routes>

// //       {!isAdminRoute && <Footer />}
// //     </>
// //   );
// // };

// // export default App;
// import React from "react";
// import { Routes, Route, useLocation } from "react-router-dom";
// import { Toaster } from "react-hot-toast";

// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";

// import Home from "./pages/Home";
// import Movies from "./pages/Movies";
// import MovieDetails from "./pages/MovieDetails";
// import SeatLayout from "./pages/SeatLayout";
// import MyBookings from "./pages/MyBookings";
// import Favorite from "./pages/Favorite";
// import Loading from "./components/Loading";

// import Layout from "./pages/admin/Layout";
// import Dashboard from "./pages/admin/Dashboard";
// import AddShows from "./pages/admin/AddShows";
// import ListShows from "./pages/admin/ListShows";
// import ListBookings from "./pages/admin/ListBookings";

// const App = () => {
//   const isAdminRoute = useLocation().pathname.startsWith("/admin");

//   return (
//     <>
//       <Toaster />
//       {!isAdminRoute && <Navbar />}

//       <Routes>
//         {/* Public routes */}
//         <Route path="/" element={<Home />} />
//         <Route path="/movies" element={<Movies />} />
//         <Route path="/movies/:id" element={<MovieDetails />} />
//         <Route path="/movies/:id/:date" element={<SeatLayout />} />
//         <Route path="/my-bookings" element={<MyBookings />} />
//         <Route path="/favorite" element={<Favorite />} />
//         <Route path="/loading/:nextUrl" element={<Loading />} />

//         {/* Admin routes */}
//         <Route path="/admin/*" element={<Layout />}>
//           <Route index element={<Dashboard />} />
//           <Route path="add-shows" element={<AddShows />} />
//           <Route path="list-shows" element={<ListShows />} />
//           <Route path="list-bookings" element={<ListBookings />} />
//         </Route>
//       </Routes>

//       {!isAdminRoute && <Footer />}
//     </>
//   );
// };

// export default App;

// import React from "react";
// import { Routes, Route, useLocation } from "react-router-dom";
// import { Toaster } from "react-hot-toast";

// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";

// import Home from "./pages/Home";
// import Movies from "./pages/Movies";
// import MovieDetails from "./pages/MovieDetails";
// import SeatLayout from "./pages/SeatLayout";
// import MyBookings from "./pages/MyBookings";
// import Favorite from "./pages/Favorite";
// import Loading from "./components/Loading";
// import DebugPage from "./pages/DebugPage"; // 🆕 Add this

// import Layout from "./pages/admin/Layout";
// import Dashboard from "./pages/admin/Dashboard";
// import AddShows from "./pages/admin/AddShows";
// import ListShows from "./pages/admin/ListShows";
// import ListBookings from "./pages/admin/ListBookings";

// const App = () => {
//   const isAdminRoute = useLocation().pathname.startsWith("/admin");

//   return (
//     <>
//       <Toaster />
//       {!isAdminRoute && <Navbar />}

//       <Routes>
//         {/* Public routes */}
//         <Route path="/" element={<Home />} />
//         <Route path="/movies" element={<Movies />} />
//         <Route path="/movies/:id" element={<MovieDetails />} />
//         <Route path="/movies/:id/:date" element={<SeatLayout />} />
//         <Route path="/my-bookings" element={<MyBookings />} />
//         <Route path="/favorite" element={<Favorite />} />
//         <Route path="/loading/:nextUrl" element={<Loading />} />
//         <Route path="/debug" element={<DebugPage />} /> {/* 🆕 Add this */}

//         {/* Admin routes */}
//         <Route path="/admin/*" element={<Layout />}>
//           <Route index element={<Dashboard />} />
//           <Route path="add-shows" element={<AddShows />} />
//           <Route path="list-shows" element={<ListShows />} />
//           <Route path="list-bookings" element={<ListBookings />} />
//         </Route>
//       </Routes>

//       {!isAdminRoute && <Footer />}
//     </>
//   );
// };

// export default App;

// import React from "react";
// import { Routes, Route, useLocation } from "react-router-dom";
// import { Toaster } from "react-hot-toast";

// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";

// import Home from "./pages/Home";
// import Movies from "./pages/Movies";
// import MovieDetails from "./pages/MovieDetails";
// import SeatLayout from "./pages/SeatLayout";
// import MyBookings from "./pages/MyBookings";
// import Favorite from "./pages/Favorite";
// import Loading from "./components/Loading";

// import Layout from "./pages/admin/Layout";
// import Dashboard from "./pages/admin/Dashboard";
// import AddShows from "./pages/admin/AddShows";
// import ListShows from "./pages/admin/ListShows";
// import ListBookings from "./pages/admin/ListBookings";

// const App = () => {
//   const isAdminRoute = useLocation().pathname.startsWith("/admin");

//   return (
//     <>
//       <Toaster />
//       {!isAdminRoute && <Navbar />}

//       <Routes>
//         {/* Public routes */}
//         <Route path="/" element={<Home />} />
//         <Route path="/movies" element={<Movies />} />
//         <Route path="/movies/:id" element={<MovieDetails />} />
//         <Route path="/movies/:id/:date" element={<SeatLayout />} />
//         <Route path="/my-bookings" element={<MyBookings />} />
//         <Route path="/favorite" element={<Favorite />} />
//         <Route path="/loading/:nextUrl" element={<Loading />} />

//         {/* Admin routes */}
//         <Route path="/admin/*" element={<Layout />}>
//           <Route index element={<Dashboard />} />
//           <Route path="add-shows" element={<AddShows />} />
//           <Route path="list-shows" element={<ListShows />} />
//           <Route path="list-bookings" element={<ListBookings />} />
//         </Route>
//       </Routes>

//       {!isAdminRoute && <Footer />}
//     </>
//   );
// };

// export default App;
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import SeatLayout from "./pages/SeatLayout";
import MyBookings from "./pages/MyBookings";
import Favorite from "./pages/Favorite";
import Loading from "./components/Loading";

import Layout from "./pages/admin/Layout";
import Dashboard from "./pages/admin/Dashboard";
import AddShows from "./pages/admin/AddShows";
import ListShows from "./pages/admin/ListShows";
import ListBookings from "./pages/admin/ListBookings";

const App = () => {
  const isAdminRoute = useLocation().pathname.startsWith("/admin");

  return (
    <>
      <Toaster position="top-center" />
      {!isAdminRoute && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/movies/:id/:date" element={<SeatLayout />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/loading/:nextUrl" element={<Loading />} />

        <Route path="/admin/*" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="add-shows" element={<AddShows />} />
          <Route path="list-shows" element={<ListShows />} />
          <Route path="list-bookings" element={<ListBookings />} />
        </Route>
      </Routes>

      {!isAdminRoute && <Footer />}
    </>
  );
};

export default App;