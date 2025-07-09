import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Play, Plus, ThumbsUp, Eye, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Movie {
  id: string;
  title: string;
  poster: string;
  rating: number;
  year: number;
  genre: string;
  duration?: string;
  isNew?: boolean;
  isTrending?: boolean;
  views?: string;
  matchPercentage?: number;
}

interface MovieRowProps {
  title: string;
  movies: Movie[];
  priority?: 'high' | 'medium' | 'low';
}

const MovieRow: React.FC<MovieRowProps> = ({ title, movies, priority = 'medium' }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="mb-12">
      {/* Enhanced Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center justify-between">
          <motion.h2 
            className="text-2xl md:text-3xl font-bold text-white flex items-center space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span>{title}</span>
            {title.includes('Trending') && (
              <div className="flex items-center space-x-1 text-orange-400">
                <TrendingUp className="h-5 w-5" />
                <span className="text-sm font-medium">Hot</span>
              </div>
            )}
          </motion.h2>
          
          <motion.button
            className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            View All
          </motion.button>
        </div>
      </div>
      
      <div className="relative group">
        {/* Enhanced Navigation Arrows */}
        <motion.button
          onClick={() => scroll('left')}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm border border-white/20"
          whileHover={{ scale: 1.1, x: -2 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft className="h-6 w-6" />
        </motion.button>

        <motion.button
          onClick={() => scroll('right')}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm border border-white/20"
          whileHover={{ scale: 1.1, x: 2 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight className="h-6 w-6" />
        </motion.button>

        {/* Movies Container */}
        <div
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide px-4 sm:px-6 lg:px-8 pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {movies.map((movie, index) => (
            <motion.div
              key={movie.id}
              className="flex-shrink-0 w-72 group/item cursor-pointer"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -8 }}
            >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg border border-white/10 group-hover/item:border-purple-500/50 transition-all duration-300">
                {/* Movie Poster */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-110"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
                  
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

                  {/* Match Percentage */}
                  {movie.matchPercentage && (
                    <div className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                      {movie.matchPercentage}% Match
                    </div>
                  )}

                  {/* Rating Badge */}
                  <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1 border border-white/20">
                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                    <span className="text-white text-sm font-medium">{movie.rating}</span>
                  </div>

                  {/* Hover Overlay with Actions */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex space-x-3">
                      <Link
                        to={`/movie/${movie.id}`}
                        className="group/play"
                      >
                        <motion.div
                          className="p-3 bg-white text-black rounded-full hover:bg-gray-200 transition-colors shadow-lg"
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Play className="h-5 w-5 fill-current" />
                        </motion.div>
                      </Link>
                      
                      <motion.button 
                        className="p-3 bg-white/20 text-white rounded-full hover:bg-white/30 transition-colors backdrop-blur-sm border border-white/30"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Plus className="h-5 w-5" />
                      </motion.button>
                      
                      <motion.button 
                        className="p-3 bg-white/20 text-white rounded-full hover:bg-white/30 transition-colors backdrop-blur-sm border border-white/30"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ThumbsUp className="h-5 w-5" />
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Movie Info */}
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-1 truncate group-hover/item:text-purple-300 transition-colors">
                      {movie.title}
                    </h3>
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <div className="flex items-center space-x-2">
                        <span>{movie.year}</span>
                        <span>•</span>
                        <span>{movie.genre}</span>
                        {movie.duration && (
                          <>
                            <span>•</span>
                            <span>{movie.duration}</span>
                          </>
                        )}
                      </div>
                      {movie.views && (
                        <div className="flex items-center space-x-1">
                          <Eye className="h-3 w-3" />
                          <span>{movie.views}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Progress Bar for Netflix-style experience */}
                  <div className="w-full bg-gray-700 rounded-full h-1">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-1 rounded-full transition-all duration-1000"
                      style={{ width: `${Math.random() * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieRow;