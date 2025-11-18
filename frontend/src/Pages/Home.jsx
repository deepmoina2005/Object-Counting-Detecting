import React, { useState } from 'react';
import Header from './Header';
import MethodSelector from './MethodSelector';
import ImageUpload from './ImageUpload';
import ResultsDisplay from './ResultsDisplay';
import FeatureCards from './FeatureCards';
import useDetection from '../hooks/useDetection';

const Home = () => {
  const [selectedMethod, setSelectedMethod] = useState('yolov8');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  const { isProcessing, results, handleDetection, resetDetection } = useDetection(
    uploadedImage,
    selectedMethod
  );

  const handleReset = () => {
    setUploadedImage(null);
    setImagePreview(null);
    resetDetection();
  };

  const handleImageUpload = (file, preview) => {
    setUploadedImage(file);
    setImagePreview(preview);
    resetDetection();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      <Header hasImage={!!uploadedImage} onReset={handleReset} />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            AI-Powered Object Counting
          </h2>
          <p className="text-xl text-gray-300 mb-2">
            Using YOLOv8 & Computer Vision
          </p>
          <p className="text-gray-400">
            Count apples, pens, books, bricks, and more with precision
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <MethodSelector
              selectedMethod={selectedMethod}
              onMethodChange={setSelectedMethod}
            />

            <ImageUpload
              imagePreview={imagePreview}
              onImageUpload={handleImageUpload}
              onDetect={handleDetection}
              isProcessing={isProcessing}
              selectedMethod={selectedMethod}
            />
          </div>

          {/* Right Column */}
          <ResultsDisplay
            results={results}
            isProcessing={isProcessing}
            selectedMethod={selectedMethod}
          />
        </div>

        {/* Features Section */}
        <FeatureCards />
      </main>

      {/* Footer */}
      <footer className="bg-indigo-950/50 backdrop-blur-lg border-t border-purple-500/30 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400 mb-2">
            Built for Avishkar Hackathon 2025 - CTII Dibrugarh University
          </p>
          <p className="text-gray-500 text-sm">
            Object Counting using YOLOv8 & OpenCV Computer Vision
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
