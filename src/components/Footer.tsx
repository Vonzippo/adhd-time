import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Instagram, Twitter, Facebook, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-neutral-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center">
              <Brain className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-semibold text-neutral-900">ADHDTime</span>
            </div>
            <p className="mt-4 text-sm text-neutral-600 max-w-xs">
              Discover, Learn, and Engage – Your interactive space for ADHD insights
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="https://de.pinterest.com/OetterliappsEtsy/" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-primary-600">
                <span className="sr-only">Pinterest</span>
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-500 hover:text-primary-600">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-500 hover:text-primary-600">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-5 w-5" />
              </a>
            </div>
            <div className="mt-4">
              <a href="https://www.etsy.com/shop/ADHDTime" target="_blank" rel="noopener noreferrer" className="text-sm text-primary-600 hover:text-primary-700">
                Support us on Etsy
              </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-neutral-900 tracking-wider uppercase">Resources</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/basics" className="text-sm text-neutral-600 hover:text-primary-600">
                  ADHD Basics
                </Link>
              </li>
              <li>
                <Link to="/learning" className="text-sm text-neutral-600 hover:text-primary-600">
                  Interactive Learning
                </Link>
              </li>
              <li>
                <Link to="/tools" className="text-sm text-neutral-600 hover:text-primary-600">
                  Tools & Resources
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-neutral-900 tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a href="#" className="text-sm text-neutral-600 hover:text-primary-600">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-neutral-600 hover:text-primary-600">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-neutral-600 hover:text-primary-600">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-neutral-600 hover:text-primary-600">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-neutral-900 tracking-wider uppercase">Stay Updated</h3>
            <p className="mt-4 text-sm text-neutral-600">
              Subscribe for more interactive tips and resources.
            </p>
            <form className="mt-4">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="min-w-0 flex-1 appearance-none border border-neutral-300 py-2 px-4 bg-white text-neutral-900 placeholder-neutral-500 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
                />
                <button
                  type="submit"
                  className="flex-shrink-0 bg-primary-600 text-white py-2 px-4 border border-transparent rounded-r-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2"
                >
                  <Mail className="h-5 w-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <div className="mt-12 border-t border-neutral-200 pt-8">
          <p className="text-sm text-neutral-500 text-center">
            &copy; {new Date().getFullYear()} ADHDTime. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
