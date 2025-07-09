import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Film, Star, Heart, Users, ArrowRight, Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Onboarding: React.FC = () => {
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState({
    favoriteGenres: [] as string[],
    favoriteActors: [] as string[],
    favoriteDirectors: [] as string[],
    watchingHabits: '',
    socialLevel: ''
  });
  const { user } = useAuth();
  const navigate = useNavigate();

  const genres = [
    'Action', 'Adventure', 'Animation', 'Biography', 'Comedy', 'Crime',
    'Documentary', 'Drama', 'Family', 'Fantasy', 'History', 'Horror',
    'Music', 'Mystery', 'Romance', 'Sci-Fi', 'Sport', 'Thriller', 'War', 'Western'
  ];

  const popularActors = [
    'Leonardo DiCaprio', 'Meryl Streep', 'Robert Downey Jr.', 'Scarlett Johansson',
    'Tom Hanks', 'Jennifer Lawrence', 'Brad Pitt', 'Emma Stone', 'Ryan Gosling',
    'Margot Robbie', 'Christian Bale', 'Natalie Portman', 'Will Smith', 'Amy Adams'
  ];

  const popularDirectors = [
    'Christopher Nolan', 'Martin Scorsese', 'Quentin Tarantino', 'Steven Spielberg',
    'Denis Villeneuve', 'Greta Gerwig', 'Jordan Peele', 'Rian Johnson',
    'Chloe Zhao', 'Damien Chazelle', 'Wes Anderson', 'David Fincher'
  ];

  const watchingHabits = [
    { id: 'binge', label: 'Binge Watcher', desc: 'I love watching entire series in one go' },
    { id: 'casual', label: 'Casual Viewer', desc: 'I watch movies/shows occasionally' },
    { id: 'critic', label: 'Film Critic', desc: 'I analyze and review everything I watch' },
    { id: 'social', label: 'Social Watcher', desc: 'I prefer watching with friends and family' }
  ];

  const socialLevels = [
    { id: 'private', label: 'Private Profile', desc: 'Keep my activity mostly to myself' },
    { id: 'friends', label: 'Friends Only', desc: 'Share with people I follow' },
    { id: 'public', label: 'Public Profile', desc: 'Share my movie journey with everyone' }
  ];

  const handleGenreToggle = (genre: string) => {
    setPreferences(prev => ({
      ...prev,
      favoriteGenres: prev.favoriteGenres.includes(genre)
        ? prev.favoriteGenres.filter(g => g !== genre)
        : [...prev.favoriteGenres, genre]
    }));
  };

  const handleActorToggle = (actor: string) => {
    setPreferences(prev => ({
      ...prev,
      favoriteActors: prev.favoriteActors.includes(actor)
        ? prev.favoriteActors.filter(a => a !== actor)
        : [...prev.favoriteActors, actor]
    }));
  };

  const handleDirectorToggle = (director: string) => {
    setPreferences(prev => ({
      ...prev,
      favoriteDirectors: prev.favoriteDirectors.includes(director)
        ? prev.favoriteDirectors.filter(d => d !== director)
        : [...prev.favoriteDirectors, director]
    }));
  };

  const handleComplete = () => {
    // Save preferences to localStorage
    const userPreferences = {
      userId: user?.id,
      ...preferences,
      completedAt: new Date().toISOString()
    };
    
    localStorage.setItem('cineconnect_preferences', JSON.stringify(userPreferences));
    navigate('/dashboard');
  };

  const canProceed = () => {
    switch (step) {
      case 1: return preferences.favoriteGenres.length >= 3;
      case 2: return preferences.favoriteActors.length >= 2;
      case 3: return preferences.favoriteDirectors.length >= 2;
      case 4: return preferences.watchingHabits !== '';
      case 5: return preferences.socialLevel !== '';
      default: return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
      <div className="max-w-4xl w-full">
        <motion.div
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-white">Let's personalize your experience</h1>
              <span className="text-purple-400 font-medium">{step}/5</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(step / 5) * 100}%` }}
              />
            </div>
          </div>

          {/* Step 1: Favorite Genres */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="text-center">
                <Film className="h-16 w-16 text-purple-400 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-white mb-2">What genres do you love?</h2>
                <p className="text-gray-300">Select at least 3 genres to help us recommend movies you'll enjoy</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {genres.map((genre) => (
                  <motion.button
                    key={genre}
                    onClick={() => handleGenreToggle(genre)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      preferences.favoriteGenres.includes(genre)
                        ? 'border-purple-500 bg-purple-500/20 text-white'
                        : 'border-white/20 bg-white/5 text-gray-300 hover:border-purple-400 hover:bg-purple-400/10'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {preferences.favoriteGenres.includes(genre) && (
                      <Check className="h-4 w-4 text-purple-400 mb-1" />
                    )}
                    <span className="font-medium">{genre}</span>
                  </motion.button>
                ))}
              </div>
              
              <div className="text-center text-sm text-gray-400">
                Selected: {preferences.favoriteGenres.length}/20
              </div>
            </motion.div>
          )}

          {/* Step 2: Favorite Actors */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="text-center">
                <Star className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-white mb-2">Who are your favorite actors?</h2>
                <p className="text-gray-300">Select at least 2 actors whose movies you always watch</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {popularActors.map((actor) => (
                  <motion.button
                    key={actor}
                    onClick={() => handleActorToggle(actor)}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      preferences.favoriteActors.includes(actor)
                        ? 'border-yellow-500 bg-yellow-500/20 text-white'
                        : 'border-white/20 bg-white/5 text-gray-300 hover:border-yellow-400 hover:bg-yellow-400/10'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{actor}</span>
                      {preferences.favoriteActors.includes(actor) && (
                        <Check className="h-5 w-5 text-yellow-400" />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 3: Favorite Directors */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="text-center">
                <Film className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-white mb-2">Which directors inspire you?</h2>
                <p className="text-gray-300">Select at least 2 directors whose style you appreciate</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {popularDirectors.map((director) => (
                  <motion.button
                    key={director}
                    onClick={() => handleDirectorToggle(director)}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      preferences.favoriteDirectors.includes(director)
                        ? 'border-blue-500 bg-blue-500/20 text-white'
                        : 'border-white/20 bg-white/5 text-gray-300 hover:border-blue-400 hover:bg-blue-400/10'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{director}</span>
                      {preferences.favoriteDirectors.includes(director) && (
                        <Check className="h-5 w-5 text-blue-400" />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 4: Watching Habits */}
          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="text-center">
                <Heart className="h-16 w-16 text-red-400 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-white mb-2">How do you like to watch?</h2>
                <p className="text-gray-300">Tell us about your viewing style</p>
              </div>
              
              <div className="space-y-4">
                {watchingHabits.map((habit) => (
                  <motion.button
                    key={habit.id}
                    onClick={() => setPreferences(prev => ({ ...prev, watchingHabits: habit.id }))}
                    className={`w-full p-6 rounded-xl border-2 transition-all text-left ${
                      preferences.watchingHabits === habit.id
                        ? 'border-red-500 bg-red-500/20 text-white'
                        : 'border-white/20 bg-white/5 text-gray-300 hover:border-red-400 hover:bg-red-400/10'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{habit.label}</h3>
                        <p className="text-sm opacity-80">{habit.desc}</p>
                      </div>
                      {preferences.watchingHabits === habit.id && (
                        <Check className="h-6 w-6 text-red-400" />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 5: Social Level */}
          {step === 5 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="text-center">
                <Users className="h-16 w-16 text-green-400 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-white mb-2">How social do you want to be?</h2>
                <p className="text-gray-300">Choose your privacy level for sharing movie activities</p>
              </div>
              
              <div className="space-y-4">
                {socialLevels.map((level) => (
                  <motion.button
                    key={level.id}
                    onClick={() => setPreferences(prev => ({ ...prev, socialLevel: level.id }))}
                    className={`w-full p-6 rounded-xl border-2 transition-all text-left ${
                      preferences.socialLevel === level.id
                        ? 'border-green-500 bg-green-500/20 text-white'
                        : 'border-white/20 bg-white/5 text-gray-300 hover:border-green-400 hover:bg-green-400/10'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{level.label}</h3>
                        <p className="text-sm opacity-80">{level.desc}</p>
                      </div>
                      {preferences.socialLevel === level.id && (
                        <Check className="h-6 w-6 text-green-400" />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/20">
            <button
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
              className="px-6 py-3 text-gray-400 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === step ? 'bg-purple-500' : i < step ? 'bg-purple-300' : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
            
            {step < 5 ? (
              <motion.button
                onClick={() => setStep(step + 1)}
                disabled={!canProceed()}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Next</span>
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            ) : (
              <motion.button
                onClick={handleComplete}
                disabled={!canProceed()}
                className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Complete Setup</span>
                <Check className="h-4 w-4" />
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Onboarding;