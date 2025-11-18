import React from 'react';

const FeatureCards = () => {
  const features = [
    { 
      icon: '⚡', 
      title: 'Real-time', 
      desc: 'Process in <1 second', 
      color: 'from-yellow-500 to-orange-500' 
    },
    { 
      icon: '🎯', 
      title: 'Accurate', 
      desc: '90%+ accuracy', 
      color: 'from-green-500 to-emerald-500' 
    },
    { 
      icon: '🔄', 
      title: 'Flexible', 
      desc: 'Multiple methods', 
      color: 'from-blue-500 to-cyan-500' 
    },
    { 
      icon: '📊', 
      title: 'Detailed', 
      desc: 'Confidence scores', 
      color: 'from-purple-500 to-pink-500' 
    }
  ];

  return (
    <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
      {features.map((feature, index) => (
        <div
          key={index}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center hover:scale-105 hover:shadow-2xl transition-all duration-300 group"
        >
          <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
            {feature.icon}
          </div>
          <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
          <p className="text-slate-300 text-sm">{feature.desc}</p>
          <div className={`h-1 w-0 group-hover:w-full bg-gradient-to-r ${feature.color} rounded-full mx-auto mt-4 transition-all duration-500`}></div>
        </div>
      ))}
    </div>
  );
};

export default FeatureCards;