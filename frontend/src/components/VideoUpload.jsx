import React from 'react';
import { Upload, X, Play, AlertCircle, Video as VideoIcon } from 'lucide-react';
import useVideoUpload from '../hooks/useVideoUpload';

const VideoUpload = ({ videoPreview, onVideoUpload, onRemoveVideo, onDetect, isProcessing }) => {
  const { 
    isDragging, 
    fileInputRef, 
    handleDragEnter, 
    handleDragLeave, 
    handleDragOver, 
    handleDrop, 
    handleFileSelect 
  } = useVideoUpload(onVideoUpload);

  return (
    <>
      {/* Upload Section */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl hover:shadow-purple-500/10 transition-all duration-300">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-purple-500/50">
            1
          </div>
          Upload Video
        </h3>

        {/* Drag and Drop Zone */}
        <div
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-2xl p-10 text-center transition-all duration-300 cursor-pointer ${
            isDragging
              ? 'border-purple-400 bg-purple-500/20 scale-[1.02] shadow-lg shadow-purple-500/50'
              : 'border-white/20 bg-white/5 hover:border-purple-400/50 hover:bg-white/10'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="video/mp4,video/avi,video/mov"
            onChange={handleFileSelect}
            className="hidden"
            id="video-upload"
          />
          <label htmlFor="video-upload" className="cursor-pointer block">
            <Upload className="w-14 h-14 text-purple-400 mx-auto mb-4 animate-bounce" />
            <p className="text-white font-semibold mb-2 text-lg">
              {isDragging ? 'Drop video here' : 'Drag & Drop or Click to Upload'}
            </p>
            <p className="text-slate-400 text-sm">
              Supports MP4, AVI, MOV (Max 50MB)
            </p>
          </label>
        </div>

        {/* Video Preview */}
        {videoPreview && (
          <div className="mt-6 animate-in fade-in duration-500">
            <p className="text-white font-semibold mb-3 flex items-center gap-2">
              <VideoIcon size={18} className="text-purple-400" />
              Preview
            </p>
            <div className="relative group">
              <video
                src={videoPreview}
                controls
                className="w-full rounded-2xl border-2 border-white/20 shadow-xl group-hover:scale-[1.02] transition-transform duration-300"
              />
              <button
                onClick={onRemoveVideo}
                className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white p-2.5 rounded-full transition-all duration-300 shadow-lg hover:scale-110"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Detect Button */}
      {videoPreview && (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 animate-in slide-in-from-bottom duration-500">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-purple-500/50">
              2
            </div>
            Process Video
          </h3>
          <button
            onClick={onDetect}
            disabled={isProcessing}
            className="w-full bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:scale-[1.02] disabled:hover:scale-100"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                Processing Video...
              </>
            ) : (
              <>
                <Play size={20} />
                Detect & Count Objects
              </>
            )}
          </button>

          {/* Info Tip */}
          <div className="mt-4 bg-blue-500/10 backdrop-blur-sm border border-blue-400/30 rounded-xl p-4 flex gap-3">
            <AlertCircle className="text-blue-400 flex-shrink-0 animate-pulse" size={20} />
            <p className="text-slate-300 text-sm">
              OpenCV will process each frame, track objects, and count them as they enter defined zones
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoUpload;