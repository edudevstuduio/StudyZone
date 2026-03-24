import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { BookOpen, PlayCircle, Lightbulb, FileText, Menu, X, Rocket } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'The Vault', path: '/notes', icon: BookOpen },
    { name: 'One-Shots', path: '/one-shots', icon: PlayCircle },
    { name: 'Strategy Hub', path: '/strategy', icon: Lightbulb },
    { name: 'PYQ Archive', path: '/pyqs', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-xl text-white group-hover:shadow-lg group-hover:shadow-blue-500/30 transition-all">
                  <Rocket size={24} />
                </div>
                <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-purple-700">
                  Companion Harshit
                </span>
              </Link>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                      isActive ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'
                    }`}
                  >
                    <Icon size={18} />
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-slate-600 hover:text-blue-600 p-2"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-slate-200"
            >
              <div className="px-4 pt-2 pb-4 space-y-1">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium ${
                        isActive
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <Icon size={20} />
                      {link.name}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Rocket size={20} className="text-blue-600" />
            <span className="font-bold text-lg text-slate-800">Companion Harshit</span>
          </div>
          <p className="text-slate-500 text-sm">
            "Your Study Companion and More"
          </p>
          <p className="text-slate-400 text-xs mt-4">
            © {new Date().getFullYear()} Companion Harshit. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
