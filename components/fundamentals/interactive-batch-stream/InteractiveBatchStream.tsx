'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Box, FastForward, Clock, HardDrive, Zap, RefreshCw, CheckCircle2 } from 'lucide-react';

export function InteractiveBatchStream() {
  const [activeTab, setActiveTab] = useState<'batch' | 'stream'>('batch');
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="w-full flex flex-col items-center gap-8 py-8">
      
      {/* Toggle */}
      <div className="flex bg-zinc-950 border border-zinc-800 p-1.5 rounded-2xl w-full max-w-sm">
        <button
          onClick={() => setActiveTab('batch')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all duration-300 ${
            activeTab === 'batch' ? 'bg-blue-600 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900'
          }`}
        >
          <Box className="w-4 h-4" /> Batch
        </button>
        <button
          onClick={() => setActiveTab('stream')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all duration-300 ${
            activeTab === 'stream' ? 'bg-purple-600 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900'
          }`}
        >
          <Zap className="w-4 h-4" /> Streaming
        </button>
      </div>

      {/* Visual Simulator */}
      <div className="w-full max-w-4xl bg-zinc-950/80 border border-zinc-800 rounded-3xl p-8 overflow-hidden relative shadow-2xl min-h-[300px]">
        {/* Background glow */}
        <div className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl opacity-10 rounded-full blur-[100px] pointer-events-none transition-colors duration-1000 ${
          activeTab === 'batch' ? 'from-blue-500 to-transparent' : 'from-purple-500 to-transparent'
        }`} />

        <div className="flex items-center justify-between gap-4 h-32 relative">
          
          <div className="flex flex-col items-center gap-2 z-10 w-32 shrink-0">
            <div className="w-16 h-16 bg-zinc-900 border border-zinc-700 rounded-2xl flex items-center justify-center shadow-inner">
              <HardDrive className="w-8 h-8 text-zinc-400" />
            </div>
            <span className="text-xs font-mono font-bold text-zinc-500 uppercase">Source</span>
          </div>

          <div className="flex-1 relative h-full flex items-center border-y border-dashed border-zinc-800">
            {!shouldReduceMotion && activeTab === 'batch' && <BatchSimulator />}
            {!shouldReduceMotion && activeTab === 'stream' && <StreamSimulator />}
          </div>

          <div className="flex flex-col items-center gap-2 z-10 w-32 shrink-0">
            <div className="w-16 h-16 bg-zinc-900 border border-zinc-700 rounded-2xl flex items-center justify-center shadow-inner">
              <Database className="w-8 h-8 text-zinc-400" />
            </div>
            <span className="text-xs font-mono font-bold text-zinc-500 uppercase">Target</span>
          </div>
        </div>

        {/* Explainers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          
          <div className={`p-6 rounded-2xl border transition-all duration-500 ${
            activeTab === 'batch' ? 'bg-blue-950/20 border-blue-900/50' : 'bg-zinc-900/30 border-zinc-800 opacity-50 grayscale'
          }`}>
            <h4 className="text-blue-400 font-bold mb-3 flex items-center gap-2"><Clock className="w-4 h-4" /> Batch Processing</h4>
            <ul className="space-y-3 text-sm text-zinc-300">
              <li className="flex gap-2 items-start"><span className="text-blue-500 mt-0.5">•</span> Processes a large, bounded volume of data at scheduled intervals (e.g., midnight).</li>
              <li className="flex gap-2 items-start"><span className="text-blue-500 mt-0.5">•</span> High latency (hours/days), but extremely high throughput and cost-efficient.</li>
              <li className="flex gap-2 items-start"><span className="text-blue-500 mt-0.5">•</span> Ideal for daily reporting, model training, and heavy analytical transformations.</li>
            </ul>
          </div>

          <div className={`p-6 rounded-2xl border transition-all duration-500 ${
            activeTab === 'stream' ? 'bg-purple-950/20 border-purple-900/50' : 'bg-zinc-900/30 border-zinc-800 opacity-50 grayscale'
          }`}>
            <h4 className="text-purple-400 font-bold mb-3 flex items-center gap-2"><FastForward className="w-4 h-4" /> Stream Processing</h4>
            <ul className="space-y-3 text-sm text-zinc-300">
              <li className="flex gap-2 items-start"><span className="text-purple-500 mt-0.5">•</span> Processes data continuously as it arrives, row-by-row or in micro-batches.</li>
              <li className="flex gap-2 items-start"><span className="text-purple-500 mt-0.5">•</span> Low latency (milliseconds/seconds), but harder to manage state and costlier.</li>
              <li className="flex gap-2 items-start"><span className="text-purple-500 mt-0.5">•</span> Ideal for fraud detection, real-time dashboards, and instant notifications.</li>
            </ul>
          </div>
          
        </div>
      </div>
    </div>
  );
}

function Database(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>
  );
}

function BatchSimulator() {
  return (
    <div className="absolute inset-0 flex items-center">
      <motion.div
        className="absolute flex items-center gap-1 bg-blue-900/30 border border-blue-500/30 p-2 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.3)] backdrop-blur-sm"
        initial={{ left: '0%', opacity: 0 }}
        animate={{ left: ['0%', '20%', '80%', '100%'], opacity: [0, 1, 1, 0] }}
        transition={{ repeat: Infinity, duration: 4, times: [0, 0.2, 0.8, 1], ease: "linear" }}
      >
        <div className="w-6 h-6 bg-blue-500 rounded-md" />
        <div className="w-6 h-6 bg-blue-500 rounded-md" />
        <div className="w-6 h-6 bg-blue-500 rounded-md" />
        <div className="w-6 h-6 bg-blue-500 rounded-md flex items-center justify-center text-[10px] font-bold text-blue-900">+5K</div>
      </motion.div>
    </div>
  );
}

function StreamSimulator() {
  const events = Array.from({ length: 6 });
  
  return (
    <div className="absolute inset-0 flex items-center overflow-hidden">
      {events.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4 bg-purple-500 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.8)]"
          initial={{ left: '0%', opacity: 0, y: (i % 2 === 0 ? -10 : 10) }}
          animate={{ left: '100%', opacity: [0, 1, 1, 0] }}
          transition={{ 
            repeat: Infinity, 
            duration: 1.5, 
            delay: i * 0.3, 
            ease: "linear" 
          }}
        />
      ))}
    </div>
  );
}
