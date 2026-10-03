'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import { Clock, DownloadCloud } from 'lucide-react';

export function InteractiveLateData() {
  const [step, setStep] = useState<number>(0);
  const [userInteracted, setUserInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.3 });

  useEffect(() => {
    if (userInteracted || !isInView) return;
    
    const interval = setInterval(() => {
      setStep(s => (s + 1) % 4);
    }, 3000); 

    return () => clearInterval(interval);
  }, [userInteracted, isInView]);

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center py-8 space-y-8">
      
      <div className="w-full max-w-3xl bg-zinc-950/80 border border-zinc-800 rounded-3xl p-6 shadow-2xl relative flex flex-col items-center justify-center min-h-[350px] overflow-hidden">
        
        <div className="flex w-full max-w-lg items-end justify-between font-mono text-xs border-b border-zinc-700 pb-2 mb-8">
          <div className="text-zinc-500 font-bold">Time (Event Time)</div>
          <div className="text-zinc-500 font-bold text-right">Data Lake (Partitions)</div>
        </div>

        <div className="relative w-full max-w-lg h-32 flex items-center font-mono">
          
          {/* Real world time clock */}
          <div className="w-32 flex flex-col items-center gap-2">
            <Clock className={`w-8 h-8 ${step === 2 ? 'text-orange-400 animate-pulse' : 'text-zinc-500'}`} />
            <div className="text-xs bg-zinc-900 border border-zinc-700 px-2 py-1 rounded text-zinc-300">
              {step === 0 && 'Jan 1 (Offline)'}
              {step === 1 && 'Jan 2 (Online)'}
              {step >= 2 && 'Jan 3 (Syncing)'}
            </div>
          </div>

          {/* The Phone (Source) */}
          <div className="absolute left-32 top-0 w-16 h-24 bg-zinc-900 border-2 border-zinc-700 rounded-lg flex flex-col items-center justify-center text-[10px] text-zinc-400 z-20">
            Mobile App
            <AnimatePresence>
              {step === 0 && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="mt-2 text-red-400 font-bold">OFFLINE</motion.div>}
              {step === 1 && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="mt-2 text-emerald-400 font-bold">ONLINE</motion.div>}
              {step === 2 && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="mt-2 text-orange-400 font-bold">SYNCING</motion.div>}
            </AnimatePresence>
          </div>

          {/* Data Packets */}
          <AnimatePresence>
            {step === 2 && (
              <motion.div 
                initial={{ x: 192, y: 12, opacity: 1, scale: 1 }} 
                animate={{ x: 300, y: -20, opacity: 0, scale: 0.5 }} 
                transition={{ duration: 1, ease: "easeInOut" }} 
                className="absolute w-6 h-6 bg-orange-500 text-white font-bold text-[8px] flex items-center justify-center rounded shadow-[0_0_15px_rgba(249,115,22,0.6)] z-30"
              >
                Jan1
              </motion.div>
            )}
          </AnimatePresence>

          {/* Data Lake Partitions */}
          <div className="absolute right-0 top-0 flex flex-col gap-2 w-48">
            <div className="bg-zinc-900 border border-zinc-700 rounded p-2 flex items-center justify-between text-xs">
              <span className="text-zinc-500">dt=Jan1</span>
              <AnimatePresence mode="wait">
                {step < 3 ? (
                  <motion.span key="empty" className="text-red-400">0 events</motion.span>
                ) : (
                  <motion.span key="full" initial={{ scale: 1.5, color: '#f97316' }} animate={{ scale: 1, color: '#10b981' }} className="font-bold">1 event</motion.span>
                )}
              </AnimatePresence>
            </div>
            <div className="bg-zinc-900 border border-zinc-700 rounded p-2 flex items-center justify-between text-xs">
              <span className="text-zinc-500">dt=Jan2</span>
              <span className="text-emerald-400">5 events</span>
            </div>
            <div className="bg-zinc-900 border border-zinc-700 rounded p-2 flex items-center justify-between text-xs">
              <span className="text-zinc-500">dt=Jan3</span>
              <span className="text-emerald-400">2 events</span>
            </div>
          </div>

        </div>

        <div className="h-12 mt-8 text-xs font-mono text-center max-w-sm">
          <AnimatePresence mode="wait">
            {step === 0 && <motion.div key="s0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-zinc-400">User clicks button on Jan 1, but they are in an airplane (offline).</motion.div>}
            {step === 1 && <motion.div key="s1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-zinc-400">Jan 2 happens normally.</motion.div>}
            {step === 2 && <motion.div key="s2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-orange-400 font-bold">User reconnects on Jan 3. The phone flushes the Jan 1 event to the server!</motion.div>}
            {step === 3 && <motion.div key="s3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-emerald-400 font-bold">SOLUTION: Always partition by Event Time, not Processing Time. The event correctly lands in the dt=Jan1 folder.</motion.div>}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
