import React from "react";
import { Download, CheckCircle2 } from "lucide-react";
import StatsDisplay from "./StatsDisplay";

const ResultsDisplay = ({ results, isProcessing }) => {
  const handleDownload = () => {
    if (!results) return;

    const element = document.createElement("a");
    const content = `
Object Counting Results

Total Objects: ${results.count}
Method: ${results.method}
Processing Time: ${results.processingTime || "N/A"}

Detected Objects:
${results.objects.map((obj) => `- ${obj.name}: ${obj.confidence}%`).join("\n")}
    `;
    const file = new Blob([content], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "object-counting-results.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="bg-gradient-to-br from-gray-900/40 to-gray-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl lg:sticky lg:top-24 h-fit transition-all duration-500 hover:shadow-purple-500/30">
      <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        Detection Results
      </h3>

      {/* No results yet */}
      {!results && !isProcessing && (
        <div className="text-center py-24">
          <div className="bg-purple-500/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse shadow-lg shadow-purple-500/20">
            <svg
              className="w-12 h-12 text-purple-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <p className="text-slate-400 text-lg font-medium">
            Upload an image and click <span className="font-bold text-white">"Detect Objects"</span> to see results
          </p>
        </div>
      )}

      {/* Processing */}
      {isProcessing && (
        <div className="text-center py-24 animate-pulse">
          <div className="animate-spin w-20 h-20 border-4 border-purple-500/30 border-t-purple-500 rounded-full mx-auto mb-4 shadow-lg"></div>
          <p className="text-white text-lg font-semibold mb-2">
            Analyzing image...
          </p>
          <p className="text-slate-400 text-sm">Detecting objects with YOLOv8 AI</p>
        </div>
      )}

      {/* Results */}
      {results && (
        <div className="space-y-6 animate-in slide-in-from-right duration-500">
          {/* Detection Complete */}
          <div className="bg-green-500/10 backdrop-blur-sm border border-green-400/40 rounded-2xl p-4 flex gap-3 shadow-green-500/20 hover:scale-[1.02] transition-transform duration-300">
            <CheckCircle2
              className="text-green-400 flex-shrink-0 animate-bounce"
              size={28}
            />
            <div>
              <p className="text-green-300 font-bold text-lg">
                Detection Complete!
              </p>
              <p className="text-slate-300 text-sm">
                Found {results.count} object(s)
              </p>
            </div>
          </div>

          {/* Annotated Image */}
          {results.annotatedImage && (
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-lg">
              <img
                src={results.annotatedImage}
                alt="Annotated"
                className="w-full rounded-2xl"
              />
            </div>
          )}

          {/* Total Objects */}
          <div className="bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 rounded-3xl p-6 text-center shadow-xl hover:scale-[1.03] transition-transform duration-300">
            <p className="text-white/80 text-sm font-semibold mb-2">
              Total Animals Detected
            </p>
            <p className="text-6xl font-bold text-white">{results.count}</p>
          </div>

          {/* Object Table */}
          <div>
            <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              Detected Animals
            </h4>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 shadow-inner">
              <table className="w-full">
                <thead className="bg-white/10 backdrop-blur-sm">
                  <tr>
                    <th className="text-left p-4 text-white font-semibold text-sm">#</th>
                    <th className="text-left p-4 text-white font-semibold text-sm">Name of Animals</th>
                    <th className="text-right p-4 text-white font-semibold text-sm">Count Animals</th>
                  </tr>
                </thead>
                <tbody>
                  {results.objects.map((obj, index) => (
                    <tr
                      key={index}
                      className="border-t border-white/10 hover:bg-white/5 transition-colors"
                    >
                      <td className="p-4 text-slate-400 text-sm">{index + 1}</td>
                      <td className="p-4 text-slate-200">{obj.name}</td>
                      <td className="p-4 text-right text-white font-semibold items-center justify-center">
                        {obj.confidence}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Stats */}
          {results.stats && <StatsDisplay stats={results.stats} />}

          {/* Download Button */}
          <button
            onClick={handleDownload}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-2xl font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.03]"
          >
            <Download size={20} />
            Download Results
          </button>
        </div>
      )}
    </div>
  );
};

export default ResultsDisplay;
