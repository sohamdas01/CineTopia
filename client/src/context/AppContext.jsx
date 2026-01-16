
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
      
      console.log("Favorites response:", data); 
      
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
      console.log("Toggling favorite for movie:", movieId, "User:", user.id); 
      
      const { data } = await axios.post("/api/user/update-favorite", { 
        movieId,
        userId: user.id 
      });
      
      console.log("Toggle response:", data);
      
      if (data.success) {
        // Update local state immediately
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
    console.log(`Is ${movieId} favorite?`, result, favoriteMovies); 
    return result;
  };

  useEffect(() => {
    fetchShows();
  }, []);

  useEffect(() => {
    if (isLoaded) {
      if (user) {
        console.log("User loaded, fetching favorites for:", user.id);
        fetchFavoriteMovies();
      } else {
        console.log("No user, clearing favorites"); 
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