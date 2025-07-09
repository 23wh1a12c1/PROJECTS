import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, Star, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FeedItem {
  id: string;
  type: 'rating' | 'review' | 'watchlist' | 'watching' | 'finished';
  user: {
    id: string;
    username: string;
    avatar: string;
    verified?: boolean;
  };
  movie: {
    id: string;
    title: string;
    poster: string;
    year: number;
  };
  content?: string;
  rating?: number;
  timestamp: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  isBookmarked: boolean;
}

const SocialFeed: React.FC = () => {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([
    {
      id: '1',
      type: 'rating',
      user: {
        id: '1',
        username: 'cinephile_jane',
        avatar: 'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=150',
        verified: true
      },
      movie: {
        id: '1',
        title: 'Dune: Part Two',
        poster: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=300',
        year: 2024
      },
      rating: 5,
      content: 'Absolutely stunning! Villeneuve has outdone himself with this masterpiece. The visuals are breathtaking and the story is compelling. A perfect continuation of the Dune saga.',
      timestamp: '2 hours ago',
      likes: 47,
      comments: 12,
      isLiked: false,
      isBookmarked: false
    },
    {
      id: '2',
      type: 'watching',
      user: {
        id: '2',
        username: 'movie_buff_mike',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      movie: {
        id: '2',
        title: 'Oppenheimer',
        poster: 'https://images.pexels.com/photos/7991321/pexels-photo-7991321.jpeg?auto=compress&cs=tinysrgb&w=300',
        year: 2023
      },
      content: 'Starting this epic tonight! Heard amazing things about Nolan\'s latest masterpiece 🎬',
      timestamp: '4 hours ago',
      likes: 23,
      comments: 8,
      isLiked: true,
      isBookmarked: false
    },
    {
      id: '3',
      type: 'review',
      user: {
        id: '3',
        username: 'film_critic_sara',
        avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150',
        verified: true
      },
      movie: {
        id: '3',
        title: 'The Batman',
        poster: 'https://images.pexels.com/photos/7991434/pexels-photo-7991434.jpeg?auto=compress&cs=tinysrgb&w=300',
        year: 2022
      },
      rating: 4,
      content: 'A darker, more grounded take on the Dark Knight. Pattinson brings a fresh intensity to the role, and the cinematography is absolutely gorgeous. The noir atmosphere really works.',
      timestamp: '1 day ago',
      likes: 89,
      comments: 34,
      isLiked: false,
      isBookmarked: true
    },
    {
      id: '4',
      type: 'watchlist',
      user: {
        id: '4',
        username: 'indie_lover_alex',
        avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      movie: {
        id: '4',
        title: 'Everything Everywhere All at Once',
        poster: 'https://images.pexels.com/photos/7991545/pexels-photo-7991545.jpeg?auto=compress&cs=tinysrgb&w=300',
        year: 2022
      },
      content: 'Added this to my watchlist after seeing all the Oscar buzz! Can\'t wait to experience this multiverse journey 🌟',
      timestamp: '2 days ago',
      likes: 31,
      comments: 15,
      isLiked: false,
      isBookmarked: false
    }
  ]);

  const handleLike = (itemId: string) => {
    setFeedItems(prev => prev.map(item => 
      item.id === itemId 
        ? { 
            ...item, 
            isLiked: !item.isLiked,
            likes: item.isLiked ? item.likes - 1 : item.likes + 1
          }
        : item
    ));
  };

  const handleBookmark = (itemId: string) => {
    setFeedItems(prev => prev.map(item => 
      item.id === itemId 
        ? { ...item, isBookmarked: !item.isBookmarked }
        : item
    ));
  };

  const getActivityText = (item: FeedItem) => {
    switch (item.type) {
      case 'rating':
        return 'rated';
      case 'review':
        return 'reviewed';
      case 'watchlist':
        return 'added to watchlist';
      case 'watching':
        return 'is watching';
      case 'finished':
        return 'finished watching';
      default:
        return 'interacted with';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'rating':
      case 'review':
        return <Star className="h-4 w-4 text-yellow-400" />;
      case 'watchlist':
        return <Bookmark className="h-4 w-4 text-blue-400" />;
      case 'watching':
        return <Play className="h-4 w-4 text-green-400" />;
      case 'finished':
        return <Heart className="h-4 w-4 text-red-400" />;
      default:
        return <MessageCircle className="h-4 w-4 text-purple-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {feedItems.map((item, index) => (
        <motion.div
          key={item.id}
          className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          {/* Header */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link to={`/profile/${item.user.id}`}>
                <img
                  src={item.user.avatar}
                  alt={item.user.username}
                  className="w-10 h-10 rounded-full object-cover border-2 border-purple-500/30"
                />
              </Link>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <Link 
                    to={`/profile/${item.user.id}`}
                    className="font-semibold text-white hover:text-purple-300 transition-colors"
                  >
                    {item.user.username}
                  </Link>
                  {item.user.verified && (
                    <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                  {getActivityIcon(item.type)}
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <span>{getActivityText(item)} </span>
                  <Link 
                    to={`/movie/${item.movie.id}`}
                    className="text-purple-400 hover:text-purple-300 transition-colors font-medium"
                  >
                    {item.movie.title}
                  </Link>
                  <span>•</span>
                  <span>{item.timestamp}</span>
                </div>
              </div>
            </div>
            
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="px-4 pb-4">
            <div className="flex space-x-4">
              <Link to={`/movie/${item.movie.id}`} className="flex-shrink-0">
                <img
                  src={item.movie.poster}
                  alt={item.movie.title}
                  className="w-20 h-30 object-cover rounded-lg hover:scale-105 transition-transform"
                />
              </Link>
              
              <div className="flex-1">
                {item.rating && (
                  <div className="flex items-center space-x-1 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < item.rating! ? 'text-yellow-400 fill-current' : 'text-gray-500'
                        }`}
                      />
                    ))}
                    <span className="text-yellow-400 font-semibold ml-2">{item.rating}/5</span>
                  </div>
                )}
                
                {item.content && (
                  <p className="text-gray-300 leading-relaxed">{item.content}</p>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="px-4 py-3 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <button
                onClick={() => handleLike(item.id)}
                className={`flex items-center space-x-2 transition-colors ${
                  item.isLiked ? 'text-red-400' : 'text-gray-400 hover:text-red-400'
                }`}
              >
                <Heart className={`h-5 w-5 ${item.isLiked ? 'fill-current' : ''}`} />
                <span className="text-sm font-medium">{item.likes}</span>
              </button>
              
              <button className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors">
                <MessageCircle className="h-5 w-5" />
                <span className="text-sm font-medium">{item.comments}</span>
              </button>
              
              <button className="text-gray-400 hover:text-green-400 transition-colors">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
            
            <button
              onClick={() => handleBookmark(item.id)}
              className={`transition-colors ${
                item.isBookmarked ? 'text-blue-400' : 'text-gray-400 hover:text-blue-400'
              }`}
            >
              <Bookmark className={`h-5 w-5 ${item.isBookmarked ? 'fill-current' : ''}`} />
            </button>
          </div>
        </motion.div>
      ))}
      
      <motion.div
        className="text-center py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <button className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all">
          Load More Posts
        </button>
      </motion.div>
    </div>
  );
};

export default SocialFeed;