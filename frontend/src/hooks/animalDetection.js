/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
import axios from 'axios';

const animalDetection = (file) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState(null);

  const handleDetection = async () => {
    if (!file) return;

    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(
        'http://localhost:8000/animal/animal-detect',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      if (response.data.status) {
        const detectedAnimals = Object.entries(response.data.animals || {}).map(
          ([name, count]) => ({
            name,
            confidence: count, // count of detected animals
          })
        );

        setResults({
          count: detectedAnimals.reduce((acc, obj) => acc + obj.confidence, 0),
          method: 'YOLOv8',
          processingTime: 'N/A', // optionally get from backend
          objects: detectedAnimals,
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

export default animalDetection;
