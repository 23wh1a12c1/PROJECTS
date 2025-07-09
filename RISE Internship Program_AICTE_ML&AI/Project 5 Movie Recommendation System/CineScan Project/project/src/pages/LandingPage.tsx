import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Film, Users, Star, Play, Heart, Zap, TrendingUp, Award, Globe } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/20 backdrop-blur-lg z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div 
              className="flex items-center space-x-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Film className="h-8 w-8 text-purple-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                CineConnect
              </span>
            </motion.div>
            
            <motion.div 
              className="flex space-x-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Link
                to="/login"
                className="px-4 py-2 text-white hover:text-purple-300 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105"
              >
                Get Started
              </Link>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">
                Netflix Meets Instagram
              </span>
              <br />
              <span className="text-white">For Movie Lovers</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Discover movies like Netflix, share your journey like Instagram. 
              Get personalized recommendations, follow friends, and build your cinematic story.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link
                to="/signup"
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-semibold hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 flex items-center space-x-2"
              >
                <Zap className="h-5 w-5" />
                <span>Start Your Journey</span>
              </Link>
              
              <Link
                to="/login"
                className="px-8 py-4 border-2 border-purple-500 rounded-full text-purple-300 font-semibold hover:bg-purple-500/10 transition-all flex items-center space-x-2"
              >
                <Play className="h-5 w-5" />
                <span>Watch Demo</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              The Best of Both Worlds
            </h2>
            <p className="text-xl text-gray-300">
              Netflix-style discovery meets Instagram-style social sharing
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <TrendingUp className="h-12 w-12 text-red-400" />,
                title: "Netflix-Style Discovery",
                description: "Personalized recommendations, trending content, and curated collections just like your favorite streaming platform"
              },
              {
                icon: <Users className="h-12 w-12 text-blue-400" />,
                title: "Instagram-Style Social",
                description: "Follow friends, share your movie journey, and discover through your social network"
              },
              {
                icon: <Star className="h-12 w-12 text-yellow-400" />,
                title: "Smart Recommendations",
                description: "AI-powered suggestions based on your taste, friends' activities, and trending content"
              },
              {
                icon: <Heart className="h-12 w-12 text-pink-400" />,
                title: "Social Movie Feed",
                description: "See what friends are watching, their ratings, and reviews in a beautiful social feed"
              },
              {
                icon: <Award className="h-12 w-12 text-purple-400" />,
                title: "Personal Movie Profile",
                description: "Build your cinematic identity with ratings, reviews, and curated movie collections"
              },
              {
                icon: <Globe className="h-12 w-12 text-green-400" />,
                title: "Global Community",
                description: "Connect with movie lovers worldwide and discover films from every corner of the globe"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-semibold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              How CineConnect Works
            </h2>
            <p className="text-xl text-gray-300">
              Three simple steps to transform your movie experience
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Tell Us Your Taste",
                description: "Share your favorite genres, actors, and directors. We'll learn what you love.",
                color: "from-purple-500 to-purple-600"
              },
              {
                step: "02",
                title: "Get Personalized Recommendations",
                description: "Discover movies tailored to your taste, trending content, and what your friends are watching.",
                color: "from-pink-500 to-pink-600"
              },
              {
                step: "03",
                title: "Share Your Journey",
                description: "Rate movies, write reviews, follow friends, and build your cinematic social network.",
                color: "from-blue-500 to-blue-600"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-6`}>
                  {step.step}
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900/50 to-pink-900/50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-4xl font-bold text-white mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Ready to Transform Your Movie Experience?
          </motion.h2>
          
          <motion.p
            className="text-xl text-gray-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Join thousands of movie lovers who've already discovered their new favorite films
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link
              to="/signup"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-semibold hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105"
            >
              <Film className="h-5 w-5" />
              <span>Join CineConnect Today</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;