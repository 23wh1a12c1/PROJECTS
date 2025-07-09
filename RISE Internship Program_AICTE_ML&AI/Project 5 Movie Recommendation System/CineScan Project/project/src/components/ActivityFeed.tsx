import React from 'react';
import { motion } from 'framer-motion';
import { Star, Heart, MessageCircle, UserPlus, Play } from 'lucide-react';

const ActivityFeed: React.FC = () => {
  const activities = [
    {
      id: '1',
      type: 'rating',
      user: 'jane_cinephile',
      action: 'rated',
      target: 'Dune: Part Two',
      rating: 5,
      time: '2 hours ago',
      avatar: 'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: '2',
      type: 'follow',
      user: 'mike_moviebuff',
      action: 'followed',
      target: 'sarah_reviews',
      time: '4 hours ago',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: '3',
      type: 'like',
      user: 'alex_film_critic',
      action: 'liked',
      target: 'Oppenheimer review',
      time: '6 hours ago',
      avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: '4',
      type: 'watch',
      user: 'emma_movie_lover',
      action: 'watched',
      target: 'The Batman',
      time: '8 hours ago',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'rating':
        return <Star className="h-4 w-4 text-yellow-400" />;
      case 'follow':
        return <UserPlus className="h-4 w-4 text-blue-400" />;
      case 'like':
        return <Heart className="h-4 w-4 text-red-400" />;
      case 'watch':
        return <Play className="h-4 w-4 text-green-400" />;
      default:
        return <MessageCircle className="h-4 w-4 text-purple-400" />;
    }
  };

  return (
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <motion.div
          key={activity.id}
          className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all cursor-pointer"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <img
            src={activity.avatar}
            alt={activity.user}
            className="w-8 h-8 rounded-full object-cover"
          />
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              {getActivityIcon(activity.type)}
              <p className="text-white text-sm">
                <span className="font-semibold">{activity.user}</span>{' '}
                <span className="text-gray-300">{activity.action}</span>{' '}
                <span className="font-semibold text-purple-400">{activity.target}</span>
                {activity.rating && (
                  <span className="ml-2 flex items-center">
                    {Array.from({ length: activity.rating }).map((_, i) => (
                      <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                    ))}
                  </span>
                )}
              </p>
            </div>
            <p className="text-gray-500 text-xs">{activity.time}</p>
          </div>
        </motion.div>
      ))}
      
      <motion.button
        className="w-full py-2 text-purple-400 hover:text-purple-300 text-sm transition-colors"
        whileHover={{ scale: 1.02 }}
      >
        View More Activity
      </motion.button>
    </div>
  );
};

export default ActivityFeed;