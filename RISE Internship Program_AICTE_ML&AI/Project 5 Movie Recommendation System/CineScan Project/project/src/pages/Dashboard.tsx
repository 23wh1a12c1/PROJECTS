import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Sparkles, TrendingUp, Users, Heart, Bookmark, Play, Film, Star, Siren as Fire, Zap, Target, Grid, List, Search, Filter, Bell, Settings } from 'lucide-react';
import Navbar from '../components/Navbar';
import NetflixHero from '../components/NetflixHero';
import MovieRow from '../components/MovieRow';
import SocialFeed from '../components/SocialFeed';
import ActivityFeed from '../components/ActivityFeed';
import UserCard from '../components/UserCard';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const preferences = localStorage.getItem('cineconnect_preferences');
    if (!preferences) {
      navigate('/onboarding');
    }
    
    setTimeout(() => setIsLoading(false), 1200);
  }, [navigate]);

  // Enhanced movie data with more Netflix-style properties
  const trendingMovies = [
    {
      id: '1',
      title: 'Dune: Part Two',
      poster: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 8.5,
      year: 2024,
      genre: 'Sci-Fi',
      duration: '2h 46m',
      isNew: true,
      isTrending: true,
      views: '2.1M',
      matchPercentage: 98
    },
    {
      id: '2',
      title: 'Oppenheimer',
      poster: 'https://images.pexels.com/photos/7991321/pexels-photo-7991321.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 8.3,
      year: 2023,
      genre: 'Biography',
      duration: '3h 0m',
      isTrending: true,
      views: '1.8M',
      matchPercentage: 95
    },
    {
      id: '3',
      title: 'The Batman',
      poster: 'https://images.pexels.com/photos/7991434/pexels-photo-7991434.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 7.8,
      year: 2022,
      genre: 'Action',
      duration: '2h 56m',
      views: '3.2M',
      matchPercentage: 92
    },
    {
      id: '4',
      title: 'Everything Everywhere All at Once',
      poster: 'https://images.pexels.com/photos/7991545/pexels-photo-7991545.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 7.8,
      year: 2022,
      genre: 'Sci-Fi',
      duration: '2h 19m',
      isNew: true,
      views: '1.5M',
      matchPercentage: 89
    },
    {
      id: '5',
      title: 'Top Gun: Maverick',
      poster: 'https://images.pexels.com/photos/7991123/pexels-photo-7991123.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 8.2,
      year: 2022,
      genre: 'Action',
      duration: '2h 10m',
      views: '2.8M',
      matchPercentage: 87
    },
    {
      id: '6',
      title: 'Avatar: The Way of Water',
      poster: 'https://images.pexels.com/photos/7991456/pexels-photo-7991456.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 7.6,
      year: 2022,
      genre: 'Sci-Fi',
      duration: '3h 12m',
      views: '4.1M',
      matchPercentage: 85
    }
  ];

  const recommendedMovies = [
    {
      id: '7',
      title: 'Blade Runner 2049',
      poster: 'https://images.pexels.com/photos/7991234/pexels-photo-7991234.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 8.0,
      year: 2017,
      genre: 'Sci-Fi',
      duration: '2h 44m',
      views: '1.2M',
      matchPercentage: 94
    },
    {
      id: '8',
      title: 'Arrival',
      poster: 'https://images.pexels.com/photos/7991567/pexels-photo-7991567.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 7.9,
      year: 2016,
      genre: 'Sci-Fi',
      duration: '1h 56m',
      views: '980K',
      matchPercentage: 91
    },
    {
      id: '9',
      title: 'Interstellar',
      poster: 'https://images.pexels.com/photos/7991678/pexels-photo-7991678.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 8.6,
      year: 2014,
      genre: 'Sci-Fi',
      duration: '2h 49m',
      views: '2.5M',
      matchPercentage: 96
    },
    {
      id: '10',
      title: 'Mad Max: Fury Road',
      poster: 'https://images.pexels.com/photos/7991789/pexels-photo-7991789.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 8.1,
      year: 2015,
      genre: 'Action',
      duration: '2h 0m',
      views: '1.7M',
      matchPercentage: 88
    }
  ];

  const suggestedUsers = [
    {
      id: '1',
      username: 'movie_critic_sarah',
      profilePicture: 'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=150',
      commonMovies: 23,
      isFollowing: false,
      isVerified: true,
      followers: '12.5K'
    },
    {
      id: '2',
      username: 'film_buff_alex',
      profilePicture: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
      commonMovies: 18,
      isFollowing: false,
      followers: '8.2K'
    },
    {
      id: '3',
      username: 'indie_lover_mike',
      profilePicture: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150',
      commonMovies: 15,
      isFollowing: true,
      followers: '5.7K'
    }
  ];

  const tabs = [
    { 
      id: 'home', 
      label: 'Home', 
      icon: Sparkles,
      gradient: 'from-purple-500 to-pink-500',
      description: 'Your personalized feed'
    },
    { 
      id: 'trending', 
      label: 'Trending', 
      icon: Fire,
      gradient: 'from-orange-500 to-red-500',
      description: 'What\'s hot right now'
    },
    { 
      id: 'social', 
      label: 'Social', 
      icon: Users,
      gradient: 'from-blue-500 to-cyan-500',
      description: 'Friends & community'
    },
    { 
      id: 'my-list', 
      label: 'My List', 
      icon: Bookmark,
      gradient: 'from-green-500 to-emerald-500',
      description: 'Your saved content'
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative mb-8">
            <div className="w-24 h-24 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 w-24 h-24 border-4 border-pink-500/30 border-b-pink-500 rounded-full animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Film className="h-8 w-8 text-white" />
            </div>
          </div>
          <motion.div
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-white mb-3">Welcome back, {user?.username}!</h2>
            <p className="text-gray-300 text-lg mb-4">🎬 Curating your cinematic experience...</p>
            <div className="flex items-center justify-center space-x-2 text-purple-300">
              <Sparkles className="h-4 w-4 animate-pulse" />
              <span className="text-sm">Netflix meets Instagram</span>
              <Sparkles className="h-4 w-4 animate-pulse" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />
      
      <div className="pt-16">
        {/* Enhanced Navigation with Netflix-style tabs */}
        <div className="sticky top-16 z-40 bg-black/20 backdrop-blur-xl border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Main Navigation */}
            <div className="flex items-center justify-between py-3">
              <div className="flex space-x-1">
                {tabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative px-6 py-3 rounded-xl font-medium text-sm flex items-center space-x-2 transition-all group ${
                      activeTab === tab.id
                        ? 'text-white shadow-lg'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {activeTab === tab.id && (
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-r ${tab.gradient} rounded-xl opacity-90`}
                        layoutId="activeTab"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <tab.icon className="h-4 w-4 relative z-10" />
                    <span className="relative z-10 hidden sm:inline">{tab.label}</span>
                    
                    {/* Tooltip for mobile */}
                    <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity sm:hidden">
                      {tab.description}
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="flex items-center space-x-3">
                <motion.button
                  onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                  className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/10"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {viewMode === 'grid' ? <List className="h-5 w-5" /> : <Grid className="h-5 w-5" />}
                </motion.button>
                
                <motion.button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`p-2 transition-colors rounded-lg ${
                    showFilters ? 'text-purple-400 bg-purple-500/20' : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Filter className="h-5 w-5" />
                </motion.button>
              </div>
            </div>

            {/* Search Bar (when filters are shown) */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  className="pb-4"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search movies, genres, actors..."
                      className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Content with smooth transitions */}
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <NetflixHero />
              
              <div className="relative -mt-32 z-10 space-y-12">
                {/* Welcome Section with Instagram-style stats */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                  <motion.div
                    className="bg-gradient-to-r from-purple-600/10 to-pink-600/10 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="grid lg:grid-cols-3 gap-8 items-center">
                      <div className="lg:col-span-2">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                            <Zap className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h2 className="text-3xl font-bold text-white">
                              Welcome back, {user?.username}! 🎬
                            </h2>
                            <p className="text-gray-300 text-lg">
                              Your personalized cinema awaits
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {['Sci-Fi Lover', 'Action Fan', 'Drama Enthusiast'].map((tag) => (
                            <span key={tag} className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 rounded-full text-sm border border-purple-500/30">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {/* Instagram-style stats */}
                      <div className="grid grid-cols-3 gap-4 lg:gap-6">
                        {[
                          { label: 'Movies', value: '342', icon: Film, color: 'text-purple-400' },
                          { label: 'Reviews', value: '89', icon: Star, color: 'text-yellow-400' },
                          { label: 'Followers', value: '1.2K', icon: Users, color: 'text-blue-400' }
                        ].map((stat) => (
                          <motion.div
                            key={stat.label}
                            className="text-center p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
                            whileHover={{ scale: 1.05, y: -2 }}
                          >
                            <stat.icon className={`h-6 w-6 ${stat.color} mx-auto mb-2`} />
                            <div className="text-2xl font-bold text-white">{stat.value}</div>
                            <div className="text-xs text-gray-400">{stat.label}</div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Movie Rows with enhanced styling */}
                <MovieRow 
                  title="🔥 Trending Now" 
                  movies={trendingMovies} 
                  priority="high"
                />
                
                <MovieRow 
                  title="🎯 Perfect Matches for You" 
                  movies={recommendedMovies}
                  priority="high"
                />
                
                <MovieRow 
                  title="🆕 Fresh Releases" 
                  movies={trendingMovies.slice(0, 4)}
                  priority="medium"
                />
                
                <MovieRow 
                  title="🏆 CineConnect Favorites" 
                  movies={recommendedMovies.slice(0, 4)}
                  priority="medium"
                />
              </div>
            </motion.div>
          )}

          {activeTab === 'trending' && (
            <motion.div
              key="trending"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="pt-8"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                  className="text-center mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-lg rounded-2xl px-8 py-4 border border-orange-500/30 mb-6">
                    <Fire className="h-8 w-8 text-orange-400" />
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                      What's Trending
                    </h1>
                  </div>
                  <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                    The hottest movies everyone's talking about right now. Join the conversation and discover what's capturing the world's attention.
                  </p>
                </motion.div>
              </div>
              
              <MovieRow 
                title="🚀 Trending This Week" 
                movies={trendingMovies}
                priority="high"
              />
              
              <MovieRow 
                title="📈 Rising Fast" 
                movies={recommendedMovies}
                priority="high"
              />
              
              <MovieRow 
                title="🌟 Most Watched Today" 
                movies={trendingMovies.slice(2, 6)}
                priority="medium"
              />
            </motion.div>
          )}

          {activeTab === 'social' && (
            <motion.div
              key="social"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
            >
              <div className="grid lg:grid-cols-4 gap-8">
                {/* Main Social Feed */}
                <div className="lg:col-span-3">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="flex items-center space-x-4 mb-8">
                      <div className="p-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl shadow-lg">
                        <Users className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h1 className="text-4xl font-bold text-white">Social Feed</h1>
                        <p className="text-gray-300 text-lg">See what your friends are watching and discover together</p>
                      </div>
                    </div>
                    <SocialFeed />
                  </motion.div>
                </div>

                {/* Enhanced Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                  {/* Suggested Users */}
                  <motion.div
                    className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-white flex items-center">
                        <Target className="h-5 w-5 mr-2 text-blue-400" />
                        Suggested for You
                      </h3>
                      <button className="text-blue-400 text-sm hover:text-blue-300 transition-colors">
                        See All
                      </button>
                    </div>
                    <div className="space-y-4">
                      {suggestedUsers.map((user) => (
                        <UserCard key={user.id} user={user} />
                      ))}
                    </div>
                  </motion.div>

                  {/* Activity Feed */}
                  <motion.div
                    className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                      <Heart className="h-5 w-5 mr-2 text-red-400" />
                      Recent Activity
                    </h3>
                    <ActivityFeed />
                  </motion.div>

                  {/* Trending Topics */}
                  <motion.div
                    className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2 text-purple-400" />
                      Trending Topics
                    </h3>
                    <div className="space-y-3">
                      {['#DunePartTwo', '#SciFiMovies', '#ChristopherNolan', '#MovieNight'].map((topic, index) => (
                        <motion.div
                          key={topic}
                          className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all cursor-pointer"
                          whileHover={{ scale: 1.02 }}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.8 + index * 0.1 }}
                        >
                          <span className="text-purple-300 font-medium">{topic}</span>
                          <span className="text-gray-400 text-sm">{Math.floor(Math.random() * 50) + 10}K</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'my-list' && (
            <motion.div
              key="my-list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center space-x-4 mb-12">
                  <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl shadow-lg">
                    <Bookmark className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold text-white">My List</h1>
                    <p className="text-gray-300 text-lg">Your personal movie collection and watchlist</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {/* Watchlist */}
                  <motion.div
                    className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-lg rounded-3xl p-8 border border-green-500/20 hover:border-green-500/40 transition-all cursor-pointer group"
                    whileHover={{ scale: 1.02, y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                        <Bookmark className="h-10 w-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3">Watchlist</h3>
                      <p className="text-gray-300 mb-6">Movies you want to watch</p>
                      <div className="text-3xl font-bold text-green-400 mb-4">12</div>
                      <motion.button
                        className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View Watchlist
                      </motion.button>
                    </div>
                  </motion.div>

                  {/* Favorites */}
                  <motion.div
                    className="bg-gradient-to-br from-red-500/10 to-pink-500/10 backdrop-blur-lg rounded-3xl p-8 border border-red-500/20 hover:border-red-500/40 transition-all cursor-pointer group"
                    whileHover={{ scale: 1.02, y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                        <Heart className="h-10 w-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3">Favorites</h3>
                      <p className="text-gray-300 mb-6">Your all-time favorites</p>
                      <div className="text-3xl font-bold text-red-400 mb-4">8</div>
                      <motion.button
                        className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-semibold hover:from-red-600 hover:to-pink-600 transition-all shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View Favorites
                      </motion.button>
                    </div>
                  </motion.div>

                  {/* Recently Watched */}
                  <motion.div
                    className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-lg rounded-3xl p-8 border border-blue-500/20 hover:border-blue-500/40 transition-all cursor-pointer group"
                    whileHover={{ scale: 1.02, y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                        <Play className="h-10 w-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3">Recently Watched</h3>
                      <p className="text-gray-300 mb-6">Continue where you left off</p>
                      <div className="text-3xl font-bold text-blue-400 mb-4">5</div>
                      <motion.button
                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Continue Watching
                      </motion.button>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Dashboard;