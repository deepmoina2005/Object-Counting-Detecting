// src/pages/Reports.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const Reports = () => {
  const [detections, setDetections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDetections();
  }, []);

  const fetchDetections = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/animal/detections");
      if (data.status) setDetections(data.detections);
      else console.error("Failed to fetch detections:", data.error);
    } catch (error) {
      console.error("Error fetching detections:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-white">Animal Detection Reports</h1>

      {loading ? (
        <p className="text-white">Loading reports...</p>
      ) : detections.length === 0 ? (
        <p className="text-white">No reports found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 text-white rounded-lg shadow-lg">
            <thead>
              <tr className="bg-purple-700 text-left">
                <th className="py-3 px-6 border-b border-gray-600">Image</th>
                <th className="py-3 px-6 border-b border-gray-600">File Name</th>
                <th className="py-3 px-6 border-b border-gray-600">Timestamp</th>
                <th className="py-3 px-6 border-b border-gray-600">Animals Detected</th>
              </tr>
            </thead>
            <tbody>
              {detections.map((detection) => (
                <tr
                  key={detection._id}
                  className="hover:bg-gray-700 transition-all duration-200"
                >
                  <td className="py-4 px-6 border-b border-gray-600">
                    <img
                      src={detection.image_url}
                      alt={detection.file_name}
                      className="w-28 h-28 object-cover rounded-lg shadow-md"
                    />
                  </td>
                  <td className="py-4 px-6 border-b border-gray-600">{detection.file_name}</td>
                  <td className="py-4 px-6 border-b border-gray-600">{detection.timestamp}</td>
                  <td className="py-4 px-6 border-b border-gray-600">
                    <ul className="list-disc ml-5">
                      {detection.animals &&
                        Object.entries(detection.animals).map(([animal, count]) => (
                          <li key={animal}>
                            {animal}: {count}
                          </li>
                        ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Reports;
