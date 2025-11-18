import React from 'react';
import { Camera, X, Activity, Zap, Target, Clock } from 'lucide-react';
import useRealtimeCamera from '../hooks/useRealtimeCamera';

const RealtimeCamera = ({ onClose }) => {
  const {
    videoRef,
    canvasRef,
    isProcessing,
    stats,
    detectedObjects
  } = useRealtimeCamera();

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-3xl p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto border border-white/20 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-violet-500 to-purple-500 p-3 rounded-xl shadow-lg shadow-purple-500/50">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Real-Time Detection</h2>
              <p className="text-slate-400 text-sm">Live object counting with OpenCV</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="bg-red-500/20 hover:bg-red-500/30 text-red-300 p-3 rounded-xl transition-all duration-300 border border-red-500/30 hover:scale-110"
          >
            <X size={24} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video Feed */}
          <div className="lg:col-span-2 space-y-4">
            <div className="relative bg-black rounded-2xl overflow-hidden border-2 border-purple-500/30 shadow-2xl">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-[400px] object-cover"
              />
              <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full"
              />
              
              {/* Live Indicator */}
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-500/90 backdrop-blur-sm px-4 py-2 rounded-full">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                <span className="text-white font-bold text-sm">LIVE</span>
              </div>

              {/* FPS Counter */}
              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
                <span className="text-green-400 font-bold text-sm">{stats.fps} FPS</span>
              </div>

              {/* Object Count Overlay */}
              <div className="absolute bottom-4 left-4 bg-gradient-to-r from-violet-500 to-purple-500 backdrop-blur-sm px-6 py-3 rounded-xl shadow-lg">
                <p className="text-white/80 text-xs mb-1">Objects Detected</p>
                <p className="text-white font-bold text-3xl">{stats.objectCount}</p>
              </div>
            </div>

            {/* Quick Stats Bar */}
            <div className="grid grid-cols-4 gap-3">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-3 hover:bg-white/10 transition-all">
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span className="text-slate-400 text-xs">Speed</span>
                </div>
                <p className="text-white font-bold">{stats.processingTime}ms</p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-3 hover:bg-white/10 transition-all">
                <div className="flex items-center gap-2 mb-1">
                  <Target className="w-4 h-4 text-green-400" />
                  <span className="text-slate-400 text-xs">Accuracy</span>
                </div>
                <p className="text-white font-bold">{stats.accuracy}%</p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-3 hover:bg-white/10 transition-all">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span className="text-slate-400 text-xs">Runtime</span>
                </div>
                <p className="text-white font-bold">{stats.runtime}s</p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-3 hover:bg-white/10 transition-all">
                <div className="flex items-center gap-2 mb-1">
                  <Activity className="w-4 h-4 text-purple-400" />
                  <span className="text-slate-400 text-xs">Status</span>
                </div>
                <p className="text-green-400 font-bold text-sm">Active</p>
              </div>
            </div>
          </div>

          {/* Detected Objects List */}
          <div className="space-y-4">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                Live Detections
              </h3>
              
              <div className="space-y-2 max-h-[460px] overflow-y-auto pr-2 custom-scrollbar">
                {detectedObjects.length === 0 ? (
                  <div className="text-center py-8">
                    <Camera className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                    <p className="text-slate-500 text-sm">No objects detected yet</p>
                  </div>
                ) : (
                  detectedObjects.map((obj, index) => (
                    <div
                      key={index}
                      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 hover:bg-white/10 transition-all duration-300 animate-in slide-in-from-right"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-semibold">{obj.name}</span>
                        <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full border border-purple-500/30">
                          #{index + 1}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="flex-grow bg-white/10 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-green-500 to-blue-500 h-full rounded-full transition-all duration-500"
                            style={{ width: `${obj.confidence}%` }}
                          ></div>
                        </div>
                        <span className="text-white text-xs font-semibold min-w-[45px]">
                          {obj.confidence}%
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-gradient-to-br from-violet-500/10 to-purple-500/10 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-4">
              <h4 className="text-purple-300 font-bold mb-3 text-sm">Performance</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">GPU Usage</span>
                    <span className="text-white font-semibold">78%</span>
                  </div>
                  <div className="bg-white/10 rounded-full h-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-yellow-500 to-orange-500 h-full rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">Memory</span>
                    <span className="text-white font-semibold">62%</span>
                  </div>
                  <div className="bg-white/10 rounded-full h-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full rounded-full" style={{ width: '62%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealtimeCamera;