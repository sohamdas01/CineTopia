// import { ChartLineIcon, CircleDollarSignIcon, PlayCircleIcon, StarIcon, UsersIcon } from 'lucide-react';
// import React, { useEffect, useState } from 'react'
// import { dummyDashboardData } from '../../assets/assets';
// import Loading from '../../components/Loading';
// import Title from '../../components/admin/Title';
// import BlurCircle from '../../components/BlurCircle';
// import { dateFormat } from '../../lib/dateFormat';
// import { useAppContext } from '../../context/AppContext';
// import toast from 'react-hot-toast';

// const Dashboard = () => {

//     const {axios, getToken, user, image_base_url} = useAppContext()

//     const currency = import.meta.env.VITE_CURRENCY

//     const [dashboardData, setDashboardData] = useState({
//         totalBookings: 0,
//         totalRevenue: 0,
//         activeShows: [],
//         totalUser: 0
//     });
//     const [loading, setLoading] = useState(true);

//     const dashboardCards = [
//         { title: "Total Bookings", value: dashboardData.totalBookings || "0", icon: ChartLineIcon },
//         { title: "Total Revenue", value: currency + dashboardData.totalRevenue || "0", icon: CircleDollarSignIcon },
//         { title: "Active Shows", value: dashboardData.activeShows.length || "0", icon: PlayCircleIcon },
//         { title: "Total Users", value: dashboardData.totalUser || "0", icon: UsersIcon }
//     ]

//     const fetchDashboardData = async () => {
//         try {
//            const { data } = await axios.get("/api/admin/dashboard", {headers: { Authorization: `Bearer ${await getToken()}`}}) 
//            if (data.success) {
//             setDashboardData(data.dashboardData)
//             setLoading(false)
//            }else{
//             toast.error(data.message)
//            }
//         } catch (error) {
//             toast.error("Error fetching dashboard data:", error)
//         }
//     };

//     useEffect(() => {
//         if(user){
//             fetchDashboardData();
//         }   
//     }, [user]);

//   return !loading ? (
//     <>
//       <Title text1="Admin" text2="Dashboard"/>

//       <div className="relative flex flex-wrap gap-4 mt-6">
//                 <BlurCircle top="-100px" left="0" />
//                 <div className="flex flex-wrap gap-4 w-full">
//                     {dashboardCards.map((card, index) => (
//                         <div key={index} className="flex items-center justify-between px-4 py-3 bg-primary/10 border border-primary/20 rounded-md max-w-50 w-full">
//                             <div>
//                                 <h1 className="text-sm">{card.title}</h1>
//                                 <p className="text-xl font-medium mt-1">{card.value}</p>
//                             </div>
//                             <card.icon className="w-6 h-6" />
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             <p className="mt-10 text-lg font-medium">Active Shows</p>
//             <div className="relative flex flex-wrap gap-6 mt-4 max-w-5xl">
//                 <BlurCircle top="100px" left="-10%" />
//                 {dashboardData.activeShows.map((show) => (
//                     <div key={show._id} className="w-55 rounded-lg overflow-hidden h-full pb-3 bg-primary/10 border border-primary/20 hover:-translate-y-1 transition duration-300">
//                         <img src={image_base_url + show.movie.poster_path} alt='' className="h-60 w-full object-cover" />
//                         <p className="font-medium p-2 truncate">{show.movie.title}</p>
//                         <div className="flex items-center justify-between px-2">
//                             <p className="text-lg font-medium">{currency} {show.showPrice}</p>
//                             <p className="flex items-center gap-1 text-sm text-gray-400 mt-1 pr-1">
//                                 <StarIcon className="w-4 h-4 text-primary fill-primary" />
//                                 {show.movie.vote_average.toFixed(1)}
//                             </p>
//                         </div>
//                         <p className="px-2 pt-2 text-sm text-gray-500">{dateFormat(show.showDateTime)}</p>
//                     </div>
//                 ))}
//             </div>

//     </>
//   ) : <Loading />
// }

// export default Dashboard


// import React, { useEffect, useState } from "react";
// import { ChartLineIcon, CircleDollarSignIcon, PlayCircleIcon, StarIcon, UsersIcon } from "lucide-react";
// import Loading from "../../components/Loading";
// import Title from "../../components/admin/Title";
// import BlurCircle from "../../components/BlurCircle";
// import { dateFormat } from "../../lib/dateFormat";
// import { useAppContext } from "../../context/AppContext";
// import toast from "react-hot-toast";

// const Dashboard = () => {
//   const { axios, getToken, user } = useAppContext();
//   const currency = import.meta.env.VITE_CURRENCY;

//   const [dashboardData, setDashboardData] = useState({
//     totalBookings: 0,
//     totalRevenue: 0,
//     activeShows: [],
//     totalUser: 0,
//   });

//   const [loading, setLoading] = useState(true);

//   const fetchDashboardData = async () => {
//     try {
//       const { data } = await axios.get("/api/admin/dashboard", {
//         headers: { Authorization: `Bearer ${await getToken()}` },
//       });

//       if (data.success) {
//         setDashboardData(data.dashboardData);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error("Failed to load dashboard");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (user) fetchDashboardData();
//   }, [user]);

//   if (loading) return <Loading />;

//   const dashboardCards = [
//     { title: "Total Bookings", value: dashboardData.totalBookings, icon: ChartLineIcon },
//     { title: "Total Revenue", value: currency + dashboardData.totalRevenue, icon: CircleDollarSignIcon },
//     { title: "Active Shows", value: dashboardData.activeShows.length, icon: PlayCircleIcon },
//     { title: "Total Users", value: dashboardData.totalUser, icon: UsersIcon },
//   ];

//   return (
//     <>
//       <Title text1="Admin" text2="Dashboard" />

//       <div className="relative flex flex-wrap gap-4 mt-6">
//         <BlurCircle top="-100px" left="0" />
//         <div className="flex flex-wrap gap-4 w-full">
//           {dashboardCards.map((card, index) => (
//             <div key={index} className="flex items-center justify-between px-4 py-3 bg-primary/10 border border-primary/20 rounded-md w-full max-w-52">
//               <div>
//                 <h1 className="text-sm">{card.title}</h1>
//                 <p className="text-xl font-medium mt-1">{card.value}</p>
//               </div>
//               <card.icon className="w-6 h-6" />
//             </div>
//           ))}
//         </div>
//       </div>

//       <p className="mt-10 text-lg font-medium">Active Shows</p>

//       <div className="relative flex flex-wrap gap-6 mt-4 max-w-5xl">
//         <BlurCircle top="100px" left="-10%" />
//         {dashboardData.activeShows.map((show) => (
//           <div key={show._id} className="w-56 rounded-lg overflow-hidden bg-primary/10 border border-primary/20">
//             <img src={show.movie.poster_path} alt="" className="h-60 w-full object-cover" />
//             <p className="font-medium p-2 truncate">{show.movie.title}</p>
//             <div className="flex items-center justify-between px-2">
//               <p className="text-lg font-medium">{currency} {show.showPrice}</p>
//               <p className="flex items-center gap-1 text-sm text-gray-400">
//                 <StarIcon className="w-4 h-4 text-primary fill-primary" />
//                 {show.movie.vote_average?.toFixed(1) ?? "N/A"}
//               </p>
//             </div>
//             <p className="px-2 pb-2 text-sm text-gray-500">{dateFormat(show.showDateTime)}</p>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default Dashboard;


// import React, { useEffect, useState } from "react";
// import {
//   ChartLineIcon,
//   CircleDollarSignIcon,
//   PlayCircleIcon,
//   StarIcon,
//   UsersIcon,
// } from "lucide-react";
// import Loading from "../../components/Loading";
// import Title from "../../components/admin/Title";
// import BlurCircle from "../../components/BlurCircle";
// import { dateFormat } from "../../lib/dateFormat";
// import { useAppContext } from "../../context/AppContext";
// import toast from "react-hot-toast";

// const Dashboard = () => {
//   const { axios, user } = useAppContext();
//   const currency = import.meta.env.VITE_CURRENCY;

//   const [dashboardData, setDashboardData] = useState({
//     totalBookings: 0,
//     totalRevenue: 0,
//     activeShows: [],
//     totalUser: 0,
//   });

//   const [loading, setLoading] = useState(true);

//   const fetchDashboardData = async () => {
//     try {
//       const { data } = await axios.get("/api/admin/dashboard");
//       if (data.success) {
//         setDashboardData(data.dashboardData);
//       } else {
//         toast.error(data.message);
//       }
//     } catch {
//       toast.error("Failed to load dashboard");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (user) fetchDashboardData();
//   }, [user]);

//   if (loading) return <Loading />;

//   return (
//     <>
//       <Title text1="Admin" text2="Dashboard" />

//       <div className="flex flex-wrap gap-4 mt-6">
//         <BlurCircle top="-100px" left="0" />

//         {[
//           { label: "Total Bookings", value: dashboardData.totalBookings, icon: ChartLineIcon },
//           { label: "Total Revenue", value: currency + dashboardData.totalRevenue, icon: CircleDollarSignIcon },
//           { label: "Active Shows", value: dashboardData.activeShows.length, icon: PlayCircleIcon },
//           { label: "Total Users", value: dashboardData.totalUser, icon: UsersIcon },
//         ].map((card, i) => (
//           <div
//             key={i}
//             className="flex items-center justify-between px-4 py-3 bg-primary/10 border rounded w-52"
//           >
//             <div>
//               <p className="text-sm">{card.label}</p>
//               <p className="text-xl font-medium">{card.value}</p>
//             </div>
//             <card.icon className="w-6 h-6" />
//           </div>
//         ))}
//       </div>

//       <p className="mt-10 text-lg font-medium">Active Shows</p>

//       <div className="flex flex-wrap gap-6 mt-4">
//         {dashboardData.activeShows.map((show) => (
//           <div key={show._id} className="w-56 border rounded overflow-hidden">
//             <img src={show.movie.poster_path} alt="" className="h-60 w-full object-cover" />
//             <p className="font-medium p-2 truncate">{show.movie.title}</p>
//             <div className="flex justify-between px-2">
//               <p>{currency} {show.showPrice}</p>
//               <p className="flex items-center gap-1 text-sm">
//                 <StarIcon className="w-4 h-4 text-primary fill-primary" />
//                 {show.movie.vote_average.toFixed(1)}
//               </p>
//             </div>
//             <p className="px-2 pb-2 text-sm">{dateFormat(show.showDateTime)}</p>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default Dashboard;

// import React, { useEffect, useState } from "react";
// import {
//   TrendingUpIcon,
//   DollarSignIcon,
//   PlayCircleIcon,
//   StarIcon,
//   UsersIcon,
// } from "lucide-react";
// import Loading from "../../components/Loading";
// import Title from "../../components/admin/Title";
// import BlurCircle from "../../components/BlurCircle";
// import { dateFormat } from "../../lib/dateFormat";
// import { useAppContext } from "../../context/AppContext";
// import toast from "react-hot-toast";

// const Dashboard = () => {
//   const { axios, user } = useAppContext();
//   const currency = import.meta.env.VITE_CURRENCY;

//   const [dashboardData, setDashboardData] = useState({
//     totalBookings: 0,
//     totalRevenue: 0,
//     activeShows: [],
//     totalUser: 0,
//   });

//   const [loading, setLoading] = useState(true);

//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true);
//       const { data } = await axios.get("/api/admin/dashboard");
      
//       if (data.success) {
//         setDashboardData(data.dashboardData);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to load dashboard data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (user) {
//       fetchDashboardData();
//     }
//   }, [user]);

//   if (loading) return <Loading />;

//   const statsCards = [
//     {
//       label: "Total Bookings",
//       value: dashboardData.totalBookings,
//       icon: TrendingUpIcon,
//       color: "text-blue-600",
//       bgColor: "bg-blue-100",
//     },
//     {
//       label: "Total Revenue",
//       value: `${currency}${dashboardData.totalRevenue.toLocaleString()}`,
//       icon: DollarSignIcon,
//       color: "text-green-600",
//       bgColor: "bg-green-100",
//     },
//     {
//       label: "Active Shows",
//       value: dashboardData.activeShows.length,
//       icon: PlayCircleIcon,
//       color: "text-purple-600",
//       bgColor: "bg-purple-100",
//     },
//     {
//       label: "Total Users",
//       value: dashboardData.totalUser,
//       icon: UsersIcon,
//       color: "text-orange-600",
//       bgColor: "bg-orange-100",
//     },
//   ];

//   return (
//     <>
//       <Title text1="Admin" text2="Dashboard" />

//       {/* Stats Cards */}
//       <div className="flex flex-wrap gap-4 mt-6 relative">
//         <BlurCircle top="-100px" left="0" />

//         {statsCards.map((card, i) => (
//           <div
//             key={i}
//             className="flex items-center justify-between px-6 py-4 bg-white border-2 border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow w-64"
//           >
//             <div>
//               <p className="text-sm text-gray-600 mb-1">{card.label}</p>
//               <p className="text-2xl font-bold text-gray-800">{card.value}</p>
//             </div>
//             <div className={`${card.bgColor} p-3 rounded-lg`}>
//               <card.icon className={`w-6 h-6 ${card.color}`} />
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Active Shows Section */}
//       <div className="mt-12">
//         <div className="flex items-center justify-between mb-6">
//           <h2 className="text-2xl font-bold text-gray-800">Active Shows</h2>
//           <p className="text-gray-600">
//             {dashboardData.activeShows.length} show{dashboardData.activeShows.length !== 1 ? "s" : ""}
//           </p>
//         </div>

//         {dashboardData.activeShows.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {dashboardData.activeShows.map((show) => (
//               <div
//                 key={show._id}
//                 className="bg-white border-2 border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
//               >
//                 <img
//                   src={show.movie.poster_path}
//                   alt={show.movie.title}
//                   className="h-64 w-full object-cover"
//                 />
//                 <div className="p-4">
//                   <p className="font-semibold text-gray-800 truncate mb-2">
//                     {show.movie.title}
//                   </p>
//                   <div className="flex justify-between items-center mb-2">
//                     <p className="text-lg font-bold text-primary">
//                       {currency}{show.showPrice}
//                     </p>
//                     <p className="flex items-center gap-1 text-sm text-gray-600">
//                       <StarIcon className="w-4 h-4 text-yellow-500 fill-yellow-500" />
//                       {show.movie.vote_average?.toFixed(1) ?? "N/A"}
//                     </p>
//                   </div>
//                   <p className="text-sm text-gray-500">
//                     {dateFormat(show.showDateTime)}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-12 bg-gray-50 rounded-xl">
//             <PlayCircleIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//             <p className="text-gray-600 text-lg">No active shows</p>
//             <p className="text-gray-400 text-sm mt-2">Add shows to get started</p>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Dashboard;

// import React, { useEffect, useState } from "react";
// import {
//   TrendingUpIcon,
//   DollarSignIcon,
//   PlayCircleIcon,
//   StarIcon,
//   UsersIcon,
// } from "lucide-react";
// import Loading from "../../components/Loading";
// import Title from "../../components/admin/Title";
// import BlurCircle from "../../components/BlurCircle";
// import { dateFormat } from "../../lib/dateFormat";
// import { useAppContext } from "../../context/AppContext";
// import toast from "react-hot-toast";

// const Dashboard = () => {
//   const { axios, user } = useAppContext();
//   const currency = import.meta.env.VITE_CURRENCY;

//   const [dashboardData, setDashboardData] = useState({
//     totalBookings: 0,
//     totalRevenue: 0,
//     activeShows: [],
//     totalUser: 0,
//   });

//   const [loading, setLoading] = useState(true);

//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true);
//       const { data } = await axios.get("/api/admin/dashboard");
      
//       if (data.success) {
//         setDashboardData(data.dashboardData);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to load dashboard data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (user) {
//       fetchDashboardData();
//     }
//   }, [user]);

//   if (loading) return <Loading />;

//   const statsCards = [
//     {
//       label: "Total Bookings",
//       value: dashboardData.totalBookings,
//       icon: TrendingUpIcon,
//       color: "text-blue-600",
//       bgColor: "bg-blue-100",
//     },
//     {
//       label: "Total Revenue",
//       value: `${currency}${dashboardData.totalRevenue.toLocaleString()}`,
//       icon: DollarSignIcon,
//       color: "text-green-600",
//       bgColor: "bg-green-100",
//     },
//     {
//       label: "Active Shows",
//       value: dashboardData.activeShows.length,
//       icon: PlayCircleIcon,
//       color: "text-purple-600",
//       bgColor: "bg-purple-100",
//     },
//     {
//       label: "Total Users",
//       value: dashboardData.totalUser,
//       icon: UsersIcon,
//       color: "text-orange-600",
//       bgColor: "bg-orange-100",
//     },
//   ];

//   return (
//     <>
//       <Title text1="Admin" text2="Dashboard" />

//       {/* Stats Cards */}
//       <div className="flex flex-wrap gap-4 mt-6 relative">
//         <BlurCircle top="-100px" left="0" />

//         {statsCards.map((card, i) => (
//           <div
//             key={i}
//             className="flex items-center justify-between px-6 py-4 bg-white border-2 border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow w-64"
//           >
//             <div>
//               <p className="text-sm text-gray-600 mb-1">{card.label}</p>
//               <p className="text-2xl font-bold text-gray-800">{card.value}</p>
//             </div>
//             <div className={`${card.bgColor} p-3 rounded-lg`}>
//               <card.icon className={`w-6 h-6 ${card.color}`} />
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Active Shows Section */}
//       <div className="mt-12">
//         <div className="flex items-center justify-between mb-6">
//           <h2 className="text-2xl font-bold text-gray-800">Active Shows</h2>
//           <p className="text-gray-600">
//             {dashboardData.activeShows.length} show{dashboardData.activeShows.length !== 1 ? "s" : ""}
//           </p>
//         </div>

//         {dashboardData.activeShows.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {dashboardData.activeShows.map((show) => (
//               <div
//                 key={show._id}
//                 className="bg-white border-2 border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
//               >
//                 <img
//                   src={show.movie.poster_path}
//                   alt={show.movie.title}
//                   className="h-64 w-full object-cover"
//                 />
//                 <div className="p-4">
//                   <p className="font-semibold text-gray-800 truncate mb-2">
//                     {show.movie.title}
//                   </p>
//                   <div className="flex justify-between items-center mb-2">
//                     <p className="text-lg font-bold text-primary">
//                       {currency}{show.showPrice}
//                     </p>
//                     <p className="flex items-center gap-1 text-sm text-gray-600">
//                       <StarIcon className="w-4 h-4 text-yellow-500 fill-yellow-500" />
//                       {show.movie.vote_average?.toFixed(1) ?? "N/A"}
//                     </p>
//                   </div>
//                   <p className="text-sm text-gray-500">
//                     {dateFormat(show.showDateTime)}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-12 bg-gray-50 rounded-xl">
//             <PlayCircleIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//             <p className="text-gray-600 text-lg">No active shows</p>
//             <p className="text-gray-400 text-sm mt-2">Add shows to get started</p>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Dashboard;

// import React, { useEffect, useState } from "react";
// import {
//   TrendingUpIcon,
//   DollarSignIcon,
//   PlayCircleIcon,
//   StarIcon,
//   UsersIcon,
//   RefreshCwIcon,
// } from "lucide-react";
// import Loading from "../../components/Loading";
// import Title from "../../components/admin/Title";
// import BlurCircle from "../../components/BlurCircle";
// import { dateFormat } from "../../lib/dateFormat";
// import { useAppContext } from "../../context/AppContext";
// import toast from "react-hot-toast";

// const Dashboard = () => {
//   const { axios, user } = useAppContext();
//   const currency = import.meta.env.VITE_CURRENCY;

//   const [dashboardData, setDashboardData] = useState({
//     totalBookings: 0,
//     totalRevenue: 0,
//     activeShows: [],
//     totalUser: 0,
//   });

//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);

//   const fetchDashboardData = async (showToast = false) => {
//     try {
//       if (showToast) {
//         setRefreshing(true);
//       } else {
//         setLoading(true);
//       }

//       const { data } = await axios.get("/api/admin/dashboard");
      
//       if (data.success) {
//         setDashboardData(data.dashboardData);
//         if (showToast) {
//           toast.success("Dashboard refreshed");
//         }
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error("Dashboard error:", error);
//       toast.error("Failed to load dashboard data");
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   useEffect(() => {
//     if (user) {
//       fetchDashboardData();
//     }
//   }, [user]);

//   if (loading) return <Loading />;

//   const statsCards = [
//     {
//       label: "Total Bookings",
//       value: dashboardData.totalBookings,
//       icon: TrendingUpIcon,
//       color: "text-blue-600",
//       bgColor: "bg-blue-100",
//     },
//     {
//       label: "Total Revenue",
//       value: `${currency}${dashboardData.totalRevenue.toLocaleString()}`,
//       icon: DollarSignIcon,
//       color: "text-green-600",
//       bgColor: "bg-green-100",
//     },
//     {
//       label: "Active Shows",
//       value: dashboardData.activeShows.length,
//       icon: PlayCircleIcon,
//       color: "text-purple-600",
//       bgColor: "bg-purple-100",
//     },
//     {
//       label: "Total Users",
//       value: dashboardData.totalUser,
//       icon: UsersIcon,
//       color: "text-orange-600",
//       bgColor: "bg-orange-100",
//     },
//   ];

//   return (
//     <>
//       <div className="flex items-center justify-between">
//         <Title text1="Admin" text2="Dashboard" />
//         <button
//           onClick={() => fetchDashboardData(true)}
//           disabled={refreshing}
//           className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors"
//         >
//           <RefreshCwIcon className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
//           Refresh
//         </button>
//       </div>

//       {/* Stats Cards */}
//       <div className="flex flex-wrap gap-4 mt-6 relative">
//         <BlurCircle top="-100px" left="0" />

//         {statsCards.map((card, i) => (
//           <div
//             key={i}
//             className="flex items-center justify-between px-6 py-4 bg-white border-2 border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow w-64"
//           >
//             <div>
//               <p className="text-sm text-gray-600 mb-1">{card.label}</p>
//               <p className="text-2xl font-bold text-gray-800">{card.value}</p>
//             </div>
//             <div className={`${card.bgColor} p-3 rounded-lg`}>
//               <card.icon className={`w-6 h-6 ${card.color}`} />
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Active Shows Section */}
//       <div className="mt-12">
//         <div className="flex items-center justify-between mb-6">
//           <h2 className="text-2xl font-bold text-gray-800">Active Shows</h2>
//           <p className="text-gray-600">
//             {dashboardData.activeShows.length} show{dashboardData.activeShows.length !== 1 ? "s" : ""}
//           </p>
//         </div>

//         {dashboardData.activeShows.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {dashboardData.activeShows.map((show) => (
//               <div
//                 key={show._id}
//                 className="bg-white border-2 border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
//               >
//                 <img
//                   src={show.movie.poster_path}
//                   alt={show.movie.title}
//                   className="h-64 w-full object-cover"
//                   onError={(e) => {
//                     e.target.src = "https://via.placeholder.com/300x450?text=No+Image";
//                   }}
//                 />
//                 <div className="p-4">
//                   <p className="font-semibold text-gray-800 truncate mb-2" title={show.movie.title}>
//                     {show.movie.title}
//                   </p>
//                   <div className="flex justify-between items-center mb-2">
//                     <p className="text-lg font-bold text-primary">
//                       {currency}{show.showPrice}
//                     </p>
//                     <p className="flex items-center gap-1 text-sm text-gray-600">
//                       <StarIcon className="w-4 h-4 text-yellow-500 fill-yellow-500" />
//                       {show.movie.vote_average?.toFixed(1) ?? "N/A"}
//                     </p>
//                   </div>
//                   <p className="text-sm text-gray-500">
//                     {dateFormat(show.showDateTime)}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-12 bg-gray-50 rounded-xl">
//             <PlayCircleIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//             <p className="text-gray-600 text-lg">No active shows</p>
//             <p className="text-gray-400 text-sm mt-2">Add shows to get started</p>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Dashboard;

// import React, { useEffect, useState } from "react";
// import {
//   TrendingUpIcon,
//   DollarSignIcon,
//   PlayCircleIcon,
//   StarIcon,
//   UsersIcon,
//   RefreshCwIcon,
// } from "lucide-react";
// import Loading from "../../components/Loading";
// import Title from "../../components/admin/Title";
// import BlurCircle from "../../components/BlurCircle";
// import { dateFormat } from "../../lib/dateFormat";
// import { useAppContext } from "../../context/AppContext";
// import toast from "react-hot-toast";

// const Dashboard = () => {
//   const { axios, user } = useAppContext();
//   const currency = import.meta.env.VITE_CURRENCY;

//   // ✅ Always initialize with default values
//   const [dashboardData, setDashboardData] = useState({
//     totalBookings: 0,
//     totalRevenue: 0,
//     activeShows: [], // ✅ Array
//     totalUser: 0,
//   });

//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);

//   const fetchDashboardData = async (showToast = false) => {
//     try {
//       if (showToast) {
//         setRefreshing(true);
//       } else {
//         setLoading(true);
//       }

//       const { data } = await axios.get("/api/admin/dashboard");
      
//       if (data.success) {
//         // ✅ Add safety checks for all fields
//         setDashboardData({
//           totalBookings: data.dashboardData?.totalBookings || 0,
//           totalRevenue: data.dashboardData?.totalRevenue || 0,
//           activeShows: Array.isArray(data.dashboardData?.activeShows) 
//             ? data.dashboardData.activeShows 
//             : [],
//           totalUser: data.dashboardData?.totalUser || 0,
//         });
        
//         if (showToast) {
//           toast.success("Dashboard refreshed");
//         }
//       } else {
//         toast.error(data.message);
//         // ✅ Set safe defaults on error
//         setDashboardData({
//           totalBookings: 0,
//           totalRevenue: 0,
//           activeShows: [],
//           totalUser: 0,
//         });
//       }
//     } catch (error) {
//       console.error("Dashboard error:", error);
      
//       // ✅ Set safe defaults on error
//       setDashboardData({
//         totalBookings: 0,
//         totalRevenue: 0,
//         activeShows: [],
//         totalUser: 0,
//       });
      
//       if (error.response?.status === 401 || error.response?.status === 403) {
//         toast.error("Unauthorized - Admin access required");
//       } else {
//         toast.error("Failed to load dashboard data");
//       }
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   useEffect(() => {
//     if (user) {
//       fetchDashboardData();
//     }
//   }, [user]);

//   if (loading) return <Loading />;

//   const statsCards = [
//     {
//       label: "Total Bookings",
//       value: dashboardData.totalBookings,
//       icon: TrendingUpIcon,
//       color: "text-blue-600",
//       bgColor: "bg-blue-100",
//     },
//     {
//       label: "Total Revenue",
//       value: `${currency}${dashboardData.totalRevenue.toLocaleString()}`,
//       icon: DollarSignIcon,
//       color: "text-green-600",
//       bgColor: "bg-green-100",
//     },
//     {
//       label: "Active Shows",
//       value: dashboardData.activeShows.length,
//       icon: PlayCircleIcon,
//       color: "text-purple-600",
//       bgColor: "bg-purple-100",
//     },
//     {
//       label: "Total Users",
//       value: dashboardData.totalUser,
//       icon: UsersIcon,
//       color: "text-orange-600",
//       bgColor: "bg-orange-100",
//     },
//   ];

//   return (
//     <>
//       <div className="flex items-center justify-between">
//         <Title text1="Admin" text2="Dashboard" />
//         <button
//           onClick={() => fetchDashboardData(true)}
//           disabled={refreshing}
//           className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors"
//         >
//           <RefreshCwIcon className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
//           Refresh
//         </button>
//       </div>

//       {/* Stats Cards */}
//       <div className="flex flex-wrap gap-4 mt-6 relative">
//         <BlurCircle top="-100px" left="0" />

//         {statsCards.map((card, i) => (
//           <div
//             key={i}
//             className="flex items-center justify-between px-6 py-4 bg-white border-2 border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow w-64"
//           >
//             <div>
//               <p className="text-sm text-gray-600 mb-1">{card.label}</p>
//               <p className="text-2xl font-bold text-gray-800">{card.value}</p>
//             </div>
//             <div className={`${card.bgColor} p-3 rounded-lg`}>
//               <card.icon className={`w-6 h-6 ${card.color}`} />
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Active Shows Section */}
//       <div className="mt-12">
//         <div className="flex items-center justify-between mb-6">
//           <h2 className="text-2xl font-bold text-gray-800">Active Shows</h2>
//           <p className="text-gray-600">
//             {dashboardData.activeShows.length} show{dashboardData.activeShows.length !== 1 ? "s" : ""}
//           </p>
//         </div>

//         {/* ✅ Added safety check */}
//         {Array.isArray(dashboardData.activeShows) && dashboardData.activeShows.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {dashboardData.activeShows.map((show) => (
//               <div
//                 key={show._id}
//                 className="bg-white border-2 border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
//               >
//                 <img
//                   src={show.movie?.poster_path || "https://via.placeholder.com/300x450?text=No+Image"}
//                   alt={show.movie?.title || "Movie"}
//                   className="h-64 w-full object-cover"
//                   onError={(e) => {
//                     e.target.src = "https://via.placeholder.com/300x450?text=No+Image";
//                   }}
//                 />
//                 <div className="p-4">
//                   <p className="font-semibold text-gray-800 truncate mb-2" title={show.movie?.title}>
//                     {show.movie?.title || "Unknown Movie"}
//                   </p>
//                   <div className="flex justify-between items-center mb-2">
//                     <p className="text-lg font-bold text-primary">
//                       {currency}{show.showPrice || 0}
//                     </p>
//                     <p className="flex items-center gap-1 text-sm text-gray-600">
//                       <StarIcon className="w-4 h-4 text-yellow-500 fill-yellow-500" />
//                       {show.movie?.vote_average?.toFixed(1) ?? "N/A"}
//                     </p>
//                   </div>
//                   <p className="text-sm text-gray-500">
//                     {show.showDateTime ? dateFormat(show.showDateTime) : "No date"}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-12 bg-gray-50 rounded-xl">
//             <PlayCircleIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//             <p className="text-gray-600 text-lg">No active shows</p>
//             <p className="text-gray-400 text-sm mt-2">Add shows to get started</p>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState } from "react";
import {
  TrendingUpIcon,
  DollarSignIcon,
  PlayCircleIcon,
  StarIcon,
  UsersIcon,
  RefreshCwIcon,
} from "lucide-react";
import Loading from "../../components/Loading";
import Title from "../../components/admin/Title";
import { dateFormat } from "../../lib/dateFormat";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { axios, user } = useAppContext();
  const currency = import.meta.env.VITE_CURRENCY;

  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    activeShows: [],
    totalUser: 0,
  });

  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/admin/dashboard");
      
      if (data.success) {
        setDashboardData({
          totalBookings: data.dashboardData?.totalBookings || 0,
          totalRevenue: data.dashboardData?.totalRevenue || 0,
          activeShows: Array.isArray(data.dashboardData?.activeShows) 
            ? data.dashboardData.activeShows 
            : [],
          totalUser: data.dashboardData?.totalUser || 0,
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  if (loading) return <Loading />;

  const statsCards = [
    {
      label: "Total Bookings",
      value: dashboardData.totalBookings,
      icon: TrendingUpIcon,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      label: "Total Revenue",
      value: `${currency}${dashboardData.totalRevenue.toLocaleString()}`,
      icon: DollarSignIcon,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      label: "Active Shows",
      value: dashboardData.activeShows.length,
      icon: PlayCircleIcon,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      label: "Total Users",
      value: dashboardData.totalUser,
      icon: UsersIcon,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  return (
    <>
      <div className="flex items-center justify-between">
        <Title text1="Admin" text2="Dashboard" />
        <button
          onClick={fetchDashboardData}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
        >
          <RefreshCwIcon className="w-4 h-4" />
          Refresh
        </button>
      </div>

      <div className="flex flex-wrap gap-4 mt-6">
        {statsCards.map((card, i) => (
          <div
            key={i}
            className="flex items-center justify-between px-6 py-4 bg-white border-2 border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow w-64"
          >
            <div>
              <p className="text-sm text-gray-600 mb-1">{card.label}</p>
              <p className="text-2xl font-bold text-gray-800">{card.value}</p>
            </div>
            <div className={`${card.bgColor} p-3 rounded-lg`}>
              <card.icon className={`w-6 h-6 ${card.color}`} />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Active Shows</h2>

        {Array.isArray(dashboardData.activeShows) && dashboardData.activeShows.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {dashboardData.activeShows.map((show) => (
              <div
                key={show._id}
                className="bg-white border rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                <img
                  src={show.movie?.poster_path || "https://via.placeholder.com/300x450"}
                  alt={show.movie?.title}
                  className="h-64 w-full object-cover"
                />
                <div className="p-4">
                  <p className="font-semibold truncate mb-2">
                    {show.movie?.title || "Unknown"}
                  </p>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-lg font-bold text-primary">
                      {currency}{show.showPrice || 0}
                    </p>
                    <p className="flex items-center gap-1 text-sm">
                      <StarIcon className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      {show.movie?.vote_average?.toFixed(1) ?? "N/A"}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500">
                    {show.showDateTime ? dateFormat(show.showDateTime) : "N/A"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <PlayCircleIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">No active shows</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;