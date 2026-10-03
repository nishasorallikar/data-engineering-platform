'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import { Microscope, Layers, Package, CalendarDays } from 'lucide-react';

const GRAINS = [
  { 
    id: 'line_item', 
    label: 'Line Item (Finest)', 
    icon: Microscope, 
    desc: 'One row per product in an order. Maximum detail. Allows filtering by specific products.', 
    highlight: 'emerald'
  },
  { 
    id: 'order', 
    label: 'Order (Medium)', 
    icon: Package, 
    desc: 'One row per order. Loses product-level detail but requires less storage.', 
    highlight: 'blue'
  },
  { 
    id: 'daily', 
    label: 'Daily Aggregate (Coarsest)', 
    icon: CalendarDays, 
    desc: 'One row per store per day. Impossible to see individual orders, but extremely fast for high-level BI.', 
    highlight: 'purple'
  }
] as const;

export function InteractiveGrain() {
  const [activeGrain, setActiveGrain] = useState<string>('line_item');
  const [userInteracted, setUserInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.3 });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (userInteracted || !isInView) return;
    
    const interval = setInterval(() => {
      setActiveGrain(current => {
        const currentIndex = GRAINS.findIndex(g => g.id === current);
        return GRAINS[(currentIndex + 1) % GRAINS.length].id;
      });
    }, 5500); 

    return () => clearInterval(interval);
  }, [userInteracted, isInView]);

  const activeData = GRAINS.find(g => g.id === activeGrain)!;

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center py-8 space-y-8">
      
      {/* Selector */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1 bg-zinc-950 border border-zinc-800 rounded-2xl max-w-3xl w-full">
        {GRAINS.map((grain) => {
          let bgClass = 'bg-emerald-600';
          if (grain.highlight === 'blue') bgClass = 'bg-blue-600';
          if (grain.highlight === 'purple') bgClass = 'bg-purple-600';

          return (
            <button
              key={grain.id}
              onClick={() => {
                setUserInteracted(true);
                setActiveGrain(grain.id);
              }}
              className={`flex-1 min-w-[160px] px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 relative ${
                activeGrain === grain.id ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {activeGrain === grain.id && (
                <motion.div
                  layoutId="active-grain-bg"
                  className={`absolute inset-0 rounded-xl -z-10 ${bgClass}`}
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center justify-center gap-2">
                <grain.icon className="w-4 h-4 hidden sm:block" />
                {grain.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="text-sm font-mono text-zinc-400 h-12 md:h-8 text-center px-4 max-w-2xl">{activeData.desc}</div>

      {/* Visualizer Architecture */}
      <div className="w-full max-w-3xl bg-zinc-950/80 border border-zinc-800 rounded-3xl p-6 shadow-2xl relative flex items-center justify-center min-h-[350px] overflow-hidden">
        <AnimatePresence mode="wait">
          <GrainState key={activeGrain} type={activeGrain} reduceMotion={shouldReduceMotion} />
        </AnimatePresence>
      </div>
      
    </div>
  );
}

function GrainState({ type, reduceMotion }: { type: string, reduceMotion: boolean | null }) {
  let displayContent;

  switch(type) {
    case 'line_item':
      displayContent = (
        <div className="flex flex-col gap-2 font-mono text-xs w-full max-w-lg">
          <div className="bg-emerald-950/20 border-2 border-emerald-500/50 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(16,185,129,0.2)]">
            <div className="flex bg-zinc-800 p-2 font-bold text-zinc-400 border-b border-zinc-700 text-center">
              <span className="w-1/4">Order_ID</span><span className="w-1/4 text-orange-400">Prod_ID</span><span className="w-1/4 text-emerald-400">Qty</span><span className="w-1/4 text-emerald-400">Amount</span>
            </div>
            
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="flex p-3 border-b border-zinc-800/50 items-center text-center">
              <span className="w-1/4 font-bold text-zinc-300">101</span><span className="w-1/4 text-orange-400">Laptop</span><span className="w-1/4 text-emerald-400 font-bold">1</span><span className="w-1/4 font-bold">$1000</span>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="flex p-3 border-b border-zinc-800/50 items-center text-center">
              <span className="w-1/4 font-bold text-zinc-300">101</span><span className="w-1/4 text-orange-400">Mouse</span><span className="w-1/4 text-emerald-400 font-bold">2</span><span className="w-1/4 font-bold">$100</span>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="flex p-3 border-b border-zinc-800/50 items-center text-center">
              <span className="w-1/4 font-bold text-zinc-300">102</span><span className="w-1/4 text-orange-400">Monitor</span><span className="w-1/4 text-emerald-400 font-bold">1</span><span className="w-1/4 font-bold">$300</span>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-center text-emerald-400 mt-2 font-bold bg-emerald-950/50 p-2 rounded-lg border border-emerald-900/50">
            ✅ Can answer: "How many mice were sold?"
          </motion.div>
        </div>
      );
      break;
    case 'order':
      displayContent = (
        <div className="flex flex-col gap-2 font-mono text-xs w-full max-w-lg">
          <div className="bg-blue-950/20 border-2 border-blue-500/50 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(59,130,246,0.2)]">
            <div className="flex bg-zinc-800 p-2 font-bold text-zinc-400 border-b border-zinc-700 text-center">
              <span className="w-1/3">Order_ID</span>
              <span className="w-1/3 text-orange-400 line-through">Prod_ID</span>
              <span className="w-1/3 text-emerald-400">Total_Amount</span>
            </div>
            
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="flex p-3 border-b border-zinc-800/50 items-center text-center bg-blue-900/10">
              <span className="w-1/3 font-bold text-zinc-300">101</span>
              <span className="w-1/3 text-zinc-600">N/A</span>
              <span className="w-1/3 font-bold text-emerald-400">$1100</span>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="flex p-3 border-b border-zinc-800/50 items-center text-center">
              <span className="w-1/3 font-bold text-zinc-300">102</span>
              <span className="w-1/3 text-zinc-600">N/A</span>
              <span className="w-1/3 font-bold text-emerald-400">$300</span>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-center text-red-400 mt-2 font-bold bg-red-950/50 p-2 rounded-lg border border-red-900/50">
            ❌ CANNOT answer: "How many mice were sold?" (Detail is lost forever)
          </motion.div>
        </div>
      );
      break;
    case 'daily':
      displayContent = (
        <div className="flex flex-col gap-2 font-mono text-xs w-full max-w-lg">
          <div className="bg-purple-950/20 border-2 border-purple-500/50 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(168,85,247,0.2)]">
            <div className="flex bg-zinc-800 p-2 font-bold text-zinc-400 border-b border-zinc-700 text-center">
              <span className="w-1/3">Date</span>
              <span className="w-1/3">Store_ID</span>
              <span className="w-1/3 text-emerald-400">Daily_Revenue</span>
            </div>
            
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="flex p-4 border-b border-zinc-800/50 items-center text-center bg-purple-900/20">
              <span className="w-1/3 font-bold text-zinc-300">Jan 1</span>
              <span className="w-1/3 text-zinc-400">Store A</span>
              <span className="w-1/3 font-bold text-emerald-400 text-lg">$1400</span>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-center text-purple-400 mt-2 font-bold bg-purple-950/50 p-2 rounded-lg border border-purple-900/50">
            Extreme roll-up. Fast for dashboards, useless for auditing individual sales.
          </motion.div>
        </div>
      );
      break;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0 flex flex-col items-center justify-center p-4 w-full h-full"
    >
      {displayContent}
    </motion.div>
  );
}
