import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, UserCheck, Film, Star, CheckCircle } from 'lucide-react';

interface User {
  id: string;
  username: string;
  profilePicture?: string;
  commonMovies: number;
  isFollowing: boolean;
  isVerified?: boolean;
  followers?: string;
}

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const [isFollowing, setIsFollowing] = useState(user.isFollowing);
  const [isLoading, setIsLoading] = useState(false);

  const handleFollow = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsFollowing(!isFollowing);
    setIsLoading(false);
  };

  return (
    <motion.div
      className="flex items-center justify-between p-4 bg-gradient-to-r from-white/5 to-white/10 rounded-2xl hover:from-white/10 hover:to-white/15 transition-all border border-white/10 hover:border-purple-500/30"
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center space-x-3">
        <div className="relative">
          <motion.img
            src={user.profilePicture || 'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=150'}
            alt={user.username}
            className="w-12 h-12 rounded-full object-cover border-2 border-purple-500/30 hover:border-purple-500/60 transition-colors"
            whileHover={{ scale: 1.1 }}
          />
          <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-gray-900"></div>
          {user.isVerified && (
            <div className="absolute -top-1 -right-1 bg-blue-500 rounded-full p-0.5">
              <CheckCircle className="h-3 w-3 text-white" />
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <h4 className="text-white font-semibold text-sm truncate">{user.username}</h4>
            {user.isVerified && (
              <CheckCircle className="h-4 w-4 text-blue-400 flex-shrink-0" />
            )}
          </div>
          <div className="flex items-center space-x-3 text-xs text-gray-400">
            <div className="flex items-center space-x-1">
              <Film className="h-3 w-3" />
              <span>{user.commonMovies} in common</span>
            </div>
            {user.followers && (
              <div className="flex items-center space-x-1">
                <Star className="h-3 w-3" />
                <span>{user.followers} followers</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <motion.button
        onClick={handleFollow}
        disabled={isLoading}
        className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1 shadow-lg ${
          isFollowing
            ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border border-green-500/30 hover:from-green-500/30 hover:to-emerald-500/30'
            : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 border border-purple-500/30'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isLoading ? (
          <div className="animate-spin rounded-full h-3 w-3 border-b border-current"></div>
        ) : (
          <>
            {isFollowing ? (
              <>
                <UserCheck className="h-3 w-3" />
                <span>Following</span>
              </>
            ) : (
              <>
                <UserPlus className="h-3 w-3" />
                <span>Follow</span>
              </>
            )}
          </>
        )}
      </motion.button>
    </motion.div>
  );
};

export default UserCard;