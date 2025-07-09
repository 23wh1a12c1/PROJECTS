import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  User, 
  Settings, 
  UserPlus, 
  UserCheck, 
  Star, 
  Film, 
  Heart,
  Calendar,
  Users,
  Award,
  Grid,
  List,
  BarChart3
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import MovieCard from '../components/MovieCard';

const Profile: React.FC = () => {
  const { userId } = useParams();
  const { user: currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [viewMode, setViewMode] = useState('grid');
  const [isFollowing, setIsFollowing] = useState(false);

  // Mock user data - in real app, this would be fetched based on userId
  const isOwnProfile = !userId || userId === currentUser?.id;
  
  const profileUser = {
    id: userId || currentUser?.id || '',
    username: isOwnProfile ? currentUser?.username || 'user' : 'jane_cinephile',
    email: isOwnProfile ? currentUser?.email || '' : 'jane@example.com',
    profilePicture: 'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=400',
    coverPhoto: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1200',
    bio: 'Cinema enthusiast | Sci-fi lover | Always hunting for hidden gems 🎬',
    joinDate: 'March 2023',
    location: 'Los Angeles, CA',
    website: 'cinephile-jane.blog',
    stats: {
      moviesWatched: 342,
      reviews: 89,
      followers: 1247,
      following: 456,
      averageRating: 3.8
    }
  };

  const watchedMovies = [
    {
      id: '1',
      title: 'Dune: Part Two',
      year: 2024,
      rating: 9.0,
      userRating: 5,
      poster: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400',
      genre: 'Sci-Fi',
      director: 'Denis Villeneuve',
      watchedDate: '2024-01-15'
    },
    {
      id: '2',
      title: 'Oppenheimer',
      year: 2023,
      rating: 8.3,
      userRating: 4,
      poster: 'https://images.pexels.com/photos/7991321/pexels-photo-7991321.jpeg?auto=compress&cs=tinysrgb&w=400',
      genre: 'Biography',
      director: 'Christopher Nolan',
      watchedDate: '2023-12-20'
    },
    // Add more movies...
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'movies', label: 'Movies', icon: Film },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'lists', label: 'Lists', icon: List },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />
      
      <div className="pt-20">
        {/* Cover Photo & Profile Header */}
        <div className="relative">
          <div className="h-64 bg-gradient-to-r from-purple-600 to-pink-600 relative overflow-hidden">
            <img
              src={profileUser.coverPhoto}
              alt="Cover"
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
          
          {/* Profile Picture & Info */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative -mt-16 flex flex-col sm:flex-row items-start sm:items-end space-y-4 sm:space-y-0 sm:space-x-6">
              <motion.div
                className="relative"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={profileUser.profilePicture}
                  alt={profileUser.username}
                  className="w-32 h-32 rounded-full border-4 border-white/20 bg-white/10 backdrop-blur-lg"
                />
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
              </motion.div>
              
              <div className="flex-1 pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-white mb-2">
                      {profileUser.username}
                    </h1>
                    <p className="text-gray-300 mb-2">{profileUser.bio}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        Joined {profileUser.joinDate}
                      </span>
                      {profileUser.location && (
                        <span>{profileUser.location}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                    {!isOwnProfile && (
                      <motion.button
                        onClick={() => setIsFollowing(!isFollowing)}
                        className={`px-6 py-2 rounded-full font-semibold transition-all flex items-center space-x-2 ${
                          isFollowing
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30'
                            : 'bg-purple-600 text-white hover:bg-purple-700'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {isFollowing ? (
                          <>
                            <UserCheck className="h-4 w-4" />
                            <span>Following</span>
                          </>
                        ) : (
                          <>
                            <UserPlus className="h-4 w-4" />
                            <span>Follow</span>
                          </>
                        )}
                      </motion.button>
                    )}
                    
                    {isOwnProfile && (
                      <button className="px-6 py-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all flex items-center space-x-2">
                        <Settings className="h-4 w-4" />
                        <span>Edit Profile</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { label: 'Movies Watched', value: profileUser.stats.moviesWatched, icon: Film },
              { label: 'Reviews', value: profileUser.stats.reviews, icon: Star },
              { label: 'Followers', value: profileUser.stats.followers, icon: Users },
              { label: 'Following', value: profileUser.stats.following, icon: UserPlus },
              { label: 'Avg Rating', value: profileUser.stats.averageRating, icon: Award },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="bg-white/5 backdrop-blur-lg rounded-xl p-4 text-center border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <stat.icon className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="flex space-x-8 border-b border-white/20">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-400'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'movies' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Watched Movies</h2>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'grid' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Grid className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'list' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <List className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 xl:grid-cols-4 gap-6' : 'space-y-4'}>
                {watchedMovies.map((movie, index) => (
                  <motion.div
                    key={movie.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {viewMode === 'grid' ? (
                      <MovieCard movie={movie} />
                    ) : (
                      <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
                        <img 
                          src={movie.poster} 
                          alt={movie.title}
                          className="w-16 h-24 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="text-white font-semibold">{movie.title}</h3>
                          <p className="text-gray-400 text-sm">{movie.year} • {movie.genre}</p>
                          <div className="flex items-center mt-2 space-x-4">
                            <div className="flex items-center">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-4 w-4 ${
                                    i < movie.userRating ? 'text-yellow-400 fill-current' : 'text-gray-500'
                                  }`} 
                                />
                              ))}
                            </div>
                            <span className="text-gray-500 text-sm">Watched {movie.watchedDate}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'overview' && (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Recent Activity */}
              <div className="lg:col-span-2">
                <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {[
                    { action: 'Rated', movie: 'Dune: Part Two', rating: 5, time: '2 hours ago' },
                    { action: 'Added to watchlist', movie: 'The Batman', time: '1 day ago' },
                    { action: 'Reviewed', movie: 'Oppenheimer', time: '3 days ago' },
                  ].map((activity, index) => (
                    <motion.div
                      key={index}
                      className="bg-white/5 rounded-lg p-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white">
                            <span className="text-purple-400">{activity.action}</span> {activity.movie}
                          </p>
                          {activity.rating && (
                            <div className="flex items-center mt-1">
                              {Array.from({ length: activity.rating }).map((_, i) => (
                                <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                              ))}
                            </div>
                          )}
                        </div>
                        <span className="text-gray-500 text-sm">{activity.time}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Favorite Genres */}
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Favorite Genres</h3>
                <div className="space-y-3">
                  {[
                    { genre: 'Sci-Fi', percentage: 85, color: 'bg-purple-500' },
                    { genre: 'Drama', percentage: 72, color: 'bg-blue-500' },
                    { genre: 'Thriller', percentage: 65, color: 'bg-green-500' },
                    { genre: 'Action', percentage: 58, color: 'bg-yellow-500' },
                    { genre: 'Comedy', percentage: 45, color: 'bg-red-500' },
                  ].map((item, index) => (
                    <motion.div
                      key={item.genre}
                      className="bg-white/5 rounded-lg p-3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white font-medium">{item.genre}</span>
                        <span className="text-gray-400 text-sm">{item.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className={`${item.color} h-2 rounded-full transition-all duration-1000`}
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;