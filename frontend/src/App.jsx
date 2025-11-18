import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Nav from './components/Nav';
import ImageDetection from './Pages/ObjectDetectionAndCount';
import Footer from './components/Footer';
import AnimalDetection from './Pages/AnimalDetection';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // Map pathname to active tab
  const activeTab = (() => {
    if (location.pathname.includes('object-count')) return 'object-count';
    if (location.pathname.includes('animal-detect')) return 'animal-detect';
    if (location.pathname.includes('reports')) return 'reports';
    if (location.pathname.includes('video')) return 'video';
    return 'image';
  })();

  const handleTabChange = (tabId) => {
    switch (tabId) {
      case 'image':
        navigate('/image');
        break;
      case 'object-count':
        navigate('/object-count');
        break;
      case 'animal-detect':
        navigate('/animal-detect');
        break;
      case 'reports':
        navigate('/reports');
        break;
      case 'video':
        navigate('/video');
        break;
      default:
        navigate('/image');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-fuchsia-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-violet-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        <Nav activeTab={activeTab} setActiveTab={handleTabChange} />

        <main className="max-w-7xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/object-count" element={<ImageDetection />} />
            <Route path="/animal-detect" element={<AnimalDetection />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;