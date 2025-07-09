import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Plus, ThumbsUp, Info, Volume2, VolumeX, Star, Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Movie {
  id: string;
  title: string;
  description: string;
  backdrop: string;
  rating: number;
  year: number;
  genre: string[];
  duration: string;
  maturityRating: string;
  director: string;
  cast: string[];
}

const NetflixHero: React.FC = () => {
  const [currentMovie, setCurrentMovie] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const featuredMovies: Movie[] = [
    {
      id: '1',
      title: 'Dune: Part Two',
      description: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, he must prevent a terrible future only he can foresee.',
      backdrop: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1200',
      rating: 8.5,
      year: 2024,
      genre: ['Sci-Fi', 'Adventure', 'Drama'],
      duration: '2h 46m',
      maturityRating: 'PG-13',
      director: 'Denis Villeneuve',
      cast: ['Timothée Chalamet', 'Zendaya', 'Rebecca Ferguson']
    },
    {
      id: '2',
      title: 'Oppenheimer',
      description: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II. A biographical thriller that explores the moral complexities of scientific discovery.',
      backdrop: 'https://images.pexels.com/photos/7991321/pexels-photo-7991321.jpeg?auto=compress&cs=tinysrgb&w=1200',
      rating: 8.3,
      year: 2023,
      genre: ['Biography', 'Drama', 'History'],
      duration: '3h 0m',
      maturityRating: 'R',
      director: 'Christopher Nolan',
      cast: ['Cillian Murphy', 'Emily Blunt', 'Matt Damon']
    },
    {
      id: '3',
      title: 'The Batman',
      description: 'When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city\'s hidden corruption and question his family\'s involvement.',
      backdrop: 'https://images.pexels.com/photos/7991434/pexels-photo-7991434.jpeg?auto=compress&cs=tinysrgb&w=1200',
      rating: 7.8,
      year: 2022,
      genre: ['Action', 'Crime', 'Drama'],
      duration: '2h 56m',
      maturityRating: 'PG-13',
      director: 'Matt Reeves',
      cast: ['Robert Pattinson', 'Zoë Kravitz', 'Paul Dano']
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMovie((prev) => (prev + 1) % featuredMovies.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [featuredMovies.length]);

  const movie = featuredMovies[currentMovie];

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentMovie}
          className="absolute inset-0"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <img
            src={movie.backdrop}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={`content-${currentMovie}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {/* Movie Title */}
                <motion.h1 
                  className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {movie.title}
                </motion.h1>

                {/* Movie Info */}
                <motion.div 
                  className="flex items-center space-x-6 mb-6 text-white/90"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="flex items-center space-x-2">
                    <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-lg text-sm font-medium border border-white/30">
                      {movie.maturityRating}
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{movie.year}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{movie.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-yellow-400 font-semibold">{movie.rating}</span>
                    </div>
                  </div>
                </motion.div>

                {/* Genres */}
                <motion.div 
                  className="flex flex-wrap gap-3 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  {movie.genre.map((genre) => (
                    <span
                      key={genre}
                      className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm border border-white/20 hover:bg-white/20 transition-all cursor-pointer"
                    >
                      {genre}
                    </span>
                  ))}
                </motion.div>

                {/* Description */}
                <motion.p 
                  className="text-lg text-white/90 mb-8 leading-relaxed max-w-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                >
                  {movie.description}
                </motion.p>

                {/* Cast & Director */}
                <motion.div 
                  className="mb-8 text-white/80"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 }}
                >
                  <p className="mb-2">
                    <span className="text-gray-400">Director:</span> <span className="text-purple-400 font-semibold">{movie.director}</span>
                  </p>
                  <p>
                    <span className="text-gray-400">Starring:</span> <span className="text-white">{movie.cast.join(', ')}</span>
                  </p>
                </motion.div>

                {/* Action Buttons */}
                <motion.div 
                  className="flex items-center space-x-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 }}
                >
                  <Link
                    to={`/movie/${movie.id}`}
                    className="group"
                  >
                    <motion.div
                      className="flex items-center space-x-3 bg-white text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/90 transition-all shadow-lg"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Play className="h-6 w-6 fill-current" />
                      <span>Play</span>
                    </motion.div>
                  </Link>

                  <motion.button 
                    className="flex items-center space-x-3 bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/30 transition-all border border-white/30"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Info className="h-6 w-6" />
                    <span>More Info</span>
                  </motion.button>

                  <motion.button 
                    className="p-4 bg-white/10 backdrop-blur-sm text-white rounded-full hover:bg-white/20 transition-all border border-white/20"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Plus className="h-6 w-6" />
                  </motion.button>

                  <motion.button 
                    className="p-4 bg-white/10 backdrop-blur-sm text-white rounded-full hover:bg-white/20 transition-all border border-white/20"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ThumbsUp className="h-6 w-6" />
                  </motion.button>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Audio Control */}
        <div className="absolute bottom-8 right-8">
          <motion.button
            onClick={() => setIsMuted(!isMuted)}
            className="p-4 bg-white/10 backdrop-blur-sm text-white rounded-full border border-white/20 hover:bg-white/20 transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
          </motion.button>
        </div>

        {/* Movie Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {featuredMovies.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentMovie(index)}
              className={`relative overflow-hidden rounded-full transition-all ${
                index === currentMovie ? 'w-16 h-2' : 'w-2 h-2'
              }`}
              whileHover={{ scale: 1.2 }}
            >
              <div className={`w-full h-full transition-all ${
                index === currentMovie ? 'bg-white' : 'bg-white/30'
              }`} />
              {index === currentMovie && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 8, ease: "linear" }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NetflixHero;