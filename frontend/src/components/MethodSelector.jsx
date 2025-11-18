import React from 'react';

const MethodSelector = ({ selectedMethod, onMethodChange }) => {
  const methods = [
    {
      id: 'yolov8',
      icon: '🤖',
      title: 'YOLOv8',
      subtitle: 'AI Detection'
    },
    {
      id: 'opencv',
      icon: '🎨',
      title: 'OpenCV',
      subtitle: 'Traditional CV'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 backdrop-blur-lg border border-purple-500/30 rounded-2xl p-6">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-pink-600 rounded-lg flex items-center justify-center text-white font-bold">
          1
        </div>
        Detection Method
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {methods.map((method) => (
          <button
            key={method.id}
            onClick={() => onMethodChange(method.id)}
            className={`p-6 rounded-xl border-2 transition-all ${
              selectedMethod === method.id
                ? 'bg-gradient-to-br from-purple-600 to-pink-600 border-purple-400 shadow-lg shadow-purple-500/50'
                : 'bg-indigo-900/30 border-purple-500/30 hover:border-purple-400'
            }`}
          >
            <div className="text-4xl mb-2">{method.icon}</div>
            <div className="text-white font-bold text-lg">{method.title}</div>
            <div className="text-gray-300 text-sm">{method.subtitle}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MethodSelector;
