// import { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { useAuth, useUser } from "@clerk/clerk-react";
// import { useLocation, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

// export const AppContext = createContext()

// export const AppProvider = ({ children })=>{

//     const [isAdmin, setIsAdmin] = useState(false)
//     const [shows, setShows] = useState([])
//     const [favoriteMovies, setFavoriteMovies] = useState([])

//     const image_base_url = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

//     const {user} = useUser()
//     const {getToken} = useAuth()
//     const location = useLocation()
//     const navigate = useNavigate()

//     const fetchIsAdmin = async ()=>{
//         try {
//             const {data} = await axios.get('/api/admin/is-admin', {headers: {Authorization: `Bearer ${await getToken()}`}})
//             setIsAdmin(data.isAdmin)

//             if(!data.isAdmin && location.pathname.startsWith('/admin')){
//                 navigate('/')
//                 toast.error('You are not authorized to access admin dashboard')
//             }
//         } catch (error) {
//             console.error(error)
//         }
//     }

//     const fetchShows = async ()=>{
//         try {
//             const { data } = await axios.get('/api/show/all')
//             if(data.success){
//                 setShows(data.shows)
//             }else{
//                 toast.error(data.message)
//             }
//         } catch (error) {
//             console.error(error)
//         }
//     }

//     const fetchFavoriteMovies = async ()=>{
//         try {
//             const { data } = await axios.get('/api/user/favorites', {headers: {Authorization: `Bearer ${await getToken()}`}})

//             if(data.success){
//                 setFavoriteMovies(data.movies)
//             }else{
//                 toast.error(data.message)
//             }
//         } catch (error) {
//             console.error(error)
//         }
//     }

//     useEffect(()=>{
//         fetchShows()
//     },[])

//     useEffect(()=>{
//         if(user){
//             fetchIsAdmin()
//             fetchFavoriteMovies()
//         }
//     },[user])

//     const value = {
//         axios,
//         fetchIsAdmin,
//         user, getToken, navigate, isAdmin, shows, 
//         favoriteMovies, fetchFavoriteMovies, image_base_url
//     }

//     return (
//         <AppContext.Provider value={value}>
//             { children }
//         </AppContext.Provider>
//     )
// }

// export const useAppContext = ()=> useContext(AppContext)

// import { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { useAuth, useUser } from "@clerk/clerk-react";
// import toast from "react-hot-toast";

// axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// export const AppContext = createContext();

// export const AppProvider = ({ children }) => {
//   const { user, isLoaded } = useUser();
//   const { getToken } = useAuth();

//   const [shows, setShows] = useState([]);
//   const [favoriteMovies, setFavoriteMovies] = useState([]);

//   // ✅ ADMIN CHECK (frontend-safe)
//   const isAdmin = user?.publicMetadata?.role === "admin";

//   // Optional (you can remove TMDB image env later)
//   const image_base_url = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

//   /* =========================
//      Fetch all shows
//   ========================== */
//   const fetchShows = async () => {
//     try {
//       const { data } = await axios.get("/api/show/all");
//       if (data.success) {
//         setShows(data.shows);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   /* =========================
//      Fetch favorite movies
//   ========================== */
//   const fetchFavoriteMovies = async () => {
//     try {
//       const token = await getToken();
//       const { data } = await axios.get("/api/user/favorites", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (data.success) {
//         setFavoriteMovies(data.movies);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   /* =========================
//      Effects
//   ========================== */
//   useEffect(() => {
//     fetchShows();
//   }, []);

//   useEffect(() => {
//     if (user) {
//       fetchFavoriteMovies();
//     }
//   }, [user]);

//   const value = {
//     axios,
//     user,
//     isLoaded,
//     isAdmin, // ✅ USE THIS EVERYWHERE
//     getToken,
//     shows,
//     favoriteMovies,
//     fetchFavoriteMovies,
//     image_base_url,
//   };

//   return (
//     <AppContext.Provider value={value}>
//       {children}
//     </AppContext.Provider>
//   );
// };

// export const useAppContext = () => useContext(AppContext);

// import { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { useAuth, useUser } from "@clerk/clerk-react";
// import toast from "react-hot-toast";

// axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// export const AppContext = createContext();

// export const AppProvider = ({ children }) => {
//   const { user, isLoaded } = useUser();
//   const { getToken } = useAuth();

//   const [shows, setShows] = useState([]);
//   const [favoriteMovies, setFavoriteMovies] = useState([]);

//   /* =========================
//      ✅ ADMIN CHECK (SOURCE OF TRUTH)
//      Matches backend protectAdmin
//   ========================== */
//   const isAdmin = user?.privateMetadata?.role === "admin";

//   /* =========================
//      Fetch all shows
//   ========================== */
//   const fetchShows = async () => {
//     try {
//       const { data } = await axios.get("/api/show/all");
//       if (data.success) {
//         setShows(data.shows);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   /* =========================
//      Fetch favorite movies
//   ========================== */
//   const fetchFavoriteMovies = async () => {
//     try {
//       const token = await getToken();
//       const { data } = await axios.get("/api/user/favorites", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (data.success) {
//         setFavoriteMovies(data.movies);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   /* =========================
//      Effects
//   ========================== */
//   useEffect(() => {
//     fetchShows();
//   }, []);

//   useEffect(() => {
//     if (user) {
//       fetchFavoriteMovies();
//     }
//   }, [user]);

//   const value = {
//     axios,
//     user,
//     isLoaded,
//     isAdmin, // ✅ USE THIS EVERYWHERE
//     getToken,
//     shows,
//     favoriteMovies,
//     fetchFavoriteMovies,
//   };

//   return (
//     <AppContext.Provider value={value}>
//       {children}
//     </AppContext.Provider>
//   );
// };

// export const useAppContext = () => useContext(AppContext);


// import { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { useAuth, useUser } from "@clerk/clerk-react";
// import toast from "react-hot-toast";

// axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// export const AppContext = createContext();

// export const AppProvider = ({ children }) => {
//   const { user, isLoaded } = useUser();
//   const { getToken } = useAuth();

//   const [shows, setShows] = useState([]);
//   const [favoriteMovies, setFavoriteMovies] = useState([]);

//   /* =========================
//      ✅ ADMIN CHECK (SOURCE OF TRUTH)
//      Matches backend protectAdmin
//   ========================== */
//   const isAdmin = user?.privateMetadata?.role === "admin";

//   /* =========================
//      🔍 DEBUG LOGGING
//      Remove this after fixing
//   ========================== */
//   useEffect(() => {
//     if (isLoaded) {
//       console.log("========================================");
//       console.log("🔍 CLERK USER DEBUG INFO");
//       console.log("========================================");
//       console.log("✅ User loaded:", !!user);
      
//       if (user) {
//         console.log("📧 Email:", user.primaryEmailAddress?.emailAddress);
//         console.log("🆔 User ID:", user.id);
//         console.log("🔐 Private Metadata:", user.privateMetadata);
//         console.log("🌍 Public Metadata:", user.publicMetadata);
//         console.log("👑 Is Admin:", isAdmin);
//         console.log("📋 Full User Object:", user);
//       } else {
//         console.log("❌ No user logged in");
//       }
//       console.log("========================================");
//     }
//   }, [isLoaded, user, isAdmin]);

//   /* =========================
//      Fetch all shows
//   ========================== */
//   const fetchShows = async () => {
//     try {
//       const { data } = await axios.get("/api/show/all");
//       if (data.success) {
//         setShows(data.shows);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error("Error fetching shows:", error);
//       toast.error("Failed to fetch shows");
//     }
//   };

//   /* =========================
//      Fetch favorite movies
//   ========================== */
//   const fetchFavoriteMovies = async () => {
//     try {
//       const token = await getToken();
//       const { data } = await axios.get("/api/user/favorites", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (data.success) {
//         setFavoriteMovies(data.movies);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error("Error fetching favorites:", error);
//       toast.error("Failed to fetch favorites");
//     }
//   };

//   /* =========================
//      Effects
//   ========================== */
//   useEffect(() => {
//     fetchShows();
//   }, []);

//   useEffect(() => {
//     if (user) {
//       fetchFavoriteMovies();
//     }
//   }, [user]);

//   const value = {
//     axios,
//     user,
//     isLoaded,
//     isAdmin, // ✅ USE THIS EVERYWHERE
//     getToken,
//     shows,
//     favoriteMovies,
//     fetchFavoriteMovies,
//   };

//   return (
//     <AppContext.Provider value={value}>
//       {children}
//     </AppContext.Provider>
//   );
// };

// export const useAppContext = () => useContext(AppContext);
// import { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { useAuth, useUser } from "@clerk/clerk-react";
// import toast from "react-hot-toast";

// axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// export const AppContext = createContext();

// export const AppProvider = ({ children }) => {
//   const { user, isLoaded } = useUser();
//   const { getToken } = useAuth();

//   const [shows, setShows] = useState([]);
//   const [favoriteMovies, setFavoriteMovies] = useState([]);

//   /* =========================
//      ✅ ADMIN CHECK - Email Based
//   ========================== */
//   const getAdminEmails = () => {
//     const emails = import.meta.env.VITE_ADMIN_EMAILS || "";
//     return emails.split(",").map(email => email.trim().toLowerCase());
//   };

//   const isAdmin = user?.primaryEmailAddress?.emailAddress
//     ? getAdminEmails().includes(user.primaryEmailAddress.emailAddress.toLowerCase())
//     : false;

//   /* =========================
//      Fetch all shows
//   ========================== */
//   const fetchShows = async () => {
//     try {
//       const { data } = await axios.get("/api/show/all");
//       if (data.success) {
//         setShows(data.shows);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to fetch shows");
//     }
//   };

//   /* =========================
//      Fetch favorite movies
//   ========================== */
//   const fetchFavoriteMovies = async () => {
//     try {
//       const token = await getToken();
//       const { data } = await axios.get("/api/user/favorites", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (data.success) {
//         setFavoriteMovies(data.movies);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to fetch favorites");
//     }
//   };

//   /* =========================
//      Effects
//   ========================== */
//   useEffect(() => {
//     fetchShows();
//   }, []);

//   useEffect(() => {
//     if (user) {
//       fetchFavoriteMovies();
//     }
//   }, [user]);

//   const value = {
//     axios,
//     user,
//     isLoaded,
//     isAdmin,
//     getToken,
//     shows,
//     favoriteMovies,
//     fetchFavoriteMovies,
//   };

//   return (
//     <AppContext.Provider value={value}>
//       {children}
//     </AppContext.Provider>
//   );
// };

// export const useAppContext = () => useContext(AppContext);

// import { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { useAuth, useUser } from "@clerk/clerk-react";
// import toast from "react-hot-toast";

// axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// export const AppContext = createContext();

// export const AppProvider = ({ children }) => {
//   const { user, isLoaded } = useUser();
//   const { getToken } = useAuth();

//   const [shows, setShows] = useState([]);
//   const [favoriteMovies, setFavoriteMovies] = useState([]);

//   /* =========================
//      ✅ ADMIN CHECK - Email Based
//   ========================== */
//   const getAdminEmails = () => {
//     const emails = import.meta.env.VITE_ADMIN_EMAILS || "";
//     return emails.split(",").map(email => email.trim().toLowerCase());
//   };

//   const isAdmin = user?.primaryEmailAddress?.emailAddress
//     ? getAdminEmails().includes(user.primaryEmailAddress.emailAddress.toLowerCase())
//     : false;

//   /* =========================
//      ✅ AXIOS INTERCEPTOR - Add Token to All Requests
//   ========================== */
//   useEffect(() => {
//     const requestInterceptor = axios.interceptors.request.use(
//       async (config) => {
//         // Skip adding token for public endpoints
//         const publicEndpoints = ['/api/show/all', '/api/show/'];
//         const isPublicEndpoint = publicEndpoints.some(endpoint => 
//           config.url?.includes(endpoint)
//         );

//         if (!isPublicEndpoint && user) {
//           try {
//             const token = await getToken();
//             if (token) {
//               config.headers.Authorization = `Bearer ${token}`;
//             }
//           } catch (error) {
//             console.error("Error getting token:", error);
//           }
//         }
//         return config;
//       },
//       (error) => {
//         return Promise.reject(error);
//       }
//     );

//     // Cleanup interceptor on unmount
//     return () => {
//       axios.interceptors.request.eject(requestInterceptor);
//     };
//   }, [user, getToken]);

//   /* =========================
//      Fetch all shows
//   ========================== */
//   const fetchShows = async () => {
//     try {
//       const { data } = await axios.get("/api/show/all");
//       if (data.success) {
//         setShows(data.shows);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to fetch shows");
//     }
//   };

//   /* =========================
//      Fetch favorite movies
//   ========================== */
//   const fetchFavoriteMovies = async () => {
//     try {
//       const { data } = await axios.get("/api/user/favorites");

//       if (data.success) {
//         setFavoriteMovies(data.movies);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to fetch favorites");
//     }
//   };

//   /* =========================
//      Effects
//   ========================== */
//   useEffect(() => {
//     fetchShows();
//   }, []);

//   useEffect(() => {
//     if (user) {
//       fetchFavoriteMovies();
//     }
//   }, [user]);

//   const value = {
//     axios,
//     user,
//     isLoaded,
//     isAdmin,
//     getToken,
//     shows,
//     favoriteMovies,
//     fetchFavoriteMovies,
//   };

//   return (
//     <AppContext.Provider value={value}>
//       {children}
//     </AppContext.Provider>
//   );
// };

// export const useAppContext = () => useContext(AppContext);

// import { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { useAuth, useUser } from "@clerk/clerk-react";
// import toast from "react-hot-toast";

// axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// export const AppContext = createContext();

// export const AppProvider = ({ children }) => {
//   const { user, isLoaded } = useUser();
//   const { getToken } = useAuth();

//   const [shows, setShows] = useState([]);
//   const [favoriteMovies, setFavoriteMovies] = useState([]);

//   /* =========================
//      ✅ ADMIN CHECK - Email Based
//   ========================== */
//   const getAdminEmails = () => {
//     const emails = import.meta.env.VITE_ADMIN_EMAILS || "";
//     return emails.split(",").map(email => email.trim().toLowerCase());
//   };

//   const isAdmin = user?.primaryEmailAddress?.emailAddress
//     ? getAdminEmails().includes(user.primaryEmailAddress.emailAddress.toLowerCase())
//     : false;

//   /* =========================
//      ✅ AXIOS INTERCEPTOR - Add Token to All Requests
//   ========================== */
//   useEffect(() => {
//     const requestInterceptor = axios.interceptors.request.use(
//       async (config) => {
//         // Skip adding token for public endpoints
//         const publicEndpoints = ['/api/show/all'];
//         const isPublicEndpoint = publicEndpoints.some(endpoint => 
//           config.url?.includes(endpoint)
//         );

//         // Skip for specific movie detail endpoints
//         const isMovieDetail = config.url?.match(/\/api\/show\/tt\d+/);

//         if (!isPublicEndpoint && !isMovieDetail && user) {
//           try {
//             const token = await getToken();
//             if (token) {
//               config.headers.Authorization = `Bearer ${token}`;
//             }
//           } catch (error) {
//             console.error("Error getting token:", error);
//           }
//         }
//         return config;
//       },
//       (error) => {
//         return Promise.reject(error);
//       }
//     );

//     return () => {
//       axios.interceptors.request.eject(requestInterceptor);
//     };
//   }, [user, getToken]);

//   /* =========================
//      Fetch all shows
//   ========================== */
//   const fetchShows = async () => {
//     try {
//       const { data } = await axios.get("/api/show/all");
//       if (data.success) {
//         setShows(data.shows);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   /* =========================
//      Fetch favorite movies
//   ========================== */
//   const fetchFavoriteMovies = async () => {
//     try {
//       const { data } = await axios.get("/api/user/favorites");

//       if (data.success) {
//         setFavoriteMovies(data.movies);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   /* =========================
//      Effects
//   ========================== */
//   useEffect(() => {
//     fetchShows();
//   }, []);

//   useEffect(() => {
//     if (user) {
//       fetchFavoriteMovies();
//     }
//   }, [user]);

//   const value = {
//     axios,
//     user,
//     isLoaded,
//     isAdmin,
//     getToken,
//     shows,
//     favoriteMovies,
//     fetchFavoriteMovies,
//   };

//   return (
//     <AppContext.Provider value={value}>
//       {children}
//     </AppContext.Provider>
//   );
// };

// export const useAppContext = () => useContext(AppContext);

// import { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { useAuth, useUser } from "@clerk/clerk-react";

// axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// export const AppContext = createContext();

// export const AppProvider = ({ children }) => {
//   const { user, isLoaded } = useUser();
//   const { getToken } = useAuth();

//   const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;

//   const isAdmin =
//     user?.primaryEmailAddress?.emailAddress === ADMIN_EMAIL;

//   const value = {
//     axios,
//     user,
//     isLoaded,
//     isAdmin,
//     getToken,
//   };

//   return (
//     <AppContext.Provider value={value}>
//       {children}
//     </AppContext.Provider>
//   );
// };

// export const useAppContext = () => useContext(AppContext);


// import { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { useAuth, useUser } from "@clerk/clerk-react";
// import toast from "react-hot-toast";

// axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// export const AppContext = createContext();

// export const AppProvider = ({ children }) => {
//   const { user, isLoaded } = useUser();
//   const { getToken } = useAuth();

//   const [shows, setShows] = useState([]);
//   const [favoriteMovies, setFavoriteMovies] = useState([]);
//   const [loadingFavorites, setLoadingFavorites] = useState(false);

//   /* =========================
//      ✅ ADMIN CHECK - Email Based
//   ========================== */
//   const getAdminEmails = () => {
//     const emails = import.meta.env.VITE_ADMIN_EMAILS || "";
//     return emails.split(",").map(email => email.trim().toLowerCase());
//   };

//   const isAdmin = user?.primaryEmailAddress?.emailAddress
//     ? getAdminEmails().includes(user.primaryEmailAddress.emailAddress.toLowerCase())
//     : false;

//   /* =========================
//      ✅ AXIOS INTERCEPTOR - Add Token
//   ========================== */
//   useEffect(() => {
//     const requestInterceptor = axios.interceptors.request.use(
//       async (config) => {
//         // Public endpoints that don't need auth
//         const publicEndpoints = ['/api/show/all'];
//         const isPublicEndpoint = publicEndpoints.some(endpoint => 
//           config.url?.includes(endpoint)
//         );

//         // Movie detail endpoints (public)
//         const isMovieDetail = config.url?.match(/\/api\/show\/tt\d+$/);

//         // Occupied seats endpoint (public)
//         const isSeatsEndpoint = config.url?.includes('/api/booking/seats/');

//         if (!isPublicEndpoint && !isMovieDetail && !isSeatsEndpoint && user) {
//           try {
//             const token = await getToken();
//             if (token) {
//               config.headers.Authorization = `Bearer ${token}`;
//             }
//           } catch (error) {
//             console.error("Error getting token:", error);
//           }
//         }
//         return config;
//       },
//       (error) => {
//         return Promise.reject(error);
//       }
//     );

//     // Response interceptor for handling errors
//     const responseInterceptor = axios.interceptors.response.use(
//       (response) => response,
//       (error) => {
//         if (error.response?.status === 401) {
//           console.error("Unauthorized - Please login again");
//         }
//         return Promise.reject(error);
//       }
//     );

//     return () => {
//       axios.interceptors.request.eject(requestInterceptor);
//       axios.interceptors.response.eject(responseInterceptor);
//     };
//   }, [user, getToken]);

//   /* =========================
//      Fetch all shows
//   ========================== */
//   const fetchShows = async () => {
//     try {
//       const { data } = await axios.get("/api/show/all");
//       if (data.success) {
//         setShows(data.shows);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error("Fetch shows error:", error);
//     }
//   };

//   /* =========================
//      Fetch favorite movies
//   ========================== */
//   const fetchFavoriteMovies = async () => {
//     if (!user) return;
    
//     try {
//       setLoadingFavorites(true);
//       const { data } = await axios.get("/api/user/favorites");

//       if (data.success) {
//         setFavoriteMovies(data.movies);
//       } else {
//         if (data.message !== "User not found") {
//           toast.error(data.message);
//         }
//       }
//     } catch (error) {
//       console.error("Fetch favorites error:", error);
//     } finally {
//       setLoadingFavorites(false);
//     }
//   };

//   /* =========================
//      Toggle favorite movie
//   ========================== */
//   const toggleFavorite = async (movieId) => {
//     if (!user) {
//       toast.error("Please login to add favorites");
//       return;
//     }

//     try {
//       const { data } = await axios.post("/api/user/update-favorite", { movieId });

//       if (data.success) {
//         // Update local state
//         const isFavorite = favoriteMovies.some(movie => movie._id === movieId);
        
//         if (isFavorite) {
//           setFavoriteMovies(favoriteMovies.filter(movie => movie._id !== movieId));
//           toast.success("Removed from favorites");
//         } else {
//           // Fetch updated favorites
//           await fetchFavoriteMovies();
//           toast.success("Added to favorites");
//         }
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error("Toggle favorite error:", error);
//       toast.error("Failed to update favorites");
//     }
//   };

//   /* =========================
//      Check if movie is favorite
//   ========================== */
//   const isFavoriteMovie = (movieId) => {
//     return favoriteMovies.some(movie => movie._id === movieId);
//   };

//   /* =========================
//      Effects
//   ========================== */
//   useEffect(() => {
//     fetchShows();
//   }, []);

//   useEffect(() => {
//     if (user) {
//       fetchFavoriteMovies();
//     } else {
//       setFavoriteMovies([]);
//     }
//   }, [user]);

//   const value = {
//     axios,
//     user,
//     isLoaded,
//     isAdmin,
//     getToken,
//     shows,
//     favoriteMovies,
//     loadingFavorites,
//     fetchFavoriteMovies,
//     toggleFavorite,
//     isFavoriteMovie,
//   };

//   return (
//     <AppContext.Provider value={value}>
//       {children}
//     </AppContext.Provider>
//   );
// };

// export const useAppContext = () => useContext(AppContext);

// import { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { useAuth, useUser } from "@clerk/clerk-react";
// import toast from "react-hot-toast";

// // Set base URL
// axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// export const AppContext = createContext();

// export const AppProvider = ({ children }) => {
//   const { user, isLoaded } = useUser();
//   const { getToken } = useAuth();

//   const [shows, setShows] = useState([]);
//   const [favoriteMovies, setFavoriteMovies] = useState([]);
//   const [loadingFavorites, setLoadingFavorites] = useState(false);

//   /* =========================
//      ✅ ADMIN CHECK - Email Based
//   ========================== */
//   const getAdminEmails = () => {
//     const emails = import.meta.env.VITE_ADMIN_EMAILS || "";
//     return emails.split(",").map(email => email.trim().toLowerCase());
//   };

//   const isAdmin = user?.primaryEmailAddress?.emailAddress
//     ? getAdminEmails().includes(user.primaryEmailAddress.emailAddress.toLowerCase())
//     : false;

//   // Debug log
//   useEffect(() => {
//     if (user) {
//       console.log("========================================");
//       console.log("👤 Current User:", user.primaryEmailAddress?.emailAddress);
//       console.log("👑 Admin Emails:", getAdminEmails());
//       console.log("✅ Is Admin:", isAdmin);
//       console.log("========================================");
//     }
//   }, [user, isAdmin]);

//   /* =========================
//      ✅ AXIOS INTERCEPTOR - Add Token to Requests
//   ========================== */
//   useEffect(() => {
//     const requestInterceptor = axios.interceptors.request.use(
//       async (config) => {
//         // List of public endpoints that don't need authentication
//         const publicEndpoints = [
//           '/api/show/all',
//           '/api/booking/seats/',
//           '/health',
//           '/api/debug/',
//           '/api/test-'
//         ];

//         // Check if this is a public endpoint
//         const isPublicEndpoint = publicEndpoints.some(endpoint => 
//           config.url?.includes(endpoint)
//         );

//         // Check if this is a movie detail endpoint (public)
//         const isMovieDetail = config.url?.match(/\/api\/show\/tt\d+$/);

//         // Add token for protected endpoints
//         if (!isPublicEndpoint && !isMovieDetail && user) {
//           try {
//             const token = await getToken();
//             if (token) {
//               config.headers.Authorization = `Bearer ${token}`;
//               console.log("🔑 Token added to request:", config.url);
//             } else {
//               console.warn("⚠️ No token available for request:", config.url);
//             }
//           } catch (error) {
//             console.error("❌ Error getting token:", error);
//           }
//         }

//         return config;
//       },
//       (error) => {
//         console.error("❌ Request interceptor error:", error);
//         return Promise.reject(error);
//       }
//     );

//     // Response interceptor for handling errors
//     const responseInterceptor = axios.interceptors.response.use(
//       (response) => response,
//       (error) => {
//         if (error.response?.status === 401) {
//           console.error("❌ 401 Unauthorized:", error.config?.url);
//           // Don't show toast for every 401, only for important ones
//           if (error.config?.url?.includes('/admin')) {
//             toast.error("Please log in again");
//           }
//         } else if (error.response?.status === 403) {
//           console.error("❌ 403 Forbidden:", error.config?.url);
//           toast.error("Access denied");
//         } else if (error.response?.status >= 500) {
//           console.error("❌ Server error:", error.response?.data);
//           toast.error("Server error. Please try again.");
//         }
//         return Promise.reject(error);
//       }
//     );

//     // Cleanup
//     return () => {
//       axios.interceptors.request.eject(requestInterceptor);
//       axios.interceptors.response.eject(responseInterceptor);
//     };
//   }, [user, getToken]);

//   /* =========================
//      Fetch all shows
//   ========================== */
//   const fetchShows = async () => {
//     try {
//       console.log("📡 Fetching shows...");
//       const { data } = await axios.get("/api/show/all");
      
//       if (data.success) {
//         console.log("✅ Shows fetched:", data.shows.length);
//         setShows(data.shows);
//       } else {
//         console.error("❌ Failed to fetch shows:", data.message);
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error("❌ Fetch shows error:", error);
//       // Don't show toast for this, as it's called on every page load
//     }
//   };

//   /* =========================
//      Fetch favorite movies
//   ========================== */
//   const fetchFavoriteMovies = async () => {
//     if (!user) return;
    
//     try {
//       setLoadingFavorites(true);
//       console.log("📡 Fetching favorites...");
      
//       const { data } = await axios.get("/api/user/favorites");

//       if (data.success) {
//         console.log("✅ Favorites fetched:", data.movies.length);
//         setFavoriteMovies(data.movies);
//       } else {
//         console.error("❌ Failed to fetch favorites:", data.message);
//         if (data.message !== "User not found") {
//           toast.error(data.message);
//         }
//       }
//     } catch (error) {
//       console.error("❌ Fetch favorites error:", error);
//       // Don't show error toast, as user might not have any favorites yet
//     } finally {
//       setLoadingFavorites(false);
//     }
//   };

//   /* =========================
//      Toggle favorite movie
//   ========================== */
//   const toggleFavorite = async (movieId) => {
//     if (!user) {
//       toast.error("Please login to add favorites");
//       return;
//     }

//     try {
//       console.log("❤️ Toggling favorite:", movieId);
//       const { data } = await axios.post("/api/user/update-favorite", { movieId });

//       if (data.success) {
//         // Update local state
//         const isFavorite = favoriteMovies.some(movie => movie._id === movieId);
        
//         if (isFavorite) {
//           setFavoriteMovies(favoriteMovies.filter(movie => movie._id !== movieId));
//           toast.success("Removed from favorites");
//         } else {
//           // Fetch updated favorites
//           await fetchFavoriteMovies();
//           toast.success("Added to favorites");
//         }
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error("❌ Toggle favorite error:", error);
//       toast.error("Failed to update favorites");
//     }
//   };

//   /* =========================
//      Check if movie is favorite
//   ========================== */
//   const isFavoriteMovie = (movieId) => {
//     return favoriteMovies.some(movie => movie._id === movieId);
//   };

//   /* =========================
//      Effects
//   ========================== */
//   useEffect(() => {
//     fetchShows();
//   }, []);

//   useEffect(() => {
//     if (user) {
//       fetchFavoriteMovies();
//     } else {
//       setFavoriteMovies([]);
//     }
//   }, [user]);

//   const value = {
//     axios,
//     user,
//     isLoaded,
//     isAdmin,
//     getToken,
//     shows,
//     favoriteMovies,
//     loadingFavorites,
//     fetchFavoriteMovies,
//     toggleFavorite,
//     isFavoriteMovie,
//   };

//   return (
//     <AppContext.Provider value={value}>
//       {children}
//     </AppContext.Provider>
//   );
// };

// export const useAppContext = () => {
//   const context = useContext(AppContext);
//   if (!context) {
//     throw new Error("useAppContext must be used within AppProvider");
//   }
//   return context;
// };

// import { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { useAuth, useUser } from "@clerk/clerk-react";
// import toast from "react-hot-toast";

// axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// export const AppContext = createContext();

// export const AppProvider = ({ children }) => {
//   const { user, isLoaded } = useUser();
//   const { getToken } = useAuth();

//   const [shows, setShows] = useState([]);
//   const [favoriteMovies, setFavoriteMovies] = useState([]);
//   const [loadingFavorites, setLoadingFavorites] = useState(false);
//   const [isAdmin, setIsAdmin] = useState(false); // ✅ State for admin status

//   /* =========================
//      ✅ CHECK ADMIN STATUS FROM BACKEND
//   ========================== */
//   const checkAdminStatus = async () => {
//     if (!user) {
//       setIsAdmin(false);
//       return;
//     }

//     try {
//       const { data } = await axios.get("/api/admin/check");
//       setIsAdmin(data.success && data.isAdmin);
//     } catch (error) {
//       setIsAdmin(false);
//     }
//   };

//   /* =========================
//      AXIOS INTERCEPTOR
//   ========================== */
//   useEffect(() => {
//     const requestInterceptor = axios.interceptors.request.use(
//       async (config) => {
//         const publicEndpoints = ['/api/show/all', '/api/booking/seats/'];
//         const isPublic = publicEndpoints.some(e => config.url?.includes(e));
//         const isMovieDetail = config.url?.match(/\/api\/show\/tt\d+$/);

//         if (!isPublic && !isMovieDetail && user) {
//           try {
//             const token = await getToken();
//             if (token) {
//               config.headers.Authorization = `Bearer ${token}`;
//             }
//           } catch (error) {
//             console.error("Token error:", error);
//           }
//         }
//         return config;
//       }
//     );

//     return () => axios.interceptors.request.eject(requestInterceptor);
//   }, [user, getToken]);

//   /* =========================
//      Fetch shows
//   ========================== */
//   const fetchShows = async () => {
//     try {
//       const { data } = await axios.get("/api/show/all");
//       if (data.success) {
//         setShows(data.shows);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   /* =========================
//      Fetch favorites
//   ========================== */
//   const fetchFavoriteMovies = async () => {
//     if (!user) return;
    
//     try {
//       setLoadingFavorites(true);
//       const { data } = await axios.get("/api/user/favorites");
//       if (data.success) {
//         setFavoriteMovies(data.movies);
//       }
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoadingFavorites(false);
//     }
//   };

//   /* =========================
//      Toggle favorite
//   ========================== */
//   const toggleFavorite = async (movieId) => {
//     if (!user) {
//       toast.error("Please login");
//       return;
//     }

//     try {
//       const { data } = await axios.post("/api/user/update-favorite", { movieId });
//       if (data.success) {
//         const isFavorite = favoriteMovies.some(m => m._id === movieId);
//         if (isFavorite) {
//           setFavoriteMovies(favoriteMovies.filter(m => m._id !== movieId));
//           toast.success("Removed from favorites");
//         } else {
//           await fetchFavoriteMovies();
//           toast.success("Added to favorites");
//         }
//       }
//     } catch (error) {
//       toast.error("Failed to update favorites");
//     }
//   };

//   const isFavoriteMovie = (movieId) => {
//     return favoriteMovies.some(m => m._id === movieId);
//   };

//   /* =========================
//      Effects
//   ========================== */
//   useEffect(() => {
//     fetchShows();
//   }, []);

//   useEffect(() => {
//     if (user) {
//       fetchFavoriteMovies();
//       checkAdminStatus(); // ✅ Check admin when user logs in
//     } else {
//       setFavoriteMovies([]);
//       setIsAdmin(false);
//     }
//   }, [user]);

//   const value = {
//     axios,
//     user,
//     isLoaded,
//     isAdmin,
//     getToken,
//     shows,
//     favoriteMovies,
//     loadingFavorites,
//     fetchFavoriteMovies,
//     toggleFavorite,
//     isFavoriteMovie,
//   };

//   return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
// };

// export const useAppContext = () => useContext(AppContext);

// import { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { useAuth, useUser } from "@clerk/clerk-react";
// import toast from "react-hot-toast";

// axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// export const AppContext = createContext();

// export const AppProvider = ({ children }) => {
//   const { user, isLoaded } = useUser();
//   const { getToken } = useAuth();

//   const [shows, setShows] = useState([]);
//   const [favoriteMovies, setFavoriteMovies] = useState([]);
//   const [isAdmin, setIsAdmin] = useState(false);

//   // Add token to requests
//   useEffect(() => {
//     const interceptor = axios.interceptors.request.use(
//       async (config) => {
//         const publicUrls = ['/api/show/all', '/api/booking/seats/'];
//         const isPublic = publicUrls.some(url => config.url?.includes(url));
//         const isMovieDetail = config.url?.match(/\/api\/show\/tt\d+$/);

//         if (!isPublic && !isMovieDetail && user) {
//           const token = await getToken();
//           if (token) config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//       }
//     );
//     return () => axios.interceptors.request.eject(interceptor);
//   }, [user, getToken]);

//   // Check admin status
//   const checkAdmin = async () => {
//     if (!user) {
//       setIsAdmin(false);
//       return;
//     }

//     try {
//       const { data } = await axios.get("/api/admin/check");
//       setIsAdmin(data.success && data.isAdmin);
//     } catch (error) {
//       setIsAdmin(false);
//     }
//   };

//   const fetchShows = async () => {
//     try {
//       const { data } = await axios.get("/api/show/all");
//       if (data.success) setShows(data.shows);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const fetchFavoriteMovies = async () => {
//     if (!user) return;
//     try {
//       const { data } = await axios.get("/api/user/favorites");
//       if (data.success) setFavoriteMovies(data.movies);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const toggleFavorite = async (movieId) => {
//     if (!user) {
//       toast.error("Please login");
//       return;
//     }

//     try {
//       const { data } = await axios.post("/api/user/update-favorite", { movieId });
//       if (data.success) {
//         const isFav = favoriteMovies.some(m => m._id === movieId);
//         if (isFav) {
//           setFavoriteMovies(favoriteMovies.filter(m => m._id !== movieId));
//           toast.success("Removed");
//         } else {
//           await fetchFavoriteMovies();
//           toast.success("Added");
//         }
//       }
//     } catch (error) {
//       toast.error("Failed");
//     }
//   };

//   const isFavoriteMovie = (movieId) => {
//     return favoriteMovies.some(m => m._id === movieId);
//   };

//   useEffect(() => {
//     fetchShows();
//   }, []);

//   useEffect(() => {
//     if (user) {
//       fetchFavoriteMovies();
//       checkAdmin();
//     } else {
//       setFavoriteMovies([]);
//       setIsAdmin(false);
//     }
//   }, [user]);

//   return (
//     <AppContext.Provider value={{
//       axios,
//       user,
//       isLoaded,
//       isAdmin,
//       getToken,
//       shows,
//       favoriteMovies,
//       fetchFavoriteMovies,
//       toggleFavorite,
//       isFavoriteMovie,
//     }}>
//       {children}
//     </AppContext.Provider>
//   );
// };

// export const useAppContext = () => useContext(AppContext);

// import { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { useAuth, useUser } from "@clerk/clerk-react";
// import toast from "react-hot-toast";

// axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// export const AppContext = createContext();

// export const AppProvider = ({ children }) => {
//   const { user, isLoaded } = useUser();
//   const { getToken } = useAuth();

//   const [shows, setShows] = useState([]);
//   const [favoriteMovies, setFavoriteMovies] = useState([]);

//   useEffect(() => {
//     const interceptor = axios.interceptors.request.use(
//       async (config) => {
//         const publicUrls = ['/api/show/all', '/api/booking/seats/', '/api/show/tt'];
//         const isPublic = publicUrls.some(url => config.url?.includes(url));

//         if (!isPublic && user) {
//           const token = await getToken();
//           if (token) config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//       }
//     );
//     return () => axios.interceptors.request.eject(interceptor);
//   }, [user, getToken]);

//   const fetchShows = async () => {
//     try {
//       const { data } = await axios.get("/api/show/all");
//       if (data.success) setShows(data.shows);
//     } catch (error) {}
//   };

//   const fetchFavoriteMovies = async () => {
//     if (!user) return;
//     try {
//       const { data } = await axios.get("/api/user/favorites");
//       if (data.success) setFavoriteMovies(data.movies);
//     } catch (error) {}
//   };

//   const toggleFavorite = async (movieId) => {
//     if (!user) {
//       toast.error("Please login");
//       return;
//     }

//     try {
//       const { data } = await axios.post("/api/user/update-favorite", { movieId });
//       if (data.success) {
//         const isFav = favoriteMovies.some(m => m._id === movieId);
//         if (isFav) {
//           setFavoriteMovies(favoriteMovies.filter(m => m._id !== movieId));
//           toast.success("Removed from favorites");
//         } else {
//           await fetchFavoriteMovies();
//           toast.success("Added to favorites");
//         }
//       }
//     } catch (error) {
//       toast.error("Failed");
//     }
//   };
//   const toggleFavorite = async (movieId) => {
//   if (!user) {
//     toast.error("Please login");
//     return;
//   }

//   try {
//     const { data } = await axios.post(
//       "/api/user/update-favorite",
//       { movieId }
//     );

//     if (data.success) {
//       await fetchFavoriteMovies(); // ✅ ALWAYS re-sync from DB
//       toast.success(data.message || "Updated favorites");
//     }
//   } catch (error) {
//     toast.error("Failed to update favorites");
//   }
// };


//   const isFavoriteMovie = (movieId) => {
//     return favoriteMovies.some(m => m._id === movieId);
//   };

//   useEffect(() => {
//     fetchShows();
//   }, []);

//   useEffect(() => {
//     if (user) {
//       fetchFavoriteMovies();
//     } else {
//       setFavoriteMovies([]);
//     }
//   }, [user]);

//   return (
//     <AppContext.Provider value={{
//       axios,
//       user,
//       isLoaded,
//       getToken,
//       shows,
//       favoriteMovies,
//       fetchFavoriteMovies,
//       toggleFavorite,
//       isFavoriteMovie,
//     }}>
//       {children}
//     </AppContext.Provider>
//   );
// };

// export const useAppContext = () => useContext(AppContext);

// import { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { useAuth, useUser } from "@clerk/clerk-react";
// import toast from "react-hot-toast";

// axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// export const AppContext = createContext();

// export const AppProvider = ({ children }) => {
//   const { user, isLoaded } = useUser();
//   const { getToken } = useAuth();

//   const [shows, setShows] = useState([]);
//   const [favoriteMovies, setFavoriteMovies] = useState([]);

//   useEffect(() => {
//     const interceptor = axios.interceptors.request.use(
//       async (config) => {
//         const publicUrls = ['/api/show/all', '/api/booking/seats/', '/api/show/tt'];
//         const isPublic = publicUrls.some(url => config.url?.includes(url));

//         if (!isPublic && user) {
//           const token = await getToken();
//           if (token) config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//       }
//     );
//     return () => axios.interceptors.request.eject(interceptor);
//   }, [user, getToken]);

//   const fetchShows = async () => {
//     try {
//       const { data } = await axios.get("/api/show/all");
//       if (data.success) setShows(data.shows);
//     } catch (error) {}
//   };

//    const fetchFavoriteMovies = async () => {
//   if (!user) return;
//   try {
//     // ✅ Send userId as query parameter
//     const { data } = await axios.get(`/api/user/favorites?userId=${user.id}`);
//     if (data.success) setFavoriteMovies(data.movies);
//   } catch (error) {
//     console.error("Fetch favorites error:", error);
//   }
// };

// // const toggleFavorite = async (movieId) => {
// //   if (!user) {
// //     toast.error("Please login");
// //     return;
// //   }

// //   try {
// //     // ✅ Send userId in body
// //     const { data } = await axios.post("/api/user/update-favorite", { 
// //       movieId,
// //       userId: user.id 
// //     });
    
// //     if (data.success) {
// //       const isFav = favoriteMovies.some(m => m._id === movieId);
// //       if (isFav) {
// //         setFavoriteMovies(favoriteMovies.filter(m => m._id !== movieId));
// //         toast.success("Removed from favorites");
// //       } else {
// //         await fetchFavoriteMovies();
// //         toast.success("Added to favorites");
// //       }
// //     }
// //   } catch (error) {
// //     console.error("Toggle favorite error:", error);
// //     toast.error("Failed");
// //   }
// // };
// const toggleFavorite = async (movieId) => {
//   if (!user) {
//     toast.error("Please login");
//     return;
//   }

//   try {
//     const { data } = await axios.post("/api/user/update-favorite", { 
//       movieId,
//       userId: user.id 
//     });
    
//     if (data.success) {
//       // ✅ Force re-fetch favorites to update state
//       await fetchFavoriteMovies();
      
//       const isFav = favoriteMovies.some(m => m._id === movieId);
//       if (isFav) {
//         toast.success("Removed from favorites");
//       } else {
//         toast.success("Added to favorites");
//       }
//     }
//   } catch (error) {
//     console.error("Toggle favorite error:", error);
//     toast.error("Failed");
//   }
// };
//   const isFavoriteMovie = (movieId) => {
//     return favoriteMovies.some(m => m._id === movieId);
//   };

//   useEffect(() => {
//     fetchShows();
//   }, []);

//   useEffect(() => {
//     if (user) {
//       fetchFavoriteMovies();
//     } else {
//       setFavoriteMovies([]);
//     }
//   }, [user]);

//   return (
//     <AppContext.Provider value={{
//       axios,
//       user,
//       isLoaded,
//       getToken,
//       shows,
//       favoriteMovies,
//       fetchFavoriteMovies,
//       toggleFavorite,
//       isFavoriteMovie,
//     }}>
//       {children}
//     </AppContext.Provider>
//   );
// };

// export const useAppContext = () => useContext(AppContext);
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth, useUser } from "@clerk/clerk-react";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();

  const [shows, setShows] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [favoritesLoading, setFavoritesLoading] = useState(false);

  useEffect(() => {
    const interceptor = axios.interceptors.request.use(
      async (config) => {
        const publicUrls = ['/api/show/all', '/api/booking/seats/', '/api/show/tt'];
        const isPublic = publicUrls.some(url => config.url?.includes(url));

        if (!isPublic && user) {
          const token = await getToken();
          if (token) config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      }
    );
    return () => axios.interceptors.request.eject(interceptor);
  }, [user, getToken]);

  const fetchShows = async () => {
    try {
      const { data } = await axios.get("/api/show/all");
      if (data.success) setShows(data.shows);
    } catch (error) {
      console.error("Fetch shows error:", error);
    }
  };

  const fetchFavoriteMovies = async () => {
    if (!user) {
      setFavoriteMovies([]);
      return;
    }
    
    try {
      setFavoritesLoading(true);
      const { data } = await axios.get(`/api/user/favorites?userId=${user.id}`);
      
      console.log("Favorites response:", data); // DEBUG
      
      if (data.success) {
        setFavoriteMovies(data.movies || []);
      } else {
        setFavoriteMovies([]);
      }
    } catch (error) {
      console.error("Fetch favorites error:", error);
      setFavoriteMovies([]);
    } finally {
      setFavoritesLoading(false);
    }
  };

  const toggleFavorite = async (movieId) => {
    if (!user) {
      toast.error("Please login to add favorites");
      return;
    }

    try {
      console.log("Toggling favorite for movie:", movieId, "User:", user.id); // DEBUG
      
      const { data } = await axios.post("/api/user/update-favorite", { 
        movieId,
        userId: user.id 
      });
      
      console.log("Toggle response:", data); // DEBUG
      
      if (data.success) {
        // ✅ Update local state immediately
        const isFav = favoriteMovies.some(m => m._id === movieId);
        
        if (isFav) {
          // Remove from favorites
          setFavoriteMovies(prev => prev.filter(m => m._id !== movieId));
          toast.success("Removed from favorites");
        } else {
          // Re-fetch to get the complete movie object
          await fetchFavoriteMovies();
          toast.success("Added to favorites");
        }
      } else {
        toast.error(data.message || "Failed to update favorite");
      }
    } catch (error) {
      console.error("Toggle favorite error:", error);
      toast.error("Failed to update favorite");
    }
  };

  const isFavoriteMovie = (movieId) => {
    const result = favoriteMovies.some(m => m._id === movieId);
    console.log(`Is ${movieId} favorite?`, result, favoriteMovies); // DEBUG
    return result;
  };

  useEffect(() => {
    fetchShows();
  }, []);

  useEffect(() => {
    if (isLoaded) {
      if (user) {
        console.log("User loaded, fetching favorites for:", user.id); // DEBUG
        fetchFavoriteMovies();
      } else {
        console.log("No user, clearing favorites"); // DEBUG
        setFavoriteMovies([]);
      }
    }
  }, [user, isLoaded]);

  return (
    <AppContext.Provider value={{
      axios,
      user,
      isLoaded,
      getToken,
      shows,
      favoriteMovies,
      favoritesLoading,
      fetchFavoriteMovies,
      toggleFavorite,
      isFavoriteMovie,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);