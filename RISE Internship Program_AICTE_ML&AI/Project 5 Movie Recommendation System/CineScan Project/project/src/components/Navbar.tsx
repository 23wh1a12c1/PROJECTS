import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Film, Search, Bell, User, Settings, LogOut, Menu, X, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 w-full bg-black/30 backdrop-blur-xl z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-3 group">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <Film className="h-8 w-8 text-purple-400 relative z-10" />
            </motion.div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                CineConnect
              </span>
              <div className="flex items-center space-x-1 mt-0.5">
                <Sparkles className="h-3 w-3 text-yellow-400" />
                <span className="text-xs text-gray-400 font-medium">Netflix × Instagram</span>
              </div>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <motion.div 
              className="relative w-full"
              animate={{ scale: searchFocused ? 1.02 : 1 }}
              transition={{ duration: 0.2 }}
            >
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className={`h-5 w-5 transition-colors ${searchFocused ? 'text-purple-400' : 'text-gray-400'}`} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all backdrop-blur-lg"
                placeholder="Search movies, people, or genres..."
              />
              {searchFocused && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl -z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </motion.div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Notifications */}
            <motion.button 
              className="relative p-3 text-gray-300 hover:text-white transition-colors rounded-xl hover:bg-white/10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Bell className="h-6 w-6" />
              <motion.span 
                className="absolute top-1 right-1 h-3 w-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.button>

            {/* Profile Dropdown */}
            <div className="relative">
              <motion.button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-3 p-2 rounded-xl hover:bg-white/10 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center ring-2 ring-white/20">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900"></div>
                </div>
                <div className="text-left">
                  <span className="text-white font-medium block">{user?.username}</span>
                  <span className="text-gray-400 text-sm">Online</span>
                </div>
              </motion.button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    className="absolute right-0 mt-2 w-64 bg-black/80 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Profile Header */}
                    <div className="p-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-b border-white/10">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
                          <User className="h-7 w-7 text-white" />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">{user?.username}</h3>
                          <p className="text-gray-400 text-sm">{user?.email}</p>
                        </div>
                      </div>
                    </div>

                    <div className="py-2">
                      <Link
                        to={`/profile/${user?.id}`}
                        className="flex items-center px-4 py-3 text-white hover:bg-white/10 transition-colors group"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <User className="h-5 w-5 mr-3 text-purple-400 group-hover:text-purple-300" />
                        <span>My Profile</span>
                      </Link>
                      <button
                        className="w-full flex items-center px-4 py-3 text-white hover:bg-white/10 transition-colors group"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <Settings className="h-5 w-5 mr-3 text-blue-400 group-hover:text-blue-300" />
                        <span>Settings</span>
                      </button>
                      <hr className="border-white/20 my-2" />
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-3 text-red-300 hover:bg-red-500/10 transition-colors group"
                      >
                        <LogOut className="h-5 w-5 mr-3 group-hover:text-red-400" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile menu button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white hover:text-purple-300 transition-colors rounded-xl hover:bg-white/10"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden pb-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Mobile Search */}
              <div className="relative mb-4">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all backdrop-blur-lg"
                  placeholder="Search..."
                />
              </div>

              {/* Mobile Navigation Links */}
              <div className="space-y-2">
                <Link
                  to={`/profile/${user?.id}`}
                  className="flex items-center px-4 py-3 text-white hover:bg-white/10 rounded-xl transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="h-5 w-5 mr-3 text-purple-400" />
                  My Profile
                </Link>
                <button
                  className="w-full flex items-center px-4 py-3 text-white hover:bg-white/10 rounded-xl transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Bell className="h-5 w-5 mr-3 text-blue-400" />
                  Notifications
                </button>
                <button
                  className="w-full flex items-center px-4 py-3 text-white hover:bg-white/10 rounded-xl transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Settings className="h-5 w-5 mr-3 text-gray-400" />
                  Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-3 text-red-300 hover:bg-red-500/10 rounded-xl transition-colors"
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  Sign Out
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;