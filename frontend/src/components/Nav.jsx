import { Image, Activity } from "lucide-react";

const Nav = ({ activeTab, setActiveTab }) => {
  const navLinks = [
    { id: "animal-detect", label: "Animal Detect", icon: <Image size={20} /> },
        { id: "reports", label: "Report", icon: <Activity size={20} /> },

  ];

  return (
    <header className="bg-slate-900/40 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3 group">
            <div className="bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 p-2.5 rounded-xl shadow-lg shadow-purple-500/50 group-hover:shadow-purple-500/70 transition-all duration-300 group-hover:scale-110">
              <svg
                className="w-8 h-8 text-white"
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
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                Animal Detector
              </h1>
              <p className="text-xs text-slate-400">
                AI-Powered Animal Detection
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex gap-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === link.id
                    ? "bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-lg shadow-purple-500/50 scale-105"
                    : "bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10 hover:scale-105"
                }`}
              >
                {link.icon}
                <span className="hidden sm:inline">{link.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Nav;
