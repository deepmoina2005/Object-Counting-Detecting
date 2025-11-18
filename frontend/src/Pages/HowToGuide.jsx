import React from 'react';
import { Upload, Settings, Play, Download } from 'lucide-react';

const HowToGuide = ({ type }) => {
  const steps = type === 'image' ? [
    {
      icon: <Upload className="w-6 h-6" />,
      title: 'Upload Image',
      description: 'Drag & drop or click to upload an image (JPG, PNG, Max 10MB). You can also capture from camera.'
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: 'Automatic Processing',
      description: 'OpenCV applies color detection and thresholding to identify objects in your image.'
    },
    {
      icon: <Play className="w-6 h-6" />,
      title: 'Detect Objects',
      description: 'Click "Detect Objects" button to start the counting process using OpenCV algorithms.'
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: 'View & Download',
      description: 'See counted objects with confidence scores. Download results and annotated images.'
    }
  ] : [
    {
      icon: <Upload className="w-6 h-6" />,
      title: 'Upload Video',
      description: 'Drag & drop or click to upload a video file (MP4, AVI, MOV, Max 50MB).'
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: 'Frame Processing',
      description: 'OpenCV processes each frame, applying object detection and tracking algorithms.'
    },
    {
      icon: <Play className="w-6 h-6" />,
      title: 'Track & Count',
      description: 'Objects are tracked across frames with unique IDs. Count updates as objects enter zones.'
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: 'Export Results',
      description: 'Download processed video with bounding boxes and complete counting analytics.'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 backdrop-blur-lg border border-purple-500/30 rounded-2xl p-8">
      <h3 className="text-2xl font-bold text-white mb-6 text-center">
        📚 How to Use - Step by Step Guide
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <div key={index} className="bg-indigo-950/50 rounded-xl p-6 border border-purple-500/20 hover:border-purple-400 transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-gradient-to-br from-orange-500 to-pink-600 p-3 rounded-lg text-white">
                {step.icon}
              </div>
              <div className="text-2xl font-bold text-orange-400">
                {index + 1}
              </div>
            </div>
            <h4 className="text-lg font-bold text-white mb-2">{step.title}</h4>
            <p className="text-gray-300 text-sm leading-relaxed">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowToGuide;
