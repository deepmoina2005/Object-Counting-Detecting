import React, { useState } from 'react';
import VideoUpload from '../Pages/VideoUpload';
import VideoResults from '../Pages/VideoResults';
import FeatureCards from '../Pages/FeatureCards';
import RealtimeCamera from '../Pages/RealtimeCamera';
import useDetection from '../hooks/useDetection';
import { Video as VideoIcon } from 'lucide-react';

const VideoDetection = () => {
  const [uploadedVideo, setUploadedVideo] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [showRealtimeCamera, setShowRealtimeCamera] = useState(false);

  const { isProcessing, results, handleDetection, resetDetection } = useDetection(
    uploadedVideo,
    'opencv-video'
  );

  const handleVideoUpload = (file, preview) => {
    setUploadedVideo(file);
    setVideoPreview(preview);
    resetDetection();
  };

  const handleRemoveVideo = () => {
    setUploadedVideo(null);
    setVideoPreview(null);
    resetDetection();
  };

  return (
    <>
      {/* Hero Section */}
      <div className="text-center mb-12 animate-in fade-in duration-700">
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
          Video Object Counting
        </h2>
        <p className="text-xl text-slate-300 mb-2">
          Using OpenCV Computer Vision
        </p>
        <p className="text-slate-400 mb-6">
          Upload a video to track and count objects in real-time
        </p>

        {/* Realtime Detection Button */}
        <button
          onClick={() => setShowRealtimeCamera(true)}
          className="bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 flex items-center justify-center gap-3 mx-auto hover:scale-105"
        >
          <VideoIcon size={24} />
          Start Real-Time Detection
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </button>
      </div>

      {/* Realtime Camera Modal */}
      {showRealtimeCamera && (
        <RealtimeCamera onClose={() => setShowRealtimeCamera(false)} />
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          <VideoUpload
            videoPreview={videoPreview}
            onVideoUpload={handleVideoUpload}
            onRemoveVideo={handleRemoveVideo}
            onDetect={handleDetection}
            isProcessing={isProcessing}
          />
        </div>

        {/* Right Column */}
        <VideoResults
          results={results}
          isProcessing={isProcessing}
        />
      </div>

      {/* Features */}
      <FeatureCards />
    </>
  );
};

export default VideoDetection;