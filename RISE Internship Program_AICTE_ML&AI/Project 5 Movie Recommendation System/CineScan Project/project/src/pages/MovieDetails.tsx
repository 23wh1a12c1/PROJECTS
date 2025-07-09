import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Star, 
  Play, 
  Heart, 
  Bookmark, 
  Share2, 
  Clock,
  Calendar,
  Users,
  Award,
  MessageCircle
} from 'lucide-react';
import Navbar from '../components/Navbar';

const MovieDetails: React.FC = () => {
  const { id } = useParams();
  const [userRating, setUserRating] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Mock movie data - in real app, this would be fetched based on id
  const movie = {
    id: id || '1',
    title: 'Dune: Part Two',
    year: 2024,
    runtime: 166,
    rating: 8.5,
    genre: ['Sci-Fi', 'Adventure', 'Drama'],
    director: 'Denis Villeneuve',
    cast: ['Timothée Chalamet', 'Zendaya', 'Rebecca Ferguson', 'Josh Brolin'],
    poster: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400',
    backdrop: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1200',
    synopsis: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, he must prevent a terrible future only he can foresee.',
    trailerUrl: 'https://www.youtube.com/embed/Way9Dexny3w',
    releaseDate: '2024-03-01',
    budget: '$190,000,000',
    boxOffice: '$711,844,021',
    awards: ['Academy Award Nominee', 'BAFTA Winner'],
    userScore: 89,
    criticsScore: 93
  };

  const reviews = [
    {
      id: '1',
      user: 'cinephile_jane',
      avatar: 'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      review: 'Absolutely stunning! Villeneuve has outdone himself with this masterpiece. The visuals are breathtaking and the story is compelling.',
      likes: 23,
      time: '2 days ago'
    },
    {
      id: '2',
      user: 'movie_critic_pro',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 4,
      review: 'A worthy sequel that expands the universe beautifully. Great performances and incredible cinematography.',
      likes: 18,
      time: '1 week ago'
    }
  ];

  const similarMovies = [
    {
      id: '2',
      title: 'Blade Runner 2049',
      poster: 'https://images.pexels.com/photos/7991321/pexels-photo-7991321.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 8.0
    },
    {
      id: '3',
      title: 'Arrival',
      poster: 'https://images.pexels.com/photos/7991434/pexels-photo-7991434.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 7.9
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />
      
      <div className="pt-20">
        {/* Hero Section */}
        <div className="relative h-96 overflow-hidden">
          <img
            src={movie.backdrop}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
          
          <div className="absolute top-6 left-6">
            <Link
              to="/dashboard"
              className="flex items-center space-x-2 text-white hover:text-purple-300 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Movies</span>
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Movie Poster */}
            <div className="lg:col-span-1">
              <motion.div
                className="sticky top-24"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full rounded-2xl shadow-2xl border border-white/20"
                />
                
                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3 mt-6">
                  <motion.button
                    className="flex items-center justify-center space-x-2 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Play className="h-5 w-5" />
                    <span>Watch Trailer</span>
                  </motion.button>
                  
                  <motion.button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`flex items-center justify-center space-x-2 py-3 rounded-xl transition-all ${
                      isLiked 
                        ? 'bg-red-500 text-white' 
                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                    <span>{isLiked ? 'Liked' : 'Like'}</span>
                  </motion.button>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <motion.button
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={`flex items-center justify-center space-x-2 py-3 rounded-xl transition-all ${
                      isBookmarked 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-current' : ''}`} />
                    <span>Watchlist</span>
                  </motion.button>
                  
                  <motion.button
                    className="flex items-center justify-center space-x-2 py-3 bg-white/10 text-gray-300 rounded-xl hover:bg-white/20 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Share2 className="h-5 w-5" />
                    <span>Share</span>
                  </motion.button>
                </div>
              </motion.div>
            </div>

            {/* Movie Info */}
            <div className="lg:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h1 className="text-4xl font-bold text-white mb-4">{movie.title}</h1>
                
                {/* Movie Meta */}
                <div className="flex flex-wrap items-center gap-4 text-gray-300 mb-6">
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {movie.year}
                  </span>
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {movie.runtime} min
                  </span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1 fill-current" />
                    <span className="text-yellow-400 font-semibold">{movie.rating}</span>
                  </div>
                </div>

                {/* Genres */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {movie.genre.map((g) => (
                    <span
                      key={g}
                      className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm border border-purple-500/30"
                    >
                      {g}
                    </span>
                  ))}
                </div>

                {/* Synopsis */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">Synopsis</h2>
                  <p className="text-gray-300 leading-relaxed">{movie.synopsis}</p>
                </div>

                {/* Cast & Crew */}
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Director</h3>
                    <p className="text-purple-400 font-semibold">{movie.director}</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Cast</h3>
                    <div className="space-y-2">
                      {movie.cast.map((actor) => (
                        <p key={actor} className="text-gray-300">{actor}</p>
                      ))}
                    </div>
                  </div>
                </div>

                {/* User Rating */}
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 mb-8">
                  <h3 className="text-xl font-bold text-white mb-4">Rate this movie</h3>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setUserRating(star)}
                        className={`transition-colors ${
                          star <= userRating ? 'text-yellow-400' : 'text-gray-500 hover:text-yellow-400'
                        }`}
                      >
                        <Star className={`h-8 w-8 ${star <= userRating ? 'fill-current' : ''}`} />
                      </button>
                    ))}
                    {userRating > 0 && (
                      <span className="text-white ml-4">Your rating: {userRating}/5</span>
                    )}
                  </div>
                </div>

                {/* Reviews */}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6">Reviews</h3>
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <motion.div
                        key={review.id}
                        className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <div className="flex items-start space-x-4">
                          <img
                            src={review.avatar}
                            alt={review.user}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <h4 className="text-white font-semibold">{review.user}</h4>
                                <div className="flex items-center mt-1">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-500'
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                              <span className="text-gray-500 text-sm">{review.time}</span>
                            </div>
                            <p className="text-gray-300 mb-3">{review.review}</p>
                            <div className="flex items-center space-x-4">
                              <button className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors">
                                <Heart className="h-4 w-4" />
                                <span>{review.likes}</span>
                              </button>
                              <button className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors">
                                <MessageCircle className="h-4 w-4" />
                                <span>Reply</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Similar Movies */}
          <div className="mt-16 pb-16">
            <h2 className="text-2xl font-bold text-white mb-8">You might also like</h2>
            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
              {similarMovies.map((similarMovie, index) => (
                <motion.div
                  key={similarMovie.id}
                  className="bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <img
                    src={similarMovie.poster}
                    alt={similarMovie.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-white font-semibold mb-2">{similarMovie.title}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1 fill-current" />
                      <span className="text-yellow-400">{similarMovie.rating}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;