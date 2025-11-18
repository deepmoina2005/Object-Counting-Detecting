import { useState } from 'react';
import axios from 'axios';

const useDetection = (file) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState(null);

  const handleDetection = async () => {
    if (!file) return;

    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('http://localhost:8000/detect', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.status) {
        const detectedObjects = Object.entries(response.data.objects).map(([name, count]) => ({
          name,
          confidence: count, // or get confidence if your backend sends it
        }));

        setResults({
          count: detectedObjects.reduce((acc, obj) => acc + obj.confidence, 0),
          method: 'YOLOv8',
          processingTime: 'N/A', // optionally get from backend
          objects: detectedObjects,
          annotatedImage: response.data.annotated_image,
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const resetDetection = () => {
    setResults(null);
    setIsProcessing(false);
  };

  return { isProcessing, results, handleDetection, resetDetection };
};

export default useDetection;
