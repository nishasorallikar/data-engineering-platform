'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import { Split, Network } from 'lucide-react';

const CONCEPTS = [
  { 
    id: 'narrow', 
    label: 'Narrow Transformation (map, filter)', 
    icon: Split, 
    desc: 'Each input partition contributes to only ONE output partition. Zero data moves across the network.', 
    highlight: 'emerald'
  },
  { 
    id: 'wide', 
    label: 'Wide Transformation (groupBy, join)', 
    icon: Network, 
    desc: 'An input partition contributes to MULTIPLE output partitions. Requires a Shuffle (data moves across network).', 
    highlight: 'red'
  }
] as const;

export function InteractiveShuffle() {
  const [activeType, setActiveType] = useState<string>('narrow');
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
      
      <div className="flex flex-wrap items-center justify-center gap-2 p-1 bg-zinc-950 border border-zinc-800 rounded-2xl max-w-3xl w-full">
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
                layoutId="active-type-bg-shuffle"
                className={`absolute inset-0 rounded-xl -z-10 ${concept.highlight === 'emerald' ? 'bg-emerald-600' : 'bg-red-600'}`}
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

      <div className="text-sm font-mono text-zinc-400 h-12 md:h-8 text-center px-4 max-w-2xl">{activeData.desc}</div>

      <div className="w-full max-w-3xl bg-zinc-950/80 border border-zinc-800 rounded-3xl p-6 shadow-2xl relative flex flex-col items-center justify-center min-h-[350px] overflow-hidden">
        <AnimatePresence mode="wait">
          <ShuffleState key={activeType} type={activeType} reduceMotion={shouldReduceMotion} />
        </AnimatePresence>
      </div>
      
    </div>
  );
}

function ShuffleState({ type, reduceMotion }: { type: string, reduceMotion: boolean | null }) {
  const isNarrow = type === 'narrow';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0 flex flex-col items-center justify-center p-4 w-full h-full font-mono text-xs"
    >
      <div className="flex w-full max-w-lg items-stretch justify-between relative h-64">
        
        {/* Node 1 */}
        <div className="w-32 bg-zinc-900 border border-zinc-700 rounded-xl p-2 flex flex-col justify-between shadow-lg z-10 h-full relative">
          <div className="text-center font-bold text-zinc-500 mb-1 border-b border-zinc-700 pb-1">Executor 1</div>
          
          <div className="h-16 border border-zinc-700 rounded bg-black flex items-center justify-center relative overflow-hidden">
            <span className="z-10">Part 1</span>
            {isNarrow && <motion.div initial={{ top: '100%' }} animate={{ top: 0 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="absolute bg-emerald-500/20 w-full h-full -z-0 border-t-2 border-emerald-500" />}
          </div>
          
          <div className="h-8 flex justify-center items-center font-bold text-zinc-600 text-[10px]">
            {isNarrow ? 'df.filter()' : 'df.groupBy()'}
          </div>

          <div className="h-16 border border-zinc-700 rounded bg-black flex items-center justify-center relative overflow-hidden">
            <span className="z-10">Part 3</span>
            {isNarrow && <motion.div initial={{ top: '100%' }} animate={{ top: 0 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear', delay: 0.5 }} className="absolute bg-emerald-500/20 w-full h-full -z-0 border-t-2 border-emerald-500" />}
          </div>
        </div>

        {/* Action Center / Network */}
        <div className="w-32 flex flex-col justify-center items-center relative z-0 h-full">
          {isNarrow ? (
            <div className="text-emerald-400 font-bold bg-emerald-950/20 border border-emerald-900/50 p-2 rounded-lg text-center shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              NO SHUFFLE<br/><span className="text-[10px]">Lightning Fast</span>
            </div>
          ) : (
            <div className="text-red-400 font-bold bg-red-950/20 border border-red-900/50 p-2 rounded-lg text-center shadow-[0_0_15px_rgba(239,68,68,0.3)] animate-pulse">
              SHUFFLE<br/><span className="text-[10px] text-zinc-400">Disk I/O + Network</span>
            </div>
          )}

          {/* SVG Connecting Lines for Wide Dependency */}
          {!isNarrow && (
            <svg className="absolute inset-0 w-full h-full -z-10 overflow-visible" style={{ left: '-100%', width: '300%' }}>
              {/* E1 Part 1 -> E1 Part 3 (Local) */}
              <motion.path d="M 128 64 C 192 64, 192 200, 128 200" fill="none" stroke="#EF4444" strokeWidth="2" strokeDasharray="4 4" animate={{ strokeDashoffset: -20 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} />
              {/* E1 Part 1 -> E2 Part 4 (Network Shuffle) */}
              <motion.path d="M 128 64 C 256 64, 256 200, 384 200" fill="none" stroke="#EF4444" strokeWidth="3" strokeDasharray="6 6" animate={{ strokeDashoffset: -20 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="drop-shadow-[0_0_5px_rgba(239,68,68,0.8)]" />
              
              {/* E2 Part 2 -> E2 Part 4 (Local) */}
              <motion.path d="M 384 64 C 320 64, 320 200, 384 200" fill="none" stroke="#EF4444" strokeWidth="2" strokeDasharray="4 4" animate={{ strokeDashoffset: -20 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} />
              {/* E2 Part 2 -> E1 Part 3 (Network Shuffle) */}
              <motion.path d="M 384 64 C 256 64, 256 200, 128 200" fill="none" stroke="#EF4444" strokeWidth="3" strokeDasharray="6 6" animate={{ strokeDashoffset: -20 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="drop-shadow-[0_0_5px_rgba(239,68,68,0.8)]" />
            </svg>
          )}
        </div>

        {/* Node 2 */}
        <div className="w-32 bg-zinc-900 border border-zinc-700 rounded-xl p-2 flex flex-col justify-between shadow-lg z-10 h-full relative">
          <div className="text-center font-bold text-zinc-500 mb-1 border-b border-zinc-700 pb-1">Executor 2</div>
          
          <div className="h-16 border border-zinc-700 rounded bg-black flex items-center justify-center relative overflow-hidden">
            <span className="z-10">Part 2</span>
            {isNarrow && <motion.div initial={{ top: '100%' }} animate={{ top: 0 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear', delay: 0.2 }} className="absolute bg-emerald-500/20 w-full h-full -z-0 border-t-2 border-emerald-500" />}
          </div>
          
          <div className="h-8 flex justify-center items-center font-bold text-zinc-600 text-[10px]">
            {isNarrow ? 'df.filter()' : 'df.groupBy()'}
          </div>

          <div className="h-16 border border-zinc-700 rounded bg-black flex items-center justify-center relative overflow-hidden">
            <span className="z-10">Part 4</span>
            {isNarrow && <motion.div initial={{ top: '100%' }} animate={{ top: 0 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear', delay: 0.7 }} className="absolute bg-emerald-500/20 w-full h-full -z-0 border-t-2 border-emerald-500" />}
          </div>
        </div>
      </div>
      
    </motion.div>
  );
}
