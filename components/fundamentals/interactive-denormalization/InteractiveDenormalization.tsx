'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import { Merge, SplitSquareHorizontal, Zap } from 'lucide-react';

const STAGES = [
  { 
    id: 'normalized', 
    label: 'OLTP (Normalized)', 
    icon: SplitSquareHorizontal, 
    desc: 'Optimized for fast writes. No redundancy, but requires complex joins to read.', 
    highlight: 'blue'
  },
  { 
    id: 'denormalized', 
    label: 'OLAP (Denormalized)', 
    icon: Merge, 
    desc: 'Optimized for fast reads. Pre-joined with deliberate redundancy.', 
    highlight: 'emerald'
  }
] as const;

export function InteractiveDenormalization() {
  const [activeStage, setActiveStage] = useState<string>('normalized');
  const [userInteracted, setUserInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.3 });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (userInteracted || !isInView) return;
    
    const interval = setInterval(() => {
      setActiveStage(current => {
        const currentIndex = STAGES.findIndex(s => s.id === current);
        return STAGES[(currentIndex + 1) % STAGES.length].id;
      });
    }, 4500); 

    return () => clearInterval(interval);
  }, [userInteracted, isInView]);

  const activeData = STAGES.find(s => s.id === activeStage)!;

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center py-8 space-y-8">
      
      {/* Selector */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1 bg-zinc-950 border border-zinc-800 rounded-2xl max-w-2xl w-full">
        {STAGES.map((stage) => {
          let bgClass = 'bg-blue-600';
          if (stage.highlight === 'emerald') bgClass = 'bg-emerald-600';

          return (
            <button
              key={stage.id}
              onClick={() => {
                setUserInteracted(true);
                setActiveStage(stage.id);
              }}
              className={`flex-1 min-w-[140px] px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 relative ${
                activeStage === stage.id ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {activeStage === stage.id && (
                <motion.div
                  layoutId="active-stage-bg-denorm"
                  className={`absolute inset-0 rounded-xl -z-10 ${bgClass}`}
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center justify-center gap-2">
                <stage.icon className="w-4 h-4" />
                {stage.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="text-sm font-mono text-zinc-400 h-8 text-center px-4 max-w-2xl">{activeData.desc}</div>

      {/* Visualizer Architecture */}
      <div className="w-full max-w-4xl bg-zinc-950/80 border border-zinc-800 rounded-3xl p-6 shadow-2xl relative flex items-center justify-center min-h-[400px] overflow-hidden">
        <AnimatePresence mode="wait">
          <DenormState key={activeStage} stage={activeStage} reduceMotion={shouldReduceMotion} />
        </AnimatePresence>
      </div>
      
    </div>
  );
}

function DenormState({ stage, reduceMotion }: { stage: string, reduceMotion: boolean | null }) {
  let displayContent;

  switch(stage) {
    case 'normalized':
      displayContent = (
        <div className="flex flex-col md:flex-row gap-8 items-center justify-center w-full font-mono text-xs">
          
          <div className="flex flex-col gap-2 relative">
            <div className="absolute -top-6 text-center w-full font-bold text-blue-400">Products (Small)</div>
            <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="bg-zinc-900 border border-zinc-700 rounded-xl overflow-hidden shadow-lg w-40">
              <div className="flex bg-zinc-800 p-2 font-bold text-zinc-400"><span className="w-1/2">P_ID</span><span className="w-1/2">Name</span></div>
              <div className="flex p-2 border-b border-zinc-800"><span className="w-1/2 text-orange-400">P1</span><span className="w-1/2">Laptop</span></div>
              <div className="flex p-2"><span className="w-1/2 text-orange-400">P2</span><span className="w-1/2">Mouse</span></div>
            </motion.div>
          </div>

          <div className="flex flex-col gap-2 relative">
            <div className="absolute -top-6 text-center w-full font-bold text-purple-400">Orders (Large)</div>
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="bg-zinc-900 border border-zinc-700 rounded-xl overflow-hidden shadow-lg w-64 z-10">
              <div className="flex bg-zinc-800 p-2 font-bold text-zinc-400"><span className="w-1/3">O_ID</span><span className="w-1/3">U_ID</span><span className="w-1/3 text-orange-400">P_ID</span></div>
              <div className="flex p-2 border-b border-zinc-800"><span className="w-1/3">101</span><span className="w-1/3 text-emerald-400">U1</span><span className="w-1/3 text-orange-400">P1</span></div>
              <div className="flex p-2 border-b border-zinc-800"><span className="w-1/3">102</span><span className="w-1/3 text-emerald-400">U1</span><span className="w-1/3 text-orange-400">P2</span></div>
              <div className="flex p-2"><span className="w-1/3">103</span><span className="w-1/3 text-emerald-400">U2</span><span className="w-1/3 text-orange-400">P1</span></div>
            </motion.div>
          </div>

          <div className="flex flex-col gap-2 relative">
            <div className="absolute -top-6 text-center w-full font-bold text-emerald-400">Users (Small)</div>
            <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="bg-zinc-900 border border-zinc-700 rounded-xl overflow-hidden shadow-lg w-40">
              <div className="flex bg-zinc-800 p-2 font-bold text-zinc-400"><span className="w-1/2">U_ID</span><span className="w-1/2">City</span></div>
              <div className="flex p-2 border-b border-zinc-800"><span className="w-1/2 text-emerald-400">U1</span><span className="w-1/2">NY</span></div>
              <div className="flex p-2"><span className="w-1/2 text-emerald-400">U2</span><span className="w-1/2">SF</span></div>
            </motion.div>
          </div>

        </div>
      );
      break;
    case 'denormalized':
      displayContent = (
        <div className="flex flex-col items-center justify-center w-full font-mono text-xs relative">
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 10 }} 
            animate={{ scale: 1, opacity: 1, y: 0 }} 
            className="flex flex-col gap-2 relative w-full max-w-2xl"
          >
            <div className="absolute -top-6 text-center w-full font-bold text-emerald-400 flex items-center justify-center gap-2">
              <Zap className="w-4 h-4" /> Denormalized Wide Table (Fast Analytics)
            </div>
            
            <div className="bg-emerald-950/20 border-2 border-emerald-500/50 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(16,185,129,0.2)] w-full">
              <div className="flex bg-zinc-800 p-3 font-bold text-zinc-400 uppercase tracking-wider text-[10px]">
                <span className="w-1/5">O_ID</span>
                <span className="w-1/5 text-purple-400">Product Name</span>
                <span className="w-1/5">City</span>
                <span className="w-2/5 text-zinc-500 italic pl-4">Redundancy</span>
              </div>
              
              <div className="flex p-3 border-b border-emerald-900/50 items-center">
                <span className="w-1/5 font-bold">101</span>
                <span className="w-1/5 text-purple-300">Laptop</span>
                <span className="w-1/5 text-emerald-300">NY</span>
                <span className="w-2/5 text-red-400/80 pl-4">"Laptop" stored again</span>
              </div>
              
              <div className="flex p-3 border-b border-emerald-900/50 items-center">
                <span className="w-1/5 font-bold">102</span>
                <span className="w-1/5 text-purple-300">Mouse</span>
                <span className="w-1/5 text-emerald-300">NY</span>
                <span className="w-2/5 text-red-400/80 pl-4">"NY" stored again</span>
              </div>
              
              <div className="flex p-3 border-b border-emerald-900/50 items-center">
                <span className="w-1/5 font-bold">103</span>
                <span className="w-1/5 text-purple-300">Laptop</span>
                <span className="w-1/5 text-emerald-300">SF</span>
                <span className="w-2/5 text-red-400/80 pl-4">"Laptop" stored again</span>
              </div>
            </div>
            
            <div className="w-full text-center text-zinc-500 mt-4 max-w-lg mx-auto">
              We trade <span className="text-red-400 font-bold">storage space</span> (redundant strings) for <span className="text-emerald-400 font-bold">read speed</span> (no JOINs required).
            </div>
          </motion.div>

        </div>
      );
      break;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0 flex flex-col items-center justify-center p-4 w-full h-full"
    >
      {displayContent}
    </motion.div>
  );
}
