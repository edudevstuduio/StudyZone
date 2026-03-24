import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, PlayCircle, FileText, ArrowRight, CheckCircle2, Target, Lightbulb } from 'lucide-react';
import { StudyTimer } from '../components/StudyTimer';

export function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-16 pb-24 lg:pt-24 lg:pb-32">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-[0.03]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white/100"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-6">
                Class 9 • 10 • 12 (CBSE/NCERT)
              </span>
              <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
                Study Zone <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">🚀</span>
              </h1>
              <p className="text-xl text-slate-600 mb-10">
                One-Stop Solution for Smart Study & Exam Success. Get premium notes, quick revision videos, and top-tier strategies.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <Link to="/notes" className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all hover:-translate-y-0.5">
                <BookOpen size={20} />
                Explore Notes
              </Link>
              <Link to="/one-shots" className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-slate-700 border border-slate-200 font-semibold text-lg hover:bg-slate-50 transition-all">
                <PlayCircle size={20} />
                One-Shots
              </Link>
              <Link to="/pyqs" className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-slate-700 border border-slate-200 font-semibold text-lg hover:bg-slate-50 transition-all">
                <FileText size={20} />
                PYQs
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: About & Roadmap */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Harshit */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl"></div>
              <div className="relative z-10 md:flex items-center gap-8">
                <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 mb-6 md:mb-0 border-2 border-white/30">
                  <span className="text-4xl">👨‍🏫</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-2">Hi, I'm Harshit</h2>
                  <p className="text-blue-100 text-lg leading-relaxed">
                    Your study companion. I help you understand concepts in the simplest way and score better in exams. Let's make learning fun and effective!
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Quick Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: 'Chapter Roadmaps', desc: 'Know exactly what to study', icon: Target, color: 'text-blue-600', bg: 'bg-blue-100' },
                { title: 'Smart Strategies', desc: 'Time management & tips', icon: Lightbulb, color: 'text-amber-600', bg: 'bg-amber-100' },
              ].map((feature, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-300 transition-colors group">
                  <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className={feature.color} size={24} />
                  </div>
                  <h3 className="font-bold text-slate-800 text-lg mb-1">{feature.title}</h3>
                  <p className="text-slate-500">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Tools */}
          <div className="space-y-8">
            <StudyTimer />
            
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h3 className="font-bold text-lg text-slate-800 mb-4">Latest Updates</h3>
              <div className="space-y-4">
                {[
                  'Class 10 Science Chapter 4 Notes Added',
                  'New One-Shot: Electricity (Class 10)',
                  'Class 12 Physics PYQs Updated'
                ].map((update, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="text-green-500 mt-0.5 flex-shrink-0" size={18} />
                    <p className="text-sm text-slate-600">{update}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
