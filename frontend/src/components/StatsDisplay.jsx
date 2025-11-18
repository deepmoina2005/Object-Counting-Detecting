import React from 'react';
import { Zap, Target, Clock, TrendingUp, Cpu, Award } from 'lucide-react';

const StatsDisplay = ({ stats }) => {
  const statsData = [
    {
      icon: <Zap className="w-5 h-5" />,
      label: 'Processing Time',
      value: stats.processingTime,
      unit: 'ms',
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/30',
      textColor: 'text-yellow-400'
    },
    {
      icon: <Target className="w-5 h-5" />,
      label: 'Accuracy',
      value: stats.accuracy,
      unit: '%',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30',
      textColor: 'text-green-400'
    },
    {
      icon: <Clock className="w-5 h-5" />,
      label: 'Total Time',
      value: stats.totalTime,
      unit: 's',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
      textColor: 'text-blue-400'
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      label: 'Confidence',
      value: stats.avgConfidence,
      unit: '%',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      textColor: 'text-purple-400'
    },
    {
      icon: <Cpu className="w-5 h-5" />,
      label: 'Method',
      value: stats.method,
      unit: '',
      color: 'from-indigo-500 to-blue-500',
      bgColor: 'bg-indigo-500/10',
      borderColor: 'border-indigo-500/30',
      textColor: 'text-indigo-400',
      isText: true
    },
    {
      icon: <Award className="w-5 h-5" />,
      label: 'Performance',
      value: stats.performance,
      unit: '',
      color: 'from-pink-500 to-rose-500',
      bgColor: 'bg-pink-500/10',
      borderColor: 'border-pink-500/30',
      textColor: 'text-pink-400',
      isText: true
    }
  ];

  return (
    <div className="mt-6 space-y-4 animate-in slide-in-from-bottom duration-500">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1 h-6 bg-gradient-to-b from-violet-500 to-purple-500 rounded-full"></div>
        <h4 className="text-white font-bold text-lg">Detection Statistics</h4>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className={`${stat.bgColor} backdrop-blur-sm border ${stat.borderColor} rounded-xl p-4 hover:scale-105 transition-all duration-300 group`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`bg-gradient-to-br ${stat.color} p-2 rounded-lg shadow-lg group-hover:scale-110 transition-transform ${stat.textColor}`}>
                {stat.icon}
              </div>
              <span className="text-slate-400 text-sm font-medium">{stat.label}</span>
            </div>
            
            <div className="flex items-baseline gap-1">
              <span className="text-white font-bold text-2xl">
                {stat.isText ? stat.value : stat.value}
              </span>
              {!stat.isText && (
                <span className={`${stat.textColor} font-semibold text-sm`}>
                  {stat.unit}
                </span>
              )}
            </div>

            {!stat.isText && (
              <div className="mt-3">
                <div className="bg-white/10 rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`bg-gradient-to-r ${stat.color} h-full rounded-full transition-all duration-1000`}
                    style={{ 
                      width: stat.unit === '%' ? `${stat.value}%` : '100%' 
                    }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Performance Summary */}
      <div className="bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-fuchsia-500/10 backdrop-blur-sm border border-purple-500/30 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-sm mb-1">Overall Performance</p>
            <p className="text-white font-bold text-xl">{stats.overallScore}/100</p>
          </div>
          <div className="text-right">
            <p className="text-slate-400 text-sm mb-1">Status</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-green-400 font-bold">Excellent</p>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="bg-white/10 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 h-full rounded-full transition-all duration-1000"
              style={{ width: `${stats.overallScore}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsDisplay;