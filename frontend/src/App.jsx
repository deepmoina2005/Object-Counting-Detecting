import React, { useState } from 'react';
import Nav from './components/Nav-bar/Nav';
import ImageDetection from './Pages/ImageDetection';
import VideoDetection from './Pages/VideoDetection';
import Footer from './components/Footer';

function App() {
  const [activeTab, setActiveTab] = useState('image');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-fuchsia-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-violet-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        <Nav activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="max-w-7xl mx-auto px-4 py-8">
          {activeTab === 'image' ? <ImageDetection /> : <VideoDetection />}
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;