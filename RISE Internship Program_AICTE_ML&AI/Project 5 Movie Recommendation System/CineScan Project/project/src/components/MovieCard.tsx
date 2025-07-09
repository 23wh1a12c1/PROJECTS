import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Play, Heart, Bookmark, MoreHorizontal, Clock, Calendar, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Movie {
  id: string;
  title: string;
  year: number;
  rating: number;
  poster: string;
  genre: string;
  director: string;
  duration?: string;
  isNew?: boolean;
  isTrending?: boolean;
}

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [userRating, setUserRating] = useState(0);

  return (
    <motion.div
      className="group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all duration-300"
      whileHover={{ y: -8, scale: 1.02 }}
      onHoverStart={() => setShowOptions(true)}
      onHoverEnd={() => setShowOptions(false)}
      layout
    >
      {/* Movie Poster */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <motion.img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          whileHover={{ scale: 1.1 }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {movie.isNew && (
            <motion.span 
              className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              NEW
            </motion.span>
          )}
          {movie.isTrending && (
            <motion.span 
              className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              🔥 TRENDING
            </motion.span>
          )}
        </div>

        {/* Rating Badge */}
        <motion.div 
          className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1 border border-white/20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Star className="h-3 w-3 text-yellow-400 fill-current" />
          <span className="text-white text-sm font-medium">{movie.rating}</span>
        </motion.div>

        {/* Hover Overlay with Play Button */}
        <AnimatePresence>
          {showOptions && (
            <motion.div
              className="absolute inset-0 bg-black/60 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                to={`/movie/${movie.id}`}
                className="group/play"
              >
                <motion.div
                  className="p-4 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all border border-white/30"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
                >
                  <Play className="h-8 w-8 text-white fill-current" />
                </motion.div>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <AnimatePresence>
          {showOptions && (
            <motion.div
              className="absolute bottom-3 right-3 flex space-x-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              <motion.button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-2 rounded-full backdrop-blur-sm transition-all border ${
                  isLiked 
                    ? 'bg-red-500 text-white border-red-500' 
                    : 'bg-black/50 text-gray-300 hover:text-red-400 border-white/20'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
              </motion.button>
              
              <motion.button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`p-2 rounded-full backdrop-blur-sm transition-all border ${
                  isBookmarked 
                    ? 'bg-blue-500 text-white border-blue-500' 
                    : 'bg-black/50 text-gray-300 hover:text-blue-400 border-white/20'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Movie Info */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="text-white font-semibold text-lg mb-1 truncate group-hover:text-purple-300 transition-colors">
            {movie.title}
          </h3>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span>{movie.year}</span>
            </div>
            <span>•</span>
            <span>{movie.genre}</span>
            {movie.duration && (
              <>
                <span>•</span>
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{movie.duration}</span>
                </div>
              </>
            )}
          </div>
          <p className="text-gray-500 text-sm mt-1">Directed by {movie.director}</p>
        </div>
        
        {/* User Rating */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">Your Rating</span>
            <div className="flex items-center space-x-1">
              <Eye className="h-3 w-3 text-gray-500" />
              <span className="text-xs text-gray-500">1.2k views</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.button
                key={star}
                onClick={() => setUserRating(star)}
                className={`transition-colors ${
                  star <= userRating ? 'text-yellow-400' : 'text-gray-500 hover:text-yellow-400'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
              >
                <Star className={`h-4 w-4 ${star <= userRating ? 'fill-current' : ''}`} />
              </motion.button>
            ))}
            {userRating > 0 && (
              <span className="text-yellow-400 text-sm font-medium ml-2">{userRating}/5</span>
            )}
          </div>
        </div>
      </div>

      {/* Progress Bar Animation */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 transform origin-left"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default MovieCard;