import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BasicsPage from './pages/BasicsPage';
import LearningPage from './pages/LearningPage';
import ToolsPage from './pages/ToolsPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-neutral-50">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/basics" element={<BasicsPage />} />
            <Route path="/learning" element={<LearningPage />} />
            <Route path="/tools" element={<ToolsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
