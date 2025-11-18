import { useState, useRef, useEffect } from 'react';

const useRealtimeCamera = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [stats, setStats] = useState({
    fps: 0,
    objectCount: 0,
    processingTime: 0,
    accuracy: 0,
    runtime: 0
  });
  const [detectedObjects, setDetectedObjects] = useState([]);
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const animationFrameRef = useRef(null);
  const startTimeRef = useRef(Date.now());
  const frameCountRef = useRef(0);
  const lastFrameTimeRef = useRef(Date.now());

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: 1280, 
          height: 720 
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        
        videoRef.current.onloadedmetadata = () => {
          processFrame();
        };
      }
    } catch (err) {
      console.error('Camera error:', err);
      alert('Unable to access camera. Please check permissions.');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  const processFrame = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set canvas size to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Calculate FPS
    const currentTime = Date.now();
    frameCountRef.current++;
    const fps = Math.round(1000 / (currentTime - lastFrameTimeRef.current));
    lastFrameTimeRef.current = currentTime;

    // Calculate runtime
    const runtime = Math.floor((currentTime - startTimeRef.current) / 1000);

    // Simulate object detection (replace with actual OpenCV detection)
    const mockDetection = simulateDetection();
    
    // Draw bounding boxes
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    mockDetection.objects.forEach(obj => {
      drawBoundingBox(ctx, obj);
    });

    // Update stats
    setStats({
      fps: fps || 30,
      objectCount: mockDetection.objects.length,
      processingTime: mockDetection.processingTime,
      accuracy: mockDetection.accuracy,
      runtime: runtime
    });

    setDetectedObjects(mockDetection.objects);

    // Continue processing
    animationFrameRef.current = requestAnimationFrame(processFrame);
  };

  const simulateDetection = () => {
    // Simulate detection results (replace with actual OpenCV processing)
    const objectTypes = ['Person', 'Car', 'Bike', 'Phone', 'Laptop', 'Book', 'Bottle', 'Cup'];
    const numObjects = Math.floor(Math.random() * 8) + 2;
    
    const objects = Array.from({ length: numObjects }, (_, i) => ({
      name: objectTypes[Math.floor(Math.random() * objectTypes.length)],
      confidence: Math.floor(Math.random() * 25) + 75,
      x: Math.random() * 0.7 * (canvasRef.current?.width || 640),
      y: Math.random() * 0.7 * (canvasRef.current?.height || 480),
      width: Math.random() * 150 + 100,
      height: Math.random() * 150 + 100
    }));

    return {
      objects,
      processingTime: Math.floor(Math.random() * 20) + 15,
      accuracy: Math.floor(Math.random() * 15) + 85
    };
  };

  const drawBoundingBox = (ctx, obj) => {
    // Draw bounding box
    ctx.strokeStyle = '#8b5cf6';
    ctx.lineWidth = 3;
    ctx.strokeRect(obj.x, obj.y, obj.width, obj.height);

    // Draw label background
    ctx.fillStyle = '#8b5cf6';
    const label = `${obj.name} ${obj.confidence}%`;
    ctx.font = 'bold 16px Arial';
    const textWidth = ctx.measureText(label).width;
    ctx.fillRect(obj.x, obj.y - 30, textWidth + 20, 30);

    // Draw label text
    ctx.fillStyle = '#ffffff';
    ctx.fillText(label, obj.x + 10, obj.y - 8);
  };

  return {
    videoRef,
    canvasRef,
    isProcessing,
    stats,
    detectedObjects
  };
};

export default useRealtimeCamera;