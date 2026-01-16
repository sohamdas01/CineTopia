import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Mail, Calendar, Heart, Ticket, DollarSign, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import Loading from '../../components/Loading';

const Users = () => {
  const { axios } = useAppContext();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/admin/users');
      
      if (data.success) {
        setUsers(data.users);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Fetch users error:", error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Loading />;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Users</h1>
        <p className="text-gray-400">Total registered users: {users.length}</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-96 pl-10 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-red-600"
        />
      </div>

      {/* Users Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <div
            key={user._id}
            className="bg-zinc-900 rounded-xl border border-zinc-800 hover:border-red-900 transition-all overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-red-900/20 to-red-600/20 p-4 border-b border-zinc-800">
              <div className="flex items-center gap-4">
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-red-600"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-white truncate">
                    {user.name}
                  </h3>
                  <div className="flex items-center gap-1 text-sm text-gray-400">
                    <Mail className="w-3 h-3" />
                    <span className="truncate">{user.email}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-400">
                  <Ticket className="w-4 h-4 text-red-500" />
                  <span className="text-sm">Bookings</span>
                </div>
                <span className="text-white font-semibold">
                  {user.bookingCount || 0}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-400">
                  <DollarSign className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Total Spent</span>
                </div>
                <span className="text-white font-semibold">
                  ${user.totalSpent || 0}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-400">
                  <Heart className="w-4 h-4 text-pink-500" />
                  <span className="text-sm">Favorites</span>
                </div>
                <span className="text-white font-semibold">
                  {user.favorites?.length || 0}
                </span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
                <div className="flex items-center gap-2 text-gray-400">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">Joined</span>
                </div>
                <span className="text-white text-sm">
                  {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </div>

              {user.isAdmin && (
                <div className="mt-3 px-3 py-1 bg-red-600/20 border border-red-600 rounded-full text-center">
                  <span className="text-red-500 text-xs font-semibold">ADMIN</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-20">
          <p className="text-xl text-gray-400">No users found</p>
        </div>
      )}
    </div>
  );
};

export default Users;