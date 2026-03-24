import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Timer } from 'lucide-react';
import { motion } from 'framer-motion';

export function StudyTimer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes default
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<'focus' | 'break'>('focus');

  useEffect(() => {
    let interval: number | undefined;
    if (isRunning && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      // Play sound or notification here ideally
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const toggleTimer = () => setIsRunning(!isRunning);
  
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(mode === 'focus' ? 25 * 60 : 5 * 60);
  };

  const switchMode = (newMode: 'focus' | 'break') => {
    setMode(newMode);
    setIsRunning(false);
    setTimeLeft(newMode === 'focus' ? 25 * 60 : 5 * 60);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center gap-2 mb-6 text-slate-800">
        <Timer className="text-purple-600" />
        <h3 className="font-bold text-lg">Study Timer</h3>
      </div>

      <div className="flex justify-center gap-2 mb-8">
        <button
          onClick={() => switchMode('focus')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            mode === 'focus' ? 'bg-blue-100 text-blue-700' : 'text-slate-500 hover:bg-slate-100'
          }`}
        >
          Focus (25m)
        </button>
        <button
          onClick={() => switchMode('break')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            mode === 'break' ? 'bg-purple-100 text-purple-700' : 'text-slate-500 hover:bg-slate-100'
          }`}
        >
          Break (5m)
        </button>
      </div>

      <div className="text-center mb-8">
        <motion.div 
          key={timeLeft}
          initial={{ scale: 0.95, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-6xl font-black text-slate-800 tabular-nums tracking-tight"
        >
          {formatTime(timeLeft)}
        </motion.div>
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={toggleTimer}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all hover:scale-105 active:scale-95"
        >
          {isRunning ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
        </button>
        <button
          onClick={resetTimer}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
        >
          <RotateCcw size={24} />
        </button>
      </div>
    </div>
  );
}
