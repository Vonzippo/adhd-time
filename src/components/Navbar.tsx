import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Brain } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Brain className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-semibold text-neutral-900">ADHD Platform</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link to="/basics" className="text-neutral-600 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors">
              ADHD Basics
            </Link>
            <Link to="/learning" className="text-neutral-600 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors">
              Interactive Learning
            </Link>
            <Link to="/tools" className="text-neutral-600 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors">
              Tools
            </Link>
            <Link to="/" className="btn btn-primary text-sm">
              Get Started
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-neutral-600 hover:text-primary-600 hover:bg-neutral-100 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg rounded-b-xl">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/basics" 
              className="block px-3 py-2 rounded-md text-base font-medium text-neutral-600 hover:text-primary-600 hover:bg-neutral-100"
              onClick={() => setIsMenuOpen(false)}
            >
              ADHD Basics
            </Link>
            <Link 
              to="/learning" 
              className="block px-3 py-2 rounded-md text-base font-medium text-neutral-600 hover:text-primary-600 hover:bg-neutral-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Interactive Learning
            </Link>
            <Link 
              to="/tools" 
              className="block px-3 py-2 rounded-md text-base font-medium text-neutral-600 hover:text-primary-600 hover:bg-neutral-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Tools
            </Link>
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium bg-primary-600 text-white hover:bg-primary-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;