'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import { History, CalendarDays } from 'lucide-react';

export function InteractiveBackfill() {
  const [activeDate, setActiveDate] = useState<string>('jan1');
  const [userInteracted, setUserInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.3 });
  const shouldReduceMotion = useReducedMotion();

  const dates = [
    { id: 'jan1', label: 'Jan 1 (Bug introduced)', status: 'bug' },
    { id: 'jan2', label: 'Jan 2', status: 'bug' },
    { id: 'jan3', label: 'Jan 3', status: 'bug' },
    { id: 'jan4', label: 'Jan 4 (Fix deployed)', status: 'fix' }
  ];

  useEffect(() => {
    if (userInteracted || !isInView) return;
    
    // Auto cycle through the backfill process
    let step = 0;
    const interval = setInterval(() => {
      if (step === 0) setActiveDate('jan4');
      else if (step === 1) setActiveDate('jan1_fix');
      else if (step === 2) setActiveDate('jan2_fix');
      else if (step === 3) setActiveDate('jan3_fix');
      else if (step === 4) setActiveDate('done');
      else {
        step = -1;
        setActiveDate('jan1');
      }
      step++;
    }, 2000); 

    return () => clearInterval(interval);
  }, [userInteracted, isInView]);

  const isBackfilling = activeDate.includes('fix') || activeDate === 'done';

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center py-8 space-y-8">
      
      <div className="flex flex-wrap items-center justify-center gap-2 p-1 bg-zinc-950 border border-zinc-800 rounded-2xl max-w-xl w-full">
        <button
          onClick={() => { setUserInteracted(true); setActiveDate('jan1'); }}
          className={`flex-1 px-4 py-2 rounded-xl text-sm font-bold transition-all ${!isBackfilling && activeDate !== 'jan4' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
        >
          1. Discovery
        </button>
        <button
          onClick={() => { setUserInteracted(true); setActiveDate('jan1_fix'); }}
          className={`flex-1 px-4 py-2 rounded-xl text-sm font-bold transition-all ${isBackfilling ? 'bg-purple-600 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
        >
          2. The Backfill
        </button>
      </div>

      <div className="w-full max-w-3xl bg-zinc-950/80 border border-zinc-800 rounded-3xl p-6 shadow-2xl relative flex flex-col items-center justify-center min-h-[350px] overflow-hidden">
        
        <div className="flex gap-2 mb-8">
          {dates.map((d) => {
            const isCurrentlyFixing = activeDate === `${d.id}_fix`;
            const isFixed = isBackfilling && (activeDate === 'done' || parseInt(activeDate.replace('jan', '').replace('_fix','')) > parseInt(d.id.replace('jan', '')));
            
            let blockClass = "bg-zinc-900 border-zinc-700 text-zinc-500";
            if (d.status === 'bug' && !isFixed && !isCurrentlyFixing) blockClass = "bg-red-900/20 border-red-500 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.2)]";
            if (d.status === 'fix') blockClass = "bg-emerald-900/20 border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]";
            if (isFixed) blockClass = "bg-purple-900/20 border-purple-500 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)]";
            if (isCurrentlyFixing) blockClass = "bg-purple-500 border-purple-400 text-white shadow-[0_0_20px_rgba(168,85,247,0.6)] animate-pulse scale-110 z-10";

            return (
              <div key={d.id} className={`w-24 h-24 border-2 rounded-xl flex flex-col items-center justify-center font-mono text-xs transition-all duration-300 ${blockClass}`}>
                <CalendarDays className="w-6 h-6 mb-1" />
                <div className="font-bold">{d.id.toUpperCase()}</div>
                {!isFixed && d.status === 'bug' && !isCurrentlyFixing && <div className="text-[10px]">Corrupted</div>}
                {isFixed && <div className="text-[10px]">Restored</div>}
              </div>
            );
          })}
        </div>

        <div className="h-16 w-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            {!isBackfilling && activeDate === 'jan1' && (
              <motion.div key="1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-red-400 font-mono text-sm text-center max-w-md bg-red-950/50 p-2 rounded-lg border border-red-900">
                A bad code deployment on Jan 1 corrupted 3 days of data.
              </motion.div>
            )}
            {!isBackfilling && activeDate === 'jan4' && (
              <motion.div key="2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-emerald-400 font-mono text-sm text-center max-w-md bg-emerald-950/50 p-2 rounded-lg border border-emerald-900">
                Fix deployed! Jan 4 data is clean. Now we must fix Jan 1-3.
              </motion.div>
            )}
            {isBackfilling && activeDate !== 'done' && (
              <motion.div key="3" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="text-purple-400 font-mono text-sm font-bold flex items-center gap-2 bg-purple-950/50 p-2 rounded-lg border border-purple-900">
                <History className="w-4 h-4 animate-spin-slow" />
                Running Backfill... Re-executing pipeline for {activeDate.split('_')[0].toUpperCase()}
              </motion.div>
            )}
            {activeDate === 'done' && (
              <motion.div key="4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-emerald-400 font-mono text-sm text-center font-bold bg-emerald-950/50 p-2 rounded-lg border border-emerald-900">
                Backfill Complete! Historical data is structurally identical to new data.
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
