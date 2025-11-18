import React, { useState } from 'react';
import ImageUpload from '../Pages/ImageUpload';
import ResultsDisplay from '../Pages/ResultsDisplay';
import FeatureCards from '../Pages/FeatureCards';
import useDetection from '../hooks/useDetection';

const ImageDetection = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const { isProcessing, results, handleDetection, resetDetection } = useDetection(
    uploadedImage,
    'opencv'
  );

  const handleImageUpload = (file, preview) => {
    setUploadedImage(file);
    setImagePreview(preview);
    resetDetection();
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
    setImagePreview(null);
    resetDetection();
  };

  return (
    <>
      {/* Hero Section */}
      <div className="text-center mb-12 animate-in fade-in duration-700">
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
          Image Object Counting
        </h2>
        <p className="text-xl text-slate-300 mb-2">
          Using OpenCV Computer Vision
        </p>
        <p className="text-slate-400">
          Upload an image to count objects like apples, pens, books, bricks, and more
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          <ImageUpload
            imagePreview={imagePreview}
            onImageUpload={handleImageUpload}
            onRemoveImage={handleRemoveImage}
            onDetect={handleDetection}
            isProcessing={isProcessing}
          />
        </div>

        {/* Right Column */}
        <ResultsDisplay
          results={results}
          isProcessing={isProcessing}
        />
      </div>

      {/* Features */}
      <FeatureCards />
    </>
  );
};

export default ImageDetection;