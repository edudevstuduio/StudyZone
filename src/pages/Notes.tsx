import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Download, FileText, Filter } from 'lucide-react';
import { mockNotes } from '../lib/mockData';

export function Notes() {
  const [activeClass, setActiveClass] = useState('10');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNotes = mockNotes.filter(
    (note) => 
      note.class === activeClass && 
      note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">The Vault 📚</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Premium handwritten notes, mind maps, and chapter summaries to boost your revision.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        {/* Class Selector */}
        <div className="flex p-1 bg-white rounded-xl border border-slate-200 shadow-sm">
          {['9', '10', '12'].map((cls) => (
            <button
              key={cls}
              onClick={() => setActiveClass(cls)}
              className={`px-6 py-2 rounded-lg font-medium text-sm transition-all ${
                activeClass === cls
                  ? 'bg-blue-50 text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Class {cls}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search chapters..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note, index) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all group flex flex-col h-full"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <FileText size={24} />
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full">
                  Ch {note.chapter}
                </span>
              </div>
              
              <h3 className="font-bold text-lg text-slate-800 mb-2 line-clamp-2">
                {note.title}
              </h3>
              <p className="text-sm text-slate-500 mb-6 flex-grow">
                {note.description}
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                <span className="text-sm font-medium text-slate-600">{note.subject}</span>
                <a
                  href={note.file_url}
                  className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors"
                >
                  <Download size={16} />
                  PDF
                </a>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-slate-500">
            No notes found for this search criteria.
          </div>
        )}
      </div>
    </div>
  );
}
