'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import { Database, Download, PlusSquare } from 'lucide-react';

const CONCEPTS = [
  { 
    id: 'full', 
    label: 'Full Load (Truncate & Load)', 
    icon: Database, 
    desc: 'Wipes the destination and re-syncs everything. Easy to build, but slow and expensive.', 
    highlight: 'blue'
  },
  { 
    id: 'incremental', 
    label: 'Incremental Load', 
    icon: PlusSquare, 
    desc: 'Moves only the delta (new/changed rows) using a watermark (e.g. updated_at). Fast but complex.', 
    highlight: 'emerald'
  }
] as const;

export function InteractiveLoadTypes() {
  const [activeType, setActiveType] = useState<string>('full');
  const [userInteracted, setUserInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.3 });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (userInteracted || !isInView) return;
    
    const interval = setInterval(() => {
      setActiveType(current => {
        const currentIndex = CONCEPTS.findIndex(c => c.id === current);
        return CONCEPTS[(currentIndex + 1) % CONCEPTS.length].id;
      });
    }, 6000); 

    return () => clearInterval(interval);
  }, [userInteracted, isInView]);

  const activeData = CONCEPTS.find(c => c.id === activeType)!;

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center py-8 space-y-8">
      
      <div className="flex flex-wrap items-center justify-center gap-2 p-1 bg-zinc-950 border border-zinc-800 rounded-2xl max-w-2xl w-full">
        {CONCEPTS.map((concept) => (
          <button
            key={concept.id}
            onClick={() => {
              setUserInteracted(true);
              setActiveType(concept.id);
            }}
            className={`flex-1 min-w-[200px] px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 relative ${
              activeType === concept.id ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            {activeType === concept.id && (
              <motion.div
                layoutId="active-type-bg-load"
                className={`absolute inset-0 rounded-xl -z-10 ${concept.highlight === 'emerald' ? 'bg-emerald-600' : 'bg-blue-600'}`}
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center justify-center gap-2">
              <concept.icon className="w-4 h-4" />
              {concept.label}
            </span>
          </button>
        ))}
      </div>

      <div className="text-sm font-mono text-zinc-400 h-8 text-center px-4 max-w-2xl">{activeData.desc}</div>

      <div className="w-full max-w-3xl bg-zinc-950/80 border border-zinc-800 rounded-3xl p-6 shadow-2xl relative flex flex-col items-center justify-center min-h-[350px] overflow-hidden">
        <AnimatePresence mode="wait">
          <LoadState key={activeType} type={activeType} reduceMotion={shouldReduceMotion} />
        </AnimatePresence>
      </div>
      
    </div>
  );
}

function LoadState({ type, reduceMotion }: { type: string, reduceMotion: boolean | null }) {
  const isFull = type === 'full';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0 flex flex-col items-center justify-center p-4 w-full h-full font-mono text-xs"
    >
      <div className="flex w-full max-w-lg items-stretch justify-between relative h-48">
        
        {/* Source */}
        <div className="w-1/3 bg-zinc-900 border border-zinc-700 rounded-xl p-2 flex flex-col gap-1 relative shadow-lg">
          <div className="text-center font-bold text-zinc-500 mb-1 border-b border-zinc-700 pb-1">Source DB</div>
          <div className="bg-zinc-800 text-zinc-400 p-1.5 rounded">Row 1 (Old)</div>
          <div className="bg-zinc-800 text-zinc-400 p-1.5 rounded">Row 2 (Old)</div>
          <div className="bg-zinc-800 text-zinc-400 p-1.5 rounded">Row 3 (Old)</div>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }} className="bg-emerald-900/50 text-emerald-400 border border-emerald-500/50 p-1.5 rounded font-bold">
            Row 4 (NEW)
          </motion.div>
        </div>

        {/* Action Center */}
        <div className="w-1/3 flex flex-col justify-center items-center relative z-20">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ delay: 1, duration: 2, times: [0, 0.2, 1] }} 
            className={`font-bold ${isFull ? 'text-blue-400 text-sm' : 'text-emerald-400 text-sm'} text-center absolute -top-4 whitespace-nowrap`}
          >
            {isFull ? 'SELECT *' : 'SELECT * WHERE updated > max'}
          </motion.div>

          <div className="flex gap-1 h-8 items-center mt-8">
            {isFull ? (
              <>
                <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 20, opacity: 0 }} transition={{ delay: 1, duration: 1.5 }} className="w-4 h-4 bg-zinc-400 rounded-sm" />
                <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 20, opacity: 0 }} transition={{ delay: 1.1, duration: 1.5 }} className="w-4 h-4 bg-zinc-400 rounded-sm" />
                <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 20, opacity: 0 }} transition={{ delay: 1.2, duration: 1.5 }} className="w-4 h-4 bg-zinc-400 rounded-sm" />
                <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 20, opacity: 0 }} transition={{ delay: 1.3, duration: 1.5 }} className="w-4 h-4 bg-emerald-500 rounded-sm shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
              </>
            ) : (
              <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 20, opacity: 0 }} transition={{ delay: 1.3, duration: 1.5 }} className="w-4 h-4 bg-emerald-500 rounded-sm shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
            )}
          </div>
          
          {/* Watermark for Incremental */}
          {!isFull && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="absolute -bottom-6 bg-zinc-800 border border-zinc-700 px-2 py-1 rounded text-[10px] text-zinc-300">
              Watermark: <span className="text-orange-400">Row 3</span>
            </motion.div>
          )}
        </div>

        {/* Destination */}
        <div className="w-1/3 bg-zinc-900 border border-zinc-700 rounded-xl p-2 flex flex-col justify-end gap-1 relative shadow-lg overflow-hidden">
          <div className="absolute top-2 left-0 right-0 text-center font-bold text-zinc-500 border-b border-zinc-700 pb-1 mx-2">Dest DB</div>
          
          {isFull ? (
            <AnimatePresence>
              <motion.div key="old-rows" initial={{ opacity: 1 }} animate={{ opacity: 0, height: 0 }} transition={{ delay: 1.5, duration: 0.3 }} className="bg-zinc-800 text-red-400 line-through p-1.5 rounded flex flex-col gap-1">
                <div>Row 1</div><div>Row 2</div><div>Row 3</div>
              </motion.div>
              <motion.div key="new-rows" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ delay: 2, duration: 0.5 }} className="bg-blue-900/20 text-blue-300 border border-blue-500/50 p-1.5 rounded flex flex-col gap-1 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                <div>Row 1</div><div>Row 2</div><div>Row 3</div>
                <div className="text-emerald-400 font-bold">Row 4</div>
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="flex flex-col gap-1">
              <div className="bg-zinc-800 text-zinc-400 p-1.5 rounded">Row 1 (Old)</div>
              <div className="bg-zinc-800 text-zinc-400 p-1.5 rounded">Row 2 (Old)</div>
              <div className="bg-zinc-800 text-zinc-400 p-1.5 rounded">Row 3 (Old)</div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2, duration: 0.5 }} className="bg-emerald-900/50 text-emerald-400 border border-emerald-500/50 p-1.5 rounded font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                Row 4 (NEW)
              </motion.div>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-8 text-center max-w-sm">
        {isFull ? (
          <span className="text-red-400 font-bold">TRUNCATE targets. 100% of data transferred over network. Very slow for 1TB+.</span>
        ) : (
          <span className="text-emerald-400 font-bold">Target stays intact. Only 0.01% of data transferred. Highly efficient.</span>
        )}
      </div>

    </motion.div>
  );
}
