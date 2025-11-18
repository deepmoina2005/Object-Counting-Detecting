import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900/40 backdrop-blur-xl border-t border-white/10 mt-16 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent mb-2">
              Object Counter Pro
            </h3>
            <p className="text-slate-400">
              AI-powered object counting for modern applications
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-400 hover:text-purple-400 transition-colors">Documentation</a></li>
              <li><a href="#" className="text-slate-400 hover:text-purple-400 transition-colors">API Reference</a></li>
              <li><a href="#" className="text-slate-400 hover:text-purple-400 transition-colors">Support</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-semibold mb-3">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="bg-white/5 backdrop-blur-sm p-3 rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-110 border border-white/10">
                <Github className="text-white" size={20} />
              </a>
              <a href="#" className="bg-white/5 backdrop-blur-sm p-3 rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-110 border border-white/10">
                <Linkedin className="text-white" size={20} />
              </a>
              <a href="#" className="bg-white/5 backdrop-blur-sm p-3 rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-110 border border-white/10">
                <Mail className="text-white" size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-slate-400">
            © 2025 Object Counter Pro. Built for Avishkar Hackathon - CTII Dibrugarh University
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;