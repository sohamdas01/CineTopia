
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
      color: "text-pink-500",
      bgColor: "bg-pink-500/20",
    },
    {
      label: "Total Revenue",
      value: `${currency}${dashboardData.totalRevenue.toLocaleString()}`,
      icon: DollarSignIcon,
      color: "text-pink-500",
      bgColor: "bg-pink-500/20",
    },
    {
      label: "Active Shows",
      value: dashboardData.activeShows.length,
      icon: PlayCircleIcon,
      color: "text-pink-500",
      bgColor: "bg-pink-500/20",
    },
    {
      label: "Total Users",
      value: dashboardData.totalUser,
      icon: UsersIcon,
      color: "text-pink-500",
      bgColor: "bg-pink-500/20",
    },
  ];

  return (
    <>
      <div className="flex items-center justify-between">
        <Title text1="Admin" text2="Dashboard" />
        <button
          onClick={fetchDashboardData}
          className="flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
        >
          <RefreshCwIcon className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div className="flex flex-wrap gap-4 mt-6">
        {statsCards.map((card, i) => (
          <div
            key={i}
            className="flex items-center justify-between px-6 py-4 bg-black border-2 border-pink-500/40 rounded-xl shadow-sm hover:shadow-pink-500/40 transition-shadow w-64"
          >
            <div>
              <p className="text-sm text-gray-300 mb-1">{card.label}</p>
              <p className="text-2xl font-bold text-pink-500">{card.value}</p>
            </div>
            <div className={`${card.bgColor} p-3 rounded-lg`}>
              <card.icon className={`w-6 h-6 ${card.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Active Shows */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 text-pink-500">Active Shows</h2>

        {Array.isArray(dashboardData.activeShows) &&
        dashboardData.activeShows.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {dashboardData.activeShows.map((show) => (
              <div
                key={show._id}
                className="bg-black border border-pink-500/40 rounded-xl overflow-hidden hover:shadow-pink-500/40 transition-shadow"
              >
                <img
                  src={
                    show.movie?.poster_path ||
                    "https://via.placeholder.com/300x450"
                  }
                  alt={show.movie?.title}
                  className="h-64 w-full object-cover"
                />
                <div className="p-4">
                  <p className="font-semibold truncate mb-2 text-pink-500">
                    {show.movie?.title || "Unknown"}
                  </p>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-lg font-bold text-pink-500">
                      {currency}
                      {show.showPrice || 0}
                    </p>
                    <p className="flex items-center gap-1 text-sm text-gray-300">
                      <StarIcon className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      {show.movie?.vote_average?.toFixed(1) ?? "N/A"}
                    </p>
                  </div>
                  <p className="text-sm text-gray-400">
                    {show.showDateTime ? dateFormat(show.showDateTime) : "N/A"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-black/70 rounded-xl">
            <PlayCircleIcon className="w-16 h-16 text-pink-500 mx-auto mb-4" />
            <p className="text-gray-300">No active shows</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
