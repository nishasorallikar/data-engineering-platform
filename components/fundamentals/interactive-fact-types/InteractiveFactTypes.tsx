'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import { CreditCard, CalendarClock, FastForward } from 'lucide-react';

const TYPES = [
  { 
    id: 'transaction', 
    label: 'Transaction', 
    icon: CreditCard, 
    desc: 'One row per event. Never updated. The most granular and common fact table.', 
    highlight: 'blue'
  },
  { 
    id: 'periodic', 
    label: 'Periodic Snapshot', 
    icon: CalendarClock, 
    desc: 'One row per entity per period (e.g. daily account balance). Captures state at a moment in time.', 
    highlight: 'emerald'
  },
  { 
    id: 'accumulating', 
    label: 'Accumulating Snapshot', 
    icon: FastForward, 
    desc: 'One row per entity lifecycle (e.g. an order). Updated iteratively as it hits milestones.', 
    highlight: 'orange'
  }
] as const;

export function InteractiveFactTypes() {
  const [activeType, setActiveType] = useState<string>('transaction');
  const [userInteracted, setUserInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.3 });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (userInteracted || !isInView) return;
    
    const interval = setInterval(() => {
      setActiveType(current => {
        const currentIndex = TYPES.findIndex(t => t.id === current);
        return TYPES[(currentIndex + 1) % TYPES.length].id;
      });
    }, 5500); 

    return () => clearInterval(interval);
  }, [userInteracted, isInView]);

  const activeData = TYPES.find(t => t.id === activeType)!;

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center py-8 space-y-8">
      
      {/* Selector */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1 bg-zinc-950 border border-zinc-800 rounded-2xl max-w-3xl w-full">
        {TYPES.map((type) => {
          let bgClass = 'bg-blue-600';
          if (type.highlight === 'emerald') bgClass = 'bg-emerald-600';
          if (type.highlight === 'orange') bgClass = 'bg-orange-600';

          return (
            <button
              key={type.id}
              onClick={() => {
                setUserInteracted(true);
                setActiveType(type.id);
              }}
              className={`flex-1 min-w-[150px] px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 relative ${
                activeType === type.id ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {activeType === type.id && (
                <motion.div
                  layoutId="active-type-bg-fact"
                  className={`absolute inset-0 rounded-xl -z-10 ${bgClass}`}
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center justify-center gap-2">
                <type.icon className="w-4 h-4" />
                {type.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="text-sm font-mono text-zinc-400 h-8 text-center px-4 max-w-2xl">{activeData.desc}</div>

      {/* Visualizer Architecture */}
      <div className="w-full max-w-3xl bg-zinc-950/80 border border-zinc-800 rounded-3xl p-6 shadow-2xl relative flex items-center justify-center min-h-[300px] overflow-hidden">
        <AnimatePresence mode="wait">
          <FactState key={activeType} type={activeType} reduceMotion={shouldReduceMotion} />
        </AnimatePresence>
      </div>
      
    </div>
  );
}

function FactState({ type, reduceMotion }: { type: string, reduceMotion: boolean | null }) {
  let displayContent;

  switch(type) {
    case 'transaction':
      displayContent = (
        <div className="flex flex-col gap-2 font-mono text-xs w-full max-w-lg">
          <div className="bg-blue-950/20 border border-blue-900/50 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(59,130,246,0.1)]">
            <div className="flex bg-zinc-800 p-2 font-bold text-zinc-400 border-b border-zinc-700">
              <span className="w-1/4">Time</span><span className="w-1/4">User</span><span className="w-1/4">Action</span><span className="w-1/4 text-right">Amt</span>
            </div>
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex p-2 border-b border-zinc-800/50 items-center">
              <span className="w-1/4 text-zinc-500">10:01:05</span><span className="w-1/4">U1</span><span className="w-1/4 text-emerald-400">Click</span><span className="w-1/4 text-right">-</span>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="flex p-2 border-b border-zinc-800/50 items-center bg-blue-900/10">
              <span className="w-1/4 text-zinc-500">10:03:12</span><span className="w-1/4">U1</span><span className="w-1/4 text-blue-400 font-bold">Purchase</span><span className="w-1/4 text-right text-emerald-400">$50</span>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.0 }} className="flex p-2 items-center">
              <span className="w-1/4 text-zinc-500">10:05:40</span><span className="w-1/4">U2</span><span className="w-1/4 text-emerald-400">Click</span><span className="w-1/4 text-right">-</span>
            </motion.div>
          </div>
          <div className="text-center text-blue-400 mt-2 font-bold animate-pulse">Rows are appended, never updated.</div>
        </div>
      );
      break;
    case 'periodic':
      displayContent = (
        <div className="flex flex-col gap-2 font-mono text-xs w-full max-w-lg">
          <div className="bg-emerald-950/20 border border-emerald-900/50 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(16,185,129,0.1)]">
            <div className="flex bg-zinc-800 p-2 font-bold text-zinc-400 border-b border-zinc-700">
              <span className="w-1/3">Month_End</span><span className="w-1/3 text-center">Acct_ID</span><span className="w-1/3 text-right">Balance</span>
            </div>
            <div className="flex p-2 border-b border-zinc-800/50 items-center">
              <span className="w-1/3 text-emerald-400/70">2024-01-31</span><span className="w-1/3 text-center text-zinc-300">A100</span><span className="w-1/3 text-right text-blue-300">$1,000</span>
            </div>
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex p-2 border-b border-zinc-800/50 items-center bg-emerald-900/20">
              <span className="w-1/3 text-emerald-400 font-bold">2024-02-29</span><span className="w-1/3 text-center text-zinc-300">A100</span><span className="w-1/3 text-right text-blue-300 font-bold">$1,250</span>
            </motion.div>
          </div>
          <div className="text-center text-emerald-400 mt-2 font-bold animate-pulse">A new snapshot row is created every period.</div>
        </div>
      );
      break;
    case 'accumulating':
      displayContent = (
        <div className="flex flex-col gap-2 font-mono text-xs w-full max-w-2xl">
          <div className="bg-orange-950/20 border border-orange-900/50 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(249,115,22,0.1)]">
            <div className="flex bg-zinc-800 p-2 font-bold text-zinc-400 border-b border-zinc-700">
              <span className="w-1/5">Ord_ID</span>
              <span className="w-1/5 text-center">Placed_Dt</span>
              <span className="w-1/5 text-center">Shipped_Dt</span>
              <span className="w-1/5 text-center">Deliv_Dt</span>
              <span className="w-1/5 text-right">Status</span>
            </div>
            <div className="flex p-3 items-center">
              <span className="w-1/5 text-zinc-300 font-bold">#999</span>
              <span className="w-1/5 text-center text-emerald-400">Jan 1</span>
              
              <motion.span 
                initial={{ opacity: 1 }} animate={{ opacity: [1, 0, 1] }} transition={{ delay: 1, duration: 0.5 }}
                className="w-1/5 text-center"
              >
                <motion.span initial={{ display: 'inline' }} animate={{ display: 'none' }} transition={{ delay: 1.25 }}>NULL</motion.span>
                <motion.span initial={{ display: 'none' }} animate={{ display: 'inline' }} transition={{ delay: 1.25 }} className="text-emerald-400">Jan 3</motion.span>
              </motion.span>
              
              <motion.span 
                initial={{ opacity: 1 }} animate={{ opacity: [1, 0, 1] }} transition={{ delay: 2, duration: 0.5 }}
                className="w-1/5 text-center"
              >
                <motion.span initial={{ display: 'inline' }} animate={{ display: 'none' }} transition={{ delay: 2.25 }}>NULL</motion.span>
                <motion.span initial={{ display: 'none' }} animate={{ display: 'inline' }} transition={{ delay: 2.25 }} className="text-emerald-400">Jan 5</motion.span>
              </motion.span>
              
              <motion.span 
                initial={{ opacity: 1 }} animate={{ opacity: [1, 0, 1, 0, 1] }} transition={{ times: [0, 0.3, 0.4, 0.6, 0.7], delay: 1, duration: 1.5 }}
                className="w-1/5 text-right font-bold text-orange-400"
              >
                <motion.span initial={{ display: 'inline' }} animate={{ display: 'none' }} transition={{ delay: 1.25 }}>Placed</motion.span>
                <motion.span initial={{ display: 'none' }} animate={{ display: 'inline' }} transition={{ delay: 1.25 }}>
                  <motion.span initial={{ display: 'inline' }} animate={{ display: 'none' }} transition={{ delay: 1 }}>Shipped</motion.span>
                  <motion.span initial={{ display: 'none' }} animate={{ display: 'inline' }} transition={{ delay: 1 }} className="text-emerald-500">Delivered</motion.span>
                </motion.span>
              </motion.span>
            </div>
          </div>
          <div className="text-center text-orange-400 mt-2 font-bold animate-pulse">The SAME row is repeatedly UPDATED with new milestones.</div>
        </div>
      );
      break;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0 flex flex-col items-center justify-center p-4 w-full h-full"
    >
      {displayContent}
    </motion.div>
  );
}
