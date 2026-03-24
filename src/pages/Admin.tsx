import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Lock, LayoutDashboard, FileText, Video, Settings, LogOut, Upload } from 'lucide-react';
import { motion } from 'framer-motion';

export function Admin() {
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('notes');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // In a real scenario, Supabase handles the actual auth.
    // We rely on Supabase to reject non-admin emails if setup correctly,
    // or we can check the email here before attempting login.
    const allowedEmails = ['admin1@example.com', 'harshit@example.com']; // Replace with actual emails
    
    // For demo/setup purposes, we'll just attempt login.
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200 p-8"
        >
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-slate-100 rounded-full">
              <Lock className="text-slate-600" size={32} />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center text-slate-800 mb-2">Restricted Access</h2>
          <p className="text-center text-slate-500 mb-8 text-sm">
            This area is strictly for administrators. Public registration is disabled.
          </p>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Admin Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors disabled:opacity-70"
            >
              {loading ? 'Authenticating...' : 'Secure Login'}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // Admin Dashboard UI
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-slate-300 flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-white font-bold text-lg flex items-center gap-2">
            <LayoutDashboard size={20} />
            Admin Panel
          </h2>
        </div>
        
        <nav className="flex-1 py-6 px-3 space-y-1">
          {[
            { id: 'notes', label: 'Notes Manager', icon: FileText },
            { id: 'pyqs', label: 'PYQ Manager', icon: FileText },
            { id: 'videos', label: 'One-Shots', icon: Video },
            { id: 'settings', label: 'Settings', icon: Settings },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${
                activeTab === item.id ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 capitalize">{activeTab.replace('-', ' ')}</h1>
            <p className="text-slate-500 text-sm">Manage your platform content here.</p>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
            <Upload size={16} />
            Upload New
          </button>
        </header>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
              <Settings className="text-slate-400" size={24} />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-1">Database Not Connected</h3>
            <p className="text-slate-500 max-w-sm mx-auto text-sm">
              Please connect your Supabase project and set up the tables (notes, pyqs, resources) to manage content here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
