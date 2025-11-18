import React from 'react';
import { Download, CheckCircle2, Video as VideoIcon } from 'lucide-react';
import StatsDisplay from './StatsDisplay';

const VideoResults = ({ results, isProcessing }) => {
  const handleDownload = () => {
    if (results) {
      const element = document.createElement('a');
      const content = `Video Object Counting Results\n\nTotal Objects Counted: ${results.totalCount}\nProcessing Time: ${results.processingTime}\nTotal Frames: ${results.totalFrames}\nFPS: ${results.fps}\n\nPer-Frame Data:\n${results.frameData?.map(f => `Frame ${f.frame}: ${f.count} objects`).join('\n')}`;
      const file = new Blob([content], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = 'video-counting-results.txt';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl lg:sticky lg:top-24 h-fit hover:shadow-purple-500/10 transition-all duration-300">
      <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <div className="w-9 h-9 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-purple-500/50">
          3
        </div>
        Processing Results
      </h3>

      {!results && !isProcessing && (
        <div className="text-center py-20">
          <div className="bg-purple-500/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <VideoIcon className="w-10 h-10 text-purple-400" />
          </div>
          <p className="text-slate-400 text-lg">
            Upload a video and click "Detect & Count Objects" to see results
          </p>
        </div>
      )}

      {isProcessing && (
        <div className="text-center py-20 animate-in fade-in duration-300">
          <div className="animate-spin w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full mx-auto mb-4"></div>
          <p className="text-white text-lg font-semibold mb-2">Processing video...</p>
          <p className="text-slate-400">Analyzing frames and tracking objects</p>
        </div>
      )}

      {results && (
        <div className="space-y-6 animate-in slide-in-from-right duration-500">
          {/* Success Message */}
          <div className="bg-green-500/10 backdrop-blur-sm border border-green-400/30 rounded-xl p-4 flex gap-3">
            <CheckCircle2 className="text-green-400 flex-shrink-0 animate-bounce" size={24} />
            <div>
              <p className="text-green-300 font-bold text-lg">Processing Complete!</p>
              <p className="text-slate-300 text-sm">Analyzed {results.totalFrames} frames in {results.processingTime}</p>
            </div>
          </div>

          {/* Count Display */}
          <div className="bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 rounded-2xl p-6 text-center shadow-xl hover:scale-[1.02] transition-transform duration-300">
            <p className="text-white/80 text-sm font-semibold mb-2">Total Objects Counted</p>
            <p className="text-6xl font-bold text-white">{results.totalCount || 12}</p>
          </div>

          {/* Video Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <p className="text-slate-400 text-xs mb-1">Total Frames</p>
              <p className="text-white font-bold text-2xl">{results.totalFrames || 300}</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <p className="text-slate-400 text-xs mb-1">FPS</p>
              <p className="text-white font-bold text-2xl">{results.fps || 30}</p>
            </div>
          </div>

          {/* Stats Display */}
          {results.stats && <StatsDisplay stats={results.stats} />}

          {/* Download Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleDownload}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02]"
            >
              <Download size={20} />
              Download Results Data
            </button>
            <button
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02]"
            >
              <Download size={20} />
              Download Processed Video
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoResults;