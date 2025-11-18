import React from 'react';
import { Upload, Camera, X, Play, AlertCircle, Image as ImageIcon } from 'lucide-react';
import useImageUpload from '../hooks/useImageUpload';
import useCamera from '../hooks/useCamera';

const ImageUpload = ({ 
  imagePreview, 
  onImageUpload, 
  onRemoveImage,
  onDetect, 
  isProcessing
}) => {
  const { 
    isDragging, 
    fileInputRef, 
    handleDragEnter, 
    handleDragLeave, 
    handleDragOver, 
    handleDrop, 
    handleFileSelect 
  } = useImageUpload(onImageUpload);
  
  const { 
    showCamera, 
    videoRef, 
    canvasRef, 
    stopCamera, 
    capturePhoto 
  } = useCamera(onImageUpload);

  return (
    <>
      {/* Upload Section */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl hover:shadow-purple-500/10 transition-all duration-300">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
          Upload or Capture Image
        </h3>

        {!showCamera ? (
          <>
            {/* Drag & Drop Zone */}
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
                accept="image/jpeg,image/png,image/jpg"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer block">
                <Upload className="w-14 h-14 text-purple-400 mx-auto mb-4 animate-bounce" />
                <p className="text-white font-semibold mb-2 text-lg">
                  {isDragging ? 'Drop image here' : 'Drag & Drop or Click to Upload'}
                </p>
                <p className="text-slate-400 text-sm">Supports JPG, PNG (Max 10MB)</p>
              </label>
            </div>
          </>
        ) : (
          /* Camera View */
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="relative bg-black/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-64 object-cover"
              />
            </div>
            <canvas ref={canvasRef} className="hidden" />
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={capturePhoto}
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02]"
              >
                <Camera size={20} />
                Capture
              </button>
              <button
                onClick={stopCamera}
                className="bg-red-500/20 hover:bg-red-500/30 text-red-300 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 border border-red-500/30 hover:scale-[1.02]"
              >
                <X size={20} />
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Image Preview */}
        {imagePreview && !showCamera && (
          <div className="mt-6 animate-in fade-in duration-500">
            <p className="text-white font-semibold mb-3 flex items-center gap-2">
              <ImageIcon size={18} className="text-purple-400" />
              Preview
            </p>
            <div className="relative group">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full rounded-2xl border-2 border-white/20 shadow-xl group-hover:scale-[1.02] transition-transform duration-300"
              />
              <button
                onClick={onRemoveImage}
                className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white p-2.5 rounded-full transition-all duration-300 shadow-lg hover:scale-110"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Detect Button */}
      {imagePreview && !showCamera && (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 animate-in slide-in-from-bottom duration-500">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
            Start Detection
          </h3>
          <button
            onClick={onDetect}
            disabled={isProcessing}
            className="w-full bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:scale-[1.02] disabled:hover:scale-100"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                Processing...
              </>
            ) : (
              <>
                <Play size={20} />
                Detect Animal
              </>
            )}
          </button>

          {/* Info Tip */}
          <div className="mt-4 bg-blue-500/10 backdrop-blur-sm border border-blue-400/30 rounded-xl p-4 flex gap-3">
            <AlertCircle className="text-blue-400 flex-shrink-0 animate-pulse" size={20} />
            <p className="text-slate-300 text-sm">
              OpenCV / YOLO detection will process your image and show annotated results.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageUpload;
