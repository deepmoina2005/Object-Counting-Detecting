import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from '../Nav-bar/Nav';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      {/* Navigation Bar */}
      <Nav />

      {/* This is where child routes will render */}
      <Outlet />

      {/* Footer */}
      <footer className="bg-indigo-950/50 backdrop-blur-lg border-t border-purple-500/30 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400 mb-2">
            Built for Avishkar Hackathon 2025 - CTII Dibrugarh University
          </p>
          <p className="text-gray-500 text-sm">
            Object Counting using OpenCV Computer Vision
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
