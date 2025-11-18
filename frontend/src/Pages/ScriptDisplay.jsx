import React, { useState } from 'react';
import { Code, Copy, Check } from 'lucide-react';

const ScriptDisplay = ({ type }) => {
  const [copiedImage, setCopiedImage] = useState(false);
  const [copiedVideo, setCopiedVideo] = useState(false);

  const imageScript = `import cv2
import numpy as np

# Load image
image = cv2.imread('input_image.jpg')

# Convert to HSV color space
hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)

# Define color range for object detection
lower_bound = np.array([0, 50, 50])
upper_bound = np.array([180, 255, 255])

# Create mask and find contours
mask = cv2.inRange(hsv, lower_bound, upper_bound)
contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

# Count objects
object_count = len(contours)

# Draw bounding boxes
for contour in contours:
    x, y, w, h = cv2.boundingRect(contour)
    cv2.rectangle(image, (x, y), (x+w, y+h), (0, 255, 0), 2)

# Display count
cv2.putText(image, f'Count: {object_count}', (10, 30), 
            cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

# Save result
cv2.imwrite('output_image.jpg', image)
print(f'Total objects detected: {object_count}')`;

  const videoScript = `import cv2
import numpy as np

# Open video file
cap = cv2.VideoCapture('input_video.mp4')

# Initialize tracker and counter
object_ids = set()
total_count = 0

# Define detection zone (polygon)
zone = np.array([[100, 100], [500, 100], [500, 400], [100, 400]])

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break
    
    # Convert to HSV
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
    
    # Object detection with color thresholding
    mask = cv2.inRange(hsv, lower_bound, upper_bound)
    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    # Track objects
    for contour in contours:
        x, y, w, h = cv2.boundingRect(contour)
        center = (x + w//2, y + h//2)
        
        # Check if object in zone
        if cv2.pointPolygonTest(zone, center, False) >= 0:
            object_id = f"{x}_{y}"
            if object_id not in object_ids:
                object_ids.add(object_id)
                total_count += 1
            
            # Draw bounding box
            cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2)
    
    # Draw zone and count
    cv2.polylines(frame, [zone], True, (255, 0, 0), 2)
    cv2.putText(frame, f'Count: {total_count}', (10, 30),
                cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
    
    # Display frame
    cv2.imshow('Object Counting', frame)
    
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
print(f'Total objects counted: {total_count}')`;

  const handleCopyImage = () => {
    navigator.clipboard.writeText(imageScript);
    setCopiedImage(true);
    setTimeout(() => setCopiedImage(false), 2000);
  };

  const handleCopyVideo = () => {
    navigator.clipboard.writeText(videoScript);
    setCopiedVideo(true);
    setTimeout(() => setCopiedVideo(false), 2000);
  };

  return (
    <div className="mt-12">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-3">
          <Code className="w-8 h-8 text-orange-400" />
          OpenCV Scripts Used
        </h3>
        <p className="text-gray-300">Color detection and thresholding algorithms</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Image Detection Script */}
        <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 backdrop-blur-lg border border-purple-500/30 rounded-2xl overflow-hidden">
          <div className="bg-indigo-950/50 px-6 py-4 border-b border-purple-500/30 flex items-center justify-between">
            <h4 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-orange-400">📷</span>
              Image Detection Script
            </h4>
            <button
              onClick={handleCopyImage}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-all text-sm"
            >
              {copiedImage ? <Check size={16} /> : <Copy size={16} />}
              {copiedImage ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <pre className="p-6 overflow-x-auto text-sm">
            <code className="text-gray-300 font-mono">
              {imageScript}
            </code>
          </pre>
        </div>

        {/* Video Detection Script */}
        <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 backdrop-blur-lg border border-purple-500/30 rounded-2xl overflow-hidden">
          <div className="bg-indigo-950/50 px-6 py-4 border-b border-purple-500/30 flex items-center justify-between">
            <h4 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-orange-400">🎥</span>
              Video Detection Script
            </h4>
            <button
              onClick={handleCopyVideo}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-all text-sm"
            >
              {copiedVideo ? <Check size={16} /> : <Copy size={16} />}
              {copiedVideo ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <pre className="p-6 overflow-x-auto text-sm">
            <code className="text-gray-300 font-mono">
              {videoScript}
            </code>
          </pre>
        </div>
      </div>

      {/* Algorithm Explanation */}
      <div className="mt-6 bg-blue-500/10 border border-blue-400/30 rounded-xl p-6">
        <h4 className="text-lg font-bold text-blue-300 mb-3">💡 Algorithm Explanation:</h4>
        <ul className="space-y-2 text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-orange-400 mt-1">•</span>
            <span><strong className="text-white">Color Space Conversion:</strong> Convert BGR to HSV for better color detection</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-400 mt-1">•</span>
            <span><strong className="text-white">Thresholding:</strong> Create binary mask using color range to isolate objects</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-400 mt-1">•</span>
            <span><strong className="text-white">Contour Detection:</strong> Find object boundaries using cv2.findContours()</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-400 mt-1">•</span>
            <span><strong className="text-white">Object Tracking:</strong> {type === 'video' ? 'Track objects across frames with unique IDs and zone detection' : 'Draw bounding boxes around detected objects'}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ScriptDisplay;
