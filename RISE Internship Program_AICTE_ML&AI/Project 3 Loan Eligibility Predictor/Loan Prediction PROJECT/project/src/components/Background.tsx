import React from 'react';

const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Vibrant Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600"></div>
      <div className="absolute inset-0 bg-gradient-to-tl from-cyan-400 via-blue-500 to-purple-600 opacity-70"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 opacity-40"></div>
      
      {/* Animated Colorful Shapes */}
      <div className="absolute top-0 left-0 w-full h-full">
        {/* Large floating circles with vibrant colors */}
        <div className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-r from-pink-500 to-rose-400 rounded-full blur-3xl opacity-60 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-cyan-500 to-blue-400 rounded-full blur-3xl opacity-50 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-72 h-72 bg-gradient-to-r from-purple-500 to-indigo-400 rounded-full blur-3xl opacity-70 animate-pulse delay-2000"></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full blur-3xl opacity-60 animate-pulse delay-3000"></div>
        
        {/* Medium accent shapes */}
        <div className="absolute top-1/3 left-1/3 w-48 h-48 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-2xl opacity-50 animate-bounce delay-500"></div>
        <div className="absolute bottom-1/3 right-1/4 w-56 h-56 bg-gradient-to-r from-violet-500 to-purple-400 rounded-full blur-2xl opacity-60 animate-bounce delay-1500"></div>
        <div className="absolute top-1/4 right-1/2 w-40 h-40 bg-gradient-to-r from-lime-400 to-green-500 rounded-full blur-2xl opacity-50 animate-bounce delay-2500"></div>
        
        {/* Geometric patterns with colors */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-r from-red-400 to-pink-500 rotate-45 blur-xl opacity-40 animate-spin-slow"></div>
        <div className="absolute bottom-1/4 left-1/4 w-28 h-28 bg-gradient-to-r from-indigo-400 to-cyan-500 rotate-12 blur-xl opacity-50 animate-spin-slow delay-3000"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-to-r from-emerald-400 to-lime-500 rotate-45 blur-xl opacity-40 animate-spin-slow delay-1500"></div>
        
        {/* Additional floating elements */}
        <div className="absolute top-10 right-1/3 w-20 h-20 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full blur-xl opacity-60 animate-pulse delay-4000"></div>
        <div className="absolute bottom-10 left-1/2 w-36 h-36 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full blur-2xl opacity-50 animate-pulse delay-2500"></div>
        <div className="absolute top-2/3 left-10 w-44 h-44 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full blur-2xl opacity-60 animate-pulse delay-1800"></div>
      </div>
      
      {/* Colorful grid pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}></div>
      </div>
      
      {/* Subtle color wash overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
    </div>
  );
};

export default Background;